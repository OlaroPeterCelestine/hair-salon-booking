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

const DEFAULT_SERVICES = [
  { name: "Women's Haircut", desc: "Consultation, wash, cut & style", duration: "45–60 min", price: "UGX 150,000", category: "Cuts", rating: 5.0, reviews: 12, discount: "10% off", image: "images/svc-womens-cut.jpg" },
  { name: "Men's Haircut", desc: "Precision cut with finish", duration: "30–45 min", price: "UGX 120,000", category: "Cuts", rating: 4.9, reviews: 18, discount: null, image: "images/svc-mens-cut.jpg" },
  { name: "Hair Styling", desc: "Event or everyday styling", duration: "60–90 min", price: "UGX 185,000", category: "Styling", rating: 5.0, reviews: 8, discount: "10% off", image: "images/svc-styling.jpg" },
  { name: "Blow-dry", desc: "Wash and professional blow-dry", duration: "45 min", price: "UGX 165,000", category: "Styling", rating: 4.8, reviews: 10, discount: null, image: "images/svc-blowdry.jpg" },
  { name: "Hair Coloring", desc: "Full color or root touch-up", duration: "90–120 min", price: "UGX 260,000", category: "Color", rating: 5.0, reviews: 15, discount: "15% off", image: "images/svc-color.jpg" },
  { name: "Highlights / Balayage", desc: "Custom lightening technique", duration: "2–3 hrs", price: "UGX 330,000", category: "Color", rating: 4.9, reviews: 9, discount: null, image: "images/svc-balayage.jpg" },
  { name: "Beard Trim", desc: "Shape and tidy beard", duration: "20 min", price: "UGX 80,000", category: "Grooming", rating: 4.7, reviews: 11, discount: null, image: "images/svc-beard.jpg" },
  { name: "Deep Conditioning", desc: "Treatment mask & steam", duration: "40 min", price: "UGX 95,000", category: "Care", rating: 4.8, reviews: 7, discount: "10% off", image: "images/svc-conditioning.jpg" },
];

const DEFAULT_STYLISTS = [
  {
    name: "Jessica McGee",
    avatar: "images/stylist-jessica.jpg",
    tags: ["Women's Haircut", "Hair Coloring"],
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "booked" }, { t: "10:00", state: "" }, { t: "11:00", state: "" },
      { t: "12:00", state: "" }, { t: "13:00", state: "booked" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
  {
    name: "Maximillian Neal",
    avatar: "images/stylist-max.jpg",
    tags: ["Men's Haircut", "Beard Trim"],
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "" }, { t: "10:00", state: "booked" }, { t: "11:00", state: "booked" },
      { t: "12:00", state: "" }, { t: "13:00", state: "" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
  {
    name: "Angelina Haynes",
    avatar: "images/stylist-angelina.jpg",
    tags: ["Hair Coloring", "Blow-dry"],
    slots: [
      { t: "9:00", state: "" }, { t: "10:00", state: "" }, { t: "11:00", state: "booked" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "15:00", state: "" }, { t: "16:00", state: "" },
    ],
  },
  {
    name: "Jessie Rae",
    avatar: "images/stylist-jessie.jpg",
    tags: ["Hair Styling", "Blow-dry"],
    slots: [
      { t: "8:00", state: "booked" }, { t: "9:00", state: "booked" }, { t: "11:00", state: "" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "16:00", state: "" }, { t: "17:00", state: "" },
    ],
  },
];

const CATEGORIES = [
  { name: "Traditional Hair Salons", image: "images/cat-traditional.jpg", filter: "Cuts" },
  { name: "Barber Shop", image: "images/cat-barber.jpg", filter: "Grooming" },
  { name: "Spa Salon", image: "images/cat-spa.jpg", filter: "Care" },
  { name: "Luxury Salon", image: "images/cat-luxury.jpg", filter: "Color" },
];

let store = {
  appointments: [],
  clients: [],
  services: [],
  stylistsPage1: [],
  stylistsPage2: [],
  settingsState: { salonName: "Hair. Kampala", address: "Kampala", onlineBooking: true },
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
    if (!Array.isArray(store.services) || !store.services.length) {
      store.services = DEFAULT_SERVICES.map(({ name, desc, duration, price, category }) => ({ name, desc, duration, price, category }));
    }
    if (!Array.isArray(store.stylistsPage1) || !store.stylistsPage1.length) {
      store.stylistsPage1 = structuredClone(DEFAULT_STYLISTS.slice(0, 2));
      store.stylistsPage2 = structuredClone(DEFAULT_STYLISTS.slice(2));
    }
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
  track.innerHTML = CATEGORIES.map((c) => `
    <button type="button" class="cat-card" data-filter="${c.filter}">
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

  const salon = store.settingsState?.salonName || "Hair. Kampala";
  const loc = store.settingsState?.address || "Kampala";
  document.getElementById("footerSalon").textContent = salon;
  document.getElementById("filterSalon").innerHTML = `<option value="${salon}">${salon}</option>`;

  document.getElementById("offerGrid").innerHTML = list.map((s) => `
    <article class="offer-card" data-service="${s.name}">
      <div class="offer-media">
        ${s.discount ? `<span class="offer-badge">${s.discount}</span>` : ""}
        <button type="button" class="offer-fav" aria-label="Save" data-fav="${s.name}">♡</button>
        <img src="${s.image}" alt="${s.name}" loading="lazy" />
        <span class="offer-logo">H</span>
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
      btn.textContent = btn.textContent === "♡" ? "♥" : "♡";
    });
  });
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
  document.getElementById("bookSub").textContent = store.settingsState?.salonName || "Hair. Kampala";
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
  toast(`Confirmed · ${serviceName} with ${stylistName} at ${slotTime}`);
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

/* Init */
loadStore();
renderCategories();
renderServiceFilter();
renderOffers();

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
  if (e.key === "Escape") document.getElementById("bookModal").hidden = true;
});
