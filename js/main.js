/* Bienes Raíces Asociados — interacción y animaciones */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Título del hero: separar en palabras para la máscara ---------- */
  var title = document.querySelector('[data-split]');
  if (title && !reduceMotion) {
    var i = 0;
    var wrapWords = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span');
            w.className = 'w';
            w.innerHTML = '<span style="--wi:' + (i++) + '"></span>';
            w.firstChild.textContent = part;
            frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          wrapWords(child);
        }
      });
    };
    title.setAttribute('aria-label', title.textContent);
    wrapWords(title);
  }

  /* Índices para escalonar */
  document.querySelectorAll('.hero__facts > div').forEach(function (el, n) { el.style.setProperty('--fi', n); });
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (el, n) { el.style.setProperty('--i', n); });
  });

  /* ---------- Contadores del hero ---------- */
  var formatNumber = function (n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };
  if (!reduceMotion) {
    document.querySelectorAll('[data-count]').forEach(function (el, n) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-format') === 'm2' ? ' m²' : (el.getAttribute('data-suffix') || '');
      var start = null;
      var delay = 1250 + n * 120;
      var duration = 1600;
      el.textContent = '0' + suffix;
      setTimeout(function () {
        var step = function (t) {
          if (!start) start = t;
          var p = Math.min((t - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          el.textContent = formatNumber(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, delay);
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  /* Las fotos con cortina (clip-path) se observan a través de su contenedor,
     porque el recorte haría que el navegador las considere invisibles. */
  var targets = document.querySelectorAll('[data-reveal], [data-stagger], [data-route]');
  var wipeParents = [];
  document.querySelectorAll('[data-wipe]').forEach(function (el) {
    if (wipeParents.indexOf(el.parentElement) === -1) wipeParents.push(el.parentElement);
  });
  var reveal = function (el) {
    if (el.querySelector(':scope > [data-wipe]') && !el.hasAttribute('data-reveal')) {
      el.querySelectorAll(':scope > [data-wipe]').forEach(function (w) { w.classList.add('is-in'); });
    } else {
      el.classList.add('is-in');
    }
  };
  var all = Array.prototype.slice.call(targets).concat(wipeParents);
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    all.forEach(function (el) { io.observe(el); });
  } else {
    all.forEach(reveal);
  }

  /* ---------- Header: sólido al bajar, se oculta al hacer scroll hacia abajo ---------- */
  var header = document.getElementById('top');
  var floatBtn = document.querySelector('.wa-float');
  var lastY = window.scrollY;
  var ticking = false;
  var photo = document.querySelector('[data-parallax]');

  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('is-solid', y > 40);
    if (!root.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    if (floatBtn) floatBtn.classList.toggle('is-visible', y > 500);
    if (photo && !reduceMotion && y < window.innerHeight * 1.2) {
      photo.style.translate = '0 ' + (y * 0.25).toFixed(1) + 'px';
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var setMenu = function (open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) header.classList.remove('is-hidden');
  };
  menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });

  /* ---------- Copiar número ---------- */
  var copyBtn = document.getElementById('copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var label = copyBtn.textContent;
      var done = function (text) {
        copyBtn.textContent = text;
        setTimeout(function () { copyBtn.textContent = label; }, 2000);
      };
      var select = function () {
        var range = document.createRange();
        range.selectNodeContents(document.getElementById('num'));
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        done('Selecciona y copia');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('+57 310 654 4931').then(function () { done('Número copiado'); }, select);
      } else {
        select();
      }
    });
  }
})();
