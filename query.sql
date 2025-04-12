CREATE DATABASE project-crm;

CREATE TABLE users (
    user_id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE services (
    service_id VARCHAR PRIMARY KEY,
    service_name VARCHAR NOT NULL,
    speed INTEGER NOT NULL,
    quota VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    status VARCHAR NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    customer_id VARCHAR PRIMARY KEY,
    customer_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    service_id VARCHAR,
    start_date TIME,
    end_date TIME,
    FOREIGN KEY (service_id) REFERENCES services (service_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);