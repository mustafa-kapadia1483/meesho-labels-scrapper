import secrets from "./secrets.json" assert { type: "json" };
import PDFParser from "pdf2json";
import dotenv from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { getFormattedDate, getProductName, getTrackingLink } from "./utils.js";

dotenv.config();
const pdfParser = new PDFParser();

const extractedData = [];

pdfParser.on("pdfParser_dataError", errData =>
  console.error(errData.parserError)
);
pdfParser.on("pdfParser_dataReady", pdfData => {
  pdfData.Pages.forEach(page => {
    const { Texts } = page;

    const shippingTexts = Texts.filter(({ x }) => x === 22.301);
    const shipperName = shippingTexts[0].R[0].T.replace("%20", " ");
    const awbNumber = shippingTexts[1].R[0].T;
    const trackingLink = getTrackingLink(shipperName, awbNumber);
    const orderNumber = Texts.filter(({ x }) => x === 23.529)[4].R[0].T;
    const productName = getProductName(Texts)
      .split("%20")
      .slice(0, 2)
      .join(" ");

    extractedData.push({
      productName,
      orderNumber,
      shipperName,
      awbNumber,
      trackingLink,
    });
  });

  console.log(extractedData);
});

pdfParser.loadPDF("./labels/labels_combined.pdf");

async function updateGoogleSheets() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  await doc.useServiceAccountAuth(secrets);
  await doc.loadInfo();

  console.log(doc.title);

  const sheet = doc.sheetsByTitle["automationTest"];
  console.log(sheet.title);

  sheet.loadHeaderRow();

  extractedData.forEach(
    ({ productName, orderNumber, shipperName, awbNumber, trackingLink }) => {
      sheet.addRow(
        [
          productName,
          orderNumber,
          awbNumber,
          "Unscheduled",
          "Not Paid",
          "",
          getFormattedDate(new Date()),
          shipperName,
          "Waiting For Pickup",
          trackingLink,
        ],
        { insert: true }
      );
    }
  );
}

updateGoogleSheets();
