-- CREATE DATABASE DBstore



-- CREATE TABLE Users (
--     id INT PRIMARY KEY IDENTITY(1,1),
--     username NVARCHAR(50) NOT NULL UNIQUE,
--     email NVARCHAR(100) NOT NULL UNIQUE,
--     password NVARCHAR(MAX) NOT NULL,
--     createdAt DATETIME DEFAULT GETDATE(),
--     updatedAt DATETIME DEFAULT GETDATE()
-- );

-- DROP TABLE Users;


-- Create Vouchers table
-- CREATE TABLE Vouchers (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     number BIGINT NOT NULL UNIQUE,
--     qr_code TEXT NOT NULL,
--     generated_date DATETIME DEFAULT GETDATE(),
--     expiry_date DATETIME NOT NULL,
--     user_id INT FOREIGN KEY REFERENCES Users(id),
--     used BIT DEFAULT 0
-- );


-- DROP TABLE Vouchers;



-- Create Settings table
-- CREATE TABLE Settings (
--     id INT IDENTITY(1,1) PRIMARY KEY,
--     user_id INT FOREIGN KEY REFERENCES Users(id),
--     expiry_days INT DEFAULT 5,
--     voucher_width INT DEFAULT 150,
--     voucher_height INT DEFAULT 150,
--     title_font_size INT DEFAULT 28,
--     text_font_size INT DEFAULT 16
-- );


-- DROP TABLE Settings;