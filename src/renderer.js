const { ipcRenderer } = require("electron");
const path = require("path");

const uploadButton = document.getElementById("upload-button");

uploadButton.addEventListener("click", async () => {
  const result = await ipcRenderer.invoke("showDialog");
  let [pdfFilePath] = result?.filePaths;

  const extractedData = await ipcRenderer.invoke("parsePdfData", pdfFilePath);
  const table = createTable(extractedData);

  const row = document.createElement("div");
  row.className = "row";
  row.append(table);
  document.querySelector(".container-fluid").append(row);

  const buttonContainer = document.querySelector(".button-container");
  const uploadDataButton = createButton("Upload Data to Sheets", "ms-action2");
  buttonContainer.append(uploadDataButton);

  const inputsRow = document.getElementById("inputs-row");

  const storedSpreadhsheetSheetLink = localStorage.getItem("sheetLink") ?? "";
  const col1 = createCol();
  col1.append(
    createInputGroup(
      "Spreadsheet Link",
      "sheet-link",
      "text",
      storedSpreadhsheetSheetLink
    )
  );

  const storedSheetName = localStorage.getItem("sheetName") ?? "";
  const col2 = createCol();
  col2.append(
    createInputGroup("Sheet Name", "sheet-name", "text", storedSheetName)
  );

  inputsRow.append(col1, col2);

  uploadDataButton.addEventListener("click", async () => {
    const spreadsheeLinkInput = document.getElementById("sheet-link");
    const sheetNameInput = document.getElementById("sheet-name");

    const spreadsheetID = spreadsheeLinkInput?.value
      ?.replace("https://", "")
      ?.split("/")[3];
    console.log(spreadsheetID);
    const sheetName = sheetNameInput.value;

    if (sheetName.length <= 0 && spreadsheetID.length <= 0) return;
    const uploadResult = await ipcRenderer.invoke(
      "updateGoogleSheets",
      spreadsheetID,
      sheetName,
      extractedData
    );

    if (!(uploadResult === "success")) {
      alert(uploadResult);
      console.log(uploadResult);
      return;
    }

    localStorage.setItem("sheetLink", spreadsheeLinkInput?.value);
    localStorage.setItem("sheetName", sheetNameInput?.value);

    confirm(`${extractedData?.length} orders have been uploaded`);
    [row, uploadDataButton, col1, col2].forEach(el => el.remove());
  });
});

function createTable(extractedData) {
  const table = document.createElement("table");
  table.className = "ms-table ms-striped mt-5";

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const theadTr = document.createElement("tr");
  Object.keys(extractedData[0]).forEach(key => {
    const th = document.createElement("th");
    th.innerText = key.replace(/([a-z])([A-Z])/g, "$1 $2");
    th.style.textTransform = "capitalize";
    theadTr.append(th);
  });

  thead.append(theadTr);

  for (data of extractedData) {
    const tr = document.createElement("tr");

    for (const value of Object.values(data)) {
      const td = document.createElement("td");
      td.innerText = value;
      tr.append(td);
    }

    tbody.append(tr);
  }
  table.append(thead);
  table.append(tbody);

  return table;
}

function createButton(buttonText, className) {
  const button = document.createElement("button");
  button.textContent = buttonText;
  button.className = className;

  return button;
}

function createInputGroup(labelText, id, type, value) {
  const div = document.createElement("div");
  div.className = "ms-form-group";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;

  div.append(label);

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.value = value;

  div.append(input);

  return div;
}

function createCol() {
  const col = document.createElement("div");
  col.className = "col";
  return col;
}
