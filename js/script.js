const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const galleryTrack = document.getElementById('galleryTrack');
const galleryDots = document.querySelectorAll('.gallery-dot');
if (galleryTrack && galleryDots.length) {
  galleryDots.forEach(dot => dot.addEventListener('click', () => {
    const index = Number(dot.dataset.slide || 0);
    const slide = galleryTrack.children[index];
    if (slide) slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    galleryDots.forEach((d, i) => d.classList.toggle('active', i === index));
  }));
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = [...galleryTrack.children].indexOf(entry.target);
        galleryDots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
    });
  }, { root: galleryTrack, threshold: 0.6 });
  [...galleryTrack.children].forEach(slide => slideObserver.observe(slide));
}


// Mobile auto sliders for city cards.
// Improved version:
// - slower 3.8s interval, so users can read each city
// - uses scrollTo(left) instead of scrollIntoView, so the whole page will not jump/move
// - pauses when the user touches/swipes and resumes later
function setupMobileAutoSlider(trackSelector, dotSelector = null, intervalMs = 3800) {
  const track = document.querySelector(trackSelector);
  if (!track) return;

  const slides = Array.from(track.children);
  const dots = dotSelector ? Array.from(document.querySelectorAll(dotSelector)) : [];
  let index = 0;
  let timer = null;
  let paused = false;

  const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

  const setDots = () => {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  const goTo = (nextIndex, smooth = true) => {
    if (!slides.length || !isMobile()) return;

    index = (nextIndex + slides.length) % slides.length;
    const slide = slides[index];

    // Calculate horizontal scroll only. This prevents the page itself from moving.
    const left = slide.offsetLeft - ((track.clientWidth - slide.offsetWidth) / 2);
    track.scrollTo({
      left: Math.max(0, left),
      behavior: smooth ? 'smooth' : 'auto'
    });

    setDots();
  };

  const start = () => {
    stop();
    if (!isMobile() || slides.length < 2) return;
    timer = setInterval(() => {
      if (!paused) goTo(index + 1);
    }, intervalMs);
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const pauseThenResume = () => {
    paused = true;
    window.clearTimeout(track._sliderPauseTimeout);
    track._sliderPauseTimeout = window.setTimeout(() => {
      paused = false;
    }, 5200);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      pauseThenResume();
      goTo(i);
    });
  });

  track.addEventListener('touchstart', pauseThenResume, { passive: true });
  track.addEventListener('pointerdown', pauseThenResume);

  track.addEventListener('scroll', () => {
    if (!isMobile()) return;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let bestIndex = 0;
    let bestDistance = Infinity;

    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    });

    index = bestIndex;
    setDots();
  }, { passive: true });

  window.addEventListener('resize', start);
  setDots();
  start();
}

setupMobileAutoSlider('#cityTrack', '.city-dot', 3800);
setupMobileAutoSlider('#heroCityStrip', null, 4200);




// EASY AUTO PROJECT GALLERY
// No need to edit js/gallery-data.js.
// Just copy images into assets/images/projects/ and rename:
// project-01.jpg, project-02.jpg, project-03.jpg ... up to project-30.jpg
const projectGallery = document.getElementById('projectGallery');
const galleryFilters = document.querySelectorAll('.gallery-filter');

const AUTO_GALLERY_LIMIT = 30;
const AUTO_GALLERY_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
let loadedGalleryItems = [];

function tryLoadGalleryImage(number, extensionIndex = 0) {
  return new Promise((resolve) => {
    if (extensionIndex >= AUTO_GALLERY_EXTENSIONS.length) {
      resolve(null);
      return;
    }

    const padded = String(number).padStart(2, '0');
    const extension = AUTO_GALLERY_EXTENSIONS[extensionIndex];
    const file = `project-${padded}.${extension}`;
    const src = `assets/images/projects/${file}`;
    const image = new Image();

    image.onload = () => {
      resolve({
        src,
        file,
        title: `Project Photo ${padded}`,
        city: 'Chan Groups',
        category: 'Project'
      });
    };

    image.onerror = async () => {
      const next = await tryLoadGalleryImage(number, extensionIndex + 1);
      resolve(next);
    };

    image.src = src;
  });
}

async function loadAutoGalleryItems() {
  const results = [];
  for (let i = 1; i <= AUTO_GALLERY_LIMIT; i++) {
    const item = await tryLoadGalleryImage(i);
    if (item) results.push(item);
  }
  return results;
}

function renderProjectGallery(filter = 'All') {
  if (!projectGallery) return;

  const items = loadedGalleryItems.filter(item => filter === 'All' || item.category === filter);

  if (!items.length) {
    projectGallery.innerHTML = `
      <div class="gallery-empty">
        <i class="fa-solid fa-images"></i>
        <strong>No project photos found</strong>
        <span>Add images in assets/images/projects/ and rename them project-01.jpg, project-02.jpg...</span>
      </div>
    `;
    return;
  }

  projectGallery.innerHTML = items.map((item) => `
    <button class="project-gallery-card" type="button" aria-label="Open ${item.title}">
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <span class="gallery-badge">${item.category}</span>
      <div class="gallery-card-content">
        <small><i class="fa-solid fa-location-dot"></i> ${item.city}</small>
        <strong>${item.title}</strong>
      </div>
    </button>
  `).join('');
}

galleryFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    galleryFilters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjectGallery(btn.dataset.filter || 'All');
  });
});

if (projectGallery) {
  loadAutoGalleryItems().then(items => {
    loadedGalleryItems = items;
    renderProjectGallery('All');
  });
}

// Quick Enquiry: send form details directly to WhatsApp.
// This is better than a static form because it opens the customer's WhatsApp with a pre-filled message.
document.querySelectorAll('form[name="property-enquiry"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = (form.querySelector('[name="name"]')?.value || '').trim();
    const mobile = (form.querySelector('[name="mobile"]')?.value || '').trim();
    const propertyType = (form.querySelector('[name="property-type"]')?.value || '').trim();
    const city = (form.querySelector('[name="city"]')?.value || '').trim();

    const message = [
      'Hello Chan Groups, I visited your website and want property details.',
      '',
      `Name: ${name || '-'}`,
      `Mobile: ${mobile || '-'}`,
      `Property Type: ${propertyType || '-'}`,
      `Preferred City: ${city || '-'}`,
      '',
      'Please contact me with current availability and site visit details.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/916302307242?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  });
});

// 1 to 1 Property Advisor popup + WhatsApp lead capture
const advisorModal = document.getElementById('advisorModal');
const advisorForm = document.getElementById('advisorForm');

function openAdvisorModal(event) {
  if (event) event.preventDefault();
  if (!advisorModal) return;

  advisorModal.style.display = 'flex';
  requestAnimationFrame(() => {
    advisorModal.classList.add('open');
    advisorModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });

  const firstInput = advisorModal.querySelector('input, select, textarea, button');
  if (firstInput) {
    setTimeout(() => firstInput.focus({ preventScroll: true }), 120);
  }
}

function closeAdvisorModal() {
  if (!advisorModal) return;

  advisorModal.classList.remove('open');
  advisorModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  setTimeout(() => {
    if (!advisorModal.classList.contains('open')) {
      advisorModal.style.display = 'none';
    }
  }, 180);
}

document.addEventListener('click', (event) => {
  const openBtn = event.target.closest('[data-open-advisor]');
  if (openBtn) {
    openAdvisorModal(event);
    return;
  }

  const closeBtn = event.target.closest('[data-close-advisor]');
  if (closeBtn) {
    event.preventDefault();
    closeAdvisorModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeAdvisorModal();
    if (typeof closeEnrollThankModal === 'function') closeEnrollThankModal();
  }
});

if (advisorForm) {
  advisorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fd = new FormData(advisorForm);
    const message = [
      'Hello Chan Groups, I want to enquire about 1 to 1 Property Advisor paid service.',
      '',
      `Name: ${fd.get('name') || '-'}`,
      `Mobile: ${fd.get('mobile') || '-'}`,
      `City: ${fd.get('city') || '-'}`,
      `Budget: ${fd.get('budget') || '-'}`,
      `Need: ${fd.get('need') || '-'}`,
      '',
      'Please contact me with advisor service details and charges.'
    ].join('\n');

    window.location.href = `https://wa.me/916302307242?text=${encodeURIComponent(message)}`;
  });
}

// Mentorship enrollment form -> WhatsApp
const mentorshipForms = document.querySelectorAll('.mentorship-form');
const enrollModal = document.getElementById('enrollModal');
const enrollThankModal = document.getElementById('enrollThankModal');
const thankWhatsAppLink = document.getElementById('thankWhatsAppLink');
const thankYouVideo = document.getElementById('thankYouVideo');
const videoPlaceholder = document.getElementById('videoPlaceholder');

function openEnrollModal(event) {
  if (event) event.preventDefault();
  if (!enrollModal) return;

  enrollModal.style.display = 'flex';
  requestAnimationFrame(() => {
    enrollModal.classList.add('open');
    enrollModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });

  const firstInput = enrollModal.querySelector('input, select, textarea, button');
  if (firstInput) {
    setTimeout(() => firstInput.focus({ preventScroll: true }), 120);
  }
}

function closeEnrollModal() {
  if (!enrollModal) return;

  enrollModal.classList.remove('open');
  enrollModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  setTimeout(() => {
    if (!enrollModal.classList.contains('open')) {
      enrollModal.style.display = 'none';
    }
  }, 180);
}

document.addEventListener('click', (event) => {
  const openBtn = event.target.closest('[data-open-enroll-modal]');
  if (openBtn) {
    openEnrollModal(event);
    return;
  }

  const closeBtn = event.target.closest('[data-close-enroll-modal]');
  if (closeBtn) {
    event.preventDefault();
    closeEnrollModal();
  }
});

function openEnrollThankModal(whatsappUrl) {
  if (!enrollThankModal) return;

  if (thankWhatsAppLink) {
    thankWhatsAppLink.href = whatsappUrl;
  }

  if (thankYouVideo) {
    const src = thankYouVideo.dataset.videoSrc || '';
    if (src && (src.startsWith('https://www.youtube.com/embed/') || src.startsWith('https://www.instagram.com/'))) {
      thankYouVideo.src = src;
      thankYouVideo.style.display = 'block';
      if (videoPlaceholder) videoPlaceholder.style.display = 'none';
    } else {
      thankYouVideo.removeAttribute('src');
      thankYouVideo.style.display = 'none';
      if (videoPlaceholder) videoPlaceholder.style.display = 'grid';
    }
  }

  enrollThankModal.classList.add('open');
  enrollThankModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeEnrollThankModal() {
  if (!enrollThankModal) return;
  enrollThankModal.classList.remove('open');
  enrollThankModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (thankYouVideo) {
    thankYouVideo.removeAttribute('src');
  }
}

document.querySelectorAll('[data-close-enroll-thank]').forEach((btn) => {
  btn.addEventListener('click', closeEnrollThankModal);
});

mentorshipForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fd = new FormData(form);
    const message = [
      'Hello Chan Groups, I want to enroll in the FREE Real Estate Professional 365 Days Mentorship Program.',
      '',
      `Name: ${fd.get('name') || '-'}`,
      `Mobile: ${fd.get('mobile') || '-'}`,
      `WhatsApp: ${fd.get('whatsapp') || '-'}`,
      `Email: ${fd.get('email') || '-'}`,
      `City: ${fd.get('city') || '-'}`,
      `Occupation: ${fd.get('occupation') || '-'}`,
      `Why I want to join: ${fd.get('why') || '-'}`,
      '',
      'Please reserve my seat for the 2-hour master class.'
    ].join('\n');

    const whatsappUrl = `https://wa.me/916302307242?text=${encodeURIComponent(message)}`;

    closeEnrollModal();
    window.open(whatsappUrl, '_blank', 'noopener');
    openEnrollThankModal(whatsappUrl);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeEnrollModal();
    closeEnrollThankModal();
  }
});

// Tiny scroll-to-top button used on main website and mentorship page
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  const toggleScrollTop = () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 360);
  };

  window.addEventListener('scroll', toggleScrollTop, { passive: true });
  toggleScrollTop();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}



// Final GitHub Pages-safe quick enquiry fallback.
// The form does not submit to a backend. It opens WhatsApp with the visitor details.
const propertyEnquiryForm = document.getElementById('propertyEnquiryForm');
if (propertyEnquiryForm && !propertyEnquiryForm.dataset.whatsappBound) {
  propertyEnquiryForm.dataset.whatsappBound = 'true';
  propertyEnquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fd = new FormData(propertyEnquiryForm);
    const message = [
      'Hello Chan Groups, I visited your website and want property details.',
      '',
      `Name: ${fd.get('name') || '-'}`,
      `Mobile: ${fd.get('mobile') || '-'}`,
      `Property Type: ${fd.get('property-type') || '-'}`,
      `Preferred City: ${fd.get('city') || '-'}`,
      '',
      'Please contact me with current availability and site visit details.'
    ].join('\n');

    window.location.href = `https://wa.me/916302307242?text=${encodeURIComponent(message)}`;
  });
}
