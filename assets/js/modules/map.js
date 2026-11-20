/**
 * ============================================================================
 * MODULE: Leaflet.js Interactive Map & Kecamatan Pinned Spots (Menu 04)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const L = window.L;
  const state = window.KulinerDataModule.state;

  function initMainLeafletMap() {
    const mapEl = document.getElementById('makassar-main-map');
    if (!mapEl || state.map.instance || !L) return;

    const centerLat = state.data.meta.mapCenter.lat;
    const centerLng = state.data.meta.mapCenter.lng;

    const map = L.map('makassar-main-map', {
      zoomControl: false
    }).setView([centerLat, centerLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    state.map.instance = map;
  }

  function renderMapSidebarAndMarkers() {
    const map = state.map.instance;
    const $list = $('#map-sidebar-list');
    const $bottomSheet = $('#map-mobile-bottom-sheet');
    if (!map || !$list.length || !L) return;

    Object.keys(state.map.markersById).forEach(function (id) {
      map.removeLayer(state.map.markersById[id]);
    });
    state.map.markersById = {};

    const filter = state.map.filter;
    const keyword = state.map.keyword.toLowerCase().trim();

    const filtered = state.data.kuliner.filter(function (item) {
      const matchFilter =
        filter === 'all' ||
        (filter === '24jam' && item.is24Hours) ||
        item.kecamatanId === filter;
      const matchKey =
        keyword === '' ||
        item.name.toLowerCase().indexOf(keyword) !== -1 ||
        item.addressFull.toLowerCase().indexOf(keyword) !== -1;

      return matchFilter && matchKey;
    });

    let listHtml = '';
    const activeItem = filtered.find(function (i) { return i.id === state.map.activePinId; }) || filtered[0] || state.data.kuliner[0];
    state.map.activePinId = activeItem.id;

    filtered.forEach(function (item) {
      const isSelected = item.id === state.map.activePinId;
      const pinColorClass =
        item.pinColor === 'orange'
          ? 'pin-orange'
          : item.pinColor === 'green'
          ? 'pin-green'
          : 'pin-red';
      const activeClass = isSelected ? 'pin-active' : '';

      const customIcon = L.divIcon({
        className: 'makassar-pin-marker',
        html: `<div class="pin-pill ${pinColorClass} ${activeClass}" data-marker-id="${item.id}">${item.pinNumber} ${item.name.split(' ')[0]}</div>`,
        iconSize: [110, 38],
        iconAnchor: [55, 19]
      });

      const marker = L.marker([item.coordinates.lat, item.coordinates.lng], { icon: customIcon }).addTo(map);

      marker.on('click', function () {
        state.map.activePinId = item.id;
        renderMapSidebarAndMarkers();
        map.setView([item.coordinates.lat, item.coordinates.lng], 15, { animate: true });
      });

      state.map.markersById[item.id] = marker;

      const cardSelectedClass = isSelected
        ? 'bg-makassarRedLight border-makassarRed shadow-xs'
        : 'bg-white border-slate-200 hover:border-makassarRed';

      listHtml += `
        <div class="map-sidebar-card cursor-pointer border-[1.5px] rounded-xl p-3.5 flex flex-col gap-2 transition ${cardSelectedClass}" data-kuliner-id="${item.id}">
          <div class="flex items-center justify-between">
            <span class="bg-slateInk text-white text-[11px] font-bold px-2 py-0.5 rounded">${item.pinNumber}</span>
            <span class="text-xs font-bold text-makassarRed inline-flex items-center gap-1"><i class="ri-star-fill text-losariOrange"></i> ${item.rating}</span>
          </div>
          <div>
            <h4 class="font-serif-display font-bold text-sm sm:text-[15px] text-slateInk">${item.name}</h4>
            <p class="text-xs text-slate-500 mt-0.5">${item.addressShort}</p>
          </div>
          <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
            <span class="font-semibold text-makassarRed">${item.priceText}</span>
            <span class="text-slate-500">${item.mapNote}</span>
          </div>
        </div>
      `;
    });

    $list.html(listHtml);

    $list.find('.map-sidebar-card').on('click', function () {
      const id = $(this).data('kuliner-id');
      const targetItem = state.data.kuliner.find(function (i) { return i.id === id; });
      if (targetItem) {
        state.map.activePinId = id;
        renderMapSidebarAndMarkers();
        map.setView([targetItem.coordinates.lat, targetItem.coordinates.lng], 15, { animate: true });
      }
    });

    if (activeItem && $bottomSheet.length) {
      $bottomSheet.html(`
        <div class="flex items-center justify-between">
          <span class="bg-makassarRed text-white text-[11px] font-bold px-2 py-0.5 rounded">${activeItem.pinNumber} — TERPILIH</span>
          <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> ${activeItem.rating}</span>
        </div>
        <div>
          <h4 class="font-serif-display font-bold text-base text-slateInk">${activeItem.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">${activeItem.addressFull}</p>
        </div>
        <div class="flex items-center gap-2 pt-1">
          <button type="button" data-detail-id="${activeItem.id}" class="btn-open-detail flex-1 bg-makassarRed hover:bg-makassarRedHover text-white text-xs font-semibold py-2 rounded-lg transition text-center">
            Lihat Detail Kuliner
          </button>
          <button type="button" data-nav="detail" class="nav-trigger bg-white border border-slate-300 text-slateInk text-xs font-semibold px-3 py-2 rounded-lg">
            Buka Peta
          </button>
        </div>
      `);

      $bottomSheet.find('.btn-open-detail').on('click', function () {
        const id = $(this).data('detail-id');
        window.KulinerDetailModule.renderDetailView(id);
        window.KulinerNavModule.navigateToSection('detail');
      });
    }
  }

  window.KulinerMapModule = {
    initMainLeafletMap: initMainLeafletMap,
    renderMapSidebarAndMarkers: renderMapSidebarAndMarkers
  };
})();
