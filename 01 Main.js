function main(){
  var taxesInfo = payPalTaxesLog(URL_PAYPAL);
  var completeInfo = readingTaxesInfo(taxesInfo);
  writeToSheeet(ID_SPREADSHEET, SHEET_NAME, completeInfo);

}
