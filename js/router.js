let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};
function OnStartUp() {
    popStateHandler();
}
OnStartUp();
document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});
document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});
document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});
function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
 <h1 class="title">About Me</h1>
 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}
function RenderContactPage() {
    document.querySelector('main').innerHTML = `
 <h1 class="title">Contact with me</h1>
 <form id="contact-form">
 <label for="name">Name:</label>
 <input type="text" id="name" name="name" required>
 <label for="email">Email:</label>
 <input type="email" id="email" name="email" required>
 <label for="message">Message:</label>
 <textarea id="message" name="message" required></textarea>
 <button type="submit">Send</button>
 </form>`;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}
function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
      <h1 class="title">Gallery</h1>
      <div id="gallery" class="gallery-grid"></div>
      <div id="modal" class="modal hidden">
        <span id="close-btn">&times;</span>
        <img id="modal-img" src="" alt="Large view">
      </div>
    `;

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
        if (e.target === modal) modal.classList.add('hidden');
    });
}


document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) { RenderContactPage(); }
    else if (loc === pageUrls.about) { RenderAboutPage(); }
    else if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}

window.onpopstate = popStateHandler; 
