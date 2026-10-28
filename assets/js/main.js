/* Pedras Tricordiana | LP QH4 Growth */
(function () {
  'use strict';

  /* ===== CONFIGURAÇÃO ===== */
  var WHATSAPP = '5535999798434';
  // Se houver Google Apps Script, cole a URL do Web App aqui. Vazio = envia direto pro WhatsApp com todos os campos.
  var APPS_SCRIPT_URL = '';
  var MSG_PADRAO = 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.';

  window.dataLayer = window.dataLayer || [];
  function track(evento, dados) {
    var o = { event: evento };
    for (var k in dados) o[k] = dados[k];
    window.dataLayer.push(o);
  }

  /* ===== Catálogo (textos do site oficial da Pedras Tricordiana) ===== */
  var PEDRAS = [
    { slug: 'travertino', nome: 'Travertino Bege Bahia', fotos: 7, desc: 'Pedra de luxo com beleza atemporal. Os tons de bege e a textura única fazem dela uma escolha refinada para pisos, revestimentos de parede e elementos de design de interiores.' },
    { slug: 'quartzito', nome: 'Quartzito São Tomé', fotos: 5, desc: 'Pedra de elegância natural, conhecida pela resistência e versatilidade. Com variedade de cores e texturas, é perfeita para aplicações internas e externas.' },
    { slug: 'moledo', nome: 'Moledo', fotos: 7, desc: 'Opção encantadora para projetos que buscam aparência rústica e acolhedora. Tonalidades suaves e textura agradável para áreas de lazer, jardins e convivência.' },
    { slug: 'ferro', nome: 'Pedra Ferro', fotos: 5, desc: 'Robusta e resistente, perfeita para ambientes que exigem durabilidade. Tonalidade sóbria e textura marcante, ideal para calçadas e áreas de lazer.' },
    { slug: 'hitam', nome: 'Hitam', fotos: 5, desc: 'Escolha contemporânea que traz elegância e exclusividade ao revestimento. Cor preta e superfície polida para ambientes modernos e sofisticados.' },
    { slug: 'hijau', nome: 'Hijau', fotos: 5, desc: 'Importada da Indonésia, uma pedra exótica com toque de beleza tropical. Verde intenso e textura única para ambientes sofisticados.' },
    { slug: 'miracema', nome: 'Miracema', fotos: 5, desc: 'Conhecida pela rusticidade e resistência. Com superfície antiderrapante, vai bem em áreas de alto tráfego como calçadas, piscinas e áreas externas.' },
    { slug: 'bossa-nova', nome: 'Bossa Nova', fotos: 5, desc: 'Pedra sofisticada que combina textura e elegância. Variações de tons e padrões para projetos que buscam um toque artístico e exclusivo.' },
    { slug: 'aquamarine', nome: 'Aquamarine', fotos: 5, desc: 'Tonalidade de azul suave que lembra águas cristalinas. Perfeita para áreas de piscina e ambientes que pedem serenidade.' },
    { slug: 'atacama', nome: 'Atacama', fotos: 3, desc: 'Pedra única, de aparência marcante e textura rústica. Ideal para projetos que buscam um toque artístico e autêntico.' },
    { slug: 'folheta', nome: 'Folheta', fotos: 5, desc: 'Clássica e versátil, conhecida pela durabilidade e facilidade de manutenção. Opções de cores para pisos e revestimentos internos e externos.' }
  ];

  var lista = document.querySelector('.cat__lista');
  var fotos = document.querySelector('.cat__fotos');
  var nomeEl = document.querySelector('.cat__nome');
  var descEl = document.querySelector('.cat__desc');
  var catCta = document.querySelector('.cat__cta');
  var selPedra = document.getElementById('f-pedra');

  function src(slug, n) { return 'assets/img/' + slug + '-' + n + '.webp'; }

  function mostra(i, foco) {
    var p = PEDRAS[i];
    lista.querySelectorAll('button').forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); b.tabIndex = k === i ? 0 : -1; });
    nomeEl.textContent = p.nome;
    descEl.textContent = p.desc;
    catCta.setAttribute('data-pedra-cta', p.nome);
    var html = '<img class="cat__largo" src="' + src(p.slug, 1) + '" alt="' + p.nome + ' aplicada em ambiente" width="576" height="285">';
    var total = Math.min(p.fotos, 7);
    for (var n = 2; n <= total; n++) html += '<img src="' + src(p.slug, n) + '" alt="' + p.nome + ', foto ' + n + '" width="284" height="284" loading="lazy">';
    fotos.innerHTML = html;
    var q = total - 1;
    fotos.style.gridTemplateColumns = 'repeat(' + (q % 3 === 0 ? 3 : (q === 4 ? 4 : 2)) + ',1fr)';
    if (foco) lista.querySelectorAll('button')[i].focus();
  }

  PEDRAS.forEach(function (p, i) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = p.nome;
    b.addEventListener('click', function () { mostra(i); track('ver_pedra', { pedra: p.nome }); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); mostra((i + 1) % PEDRAS.length, true); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); mostra((i - 1 + PEDRAS.length) % PEDRAS.length, true); }
    });
    li.appendChild(b); lista.appendChild(li);
    var o = document.createElement('option'); o.textContent = p.nome; selPedra.appendChild(o);
  });
  ['Outra pedra', 'Ainda não sei, quero indicação'].forEach(function (t) { var o = document.createElement('option'); o.textContent = t; selPedra.appendChild(o); });
  mostra(0);

  /* ===== Mostruário do hero ===== */
  var amostras = document.querySelectorAll('.amostra');
  function ativa(a) {
    amostras.forEach(function (x) { x.classList.remove('is-ativa'); x.setAttribute('aria-pressed', 'false'); });
    a.classList.add('is-ativa'); a.setAttribute('aria-pressed', 'true');
  }
  var finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  amostras.forEach(function (a) {
    a.addEventListener('click', function () {
      if (a.classList.contains('is-ativa')) {
        var idx = PEDRAS.findIndex(function (p) { return p.slug === a.dataset.pedra; });
        if (idx > -1) { mostra(idx); document.getElementById('pedras').scrollIntoView({ behavior: 'smooth' }); }
      } else { ativa(a); }
    });
    if (finePointer) a.addEventListener('mouseenter', function () { ativa(a); });
  });

  /* ===== Pré-seleciona pedra no formulário ===== */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-pedra-cta]');
    if (el) { selPedra.value = el.getAttribute('data-pedra-cta'); valida(); }
    var t = e.target.closest('[data-track]');
    if (t) track(t.getAttribute('data-track').indexOf('whatsapp') === 0 ? 'whatsapp_click' : 'cta_click', { local: t.getAttribute('data-track') });
  });

  /* ===== Topo ===== */
  var topo = document.getElementById('topo');
  function rolagem() { topo.classList.toggle('is-rolado', window.scrollY > 40); }
  window.addEventListener('scroll', rolagem, { passive: true }); rolagem();

  /* ===== Reveal ===== */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visivel'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ===== Parallax leve na foto da origem ===== */
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fotoOrigem = document.querySelector('.origem__foto img');
  if (fotoOrigem && !reduz) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var r = fotoOrigem.parentElement.getBoundingClientRect();
        var prog = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        fotoOrigem.style.transform = 'scale(1.08) translateY(' + (prog * -24).toFixed(1) + 'px)';
        tick = false;
      });
    }, { passive: true });
  }

  /* ===== Formulário ===== */
  var form = document.getElementById('form-orcamento');
  var btn = document.getElementById('f-enviar');
  var dica = document.getElementById('f-dica');
  var whats = document.getElementById('f-whats');

  whats.addEventListener('input', function () {
    var d = whats.value.replace(/\D/g, '').slice(0, 11);
    var v = d;
    if (d.length > 0) v = '(' + d.slice(0, 2);
    if (d.length >= 2) v += ') ';
    if (d.length > 2) v += d.slice(2, 3);
    if (d.length > 3) v += ' ' + d.slice(3, 7);
    if (d.length > 7) v += '-' + d.slice(7, 11);
    whats.value = v;
  });
  whats.addEventListener('blur', function () { whats.classList.toggle('is-invalido', whats.value !== '' && !whats.checkValidity()); });

  function valida() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    dica.textContent = ok ? 'Tudo certo. Você será levado ao WhatsApp.' : 'Preencha os campos para liberar o envio.';
    return ok;
  }
  form.addEventListener('input', valida);
  form.addEventListener('change', valida);
  valida();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valida()) return;
    var f = new FormData(form);
    var dados = {};
    f.forEach(function (v, k) { dados[k] = String(v).trim(); });
    track('generate_lead', { pedra: dados.pedra, metragem: dados.metragem, perfil: dados.perfil });
    btn.disabled = true; btn.textContent = 'Enviando...';

    if (APPS_SCRIPT_URL) {
      dados.origem = 'LP Pedras Tricordiana'; dados.data = new Date().toLocaleString('pt-BR');
      fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(dados) })
        .catch(function () {})
        .then(function () { location.href = 'obrigado.html?m=' + encodeURIComponent(MSG_PADRAO); });
      return;
    }

    var msg = 'Olá, vim pelo site da Pedras Tricordiana e quero um orçamento.\n\n' +
      '*Nome:* ' + dados.nome + '\n' +
      '*WhatsApp:* ' + dados.whatsapp + '\n' +
      '*Cidade da obra:* ' + dados.cidade + '\n' +
      '*Perfil:* ' + dados.perfil + '\n' +
      '*Pedra de interesse:* ' + dados.pedra + '\n' +
      '*Metragem:* ' + dados.metragem + '\n' +
      '*Prazo:* ' + dados.prazo +
      (dados.mensagem ? '\n*Detalhes:* ' + dados.mensagem : '');
    location.href = 'obrigado.html?m=' + encodeURIComponent(msg);
  });
})();
