/**
 * ============================================================================
 * MODULE: Community Recommendation Form & Validation (Menu 06)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const showToast = window.KulinerToastModule.showToast;

  function validateRecommendationForm(showFeedback) {
    const nameVal = $('#rec-name').val().trim();
    const addrVal = $('#rec-address').val().trim();

    // 1. Validate Nama Kuliner
    const isNameValid = nameVal.length >= 3;
    const $nameWrap = $('#rec-name-wrapper');
    const $nameBadge = $('#rec-name-badge');
    const $nameHelper = $('#rec-name-helper');

    if (isNameValid) {
      $nameWrap
        .removeClass('bg-makassarRedLight border-makassarRed')
        .addClass('bg-halalGreenLight border-halalGreen');
      $nameBadge
        .html('<i class="ri-checkbox-circle-fill"></i> <span>Nama Valid</span>')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
      $nameHelper.addClass('hidden');
    } else {
      $nameWrap
        .removeClass('bg-halalGreenLight border-halalGreen')
        .addClass('bg-makassarRedLight border-makassarRed');
      $nameBadge
        .html('<i class="ri-error-warning-fill"></i> <span>Wajib Diisi</span>')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
      $nameHelper.removeClass('hidden');
    }

    // 2. Validate Alamat Lengkap (Valid if length >= 10 and doesn't contain placeholder "belum diisi")
    const hasNumberOrLandmark =
      addrVal.length >= 10 &&
      !addrVal.toLowerCase().includes('belum diisi') &&
      (/\d+/.test(addrVal) ||
        addrVal.toLowerCase().includes('no.') ||
        addrVal.toLowerCase().includes('dekat') ||
        addrVal.toLowerCase().includes('samping') ||
        addrVal.toLowerCase().includes('depan'));

    const $addrLabel = $('#rec-address-label');
    const $addrWrap = $('#rec-address-wrapper');
    const $addrInput = $('#rec-address');
    const $addrBadge = $('#rec-address-badge');
    const $addrHelper = $('#rec-address-helper');

    if (hasNumberOrLandmark) {
      $addrLabel.removeClass('text-makassarRed').addClass('text-slateInk');
      $addrWrap
        .removeClass('bg-makassarRedLight border-makassarRed')
        .addClass('bg-halalGreenLight border-halalGreen');
      $addrInput.removeClass('text-makassarRed').addClass('text-slateInk font-semibold');
      $addrBadge
        .html('<i class="ri-checkbox-circle-fill"></i> <span>Alamat Lengkap</span>')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
      $addrHelper
        .text('Titik lokasi dan nomor jalan siap ditambahkan ke Peta Kuliner Makassar.')
        .removeClass('text-makassarRed')
        .addClass('text-halalGreen');
    } else {
      $addrLabel.removeClass('text-slateInk').addClass('text-makassarRed');
      $addrWrap
        .removeClass('bg-halalGreenLight border-halalGreen')
        .addClass('bg-makassarRedLight border-makassarRed');
      $addrInput.removeClass('text-slateInk font-semibold').addClass('text-makassarRed');
      $addrBadge
        .html('<i class="ri-error-warning-fill"></i> <span>Wajib Lengkap</span>')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
      $addrHelper
        .text('Mohon lengkapi nomor jalan atau patokan agar titik peta akurat.')
        .removeClass('text-halalGreen')
        .addClass('text-makassarRed');
    }

    if (showFeedback && (!isNameValid || !hasNumberOrLandmark)) {
      showToast('Mohon lengkapi Nomor Jalan / Patokan Lokasi terlebih dahulu.', 'ri-error-warning-fill text-amber-400');
    }

    return isNameValid && hasNumberOrLandmark;
  }

  window.KulinerRecommendationModule = {
    validateRecommendationForm: validateRecommendationForm
  };
})();
