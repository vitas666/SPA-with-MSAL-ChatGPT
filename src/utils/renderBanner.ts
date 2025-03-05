export default function renderBanner(banner) {
    if (!banner) {
        return;
    }
    const { headline, strapline, background, link } = banner;
    const template = `
<section class="banner">
  <header>
    <h1>${headline}</h1>
    <h2>${strapline}</h2>
  </header>
  <img src="${background.image.url().build()}" alt="${background.alt}" />
  <a href="${link.url}"> ${link.title} </a>
</section>
`;
    document.body.innerHTML = template;
}