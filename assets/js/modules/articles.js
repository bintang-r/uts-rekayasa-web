/**
 * ============================================================================
 * MODULE: Articles & Stories (Menu 05)
 * ============================================================================
 */

(function () {
  const $ = window.jQuery;
  const state = window.KulinerDataModule.state;

  function renderArticlesGrid() {
    const $grid = $('#articles-cards-grid');
    const $countLabel = $('#article-count-label');
    if (!$grid.length) return;

    const topic = state.articles.activeTopic;
    const filtered = state.data.articles.filter(function (art) {
      return topic === 'all' || art.topic === topic;
    });

    if ($countLabel.length) {
      $countLabel.text(`Menampilkan ${filtered.length} Artikel`);
    }

    let html = '';
    filtered.forEach(function (art, idx) {
      html += `
        <div class="kuliner-card-animated anim-card-enter bg-white border-[1.5px] border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs group" style="--stagger-idx: ${idx % 6}">
          <div class="flex flex-col gap-3.5">
            <div class="wf-media-frame h-48 sm:h-52 w-full">
              <img src="${art.image}" alt="${art.title}" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <span class="absolute top-3 left-3 bg-makassarRedLight text-makassarRed border border-makassarRedBorder px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                ${art.badgeText}
              </span>
              <div class="wf-media-caption-overlay absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                ${art.readTime}
              </div>
            </div>

            <div>
              <h3 class="font-serif-display text-lg sm:text-xl font-bold text-slateInk group-hover:text-makassarRed transition leading-snug">
                ${art.title}
              </h3>
              <p class="text-xs sm:text-[13px] text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                ${art.excerpt}
              </p>
            </div>
          </div>

          <div class="border-t border-slate-200 pt-4 mt-4 flex items-center justify-between gap-3">
            <span class="text-xs text-slate-500 font-medium">${art.publishedDate}</span>
            <button type="button" data-article-id="${art.id}" class="btn-read-article bg-makassarRed hover:bg-makassarRedHover text-white font-semibold text-xs px-4 py-2 rounded-lg transition inline-flex items-center gap-1.5">
              <span>Baca Artikel</span>
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      `;
    });

    $grid.html(html);

    $grid.find('.btn-read-article').on('click', function () {
      const artId = $(this).data('article-id');
      openArticleModal(artId);
    });
  }

  function openArticleModal(articleId) {
    const art = state.data.articles.find(function (a) { return a.id === articleId; });
    if (!art) return;

    state.articles.modalArticleId = art.id;

    $('#modal-article-badge').text(art.badgeText);
    $('#modal-article-img').attr('src', art.image).attr('alt', art.title);
    $('#modal-article-meta').text(`Ditulis oleh ${art.author} • ${art.publishedDate} • ${art.readTime}`);
    $('#modal-article-title').text(art.title);

    let bodyHtml = '';
    art.content.forEach(function (paragraph) {
      bodyHtml += `<p>${paragraph}</p>`;
    });
    $('#modal-article-body').html(bodyHtml);

    $('#btn-modal-article-kuliner')
      .text(art.relatedLabel)
      .off('click')
      .on('click', function () {
        closeArticleModal();
        window.KulinerDetailModule.renderDetailView(art.relatedKulinerId);
        window.KulinerNavModule.navigateToSection('detail');
      });

    $('#modal-article-reader').removeClass('hidden').hide().fadeIn(200);
    $('body').addClass('overflow-hidden');
  }

  function closeArticleModal() {
    $('#modal-article-reader').fadeOut(200, function () {
      $(this).addClass('hidden');
    });
    $('body').removeClass('overflow-hidden');
  }

  window.KulinerArticlesModule = {
    renderArticlesGrid: renderArticlesGrid,
    openArticleModal: openArticleModal,
    closeArticleModal: closeArticleModal
  };
})();
