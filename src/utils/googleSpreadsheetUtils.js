const { GoogleSpreadsheet } = require("google-spreadsheet");
const { getFormattedDate } = require("./utils");

async function updateGoogleSheets(
  secrets,
  googleSpreadsheetId,
  sheetName,
  extractedData
) {
  let doc;
  try {
    doc = new GoogleSpreadsheet(googleSpreadsheetId);
    await doc.useServiceAccountAuth(secrets);
    await doc.loadInfo();
  } catch (error) {
    return "Invalid Sheet Link, please check the google sheet link";
  }
  console.log("doc", doc);

  console.log(doc.title);

  const sheet = doc.sheetsByTitle[sheetName];
  if (sheet === undefined || sheet === null) {
    return "Sheet name not found, please check the name of the sheet";
  }

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

  return "success";
}

module.exports = updateGoogleSheets;
