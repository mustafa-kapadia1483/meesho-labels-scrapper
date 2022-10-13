const { getProductName, getTrackingLink } = require("./utils");

async function parsePdfData(filePath) {
  const PDFParser = await import("pdf2json");
  const pdfParser = new PDFParser.default();

  pdfParser.on("pdfParser_dataError", errData =>
    console.error(errData.parserError)
  );

  const extractedData = new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const extractedData = [];

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
      resolve(extractedData);
    });
  });

  pdfParser.loadPDF(filePath);

  return extractedData;
}

module.exports = parsePdfData;
