function payPalTaxesLog(urlToRead) {
  var urlFetch = UrlFetchApp.fetch(urlToRead);
  var htmlOfUrlFetch = urlFetch.getContentText();
  var regexUrl = /<small>tx câmbio R\$<\/small>\n.*\<span class="label label-primary">(.*)<\/span>\n.*\n.*\n.*<small>IOF<\/small>\n.*<span class="label label-primary">(.*)%<\/span>/gm;
  var execRegexUrl = regexUrl.exec(htmlOfUrlFetch);
  
  return execRegexUrl;

}

function readingTaxesInfo(taxesInfo) {
  var dictionaryOfTaxes = new Object();
  var usdToBrl = taxesInfo[1] * (1 + (taxesInfo[2] / 100));
  
  dictionaryOfTaxes.enchange = taxesInfo[1];
  dictionaryOfTaxes.iof = taxesInfo[2];
  dictionaryOfTaxes.usdToBrl = usdToBrl;
  
  return dictionaryOfTaxes;

}

function writeToSheeet(spreadsheet, sheet, data) {
  var now = Date();
  
  var spreadsheetById = SpreadsheetApp.openById(spreadsheet);
  var sheetByName = spreadsheetById.getSheetByName(sheet);
  
  var headerOfSheet = ['Exchange', 'IOF', 'USD to BRL', 'Date/Time'];
  sheetByName.getRange(1, 1, 1, headerOfSheet.length).setValues([headerOfSheet]);
  
  var lastRow = sheetByName.getLastRow() + 1;
  sheetByName.getRange(lastRow, 1).setValue([data['enchange']]);
  sheetByName.getRange(lastRow, 2).setValue([data['iof']]);
  sheetByName.getRange(lastRow, 3).setValue([data['usdToBrl']]);
  sheetByName.getRange(lastRow, 4).setValue([now]);
  sheetByName.autoResizeColumns(1, 4);

}
