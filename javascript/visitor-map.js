/**
 * Visitor location map — currently NOT loaded anywhere on the site.
 *
 * Two implementations preserved. Switch by changing the MODE constant below.
 *
 *   MODE = 'self-pin'    Shows a single pin on the *current* visitor's location,
 *                        fetched live from a free IP-geolocation API.
 *                        Zero data stored on a backend, no third-party tracker,
 *                        privacy-friendly. Doesn't accumulate across visits.
 *
 *   MODE = 'clustrmaps'  Embeds the ClustrMaps widget, which aggregates every
 *                        past visitor as pins on a world map. Requires
 *                        registration at https://clustrmaps.com/ to obtain a
 *                        site ID; replace CLUSTRMAPS_ID below.
 *
 * To enable on a page:
 *   1. Add a target element where you want the map to appear, e.g.:
 *        <section class="section" id="visitor-map-section"></section>
 *   2. Include this script at the bottom of the page:
 *        <script src="javascript/visitor-map.js"></script>
 *
 * The script does nothing if #visitor-map-section is missing, so it's safe to
 * leave loaded on pages that don't host the map.
 */
(function () {
    'use strict';

    var MODE = 'self-pin';            // 'self-pin' | 'clustrmaps'
    var CLUSTRMAPS_ID = 'XXXXXXX';    // only used when MODE === 'clustrmaps'

    var target = document.getElementById('visitor-map-section');
    if (!target) return;

    if (MODE === 'self-pin') {
        // Load Leaflet CSS dynamically so the rest of the site doesn't pay the cost
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        target.innerHTML = ''
            + '<h2 class="section-title" style="font-size: 1.4rem;">Visitors</h2>'
            + '<p class="section-subtitle">A wave from wherever you are.</p>'
            + '<div id="visitorMap" style="height: 400px; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border);"></div>'
            + '<p id="visitorMsg" style="margin-top: 0.8rem; color: var(--text-muted); font-size: 0.92rem;"></p>';

        var script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initSelfPin;
        document.head.appendChild(script);

        function initSelfPin() {
            var mapEl = document.getElementById('visitorMap');
            var msgEl = document.getElementById('visitorMsg');
            if (!mapEl || !window.L) return;

            var map = L.map(mapEl).setView([20, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            fetch('https://ipapi.co/json/')
                .then(function (r) { return r.json(); })
                .then(function (d) {
                    if (!d.latitude || !d.longitude) throw new Error('no coords');
                    var place = [d.city, d.region, d.country_name].filter(Boolean).join(', ');
                    L.marker([d.latitude, d.longitude]).addTo(map)
                        .bindPopup('👋 You are here<br>' + place).openPopup();
                    map.setView([d.latitude, d.longitude], 4);
                    if (msgEl) msgEl.textContent = 'You are visiting from ' + place + '.';
                })
                .catch(function () {
                    if (msgEl) msgEl.textContent = 'Could not detect your location.';
                });
        }
    } else if (MODE === 'clustrmaps') {
        target.innerHTML = ''
            + '<h2 class="section-title" style="font-size: 1.4rem;">Visitors</h2>'
            + '<p class="section-subtitle">Every pin is someone who has stopped by.</p>'
            + '<a href="https://clustrmaps.com/site/' + CLUSTRMAPS_ID + '" title="Visit tracker">'
            + '<img src="//clustrmaps.com/map_v2.png?d=' + CLUSTRMAPS_ID + '&amp;cl=ffffff&amp;w=a" '
            + 'alt="Visitor map" style="max-width: 100%; border-radius: var(--radius);" />'
            + '</a>';
    }
})();
