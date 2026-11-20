/**
 * ============================================================================
 * MODULE: Beranda (Home Exploration, Typewriter, Metric Counters & Cards)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;
  const getBadgeClasses = window.KulinerDataModule.getBadgeClasses;
  const formatReviewCountShort = window.KulinerDataModule.formatReviewCountShort;

  function initMetricCountersAnimation() {
    const $k = $('#metric-count-kuliner');
    const $c = $('#metric-count-kecamatan');
    const $r = $('#metric-count-rating');

    if (!$k.length) return;

    const duration = 1200;
    const steps = 36;
    const intervalTime = Math.floor(duration / steps);
    let currentStep = 0;

    const timer = setInterval(function () {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);

      const valKuliner = Math.round(128 * eased);
      const valKecamatan = Math.round(15 * eased);
      const valRating = (4.8 * eased).toFixed(1);

      $k.text(valKuliner + '+');
      $c.text(valKecamatan);
      $r.html(`<span>${valRating}</span> <i class="ri-star-fill text-losariOrange text-base"></i>`);

      if (currentStep >= steps) {
        clearInterval(timer);
        $k.text('128+');
        $c.text('15');
        $r.html('<span>4.8</span> <i class="ri-star-fill text-losariOrange text-base"></i>');
      }
    }, intervalTime);
  }

  function initBerandaTypewriter() {
    const $prefix = $('#hero-typewriter-prefix');
    const $dynamic = $('#hero-typewriter-dynamic');
    const $subtitle = $('#hero-subtitle-typewriter');
    const $subCursor = $('#hero-subtitle-cursor');
    const $searchInput = $('#input-hero-search');

    if (!$prefix.length || !$dynamic.length) return;

    const prefixText = 'Jelajahi Cita Rasa Autentik & ';
    const dynamicPhrases = [
      { text: 'Warisan Kuliner Kota Makassar', accent: false },
      { text: '40 Rempah Coto Makassar', accent: true },
      { text: 'Gurihnya Pallubasa & Konro', accent: true },
      { text: 'Manisnya Pisang Epe Losari', accent: true }
    ];

    const subtitleText =
      'Temukan hidangan legendaris mulai dari Coto Makassar berempah 40 macam, Pallubasa hangat, Konro Bakar Karebosi, hingga manisnya Pisang Epe di tepi Pantai Losari.';

    let prefixIndex = 0;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeHeadlineStep() {
      if (prefixIndex < prefixText.length) {
        prefixIndex++;
        $prefix.text(prefixText.slice(0, prefixIndex));
        setTimeout(typeHeadlineStep, 35);
        return;
      }

      const currentObj = dynamicPhrases[phraseIndex];
      const fullText = currentObj.text;

      if (currentObj.accent) {
        $dynamic.addClass('is-accent');
      } else {
        $dynamic.removeClass('is-accent');
      }

      if (!isDeleting) {
        charIndex++;
        $dynamic.text(fullText.slice(0, charIndex));

        if (charIndex >= fullText.length) {
          isDeleting = true;
          setTimeout(typeHeadlineStep, phraseIndex === 0 ? 3200 : 2300);
        } else {
          setTimeout(typeHeadlineStep, 48);
        }
      } else {
        charIndex--;
        $dynamic.text(fullText.slice(0, charIndex));

        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % dynamicPhrases.length;
          setTimeout(typeHeadlineStep, 320);
        } else {
          setTimeout(typeHeadlineStep, 24);
        }
      }
    }

    let subIndex = 0;
    $subCursor.removeClass('hidden');
    function typeSubtitleStep() {
      if (subIndex < subtitleText.length) {
        subIndex += 2;
        $subtitle.text(subtitleText.slice(0, subIndex));
        setTimeout(typeSubtitleStep, 18);
      } else {
        $subtitle.text(subtitleText);
        setTimeout(function () {
          $subCursor.addClass('hidden');
        }, 600);
      }
    }

    const searchPlaceholders = [
      'Cari nama kuliner, kecamatan, atau bahan utama...',
      'Coba ketik: Coto Makassar Nusantara...',
      'Coba ketik: Pallubasa Serigala Mamajang...',
      'Coba ketik: Pisang Epe Pantai Losari...'
    ];
    let spPhraseIdx = 0;
    let spCharIdx = 0;
    let spDeleting = false;

    function typeSearchPlaceholder() {
      if ($searchInput.is(':focus') || $searchInput.val().trim() !== '') {
        setTimeout(typeSearchPlaceholder, 1500);
        return;
      }

      const currentPlaceholder = searchPlaceholders[spPhraseIdx];
      if (!spDeleting) {
        spCharIdx++;
        $searchInput.attr('placeholder', currentPlaceholder.slice(0, spCharIdx));
        if (spCharIdx >= currentPlaceholder.length) {
          spDeleting = true;
          setTimeout(typeSearchPlaceholder, 2600);
        } else {
          setTimeout(typeSearchPlaceholder, 45);
        }
      } else {
        spCharIdx--;
        $searchInput.attr('placeholder', currentPlaceholder.slice(0, spCharIdx));
        if (spCharIdx <= 0) {
          spDeleting = false;
          spPhraseIdx = (spPhraseIdx + 1) % searchPlaceholders.length;
          setTimeout(typeSearchPlaceholder, 350);
        } else {
          setTimeout(typeSearchPlaceholder, 20);
        }
      }
    }

    typeHeadlineStep();
    setTimeout(typeSubtitleStep, 250);
    setTimeout(typeSearchPlaceholder, 1200);
  }

  function renderBerandaCategoryChips() {
    const $container = $('#beranda-category-chips');
    $container.empty();

    state.data.categories.forEach(function (cat) {
      const isActive = state.beranda.category === cat.id;
      const btnClasses = isActive
        ? 'bg-makassarRed text-white font-semibold border-[1.5px] border-makassarRed'
        : 'bg-white text-slate-700 font-medium border-[1.5px] border-slate-300 hover:border-makassarRed hover:text-makassarRed';
      const label = `${cat.name} (${cat.count})`;

      $container.append(`
        <button type="button" data-beranda-cat="${cat.id}" class="btn-beranda-cat ${btnClasses} text-xs sm:text-[13px] px-3.5 sm:px-4 py-2 rounded-full shrink-0 transition">
          ${label}
        </button>
      `);
    });
  }

  function renderBerandaCards() {
    const $grid = $('#beranda-cards-grid');
    $grid.empty();

    const kw = state.beranda.keyword.trim().toLowerCase();
    const cat = state.beranda.category;
    const kec = state.beranda.kecamatan;

    let items = state.data.kuliner.filter(function (item) {
      const matchCat = cat === 'all' || item.category === cat;
      const matchKec = kec === 'all' || item.kecamatanId === kec;
      const matchKw =
        !kw ||
        item.name.toLowerCase().includes(kw) ||
        item.shortDesc.toLowerCase().includes(kw) ||
        item.addressShort.toLowerCase().includes(kw) ||
        item.kecamatanLabel.toLowerCase().includes(kw) ||
        (item.keywords && item.keywords.some(function (k) { return k.toLowerCase().includes(kw); }));

      return matchCat && matchKec && matchKw;
    });

    // If no active filter on Beranda, show the 6 featured hero cards matching Figma 01
    const hasFilter = kw !== '' || cat !== 'all' || kec !== 'all';
    if (!hasFilter) {
      const featured = items.filter(function (i) { return i.isFeaturedHero; });
      items = featured.length >= 6 ? featured.slice(0, 6) : items.slice(0, 6);
      $('#beranda-result-info').addClass('hidden');
    } else {
      $('#beranda-result-info')
        .removeClass('hidden')
        .text(`Ditemukan ${items.length} kuliner yang sesuai`);
    }

    if (items.length === 0) {
      $grid.append(`
        <div class="col-span-full bg-white border-[1.5px] border-dashed border-slate-300 rounded-xl p-8 text-center">
          <div class="text-base font-bold text-slateInk">Kuliner tidak ditemukan untuk pencarian "${state.beranda.keyword}"</div>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Coba kata kunci lain seperti "Coto", "Pallubasa", "Konro", "Pisang Epe", atau reset filter kategori.</p>
          <button type="button" id="btn-reset-beranda-filter" class="mt-4 bg-makassarRed text-white text-xs font-semibold px-4 py-2 rounded-lg">
            Tampilkan Semua Kuliner
          </button>
        </div>
      `);
      return;
    }

    items.forEach(function (item, idx) {
      const badgeCls = getBadgeClasses(item.badgeColor);
      const revShort = formatReviewCountShort(item.reviewCount);

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <!-- Media Box -->
            <div class="wf-media-frame h-44 w-full cursor-pointer btn-open-detail" data-detail-id="${item.id}">
              <img src="${item.images.main}" alt="${item.name}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${item.categoryBadge}
              </span>
              <span class="absolute bottom-2.5 right-2.5 bg-losariOrangeLight text-losariOrange border border-losariOrangeBorder px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-flex items-center gap-1">
                <i class="ri-star-fill"></i>
                <span>${item.rating} (${revShort})</span>
              </span>
            </div>

            <!-- Title & Description -->
            <div>
              <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition cursor-pointer btn-open-detail" data-detail-id="${item.id}">
                ${item.name}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                ${item.shortDesc}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2.5 pt-1">
            <div class="flex items-center justify-between text-xs text-slate-500">
              <span class="truncate pr-2 inline-flex items-center gap-1"><i class="ri-map-pin-2-fill text-makassarRed shrink-0"></i> <span class="truncate">${item.addressShort}</span></span>
              <span class="shrink-0 inline-flex items-center gap-1"><i class="ri-time-line text-slate-400"></i> <span>${item.openHours}</span></span>
            </div>
            <div class="flex items-center justify-between border-t border-slate-200 pt-3">
              <span class="text-xs sm:text-[13px] font-bold text-makassarRed">Mulai ${item.priceText}/porsi</span>
              <button type="button" data-detail-id="${item.id}" class="btn-open-detail bg-white hover:bg-makassarRed hover:text-white hover:border-makassarRed text-slateInk border-[1.5px] border-slate-300 font-semibold text-xs px-3.5 py-1.5 rounded-lg transition inline-flex items-center gap-1">
                <span>Detail</span>
                <i class="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </article>
      `);
    });
  }

  window.KulinerBerandaModule = {
    initMetricCountersAnimation: initMetricCountersAnimation,
    initBerandaTypewriter: initBerandaTypewriter,
    renderBerandaCategoryChips: renderBerandaCategoryChips,
    renderBerandaCards: renderBerandaCards
  };
})();
