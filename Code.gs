function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Content Management')
    .addItem('Open Dashboard', 'openDashboard')
    .addItem('Add New Writer', 'openWriterForm')
    .addItem('Add New Article', 'openArticleForm')
    .addToUi();
}

function openDashboard() {
  var userRole = getUserRole();
  var template = HtmlService.createTemplateFromFile(userRole === 'מנהל' ? 'DashboardAdmin' : 'DashboardWriter');
  
  if (userRole === 'מנהל') {
    template.writers = getWriters();
    template.articles = getArticles();
  } else {
    var userEmail = getCurrentUserEmail();
    template.articles = getArticlesByWriter(userEmail);
  }

  var html = template.evaluate()
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'לוח בקרה');
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
