const { mssql } = require("../database/connection");
const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");

const pdfConfig = require("../utils/utils");

module.exports = {
   /**
 * 
 * @param {null } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {success: true, message: "Voucher successfully Created!"}
 * @description "generate new vouchers Controller"
 */
  generateVoucher: async (req, res) => {
    if (!req.session.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const voucherNumber = Math.floor(1000000000 + Math.random() * 9000000000);

      const qrCodeDataURL = await QRCode.toDataURL(voucherNumber.toString(), {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      const result = await mssql.query`
      SELECT * FROM Settings WHERE user_id = ${req.session.user.id}
  `;


    const settings_result=result.recordset[0].expiry_days?result.recordset[0].expiry_days:5

    console.log("settings result",settings_result)

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() +settings_result);

      await mssql.query`
            INSERT INTO Vouchers (
                number, 
                qr_code, 
                generated_date, 
                expiry_date, 
                user_id
            ) VALUES (
                ${voucherNumber},
                ${qrCodeDataURL},
                ${new Date()},
                ${expiryDate},
                ${req.session.user.id}
            )
        `;

      return res
        .status(201)
        .json({ success: true, message: "Voucher successfully Created!" });
    } catch (err) {
      console.error(err);

      res.status(400).json({ success: true, message: "Invalid Credentials" });
    }
  },

   /**
 * 
 * @param {null } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {success: true, message: "New PDF  Created using pdfkit!"}
 * @description "generate new PDF"
 */

  generatePDF: async (req, res) => {
    if (!req.session.user) {
      return res.status(401).send("Unauthorized");
    }
    try {
      const result = await mssql.query`
             SELECT * 
           FROM Vouchers v
            WHERE v.id = ${parseInt(req.params.voucherId, 10)}
             AND v.user_id = ${req.session.user.id}
         `;

         const settingsResult = await mssql.query`
         SELECT * FROM Settings 
         WHERE user_id = ${req.session.user.id}
       `;
      const voucher = result.recordset[0];
      const settings=settingsResult.recordset[0]

      if (!voucher) {
        return res.status(404).send("Voucher not found");
      }

      const config = {
        size: "A5",
        layout: "landscape",
      
        margins: {
          top: 40,
          bottom: 40,
          left: 60,
          right: 60,
        },
        fonts: {
          title: "Helvetica-Bold",
          body: "Helvetica",
          decorative: "Helvetica-Oblique",
        },
        fontSize: {
          title:settings.title_font_size||28,
          subtitle: settings.text_font_size||16,
          body: 12,
          footer: 9,
        },
        colors: {
          primary: voucher.primary_color || "#1a365d",
          secondary: voucher.secondary_color || "#718096",
          border: "#CBD5E0",
        },
      };

      const doc = new PDFDocument({
      
        size: config.size,
        layout: config.layout,
        margins: config.margins,
        bufferPages: true,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=voucher-${voucher.number}.pdf`
      );
      doc.pipe(res);

      pdfConfig.addBackground(doc, config);

    
      pdfConfig.addHeader(doc, voucher, config);
      pdfConfig.addQRCode(doc, voucher, settings);
      pdfConfig.addDates(doc, voucher, config);
      pdfConfig.addFooter(doc, voucher, config);

      doc.end();
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).send("Failed to generate PDF");
    }
  },
};
