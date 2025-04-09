const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.getElementById('close-btn');

const imageList = Array.from({ length: 9 }, (_, i) => `images/${i + 1}.jpg`);

function createImageElement(src) {
  const img = document.createElement('img');
  img.setAttribute('loading', 'lazy');
  img.dataset.src = src; 
  img.classList.add('lazy-img');
  img.addEventListener('click', () => {
    modalImg.src = src;
    modal.classList.remove('hidden');
  });
  return img;
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      obs.unobserve(img);
    }
  });
});

imageList.forEach(src => {
  const img = createImageElement(src);
  observer.observe(img);
  gallery.appendChild(img);
});

closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
