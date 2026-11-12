/* Client booking frontend → same localStorage as salon desk */
const STORE_KEY = "hair_salon_data";

const AVATAR_FALLBACK = "images/avatar-fallback.jpg";
const AVATAR_POOL = [
  "images/client-mae.jpg",
  "images/client-kara.jpg",
  "images/client-curtis.jpg",
  "images/client-alejandra.jpg",
  "images/client-leyton.jpg",
  "images/client-molly.jpg",
  "images/client-devon.jpg",
  "images/client-sienna.jpg",
  "images/client-noah.jpg",
  "images/client-amina.jpg",
  "images/client-brian.jpg",
  "images/client-grace.jpg",
  "images/client-peter.jpg",
  "images/client-linda.jpg",
];

function avatarForName(name) {
  const s = String(name || "guest");
  let h = 0;
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return AVATAR_POOL[h % AVATAR_POOL.length] || AVATAR_FALLBACK;
}

const MEN_ONLY_SERVICES = new Set(["Men's Haircut", "Beard Trim", "Haircut"]);

const DEFAULT_SERVICES = [
  { name: "Lash Extensions", desc: "Classic or hybrid extensions", duration: "90–120 min", price: "UGX 220,000", category: "Lashes", rating: 5.0, reviews: 21, discount: "10% off", image: "images/svc-lashes.jpg" },
  { name: "Lash Lift & Tint", desc: "Lift, curl, and tint natural lashes", duration: "60 min", price: "UGX 140,000", category: "Lashes", rating: 4.9, reviews: 16, discount: null, image: "images/svc-lash-lift.jpg" },
  { name: "Gel Manicure", desc: "Shape, gel polish & cuticle care", duration: "45–60 min", price: "UGX 95,000", category: "Nails", rating: 5.0, reviews: 28, discount: "10% off", image: "images/svc-nails.jpg" },
  { name: "Luxury Pedicure", desc: "Soak, scrub, polish & massage", duration: "60–75 min", price: "UGX 120,000", category: "Nails", rating: 4.9, reviews: 19, discount: null, image: "images/svc-pedicure.jpg" },
  { name: "Acrylic / Soft Gel Set", desc: "Full set with soft glam finish", duration: "90–120 min", price: "UGX 160,000", category: "Nails", rating: 4.9, reviews: 17, discount: "10% off", image: "images/cat-nails.jpg" },
  { name: "Signature Facial", desc: "Cleanse, extract, mask & glow", duration: "60–75 min", price: "UGX 180,000", category: "Facial", rating: 5.0, reviews: 22, discount: "10% off", image: "images/svc-facial.jpg" },
  { name: "Deep Cleanse Facial", desc: "Detox facial for congested skin", duration: "75–90 min", price: "UGX 210,000", category: "Facial", rating: 4.9, reviews: 14, discount: null, image: "images/cat-facial.jpg" },
  { name: "Brow Shape & Tint", desc: "Shape, tidy, and tint brows", duration: "30–40 min", price: "UGX 70,000", category: "Facial", rating: 4.8, reviews: 18, discount: null, image: "images/svc-brows.jpg" },
  { name: "Soft Glam Makeup", desc: "Everyday or event soft glam face", duration: "60–90 min", price: "UGX 200,000", category: "Glam", rating: 5.0, reviews: 20, discount: "10% off", image: "images/svc-makeup.jpg" },
  { name: "Women's Haircut", desc: "Consultation, wash, cut & style", duration: "45–60 min", price: "UGX 150,000", category: "Hair", rating: 5.0, reviews: 12, discount: "10% off", image: "images/svc-womens-cut.jpg" },
  { name: "Braids & Twists", desc: "Knotless, goddess, or classic braids", duration: "3–6 hrs", price: "UGX 280,000", category: "Hair", rating: 5.0, reviews: 24, discount: "10% off", image: "images/cat-traditional.jpg" },
  { name: "Hair Styling", desc: "Event or everyday styling", duration: "60–90 min", price: "UGX 185,000", category: "Hair", rating: 5.0, reviews: 8, discount: "10% off", image: "images/svc-styling.jpg" },
  { name: "Blow-dry", desc: "Wash and professional blow-dry", duration: "45 min", price: "UGX 165,000", category: "Hair", rating: 4.8, reviews: 10, discount: null, image: "images/svc-blowdry.jpg" },
  { name: "Hair Coloring", desc: "Full color or root touch-up", duration: "90–120 min", price: "UGX 260,000", category: "Hair", rating: 5.0, reviews: 15, discount: "15% off", image: "images/svc-color.jpg" },
  { name: "Bridal / Soft Glam", desc: "Hair + soft glam finish", duration: "2–3 hrs", price: "UGX 380,000", category: "Glam", rating: 5.0, reviews: 11, discount: "10% off", image: "images/svc-bridal.jpg" },
  { name: "Deep Conditioning", desc: "Treatment mask & steam", duration: "40 min", price: "UGX 95,000", category: "Hair", rating: 4.8, reviews: 7, discount: "10% off", image: "images/svc-conditioning.jpg" },
];

const HERO_VIDEOS = [
  { src: "videos/hero-african-lashes.mp4", poster: "images/client-amina.jpg" },
  { src: "videos/hero-african-hair.mp4", poster: "images/client-grace.jpg" },
  { src: "videos/african-braid-weave.mp4", poster: "images/client-linda.jpg" },
  { src: "videos/african-creating-braids.mp4", poster: "images/cat-traditional.jpg" },
  { src: "videos/african-confident.mp4", poster: "images/client-amina.jpg" },
  { src: "videos/african-model-shoot.mp4", poster: "images/client-grace.jpg" },
];

const MOTION_CLIPS = [
  { title: "Facial glow", tag: "Facial", filter: "Facial", src: "videos/hero-african-hair.mp4", poster: "images/svc-facial.jpg" },
  { title: "Lash glam", tag: "Lashes", filter: "Lashes", src: "videos/hero-african-lashes.mp4", poster: "images/svc-lashes.jpg" },
  { title: "Nails & soft glam", tag: "Nails", filter: "Nails", src: "videos/african-model-shoot.mp4", poster: "images/svc-nails.jpg" },
];

const DEFAULT_STYLISTS = [
  {
    name: "Jessica McGee",
    avatar: "images/stylist-jessica.jpg",
    tags: ["Signature Facial", "Brow Shape & Tint"],
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "booked" }, { t: "10:00", state: "" }, { t: "11:00", state: "" },
      { t: "12:00", state: "" }, { t: "13:00", state: "booked" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
  {
    name: "Amina Nakato",
    avatar: "images/client-amina.jpg",
    tags: ["Gel Manicure", "Luxury Pedicure"],
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "" }, { t: "10:00", state: "booked" }, { t: "11:00", state: "booked" },
      { t: "12:00", state: "" }, { t: "13:00", state: "" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
  {
    name: "Angelina Haynes",
    avatar: "images/stylist-angelina.jpg",
    tags: ["Lash Extensions", "Soft Glam Makeup"],
    slots: [
      { t: "9:00", state: "" }, { t: "10:00", state: "" }, { t: "11:00", state: "booked" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "15:00", state: "" }, { t: "16:00", state: "" },
    ],
  },
  {
    name: "Jessie Rae",
    avatar: "images/stylist-jessie.jpg",
    tags: ["Braids & Twists", "Bridal / Soft Glam"],
    slots: [
      { t: "8:00", state: "booked" }, { t: "9:00", state: "booked" }, { t: "11:00", state: "" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "16:00", state: "" }, { t: "17:00", state: "" },
    ],
  },
];

const CATEGORIES = [
  { name: "Lash Studio", image: "images/cat-lashes.jpg", filter: "Lashes" },
  { name: "Nails Lounge", image: "images/cat-nails.jpg", filter: "Nails" },
  { name: "Facial Spa", image: "images/cat-facial.jpg", filter: "Facial" },
  { name: "Ladies Hair", image: "images/cat-traditional.jpg", filter: "Hair" },
  { name: "Soft Glam", image: "images/svc-bridal.jpg", filter: "Glam" },
];

let store = {
  appointments: [],
  clients: [],
  services: [],
  stylistsPage1: [],
  stylistsPage2: [],
  settingsState: { salonName: "DK Mobile Salon", address: "Kampala", onlineBooking: true },
  nextApptId: 100,
  invoiceSeq: 2042,
};

let selectedService = null;
let selectedStylist = null;
let selectedSlot = null;
let showAllOffers = false;
let catPage = 0;

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function fmtUgx(n) {
  return "UGX " + Number(n || 0).toLocaleString("en-UG");
}

function ensureDefaultServices() {
  const mapped = DEFAULT_SERVICES.map(({ name, desc, duration, price, category }) => ({ name, desc, duration, price, category }));
  if (!Array.isArray(store.services) || !store.services.length) {
    store.services = mapped;
    return true;
  }
  let changed = false;
  const before = store.services.length;
  store.services = store.services.filter((s) => !MEN_ONLY_SERVICES.has(s.name) && s.category !== "Grooming");
  if (store.services.length !== before) changed = true;
  mapped.forEach((svc) => {
    if (!store.services.some((s) => s.name === svc.name)) {
      store.services.unshift(svc);
      changed = true;
    }
  });
  return changed;
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      store.services = DEFAULT_SERVICES.map(({ name, desc, duration, price, category }) => ({ name, desc, duration, price, category }));
      store.stylistsPage1 = structuredClone(DEFAULT_STYLISTS.slice(0, 2));
      store.stylistsPage2 = structuredClone(DEFAULT_STYLISTS.slice(2));
      return;
    }
    const data = JSON.parse(raw);
    store = { ...store, ...data };
    if (!store.settingsState) store.settingsState = { salonName: "DK Mobile Salon", address: "Kampala", onlineBooking: true };
    if (!store.settingsState.salonName || /Hair\.|Ladies\. Kampala|Appoint Hub/i.test(store.settingsState.salonName)) {
      store.settingsState.salonName = "DK Mobile Salon";
    }
    const servicesChanged = ensureDefaultServices();
    if (!Array.isArray(store.stylistsPage1) || !store.stylistsPage1.length) {
      store.stylistsPage1 = structuredClone(DEFAULT_STYLISTS.slice(0, 2));
      store.stylistsPage2 = structuredClone(DEFAULT_STYLISTS.slice(2));
    }
    if (servicesChanged) saveStore();
  } catch (err) {
    console.warn(err);
  }
}

function saveStore() {
  try {
    const existing = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    const next = {
      ...existing,
      appointments: store.appointments,
      clients: store.clients,
      services: store.services,
      stylistsPage1: store.stylistsPage1,
      stylistsPage2: store.stylistsPage2,
      settingsState: store.settingsState || existing.settingsState,
      nextApptId: store.nextApptId,
      invoiceSeq: store.invoiceSeq,
      staff: existing.staff,
      payments: existing.payments,
      reviews: existing.reviews,
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch (err) {
    console.warn(err);
  }
}

function getAllStylists() {
  return [...(store.stylistsPage1 || []), ...(store.stylistsPage2 || [])];
}

function enrichServices() {
  return store.services.map((s) => {
    const meta = DEFAULT_SERVICES.find((d) => d.name === s.name) || {};
    return {
      ...s,
      rating: meta.rating || 4.8,
      reviews: meta.reviews || 6,
      discount: meta.discount || null,
      image: meta.image || "images/svc-womens-cut.jpg",
    };
  });
}

function renderCategories() {
  const track = document.getElementById("catTrack");
  track.innerHTML = CATEGORIES.map((c, i) => `
    <button type="button" class="cat-card" data-filter="${c.filter}" style="--d:${i * 0.08}s">
      <div class="cat-img"><img src="${c.image}" alt="${c.name}" loading="lazy" /></div>
      <strong>${c.name}</strong>
    </button>
  `).join("");
  track.querySelectorAll(".cat-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("filterCategory").value = btn.dataset.filter;
      renderOffers();
      document.getElementById("offerings").scrollIntoView({ behavior: "smooth" });
    });
  });
  document.getElementById("catPage").textContent = `${catPage + 1}/${CATEGORIES.length}`;
  observeMotionItems(track.querySelectorAll(".cat-card"));
}

function renderMotionClips() {
  const grid = document.getElementById("motionGrid");
  if (!grid) return;
  grid.innerHTML = MOTION_CLIPS.map((clip, i) => `
    <button type="button" class="motion-card" data-filter="${clip.filter}" style="--d:${i * 0.1}s">
      <div class="motion-media">
        <video muted loop playsinline preload="metadata" poster="${clip.poster}" data-src="${clip.src}"></video>
        <span class="motion-tag">${clip.tag}</span>
      </div>
      <strong>${clip.title}</strong>
    </button>
  `).join("");

  grid.querySelectorAll(".motion-card").forEach((card) => {
    const video = card.querySelector("video");
    card.addEventListener("mouseenter", () => {
      if (video && !video.src) {
        video.src = video.dataset.src;
        video.load();
      }
      video?.play().catch(() => {});
    });
    card.addEventListener("mouseleave", () => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
    card.addEventListener("click", () => {
      document.getElementById("filterCategory").value = card.dataset.filter;
      renderOffers();
      document.getElementById("offerings").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Autoload first clip for mobile / first paint
  const first = grid.querySelector("video");
  if (first) {
    first.src = first.dataset.src;
    first.load();
    first.play().catch(() => {});
  }
  observeMotionItems(grid.querySelectorAll(".motion-card"));
}

function initHeroVideos() {
  const a = document.getElementById("heroVideo");
  const b = document.getElementById("heroVideoB");
  if (!a || !b || !HERO_VIDEOS.length) return;
  let idx = 0;
  let showingA = true;

  const playCurrent = (el, item) => {
    el.muted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.loop = true;
    el.poster = item.poster;
    if (el.getAttribute("src") !== item.src) {
      el.src = item.src;
      el.load();
    }
    return el.play().catch(() => {});
  };

  playCurrent(a, HERO_VIDEOS[0]);

  const swap = () => {
    idx = (idx + 1) % HERO_VIDEOS.length;
    const next = HERO_VIDEOS[idx];
    const incoming = showingA ? b : a;
    const outgoing = showingA ? a : b;
    playCurrent(incoming, next).finally(() => {
      incoming.classList.add("is-active");
      outgoing.classList.remove("is-active");
      showingA = !showingA;
    });
  };

  setInterval(swap, 6500);
}

function renderServiceFilter() {
  const sel = document.getElementById("filterService");
  const current = sel.value || "all";
  sel.innerHTML = `<option value="all">All services</option>` +
    store.services.map((s) => `<option value="${s.name}">${s.name}</option>`).join("");
  sel.value = [...sel.options].some((o) => o.value === current) ? current : "all";
}

function renderOffers() {
  const cat = document.getElementById("filterCategory").value;
  const service = document.getElementById("filterService").value;
  let list = enrichServices();
  if (cat !== "all") list = list.filter((s) => s.category === cat);
  if (service !== "all") list = list.filter((s) => s.name === service);
  if (!showAllOffers) list = list.slice(0, 6);

  const salon = store.settingsState?.salonName || "DK Mobile Salon";
  const loc = store.settingsState?.address || "Kampala";
  document.getElementById("footerSalon").textContent = salon;
  document.getElementById("filterSalon").innerHTML = `<option value="${salon}">${salon}</option>`;

  document.getElementById("offerGrid").innerHTML = list.map((s, i) => `
    <article class="offer-card" data-service="${s.name}" style="--d:${(i % 6) * 0.07}s">
      <div class="offer-media">
        ${s.discount ? `<span class="offer-badge">${s.discount}</span>` : ""}
        <button type="button" class="offer-fav" aria-label="Save" data-fav="${s.name}">♡</button>
        <img src="${s.image}" alt="${s.name}" loading="lazy" />
        <span class="offer-logo">DK</span>
      </div>
      <div class="offer-body">
        <h3>${s.name}</h3>
        <div class="offer-cat">${s.category} · Hair salon</div>
        <div class="offer-loc">📍 ${loc}</div>
        <div class="offer-meta">
          <div class="stars">★★★★★ <span>${s.rating.toFixed(1)} (${s.reviews})</span></div>
          <div class="offer-price">from ${s.price}</div>
        </div>
      </div>
    </article>
  `).join("") || `<p style="opacity:.7">No services match your search.</p>`;

  document.querySelectorAll(".offer-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-fav]")) return;
      openBookModal(card.dataset.service);
    });
  });
  document.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("liked");
      btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
    });
  });
  observeMotionItems(document.querySelectorAll(".offer-card"));
}

function setBookStep(step) {
  document.getElementById("panelAvail").hidden = step !== 1;
  document.getElementById("panelDetails").hidden = step !== 2;
  document.getElementById("panelConfirm").hidden = step !== 3;
  document.querySelectorAll("[data-step-ind]").forEach((el) => {
    el.classList.toggle("active", Number(el.dataset.stepInd) === step);
  });
}

function openBookModal(serviceName, preset = {}) {
  if (store.settingsState?.onlineBooking === false) {
    toast("Online booking is disabled by the salon");
    return;
  }
  selectedService = store.services.find((s) => s.name === serviceName) || enrichServices().find((s) => s.name === serviceName);
  selectedStylist = preset.stylist || null;
  selectedSlot = preset.slot || null;
  document.getElementById("bookTitle").textContent = selectedService?.name || "Book service";
  document.getElementById("bookSub").textContent = store.settingsState?.salonName || "DK Mobile Salon";
  document.getElementById("bookForm").reset();
  document.getElementById("bookService").value = serviceName;
  document.getElementById("bookStylist").value = selectedStylist || "";
  document.getElementById("bookSlot").value = selectedSlot || "";
  document.getElementById("toDetailsBtn").disabled = !(selectedStylist && selectedSlot);

  if (!selectedStylist) {
    const stylists = getAllStylists();
    const preferred = stylists.find((s) => openSlots(s).length) || stylists[0];
    selectedStylist = preferred?.name || null;
  }
  renderBookStylists();
  renderBookSlots(!preset.slot);
  setBookStep(1);
  document.getElementById("bookModal").hidden = false;
}

function openSlots(stylist) {
  return (stylist.slots || []).filter((s) => s.state !== "booked");
}

function renderBookStylists() {
  const root = document.getElementById("bookStylists");
  root.innerHTML = getAllStylists().map((s) => `
    <button type="button" class="stylist-btn ${s.name === selectedStylist ? "active" : ""}" data-stylist="${s.name}">
      <img src="${s.avatar}" alt="" />
      <div>
        <strong>${s.name}</strong>
        <span>${openSlots(s).length} open · ${(s.tags || []).join(" · ")}</span>
      </div>
    </button>
  `).join("");
  root.querySelectorAll(".stylist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedStylist = btn.dataset.stylist;
      selectedSlot = null;
      document.getElementById("bookStylist").value = selectedStylist;
      document.getElementById("bookSlot").value = "";
      document.getElementById("toDetailsBtn").disabled = true;
      renderBookStylists();
      renderBookSlots(true);
    });
  });
  if (selectedStylist) document.getElementById("bookStylist").value = selectedStylist;
}

function renderBookSlots(autoSelect) {
  const stylist = getAllStylists().find((s) => s.name === selectedStylist);
  const root = document.getElementById("bookSlots");
  const hint = document.getElementById("slotHint");
  if (!stylist) {
    root.innerHTML = `<div style="grid-column:1/-1;color:#888">Select a stylist</div>`;
    return;
  }
  const opens = openSlots(stylist);
  if (hint) hint.textContent = `${opens.length} free time${opens.length === 1 ? "" : "s"}`;
  if (autoSelect && opens[0] && !selectedSlot) {
    selectedSlot = opens[0].t;
    document.getElementById("bookSlot").value = selectedSlot;
  }
  document.getElementById("toDetailsBtn").disabled = !(selectedStylist && selectedSlot);
  root.innerHTML = (stylist.slots || []).map((slot) => `
    <button type="button" class="slot-btn ${slot.t === selectedSlot ? "active" : ""}" data-slot="${slot.t}" ${slot.state === "booked" ? "disabled" : ""}>${slot.t}</button>
  `).join("");
  root.querySelectorAll(".slot-btn:not(:disabled)").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSlot = btn.dataset.slot;
      document.getElementById("bookSlot").value = selectedSlot;
      document.getElementById("toDetailsBtn").disabled = false;
      renderBookSlots(false);
    });
  });
}

function markSlotBooked(stylistName, time) {
  getAllStylists().forEach((s) => {
    if (s.name !== stylistName) return;
    const slot = (s.slots || []).find((x) => x.t === time);
    if (slot) slot.state = "booked";
  });
}

function upsertClient({ name, phone, email, price }) {
  if (!Array.isArray(store.clients)) store.clients = [];
  let client = store.clients.find((c) => c.name.toLowerCase() === name.toLowerCase() || c.phone === phone);
  const priceNum = Number(String(price || "0").replace(/[^\d]/g, "")) || 0;
  if (client) {
    client.phone = phone;
    client.email = email;
    client.visits = (client.visits || 0) + 1;
    client.last = "Today";
    const prev = Number(String(client.spent || "0").replace(/[^\d]/g, "")) || 0;
    client.spent = fmtUgx(prev + priceNum);
    return client;
  }
  client = {
    name,
    avatar: avatarForName(name),
    phone,
    email,
    visits: 1,
    last: "Today",
    spent: fmtUgx(priceNum),
    source: "booking",
  };
  store.clients.unshift(client);
  return client;
}

function submitBooking(e) {
  e.preventDefault();
  const name = document.getElementById("bookName").value.trim();
  const phone = document.getElementById("bookPhone").value.trim();
  const email = document.getElementById("bookEmail").value.trim();
  const serviceName = document.getElementById("bookService").value;
  const stylistName = document.getElementById("bookStylist").value || selectedStylist;
  const slotTime = document.getElementById("bookSlot").value || selectedSlot;
  if (!name || !phone || !email || !serviceName || !stylistName || !slotTime) {
    toast("Fill your details and pick a stylist + slot");
    return;
  }

  if (!Array.isArray(store.appointments)) store.appointments = [];
  const service = store.services.find((s) => s.name === serviceName) || selectedService;
  const price = service?.price || "UGX 150,000";
  const client = upsertClient({ name, phone, email, price });
  const endHour = Number(slotTime.split(":")[0]) + 1;
  const end = `${String(endHour).padStart(2, "0")}:00`;
  if (!store.nextApptId) store.nextApptId = 100;

  store.appointments.unshift({
    id: store.nextApptId++,
    time: `${slotTime} – ${end}`,
    client: client.name,
    avatar: client.avatar,
    service: serviceName,
    master: stylistName,
    price,
    status: "confirmed",
    statusLabel: "Booked",
    day: 0,
    source: "client-web",
  });
  markSlotBooked(stylistName, slotTime);
  saveStore();
  document.getElementById("bookModal").hidden = true;
  burstSparks();
  toast(`Confirmed · ${serviceName} with ${stylistName} at ${slotTime}`);
  renderSlotTicker();
  updateFloatDock();
}

function fillAvailSummary() {
  const service = document.getElementById("bookService").value;
  const stylist = selectedStylist;
  const slot = selectedSlot;
  document.getElementById("availSummary").textContent =
    `${service} · ${stylist} · ${slot} (available)`;
}

function fillConfirmBox() {
  const name = document.getElementById("bookName").value.trim();
  const phone = document.getElementById("bookPhone").value.trim();
  const email = document.getElementById("bookEmail").value.trim();
  const service = document.getElementById("bookService").value;
  const price = (store.services.find((s) => s.name === service) || selectedService)?.price || "";
  document.getElementById("confirmBox").innerHTML = `
    <h3>Confirm this availability</h3>
    <p><strong>${service}</strong> with <strong>${selectedStylist}</strong></p>
    <p>Time: <strong>${selectedSlot}</strong> · ${price}</p>
    <p>${name} · ${phone} · ${email}</p>
    <p>Tap confirm to lock this open slot as <strong>Booked</strong>.</p>
  `;
}

let motionObserver = null;

function observeMotionItems(nodes) {
  if (!motionObserver) {
    motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          motionObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }
  nodes.forEach((el) => motionObserver.observe(el));
}

function initReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

const LOOK_STORIES = [
  { name: "Facial glow", desc: "Cleanse, mask, and soft-skin radiance.", service: "Signature Facial", image: "images/svc-facial.jpg" },
  { name: "Lash lift", desc: "Feather-light lift for everyday queen energy.", service: "Lash Lift & Tint", image: "images/svc-lash-lift.jpg" },
  { name: "Hybrid lashes", desc: "Soft drama that still feels natural.", service: "Lash Extensions", image: "images/svc-lashes.jpg" },
  { name: "Gel tips", desc: "Clean glossy nails made for Kampala nights.", service: "Gel Manicure", image: "images/svc-nails.jpg" },
  { name: "Soft glam makeup", desc: "Camera-ready face for dates and events.", service: "Soft Glam Makeup", image: "images/svc-makeup.jpg" },
  { name: "Brow tint", desc: "Shaped and tinted brows that frame the face.", service: "Brow Shape & Tint", image: "images/svc-brows.jpg" },
  { name: "Knotless braids", desc: "Protective style with soft glam edges.", service: "Braids & Twists", image: "images/cat-traditional.jpg" },
  { name: "Bridal soft glam", desc: "Hair + face finish for your big moment.", service: "Bridal / Soft Glam", image: "images/svc-bridal.jpg" },
];

const NAIL_SHADES = [
  { name: "Nude glow", color: "#c4a484", service: "Gel Manicure", hint: "Soft everyday glam — pairs with Gel Manicure." },
  { name: "Espresso", color: "#4a2f27", service: "Acrylic / Soft Gel Set", hint: "Deep chic — perfect with Acrylic / Soft Gel." },
  { name: "Rouge kiss", color: "#a83b45", service: "Gel Manicure", hint: "Bold lips energy on your tips." },
  { name: "Gold dust", color: "#c9a45a", service: "Acrylic / Soft Gel Set", hint: "Warm metallic for nights out." },
  { name: "Milk tea", color: "#e8d5c4", service: "Gel Manicure", hint: "Quiet luxury shade for meetings." },
  { name: "Plum velvet", color: "#6b3a55", service: "Luxury Pedicure", hint: "Rich pedicure energy for weekends." },
];

const QUEEN_LOOKS = [
  { title: "Amina’s soft glam energy", text: "Lifted lashes and clean gel tips. Steal the look in one booking.", image: "images/client-amina.jpg", service: "Lash Extensions" },
  { title: "Grace’s facial glow", text: "Signature facial for glass-skin radiance before soft glam.", image: "images/client-grace.jpg", service: "Signature Facial" },
  { title: "Linda’s nail muse mood", text: "Glossy gel set and a polished finish for every plan.", image: "images/client-linda.jpg", service: "Gel Manicure" },
  { title: "Jessie’s bridal glow", text: "Soft glam makeup and hair for the main character day.", image: "images/stylist-jessie.jpg", service: "Soft Glam Makeup" },
];

let activeStoryService = LOOK_STORIES[0].service;
let activeShadeService = NAIL_SHADES[0].service;
let queenIndex = 0;
let storyTimer = null;

function setDayGreeting() {
  const hour = new Date().getHours();
  const el = document.getElementById("dayGreeting");
  if (!el) return;
  const part = hour < 12 ? "Good morning, queen" : hour < 17 ? "Good afternoon, queen" : "Good evening, queen";
  el.textContent = `${part} · Ladies only · Kampala`;
}

function renderSlotTicker() {
  const track = document.getElementById("slotTicker");
  if (!track) return;
  const bits = [];
  getAllStylists().forEach((s) => {
    openSlots(s).slice(0, 3).forEach((slot) => {
      bits.push(`<span><em>${slot.t}</em> open with ${s.name}</span>`);
    });
  });
  if (!bits.length) bits.push("<span>All vibes booking fast — check services</span>");
  const row = bits.join("") + bits.join("");
  track.innerHTML = row;
}

function renderStories() {
  const row = document.getElementById("storiesRow");
  if (!row) return;
  row.innerHTML = LOOK_STORIES.map((s, i) => `
    <button type="button" class="story-bubble" data-story="${i}">
      <div class="story-ring"><img src="${s.image}" alt="" /></div>
      <strong>${s.name}</strong>
    </button>
  `).join("");
  row.querySelectorAll("[data-story]").forEach((btn) => {
    btn.addEventListener("click", () => openStory(Number(btn.dataset.story)));
  });
}

function openStory(index) {
  const story = LOOK_STORIES[index];
  if (!story) return;
  activeStoryService = story.service;
  document.getElementById("storyImage").src = story.image;
  document.getElementById("storyName").textContent = story.name;
  document.getElementById("storyDesc").textContent = story.desc;
  const progress = document.getElementById("storyProgress");
  progress.style.animation = "none";
  void progress.offsetWidth;
  progress.style.animation = "";
  document.getElementById("storyModal").hidden = false;
  clearTimeout(storyTimer);
  storyTimer = setTimeout(() => {
    document.getElementById("storyModal").hidden = true;
  }, 4500);
}

function renderShadeLab() {
  const root = document.getElementById("shadeSwatches");
  if (!root) return;
  root.innerHTML = NAIL_SHADES.map((s, i) => `
    <button type="button" class="shade-dot ${i === 0 ? "active" : ""}" data-shade="${i}" style="background:${s.color}" aria-label="${s.name}"></button>
  `).join("");
  const apply = (shade) => {
    activeShadeService = shade.service;
    document.getElementById("shadeHand").style.setProperty("--shade", shade.color);
    document.getElementById("shadeName").textContent = shade.name;
    document.getElementById("shadeHint").textContent = shade.hint;
  };
  apply(NAIL_SHADES[0]);
  root.querySelectorAll("[data-shade]").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".shade-dot").forEach((d) => d.classList.remove("active"));
      btn.classList.add("active");
      apply(NAIL_SHADES[Number(btn.dataset.shade)]);
    });
  });
}

function renderQueen(index = 0) {
  queenIndex = (index + QUEEN_LOOKS.length) % QUEEN_LOOKS.length;
  const q = QUEEN_LOOKS[queenIndex];
  document.getElementById("queenImg").src = q.image;
  document.getElementById("queenTitle").textContent = q.title;
  document.getElementById("queenText").textContent = q.text;
}

function nextOpenBooking() {
  const stylists = getAllStylists();
  for (const s of stylists) {
    const open = openSlots(s)[0];
    if (open) {
      const service = (s.tags && s.tags[0]) || enrichServices()[0]?.name;
      return { stylist: s.name, slot: open.t, service };
    }
  }
  return { stylist: null, slot: null, service: enrichServices()[0]?.name };
}

function updateFloatDock() {
  const next = nextOpenBooking();
  const meta = document.getElementById("dockMeta");
  const title = document.getElementById("dockTitle");
  if (!meta || !title) return;
  if (next.slot) {
    title.textContent = "Next open vibe";
    meta.textContent = `${next.slot} · ${next.stylist} · ${next.service}`;
  } else {
    title.textContent = "Browse glam";
    meta.textContent = "Pick a service and lock your time";
  }
}

function setVibe(vibe) {
  document.querySelectorAll(".vibe-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.vibe === vibe || (vibe === "all" && chip.dataset.vibe === "all"));
  });
  const cat = document.getElementById("filterCategory");
  cat.value = vibe === "all" ? "all" : vibe;
  renderServiceFilter();
  renderOffers();
  document.getElementById("offerings").scrollIntoView({ behavior: "smooth" });
}

function surpriseMe() {
  const list = enrichServices();
  if (!list.length) return;
  const pick = list[Math.floor(Math.random() * list.length)];
  toast(`Surprise vibe · ${pick.name}`);
  openBookModal(pick.name);
}

function enableCardTilt() {
  document.querySelectorAll(".offer-card").forEach((card) => {
    card.classList.add("tilt");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function burstSparks() {
  const canvas = document.getElementById("sparkCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const parts = Array.from({ length: 48 }, () => ({
    x: window.innerWidth / 2,
    y: window.innerHeight * 0.4,
    vx: (Math.random() - 0.5) * 10,
    vy: Math.random() * -8 - 2,
    life: 1,
    color: ["#f0c3a0", "#e8894a", "#fff", "#c9a45"][Math.floor(Math.random() * 4)],
  }));
  let frame = 0;
  const tick = () => {
    frame += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    parts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.life -= 0.018;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    });
    if (frame < 70) requestAnimationFrame(tick);
    else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = 1;
    }
  };
  tick();
}

/* Init */
loadStore();
renderCategories();
renderMotionClips();
renderServiceFilter();
renderOffers();
enableCardTilt();
initHeroVideos();
setDayGreeting();
renderSlotTicker();
renderStories();
renderShadeLab();
renderQueen(0);
updateFloatDock();
requestAnimationFrame(() => {
  document.body.classList.add("page-enter");
  initReveals();
  setTimeout(() => document.getElementById("floatDock")?.classList.add("show"), 900);
});

const footerYear = document.getElementById("footerYear");
if (footerYear) footerYear.textContent = String(new Date().getFullYear());

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  renderOffers();
  document.getElementById("offerings").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("filterCategory").addEventListener("change", () => {
  renderServiceFilter();
  renderOffers();
});
document.getElementById("filterService").addEventListener("change", renderOffers);
document.getElementById("viewAllBtn").addEventListener("click", () => {
  showAllOffers = !showAllOffers;
  document.getElementById("viewAllBtn").textContent = showAllOffers ? "Show less" : "View all";
  renderOffers();
  enableCardTilt();
});
document.getElementById("catPrev").addEventListener("click", () => {
  const track = document.getElementById("catTrack");
  track.scrollBy({ left: -260, behavior: "smooth" });
  catPage = Math.max(0, catPage - 1);
  document.getElementById("catPage").textContent = `${catPage + 1}/${CATEGORIES.length}`;
});
document.getElementById("catNext").addEventListener("click", () => {
  const track = document.getElementById("catTrack");
  track.scrollBy({ left: 260, behavior: "smooth" });
  catPage = Math.min(CATEGORIES.length - 1, catPage + 1);
  document.getElementById("catPage").textContent = `${catPage + 1}/${CATEGORIES.length}`;
});
document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});
document.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", () => {
    document.getElementById("bookModal").hidden = true;
  });
});
document.getElementById("toDetailsBtn").addEventListener("click", () => {
  if (!selectedStylist || !selectedSlot) return;
  fillAvailSummary();
  setBookStep(2);
  document.getElementById("bookName").focus();
});
document.getElementById("backAvailBtn").addEventListener("click", () => setBookStep(1));
document.getElementById("toConfirmBtn").addEventListener("click", () => {
  const name = document.getElementById("bookName").value.trim();
  const phone = document.getElementById("bookPhone").value.trim();
  const email = document.getElementById("bookEmail").value.trim();
  if (!name || !phone || !email) {
    toast("Enter your name, phone, and email");
    return;
  }
  fillConfirmBox();
  setBookStep(3);
});
document.getElementById("backDetailsBtn").addEventListener("click", () => setBookStep(2));
document.getElementById("bookForm").addEventListener("submit", submitBooking);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("bookModal").hidden = true;
    document.getElementById("storyModal").hidden = true;
  }
});

document.querySelectorAll(".vibe-chip[data-vibe]").forEach((chip) => {
  chip.addEventListener("click", () => setVibe(chip.dataset.vibe));
});
document.getElementById("surpriseBtn")?.addEventListener("click", surpriseMe);
document.getElementById("shadeBookBtn")?.addEventListener("click", () => openBookModal(activeShadeService));
document.getElementById("storyBookBtn")?.addEventListener("click", () => {
  document.getElementById("storyModal").hidden = true;
  openBookModal(activeStoryService);
});
document.querySelectorAll("[data-story-close]").forEach((el) => {
  el.addEventListener("click", () => {
    clearTimeout(storyTimer);
    document.getElementById("storyModal").hidden = true;
  });
});
document.getElementById("queenBookBtn")?.addEventListener("click", () => openBookModal(QUEEN_LOOKS[queenIndex].service));
document.getElementById("queenShuffleBtn")?.addEventListener("click", () => {
  renderQueen(queenIndex + 1);
  toast("New muse unlocked");
});
document.getElementById("dockBookBtn")?.addEventListener("click", () => {
  const next = nextOpenBooking();
  if (next.service) openBookModal(next.service, { stylist: next.stylist, slot: next.slot });
});

const originalRenderOffers = renderOffers;
renderOffers = function patchedRenderOffers() {
  originalRenderOffers();
  enableCardTilt();
};
