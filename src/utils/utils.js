function getFormattedDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return `${d > 9 ? d : "0" + d}/${m > 9 ? m : "0" + m}/${y}`;
}

function getProductName(Texts) {
  const totalTextIndex = Texts.findIndex(({ R }) => R[0].T === "Total");
  return Texts[totalTextIndex + 1].R[0].T;
}

function getTrackingLink(shipperName, awbNumber) {
  switch (shipperName) {
    case "Xpress Bees":
      return `https://www.xpressbees.com/track?isawb=Yes&trackid=${awbNumber}`;
    case "Ecom Express":
      return `https://ecomexpress.in/tracking/?track_id=${awbNumber}`;
    case "Delhivery":
      return `https://www.delhivery.com/track/package/${awbNumber}`;
    default:
      return "NA";
  }
}

module.exports = { getFormattedDate, getProductName, getTrackingLink };
