/**
 * Backup de leads - NLG Comex
 *
 * Como instalar:
 * 1. Crie uma planilha nova no Google Sheets (sheets.new).
 * 2. No menu, vá em Extensões > Apps Script.
 * 3. Apague o conteúdo padrão e cole todo este arquivo.
 * 4. Clique em "Implantar" (Deploy) > "Nova implantação" (New deployment).
 * 5. Tipo: "App da Web" (Web app).
 *    - Executar como: Eu (seu e-mail)
 *    - Quem pode acessar: Qualquer pessoa (Anyone)
 * 6. Clique em "Implantar" e autorize as permissões pedidas.
 * 7. Copie a URL do "App da Web" (termina em /exec) e me envie.
 */

const SHEET_NAME = "Leads";

const COLUMNS = [
  "Recebido em",
  "Nome",
  "Sobrenome",
  "Empresa",
  "Telefone",
  "E-mail",
  "Já importou",
  "Faixa de investimento",
  "Produto",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      data.contact_name || "",
      data.contact_sobrenome || "",
      data.contact_nome_empresa || "",
      data.contact_telefone || "",
      data.contact_email || "",
      data.contact_importou || "",
      data.contact_quanto || "",
      data.contact_qual || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
