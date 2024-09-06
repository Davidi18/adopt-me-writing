function getUserRole() {
  var email = Session.getActiveUser().getEmail();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('משתמשים');
  if (!sheet) {
    Logger.log('גיליון משתמשים לא נמצא');
    return 'כותב'; // ברירת מחדל אם אין גיליון משתמשים
  }
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return data[i][1]; // מניח שהתפקיד נמצא בעמודה השנייה
    }
  }
  return 'כותב'; // ברירת מחדל אם לא נמצא תפקיד
}

function isAdmin() {
  return getUserRole() === 'מנהל';
}

function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}
