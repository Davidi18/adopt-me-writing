function createDashboard() {
  var template = HtmlService.createTemplateFromFile('Dashboard');
  template.writers = getWriters();
  template.articles = getArticles();
  return template.evaluate()
      .setTitle('Content Management Dashboard')
      .setWidth(1000)
      .setHeight(800);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getTotalWriters() {
  return getWriters().length;
}

function getTotalArticles() {
  return getArticles().length;
}

function getArticlesInProgress() {
  return getArticles().filter(function(article) {
    return article[4] === 'In Progress';
  }).length;
}

function getOverdueArticles() {
  var today = new Date();
  return getArticles().filter(function(article) {
    var dueDate = new Date(article[6]);
    return dueDate < today && article[4] !== 'Completed';
  }).length;
}

function getRecentActivity() {
  // This is a placeholder. In a real application, you'd track actual activity.
  return [
    'New article "SEO Best Practices" added',
    'Writer "John Doe" completed "Content Marketing Strategies"',
    'New writer "Jane Smith" joined the team',
    'Article "Social Media Trends" is overdue'
  ];
}

function getWriterArticleCount(writerId) {
  return getArticles().filter(function(article) {
    return article[3] === writerId;
  }).length;
}

function getStatusColor(status) {
  switch(status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'Not Started':
      return 'bg-gray-100 text-gray-800';
    case 'Overdue':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
}

function formatDate(dateString) {
  var date = new Date(dateString);
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "MMM dd, yyyy");
}
