import pg from 'pg';

class Dbpool {

    constructor() {
        if (!Dbpool.instance) {
            Dbpool.instance = new pg.Pool({
                user: process.env.POSTGRES_USER,
                host: 'localhost',
                database: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                port: 5432,
            });
        }
    }
    
    /**
     * Return the databse pool object
     * @returns {pg.Pool}
     */
    getInstance() {
        return Dbpool.instance;
    }
  
  }

export default Dbpool;