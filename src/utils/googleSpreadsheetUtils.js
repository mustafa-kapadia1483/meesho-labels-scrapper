const { GoogleSpreadsheet } = require("google-spreadsheet");
const { getFormattedDate } = require("./utils");

async function updateGoogleSheets(
  secrets,
  googleSpreadsheetId,
  sheetName,
  extractedData
) {
  const doc = new GoogleSpreadsheet(googleSpreadsheetId);
  await doc.useServiceAccountAuth(secrets);
  await doc.loadInfo();

  console.log(doc.title);

  const sheet = doc.sheetsByTitle[sheetName];
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

module.exports = updateGoogleSheets;
