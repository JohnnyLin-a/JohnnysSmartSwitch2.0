CREATE TABLE web_authorizations (
    id SERIAL NOT NULL PRIMARY KEY,
    ipv4 varchar(20) NOT NULL,
    secret_key varchar(50) NOT NULL,
    assigned bool DEFAULT FALSE
)