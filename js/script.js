// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Inquiry form -> opens the visitor's email app with prefilled details (no server needed)
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('inq-name').value;
      var phone = document.getElementById('inq-phone').value;
      var service = document.getElementById('inq-service').value;
      var details = document.getElementById('inq-details').value;
      var subject = encodeURIComponent('Travel Inquiry: ' + service);
      var body = encodeURIComponent(
        'Name: ' + name + '\nPhone/WhatsApp: ' + phone + '\nService needed: ' + service + '\n\n' + details
      );
      window.location.href = 'mailto:info@pahawatravel.example?subject=' + subject + '&body=' + body;
    });
  }
});
