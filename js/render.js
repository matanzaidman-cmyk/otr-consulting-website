(function () {
  function getByPath(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      return acc == null ? undefined : acc[key];
    }, obj);
  }

  function applyScalars(root, data) {
    root.querySelectorAll('[data-key]').forEach(function (el) {
      if (el.closest('template')) return;
      var value = getByPath(data, el.getAttribute('data-key'));
      if (value == null) return;
      el.textContent = value;
    });
    root.querySelectorAll('[data-ph]').forEach(function (el) {
      var value = getByPath(data, el.getAttribute('data-ph'));
      if (value == null) return;
      el.setAttribute('placeholder', value);
    });
  }

  function applyLists(root, data) {
    root.querySelectorAll('[data-list]').forEach(function (container) {
      var items = getByPath(data, container.getAttribute('data-list'));
      var template = container.querySelector('template');
      if (!Array.isArray(items) || !template) return;
      container.querySelectorAll(':scope > :not(template)').forEach(function (el) {
        el.remove();
      });
      items.forEach(function (item) {
        var clone = template.content.cloneNode(true);
        clone.querySelectorAll('[data-key]').forEach(function (el) {
          var value = getByPath(item, el.getAttribute('data-key'));
          if (value == null) return;
          el.textContent = value;
        });
        container.appendChild(clone);
      });
    });
  }

  function render(data) {
    applyLists(document, data);
    applyScalars(document, data);
  }

  var contentPath = document.documentElement.getAttribute('data-content-path');
  if (!contentPath) return;

  fetch(contentPath, { cache: 'no-cache' })
    .then(function (res) { return res.json(); })
    .then(render)
    .catch(function (err) {
      console.error('Content load failed, keeping static fallback text.', err);
    });
})();
