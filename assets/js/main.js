// Vendeme — comportamiento compartido entre páginas
(function(){
  // Belt-and-suspenders reinforcement of the inline <head> fix (scrollRestoration='manual'
  // set as early as possible in every page's <head>): force top-of-page a few more times in
  // case something later — a late image/font layout shift, a browser that restores scroll
  // after this point — still leaves it scrolled. Unconditional: this is a brochure site, every
  // page should always open at the top, full stop.
  var forceTop = function(){ window.scrollTo(0, 0); };
  forceTop();
  document.addEventListener('DOMContentLoaded', forceTop);
  window.addEventListener('load', forceTop);
  setTimeout(forceTop, 0);
  setTimeout(forceTop, 300);

  // Current-page nav state: every page ships the same 6 tool links with no way to tell
  // which one you're on (Impeccable /clarify, P3) — mark it via aria-current, no per-page markup.
  document.addEventListener('DOMContentLoaded', function(){
    var here = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === here) a.setAttribute('aria-current', 'page');
    });
  });

  // Reveal-on-scroll
  document.addEventListener('DOMContentLoaded', function(){
    var revealEls = document.querySelectorAll('.content-block, .cta-banner, .panel, .nosotros .row, .contact-grid, .ticket-banner-caption, .chapter-finale, .tool-grid');
    revealEls.forEach(function(el){ el.classList.add('reveal'); });
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('is-visible'); });
    }
  });

  // Mobile nav toggle
  document.addEventListener('DOMContentLoaded', function(){
    var header = document.querySelector('header');
    var toggle = header && header.querySelector('.nav-toggle');
    if(!header || !toggle) return;
    toggle.addEventListener('click', function(){
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    header.querySelectorAll('.nav-mobile a').forEach(function(a){
      a.addEventListener('click', function(){ header.classList.remove('nav-open'); });
    });
  });

  // Hero receipt: subtle pointer-driven tilt (premium product-shot feel)
  document.addEventListener('DOMContentLoaded', function(){
    var wrap = document.querySelector('.hero-receipt');
    var tape = document.querySelector('.receipt-tape');
    if(!wrap || !tape) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    wrap.addEventListener('mousemove', function(e){
      var r = tape.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var tiltY = (px - 0.5) * 14;
      var tiltX = (0.5 - py) * 10;
      tape.style.setProperty('--tilt-x', tiltX.toFixed(2) + 'deg');
      tape.style.setProperty('--tilt-y', tiltY.toFixed(2) + 'deg');
    });
    wrap.addEventListener('mouseleave', function(){
      tape.style.setProperty('--tilt-x', '0deg');
      tape.style.setProperty('--tilt-y', '0deg');
    });
  });

  // Check tool-visual (home): switch between phone and quemador photo
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.check-visual-toggle').forEach(function(toggle){
      var panel = toggle.closest('.tool-panel') || toggle.closest('.tool-grid') || toggle.closest('.pin-inner') || toggle.parentElement;
      var btns = toggle.querySelectorAll('.cv-btn');
      var modes = panel.querySelectorAll('.check-visual-mode');
      btns.forEach(function(btn){
        btn.addEventListener('click', function(){
          var key = btn.getAttribute('data-mode');
          btns.forEach(function(b){ b.classList.toggle('active', b === btn); });
          modes.forEach(function(m){ m.classList.toggle('active', m.getAttribute('data-mode') === key); });
        });
      });
    });
  });

  // Download buttons (home): open a small menu with the App Store / Google Play links
  document.addEventListener('DOMContentLoaded', function(){
    var menus = document.querySelectorAll('.dl');
    if(!menus.length) return;
    function close(m){
      m.classList.remove('open');
      var b = m.querySelector('.btn-dl');
      if(b) b.setAttribute('aria-expanded', 'false');
    }
    menus.forEach(function(m){
      var btn = m.querySelector('.btn-dl');
      if(!btn) return;
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var willOpen = !m.classList.contains('open');
        menus.forEach(close);
        if(willOpen){ m.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
      m.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ close(m); btn.focus(); } });
      m.addEventListener('focusout', function(e){ if(e.relatedTarget && !m.contains(e.relatedTarget)) close(m); });
    });
    document.addEventListener('click', function(e){
      menus.forEach(function(m){ if(!m.contains(e.target)) close(m); });
    });
  });

  // Download buttons on a phone: skip the App Store / Google Play choice and link straight
  // to the store that phone can actually install from. On desktop there's no way to know
  // which one the visitor needs, so the menu above stays as-is there.
  document.addEventListener('DOMContentLoaded', function(){
    var ua = navigator.userAgent || '';
    var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var isAndroid = /Android/.test(ua);
    if(!isIOS && !isAndroid) return;
    document.querySelectorAll('.dl').forEach(function(dl){
      var btn = dl.querySelector('.btn-dl');
      var menu = dl.querySelector('.dl-menu');
      if(!btn || !menu) return;
      var target = null;
      menu.querySelectorAll('a[href]').forEach(function(a){
        var href = a.getAttribute('href') || '';
        if(isIOS && href.indexOf('apps.apple.com') !== -1) target = href;
        if(isAndroid && href.indexOf('play.google.com') !== -1) target = href;
      });
      if(!target) return; // that store link isn't published yet — keep the menu so the other option still works
      var icon = btn.querySelector('.btn-dl-icon');
      var label = btn.textContent.replace(/\s+/g, ' ').trim();
      var a = document.createElement('a');
      a.className = btn.className;
      a.href = target;
      a.target = '_blank';
      a.rel = 'noopener';
      if(icon) a.appendChild(icon.cloneNode(true));
      a.appendChild(document.createTextNode(label));
      dl.innerHTML = '';
      dl.appendChild(a);
    });
  });

  // Tools explorer (home): click-through tab switcher
  document.addEventListener('DOMContentLoaded', function(){
    var shell = document.querySelector('.tools-shell');
    if(!shell) return;
    var tabs = shell.querySelectorAll('.tool-tab');
    var panels = shell.querySelectorAll('.tool-panel');
    tabs.forEach(function(tab){
      tab.addEventListener('click', function(){
        var key = tab.getAttribute('data-tool');
        tabs.forEach(function(t){
          var isActive = t === tab;
          t.classList.toggle('active', isActive);
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        panels.forEach(function(p){
          var isTarget = p.getAttribute('data-tool') === key;
          if(isTarget){
            p.classList.remove('exiting');
            p.classList.add('active');
          } else if(p.classList.contains('active')){
            p.classList.remove('active');
            p.classList.add('exiting');
            setTimeout(function(){ p.classList.remove('exiting'); }, 520);
          }
        });
        if(tab.scrollIntoView){ tab.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' }); }
      });
    });
  });

  // Pinned product-story scroll (used on pos/totems/check/etc.)
  function initPin(wrapId, opts){
    opts = opts || {};
    var wrap = document.getElementById(wrapId);
    if(!wrap) return;
    var stages = wrap.querySelectorAll('.pin-stage');
    var dots = wrap.querySelectorAll('.pin-progress .dot');
    var device3d = wrap.querySelector('.device3d');
    var deviceFrame = wrap.querySelector('.device-frame');
    var screens = wrap.querySelectorAll('.screen-panel');
    var scenes = wrap.querySelectorAll('[data-stages]');
    var n = Math.max(stages.length, 1);
    var ticking = false;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var mobileMq = window.matchMedia ? window.matchMedia('(max-width:860px)') : null;
    function isMobile(){ return !!(mobileMq && mobileMq.matches); }

    function applyStage(stageIdx){
      stages.forEach(function(s, i){
        var on = i === stageIdx;
        s.classList.toggle('active', on);
        s.setAttribute('aria-hidden', String(!on));
        // aria-hidden alone doesn't stop a focusable descendant (e.g. an inline <a>) from
        // being tabbed to while its stage is invisible — inert blocks focus too, natively.
        s.inert = !on;
      });
      dots.forEach(function(d, i){
        d.classList.toggle('active', i === stageIdx);
        if(i === stageIdx){ d.setAttribute('aria-current', 'step'); } else { d.removeAttribute('aria-current'); }
      });
      screens.forEach(function(s){
        var st = parseInt(s.getAttribute('data-stage'), 10);
        var on = st === stageIdx;
        s.classList.toggle('active', on);
        s.setAttribute('aria-hidden', String(!on));
      });
      scenes.forEach(function(el){
        var list = (el.getAttribute('data-stages') || '').split(',').map(function(v){ return parseInt(v,10); });
        el.classList.toggle('active', list.indexOf(stageIdx) !== -1);
      });
    }

    function update(){
      ticking = false;
      // phones: the story isn't scroll-pinned (see the mobile carousel below)
      if(isMobile()) return;
      var rect = wrap.getBoundingClientRect();
      var total = wrap.offsetHeight - window.innerHeight;
      var progress = total > 0 ? (-rect.top) / total : 0;
      progress = Math.max(0, Math.min(1, progress));
      var stageIdx = Math.min(n - 1, Math.floor(progress * n));

      applyStage(stageIdx);

      if(device3d && !reduceMotion && !opts.staticDevice){
        if(opts.keyframes && opts.keyframes.length > 1){
          var kfs = opts.keyframes;
          var t = progress * (kfs.length - 1);
          var i0 = Math.max(0, Math.min(kfs.length - 2, Math.floor(t)));
          var frac = t - i0;
          var a = kfs[i0], b = kfs[i0 + 1];
          var lerp = function(p, q, f){ return p + (q - p) * f; };
          var x = lerp(a.x, b.x, frac);
          var y = lerp(a.y, b.y, frac);
          var s = lerp(a.scale, b.scale, frac);
          var rz = lerp(a.rz, b.rz, frac);
          var ry = lerp(a.ry, b.ry, frac);
          device3d.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + s + ') rotateY(' + ry + 'deg) rotateZ(' + rz + 'deg)';
        } else {
          // gentle settle-in for a flat product photo: no full spins, just a soft tilt + rise
          var ry2 = -9 + progress * 18;
          var ty = 16 - progress * 28;
          var sc = 0.93 + progress * 0.12;
          device3d.style.transform = 'translateY(' + ty + 'px) scale(' + sc + ') rotateY(' + ry2 + 'deg)';
        }
      }
      if(deviceFrame && !reduceMotion){
        var tilt = -8 + progress * 16;
        deviceFrame.style.setProperty('--tilt', tilt + 'deg');
      }
    }
    function onScroll(){
      if(!ticking){ requestAnimationFrame(update); ticking = true; }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);

    // ---- Phones (<=860px): no scroll-pin. Nothing advances on its own: stages change only by swiping or tapping a dot. ----
    var current = 0;

    function clearLeaving(){
      wrap.querySelectorAll('.leaving').forEach(function(el){ el.classList.remove('leaving'); });
    }
    function goTo(idx, dir){
      var next = (idx % n + n) % n;
      if(next === current) return;
      var d = dir || (next > current ? 1 : -1);
      wrap.style.setProperty('--enter', (d * 22) + 'px');
      // the outgoing stage slides the opposite way while it fades
      var leaving = [];
      if(stages[current]) leaving.push(stages[current]);
      screens.forEach(function(s){ if(parseInt(s.getAttribute('data-stage'), 10) === current) leaving.push(s); });
      leaving.forEach(function(el){
        el.classList.add('leaving');
        setTimeout(function(){ el.classList.remove('leaving'); }, 520);
      });
      current = next;
      applyStage(current);
    }
    function userMoved(idx, dir){
      wrap.classList.add('swiped');
      goTo(idx, dir);
    }

    var inner = wrap.querySelector('.pin-inner');
    if(inner && window.PointerEvent && n > 1){
      var sx = 0, sy = 0, tracking = false, axis = null; // axis: null=undecided, 'x'=horizontal (ours), 'y'=vertical (let the browser scroll)
      inner.addEventListener('pointerdown', function(e){
        if(!isMobile()) return;
        tracking = true; axis = null; sx = e.clientX; sy = e.clientY;
      });
      // touch-action:pan-y is not always enough on its own to stop the browser from taking over
      // the page mid-gesture on a real phone; explicitly claim the gesture with preventDefault
      // as soon as it reads as horizontal, and only then. { passive:false } is required for
      // preventDefault to have any effect on a touch-originated pointermove.
      inner.addEventListener('pointermove', function(e){
        if(!tracking || axis) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if(Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
        if(axis === 'y'){ tracking = false; }
      }, { passive: false });
      inner.addEventListener('touchmove', function(e){
        if(tracking && axis === 'x'){ e.preventDefault(); }
      }, { passive: false });
      inner.addEventListener('pointerup', function(e){
        if(!tracking) return;
        tracking = false;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if(Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4){
          userMoved(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        }
      });
      inner.addEventListener('pointercancel', function(){ tracking = false; axis = null; });
    }
    // Desktop: jump the page's scroll to the point where a given stage becomes active,
    // so the dots (now real buttons at every width) do something on desktop too instead
    // of being announced as controls that don't respond.
    function jumpToStage(idx){
      var total = wrap.offsetHeight - window.innerHeight;
      if(total <= 0) return;
      var targetProgress = (idx + 0.5) / n;
      var wrapAbsoluteTop = wrap.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetProgress * total + wrapAbsoluteTop, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    dots.forEach(function(d, i){
      // plain <div> dots: give them a real keyboard/AT identity here instead of editing
      // the markup on every page that uses .pin-progress.
      d.setAttribute('role', 'button');
      d.setAttribute('tabindex', '0');
      d.setAttribute('aria-label', 'Paso ' + (i + 1) + ' de ' + n);
      d.addEventListener('click', function(){ if(isMobile()) userMoved(i); else jumpToStage(i); });
      d.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          if(isMobile()) userMoved(i); else jumpToStage(i);
        }
      });
    });

    // Stacked scenes (text above a browser + a phone, as in Ticketing and Clientes): the sticky box is only
    // 100vh minus the header tall. On short windows (laptops at ~700px) the scene used to overflow it and its
    // top slid up under the header, so the phone's scale is lowered until everything fits.
    var stackedInner = wrap.querySelector('.pin-inner.stacked-dual');
    var stackedPhone = stackedInner && stackedInner.querySelector('.mini-phone');
    function fitStackedScene(){
      if(!stackedPhone) return;
      stackedPhone.style.removeProperty('--s');
      if(isMobile()) return;
      var max = parseFloat(getComputedStyle(stackedPhone).getPropertyValue('--s')) || 0.74;
      var cs = getComputedStyle(stackedInner);
      var top = stackedInner.querySelector('.pin-top-text');
      var room = stackedInner.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
        - (top ? top.offsetHeight : 0) - parseFloat(cs.rowGap || 0) - 12;
      var s = Math.max(0.42, Math.min(max, room / stackedPhone.offsetHeight));
      stackedPhone.style.setProperty('--s', s.toFixed(3));
    }
    window.addEventListener('resize', fitStackedScene);

    function syncMode(){
      clearLeaving();
      if(isMobile()){
        if(device3d) device3d.style.transform = '';
        current = 0;
        applyStage(0);
      } else {
        wrap.style.removeProperty('--enter');
        update();
      }
      fitStackedScene();
    }
    if(mobileMq){
      if(mobileMq.addEventListener){ mobileMq.addEventListener('change', syncMode); }
      else if(mobileMq.addListener){ mobileMq.addListener(syncMode); }
    }
    syncMode();
    window.addEventListener('load', fitStackedScene); // web fonts change the headline's wrap
  }

  document.addEventListener('DOMContentLoaded', function(){
    initPin('pos-pin', { staticDevice: true });
    initPin('totems-pin', { staticDevice: true });
    initPin('check-pin');
    initPin('clientes-pin');
    initPin('guardarropia-pin');
    initPin('ticketing-pin');

    // home "herramientas" chapters: regular sections whose screens advance on their own
    initTool('chapter-ticketing');
    initTool('chapter-check');
    initTool('chapter-totems');
    initTool('chapter-pos');
  });

  // Home tool chapters (no scroll-pin): nothing advances on its own. Click a step to jump to it,
  // or swipe the device on touch.
  function initTool(chapterId){
    var chapter = document.getElementById(chapterId);
    if(!chapter) return;
    var beats = chapter.querySelectorAll('.tool-beat');
    if(beats.length < 2) return;
    var screens = chapter.querySelectorAll('.screen-panel');
    var scenes = chapter.querySelectorAll('[data-stages]');
    var n = beats.length;
    var current = 0;

    function show(i){
      current = (i % n + n) % n;
      beats.forEach(function(b, k){
        var on = k === current;
        b.classList.toggle('active', on);
        if(on){ b.setAttribute('aria-current', 'true'); } else { b.removeAttribute('aria-current'); }
      });
      screens.forEach(function(s){ s.classList.toggle('active', parseInt(s.getAttribute('data-stage'), 10) === current); });
      scenes.forEach(function(el){
        var list = (el.getAttribute('data-stages') || '').split(',').map(function(v){ return parseInt(v, 10); });
        el.classList.toggle('active', list.indexOf(current) !== -1);
      });
    }
    function pick(i){ show(i); }

    beats.forEach(function(b, k){ b.addEventListener('click', function(){ pick(k); }); });

    var stageEl = chapter.querySelector('.tool-stage');
    if(stageEl && window.PointerEvent){
      var sx = 0, sy = 0, tracking = false, axis = null;
      stageEl.addEventListener('pointerdown', function(e){
        if(e.pointerType === 'mouse') return;
        tracking = true; axis = null; sx = e.clientX; sy = e.clientY;
      });
      // see initPin's identical fix: touch-action:pan-y alone isn't reliable enough on a real
      // phone to stop the browser from taking over the page mid-swipe; claim the gesture
      // explicitly with preventDefault once it reads as horizontal.
      stageEl.addEventListener('pointermove', function(e){
        if(!tracking || axis) return;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if(Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        axis = Math.abs(dx) > Math.abs(dy) * 1.4 ? 'x' : 'y';
        if(axis === 'y'){ tracking = false; }
      }, { passive: false });
      stageEl.addEventListener('touchmove', function(e){
        if(tracking && axis === 'x'){ e.preventDefault(); }
      }, { passive: false });
      stageEl.addEventListener('pointerup', function(e){
        if(!tracking) return;
        tracking = false;
        var dx = e.clientX - sx, dy = e.clientY - sy;
        if(Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4){ pick(current + (dx < 0 ? 1 : -1)); }
      });
      stageEl.addEventListener('pointercancel', function(){ tracking = false; axis = null; });
    }

  }

  // Chapter rail: scrollspy nav for the home "herramientas" scroll sequence
  document.addEventListener('DOMContentLoaded', function(){
    var rail = document.querySelector('.chapter-rail');
    var chapters = document.querySelectorAll('.chapters [data-chapter]');
    if(!rail || !chapters.length) return;
    var links = rail.querySelectorAll('a');
    var ratios = {};

    function setActive(name){
      links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('data-chapter') === name); });
    }

    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var key = entry.target.getAttribute('data-chapter');
          ratios[key] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        var best = null, bestRatio = 0;
        Object.keys(ratios).forEach(function(k){ if(ratios[k] > bestRatio){ bestRatio = ratios[k]; best = k; } });
        rail.classList.toggle('visible', bestRatio > 0);
        if(best){ setActive(best); }
      }, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });
      chapters.forEach(function(ch){ ratios[ch.getAttribute('data-chapter')] = 0; io.observe(ch); });
    }
  });

  // Graceful fallback: if a real product photo hasn't been dropped in yet,
  // reveal the CSS placeholder instead of a broken-image icon.
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('img[data-fallback]').forEach(function(img){
      img.addEventListener('error', function(){
        var host = img.closest('.device3d, .tool-visual');
        if(!host) return;
        host.classList.add('has-fallback');
        var fallbackImg = host.querySelector('.photo-fallback img[data-src]');
        if(fallbackImg){ fallbackImg.src = fallbackImg.getAttribute('data-src'); }
      });
    });
  });

  // Subtle parallax on the full-bleed cinematic photo breaks (POS/Tótems)
  document.addEventListener('DOMContentLoaded', function(){
    var banners = document.querySelectorAll('.ticket-banner');
    if(!banners.length) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var ticking = false;
    function update(){
      ticking = false;
      var vh = window.innerHeight;
      banners.forEach(function(b){
        var r = b.getBoundingClientRect();
        var center = r.top + r.height / 2;
        var progress = (vh / 2 - center) / (vh / 2 + r.height / 2);
        var y = Math.max(-24, Math.min(24, progress * 24));
        b.style.setProperty('--parallax-y', y.toFixed(1) + 'px');
      });
    }
    function onScroll(){ if(!ticking){ requestAnimationFrame(update); ticking = true; } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Illustrative live counter: ticks up only while on screen, off for reduced-motion users
  document.addEventListener('DOMContentLoaded', function(){
    var els = document.querySelectorAll('[data-tally]');
    if(!els.length || !('IntersectionObserver' in window)) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // elements that start from the same number share one clock, so the same figure never reads
    // differently in two places on screen (e.g. the browser and the phone of the Clientes pin)
    var groups = {};
    els.forEach(function(el){
      var base = parseInt(el.textContent.replace(/\D/g, ''), 10);
      var g = groups[base] || (groups[base] = { base: base, n: base, els: [], visible: 0, timer: null });
      g.els.push(el);
    });
    Object.keys(groups).forEach(function(key){
      var g = groups[key];
      function tick(){
        g.n = g.n >= g.base + 6 ? g.base : g.n + 1;
        var text = g.n.toLocaleString('es-CL');
        g.els.forEach(function(el){ el.textContent = text; });
      }
      g.els.forEach(function(el){
        var wasVisible = false;
        new IntersectionObserver(function(entries){
          var isVisible = entries[entries.length - 1].isIntersecting;
          if(isVisible === wasVisible) return;
          wasVisible = isVisible;
          g.visible += isVisible ? 1 : -1;
          if(g.visible > 0 && !g.timer){ g.timer = setInterval(tick, 1800); }
          else if(g.visible <= 0){ clearInterval(g.timer); g.timer = null; }
        }).observe(el);
      });
    });
  });

  // Data that feels alive: counters and chart bars animate up the first time they're seen
  document.addEventListener('DOMContentLoaded', function(){
    var bars = document.querySelectorAll('.device-chart .bar');
    bars.forEach(function(bar){
      var target = bar.style.height;
      if(!target) return;
      bar.setAttribute('data-target-h', target);
      bar.style.height = '0%';
      bar.style.transition = 'height .9s cubic-bezier(.22,.61,.36,1)';
    });

    var counters = document.querySelectorAll('.count-up');
    counters.forEach(function(el){
      el.setAttribute('data-final-text', el.textContent);
    });

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function runBars(root){
      root.querySelectorAll('.device-chart .bar[data-target-h]').forEach(function(bar){
        bar.style.height = bar.getAttribute('data-target-h');
      });
    }
    function parseCounter(el){
      var finalText = el.getAttribute('data-final-text') || el.textContent;
      var match = finalText.match(/[\d.,]+/);
      if(!match){ return null; }
      var numStr = match[0];
      var target = parseFloat(numStr.replace(/\./g, '').replace(',', '.'));
      if(isNaN(target)){ return null; }
      return {
        finalText: finalText,
        target: target,
        prefix: finalText.slice(0, match.index),
        suffix: finalText.slice(match.index + numStr.length),
        hasThousandDot: numStr.indexOf('.') > -1 && numStr.indexOf(',') === -1 && numStr.length > 3
      };
    }
    function countUp(el){
      var p = parseCounter(el);
      if(!p){ return; }
      if(reduceMotion){ el.textContent = p.finalText; return; }
      var start = performance.now();
      var duration = 900;
      function frame(now){
        var t = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        var value = Math.round(p.target * eased);
        var formatted = p.hasThousandDot ? value.toLocaleString('es-CL') : String(value);
        el.textContent = p.prefix + formatted + p.suffix;
        if(t < 1){ requestAnimationFrame(frame); } else { el.textContent = p.finalText; }
      }
      requestAnimationFrame(frame);
    }
    function runCounters(root){
      root.querySelectorAll('.count-up').forEach(countUp);
    }

    // Pinned stories: each stage counts up when *it* becomes the active one (not all at once on entry,
    // where the hidden stages would finish before anyone sees them), and starts from zero so nothing
    // flashes final -> 0 -> final.
    var stageRoots = document.querySelectorAll('#clientes-pin, #check-pin');
    stageRoots.forEach(function(root){
      var seen = false;
      var panels = root.querySelectorAll('.screen-panel');
      function fire(panel){
        if(panel.getAttribute('data-ran')) return;
        panel.setAttribute('data-ran', '1');
        runBars(panel);
        runCounters(panel);
      }
      panels.forEach(function(panel){
        if(!reduceMotion){
          panel.querySelectorAll('.count-up').forEach(function(el){
            var p = parseCounter(el);
            if(p){ el.textContent = p.prefix + '0' + p.suffix; }
          });
        }
        if('MutationObserver' in window){
          new MutationObserver(function(){ if(seen && panel.classList.contains('active')) fire(panel); })
            .observe(panel, { attributes: true, attributeFilter: ['class'] });
        }
      });
      function revealActive(){
        seen = true;
        panels.forEach(function(panel){ if(panel.classList.contains('active')) fire(panel); });
      }
      if('IntersectionObserver' in window){
        var ioRoot = new IntersectionObserver(function(entries){
          if(entries[0].isIntersecting){ revealActive(); ioRoot.disconnect(); }
        }, { threshold: 0.2 });
        ioRoot.observe(root);
      } else {
        revealActive();
      }
    });

    var liveRoots = document.querySelectorAll('.clientes-preview');
    if(!liveRoots.length) return;
    if('IntersectionObserver' in window){
      var io2 = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            runBars(entry.target);
            runCounters(entry.target);
            io2.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      liveRoots.forEach(function(root){ io2.observe(root); });
    } else {
      liveRoots.forEach(function(root){ runBars(root); runCounters(root); });
    }
  });

  // Disponibilidad: calendar date-picker -> WhatsApp inquiry (home contact section)
  document.addEventListener('DOMContentLoaded', function(){
    var grid = document.getElementById('cal-grid');
    if(!grid) return;

    var monthLabel = document.getElementById('cal-month-label');
    var prevBtn = document.querySelector('.cal-nav[data-dir="-1"]');
    var nextBtn = document.querySelector('.cal-nav[data-dir="1"]');
    var modal = document.getElementById('avail-modal');
    var modalTitle = document.getElementById('avail-modal-title');
    var badgeMonth = document.getElementById('avail-badge-month');
    var badgeDay = document.getElementById('avail-badge-day');
    var availForm = document.getElementById('avail-form');
    var venueInput = document.getElementById('avail-venue');
    var contactInput = document.getElementById('avail-contact');
    var closeBtn = document.getElementById('avail-modal-close');
    var fallback = document.getElementById('avail-fallback');
    var fallbackLink = document.getElementById('avail-fallback-link');
    var lastFocused = null;
    var MAX_MONTHS_AHEAD = 12;

    var MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    var MESES_ABR = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

    var today = new Date();
    today.setHours(0,0,0,0);
    var view = new Date(today.getFullYear(), today.getMonth(), 1);
    var selectedDate = null;

    function sameDay(a,b){ return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }

    function render(){
      monthLabel.textContent = MESES[view.getMonth()] + ' ' + view.getFullYear();
      grid.innerHTML = '';

      var firstDay = new Date(view.getFullYear(), view.getMonth(), 1);
      var startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
      var daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

      for(var i=0; i<startOffset; i++){
        var empty = document.createElement('div');
        empty.className = 'cal-day is-empty';
        grid.appendChild(empty);
      }

      for(var d=1; d<=daysInMonth; d++){
        var cellDate = new Date(view.getFullYear(), view.getMonth(), d);
        var cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'cal-day';
        cell.textContent = String(d);
        if(cellDate < today){
          cell.classList.add('is-disabled');
          cell.disabled = true;
        } else {
          if(sameDay(cellDate, today)){ cell.classList.add('is-today'); }
          cell.addEventListener('click', function(dt, el){
            return function(){ openModal(dt, el); };
          }(cellDate, cell));
        }
        grid.appendChild(cell);
      }

      var isCurrentMonth = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();
      prevBtn.disabled = isCurrentMonth;
      var monthsAhead = (view.getFullYear() - today.getFullYear()) * 12 + (view.getMonth() - today.getMonth());
      nextBtn.disabled = monthsAhead >= MAX_MONTHS_AHEAD;
    }

    function clearError(field){
      field.classList.remove('has-error');
      field.querySelector('input').setAttribute('aria-invalid', 'false');
    }

    function openModal(date, trigger){
      var isNewDate = !selectedDate || !sameDay(date, selectedDate);
      selectedDate = date;
      lastFocused = trigger || document.activeElement;
      modalTitle.textContent = date.getDate() + ' de ' + MESES[date.getMonth()].toLowerCase() + ' de ' + date.getFullYear();
      badgeMonth.textContent = MESES_ABR[date.getMonth()];
      badgeDay.textContent = String(date.getDate());
      if(isNewDate){
        venueInput.value = '';
        contactInput.value = '';
      }
      clearError(venueInput.closest('.avail-field'));
      clearError(contactInput.closest('.avail-field'));
      if(contactErrorEl) contactErrorEl.textContent = contactErrorDefault;
      fallback.hidden = true;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(function(){ venueInput.focus(); }, 50);
    }

    function closeModal(){
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if(lastFocused && typeof lastFocused.focus === 'function'){ lastFocused.focus(); }
    }

    prevBtn.addEventListener('click', function(){
      view.setMonth(view.getMonth() - 1);
      render();
    });
    nextBtn.addEventListener('click', function(){
      view.setMonth(view.getMonth() + 1);
      render();
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){
      if(e.target === modal){ closeModal(); }
    });
    document.addEventListener('keydown', function(e){
      if(!modal.classList.contains('open')) return;
      if(e.key === 'Escape'){ closeModal(); return; }
      if(e.key === 'Tab'){
        var focusable = Array.prototype.filter.call(modal.querySelectorAll('button, input, a[href]'), function(el){
          return el.offsetParent !== null;
        });
        if(!focusable.length) return;
        var first = focusable[0], last = focusable[focusable.length - 1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    });

    // Soft, non-blocking shape hint: catches an obvious typo (neither an "@" nor a digit in the
    // field) without stopping submission — the hard empty-check on submit below still gates that.
    var contactErrorEl = document.getElementById('avail-contact-error');
    var contactErrorDefault = contactErrorEl ? contactErrorEl.textContent : '';
    contactInput.addEventListener('blur', function(){
      var val = contactInput.value.trim();
      var field = contactInput.closest('.avail-field');
      var looksOff = val && val.indexOf('@') === -1 && !/\d/.test(val);
      field.classList.toggle('has-error', looksOff);
      if(contactErrorEl) contactErrorEl.textContent = looksOff ? '¿Es un correo o celular? Revisa el formato.' : contactErrorDefault;
    });

    availForm.addEventListener('submit', function(e){
      e.preventDefault();
      var venue = venueInput.value.trim();
      var contact = contactInput.value.trim();
      var venueField = venueInput.closest('.avail-field');
      var contactField = contactInput.closest('.avail-field');
      venueField.classList.toggle('has-error', !venue);
      venueInput.setAttribute('aria-invalid', String(!venue));
      contactField.classList.toggle('has-error', !contact);
      contactInput.setAttribute('aria-invalid', String(!contact));
      if(!venue || !contact){
        (!venue ? venueInput : contactInput).focus();
        return;
      }

      var dateStr = selectedDate.getDate() + ' de ' + MESES[selectedDate.getMonth()].toLowerCase() + ' de ' + selectedDate.getFullYear();
      var msg = 'Hola Vendeme, quiero consultar disponibilidad para el ' + dateStr + '. Local/Productora: ' + venue + '. Contacto: ' + contact + '.';
      var url = 'https://wa.me/56975404201?text=' + encodeURIComponent(msg);
      var popup = window.open(url, '_blank');
      if(!popup){
        fallbackLink.href = url;
        fallback.hidden = false;
        return;
      }
      closeModal();
    });

    render();
  });
})();
