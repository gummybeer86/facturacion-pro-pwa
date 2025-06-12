CREATE DATABASE IF NOT EXISTS chapamarket;
USE chapamarket;

CREATE TABLE IF NOT EXISTS licenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    license_key VARCHAR(255) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    duration_days INT NOT NULL,
    expiry_date DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    activation_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diagnostics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    license_key VARCHAR(50) NOT NULL,
    system_info JSON,
    diagnostic_result JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (license_key) REFERENCES licenses(license_key)
);

CREATE INDEX idx_license_key ON licenses(license_key);
CREATE INDEX idx_email ON licenses(email);
CREATE INDEX idx_expiry_date ON licenses(expiry_date); 