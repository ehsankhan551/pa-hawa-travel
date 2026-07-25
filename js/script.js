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
      var isAr = document.documentElement.getAttribute('lang') === 'ar';
      var name = document.getElementById('inq-name').value;
      var phone = document.getElementById('inq-phone').value;
      var service = document.getElementById('inq-service').value;
      var details = document.getElementById('inq-details').value;
      var subject = encodeURIComponent((isAr ? 'استفسار سفر: ' : 'Travel Inquiry: ') + service);
      var body = isAr
        ? encodeURIComponent('الاسم: ' + name + '\nالهاتف/واتساب: ' + phone + '\nالخدمة المطلوبة: ' + service + '\n\n' + details)
        : encodeURIComponent('Name: ' + name + '\nPhone/WhatsApp: ' + phone + '\nService needed: ' + service + '\n\n' + details);
      window.location.href = 'mailto:info@pahawatravel.example?subject=' + subject + '&body=' + body;
    });
  }

  // Homepage tab-style search bar -> switches panels, "Search" sends a WhatsApp inquiry with entered details
  document.querySelectorAll('.search-tab').forEach(function (tabBtn) {
    tabBtn.addEventListener('click', function () {
      var card = tabBtn.closest('.search-card');
      if (!card) return;
      card.querySelectorAll('.search-tab').forEach(function (b) { b.classList.remove('active'); });
      tabBtn.classList.add('active');
      var target = tabBtn.getAttribute('data-target');
      card.querySelectorAll('.search-panel').forEach(function (p) { p.classList.remove('active'); });
      var panel = card.querySelector('#' + target);
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('.search-go').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var panel = btn.closest('.search-panel');
      if (!panel) return;
      var tabName = panel.getAttribute('data-tab-name') || '';
      var greeting = panel.getAttribute('data-greeting') || 'Hi Pa Hawa, I would like to inquire about:';
      var lines = [greeting + ' ' + tabName];
      panel.querySelectorAll('[data-label]').forEach(function (field) {
        if (field.value) { lines.push(field.getAttribute('data-label') + ': ' + field.value); }
      });
      var msg = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/9665XXXXXXXX?text=' + msg, '_blank');
    });
  });
});
