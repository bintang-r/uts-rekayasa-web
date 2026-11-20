/**
 * ============================================================================
 * MODULE: Toast Notifications & Favorites Counter
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

  window.KulinerToastModule = {
    updateFavoriteCounter: function () {
      $('#fav-count-badge').text(state.favorites.length);
    },

    showToast: function (message, iconClass) {
      const $toast = $('#app-toast');
      const resolvedIcon = iconClass || 'ri-checkbox-circle-fill text-emerald-400';
      $('#app-toast-icon').html(`<i class="${resolvedIcon}"></i>`);
      $('#app-toast-message').text(message);
      $toast.removeClass('hidden').stop(true, true).fadeIn(200);
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(function () {
        $toast.fadeOut(250, function () {
          $toast.addClass('hidden');
        });
      }, 3400);
    }
  };
})();
