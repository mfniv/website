/* ==========================================================================
   Research – Mobile sidebar toggle & active section highlighting
   ========================================================================== */
(function () {
  'use strict';

  /* --- Star particles (shared across hub + paper pages) --- */
  var starsContainer = document.getElementById('stars');
  if (starsContainer) {
    var count = 60;
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', (4 + Math.random() * 8) + 's');
      star.style.setProperty('--delay', (Math.random() * 10) + 's');
      var size = Math.random() < 0.3 ? 2 : 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      starsContainer.appendChild(star);
    }
  }

  /* --- Mobile sidebar toggle (paper pages only) --- */
  var toggle = document.getElementById('sidebar-toggle');
  var sidebar = document.getElementById('paper-sidebar');
  var overlay = document.getElementById('sidebar-overlay');

  if (toggle && sidebar) {
    function openSidebar() {
      sidebar.classList.add('open');
      if (overlay) overlay.classList.add('visible');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
      sidebar.classList.remove('open');
      if (overlay) overlay.classList.remove('visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });

    if (overlay) {
      overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when a nav link is clicked (mobile)
    var navLinks = sidebar.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          closeSidebar();
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
        toggle.focus();
      }
    });
  }

  /* --- Active section highlighting (paper pages) --- */
  var sidebarNavLinks = document.querySelectorAll('.sidebar-nav a');
  if (sidebarNavLinks.length > 0) {
    var sections = [];
    sidebarNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var section = document.getElementById(href.substring(1));
        if (section) {
          sections.push({ el: section, link: link });
        }
      }
    });

    if (sections.length > 0) {
      function highlightActive() {
        var scrollY = window.scrollY + 120;
        var current = sections[0];

        for (var i = 0; i < sections.length; i++) {
          if (sections[i].el.offsetTop <= scrollY) {
            current = sections[i];
          }
        }

        sidebarNavLinks.forEach(function (l) { l.classList.remove('active'); });
        current.link.classList.add('active');
      }

      window.addEventListener('scroll', highlightActive, { passive: true });
      highlightActive();
    }
  }
})();
