/**
 * ============================================================================
 * KULINER KOTA MAKASSAR — Main Modular Application Entry
 * Designer & Developer : Muhammad Bintang (NIM 20232205029)
 * Course Task          : T.701 Desain Website Kuliner
 * ============================================================================
 */

(function ($) {
  'use strict';

  const FALLBACK_DATA = window.KulinerDataModule.FALLBACK_DATA;
  const state = window.KulinerDataModule.state;

  const updateFavoriteCounter = window.KulinerToastModule.updateFavoriteCounter;
  const showToast = window.KulinerToastModule.showToast;

  const navigateToSection = window.KulinerNavModule.navigateToSection;
  const openBurgerDrawer = window.KulinerNavModule.openBurgerDrawer;
  const closeBurgerDrawer = window.KulinerNavModule.closeBurgerDrawer;

  const initBerandaTypewriter = window.KulinerBerandaModule.initBerandaTypewriter;
  const initMetricCountersAnimation = window.KulinerBerandaModule.initMetricCountersAnimation;
  const renderBerandaCategoryChips = window.KulinerBerandaModule.renderBerandaCategoryChips;
  const renderBerandaCards = window.KulinerBerandaModule.renderBerandaCards;

  const renderDirectorySidebarFilters = window.KulinerDirectoryModule.renderDirectorySidebarFilters;
  const renderDirectoryMobileChips = window.KulinerDirectoryModule.renderDirectoryMobileChips;
  const renderDirectoryResults = window.KulinerDirectoryModule.renderDirectoryResults;
  const resetDirectoryFilters = window.KulinerDirectoryModule.resetDirectoryFilters;

  const renderDetailQuickSwitcher = window.KulinerDetailModule.renderDetailQuickSwitcher;
  const renderDetailView = window.KulinerDetailModule.renderDetailView;

  const initMainLeafletMap = window.KulinerMapModule.initMainLeafletMap;
  const getFilteredMapItems = window.KulinerMapModule.getFilteredMapItems;
  const renderMapSidebarAndMarkers = window.KulinerMapModule.renderMapSidebarAndMarkers;
  const focusPinOnMap = window.KulinerMapModule.focusPinOnMap;
  const updateMapFilterChipUI = window.KulinerMapModule.updateMapFilterChipUI;

  const renderArticlesGrid = window.KulinerArticlesModule.renderArticlesGrid;
  const openArticleModal = window.KulinerArticlesModule.openArticleModal;
  const closeArticleModal = window.KulinerArticlesModule.closeArticleModal;

  const validateRecommendationForm = window.KulinerRecommendationModule.validateRecommendationForm;

  $(document).ready(function () {
    loadKulinerData();
  });

  function loadKulinerData() {
    if (window.location.protocol === 'file:') {
      state.data = FALLBACK_DATA;
      initApplication();
      return;
    }

    $.getJSON('data/kuliner-makassar.json')
      .done(function (jsonData) {
        state.data = jsonData;
        initApplication();
      })
      .fail(function () {
        state.data = FALLBACK_DATA;
        initApplication();
      });
  }

  function initApplication() {
    updateFavoriteCounter();
    renderBerandaCategoryChips();
    renderBerandaCards();

    renderDirectorySidebarFilters();
    renderDirectoryMobileChips();
    renderDirectoryResults();

    renderDetailQuickSwitcher();
    renderDetailView(state.detail.activeKulinerId);

    renderArticlesGrid();
    initMainLeafletMap();
    renderMapSidebarAndMarkers();

    bindAllEvents();
    validateRecommendationForm(false);
    initBerandaTypewriter();
    initMetricCountersAnimation();
    initComponentAnimations();
  }

  function initComponentAnimations() {
    const staticComponentSelectors = [
      '#section-design-system .bg-surfaceBg',
      '#section-design-system .bg-white.rounded-xl',
      '#section-detail .bg-white.rounded-xl',
      '#section-detail .bg-surfaceBg.rounded-lg',
      '#section-artikel .bg-surfaceBg.rounded-2xl',
      '#section-tentang .bg-white.rounded-xl',
      '#form-rekomendasi-kuliner'
    ].join(', ');

    $(staticComponentSelectors).each(function (idx) {
      $(this)
        .addClass('kuliner-card-animated anim-card-enter')
        .css('--stagger-idx', idx % 6);
    });
  }

  function bindAllEvents() {
    // 1. Main Navigation Triggers
    $(document).on('click', '.nav-trigger', function (e) {
      e.preventDefault();
      const target = $(this).data('nav');
      const focusForm = $(this).data('focus-form') === true || $(this).data('focus-form') === 'true';
      if (target) {
        navigateToSection(target, { focusForm: focusForm });
      }
    });

    // Mobile back button on Detail View (M03)
    $('#mobile-back-direktori').on('click', function () {
      navigateToSection('kategori');
    });

    // 2. Mobile Burger Menu Drawer (M-Drawer)
    $('#btn-open-burger-drawer').on('click', function () {
      openBurgerDrawer();
    });
    $('#btn-close-burger-drawer').on('click', function () {
      closeBurgerDrawer();
    });
    $('#mobile-burger-drawer-backdrop').on('click', function (e) {
      if (e.target.id === 'mobile-burger-drawer-backdrop') {
        closeBurgerDrawer();
      }
    });

    // Quick Kecamatan Chips inside Mobile Burger Drawer
    $(document).on('click', '.btn-quick-kecamatan', function () {
      const kecId = $(this).data('quick-kecamatan');
      state.directory.kecamatan = [kecId];
      renderDirectorySidebarFilters();
      renderDirectoryResults();
      navigateToSection('kategori');
      showToast('Menampilkan kuliner di kecamatan terpilih', 'ri-map-pin-2-fill text-amber-400');
    });

    // 3. Top Utility Bar: Design System & Wireframe Mode Toggle
    $('#btn-toggle-design-system').on('click', function () {
      $('#section-design-system').toggleClass('hidden');
    });
    $('#btn-close-design-system').on('click', function () {
      $('#section-design-system').addClass('hidden');
    });
    $('#btn-toggle-wireframe-mode').on('click', function () {
      $('body').toggleClass('wireframe-mode');
      const isWf = $('body').hasClass('wireframe-mode');
      $('#wireframe-mode-label').html(
        isWf
          ? '<i class="ri-artboard-2-line text-sm"></i> <span>Mode: Wireframe Figma</span>'
          : '<i class="ri-image-2-line text-sm"></i> <span>Mode: Foto Kuliner</span>'
      );
      showToast(
        isWf
          ? 'Mode Wireframe Figma diaktifkan (Placeholder Abu-abu)'
          : 'Mode Foto Kuliner Asli diaktifkan',
        'ri-layout-masonry-fill text-amber-300'
      );
    });
    $('#btn-open-favorites').on('click', function () {
      if (state.favorites.length > 0) {
        renderDetailView(state.favorites[state.favorites.length - 1]);
        navigateToSection('detail');
        showToast(`Anda memiliki ${state.favorites.length} kuliner favorit tersimpan`, 'ri-heart-3-fill text-rose-400');
      } else {
        showToast('Belum ada kuliner favorit tersimpan', 'ri-heart-3-line text-slate-400');
      }
    });

    // 4. Mobile Navbar Search Bar
    $('#btn-mobile-search-toggle').on('click', function () {
      $('#mobile-QuickSearch-bar').toggleClass('hidden');
      if (!$('#mobile-QuickSearch-bar').hasClass('hidden')) {
        $('#input-mobile-navbar-search').trigger('focus');
      }
    });
    $('#form-mobile-navbar-search').on('submit', function (e) {
      e.preventDefault();
      const kw = $('#input-mobile-navbar-search').val().trim();
      state.directory.keyword = kw;
      $('#input-directory-search').val(kw);
      renderDirectoryResults();
      navigateToSection('kategori');
    });

    // 5. Beranda Search & Category Filter
    $('#input-hero-search').on('input', function () {
      const val = $(this).val();
      state.beranda.keyword = val;
      if (val.trim() !== '') {
        $('#btn-clear-hero-search').removeClass('hidden');
      } else {
        $('#btn-clear-hero-search').addClass('hidden');
      }
      renderBerandaCards();
    });

    $('#btn-clear-hero-search').on('click', function () {
      $('#input-hero-search').val('');
      state.beranda.keyword = '';
      $(this).addClass('hidden');
      renderBerandaCards();
    });

    $('#select-hero-kecamatan').on('change', function () {
      state.beranda.kecamatan = $(this).val();
      renderBerandaCards();
    });

    $('#form-hero-search').on('submit', function (e) {
      e.preventDefault();
      const kw = $('#input-hero-search').val().trim();
      const kec = $('#select-hero-kecamatan').val();
      state.directory.keyword = kw;
      $('#input-directory-search').val(kw);

      if (kec && kec !== 'all') {
        state.directory.kecamatan = [kec];
      } else {
        state.directory.kecamatan = state.data.kecamatanList.map(function (k) { return k.id; });
      }

      renderDirectorySidebarFilters();
      renderDirectoryResults();
      navigateToSection('kategori');
    });

    $(document).on('click', '.btn-beranda-cat', function () {
      state.beranda.category = $(this).data('beranda-cat');
      renderBerandaCategoryChips();
      renderBerandaCards();
    });

    $(document).on('click', '#btn-reset-beranda-filter', function () {
      state.beranda.category = 'all';
      state.beranda.keyword = '';
      state.beranda.kecamatan = 'all';
      $('#input-hero-search').val('');
      $('#select-hero-kecamatan').val('all');
      $('#btn-clear-hero-search').addClass('hidden');
      renderBerandaCategoryChips();
      renderBerandaCards();
    });

    // 6. Open Detail Kuliner from any card or popup
    $(document).on('click', '.btn-open-detail', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const id = $(this).data('detail-id');
      if (id) {
        renderDetailView(id);
        navigateToSection('detail');
      }
    });

    // 7. Kategori & Direktori Filters
    $('#btn-mobile-filter-toggle').on('click', function () {
      $('#directory-filter-sidebar').toggleClass('hidden flex');
    });

    $('#input-directory-search').on('input', function () {
      state.directory.keyword = $(this).val();
      renderDirectoryResults();
    });

    $('#select-directory-sort').on('change', function () {
      state.directory.sortBy = $(this).val();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-dir-category', function () {
      state.directory.category = $(this).data('dir-cat');
      renderDirectorySidebarFilters();
      renderDirectoryMobileChips();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-dir-kecamatan', function () {
      const kecId = $(this).data('dir-kec');
      const idx = state.directory.kecamatan.indexOf(kecId);
      if (idx > -1) {
        state.directory.kecamatan.splice(idx, 1);
      } else {
        state.directory.kecamatan.push(kecId);
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-price-filter', function () {
      const bucket = $(this).data('price');
      const idx = state.directory.priceBuckets.indexOf(bucket);
      if (idx > -1) {
        state.directory.priceBuckets.splice(idx, 1);
      } else {
        state.directory.priceBuckets.push(bucket);
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-remove-tag', function () {
      const type = $(this).data('clear-tag');
      if (type === 'category') {
        state.directory.category = 'all';
      } else if (type === 'keyword') {
        state.directory.keyword = '';
        $('#input-directory-search').val('');
      }
      renderDirectorySidebarFilters();
      renderDirectoryMobileChips();
      renderDirectoryResults();
    });

    $(document).on('click', '.btn-remove-kec-tag', function () {
      const kecId = $(this).data('clear-kec');
      state.directory.kecamatan = state.directory.kecamatan.filter(function (id) { return id !== kecId; });
      if (state.directory.kecamatan.length === 0) {
        state.directory.kecamatan = state.data.kecamatanList.map(function (k) { return k.id; });
      }
      renderDirectorySidebarFilters();
      renderDirectoryResults();
    });

    $('#btn-reset-directory-filter, #btn-empty-reset-dir').on('click', function () {
      resetDirectoryFilters();
    });

    $(document).on('click', '#btn-empty-reset-dir', function () {
      resetDirectoryFilters();
    });

    $('#btn-apply-filter-mobile').on('click', function () {
      if ($(window).width() < 1024) {
        $('#directory-filter-sidebar').addClass('hidden').removeClass('flex');
      }
      showToast('Filter direktori diterapkan', 'ri-checkbox-circle-fill text-emerald-400');
    });

    // 8. Detail Kuliner Actions (Gallery Swap, Favorite, Open on Map, Add Review)
    $(document).on('click', '.detail-thumb-trigger', function () {
      const mainSrc = $('#detail-img-main').attr('src');
      const mainCap = $('#detail-caption-main').text();
      const $thumbImg = $(this).find('img');
      const $thumbCap = $(this).find('span');

      const thumbSrc = $thumbImg.attr('src');
      const thumbCap = $thumbCap.text();

      $('#detail-img-main').attr('src', thumbSrc);
      $('#detail-caption-main').text(thumbCap);
      $thumbImg.attr('src', mainSrc);
      $thumbCap.text(mainCap);
    });

    $('#btn-detail-favorite').on('click', function () {
      const id = state.detail.activeKulinerId;
      const idx = state.favorites.indexOf(id);
      if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast('Dihapus dari daftar favorit', 'ri-heart-3-line text-slate-300');
      } else {
        state.favorites.push(id);
        showToast('Disimpan ke daftar kuliner favorit!', 'ri-heart-3-fill text-rose-400');
      }
      updateFavoriteCounter();
      renderDetailView(id);
    });

    $('#btn-detail-open-map, #btn-detail-card-to-map').on('click', function () {
      const id = state.detail.activeKulinerId;
      state.map.filter = 'all';
      state.map.keyword = '';
      $('#input-map-search').val('');
      updateMapFilterChipUI('all');
      state.map.activePinId = id;
      renderMapSidebarAndMarkers();
      navigateToSection('peta');
      setTimeout(function () {
        focusPinOnMap(id, true);
      }, 220);
    });

    $('#btn-detail-directions').on('click', function () {
      const item = state.data.kuliner.find(function (k) { return k.id === state.detail.activeKulinerId; });
      if (item) {
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          item.name + ' ' + item.addressFull
        )}`;
        window.open(url, '_blank', 'noopener');
      }
    });

    $('#form-add-review').on('submit', function (e) {
      e.preventDefault();
      const name = $('#input-review-name').val().trim();
      const comment = $('#input-review-comment').val().trim();
      if (!name || !comment) return;

      const item = state.data.kuliner.find(function (k) { return k.id === state.detail.activeKulinerId; });
      if (item) {
        item.reviews.unshift({
          author: name,
          stars: 5,
          comment: comment
        });
        item.reviewCount += 1;
        $('#input-review-name').val('');
        $('#input-review-comment').val('');
        renderDetailView(item.id);
        showToast('Terima kasih! Ulasan Anda berhasil ditambahkan.', 'ri-star-fill text-amber-400');
      }
    });

    // 9. Peta Kuliner Controls & Filters
    $(document).on('click', '.map-sidebar-card', function (e) {
      if ($(e.target).closest('.btn-open-detail').length) return;
      const pinId = $(this).data('pin-id');
      focusPinOnMap(pinId, true);
    });

    $('#input-map-search').on('input', function () {
      state.map.keyword = $(this).val();
      renderMapSidebarAndMarkers();
    });

    $(document).on('click', '.btn-map-chip', function () {
      const filterVal = $(this).data('map-filter');
      state.map.filter = filterVal;
      updateMapFilterChipUI(filterVal);
      renderMapSidebarAndMarkers();

      const filtered = getFilteredMapItems();
      if (filtered.length > 0) {
        focusPinOnMap(filtered[0].id, true);
      }
    });

    $('#btn-map-zoom-in').on('click', function () {
      if (state.map.instance) state.map.instance.zoomIn();
    });
    $('#btn-map-zoom-out').on('click', function () {
      if (state.map.instance) state.map.instance.zoomOut();
    });
    $('#btn-map-reset-bounds').on('click', function () {
      if (state.map.instance) {
        state.map.instance.flyTo(
          [state.data.meta.mapCenter.lat, state.data.meta.mapCenter.lng],
          state.data.meta.mapCenter.zoom,
          { duration: 0.6 }
        );
      }
    });

    // 10. Artikel & Cerita Kuliner
    $(document).on('click', '.btn-article-topic', function () {
      const topic = $(this).data('article-topic');
      state.articles.activeTopic = topic;

      $('.btn-article-topic')
        .removeClass('bg-makassarRed text-white font-semibold')
        .addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
      $(this)
        .removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium')
        .addClass('bg-makassarRed text-white font-semibold');

      renderArticlesGrid();
    });

    $(document).on('click', '.btn-read-article', function () {
      const artId = $(this).data('article-id');
      openArticleModal(artId);
    });

    $('#btn-close-article-modal, #btn-close-article-modal-bottom').on('click', function () {
      closeArticleModal();
    });

    $('#modal-article-reader').on('click', function (e) {
      if (e.target.id === 'modal-article-reader') {
        closeArticleModal();
      }
    });

    $('#btn-modal-article-kuliner').on('click', function () {
      const detailId = $(this).data('detail-id');
      closeArticleModal();
      if (detailId) {
        renderDetailView(detailId);
        navigateToSection('detail');
      }
    });

    // 11. Tentang & Formulir Rekomendasi Kuliner Baru
    $('#rec-name, #rec-address').on('input', function () {
      validateRecommendationForm(false);
    });

    $('#btn-autofill-valid-address').on('click', function () {
      $('#rec-address').val('Jl. Onta Lama No. 103, Kec. Mamajang (Dekat Perempatan Mandala)');
      validateRecommendationForm(false);
    });

    $('#btn-reset-rekomendasi').on('click', function () {
      $('#rec-name').val('Pallubasa Onta Lama');
      $('#rec-category').val('berkuah');
      $('#rec-kecamatan').val('mamajang');
      $('#rec-address').val('Jl. Onta Lama (Nomor bangunan belum diisi)');
      $('#rec-desc').val(
        'Kuah kelapa sangrai pekat dengan daging pipi sapi empuk, harga Rp 35.000/porsi...'
      );
      validateRecommendationForm(false);
      showToast('Formulir dikembalikan ke status awal', 'ri-refresh-line text-amber-300');
    });

    $('#form-rekomendasi-kuliner').on('submit', function (e) {
      e.preventDefault();
      if (!validateRecommendationForm(true)) {
        return;
      }

      const name = $('#rec-name').val().trim();
      const cat = $('#rec-category').val();
      const kecId = $('#rec-kecamatan').val();
      const addr = $('#rec-address').val().trim();
      const desc = $('#rec-desc').val().trim() || 'Kuliner rekomendasi komunitas Makassar.';

      const kecObj = state.data.kecamatanList.find(function (k) { return k.id === kecId; });
      const nextNum = state.data.kuliner.length + 1;
      const newId = 'rec-' + Date.now();

      const kecCoordsMap = {
        wajo: { lat: -5.1245, lng: 119.4112 },
        'ujung-pandang': { lat: -5.1415, lng: 119.4095 },
        panakkukang: { lat: -5.1568, lng: 119.4435 },
        mamajang: { lat: -5.1562, lng: 119.4182 },
        mariso: { lat: -5.1592, lng: 119.4075 }
      };
      const baseCoord = kecCoordsMap[kecId] || { lat: -5.1477, lng: 119.4327 };

      const newKuliner = {
        id: newId,
        pinNumber: '#' + (nextNum < 10 ? '0' + nextNum : nextNum),
        name: name,
        directoryName: name,
        category: cat,
        categoryBadge: cat.toUpperCase(),
        categoryFullBadge: 'REKOMENDASI BARU',
        badgeColor: 'green',
        pinColor: 'red',
        rating: 4.9,
        reviewCount: 1,
        price: 35000,
        priceText: 'Rp 35.000',
        priceRange: 'Rp 30.000 – Rp 45.000',
        priceBucket: '25to50',
        kecamatanId: kecId,
        kecamatanLabel: kecObj ? kecObj.shortName : 'Makassar',
        addressShort: addr.slice(0, 38),
        addressFull: addr + ', Kota Makassar',
        openHours: '08.00–22.00',
        openStatusText: 'Buka • 08.00 – 22.00 WITA',
        statusBadge: 'Rekomendasi Baru',
        is24Hours: false,
        isHalal: true,
        isFeaturedHero: true,
        established: 'Rekomendasi 2026',
        distanceInfo: 'Titik Rekomendasi Komunitas Makassar',
        mapNote: 'Rekomendasi Baru',
        coordinates: {
          lat: baseCoord.lat + (Math.random() - 0.5) * 0.004,
          lng: baseCoord.lng + (Math.random() - 0.5) * 0.004
        },
        shortDesc: desc,
        heroSubline: desc.slice(0, 52),
        historyTitle: 'Rekomendasi Kuliner Pilihan Komunitas Makassar',
        historyBody: desc,
        composition: {
          bahanUtama: 'Racikan Khas Makassar',
          pendampingKhas: 'Ketupat / Nasi Hangat',
          sambalKhas: 'Sambal Khas Rumah Makan'
        },
        images: {
          main: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
          secondary1: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
          secondary2: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
          captionMain: 'Foto Utama: ' + name,
          captionSec1: 'Sajian Khas',
          captionSec2: 'Suasana Warung'
        },
        keywords: [name.toLowerCase(), kecId, cat],
        reviews: [
          {
            author: 'Kontributor Komunitas',
            stars: 5,
            comment: desc
          }
        ]
      };

      state.data.kuliner.unshift(newKuliner);
      renderBerandaCards();
      renderDirectoryResults();
      renderDetailQuickSwitcher();
      renderMapSidebarAndMarkers();

      showToast(`"${name}" berhasil ditambahkan ke Direktori & Peta Kuliner!`, 'ri-checkbox-circle-fill text-emerald-400');
    });
  }

})(window.jQuery);
