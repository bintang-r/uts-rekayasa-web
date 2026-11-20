/**
 * ============================================================================
 * MODULE: Culinary Detail View (Menu 03)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const L = window.L;
  const state = window.KulinerDataModule.state;

  function renderDetailQuickSwitcher() {
    const $switcher = $('#detail-quick-switcher');
    if (!$switcher.length) return;

    let html = '';
    state.data.kuliner.forEach(function (item) {
      const isActive = state.detail.activeKulinerId === item.id;
      const activeClass = isActive
        ? 'bg-makassarRed text-white font-bold border-makassarRed'
        : 'bg-white text-slate-700 border-slate-300 hover:border-makassarRed';

      html += `
        <button type="button" data-switcher-id="${item.id}" class="btn-detail-switcher px-3 py-1.5 rounded-lg text-xs border-[1.5px] shrink-0 transition ${activeClass}">
          ${item.name}
        </button>
      `;
    });

    $switcher.html(html);

    $switcher.find('.btn-detail-switcher').on('click', function () {
      const id = $(this).data('switcher-id');
      renderDetailView(id);
    });
  }

  function renderDetailView(kulinerId) {
    const item = state.data.kuliner.find(function (i) { return i.id === kulinerId; }) || state.data.kuliner[0];
    state.detail.activeKulinerId = item.id;

    $('#detail-quick-switcher .btn-detail-switcher').each(function () {
      const $b = $(this);
      if ($b.data('switcher-id') === item.id) {
        $b.removeClass('bg-white text-slate-700 border-slate-300').addClass('bg-makassarRed text-white font-bold border-makassarRed');
      } else {
        $b.removeClass('bg-makassarRed text-white font-bold border-makassarRed').addClass('bg-white text-slate-700 border-slate-300');
      }
    });

    $('#detail-breadcrumb-category').text(item.categoryFullBadge);
    $('#detail-breadcrumb-title').text(item.name);
    $('#detail-title').text(item.name);
    $('#detail-rating-badge').html(`<i class="ri-star-fill"></i> <span>${item.rating} (${item.reviewCount.toLocaleString()} Ulasan)</span>`);
    $('#detail-established-badge').html(`<i class="ri-verified-badge-fill"></i> <span>Kuliner Legendaris • ${item.established}</span>`);

    $('#detail-img-main').attr('src', item.images.main).attr('alt', item.name);
    $('#detail-caption-main').text(`Foto Utama: ${item.name}`);
    $('#detail-img-sec1').attr('src', item.images.secondary1);
    $('#detail-caption-sec1').text(item.images.captionSec1);
    $('#detail-img-sec2').attr('src', item.images.secondary2);
    $('#detail-caption-sec2').text(item.images.captionSec2);

    $('#detail-history-title').text(item.historyTitle);
    $('#detail-history-body').text(item.historyBody);
    $('#detail-comp-bahan').text(item.composition.bahanUtama);
    $('#detail-comp-pendamping').text(item.composition.pendampingKhas);
    $('#detail-comp-sambal').text(item.composition.sambalKhas);

    $('#detail-info-price').text(item.priceRange);
    $('#detail-info-hours').text(item.openStatusText);
    $('#detail-info-address').text(item.addressFull);
    $('#detail-distance-info').text(item.distanceInfo);

    const isFav = state.favorites.indexOf(item.id) !== -1;
    if (isFav) {
      $('#detail-fav-icon').html('<i class="ri-heart-3-fill text-rose-600 text-base"></i>');
      $('#detail-fav-text').text('Tersimpan di Favorit');
    } else {
      $('#detail-fav-icon').html('<i class="ri-heart-3-line text-base"></i>');
      $('#detail-fav-text').text('Simpan Favorit');
    }

    renderDetailReviews(item);
    initDetailMiniMap(item);
  }

  function renderDetailReviews(item) {
    const $grid = $('#detail-reviews-grid');
    $('#detail-reviews-heading').text(`Ulasan Pengunjung (${item.reviewCount.toLocaleString()})`);

    let html = '';
    item.reviews.forEach(function (rev) {
      html += `
        <div class="bg-surfaceBg border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs sm:text-sm text-slateInk">${rev.author}</span>
            <span class="text-losariOrange text-xs inline-flex items-center gap-0.5"><i class="ri-star-fill"></i> ${rev.stars}.0</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">"${rev.comment}"</p>
        </div>
      `;
    });

    if (item.reviews.length === 0) {
      html = '<div class="col-span-full text-xs text-slate-500 py-2">Belum ada ulasan untuk destinasi ini. Jadilah yang pertama menulis ulasan!</div>';
    }

    $grid.html(html);
  }

  function initDetailMiniMap(item) {
    const containerId = 'detail-mini-map';
    const el = document.getElementById(containerId);
    if (!el || !L) return;

    if (state.map.miniMapInstance) {
      state.map.miniMapInstance.remove();
      state.map.miniMapInstance = null;
    }

    const lat = item.coordinates.lat;
    const lng = item.coordinates.lng;

    const miniMap = L.map(containerId, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false
    }).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(miniMap);

    const customIcon = L.divIcon({
      className: 'makassar-pin-marker',
      html: `<div class="pin-pill pin-red shadow-md" style="font-size: 11px; padding: 4px 10px;"><i class="ri-map-pin-2-fill"></i> <span>${item.name.split(' ')[0]}</span></div>`,
      iconSize: [120, 36],
      iconAnchor: [60, 18]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(miniMap);
    state.map.miniMapInstance = miniMap;
  }

  window.KulinerDetailModule = {
    renderDetailQuickSwitcher: renderDetailQuickSwitcher,
    renderDetailView: renderDetailView
  };
})();
