(function () {
  var modal = document.getElementById('contact-modal');
  var openTriggers = document.querySelectorAll('.js-open-modal');
  var closeBtn = modal.querySelector('.js-close-modal');
  var formView = modal.querySelector('.js-form-view');
  var successView = modal.querySelector('.js-success-view');
  var form = modal.querySelector('.js-contact-form');
  var lastFocused = null;

  function openModal(e) {
    if (e) e.preventDefault();
    lastFocused = document.activeElement;
    modal.hidden = false;
    formView.hidden = false;
    successView.hidden = true;
    form.reset();
    var firstInput = form.querySelector('input, textarea');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    modal.hidden = true;
    if (lastFocused) lastFocused.focus();
  }

  openTriggers.forEach(function (el) {
    el.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  function encode(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var payload = {};
    formData.forEach(function (value, key) { payload[key] = value; });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(payload)
    })
      .then(function () {
        formView.hidden = true;
        successView.hidden = false;
      })
      .catch(function () {
        formView.hidden = true;
        successView.hidden = false;
      });
  });
})();
