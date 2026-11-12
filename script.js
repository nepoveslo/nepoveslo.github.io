const viewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#viewer-image');
let opener;

document.querySelectorAll('[data-image]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof viewer.showModal !== 'function') return;
    event.preventDefault();
    opener = link;
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector('img').alt;
    document.querySelector('#viewer-title').textContent = link.dataset.title;
    document.querySelector('#viewer-original').href = link.dataset.original || link.href;
    viewer.showModal();
    document.body.classList.add('viewing');
    document.querySelector('.viewer-scroll').scrollTop = 0;
  });
});
document.querySelector('#close-viewer').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewing');
  opener?.focus();
});
