/**
 * ============================================================================
 * MODULE: Beranda (Home Exploration, Typewriter, Metric Counters & Cards)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

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
    if (!$container.length) return;

    let html = '';
    state.data.categories.forEach(function (cat) {
      const isActive = state.beranda.category === cat.id;
      const activeClass = isActive
        ? 'bg-makassarRed text-white font-bold border-makassarRed shadow-xs'
        : 'bg-white text-slate-700 font-medium border-slate-300 hover:border-makassarRed';

      html += `
        <button type="button" data-cat="${cat.id}" class="btn-beranda-cat px-4 py-2 rounded-full text-xs sm:text-[13px] border-[1.5px] shrink-0 inline-flex items-center gap-1.5 ${activeClass}">
          <span>${cat.name}</span>
          <span class="text-[11px] opacity-75">(${cat.count})</span>
        </button>
      `;
    });

    $container.html(html);

    $container.find('.btn-beranda-cat').on('click', function () {
      state.beranda.category = $(this).data('cat');
      renderBerandaCategoryChips();
      renderBerandaCards();
    });
  }

  function renderBerandaCards() {
    const $grid = $('#beranda-cards-grid');
    const $info = $('#beranda-result-info');
    if (!$grid.length) return;

    const currentCat = state.beranda.category;
    const keyword = state.beranda.keyword.toLowerCase().trim();
    const kecamatan = state.beranda.kecamatan;

    const filtered = state.data.kuliner.filter(function (item) {
      const matchCat = currentCat === 'all' || item.category === currentCat;
      const matchKec = kecamatan === 'all' || item.kecamatanId === kecamatan;
      const matchKeyword =
        keyword === '' ||
        item.name.toLowerCase().indexOf(keyword) !== -1 ||
        item.addressFull.toLowerCase().indexOf(keyword) !== -1 ||
        item.shortDesc.toLowerCase().indexOf(keyword) !== -1 ||
        item.keywords.some(function (k) { return k.indexOf(keyword) !== -1; });

      return matchCat && matchKec && matchKeyword;
    });

    if (filtered.length === 0) {
      $grid.html(`
        <div class="col-span-full py-12 text-center bg-white border border-slate-200 rounded-xl">
          <i class="ri-search-eye-line text-4xl text-slate-400 mb-2"></i>
          <div class="font-serif-display text-lg font-bold text-slateInk">Kuliner Tidak Ditemukan</div>
          <p class="text-xs text-slate-500 mt-1">Coba kata kunci lain atau pilih kategori "Semua Kuliner".</p>
        </div>
      `);
      if ($info.length) $info.text('0 Kuliner ditemukan').removeClass('hidden');
      return;
    }

    if ($info.length) {
      $info.text(`Menampilkan ${filtered.length} Kuliner`).removeClass('hidden');
    }

    let html = '';
    filtered.forEach(function (item, idx) {
      const badgeColorClass =
        item.badgeColor === 'orange'
          ? 'bg-losariOrangeLight text-losariOrange border-losariOrangeBorder'
          : item.badgeColor === 'green'
          ? 'bg-halalGreenLight text-halalGreen border-halalGreenBorder'
          : 'bg-makassarRedLight text-makassarRed border-makassarRedBorder';

      html += `
        <div class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs group" style="--stagger-idx: ${idx % 6}">
          <div class="flex flex-col gap-3.5">
            <div class="wf-media-frame h-48 sm:h-52 w-full">
              <img src="${item.images.main}" alt="${item.name}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <span class="absolute top-3 left-3 ${badgeColorClass} px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                ${item.categoryBadge}
              </span>
              <span class="absolute top-3 right-3 bg-white/90 backdrop-blur text-slateInk px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs inline-flex items-center gap-1">
                <i class="ri-star-fill text-losariOrange"></i>
                <span>${item.rating}</span>
              </span>
              <div class="wf-media-caption-overlay absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                ${item.addressShort}
              </div>
            </div>

            <div>
              <div class="text-[11px] font-bold text-makassarRed uppercase tracking-wider">${item.established}</div>
              <h3 class="font-serif-display text-lg sm:text-xl font-bold text-slateInk group-hover:text-makassarRed transition mt-0.5">
                ${item.name}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                ${item.shortDesc}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4 mt-4 flex items-center justify-between gap-3">
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase">KABAR HARGA</div>
              <div class="text-xs sm:text-sm font-bold text-makassarRed">${item.priceText}</div>
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

  window.KulinerBerandaModule = {
    initMetricCountersAnimation: initMetricCountersAnimation,
    initBerandaTypewriter: initBerandaTypewriter,
    renderBerandaCategoryChips: renderBerandaCategoryChips,
    renderBerandaCards: renderBerandaCards
  };
})();
