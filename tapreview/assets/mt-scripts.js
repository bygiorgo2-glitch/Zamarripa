(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveals() {
    var els = document.querySelectorAll('.mt-reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('mt-visible'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('mt-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  function animarNumero(el) {
    var meta = el.getAttribute('data-mt-hasta');
    if (!meta) return;
    var hasta = parseFloat(meta.replace(',', '.'));
    var prefijo = el.getAttribute('data-mt-prefijo') || '';
    var sufijo = el.getAttribute('data-mt-sufijo') || '';
    var decimales = el.getAttribute('data-mt-decimales') ? parseInt(el.getAttribute('data-mt-decimales'), 10) : 0;
    if (reduceMotion) {
      el.textContent = prefijo + hasta.toFixed(decimales) + sufijo;
      return;
    }
    var duracion = 1600;
    var inicio = null;
    function paso(ts) {
      if (inicio === null) inicio = ts;
      var progreso = Math.min((ts - inicio) / duracion, 1);
      var facil = 1 - Math.pow(1 - progreso, 3);
      var actual = hasta * facil;
      el.textContent = prefijo + actual.toFixed(decimales) + sufijo;
      if (progreso < 1) window.requestAnimationFrame(paso);
    }
    window.requestAnimationFrame(paso);
  }

  function initContadores() {
    var els = document.querySelectorAll('[data-mt-hasta]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(animarNumero);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animarNumero(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach(function (el) { io.observe(el); });
  }

  function initCarruseles() {
    document.querySelectorAll('[data-mt-carrusel]').forEach(function (carrusel) {
      var pista = carrusel.querySelector('[data-mt-pista]');
      var prev = carrusel.querySelector('[data-mt-prev]');
      var next = carrusel.querySelector('[data-mt-next]');
      if (!pista) return;
      var paso = function () {
        var tarjeta = pista.querySelector('*');
        var ancho = tarjeta ? tarjeta.getBoundingClientRect().width + 20 : 320;
        return ancho;
      };
      if (next) next.addEventListener('click', function () { pista.scrollBy({ left: paso(), behavior: 'smooth' }); });
      if (prev) prev.addEventListener('click', function () { pista.scrollBy({ left: -paso(), behavior: 'smooth' }); });
    });
  }

  function initTilt() {
    if (reduceMotion) return;
    document.querySelectorAll('[data-mt-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateY(' + (x * 6) + 'deg) rotateX(' + (y * -6) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  function initProductoVariantes() {
    document.querySelectorAll('[data-mt-producto]').forEach(function (root) {
      var dataEl = root.querySelector('[data-mt-variantes-json]');
      if (!dataEl) return;
      var variantes;
      try { variantes = JSON.parse(dataEl.textContent); } catch (e) { return; }
      var inputId = root.querySelector('[data-mt-input-id]');
      var precioEl = root.querySelector('[data-mt-precio]');
      var precioCompareEl = root.querySelector('[data-mt-precio-compare]');
      var botón = root.querySelector('[data-mt-add]');
      var selects = root.querySelectorAll('[data-mt-opcion]');

      function formatoDinero(cent) {
        return (cent / 100).toLocaleString(document.documentElement.lang || 'es-MX', { style: 'currency', currency: (window.Shopify && Shopify.currency && Shopify.currency.active) || 'MXN' });
      }

      function actualizar() {
        var valores = [];
        selects.forEach(function (s) { valores.push(s.value); });
        var encontrada = variantes.find(function (v) {
          return v.options.length === valores.length && v.options.every(function (o, i) { return o === valores[i]; });
        });
        if (!encontrada) return;
        if (inputId) inputId.value = encontrada.id;
        if (precioEl) precioEl.textContent = formatoDinero(encontrada.price);
        if (precioCompareEl) {
          if (encontrada.compare_at_price && encontrada.compare_at_price > encontrada.price) {
            precioCompareEl.textContent = formatoDinero(encontrada.compare_at_price);
            precioCompareEl.style.display = '';
          } else {
            precioCompareEl.style.display = 'none';
          }
        }
        if (botón) {
          var span = botón.querySelector('[data-mt-add-texto]');
          if (encontrada.available) {
            botón.disabled = false;
            botón.setAttribute('data-mt-estado', 'disponible');
            if (span) span.textContent = botón.getAttribute('data-mt-texto-disponible');
          } else {
            botón.disabled = true;
            botón.setAttribute('data-mt-estado', 'agotado');
            if (span) span.textContent = botón.getAttribute('data-mt-texto-agotado');
          }
        }
      }

      selects.forEach(function (s) { s.addEventListener('change', actualizar); });
      actualizar();
    });
  }

  function initGaleriaProducto() {
    document.querySelectorAll('[data-mt-galeria]').forEach(function (galeria) {
      var principal = galeria.querySelector('[data-mt-imagen-principal]');
      var minis = galeria.querySelectorAll('[data-mt-mini]');
      if (!principal || !minis.length) return;
      minis.forEach(function (mini) {
        mini.addEventListener('click', function () {
          var src = mini.getAttribute('data-mt-src');
          var srcset = mini.getAttribute('data-mt-srcset');
          var alt = mini.getAttribute('data-mt-alt') || '';
          if (src) principal.src = src;
          if (srcset) principal.srcset = srcset;
          principal.alt = alt;
          minis.forEach(function (m) { m.classList.remove('mt-mini-activa'); });
          mini.classList.add('mt-mini-activa');
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveals();
    initContadores();
    initCarruseles();
    initTilt();
    initProductoVariantes();
    initGaleriaProducto();
  });
})();
