function generateUniqueId() {
  return Utilities.getUuid();
}

function formatDate(dateValue) {
  if (!(dateValue instanceof Date)) {
    // If dateValue is not already a Date object, try to create one
    dateValue = new Date(dateValue);
  }
  
  // Check if the date is valid
  if (isNaN(dateValue.getTime())) {
    return 'Invalid Date';
  }
  
  return Utilities.formatDate(dateValue, Session.getScriptTimeZone(), "MMM dd, yyyy");
}

function validateEmail(email) {
  var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
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
