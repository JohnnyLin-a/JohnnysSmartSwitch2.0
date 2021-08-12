import { Router } from 'express';
import Dbpool from '../pkg/dbpool/dbpool.js';

const router = Router();

router.use(async (req, res, next) => {
    const dbpool = new Dbpool().getInstance();
    console.log("Connection", req.get("X-Real-IP"));
    console.log('Signed Cookies: ', req.signedCookies);

    // Postgres on node sucks.
    dbpool.connect((err, client, done) => {
        if (err) {
            res.status(418);
            res.end();
        };
        // Check if IP exists in db and if authorized
        if (req.signedCookies.pass) {
            client.query("SELECT id FROM web_authorizations WHERE assigned = TRUE AND ipv4 LIKE $1 AND secret_key = $2", [req.get("X-Real-IP"), req.signedCookies.pass])
            .then(res => {
                if (res.rows.length > 0) {
                    next();
                } else {
                    res.status(418);
                    res.end();
                }
            })
            .catch(e => {
                console.error(e.stack);
            })
            .then(() => {
                done();
            });
        } else {
            // Check if currently assigning new slots in db, then assign if so
            client.query('SELECT * FROM web_authorizations WHERE assigned = FALSE AND ipv4 LIKE $1', [ req.get("X-Real-IP") ])
            .then(result => {
                if (result.rows.length > 0) {
                    console.log(`UPDATE web_authorizations SET assigned = true WHERE id = $1`);
                    client.query('UPDATE web_authorizations SET assigned = true WHERE id = $1', [result.rows[0].id])
                    .then(result2 => {
                        if (result2.rowCount === 1) {
                            console.log(`result.rows[0].secret_key`, result.rows[0].secret_key)
                            res.cookie('pass', result.rows[0].secret_key, { signed: true, httpOnly: true, secure: true, expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)), sameSite: 'strict' });
                            next();
                        } else {
                            res.status(500);
                            res.end();
                        }
                    })
                    .catch(e => {
                        console.error(e.stack);
                    })
                } else {
                    res.status(418);
                    res.end();
                }
            })
            .catch(e => {
                console.error(e.stack);
            })
            .then(() => {
                done();
            });
        }
    });
})

export default router;