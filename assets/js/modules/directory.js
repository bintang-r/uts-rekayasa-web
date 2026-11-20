/**
 * ============================================================================
 * MODULE: Directory & Category Filtering (Menu 02)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

  function renderDirectorySidebarFilters() {
    const $catList = $('#filter-category-list');
    const $kecList = $('#filter-kecamatan-list');
    if (!$catList.length || !$kecList.length) return;

    let catHtml = `
      <label class="flex items-center gap-2 cursor-pointer py-1 hover:text-makassarRed">
        <input type="checkbox" value="all" class="dir-cat-checkbox rounded text-makassarRed focus:ring-makassarRed" checked />
        <span class="font-semibold text-slateInk">Semua Kategori (48)</span>
      </label>
    `;
    state.data.categories.slice(1).forEach(function (cat) {
      catHtml += `
        <label class="flex items-center gap-2 cursor-pointer py-1 hover:text-makassarRed">
          <input type="checkbox" value="${cat.id}" class="dir-cat-checkbox rounded text-makassarRed focus:ring-makassarRed" checked />
          <span class="text-slate-700">${cat.name} (${cat.count})</span>
        </label>
      `;
    });
    $catList.html(catHtml);

    let kecHtml = '';
    state.data.kecamatanList.forEach(function (kec) {
      kecHtml += `
        <label class="flex items-center gap-2 cursor-pointer py-1 hover:text-makassarRed">
          <input type="checkbox" value="${kec.id}" class="dir-kec-checkbox rounded text-makassarRed focus:ring-makassarRed" checked />
          <span class="text-slate-700">${kec.name}</span>
        </label>
      `;
    });
    $kecList.html(kecHtml);

    $('.dir-cat-checkbox').on('change', function () {
      const val = $(this).val();
      if (val === 'all') {
        const isChecked = $(this).is(':checked');
        $('.dir-cat-checkbox').prop('checked', isChecked);
      }
      updateDirectoryFiltersState();
    });

    $('.dir-kec-checkbox').on('change', function () {
      updateDirectoryFiltersState();
    });

    $('.btn-price-filter').on('click', function () {
      $(this).toggleClass('bg-makassarRedLight text-makassarRed border-makassarRedBorder bg-white text-slate-700 border-slate-300');
      updateDirectoryFiltersState();
    });
  }

  function updateDirectoryFiltersState() {
    const selectedCats = [];
    $('.dir-cat-checkbox:not([value="all"]):checked').each(function () {
      selectedCats.push($(this).val());
    });
    state.directory.category = selectedCats.length === 0 ? 'all' : selectedCats;

    const selectedKecs = [];
    $('.dir-kec-checkbox:checked').each(function () {
      selectedKecs.push($(this).val());
    });
    state.directory.kecamatan = selectedKecs;

    const selectedPrices = [];
    $('.btn-price-filter').each(function () {
      if ($(this).hasClass('bg-makassarRedLight') || $(this).hasClass('bg-losariOrangeLight')) {
        selectedPrices.push($(this).data('price'));
      }
    });
    state.directory.priceBuckets = selectedPrices;

    renderDirectoryResults();
  }

  function renderDirectoryMobileChips() {
    const $chips = $('#mobile-directory-chips');
    if (!$chips.length) return;

    let html = `
      <button type="button" data-dir-chip="all" class="btn-dir-chip px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 bg-makassarRed text-white">
        Semua (48)
      </button>
    `;
    state.data.categories.slice(1).forEach(function (cat) {
      html += `
        <button type="button" data-dir-chip="${cat.id}" class="btn-dir-chip px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 bg-white border border-slate-300 text-slate-700 hover:border-makassarRed">
          ${cat.shortName}
        </button>
      `;
    });
    $chips.html(html);

    $chips.find('.btn-dir-chip').on('click', function () {
      const catId = $(this).data('dir-chip');
      $chips.find('.btn-dir-chip').removeClass('bg-makassarRed text-white font-bold').addClass('bg-white border border-slate-300 text-slate-700');
      $(this).removeClass('bg-white border border-slate-300 text-slate-700').addClass('bg-makassarRed text-white font-bold');

      state.directory.category = catId === 'all' ? 'all' : [catId];
      renderDirectoryResults();
    });
  }

  function renderDirectoryResults() {
    const $grid = $('#directory-cards-grid');
    const $status = $('#directory-status-text');
    const $tags = $('#directory-active-tags');
    const $countBtn = $('#filter-button-count');
    if (!$grid.length) return;

    const keyword = state.directory.keyword.toLowerCase().trim();
    const activeCats = state.directory.category;
    const activeKecs = state.directory.kecamatan;
    const activePrices = state.directory.priceBuckets;
    const sortBy = state.directory.sortBy;

    const results = state.data.kuliner.filter(function (item) {
      const matchCat =
        activeCats === 'all' ||
        (Array.isArray(activeCats) && activeCats.indexOf(item.category) !== -1);
      const matchKec = Array.isArray(activeKecs) && activeKecs.indexOf(item.kecamatanId) !== -1;
      const matchPrice = Array.isArray(activePrices) && activePrices.indexOf(item.priceBucket) !== -1;
      const matchKey =
        keyword === '' ||
        item.name.toLowerCase().indexOf(keyword) !== -1 ||
        item.addressFull.toLowerCase().indexOf(keyword) !== -1 ||
        item.shortDesc.toLowerCase().indexOf(keyword) !== -1;

      return matchCat && matchKec && matchPrice && matchKey;
    });

    if (sortBy === 'popular') {
      results.sort(function (a, b) { return b.rating - a.rating || b.reviewCount - a.reviewCount; });
    } else if (sortBy === 'price-asc') {
      results.sort(function (a, b) { return a.price - b.price; });
    } else if (sortBy === 'price-desc') {
      results.sort(function (a, b) { return b.price - a.price; });
    } else if (sortBy === 'reviews') {
      results.sort(function (a, b) { return b.reviewCount - a.reviewCount; });
    } else if (sortBy === 'name-asc') {
      results.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }

    if ($countBtn.length) $countBtn.text(results.length);

    if ($status.length) {
      const catLabel =
        activeCats === 'all'
          ? 'Semua Kategori'
          : Array.isArray(activeCats)
          ? `${activeCats.length} Kategori Dipilih`
          : 'Kategori Pilihan';
      $status.html(`Menampilkan <strong class="text-slateInk">${results.length} Kuliner</strong> untuk <strong class="text-makassarRed">${catLabel}</strong>`);
    }

    if (results.length === 0) {
      $grid.html(`
        <div class="col-span-full py-16 text-center bg-white border border-slate-200 rounded-xl">
          <i class="ri-filter-off-line text-4xl text-slate-400 mb-2"></i>
          <div class="font-serif-display text-lg font-bold text-slateInk">Tidak Ada Kuliner yang Cocok</div>
          <p class="text-xs text-slate-500 mt-1">Coba sesuaikan pilihan filter kategori atau kecamatan di sebelah kiri.</p>
        </div>
      `);
      if ($tags.length) $tags.html('');
      return;
    }

    let html = '';
    results.forEach(function (item, idx) {
      html += `
        <div class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs group" style="--stagger-idx: ${idx % 6}">
          <div class="flex flex-col gap-3.5">
            <div class="wf-media-frame h-48 sm:h-52 w-full">
              <img src="${item.images.main}" alt="${item.name}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <span class="absolute top-3 left-3 bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                ${item.categoryBadge}
              </span>
              <span class="absolute top-3 right-3 bg-white/90 backdrop-blur text-slateInk px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs inline-flex items-center gap-1">
                <i class="ri-star-fill text-losariOrange"></i>
                <span>${item.rating} (${item.reviewCount})</span>
              </span>
              <div class="wf-media-caption-overlay absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                ${item.addressShort}
              </div>
            </div>

            <div>
              <div class="text-[11px] font-bold text-makassarRed uppercase tracking-wider">${item.established}</div>
              <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition mt-0.5">
                ${item.name}
              </h3>
              <p class="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                ${item.shortDesc}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4 mt-4 flex items-center justify-between gap-3">
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase">RENTANG HARGA</div>
              <div class="text-xs sm:text-sm font-bold text-makassarRed">${item.priceRange}</div>
            </div>
            <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition inline-flex items-center gap-1">
              <span>Lihat Detail</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      `;
    });

    $grid.html(html);

    $grid.find('.btn-open-detail').on('click', function () {
      const kulinerId = $(this).data('detail-id');
      window.KulinerDetailModule.renderDetailView(kulinerId);
      window.KulinerNavModule.navigateToSection('detail');
    });
  }

  window.KulinerDirectoryModule = {
    renderDirectorySidebarFilters: renderDirectorySidebarFilters,
    renderDirectoryMobileChips: renderDirectoryMobileChips,
    renderDirectoryResults: renderDirectoryResults
  };
})();
