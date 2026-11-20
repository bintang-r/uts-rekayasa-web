/**
 * ============================================================================
 * MODULE: Community Recommendation Form & Validation (Menu 06)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;

  function validateRecommendationForm(showAlert) {
    const $nameInput = $('#rec-name');
    const $nameWrapper = $('#rec-name-wrapper');
    const $nameBadge = $('#rec-name-badge');
    const $nameHelper = $('#rec-name-helper');

    const nameVal = $nameInput.val().trim();
    if (nameVal.length >= 3) {
      $nameWrapper.removeClass('bg-makassarRedLight border-makassarRed text-makassarRed').addClass('bg-halalGreenLight border-halalGreen text-slateInk');
      $nameBadge.removeClass('text-makassarRed').addClass('text-halalGreen').html('<i class="ri-checkbox-circle-fill"></i> Nama Valid');
      $nameHelper.addClass('hidden');
    } else {
      $nameWrapper.removeClass('bg-halalGreenLight border-halalGreen text-slateInk').addClass('bg-makassarRedLight border-makassarRed text-makassarRed');
      $nameBadge.removeClass('text-halalGreen').addClass('text-makassarRed').html('<i class="ri-error-warning-fill"></i> Minimal 3 Karakter');
      if (showAlert) $nameHelper.removeClass('hidden');
    }

    const $addrInput = $('#rec-address');
    const $addrWrapper = $('#rec-address-wrapper');
    const $addrBadge = $('#rec-address-badge');
    const $addrHelper = $('#rec-address-helper');

    const addrVal = $addrInput.val().trim();
    const hasNumberOrDetail = /\d/.test(addrVal) && addrVal.length >= 8;

    if (hasNumberOrDetail) {
      $addrWrapper.removeClass('bg-makassarRedLight border-makassarRed text-makassarRed').addClass('bg-halalGreenLight border-halalGreen text-slateInk');
      $addrBadge.removeClass('text-makassarRed').addClass('text-halalGreen').html('<i class="ri-checkbox-circle-fill"></i> Alamat Lengkap');
      $addrHelper.addClass('hidden');
    } else {
      $addrWrapper.removeClass('bg-halalGreenLight border-halalGreen text-slateInk').addClass('bg-makassarRedLight border-makassarRed text-makassarRed');
      $addrBadge.removeClass('text-halalGreen').addClass('text-makassarRed').html('<i class="ri-error-warning-fill"></i> Wajib Lengkap');
      if (showAlert) $addrHelper.addClass('hidden');
    }

    return nameVal.length >= 3 && hasNumberOrDetail;
  }

  window.KulinerRecommendationModule = {
    validateRecommendationForm: validateRecommendationForm
  };
})();
