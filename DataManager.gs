function getWriters() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('כותבים');
  if (!sheet) {
    Logger.log('Writers sheet not found');
    return [];
  }
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var data = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  Logger.log('Retrieved ' + (data.length - 1) + ' writers'); // Log for debugging
  return data.slice(1); // Returns all rows except the header
}

function getArticles() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('מאמרים');
  if (!sheet) {
    Logger.log('Articles sheet not found');
    return [];
  }
  var data = sheet.getDataRange().getValues();
  return data.slice(1); // Returns all rows except the header
}

function addWriter(formObject) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('כותבים');
  if (!sheet) {
    throw new Error('Writers sheet not found');
  }
  var newRow = [
    generateUniqueId(),
    formObject.name,
    formObject.email,
    formObject.phone,
    formObject.specialties,
    new Date(), // Join date
    5, // Default rating
    '' // Empty notes
  ];
  sheet.appendRow(newRow);
}

function addArticle(formObject) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('מאמרים');
  if (!sheet) {
    throw new Error('Articles sheet not found');
  }
  var newRow = [
    generateUniqueId(),
    formObject.title,
    formObject.description,
    formObject.writerId,
    'Not Started', // Initial status
    new Date(), // Start date
    new Date(formObject.dueDate),
    '', // Completion date (empty initially)
    '', // Document link (empty initially)
    formObject.tags
  ];
  sheet.appendRow(newRow);
}

function updateWriter(writerId, updatedData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('כותבים');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === writerId) {
      sheet.getRange(i+1, 2, 1, updatedData.length).setValues([updatedData]);
      break;
    }
  }
}

function updateArticle(articleId, updatedData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('מאמרים');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === articleId) {
      sheet.getRange(i+1, 2, 1, updatedData.length).setValues([updatedData]);
      break;
    }
  }
}

function deleteWriter(writerId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('כותבים');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === writerId) {
      sheet.deleteRow(i+1);
      break;
    }
  }
}

function deleteArticle(articleId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('מאמרים');
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === articleId) {
      sheet.deleteRow(i+1);
      break;
    }
  }
}

function getWriterById(writerId) {
  var writers = getWriters();
  return writers.find(writer => writer[0] === writerId);
}

function getArticleById(articleId) {
  var articles = getArticles();
  return articles.find(article => article[0] === articleId);
}

function getWriterName(writerId) {
  var writer = getWriterById(writerId);
  return writer ? writer[1] : 'Unknown';
}
