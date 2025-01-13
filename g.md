     // Create PDF
        const doc = new PDFDocument({
            size: [voucher.voucher_width, voucher.voucher_height],
            margin: 10
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=voucher-${voucher.number}.pdf`);

        // Pipe to response
        doc.pipe(res);

        // Draw border
        const margin = 20;
        doc.rect(margin, margin, doc.page.width - margin * 2, doc.page.height - margin * 2)
           .strokeColor('#000000')
           .lineWidth(2)
           .stroke();

        // Add decorative corners
        const cornerSize = 20;
        // Top left corner
        doc.moveTo(margin, margin + cornerSize)
           .lineTo(margin, margin)
           .lineTo(margin + cornerSize, margin)
           .stroke();

        // Top right corner
        doc.moveTo(doc.page.width - margin - cornerSize, margin)
           .lineTo(doc.page.width - margin, margin)
           .lineTo(doc.page.width - margin, margin + cornerSize)
           .stroke();

        // Bottom left corner
        doc.moveTo(margin, doc.page.height - margin - cornerSize)
           .lineTo(margin, doc.page.height - margin)
           .lineTo(margin + cornerSize, doc.page.height - margin)
           .stroke();

        // Bottom right corner
        doc.moveTo(doc.page.width - margin - cornerSize, doc.page.height - margin)
           .lineTo(doc.page.width - margin, doc.page.height - margin)
           .lineTo(doc.page.width - margin, doc.page.height - margin - cornerSize)
           .stroke();

        // Add title
        doc.font('Helvetica-Bold')
           .fontSize(voucher.title_font_size)
           .text('GIFT VOUCHER', margin + 10, margin + 30, {
               align: 'center',
               width: doc.page.width - (margin + 10) * 2
           });

        // Add voucher number
        doc.moveDown()
           .font('Helvetica')
           .fontSize(voucher.text_font_size)
           .text(`No. ${voucher.number}`, {
               align: 'center'
           });

        // Generate and add QR code
        // const qrBuffer = await new Promise((resolve, reject) => {
        //     QRCode.toBuffer(voucher.number.toString(), {
        //         width: 200,
        //         margin: 1,
        //         errorCorrectionLevel: 'H'
        //     }, (err, buffer) => {
        //         if (err) reject(err);
        //         else resolve(buffer);
        //     });
        // });

        // Center QR code
        const qrSize = 150;
        const x = (doc.page.width - qrSize) / 2;
        const y = (doc.page.height - qrSize) / 2;

        doc.image(voucher.QRCode, x, y, {
            width: qrSize,
            height: qrSize
        });

        // Add dates
        const dateStyle = { align: 'center', width: doc.page.width - margin * 2 };
        doc.moveDown(8)
           .fontSize(voucher.text_font_size)
           .text(`Valid From: ${new Date(voucher.generated_date).toLocaleDateString()}`, margin, null, dateStyle)
           .text(`Valid Until: ${new Date(voucher.expiry_date).toLocaleDateString()}`, dateStyle);

        // Add footer
        doc.fontSize(8)
           .text('This voucher is non-refundable and must be presented at redemption.', {
               align: 'center',
               bottom: margin + 20
           });

        // Finalize PDF
        doc.end();