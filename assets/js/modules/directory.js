/**
 * ============================================================================
 * MODULE: Directory & Category Filtering (Menu 02)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;
  const getBadgeClasses = window.KulinerDataModule.getBadgeClasses;
  const showToast = window.KulinerToastModule.showToast;

  function renderDirectorySidebarFilters() {
    // 1. Category List
    const $catList = $('#filter-category-list');
    $catList.empty();

    state.data.categories.forEach(function (cat) {
      const isSelected = state.directory.category === cat.id;
      const rowClasses = isSelected
        ? 'bg-makassarRedLight border border-makassarRedBorder text-makassarRed font-bold'
        : 'bg-transparent hover:bg-slate-50 text-slate-700 font-medium';
      const iconHtml = isSelected
        ? '<i class="ri-checkbox-fill text-makassarRed text-base"></i>'
        : '<i class="ri-checkbox-blank-line text-slate-400 text-base"></i>';

      $catList.append(`
        <button type="button" data-dir-cat="${cat.id}" class="btn-dir-category w-full flex items-center justify-between px-2.5 py-2 rounded-lg transition ${rowClasses}">
          <span class="inline-flex items-center gap-2">${iconHtml} <span>${cat.name}</span></span>
          <span class="text-xs">${cat.count}</span>
        </button>
      `);
    });

    // 2. Kecamatan Checkboxes
    const $kecList = $('#filter-kecamatan-list');
    $kecList.empty();

    state.data.kecamatanList.forEach(function (kec) {
      const isChecked = state.directory.kecamatan.includes(kec.id);
      const textClasses = isChecked ? 'font-semibold text-slateInk' : 'text-slate-600';
      const boxHtml = isChecked
        ? '<i class="ri-checkbox-fill text-makassarRed text-base"></i>'
        : '<i class="ri-checkbox-blank-line text-slate-400 text-base"></i>';

      $kecList.append(`
        <button type="button" data-dir-kec="${kec.id}" class="btn-dir-kecamatan w-full flex items-center justify-between px-2 py-1 rounded hover:bg-slate-50 text-left transition ${textClasses}">
          <span class="inline-flex items-center gap-2">${boxHtml} <span>${kec.name} (${kec.count})</span></span>
        </button>
      `);
    });

    // 3. Price Range Buttons
    $('.btn-price-filter').each(function () {
      const $btn = $(this);
      const bucket = $btn.data('price');
      const isActive = state.directory.priceBuckets.includes(bucket);

      if (isActive) {
        if (bucket === 'under25') {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-makassarRedLight text-makassarRed border-makassarRedBorder font-bold');
        } else if (bucket === '25to50') {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-losariOrangeLight text-losariOrange border-losariOrangeBorder font-bold');
        } else {
          $btn
            .removeClass('bg-white text-slate-600 border-slate-300')
            .addClass('bg-halalGreenLight text-halalGreen border-halalGreenBorder font-bold');
        }
      } else {
        $btn
          .removeClass(
            'bg-makassarRedLight text-makassarRed border-makassarRedBorder bg-losariOrangeLight text-losariOrange border-losariOrangeBorder bg-halalGreenLight text-halalGreen border-halalGreenBorder font-bold'
          )
          .addClass('bg-white text-slate-600 border-slate-300 font-medium');
      }
    });
  }

  function renderDirectoryMobileChips() {
    const $chips = $('#mobile-directory-chips');
    $chips.empty();

    state.data.categories.forEach(function (cat) {
      const isActive = state.directory.category === cat.id;
      const cls = isActive
        ? 'bg-makassarRed text-white font-semibold border-[1.5px] border-makassarRed'
        : 'bg-white text-slate-700 font-medium border-[1.5px] border-slate-300';
      const label = cat.id === 'all' ? `Semua (${cat.count})` : `${cat.shortName} (${cat.count})`;

      $chips.append(`
        <button type="button" data-dir-cat="${cat.id}" class="btn-dir-category ${cls} text-xs px-3 py-1.5 rounded-full shrink-0 transition">
          ${label}
        </button>
      `);
    });
  }

  function getFilteredDirectoryItems() {
    const kw = state.directory.keyword.trim().toLowerCase();
    const cat = state.directory.category;
    const kecList = state.directory.kecamatan;
    const priceList = state.directory.priceBuckets;

    const filtered = state.data.kuliner.filter(function (item) {
      const matchCat = cat === 'all' || item.category === cat;
      const matchKec = kecList.length === 0 || kecList.includes(item.kecamatanId);
      const matchPrice = priceList.length === 0 || priceList.includes(item.priceBucket);
      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.directoryName.toLowerCase().includes(kw) ||
        item.shortDesc.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw) ||
        (item.keywords && item.keywords.some(function (k) { return k.toLowerCase().includes(kw); }));

      return matchCat && matchKec && matchPrice && matchKw;
    });

    // Sort results
    const sortBy = state.directory.sortBy;
    filtered.sort(function (a, b) {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

    return filtered;
  }

  function renderDirectoryResults() {
    const items = getFilteredDirectoryItems();
    const $grid = $('#directory-cards-grid');
    $grid.empty();

    // Update counts and active status bar
    $('#filter-button-count').text(items.length);
    const activeCatObj =
      state.data.categories.find(function (c) { return c.id === state.directory.category; }) || state.data.categories[0];

    $('#directory-status-text').html(
      `Menampilkan <strong class="text-slateInk">${items.length} Kuliner</strong> untuk kategori <strong class="text-makassarRed">${activeCatObj.name}</strong>`
    );

    // Update mobile filter badge
    if (state.directory.kecamatan.length === state.data.kecamatanList.length) {
      $('#mobile-filter-count-badge').text('Semua');
    } else {
      $('#mobile-filter-count-badge').text(state.directory.kecamatan.length + ' Kec');
    }

    // Active removable tags
    const $tags = $('#directory-active-tags');
    $tags.empty();

    if (state.directory.category !== 'all') {
      $tags.append(`
        <button type="button" data-clear-tag="category" class="btn-remove-tag bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-1 rounded-md text-xs font-bold hover:bg-red-100 transition inline-flex items-center gap-1">
          <span>${activeCatObj.name}</span>
          <i class="ri-close-line"></i>
        </button>
      `);
    }

    if (state.directory.keyword.trim() !== '') {
      $tags.append(`
        <button type="button" data-clear-tag="keyword" class="btn-remove-tag bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2.5 py-1 rounded-md text-xs font-bold hover:bg-orange-100 transition inline-flex items-center gap-1">
          <span>"${state.directory.keyword}"</span>
          <i class="ri-close-line"></i>
        </button>
      `);
    }

    if (state.directory.kecamatan.length < state.data.kecamatanList.length) {
      state.directory.kecamatan.forEach(function (kecId) {
        const kecObj = state.data.kecamatanList.find(function (k) { return k.id === kecId; });
        if (kecObj) {
          $tags.append(`
            <button type="button" data-clear-kec="${kecId}" class="btn-remove-kec-tag bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-md text-xs font-semibold hover:bg-slate-200 transition inline-flex items-center gap-1">
              <span>${kecObj.shortName}</span>
              <i class="ri-close-line"></i>
            </button>
          `);
        }
      });
    }

    if (items.length === 0) {
      $grid.append(`
        <div class="col-span-full bg-white border-[1.5px] border-dashed border-slate-300 rounded-xl p-10 text-center">
          <div class="text-lg font-serif-display font-bold text-slateInk">Tidak ada kuliner yang cocok dengan kombinasi filter</div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Silakan klik tombol Reset Filter untuk menampilkan kembali seluruh destinasi kuliner Makassar.</p>
          <button type="button" id="btn-empty-reset-dir" class="mt-4 bg-makassarRed text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
            Reset Semua Filter
          </button>
        </div>
      `);
      return;
    }

    items.forEach(function (item, idx) {
      const badgeCls = getBadgeClasses(item.badgeColor);
      const cleanStatus = (item.statusBadge || '').replace(/^✓\s*/, '');

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <div class="wf-media-frame h-40 sm:h-44 w-full cursor-pointer btn-open-detail" data-detail-id="${item.id}">
              <img src="${item.images.main}" alt="${item.directoryName}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${item.categoryFullBadge}
              </span>
              <span class="absolute bottom-2.5 right-2.5 bg-halalGreenLight text-halalGreen border border-halalGreenBorder px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1">
                <i class="ri-shield-check-fill"></i>
                <span>${cleanStatus}</span>
              </span>
            </div>

            <div>
              <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition cursor-pointer btn-open-detail" data-detail-id="${item.id}">
                ${item.directoryName}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-1 leading-relaxed">
                ${item.heroSubline} • ${item.addressShort}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 pt-3">
            <span class="text-xs font-bold text-losariOrange inline-flex items-center gap-1"><i class="ri-star-fill"></i> <span>${item.rating} • ${item.reviewCount.toLocaleString('id-ID')} Ulasan</span></span>
            <div class="flex items-center gap-2">
              <span class="text-xs sm:text-[13px] font-bold text-slateInk">${item.priceText}</span>
              <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-white hover:bg-makassarRed hover:text-white hover:border-makassarRed text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1">
                <span>Lihat Detail</span>
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </article>
      `);
    });
  }

  function resetDirectoryFilters() {
    state.directory.category = 'all';
    state.directory.kecamatan = state.data.kecamatanList.map(function (k) { return k.id; });
    state.directory.priceBuckets = ['under25', '25to50', 'above50'];
    state.directory.keyword = '';
    state.directory.sortBy = 'popular';
    $('#input-directory-search').val('');
    $('#select-directory-sort').val('popular');
    renderDirectorySidebarFilters();
    renderDirectoryMobileChips();
    renderDirectoryResults();
    showToast('Filter direktori telah di-reset', 'ri-refresh-line text-amber-300');
  }

  window.KulinerDirectoryModule = {
    renderDirectorySidebarFilters: renderDirectorySidebarFilters,
    renderDirectoryMobileChips: renderDirectoryMobileChips,
    renderDirectoryResults: renderDirectoryResults,
    resetDirectoryFilters: resetDirectoryFilters
  };
})();
