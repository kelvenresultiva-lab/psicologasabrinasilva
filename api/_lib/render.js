const DIACRITICS_RE = /[̀-ͯ]/g;

function slugify(text) {
  return String(text)
    .normalize('NFD').replace(DIACRITICS_RE, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'post';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDatePtBr(dateStr) {
  try {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function renderPostPage(post) {
  const title = escapeHtml(post.title);
  const desc = escapeHtml(post.excerpt || '');
  const dateFmt = formatDatePtBr(post.date);
  const cover = post.coverImage
    ? `<img src="${escapeHtml(post.coverImage)}" alt="${title}" class="sb-post-cover"/>`
    : '';

  return `<!DOCTYPE html>
<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<meta content="index, follow" name="robots"/>
<title>${title} | Blog Sabrina Silva</title>
<meta content="${desc}" name="description"/>
<meta content="pt_BR" property="og:locale"/>
<meta content="article" property="og:type"/>
<meta content="${title}" property="og:title"/>
<meta content="${desc}" property="og:description"/>
<meta content="Sabrina Silva - Psicóloga" property="og:site_name"/>
${post.coverImage ? `<meta content="${escapeHtml(post.coverImage)}" property="og:image"/>` : ''}
<link href="/assets/sabrina-logo.png" rel="icon" sizes="32x32"/>
<link href="/assets/782b342f846f2900_dxs1xze.css" media="all" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="/blog/blog.css" rel="stylesheet"/>
</head>
<body class="sb-blog-body">
<header class="sb-blog-header">
<a href="/" class="sb-blog-logo"><img src="/assets/sabrina-logo.png" alt="Sabrina Silva - Psicóloga"/> Sabrina Silva</a>
<a href="/" class="sb-blog-back">← Voltar ao site</a>
</header>
<main class="sb-blog-main">
<article class="sb-post">
${cover}
<p class="sb-post-date">${dateFmt}</p>
<h1 class="sb-post-title">${title}</h1>
<div class="sb-post-content">${post.contentHtml || ''}</div>
<div class="sb-post-cta">
<p>Quer conversar sobre o que leu aqui?</p>
<a class="sb-post-cta-btn" href="https://api.whatsapp.com/send?phone=553195591650&text=Ol%C3%A1%2C%20li%20o%20artigo%20%22${encodeURIComponent(post.title)}%22%20no%20site%20e%20gostaria%20de%20saber%20mais." target="_blank" rel="noopener">Falar no WhatsApp</a>
</div>
</article>
</main>
<footer class="sb-blog-footer">
<p>© Copyright 2026. Todos os direitos reservados.</p>
<p>Página desenvolvida por <strong>Resultiva</strong></p>
</footer>
</body></html>`;
}

module.exports = { slugify, escapeHtml, formatDatePtBr, renderPostPage };
