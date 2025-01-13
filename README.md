# voucher_management_system



## Application Structure
Tech Stack
Backend & Frontend Framework: Node.js with Express and EJS (Embedded JavaScript templates) for rendering the frontend.
Database: SQL Server Express.
PDF Generation:
QR Code Generation: 

Features to Implement
1. Login System
Create a login page using EJS.
Authenticate users using a hardcoded username/password or a database table.
Store session information using express-session.

2. Dashboard
After login, show a dashboard with:
A button to generate a QR code.
A list of existing vouchers.

3. Generate QR Code
When the button is clicked:
Generate a 10-digit random number.
Create a QR code using the qrcode package.
Insert the QR code details (number, generated date, expiry date) into the database.
Display a success message.

4. PDF Generation
Add a button to export a voucher as a PDF.
The PDF should include:
Title (configurable via the settings page).
Generated date and expiry date.
The QR code in the center.
Proper alignment and design.

5. Settings Page
Create a settings page to:
Set the maximum allowed time for expiry calculation.
Configure voucher dimensions (width and height in mm).
Adjust font sizes for the title and normal text.

6. Print Voucher
Include a button to print the PDF directly.



