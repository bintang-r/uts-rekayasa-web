/**
 * ============================================================================
 * MODULE: Articles & Stories (Menu 05)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;
  const getBadgeClasses = window.KulinerDataModule.getBadgeClasses;

  function renderArticlesGrid() {
    const $grid = $('#articles-cards-grid');
    $grid.empty();

    const topic = state.articles.activeTopic;
    const articles = state.data.articles.filter(function (art) {
      if (topic === 'all') return !art.isFeatured;
      return art.topic === topic;
    });

    $('#article-count-label').text(`Menampilkan ${articles.length} Artikel Pilihan`);

    articles.forEach(function (art, idx) {
      const badgeCls = getBadgeClasses(art.badgeColor);

      $grid.append(`
        <article style="--stagger-idx: ${idx}" class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 hover:border-makassarRed/60 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 shadow-xs hover:shadow-md transition group">
          <div class="flex flex-col gap-3">
            <div class="wf-media-frame h-44 w-full cursor-pointer btn-read-article" data-article-id="${art.id}">
              <img src="${art.image}" alt="${art.title}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent"></div>
              <span class="absolute top-2.5 left-2.5 ${badgeCls} px-2.5 py-0.5 rounded-md text-[11px] font-bold">
                ${art.badgeText}
              </span>
            </div>

            <h3 class="font-serif-display text-lg font-bold text-slateInk group-hover:text-makassarRed transition leading-snug cursor-pointer btn-read-article" data-article-id="${art.id}">
              ${art.title}
            </h3>
            <p class="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              ${art.excerpt}
            </p>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 pt-3">
            <span class="text-[11px] text-slate-500 inline-flex items-center gap-1"><i class="ri-time-line"></i> <span>${art.readTime}</span></span>
            <button type="button" data-article-id="${art.id}" class="btn-read-article text-xs sm:text-[13px] font-bold text-makassarRed hover:underline inline-flex items-center gap-1">
              <span>Baca Selengkapnya</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </article>
      `);
    });
  }

  function openArticleModal(articleId) {
    const art = state.data.articles.find(function (a) { return a.id === articleId; });
    if (!art) return;

    state.articles.modalArticleId = art.id;
    $('#modal-article-badge').text(art.badgeText);
    $('#modal-article-img').attr('src', art.image).attr('alt', art.title);
    $('#modal-article-meta').text(`${art.publishedDate} • Oleh ${art.author} • ${art.readTime}`);
    $('#modal-article-title').text(art.title);

    const $body = $('#modal-article-body');
    $body.empty();
    (art.content || []).forEach(function (paragraph) {
      $body.append(`<p>${paragraph}</p>`);
    });

    $('#btn-modal-article-kuliner')
      .data('detail-id', art.relatedKulinerId)
      .html(`<span>${art.relatedLabel}</span> <i class="ri-arrow-right-line"></i>`);

    $('#modal-article-reader').removeClass('hidden');
  }

  function closeArticleModal() {
    $('#modal-article-reader').addClass('hidden');
  }

  window.KulinerArticlesModule = {
    renderArticlesGrid: renderArticlesGrid,
    openArticleModal: openArticleModal,
    closeArticleModal: closeArticleModal
  };
})();
