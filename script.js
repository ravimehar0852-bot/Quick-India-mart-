/* ============================================================
   QUICK INDIA MART — PREMIUM E-COMMERCE SCRIPT
   ============================================================ */

'use strict';

// ============================================================
// LOADING SCREEN
// ============================================================
window.addEventListener('load', () => {
    initAll();
});

function initAll() {
  initScrollAnimations();
  initSlider();
  initFAQ();
  initReviews();
  initCountdown();
  initVisitorCounter();
  initRecentOrders();
  initExitIntent();
  initScrollTop();
  initStickyHeader();
  initPaymentToggle();
  initFormValidation();
  initHeroCountdown();
}

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

// ============================================================
// IMAGE SLIDER
// ============================================================
let currentSlide = 0;
const slides     = [];
const thumbs     = [];
let slideTimer   = null;

function initSlider() {
  const sliderEl = document.getElementById('heroSlider');
  const dotsEl   = document.getElementById('slideDots');
  const thumbsEl = document.getElementById('galleryThumbs');
  if (!sliderEl) return;

  const allSlides = sliderEl.querySelectorAll('.slide');
  const allThumbs = thumbsEl ? thumbsEl.querySelectorAll('.thumb') : [];

  allSlides.forEach((s, i) => slides.push(s));
  allThumbs.forEach(t => thumbs.push(t));

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);
  });

  // Zoom on click
  sliderEl.addEventListener('click', () => {
    slides[currentSlide].style.transform =
      slides[currentSlide].style.transform === 'scale(1.08)' ? 'scale(1)' : 'scale(1.08)';
    slides[currentSlide].style.transition = 'transform 0.4s ease';
  });

  autoSlide();
}

function autoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => changeSlide(1), 4000);
}

function changeSlide(dir) {
  const total = slides.length;
  goToSlide((currentSlide + dir + total) % total);
}

function goToSlide(idx) {
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].style.transform = 'scale(1)';
  thumbs[currentSlide]?.classList.remove('active');
  document.querySelectorAll('#slideDots .dot')[currentSlide]?.classList.remove('active');

  currentSlide = idx;
  slides[currentSlide].classList.add('active');
  thumbs[currentSlide]?.classList.add('active');
  document.querySelectorAll('#slideDots .dot')[currentSlide]?.classList.add('active');
  autoSlide();
}

// Expose globally
window.changeSlide = changeSlide;
window.goToSlide   = goToSlide;

// ============================================================
// CUSTOMER REVIEWS
// ============================================================
const reviewsData = [
  { name: 'Priya Sharma',    city: 'Delhi',      rating: 5, review: 'Absolutely stunning saree! Quality is amazing, exactly as shown. The Jarkan work is so beautiful, everyone at the wedding was complimenting me!', date: '2 days ago' },
  { name: 'Meena Patel',     city: 'Mumbai',     rating: 5, review: 'Ordered for my daughter\'s engagement. The fabric quality is premium and the gold zari work is breathtaking. Highly recommend!', date: '1 week ago' },
  { name: 'Sunita Agarwal',  city: 'Jaipur',     rating: 5, review: 'Fast delivery and packaging was excellent. The saree looks even more gorgeous in person. COD was very convenient.', date: '3 days ago' },
  { name: 'Rekha Verma',     city: 'Lucknow',    rating: 5, review: 'Wore this to a family function and got so many compliments! The Jimmy Choo fabric drapes beautifully. Worth every rupee!', date: '5 days ago' },
  { name: 'Kavita Singh',    city: 'Bangalore',  rating: 4, review: 'Beautiful saree, the border cutwork is exquisite. Delivery was on time. The color is exactly as pictured. Will order again!', date: '1 week ago' },
  { name: 'Anjali Gupta',    city: 'Hyderabad',  rating: 5, review: 'Best purchase ever! The diamond stonework is absolutely dazzling. My husband was speechless when he saw me in it. 100% worth it!', date: '2 weeks ago' },
  { name: 'Nisha Kapoor',    city: 'Pune',       rating: 5, review: 'Exceeded my expectations! Such fine craftsmanship. The gold embroidery on the blouse is gorgeous. Super quick delivery too.', date: '4 days ago' },
  { name: 'Pooja Yadav',     city: 'Chennai',    rating: 5, review: 'I was skeptical about ordering online but Quick India Mart delivered beyond expectations. The saree is magnificent. Highly recommend!', date: '6 days ago' },
];

function initReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  reviewsData.forEach((r, i) => {
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    const initial = r.name.charAt(0);
    const card = document.createElement('div');
    card.className = 'review-card fade-in';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar">${initial}</div>
        <div class="review-info">
          <strong>${r.name}</strong>
          <div class="review-stars">${stars}</div>
        </div>
      </div>
      <p class="review-text">"${r.review}"</p>
      <p class="review-date">📍 ${r.city} · ${r.date}</p>
      <span class="review-badge">✓ Verified Purchase</span>
    `;
    grid.appendChild(card);
  });
  initScrollAnimations();
}

// ============================================================
// FAQ ACCORDION
// ============================================================
const faqs = [
  { q: 'How long does delivery take?',             a: 'We dispatch within 24 hours of order confirmation. Delivery takes 4–7 business days depending on your location. Express delivery options are available in select cities.' },
  { q: 'Is Cash on Delivery available?',           a: 'Yes! We offer Cash on Delivery (COD) all across India at no extra charge. Pay only when you receive your saree at your doorstep.' },
  { q: 'What is the return and exchange policy?',  a: 'Returns are not allowed after delivery.}
  { q: 'Is the quality exactly as shown?',         a: 'Absolutely! The saree is exactly as described and pictured. We use high-quality Jimmy Choo fabric with real Jarkan diamond stones and pure Hart Gold Zari work.' },
  { q: 'What sizes are available for the blouse?', a: 'The blouse piece is unstitched, so you can get it stitched according to your custom measurements. The fabric provided is sufficient for sizes up to 42 inches.' },
  { q: 'Which payment methods do you accept?',     a: 'We accept Cash on Delivery (COD), PhonePe, Google Pay, Paytm, and BHIM UPI. All payment modes are 100% safe and secure.' },
  { q: 'What is the saree material?',              a: 'The saree is made from premium Heavy Jimmy Choo fabric, known for its luxurious drape and rich texture. It features pure Hart Gold Zari and full heavy Jarkan diamond stonework.' },
  { q: 'How do I track my order?',                 a: 'Once your order is dispatched, you will receive a tracking number on your registered mobile via WhatsApp. You can track your shipment in real time.' },
  { q: 'Is there a discount for bulk orders?',     a: 'Yes! For orders of 3 or more sarees, we offer special bulk pricing. Please contact us on WhatsApp at +91 8504843164 for bulk order inquiries.' },
];

function initFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  faqs.forEach((f, i) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="faq-q" onclick="toggleFAQ(this)">
        <span>${f.q}</span>
        <span class="faq-arrow">+</span>
      </div>
      <div class="faq-a">${f.a}</div>
    `;
    list.appendChild(item);
  });
}

function toggleFAQ(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function initCountdown() {
  // Set end time 6 hours from now, or load from session
  let endTime = sessionStorage.getItem('qim_countdown');
  if (!endTime) {
    endTime = Date.now() + 6 * 60 * 60 * 1000;
    sessionStorage.setItem('qim_countdown', endTime);
  }

  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) {
      // Reset timer
      const newEnd = Date.now() + 6 * 60 * 60 * 1000;
      sessionStorage.setItem('qim_countdown', newEnd);
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');

    const hEl = document.getElementById('c-hours');
    const mEl = document.getElementById('c-mins');
    const sEl = document.getElementById('c-secs');
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  update();
  setInterval(update, 1000);
}

function initHeroCountdown() {
  let endTime = sessionStorage.getItem('qim_countdown') || (Date.now() + 6 * 3600000);
  function update() {
    const diff = endTime - Date.now();
    if (diff <= 0) return;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    const el = document.getElementById('heroCountdown');
    if (el) el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  update();
  setInterval(update, 1000);
}

// ============================================================
// LIVE VISITOR COUNTER
// ============================================================
function initVisitorCounter() {
  const el = document.getElementById('visitorCount');
  if (!el) return;
  let count = Math.floor(Math.random() * 80) + 200;
  el.textContent = count;
  setInterval(() => {
    count += Math.floor(Math.random() * 5) - 2;
    count = Math.max(180, Math.min(350, count));
    el.textContent = count;
  }, 4000);
}

// ============================================================
// RECENT ORDER POPUP
// ============================================================
const orderNames = [
  ['Sneha', 'Delhi'], ['Priya', 'Mumbai'], ['Anjali', 'Jaipur'], ['Reena', 'Lucknow'],
  ['Pooja', 'Bangalore'], ['Meena', 'Hyderabad'], ['Kavita', 'Pune'], ['Sunita', 'Chennai'],
  ['Rekha', 'Kolkata'], ['Nisha', 'Ahmedabad'], ['Divya', 'Bhopal'], ['Geeta', 'Patna']
];
const timeStrings = ['just now', '1 minute ago', '2 minutes ago', '3 minutes ago', '5 minutes ago', 'just now'];

function initRecentOrders() {
  const popup  = document.getElementById('recentOrderPopup');
  const nameEl = document.getElementById('ropName');
  const timeEl = document.getElementById('ropTime');
  if (!popup) return;

  let idx = 0;
  function showOrder() {
    const [name, city] = orderNames[idx % orderNames.length];
    const time = timeStrings[idx % timeStrings.length];
    if (nameEl) nameEl.textContent = `${name} from ${city}`;
    if (timeEl) timeEl.textContent = `ordered ${time}`;
    popup.classList.remove('hidden');
    setTimeout(() => popup.classList.add('hidden'), 5000);
    idx++;
  }

  setTimeout(showOrder, 5000);
  setInterval(showOrder, 18000);
}

// ============================================================
// EXIT INTENT POPUP
// ============================================================
function initExitIntent() {
  let triggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !triggered) {
      triggered = true;
      const popup = document.getElementById('exitPopup');
      if (popup) popup.classList.remove('hidden');
    }
  });
}

function closeExitPopup() {
  const popup = document.getElementById('exitPopup');
  if (popup) popup.classList.add('hidden');
}
window.closeExitPopup = closeExitPopup;

// ============================================================
// ORDER MODAL
// ============================================================
let selectedColor = 'Deep Royal Blue';

function openOrderModal() {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Pre-fill color if selected on hero
  const colorSelect = document.getElementById('color');
  if (colorSelect && selectedColor) colorSelect.value = selectedColor;

  // Show form, hide success
  document.getElementById('orderFormSection')?.classList.remove('hidden');
  document.getElementById('orderSuccessSection')?.classList.add('hidden');
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

window.openOrderModal  = openOrderModal;
window.closeOrderModal = closeOrderModal;

// Close modal on overlay click
document.getElementById('orderModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeOrderModal();
});
document.getElementById('exitPopup')?.addEventListener('click', function(e) {
  if (e.target === this) closeExitPopup();
});

// ============================================================
// COLOR SELECTION (Hero)
// ============================================================
function selectColor(el, colorName) {
  document.querySelectorAll('.c-dot').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
  selectedColor = colorName;
  const txt = document.getElementById('selectedColorText');
  if (txt) txt.textContent = 'Selected: ' + colorName;
}
window.selectColor = selectColor;

// ============================================================
// PAYMENT TOGGLE
// ============================================================
function initPaymentToggle() {
  const radios = document.querySelectorAll('input[name="payment"]');
  const upiSec = document.getElementById('upiSection');
  radios.forEach(r => {
    r.addEventListener('change', () => {
      if (!upiSec) return;
      upiSec.classList.toggle('hidden', r.value !== 'UPI' || !r.checked);
    });
  });
}

// ============================================================
// FORM VALIDATION & SUBMISSION
// ============================================================
function initFormValidation() {
  const form = document.getElementById('orderForm');
  if (!form) return;
  form.addEventListener('submit', handleOrderSubmit);
}

function showErr(id, msg) {
  const el = document.getElementById('err-' + id);
  const inp = document.getElementById(id);
  if (el) el.textContent = msg;
  if (inp) inp.classList.add('invalid');
}

function clearErr(id) {
  const el = document.getElementById('err-' + id);
  const inp = document.getElementById(id);
  if (el) el.textContent = '';
  if (inp) inp.classList.remove('invalid');
}

function validate() {
  let ok = true;
  const fields = [
    { id: 'fName',   msg: 'Please enter your full name',       test: v => v.trim().length >= 2 },
    { id: 'mobile',  msg: 'Enter a valid 10-digit mobile number', test: v => /^[6-9]\d{9}$/.test(v.trim()) },
    { id: 'house',   msg: 'Please enter house/flat number',    test: v => v.trim().length > 0 },
    { id: 'street',  msg: 'Please enter your street/area',     test: v => v.trim().length > 0 },
    { id: 'city',    msg: 'Please enter your city',            test: v => v.trim().length > 0 },
    { id: 'state',   msg: 'Please select your state',          test: v => v !== '' },
    { id: 'pincode', msg: 'Enter a valid 6-digit pincode',     test: v => /^\d{6}$/.test(v.trim()) },
    { id: 'color',   msg: 'Please select a color',             test: v => v !== '' },
  ];

  fields.forEach(f => {
    const val = document.getElementById(f.id)?.value || '';
    if (!f.test(val)) { showErr(f.id, f.msg); ok = false; }
    else clearErr(f.id);
  });

  return ok;
}

function handleOrderSubmit(e) {
  e.preventDefault();
  if (!validate()) return;

  const name     = document.getElementById('fName').value.trim();
  const mobile   = document.getElementById('mobile').value.trim();
  const altMob   = document.getElementById('altMobile').value.trim();
  const house    = document.getElementById('house').value.trim();
  const street   = document.getElementById('street').value.trim();
  const city     = document.getElementById('city').value.trim();
  const state    = document.getElementById('state').value;
  const pincode  = document.getElementById('pincode').value.trim();
  const qty      = document.getElementById('qty').value;
  const color    = document.getElementById('color').value;
  const notes    = document.getElementById('instructions').value.trim();
  const payment  = document.querySelector('input[name="payment"]:checked')?.value || 'COD';
  const txnId    = document.getElementById('txnId')?.value.trim() || '';

  const addr = `${house}, ${street}, ${city}, ${state} - ${pincode}`;

  // Build WhatsApp message
  const waMsg = encodeURIComponent(
`🛍️ *NEW ORDER — Quick India Mart*

📦 *Product:* Women Trending Jimmy Choo Saree
💰 *Amount:* ₹1,299

👤 *Customer Name:* ${name}
📱 *Mobile:* ${mobile}${altMob ? '\n📱 *Alt Mobile:* ' + altMob : ''}
🏠 *Address:* ${addr}
📌 *Pincode:* ${pincode}

🎨 *Color:* ${color}
🔢 *Quantity:* ${qty}
💳 *Payment:* ${payment}${txnId ? '\n🧾 *Txn ID:* ' + txnId : ''}${notes ? '\n📝 *Notes:* ' + notes : ''}

✅ Please confirm this order!`
  );

  const waLink = `https://wa.me/918504843164?text=${waMsg}`;

  // Show success
  const successDetails = document.getElementById('successDetails');
  if (successDetails) {
    successDetails.innerHTML = `
      <strong>Order Summary:</strong><br>
      Name: ${name}<br>
      Mobile: ${mobile}<br>
      Address: ${addr}<br>
      Product: Women Trending Jimmy Choo Saree<br>
      Color: ${color} | Qty: ${qty}<br>
      Payment: ${payment}<br>
      Amount: ₹1,299
    `;
  }
  const waLink2 = document.getElementById('whatsappConfirmLink');
  if (waLink2) waLink2.href = waLink;

  document.getElementById('orderFormSection')?.classList.add('hidden');
  document.getElementById('orderSuccessSection')?.classList.remove('hidden');

  // Auto open WhatsApp
  setTimeout(() => window.open(waLink, '_blank'), 800);

  // Track order (simulate)
  sessionStorage.setItem('qim_order', JSON.stringify({ name, mobile, time: Date.now() }));
}

// ============================================================
// STICKY HEADER
// ============================================================
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (!btn) return;
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }, { passive: true });
}

// ============================================================
// MOBILE MENU
// ============================================================
function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  if (nav) nav.classList.toggle('hidden');
}
window.toggleMenu = toggleMenu;

// ============================================================
// POLICY CONTENT
// ============================================================
const policies = {
  privacy: {
    title: '🔒 Privacy Policy',
    content: `
      <h3>Information We Collect</h3>
      <p>We collect your name, mobile number, and delivery address solely to process and deliver your order. Your information is never sold to third parties.</p>
      <h3>How We Use Your Information</h3>
      <p>Your contact details are used only to confirm your order, arrange delivery, and provide customer support via WhatsApp/call.</p>
      <h3>Data Security</h3>
      <p>All customer data is handled with strict confidentiality. We use secure systems to protect your personal information.</p>
      <h3>Contact</h3>
      <p>For privacy concerns, contact us at +91 8504843164 via WhatsApp.</p>
    `
  },
  terms: {
    title: '📋 Terms & Conditions',
    content: `
      <h3>Order Acceptance</h3>
      <p>Orders are confirmed upon successful placement via our website. We reserve the right to cancel orders in case of stock unavailability.</p>
      <h3>Pricing</h3>
      <p>All prices are in Indian Rupees (₹) and inclusive of applicable taxes. Prices may change without prior notice.</p>
      <h3>Product Description</h3>
      <p>We strive to display product colors accurately, but slight variations may occur due to screen settings.</p>
      <h3>Intellectual Property</h3>
      <p>All content on this website including images, descriptions, and brand name is property of Quick India Mart.</p>
    `
  },
  refund: {
    title: '↩️ Refund Policy',
    content: `
      <h3>Return Window</h3>
      <p>We accept returns within 7 days of delivery for damaged, defective, or incorrect items.</p>
      <h3>Refund Process</h3>
      <p>Once we receive and inspect the returned item, refunds are processed within 5–7 business days to your original payment method.</p>
      <h3>Non-Returnable Items</h3>
      <p>Items that have been worn, washed, or altered cannot be returned. Custom stitched blouses are non-refundable.</p>
      <h3>How to Initiate a Return</h3>
      <p>Contact us on WhatsApp at +91 8504843164 with your order details and photos of the issue.</p>
    `
  },
  shipping: {
    title: '🚚 Shipping Policy',
    content: `
      <h3>Delivery Time</h3>
      <p>Orders are dispatched within 24 hours of confirmation. Delivery typically takes 4–7 business days across India.</p>
      <h3>Shipping Charges</h3>
      <p>We offer FREE shipping on all orders across India. No minimum order value required.</p>
      <h3>Order Tracking</h3>
      <p>You will receive a tracking number via WhatsApp once your order is dispatched.</p>
      <h3>Delivery Areas</h3>
      <p>We deliver to all major cities and towns across India. Remote areas may take 1–2 extra days.</p>
      <h3>Failed Delivery</h3>
      <p>If delivery fails, we will attempt re-delivery 2 more times. After that, the order may be returned to us.</p>
    `
  }
};

function showPolicy(type) {
  const modal    = document.getElementById('policyModal');
  const titleEl  = document.getElementById('policyTitle');
  const bodyEl   = document.getElementById('policyContent');
  const p        = policies[type];
  if (!p || !modal) return;
  titleEl.textContent = p.title;
  bodyEl.innerHTML    = p.content;
  modal.classList.remove('hidden');
}
window.showPolicy = showPolicy;

// Close policy modal on overlay click
document.getElementById('policyModal')?.addEventListener('click', function(e) {
  if (e.target === this) this.classList.add('hidden');
});

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// TOUCH SWIPE SUPPORT FOR SLIDER
// ============================================================
(function initSwipe() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
  }, { passive: true });
})();

// ============================================================
// INPUT NUMBER-ONLY ENFORCEMENT
// ============================================================
['mobile','altMobile','pincode'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.value = el.value.replace(/\D/g, '');
  });
});

// ============================================================
// KEYBOARD ESCAPE TO CLOSE MODALS
// ============================================================
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeOrderModal();
    closeExitPopup();
    document.getElementById('policyModal')?.classList.add('hidden');
  }
});

// ============================================================
// PERFORMANCE: LAZY LOAD ANIMATION TRIGGER
// ============================================================
window.addEventListener('scroll', () => {
  const newEls = document.querySelectorAll('.fade-in:not(.visible), .fade-in-left:not(.visible), .fade-in-right:not(.visible)');
  newEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) el.classList.add('visible');
  });
}, { passive: true });

console.log('%c✦ Quick India Mart ✦', 'color:#d4af37;font-size:20px;font-family:Georgia;font-weight:bold;');
console.log('%cPremium E-Commerce Platform | India\'s Luxury Saree Destination', 'color:#7c3aed;font-size:12px;');
