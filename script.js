/* =========================================================
   Zhijie Lyu — Personal Website
   Modern Dark Portfolio - interactions
   ========================================================= */
(function () {
    'use strict';

    // ---------- Scroll-aware navigation ----------
    var nav = document.getElementById('nav');
    var navLinks = document.querySelectorAll('.nav-link');
    var sections = Array.prototype.slice.call(
        document.querySelectorAll('section[id]')
    );

    function onScroll() {
        // Add scrolled class for nav border
        if (window.scrollY > 8) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Scroll-spy: highlight active link
        var fromTop = window.scrollY + 100;
        var current = null;
        for (var i = 0; i < sections.length; i++) {
            var s = sections[i];
            if (s.offsetTop <= fromTop) current = s.id;
        }
        navLinks.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            if (href === '#' + current) link.classList.add('active');
            else link.classList.remove('active');
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- Mobile nav toggle ----------
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navLinks');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('is-open');
            menu.classList.toggle('is-open');
        });
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('is-open');
                menu.classList.remove('is-open');
            });
        });
    }

    // ---------- Publications filter chips ----------
    var chips = document.querySelectorAll('.pub-filter .chip');
    var pubs = document.querySelectorAll('.pub-list .pub');

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            var filter = chip.getAttribute('data-filter');

            chips.forEach(function (c) { c.classList.remove('is-active'); });
            chip.classList.add('is-active');

            pubs.forEach(function (pub) {
                var tags = (pub.getAttribute('data-tags') || '').split(' ');
                if (filter === 'all' || tags.indexOf(filter) !== -1) {
                    pub.classList.remove('is-hidden');
                } else {
                    pub.classList.add('is-hidden');
                }
            });
        });
    });

    // ---------- Theme toggle (light / dark) ----------
    var themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            var next = current === 'light' ? 'dark' : 'light';
            if (next === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
        });
    }

    // ---------- Dependency-graph hover ----------
    var depSvg = document.querySelector('.dep-svg');
    var depInfo = document.getElementById('depInfo');
    if (depSvg && depInfo) {
        var depGroups = {
            blue:   { color: '#3b82f6', text: 'MotionGen simulation core rewrite (2022, Zhijie Lyu and Wei Liao).' },
            red1:   { color: '#ef4444', text: 'MotionGen path synthesis backend rewrite (2023–2024, Zhijie Lyu).' },
            red2:   { color: '#ef4444', text: 'Dataset enlargement (2024, Anar Nurizada, Rohit Dhaipule, and Zhijie Lyu).' },
            pink:   { color: '#ec4899', text: 'Wheel element inclusion, with state-of-the-art mobility analysis algorithm (2024–2025, Zhijie Lyu).' },
            purple: { color: '#a855f7', text: 'Simulator rewrite for differentiability, and testing (2025–2026, Zhijie Lyu and Suhas Gangireddy).' },
            orange: { color: '#f97316', text: 'Clarification between Assur graph and Assur group (2026, Zhijie Lyu, with help from Dr. Adnan Sljoka).' },
            green:  { color: '#22c55e', text: 'Differential Evolutionary Algorithm fine-tuning (2025–2026, Ray Tang, supervised by Zhijie Lyu).' }
        };
        var depDefaultEl = depInfo.querySelector('.dep-info-default');
        var depContentEl = depInfo.querySelector('.dep-info-content');
        var depSwatchEl  = depInfo.querySelector('.dep-info-swatch');
        var depTextEl    = depInfo.querySelector('.dep-info-text');
        var depNodes = depSvg.querySelectorAll('.dep-node[data-group]');

        function depActivate(group) {
            var info = depGroups[group];
            if (!info) return;
            depSvg.classList.add('has-active');
            depNodes.forEach(function (n) {
                if (n.getAttribute('data-group') === group) n.classList.add('is-active');
                else n.classList.remove('is-active');
            });
            depDefaultEl.hidden = true;
            depContentEl.hidden = false;
            depSwatchEl.style.background = info.color;
            depTextEl.textContent = info.text;
        }
        function depClear() {
            depSvg.classList.remove('has-active');
            depNodes.forEach(function (n) { n.classList.remove('is-active'); });
            depDefaultEl.hidden = false;
            depContentEl.hidden = true;
            depSwatchEl.style.background = 'transparent';
            depTextEl.textContent = '';
        }
        depNodes.forEach(function (n) {
            n.addEventListener('mouseenter', function () { depActivate(n.getAttribute('data-group')); });
            n.addEventListener('mouseleave', depClear);
            n.addEventListener('focus',  function () { depActivate(n.getAttribute('data-group')); });
            n.addEventListener('blur',   depClear);
            // Touch: tap a node to toggle its description (and clear when tapping another)
            n.addEventListener('click', function (e) {
                e.preventDefault();
                var g = n.getAttribute('data-group');
                if (n.classList.contains('is-active')) {
                    depClear();
                } else {
                    depActivate(g);
                }
            });
        });
        // Tapping outside any node clears the active state on touch devices
        document.addEventListener('touchstart', function (e) {
            if (!depSvg.contains(e.target)) depClear();
        }, { passive: true });
    }

    // ---------- Reveal-on-scroll ----------
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        var reveal = document.querySelectorAll(
            '.pub, .project, .cv-block, .about-card, .about-text'
        );
        reveal.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity .6s ease, transform .6s ease';
            io.observe(el);
        });
    }
})();
