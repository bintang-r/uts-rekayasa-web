/**
 * ============================================================================
 * MODULE: Leaflet.js Interactive Map & Kecamatan Pinned Spots (Menu 04)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const L = window.L;
  const state = window.KulinerDataModule.state;
  const formatReviewCountShort = window.KulinerDataModule.formatReviewCountShort;

  function createReliableTileLayer() {
    // Tile layers that work 100% without API keys on both file:// (no Referer) and http://
    const primaryUrl = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
    const fallbackOsmHotUrl = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    const fallbackEsriUrl =
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';

    const layer = L.tileLayer(primaryUrl, {
      attribution: '&copy; OpenStreetMap &amp; Google Maps | Kuliner Kota Makassar',
      maxZoom: 20
    });

    let switchedToFallback = false;
    layer.on('tileerror', function () {
      if (!switchedToFallback) {
        switchedToFallback = true;
        layer.setUrl(fallbackOsmHotUrl);
      } else {
        layer.setUrl(fallbackEsriUrl);
      }
    });

    return layer;
  }

  function initMainLeafletMap() {
    if (typeof L === 'undefined') return;

    const center = [state.data.meta.mapCenter.lat, state.data.meta.mapCenter.lng];
    state.map.instance = L.map('makassar-main-map', {
      center: center,
      zoom: state.data.meta.mapCenter.zoom,
      zoomControl: false
    });

    // Base Map Layers (All work without API key & work on file:// without Referer)
    const googleStreetLayer = createReliableTileLayer();

    const osmHotLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap Contributors (HOT) | Kuliner Kota Makassar',
      maxZoom: 19
    });

    const esriStreetLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri World Street Map | Kuliner Kota Makassar',
        maxZoom: 19
      }
    );

    const esriSatelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri World Imagery | Kuliner Kota Makassar',
        maxZoom: 19
      }
    );

    // Add default street map layer immediately
    googleStreetLayer.addTo(state.map.instance);

    // Add interactive Layer Switcher in bottom-left of the map
    const baseMaps = {
      'Peta Jalan Makassar (Utama)': googleStreetLayer,
      'OpenStreetMap (OSM HOT)': osmHotLayer,
      'Peta Vektor (Esri Street)': esriStreetLayer,
      'Citra Satelit Makassar': esriSatelliteLayer
    };
    L.control.layers(baseMaps, null, { position: 'bottomleft' }).addTo(state.map.instance);

    state.map.instance.on('moveend', function () {
      const c = state.map.instance.getCenter();
      $('#map-coord-indicator').text(
        `Koordinat Pusat: ${c.lat.toFixed(4)}° S, ${c.lng.toFixed(4)}° E`
      );
    });
  }

  function getFilteredMapItems() {
    const f = state.map.filter;
    const kw = state.map.keyword.trim().toLowerCase();

    return state.data.kuliner.filter(function (item) {
      let matchFilter = true;
      if (f === '24jam') {
        matchFilter = item.is24Hours === true;
      } else if (f !== 'all') {
        matchFilter = item.kecamatanId === f;
      }

      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw);

      return matchFilter && matchKw;
    });
  }

  function buildPopupHtml(item) {
    const cleanStatus = (item.statusBadge || '').replace(/^✓\s*/, '');
    return `
      <div class="p-4 bg-white text-slateInk flex flex-col gap-2.5">
        <div class="flex items-center justify-between gap-2">
          <span class="bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2 py-0.5 rounded text-[10px] font-bold uppercase">
            PIN AKTIF • ${item.kecamatanLabel}
          </span>
          <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating}</span></span>
        </div>
        <div>
          <div class="font-serif-display font-bold text-base text-slateInk leading-snug">${item.name}</div>
          <div class="text-xs text-slate-600 mt-0.5">${item.addressShort} • ${item.openHours}</div>
        </div>
        <div class="flex items-center justify-between text-xs border-t border-slate-200 pt-2">
          <span class="font-bold text-makassarRed">${item.priceText} / porsi</span>
          <span class="font-semibold text-halalGreen inline-flex items-center gap-1"><i class="ri-shield-check-fill"></i> <span>${cleanStatus}</span></span>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <button type="button" data-detail-id="${item.id}" class="btn-open-detail flex-1 bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs py-2 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
            <span>Lihat Detail Kuliner</span>
            <i class="ri-arrow-right-line"></i>
          </button>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.addressFull)}" target="_blank" rel="noopener" class="bg-surfaceBg hover:bg-slate-200 text-slateInk border border-slate-300 font-semibold text-xs py-2 px-3 rounded-lg transition inline-flex items-center gap-1">
            <i class="ri-navigation-line text-makassarRed"></i>
            <span>Rute</span>
          </a>
        </div>
      </div>
    `;
  }

  function renderMapSidebarAndMarkers() {
    const items = getFilteredMapItems();
    const $list = $('#map-sidebar-list');
    $list.empty();

    // Update "Semua Titik" chip count
    $('.btn-map-chip[data-map-filter="all"]').text(`Semua Titik (${state.data.kuliner.length})`);

    // Clear existing markers
    if (state.map.instance) {
      Object.values(state.map.markersById).forEach(function (marker) {
        state.map.instance.removeLayer(marker);
      });
    }
    state.map.markersById = {};

    if (items.length === 0) {
      $list.append(`
        <div class="bg-surfaceBg border border-dashed border-slate-300 rounded-xl p-6 text-center text-xs text-slate-500">
          Tidak ada titik kuliner pada filter area ini.
        </div>
      `);
      return;
    }

    // Ensure activePinId is in filtered list
    if (!items.some(function (i) { return i.id === state.map.activePinId; })) {
      state.map.activePinId = items[0].id;
    }

    items.forEach(function (item, idx) {
      const isSelected = item.id === state.map.activePinId;
      const cardBorder = isSelected
        ? 'bg-makassarRedLight border-2 border-makassarRed'
        : 'bg-surfaceBg hover:bg-white border-[1.5px] border-slate-200';
      const titleColor = isSelected ? 'text-makassarRed' : 'text-slateInk';

      // Left Sidebar Card (Matches Figma 04)
      $list.append(`
        <div data-pin-id="${item.id}" style="--stagger-idx: ${idx}" class="map-sidebar-card kuliner-card-animated anim-card-enter ${cardBorder} rounded-xl p-3.5 flex flex-col gap-1.5 cursor-pointer transition">
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-[13px] font-bold ${titleColor}">
              ${item.pinNumber} • ${item.name}
            </span>
            <span class="bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2 py-0.5 rounded text-[11px] font-bold inline-flex items-center gap-1">
              <i class="ri-star-fill"></i>
              <span>${item.rating}</span>
            </span>
          </div>
          <div class="text-xs text-slate-600">${item.addressShort} • Buka ${item.openHours}</div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-xs font-bold ${isSelected ? 'text-makassarRed' : 'text-slate-700'}">
              ${item.priceText} / porsi • ${item.mapNote}
            </span>
            <button type="button" data-detail-id="${item.id}" class="btn-open-detail text-[11px] font-bold text-makassarRed hover:underline inline-flex items-center gap-0.5">
              <span>Detail</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      `);

      // Add Custom Pin Marker on Leaflet Map
      if (state.map.instance) {
        const activePinCls = isSelected ? 'pin-active' : '';
        const pinHtml = `<div class="pin-pill pin-${item.pinColor} ${activePinCls}"><i class="ri-map-pin-2-fill"></i> <span>${item.pinNumber} ${item.name}</span> <i class="ri-star-fill text-amber-300"></i> <span>${item.rating}</span></div>`;

        const customIcon = L.divIcon({
          className: 'makassar-pin-marker',
          html: pinHtml,
          iconSize: [210, 36],
          iconAnchor: [105, 18],
          popupAnchor: [0, -18]
        });

        const marker = L.marker([item.coordinates.lat, item.coordinates.lng], {
          icon: customIcon
        }).addTo(state.map.instance);

        marker.bindPopup(buildPopupHtml(item), {
          maxWidth: 340,
          closeButton: true
        });

        marker.on('click', function () {
          state.map.activePinId = item.id;
          highlightMapSelection(item.id);
        });

        state.map.markersById[item.id] = marker;
      }
    });

    renderMapMobileBottomSheet();
  }

  function highlightMapSelection(kulinerId) {
    state.map.activePinId = kulinerId;

    // Update sidebar cards style
    $('.map-sidebar-card').each(function () {
      const $card = $(this);
      const id = $card.data('pin-id');
      if (id === kulinerId) {
        $card
          .removeClass('bg-surfaceBg border-[1.5px] border-slate-200')
          .addClass('bg-makassarRedLight border-2 border-makassarRed');
      } else {
        $card
          .removeClass('bg-makassarRedLight border-2 border-makassarRed')
          .addClass('bg-surfaceBg border-[1.5px] border-slate-200');
      }
    });

    // Update active pulse class on map marker DOM elements
    Object.keys(state.map.markersById).forEach(function (id) {
      const marker = state.map.markersById[id];
      const el = marker && marker.getElement ? marker.getElement() : null;
      if (el) {
        const pill = el.querySelector('.pin-pill');
        if (pill) {
          if (id === kulinerId) {
            pill.classList.add('pin-active');
          } else {
            pill.classList.remove('pin-active');
          }
        }
      }
    });

    renderMapMobileBottomSheet();
  }

  function focusPinOnMap(kulinerId, shouldFly) {
    const item = state.data.kuliner.find(function (k) { return k.id === kulinerId; });
    if (!item || !state.map.instance) return;

    state.map.activePinId = item.id;
    highlightMapSelection(item.id);

    const marker = state.map.markersById[item.id];
    if (shouldFly) {
      state.map.instance.flyTo([item.coordinates.lat, item.coordinates.lng], 15, {
        duration: 0.7
      });
    } else {
      state.map.instance.setView([item.coordinates.lat, item.coordinates.lng], 14);
    }

    if (marker) {
      marker.openPopup();
    }
  }

  function renderMapMobileBottomSheet() {
    const item =
      state.data.kuliner.find(function (k) { return k.id === state.map.activePinId; }) || state.data.kuliner[0];
    if (!item) return;

    const $sheet = $('#map-mobile-bottom-sheet');
    $sheet.html(`
      <div class="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>
      <div class="flex items-center justify-between">
        <span class="bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-0.5 rounded text-[11px] font-bold uppercase">
          PIN AKTIF • ${item.kecamatanLabel}
        </span>
        <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating} (${formatReviewCountShort(item.reviewCount)})</span></span>
      </div>
      <div class="font-serif-display text-lg font-bold text-slateInk leading-tight">
        ${item.pinNumber} • ${item.name}
      </div>
      <div class="text-xs text-slate-600">
        ${item.addressShort} • Buka ${item.openHours} WITA
      </div>
      <div class="grid grid-cols-2 gap-2.5 pt-1">
        <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs py-2.5 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
          <span>Lihat Detail Kuliner</span>
          <i class="ri-arrow-right-line"></i>
        </button>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + item.addressFull)}" target="_blank" rel="noopener" class="bg-white hover:bg-slate-50 text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs py-2.5 px-3 rounded-lg text-center transition inline-flex items-center justify-center gap-1">
          <i class="ri-navigation-line text-makassarRed"></i>
          <span>Petunjuk Rute</span>
        </a>
      </div>
    `);
  }

  function updateMapFilterChipUI(activeFilter) {
    $('.btn-map-chip')
      .removeClass('bg-makassarRed text-white font-semibold')
      .addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
    $(`.btn-map-chip[data-map-filter="${activeFilter}"]`)
      .removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium')
      .addClass('bg-makassarRed text-white font-semibold');
  }

  window.KulinerMapModule = {
    createReliableTileLayer: createReliableTileLayer,
    initMainLeafletMap: initMainLeafletMap,
    getFilteredMapItems: getFilteredMapItems,
    renderMapSidebarAndMarkers: renderMapSidebarAndMarkers,
    highlightMapSelection: highlightMapSelection,
    focusPinOnMap: focusPinOnMap,
    renderMapMobileBottomSheet: renderMapMobileBottomSheet,
    updateMapFilterChipUI: updateMapFilterChipUI
  };
})();
