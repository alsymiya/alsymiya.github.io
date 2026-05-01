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
