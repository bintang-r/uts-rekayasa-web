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

  const renderDetailQuickSwitcher = window.KulinerDetailModule.renderDetailQuickSwitcher;
  const renderDetailView = window.KulinerDetailModule.renderDetailView;

  const initMainLeafletMap = window.KulinerMapModule.initMainLeafletMap;
  const renderMapSidebarAndMarkers = window.KulinerMapModule.renderMapSidebarAndMarkers;

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
    $(document).on('click', '.nav-trigger', function (e) {
      e.preventDefault();
      const navTarget = $(this).data('nav') || 'beranda';
      navigateToSection(navTarget);

      if ($(this).data('focus-form')) {
        setTimeout(function () {
          $('#rec-name').focus();
        }, 300);
      }
    });

    // Global detail trigger for buttons outside dynamic grids (e.g. Hero featured card & Article banner)
    $(document).on('click', '.btn-open-detail', function (e) {
      e.preventDefault();
      const kulinerId = $(this).data('detail-id');
      if (kulinerId) {
        renderDetailView(kulinerId);
        navigateToSection('detail');
      }
    });

    // Global article read trigger for featured banner button
    $(document).on('click', '.btn-read-article', function (e) {
      e.preventDefault();
      const artId = $(this).data('article-id');
      if (artId) {
        openArticleModal(artId);
      }
    });

    $('#mobile-back-direktori').on('click', function () {
      navigateToSection('kategori');
    });

    $('#btn-open-burger-drawer').on('click', openBurgerDrawer);
    $('#btn-close-burger-drawer, #mobile-burger-drawer-backdrop').on('click', function (e) {
      if (e.target === this) closeBurgerDrawer();
    });

    $('#btn-mobile-search-toggle').on('click', function () {
      $('#mobile-QuickSearch-bar').slideToggle(200);
    });

    $('#form-mobile-navbar-search').on('submit', function (e) {
      e.preventDefault();
      const q = $('#input-mobile-navbar-search').val().trim();
      state.beranda.keyword = q;
      $('#input-hero-search').val(q);
      renderBerandaCards();
      navigateToSection('beranda');
      showToast(`Mencari: "${q || 'Semua Kuliner'}"`, 'ri-search-2-line text-makassarRed');
    });

    $('#btn-toggle-design-system, #btn-close-design-system').on('click', function () {
      $('#section-design-system').slideToggle(250);
    });

    $('#btn-toggle-wireframe-mode').on('click', function () {
      $('body').toggleClass('wireframe-mode');
      const isWire = $('body').hasClass('wireframe-mode');
      if (isWire) {
        $('#wireframe-mode-label').html('<i class="ri-palette-line text-sm"></i> <span>Mode: Wireframe Figma</span>');
        showToast('Beralih ke Mode Wireframe Figma 1:1', 'ri-palette-line text-amber-300');
      } else {
        $('#wireframe-mode-label').html('<i class="ri-image-2-line text-sm"></i> <span>Mode: Foto Kuliner</span>');
        showToast('Beralih ke Mode Tampilan Foto Asli', 'ri-image-2-line text-emerald-300');
      }
    });

    $('#btn-open-favorites').on('click', function () {
      const favNames = state.favorites
        .map(function (id) {
          const it = state.data.kuliner.find(function (x) { return x.id === id; });
          return it ? it.name : id;
        })
        .join(', ');
      showToast(`Kuliner Favorit Tersimpan: ${favNames || 'Belum ada'}`, 'ri-heart-3-fill text-rose-500');
    });

    $('#form-hero-search').on('submit', function (e) {
      e.preventDefault();
      const val = $('#input-hero-search').val().trim();
      state.beranda.keyword = val;
      renderBerandaCards();
      showToast(`Mencari kuliner dengan kata kunci: "${val || 'Semua'}"`, 'ri-search-2-line text-makassarRed');
    });

    $('#input-hero-search').on('input', function () {
      const val = $(this).val();
      if (val.length > 0) {
        $('#btn-clear-hero-search').removeClass('hidden');
      } else {
        $('#btn-clear-hero-search').addClass('hidden');
      }
      state.beranda.keyword = val;
      renderBerandaCards();
    });

    $('#btn-clear-hero-search').on('click', function () {
      $('#input-hero-search').val('');
      $(this).addClass('hidden');
      state.beranda.keyword = '';
      renderBerandaCards();
    });

    $('#select-hero-kecamatan').on('change', function () {
      state.beranda.kecamatan = $(this).val();
      renderBerandaCards();
    });

    $('.btn-quick-kecamatan').on('click', function () {
      const kec = $(this).data('quick-kecamatan');
      state.beranda.kecamatan = kec;
      $('#select-hero-kecamatan').val(kec);
      navigateToSection('beranda');
      showToast(`Filter Kecamatan diaktifkan: ${$(this).text().trim()}`, 'ri-map-pin-2-fill text-makassarRed');
    });

    $('#input-directory-search').on('input', function () {
      state.directory.keyword = $(this).val();
      renderDirectoryResults();
    });

    $('#select-directory-sort').on('change', function () {
      state.directory.sortBy = $(this).val();
      renderDirectoryResults();
    });

    $('#btn-reset-directory-filter').on('click', function () {
      $('.dir-cat-checkbox, .dir-kec-checkbox').prop('checked', true);
      $('#input-directory-search').val('');
      state.directory.keyword = '';
      state.directory.category = 'all';
      state.directory.kecamatan = state.data.kecamatanList.map(function (k) { return k.id; });
      renderDirectoryResults();
      showToast('Filter direktori direset ke default', 'ri-refresh-line text-makassarRed');
    });

    $('#btn-mobile-filter-toggle').on('click', function () {
      $('#directory-filter-sidebar').toggleClass('hidden flex').toggleClass('fixed inset-4 z-50 bg-white p-6 shadow-2xl overflow-y-auto');
    });

    $('#btn-apply-filter-mobile').on('click', function () {
      $('#directory-filter-sidebar').removeClass('fixed inset-4 z-50 bg-white p-6 shadow-2xl overflow-y-auto').addClass('hidden lg:flex');
      showToast('Filter berhasil diterapkan!', 'ri-checkbox-circle-fill text-emerald-500');
    });

    $('#btn-detail-favorite').on('click', function () {
      const curId = state.detail.activeKulinerId;
      const idx = state.favorites.indexOf(curId);
      if (idx > -1) {
        state.favorites.splice(idx, 1);
        showToast('Kuliner dihapus dari daftar favorit', 'ri-heart-3-line text-slate-400');
      } else {
        state.favorites.push(curId);
        showToast('Kuliner berhasil disimpan ke Favorit!', 'ri-heart-3-fill text-rose-500');
      }
      updateFavoriteCounter();
      renderDetailView(curId);
    });

    $('#btn-detail-open-map, #btn-detail-card-to-map').on('click', function () {
      navigateToSection('peta');
      state.map.activePinId = state.detail.activeKulinerId;
      renderMapSidebarAndMarkers();
    });

    $('#btn-detail-directions').on('click', function () {
      const item = state.data.kuliner.find(function (i) { return i.id === state.detail.activeKulinerId; });
      if (item) {
        showToast(`Rute menuju ${item.name} (${item.addressShort}) siap dibuka di peta.`, 'ri-navigation-line text-makassarRed');
      }
    });

    $('#form-add-review').on('submit', function (e) {
      e.preventDefault();
      const name = $('#input-review-name').val().trim();
      const comment = $('#input-review-comment').val().trim();
      if (!name || !comment) return;

      const item = state.data.kuliner.find(function (i) { return i.id === state.detail.activeKulinerId; });
      if (item) {
        item.reviews.unshift({ author: name, stars: 5, comment: comment });
        item.reviewCount++;
        renderDetailView(item.id);
        $('#input-review-name').val('');
        $('#input-review-comment').val('');
        showToast('Terima kasih! Ulasan Anda berhasil ditambahkan.', 'ri-chat-check-fill text-emerald-400');
      }
    });

    $('.btn-map-chip').on('click', function () {
      const filterVal = $(this).data('map-filter');
      $('.btn-map-chip').removeClass('bg-makassarRed text-white font-semibold').addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
      $(this).removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium').addClass('bg-makassarRed text-white font-semibold');

      state.map.filter = filterVal;
      renderMapSidebarAndMarkers();
    });

    $('#input-map-search').on('input', function () {
      state.map.keyword = $(this).val();
      renderMapSidebarAndMarkers();
    });

    $('#btn-map-zoom-in').on('click', function () {
      if (state.map.instance) state.map.instance.zoomIn();
    });
    $('#btn-map-zoom-out').on('click', function () {
      if (state.map.instance) state.map.instance.zoomOut();
    });
    $('#btn-map-reset-bounds').on('click', function () {
      if (state.map.instance) {
        state.map.instance.setView([state.data.meta.mapCenter.lat, state.data.meta.mapCenter.lng], 13);
        showToast('Pusat peta dikembalikan ke pusat Kota Makassar', 'ri-focus-3-line text-makassarRed');
      }
    });

    $('.btn-article-topic').on('click', function () {
      const topic = $(this).data('article-topic');
      $('.btn-article-topic').removeClass('bg-makassarRed text-white font-semibold').addClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium');
      $(this).removeClass('bg-white border-[1.5px] border-slate-300 text-slate-700 font-medium').addClass('bg-makassarRed text-white font-semibold');

      state.articles.activeTopic = topic;
      renderArticlesGrid();
    });

    $('#btn-close-article-modal, #btn-close-article-modal-bottom, #modal-article-reader').on('click', function (e) {
      if (e.target === this) closeArticleModal();
    });

    $('#rec-name, #rec-address').on('input', function () {
      validateRecommendationForm(true);
    });

    $('#btn-autofill-valid-address').on('click', function () {
      $('#rec-address').val('Jl. Serigala No. 88, Kec. Mamajang, Kota Makassar');
      validateRecommendationForm(true);
      showToast('Contoh alamat lengkap berhasil diisi!', 'ri-magic-line text-losariOrange');
    });

    $('#form-rekomendasi-kuliner').on('submit', function (e) {
      e.preventDefault();
      const isValid = validateRecommendationForm(true);
      if (!isValid) {
        showToast('Mohon lengkapi formulir rekomendasi dengan benar.', 'ri-error-warning-fill text-rose-500');
        return;
      }

      const name = $('#rec-name').val();
      showToast(`Sukses! Rekomendasi "${name}" telah dikirim ke kurator portal.`, 'ri-checkbox-circle-fill text-emerald-400');
      this.reset();
      $('#rec-name').val('Pallubasa Onta Lama');
      $('#rec-address').val('Jl. Onta Lama No. 103, Kec. Mamajang');
      validateRecommendationForm(false);
    });

    $('#btn-reset-rekomendasi').on('click', function () {
      $('#form-rekomendasi-kuliner')[0].reset();
      validateRecommendationForm(false);
      showToast('Formulir rekomendasi dikosongkan.', 'ri-refresh-line text-slate-500');
    });
  }

})(window.jQuery);
