/**
 * ============================================================================
 * MODULE: Culinary Detail View & Mini-Map (Menu 03)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const L = window.L;
  const state = window.KulinerDataModule.state;

  function renderDetailQuickSwitcher() {
    const $switcher = $('#detail-quick-switcher');
    $switcher.empty();

    state.data.kuliner.forEach(function (item) {
      const isActive = item.id === state.detail.activeKulinerId;
      const cls = isActive
        ? 'bg-makassarRed text-white font-bold border border-makassarRed'
        : 'bg-white text-slate-700 font-medium border border-slate-300 hover:border-makassarRed';

      $switcher.append(`
        <button type="button" data-detail-id="${item.id}" class="btn-open-detail ${cls} text-xs px-3 py-1 rounded-full shrink-0 transition">
          ${item.pinNumber} ${item.name}
        </button>
      `);
    });
  }

  function renderDetailView(kulinerId) {
    const item =
      state.data.kuliner.find(function (k) { return k.id === kulinerId; }) || state.data.kuliner[0];
    if (!item) return;

    state.detail.activeKulinerId = item.id;
    renderDetailQuickSwitcher();

    const catObj = state.data.categories.find(function (c) { return c.id === item.category; });
    $('#detail-breadcrumb-category').text(catObj ? catObj.name : item.categoryFullBadge);
    $('#detail-breadcrumb-title').text(item.name);
    $('#detail-title').text(item.name);
    $('#detail-rating-badge').html(`<i class="ri-star-fill"></i> <span>${item.rating} (${item.reviewCount.toLocaleString('id-ID')} Ulasan)</span>`);
    $('#detail-established-badge').html(`<i class="ri-verified-badge-fill"></i> <span>Kuliner Legendaris ${item.established}</span>`);
    $('#detail-badge-mobile-est').text(`LEGENDARIS ${item.established.replace('Sejak ', '')}`);

    // Favorite status button
    const isFav = state.favorites.includes(item.id);
    if (isFav) {
      $('#detail-fav-icon').html('<i class="ri-heart-3-fill text-base"></i>').addClass('text-makassarRed');
      $('#detail-fav-text').text('Tersimpan di Favorit');
    } else {
      $('#detail-fav-icon').html('<i class="ri-heart-3-line text-base"></i>').removeClass('text-makassarRed');
      $('#detail-fav-text').text('Simpan Favorit');
    }

    // Images & Captions
    $('#detail-img-main').attr('src', item.images.main).attr('alt', item.name);
    $('#detail-caption-main').text(item.images.captionMain);
    $('#detail-img-sec1').attr('src', item.images.secondary1).attr('alt', item.images.captionSec1);
    $('#detail-caption-sec1').text(item.images.captionSec1);
    $('#detail-img-sec2').attr('src', item.images.secondary2).attr('alt', item.images.captionSec2);
    $('#detail-caption-sec2').text(item.images.captionSec2);

    // History & Composition
    $('#detail-history-title').text(item.historyTitle);
    $('#detail-history-body').text(item.historyBody);
    $('#detail-comp-bahan').text(item.composition.bahanUtama);
    $('#detail-comp-pendamping').text(item.composition.pendampingKhas);
    $('#detail-comp-sambal').text(item.composition.sambalKhas);

    // Reviews
    $('#detail-reviews-heading').text(`Ulasan Pengunjung (${item.reviewCount.toLocaleString('id-ID')})`);
    $('#detail-reviews-score').html(`<i class="ri-star-fill"></i> <span>${item.rating} / 5.0</span>`);

    const $revGrid = $('#detail-reviews-grid');
    $revGrid.empty();
    (item.reviews || []).forEach(function (rev, idx) {
      const starsHtml = '<i class="ri-star-fill"></i>'.repeat(rev.stars || 5);
      $revGrid.append(`
        <div style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-surfaceBg border border-slate-200 rounded-lg p-3.5 flex flex-col gap-1.5">
          <div class="text-xs font-bold text-slateInk flex items-center gap-1.5">
            <i class="ri-user-smile-line text-makassarRed"></i>
            <span>${rev.author}</span>
            <span>•</span>
            <span class="text-losariOrange inline-flex items-center gap-0.5">${starsHtml}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">"${rev.comment}"</p>
        </div>
      `);
    });

    // Right Destination Info Card
    $('#detail-info-price').text(item.priceRange);
    $('#detail-info-hours').text(item.openStatusText);
    $('#detail-info-address').text(item.addressFull);
    $('#detail-distance-info').text(item.distanceInfo);

    updateDetailMiniMap();
  }

  function updateDetailMiniMap() {
    const item = state.data.kuliner.find(function (k) { return k.id === state.detail.activeKulinerId; });
    if (!item || typeof L === 'undefined') return;

    const coords = [item.coordinates.lat, item.coordinates.lng];

    if (!state.map.miniMapInstance) {
      state.map.miniMapInstance = L.map('detail-mini-map', {
        center: coords,
        zoom: 15,
        zoomControl: false,
        attributionControl: false
      });

      window.KulinerMapModule.createReliableTileLayer().addTo(state.map.miniMapInstance);
    } else {
      state.map.miniMapInstance.invalidateSize();
      state.map.miniMapInstance.setView(coords, 15);
    }

    if (state.map.miniMarker) {
      state.map.miniMapInstance.removeLayer(state.map.miniMarker);
    }

    const pinIcon = L.divIcon({
      className: 'makassar-pin-marker',
      html: `<div class="pin-pill pin-${item.pinColor} pin-active"><i class="ri-map-pin-2-fill"></i> <span>${item.name}</span></div>`,
      iconSize: [180, 36],
      iconAnchor: [90, 18]
    });

    state.map.miniMarker = L.marker(coords, { icon: pinIcon }).addTo(state.map.miniMapInstance);
  }

  window.KulinerDetailModule = {
    renderDetailQuickSwitcher: renderDetailQuickSwitcher,
    renderDetailView: renderDetailView,
    updateDetailMiniMap: updateDetailMiniMap
  };
})();
