function addBackground(doc, config) {
  const padding = 20;
  doc
    .rect(
      padding,
      padding,
      doc.page.width - padding * 2,
      doc.page.height - padding * 2
    )
    .lineWidth(1)
    .strokeColor(config.colors.border)
    .stroke();

  doc
    .rect(
      padding + 10,
      padding + 10,
      doc.page.width - (padding + 10) * 2,
      doc.page.height - (padding + 10) * 2
    )
    .lineWidth(0.5)
    .strokeColor(config.colors.border)
    .stroke();
}

function addHeader(doc, voucher, config) {
  const title = voucher.voucher_title || "GIFT VOUCHER";

  doc
    .font(config.fonts.title)
    .fontSize(config.fontSize.title)
    .fillColor(config.colors.primary)
    .text(title, {
      align: "center",
      characterSpacing: 2,
    });

  doc
    .moveDown(0.5)
    .font(config.fonts.decorative)
    .fontSize(config.fontSize.subtitle)
    .fillColor(config.colors.secondary)
    .text(`No. ${voucher.number}`, {
      align: "center",
    });
}

function addQRCode(doc, voucher, settings) {
  if (!voucher.qr_code) {
    throw new Error("QR code is required");
  }

  const qrWidth = settings.voucher_width || 150;
  const qrHeight = settings.voucher_height || 150;

  const xPos = (doc.page.width - qrWidth) / 2;
  const yPos = (doc.page.height - qrHeight) / 2;

  doc.rect(xPos - 10, yPos - 10, qrWidth + 20, qrHeight + 20).fill("white");

  doc.image(voucher.qr_code, xPos, yPos, {
    width: qrWidth,
    height: qrHeight,
    align: "center",
  });
}

function addDates(doc, voucher, config) {
  const yPosition = doc.page.height - 120;

  const currentY = yPosition;

  doc
    .font(config.fonts.body)
    .fontSize(config.fontSize.body)
    .fillColor(config.colors.secondary);

  const validFromText = "Valid From: ";
  const validUntilText = "Valid Until: ";
  const fromDate = formatDate(voucher.generated_date);
  const untilDate = formatDate(voucher.expiry_date);

  const validFromWidth = doc.widthOfString(validFromText + fromDate);
  const validUntilWidth = doc.widthOfString(validUntilText + untilDate);

  const totalWidth = validFromWidth + validUntilWidth + 60;
  const startX = (doc.page.width - totalWidth) / 2;

  doc.text(validFromText + fromDate, startX, currentY, { continued: true });

  doc.text("    ", { continued: true });

  doc.text(validUntilText + untilDate, { align: "left" });
}

function addFooter(doc, voucher, config) {
  const footerText =
    voucher.footer_text ||
    "This voucher is non-refundable and must be presented at redemption.";

  doc
    .font(config.fonts.body)
    .fontSize(config.fontSize.footer)
    .fillColor(config.colors.secondary)
    .text(footerText, config.margins.left, doc.page.height - 60, {
      align: "center",
      width: doc.page.width - config.margins.left - config.margins.right,
    });
}

function formatDate(date, options = {}) {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date");
    }

    const defaultOptions = {
      locale: "en-US",
      format: "medium",
    };

    const settings = { ...defaultOptions, ...options };

    const formatOptions = {
      full: {
        dateStyle: "full",
      },
      long: {
        dateStyle: "long",
      },
      medium: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      short: {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      },
    };

    return dateObj.toLocaleDateString(
      settings.locale,
      formatOptions[settings.format]
    );
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid Date";
  }
}

module.exports = {
  addBackground,
  addDates,
  addFooter,
  addHeader,
  addQRCode,
};
