let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}
OnStartUp();

// LINKI W MENU
document.querySelector('#about-link').addEventListener('click', () => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', () => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

// FUNKCJE STRON

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">About Me</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
    `;
}

function RenderContactPage() {
    const captchaCode = Math.random().toString(36).substring(2, 7).toUpperCase();

    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>

            <label for="captcha">Enter the code: <strong>${captchaCode}</strong></label>
            <input type="text" id="captcha" name="captcha" required>

            <button type="submit">Send</button>
        </form>
        <p id="form-msg" style="color:red; margin-top:10px;"></p>
    `;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const captchaInput = document.getElementById('captcha').value.trim();
        const msg = document.getElementById('form-msg');

        if (!message || !captchaInput) {
            msg.textContent = "All fields are required.";
            return;
        }


        if (captchaInput.toUpperCase() !== captchaCode) {
            msg.textContent = "CAPTCHA code does not match.";
            return;
        }

        msg.style.color = "green";
        msg.textContent = "Message sent successfully!";
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
            modalImg.src = img.src;
            modal.classList.remove('hidden');
        });
        return img;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
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

// DARK MODE
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ROUTING NA ODSWIEZENIU
function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) { RenderContactPage(); }
    else if (loc === pageUrls.about) { RenderAboutPage(); }
    else if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}
window.onpopstate = popStateHandler;
