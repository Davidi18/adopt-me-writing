function sendDailyReminders() {
  var articles = getArticles();
  var today = new Date();
  
  articles.forEach(function(article) {
    var dueDate = new Date(article[6]); // Assuming due date is in column 7
    var timeDiff = dueDate.getTime() - today.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 3 && daysDiff > 0) {
      sendReminderEmail(article);
    }
  });
}

function sendReminderEmail(article) {
  var writerEmail = getWriterEmail(article[3]); // Assuming writer ID is in column 4
  var subject = 'Reminder: Article Due Soon';
  var body = 'Your article "' + article[1] + '" is due in ' + daysDiff + ' days.';
  
  MailApp.sendEmail(writerEmail, subject, body);
}

function updateArticleStatuses() {
  var articles = getArticles();
  var today = new Date();
  
  articles.forEach(function(article, index) {
    var dueDate = new Date(article[6]); // Assuming due date is in column 7
    if (today > dueDate && article[4] !== 'Completed') { // Assuming status is in column 5
      updateArticleStatus(index + 2, 'Overdue'); // +2 because of header row and 0-indexing
    }
  });
}
