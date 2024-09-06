function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Content Management')
    .addItem('Open Dashboard', 'openDashboard')
    .addItem('Add New Writer', 'openWriterForm')
    .addItem('Add New Article', 'openArticleForm')
    .addToUi();
}

function openDashboard() {
  try {
    var template = HtmlService.createTemplateFromFile('Dashboard');
    template.writers = getWriters();
    template.articles = getArticles();
    var html = template.evaluate()
      .setWidth(800)
      .setHeight(600);
    SpreadsheetApp.getUi().showModalDialog(html, 'Content Management Dashboard');
  } catch (error) {
    Logger.log('Error in openDashboard: ' + error.toString());
    SpreadsheetApp.getUi().alert('Error opening dashboard: ' + error.message);
  }
}

function openWriterForm() {
  var html = HtmlService.createHtmlOutputFromFile('WriterForm')
    .setWidth(400)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add New Writer');
}

function openArticleForm() {
  var html = HtmlService.createHtmlOutputFromFile('ArticleForm')
    .setWidth(400)
    .setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add New Article');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
