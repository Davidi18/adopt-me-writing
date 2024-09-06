function generateMonthlyReport() {
  var writers = getWriters();
  var articles = getArticles();
  var report = "Monthly Content Production Report\n\n";
  
  var writerStats = {};
  writers.forEach(function(writer) {
    writerStats[writer[0]] = {name: writer[1], articlesCompleted: 0, onTimeRate: 0};
  });
  
  articles.forEach(function(article) {
    if (article[4] === 'Completed') { // Assuming status is in column 5
      var writerId = article[3]; // Assuming writer ID is in column 4
      writerStats[writerId].articlesCompleted++;
      
      var dueDate = new Date(article[6]); // Assuming due date is in column 7
      var completionDate = new Date(article[7]); // Assuming completion date is in column 8
      if (completionDate <= dueDate) {
        writerStats[writerId].onTimeRate++;
      }
    }
  });
  
  for (var writerId in writerStats) {
    var stats = writerStats[writerId];
    stats.onTimeRate = stats.articlesCompleted > 0 ? (stats.onTimeRate / stats.articlesCompleted * 100).toFixed(2) + '%' : 'N/A';
    report += `Writer: ${stats.name}\n`;
    report += `Articles Completed: ${stats.articlesCompleted}\n`;
    report += `On-Time Rate: ${stats.onTimeRate}\n\n`;
  }
  
  return report;
}

function emailMonthlyReport() {
  var report = generateMonthlyReport();
  var recipient = 'manager@example.com'; // Replace with actual email
  var subject = 'Monthly Content Production Report';
  MailApp.sendEmail(recipient, subject, report);
}
