/**
 * ============================================================================
 * MODULE: Navigation & Mobile Burger Drawer
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

  function openBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').removeClass('hidden').hide().fadeIn(200);
    $('body').addClass('overflow-hidden');
  }

  function closeBurgerDrawer() {
    $('#mobile-burger-drawer-backdrop').fadeOut(200, function () {
      $(this).addClass('hidden');
    });
    $('body').removeClass('overflow-hidden');
  }

  function navigateToSection(sectionId) {
    state.activeSection = sectionId;

    $('.page-section').addClass('hidden');
    $('#section-' + sectionId).removeClass('hidden');

    $('.nav-link-item')
      .removeClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .addClass('border-transparent');
    $('.nav-link-item[data-nav="' + sectionId + '"]')
      .addClass('font-bold text-makassarRed bg-makassarRedLight border-makassarRedBorder')
      .removeClass('border-transparent');

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
          $badge.html('<span>Beranda</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-slate-500');
        if (navTarget === 'kategori')
          $badge.html('<span>48 Kuliner</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-slate-500');
        if (navTarget === 'detail')
          $badge.html('<i class="ri-star-fill"></i> <span>4.9</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-losariOrange font-bold');
        if (navTarget === 'peta')
          $badge.html('<span>15 Kec.</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-slate-500');
        if (navTarget === 'artikel')
          $badge.html('<span>18 Kisah</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-slate-500');
        if (navTarget === 'tentang')
          $badge.html('<span>Form</span> <i class="ri-arrow-right-line"></i>').removeClass('text-makassarRed').addClass('text-slate-500');
      }
    });

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

    closeBurgerDrawer();

    if (sectionId === 'peta' && state.map.instance) {
      setTimeout(function () {
        state.map.instance.invalidateSize();
      }, 150);
    }

    if (sectionId === 'detail' && state.map.miniMapInstance) {
      setTimeout(function () {
        state.map.miniMapInstance.invalidateSize();
      }, 150);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.KulinerNavModule = {
    openBurgerDrawer: openBurgerDrawer,
    closeBurgerDrawer: closeBurgerDrawer,
    navigateToSection: navigateToSection
  };
})();
