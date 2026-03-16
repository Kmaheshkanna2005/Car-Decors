const PDFDocument = require("pdfkit");
const Usage = require("../models/Usage");

const generateUsageReport = async (req, res) => {
  try {
    const usages = await Usage.find()
      .populate("staffId", "name mobile")
      .populate("partsUsed.partId", "name category");

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
   const today = new Date();
   const formattedDate = today.toLocaleDateString("en-GB").split("/").join("-");

res.setHeader(
  "Content-Disposition",
  `attachment; filename=usage_report(${formattedDate}).pdf`
);

    doc.pipe(res);

    doc.fontSize(20).text("Car Decors - Parts Usage Report", {
      align: "center",
    });

    doc.moveDown();

    usages.forEach((usage, index) => {
      doc.fontSize(14).text(`Record ${index + 1}`);
      doc.text(`Staff: ${usage.staffId.name}`);
      doc.text(`Mobile: ${usage.staffId.mobile}`);
      doc.text(`Date: ${usage.committedAt}`);

      doc.text("Parts Used:");

      usage.partsUsed.forEach((item) => {
        doc.text(
          ` - ${item.partId.name} (Category: ${item.partId.category}) Qty: ${item.quantity}`
        );
      });

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const getUsageHistory = async (req, res) => {
  try {
    const usage = await Usage.find()
      .populate("staffId", "name mobile")
      .populate("partsUsed.partId", "name category")
      .sort({ createdAt: -1 });

    res.json(usage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateUsageReport, getUsageHistory };