/**
 * ============================================================================
 * MODULE: Navigation & Mobile Burger Drawer
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

  function openBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').removeClass('hidden');
  }

  function closeBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').addClass('hidden');
  }

  function navigateToSection(sectionId, options) {
    const opts = options || {};
    state.activeSection = sectionId;

    // Show target section, hide others
    $('.page-section').addClass('hidden');
    $('#section-' + sectionId).removeClass('hidden');

    // Update Desktop Navbar active button
    $('.nav-link-item')
      .removeClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .addClass('border-transparent');
    $('.nav-link-item[data-nav="' + sectionId + '"]')
      .addClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .removeClass('border-transparent');

    // Update Mobile Burger Drawer active state (Matches Figma M-Drawer)
    $('.drawer-nav-item').each(function () {
      const $btn = $(this);
      const navTarget = $btn.data('nav');
      const $badge = $btn.find('.drawer-status-badge');

      if (navTarget === sectionId) {
        $btn
          .removeClass('border-slate-200 bg-surfaceBg text-slateInk font-semibold')
          .addClass('border-makassarRed bg-makassarRedLight text-makassarRed font-bold');
        $badge
          .html('<i class="ri-record-circle-fill text-xs"></i> <span>Aktif</span>')
          .removeClass('text-slate-500 text-losariOrange')
          .addClass('text-makassarRed font-bold');
      } else {
        $btn
          .removeClass('border-makassarRed bg-makassarRedLight text-makassarRed font-bold')
          .addClass('border-slate-200 bg-surfaceBg text-slateInk font-semibold');
        if (navTarget === 'beranda')
          $badge
            .html('<span>Beranda</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'kategori')
          $badge
            .html('<span>48 Kuliner</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'detail')
          $badge
            .html('<i class="ri-star-fill"></i> <span>4.9</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-losariOrange font-bold');
        if (navTarget === 'peta')
          $badge
            .html('<span>15 Kec.</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'artikel')
          $badge
            .html('<span>18 Kisah</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
        if (navTarget === 'tentang')
          $badge
            .html('<span>Form</span> <i class="ri-arrow-right-line"></i>')
            .removeClass('text-makassarRed')
            .addClass('text-slate-500');
      }
    });

    // Mobile context header adjustment (Matches M02, M03, M04, M05, M06 titles)
    const mobileTitleMap = {
      beranda: 'Kuliner Makassar',
      kategori: 'Direktori Kuliner',
      detail: 'Detail Kuliner',
      peta: 'Peta Kuliner Makassar',
      artikel: 'Artikel & Cerita',
      tentang: 'Tentang & Rekomendasi'
    };

    if ($(window).width() < 1024) {
      $('#navbar-dynamic-title').text(mobileTitleMap[sectionId] || 'Kuliner Makassar');
      if (sectionId === 'detail') {
        $('#mobile-back-direktori').removeClass('hidden').addClass('inline-flex');
        $('#brand-km-icon').addClass('hidden');
      } else {
        $('#mobile-back-direktori').addClass('hidden').removeClass('inline-flex');
        $('#brand-km-icon').removeClass('hidden');
      }
    } else {
      $('#navbar-dynamic-title').text('Kuliner Makassar');
      $('#mobile-back-direktori').addClass('hidden').removeClass('inline-flex');
      $('#brand-km-icon').removeClass('hidden');
    }

    // Close mobile drawer if open
    closeBurgerDrawer();

    // Refresh Leaflet maps when their containers become visible
    if (sectionId === 'peta') {
      if (state.map.instance) {
        state.map.instance.invalidateSize();
      }
      setTimeout(function () {
        if (state.map.instance) {
          state.map.instance.invalidateSize();
          if (window.KulinerMapModule && window.KulinerMapModule.focusPinOnMap) {
            window.KulinerMapModule.focusPinOnMap(state.map.activePinId, false);
          }
        }
      }, 150);
    } else if (sectionId === 'detail') {
      if (window.KulinerDetailModule && window.KulinerDetailModule.updateDetailMiniMap) {
        window.KulinerDetailModule.updateDetailMiniMap();
        setTimeout(function () {
          window.KulinerDetailModule.updateDetailMiniMap();
        }, 150);
      }
    }

    if (opts.focusForm) {
      setTimeout(function () {
        const $form = $('#form-rekomendasi-kuliner');
        if ($form.length) {
          $('html, body').animate({ scrollTop: $form.offset().top - 100 }, 350);
          $('#rec-name').trigger('focus');
        }
      }, 150);
    } else if (!opts.skipScrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  window.KulinerNavModule = {
    openBurgerDrawer: openBurgerDrawer,
    closeBurgerDrawer: closeBurgerDrawer,
    navigateToSection: navigateToSection
  };
})();
