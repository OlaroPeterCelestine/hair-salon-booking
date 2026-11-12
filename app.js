/* ——— Data (seed; overwritten from localStorage when present) ——— */
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

const STYLIST_AVATARS = {
  "Jessica McGee": "images/stylist-jessica.jpg",
  "Maximillian Neal": "images/stylist-max.jpg",
  "Angelina Haynes": "images/stylist-angelina.jpg",
  "Jessie Rae": "images/stylist-jessie.jpg",
};

function isRemoteAvatar(url) {
  return !url || String(url).includes("pravatar.cc") || String(url).startsWith("http");
}

function localizeAvatar(url, name) {
  if (name && STYLIST_AVATARS[name]) return STYLIST_AVATARS[name];
  if (isRemoteAvatar(url)) return avatarForName(name || "guest");
  return url;
}

function migrateAvatars() {
  let changed = false;
  const patch = (list, nameKey = "name") => {
    list.forEach((item) => {
      const name = item[nameKey] || item.client || item.name;
      if (isRemoteAvatar(item.avatar)) {
        item.avatar = localizeAvatar(item.avatar, name);
        changed = true;
      }
    });
  };
  patch(appointments, "client");
  patch(staff);
  patch(payments, "client");
  patch(clients);
  patch(reviews);
  patch(stylistsPage1);
  patch(stylistsPage2);
  return changed;
}

let appointments = [
  { id: 1, time: "9:00 – 10:30", client: "Mae Jones", avatar: "images/client-mae.jpg", service: "Hair Styling", master: "Jessie Rae", price: "UGX 185,000", status: "in-progress", statusLabel: "In Progress", day: 0 },
  { id: 2, time: "11:00 – 12:00", client: "Kara Thornton", avatar: "images/client-kara.jpg", service: "Haircut", master: "Maximillian Neal", price: "UGX 165,000", status: "arrived", statusLabel: "Arrived", day: 0 },
  { id: 3, time: "12:45 – 13:45", client: "Curtis Walters", avatar: "images/client-curtis.jpg", service: "Hair Coloring", master: "Angelina Haynes", price: "UGX 260,000", status: "confirmed", statusLabel: "Confirmed", day: 0 },
  { id: 4, time: "14:00 – 15:45", client: "Alejandra Casey", avatar: "images/client-alejandra.jpg", service: "Blow-dry", master: "Jessie Rae", price: "UGX 165,000", status: "past", statusLabel: "Past", day: 0 },
  { id: 5, time: "14:00 – 15:45", client: "Leyton Landry", avatar: "images/client-leyton.jpg", service: "Hair Coloring", master: "Maximillian Neal", price: "UGX 330,000", status: "past", statusLabel: "Past", day: 0 },
  { id: 6, time: "10:00 – 11:00", client: "Molly Hawkins", avatar: "images/client-molly.jpg", service: "Women's Haircut", master: "Jessica McGee", price: "UGX 150,000", status: "confirmed", statusLabel: "Confirmed", day: 1 },
  { id: 7, time: "13:00 – 14:30", client: "Devon Price", avatar: "images/client-devon.jpg", service: "Beard Trim", master: "Maximillian Neal", price: "UGX 80,000", status: "confirmed", statusLabel: "Confirmed", day: 1 },
  { id: 8, time: "9:30 – 11:00", client: "Sienna Brooks", avatar: "images/client-sienna.jpg", service: "Hair Coloring", master: "Angelina Haynes", price: "UGX 260,000", status: "confirmed", statusLabel: "Confirmed", day: 2 },
  { id: 9, time: "15:00 – 16:00", client: "Noah Okello", avatar: "images/client-noah.jpg", service: "Men's Haircut", master: "Maximillian Neal", price: "UGX 120,000", status: "confirmed", statusLabel: "Confirmed", day: 3 },
  { id: 10, time: "11:30 – 12:30", client: "Amina Nalwoga", avatar: "images/client-amina.jpg", service: "Blow-dry", master: "Jessie Rae", price: "UGX 165,000", status: "confirmed", statusLabel: "Confirmed", day: 4 },
];

const weekDays = [
  { dow: "Mon", dom: "22", label: "Monday, 22 Jan" },
  { dow: "Tue", dom: "23", label: "Tuesday, 23 Jan" },
  { dow: "Wed", dom: "24", label: "Wednesday, 24 Jan" },
  { dow: "Thu", dom: "25", label: "Thursday, 25 Jan" },
  { dow: "Fri", dom: "26", label: "Friday, 26 Jan" },
  { dow: "Sat", dom: "27", label: "Saturday, 27 Jan" },
  { dow: "Sun", dom: "28", label: "Sunday, 28 Jan" },
];

let stylistsPage1 = [
  {
    name: "Jessica McGee",
    avatar: "images/stylist-jessica.jpg",
    tags: ["Women's Haircut", "Hair Coloring"],
    date: "Mon, 22 Jan",
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "booked" }, { t: "10:00", state: "" }, { t: "11:00", state: "" },
      { t: "12:00", state: "" }, { t: "13:00", state: "booked" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
  {
    name: "Maximillian Neal",
    avatar: "images/stylist-max.jpg",
    tags: ["Men's Haircut", "Beard Trim"],
    date: "Mon, 22 Jan",
    slots: [
      { t: "8:00", state: "" }, { t: "9:00", state: "" }, { t: "10:00", state: "booked" }, { t: "11:00", state: "booked" },
      { t: "12:00", state: "" }, { t: "13:00", state: "" }, { t: "14:00", state: "" }, { t: "15:00", state: "" },
    ],
  },
];

let stylistsPage2 = [
  {
    name: "Angelina Haynes",
    avatar: "images/stylist-angelina.jpg",
    tags: ["Hair Coloring", "Blow-dry"],
    date: "Mon, 22 Jan",
    slots: [
      { t: "9:00", state: "" }, { t: "10:00", state: "" }, { t: "11:00", state: "booked" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "15:00", state: "" }, { t: "16:00", state: "" },
    ],
  },
  {
    name: "Jessie Rae",
    avatar: "images/stylist-jessie.jpg",
    tags: ["Hair Styling", "Blow-dry"],
    date: "Mon, 22 Jan",
    slots: [
      { t: "8:00", state: "booked" }, { t: "9:00", state: "booked" }, { t: "11:00", state: "" }, { t: "12:00", state: "" },
      { t: "13:00", state: "" }, { t: "14:00", state: "booked" }, { t: "16:00", state: "" }, { t: "17:00", state: "" },
    ],
  },
];

const SHIFT_DAYS = [
  { key: "mon", label: "Mon", short: "M" },
  { key: "tue", label: "Tue", short: "T" },
  { key: "wed", label: "Wed", short: "W" },
  { key: "thu", label: "Thu", short: "T" },
  { key: "fri", label: "Fri", short: "F" },
  { key: "sat", label: "Sat", short: "S" },
  { key: "sun", label: "Sun", short: "S" },
];

const SHIFT_PRESETS = {
  off: { label: "Off", hours: "—", cls: "shift-off" },
  morning: { label: "Morning", hours: "8:00–14:00", cls: "shift-morning" },
  afternoon: { label: "Afternoon", hours: "12:00–18:00", cls: "shift-afternoon" },
  full: { label: "Full day", hours: "8:00–18:00", cls: "shift-full" },
};

function defaultShifts(pattern = "weekday-full") {
  const shifts = {};
  SHIFT_DAYS.forEach((d, i) => {
    if (pattern === "weekday-full") shifts[d.key] = i < 5 ? "full" : "off";
    else if (pattern === "weekend") shifts[d.key] = i >= 5 ? "full" : i < 3 ? "morning" : "off";
    else if (pattern === "afternoon") shifts[d.key] = i < 6 ? "afternoon" : "off";
    else shifts[d.key] = "off";
  });
  return shifts;
}

function ensureStaffShifts() {
  let changed = false;
  staff.forEach((s) => {
    if (!s.shifts || typeof s.shifts !== "object") {
      s.shifts = defaultShifts(s.status === "vacation" ? "off" : "weekday-full");
      changed = true;
    }
    SHIFT_DAYS.forEach((d) => {
      if (!SHIFT_PRESETS[s.shifts[d.key]]) {
        s.shifts[d.key] = "off";
        changed = true;
      }
    });
  });
  return changed;
}

function todayShiftKey() {
  return SHIFT_DAYS[(new Date().getDay() + 6) % 7].key; // JS Sun=0 → our mon-first
}

function shiftInfo(code) {
  return SHIFT_PRESETS[code] || SHIFT_PRESETS.off;
}

let staff = [
  { name: "Maximillian Neal", avatar: "images/stylist-max.jpg", status: "active", label: "Active", role: "Senior Stylist", phone: "+256 700 111 222", email: "max@hair.ug", specialty: "Men's cuts & beard", shifts: { mon: "full", tue: "full", wed: "full", thu: "full", fri: "full", sat: "morning", sun: "off" } },
  { name: "Angelina Haynes", avatar: "images/stylist-angelina.jpg", status: "off", label: "Off duty", role: "Color Specialist", phone: "+256 700 333 444", email: "angelina@hair.ug", specialty: "Color & highlights", shifts: { mon: "afternoon", tue: "afternoon", wed: "off", thu: "afternoon", fri: "afternoon", sat: "full", sun: "off" } },
  { name: "Jessica McGee", avatar: "images/stylist-jessica.jpg", status: "vacation", label: "On vacation", role: "Stylist", phone: "+256 700 555 666", email: "jessica@hair.ug", specialty: "Women's cuts", shifts: defaultShifts("off") },
  { name: "Jessie Rae", avatar: "images/stylist-jessie.jpg", status: "active", label: "Active", role: "Creative Director", phone: "+256 700 777 888", email: "jessie@hair.ug", specialty: "Styling & blow-dry", shifts: { mon: "full", tue: "full", wed: "morning", thu: "full", fri: "full", sat: "off", sun: "off" } },
];

let shiftEditIdx = null;

let payments = [
  { id: "INV-2041", client: "Mae Jones", avatar: "images/client-mae.jpg", service: "Hair Styling", amount: "UGX 185,000", method: "Mobile Money", date: "22 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2040", client: "Kara Thornton", avatar: "images/client-kara.jpg", service: "Haircut", amount: "UGX 165,000", method: "Cash", date: "22 Jan 2026", status: "pending", statusLabel: "Pending" },
  { id: "INV-2039", client: "Curtis Walters", avatar: "images/client-curtis.jpg", service: "Hair Coloring", amount: "UGX 260,000", method: "Card", date: "21 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2038", client: "Alejandra Casey", avatar: "images/client-alejandra.jpg", service: "Blow-dry", amount: "UGX 165,000", method: "Mobile Money", date: "21 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2037", client: "Leyton Landry", avatar: "images/client-leyton.jpg", service: "Hair Coloring", amount: "UGX 330,000", method: "Card", date: "20 Jan 2026", status: "refunded", statusLabel: "Refunded" },
  { id: "INV-2036", client: "Molly Hawkins", avatar: "images/client-molly.jpg", service: "Hair Coloring", amount: "UGX 260,000", method: "Mobile Money", date: "18 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2035", client: "Devon Price", avatar: "images/client-devon.jpg", service: "Men's Haircut", amount: "UGX 120,000", method: "Cash", date: "16 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2034", client: "Amina Nalwoga", avatar: "images/client-amina.jpg", service: "Blow-dry", amount: "UGX 165,000", method: "Mobile Money", date: "15 Jan 2026", status: "pending", statusLabel: "Pending" },
  { id: "INV-2033", client: "Sienna Brooks", avatar: "images/client-sienna.jpg", service: "Hair Styling", amount: "UGX 185,000", method: "Card", date: "14 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2032", client: "Noah Okello", avatar: "images/client-noah.jpg", service: "Men's Haircut", amount: "UGX 120,000", method: "Cash", date: "12 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2031", client: "Mae Jones", avatar: "images/client-mae.jpg", service: "Blow-dry", amount: "UGX 165,000", method: "Mobile Money", date: "10 Jan 2026", status: "paid", statusLabel: "Paid" },
  { id: "INV-2030", client: "Kara Thornton", avatar: "images/client-kara.jpg", service: "Hair Coloring", amount: "UGX 260,000", method: "Card", date: "8 Jan 2026", status: "refunded", statusLabel: "Refunded" },
];

let clients = [
  { name: "Mae Jones", avatar: "images/client-mae.jpg", phone: "+256 772 100 201", email: "mae.jones@email.com", visits: 12, last: "22 Jan 2026", spent: "UGX 1,850,000" },
  { name: "Kara Thornton", avatar: "images/client-kara.jpg", phone: "+256 772 100 202", email: "kara.t@email.com", visits: 8, last: "22 Jan 2026", spent: "UGX 980,000" },
  { name: "Curtis Walters", avatar: "images/client-curtis.jpg", phone: "+256 772 100 203", email: "curtis.w@email.com", visits: 5, last: "21 Jan 2026", spent: "UGX 720,000" },
  { name: "Alejandra Casey", avatar: "images/client-alejandra.jpg", phone: "+256 772 100 204", email: "ale.casey@email.com", visits: 15, last: "21 Jan 2026", spent: "UGX 2,100,000" },
  { name: "Leyton Landry", avatar: "images/client-leyton.jpg", phone: "+256 772 100 205", email: "leyton.l@email.com", visits: 3, last: "20 Jan 2026", spent: "UGX 450,000" },
  { name: "Molly Hawkins", avatar: "images/client-molly.jpg", phone: "+256 772 100 206", email: "molly.h@email.com", visits: 9, last: "18 Jan 2026", spent: "UGX 1,420,000" },
  { name: "Devon Price", avatar: "images/client-devon.jpg", phone: "+256 772 100 207", email: "devon.p@email.com", visits: 6, last: "16 Jan 2026", spent: "UGX 640,000" },
  { name: "Sienna Brooks", avatar: "images/client-sienna.jpg", phone: "+256 772 100 208", email: "sienna.b@email.com", visits: 4, last: "14 Jan 2026", spent: "UGX 510,000" },
  { name: "Noah Okello", avatar: "images/client-noah.jpg", phone: "+256 772 100 209", email: "noah.o@email.com", visits: 7, last: "12 Jan 2026", spent: "UGX 780,000" },
  { name: "Amina Nalwoga", avatar: "images/client-amina.jpg", phone: "+256 772 100 210", email: "amina.n@email.com", visits: 11, last: "10 Jan 2026", spent: "UGX 1,650,000" },
  { name: "Brian Mugisha", avatar: "images/client-brian.jpg", phone: "+256 772 100 211", email: "brian.m@email.com", visits: 2, last: "9 Jan 2026", spent: "UGX 240,000" },
  { name: "Grace Atim", avatar: "images/client-grace.jpg", phone: "+256 772 100 212", email: "grace.a@email.com", visits: 14, last: "7 Jan 2026", spent: "UGX 2,400,000" },
  { name: "Peter Kato", avatar: "images/client-peter.jpg", phone: "+256 772 100 213", email: "peter.k@email.com", visits: 1, last: "5 Jan 2026", spent: "UGX 120,000" },
  { name: "Linda Akello", avatar: "images/client-linda.jpg", phone: "+256 772 100 214", email: "linda.a@email.com", visits: 6, last: "3 Jan 2026", spent: "UGX 890,000" },
];

let services = [
  { name: "Lash Extensions", desc: "Classic or hybrid extensions", duration: "90–120 min", price: "UGX 220,000", category: "Lashes" },
  { name: "Lash Lift & Tint", desc: "Lift, curl, and tint natural lashes", duration: "60 min", price: "UGX 140,000", category: "Lashes" },
  { name: "Women's Haircut", desc: "Consultation, wash, cut & style", duration: "45–60 min", price: "UGX 150,000", category: "Cuts" },
  { name: "Hair Styling", desc: "Event or everyday styling", duration: "60–90 min", price: "UGX 185,000", category: "Styling" },
  { name: "Blow-dry", desc: "Wash and professional blow-dry", duration: "45 min", price: "UGX 165,000", category: "Styling" },
  { name: "Hair Coloring", desc: "Full color or root touch-up", duration: "90–120 min", price: "UGX 260,000", category: "Color" },
  { name: "Highlights / Balayage", desc: "Custom lightening technique", duration: "2–3 hrs", price: "UGX 330,000", category: "Color" },
  { name: "Bridal / Soft Glam", desc: "Hair + soft glam finish", duration: "2–3 hrs", price: "UGX 380,000", category: "Styling" },
  { name: "Deep Conditioning", desc: "Treatment mask & steam", duration: "40 min", price: "UGX 95,000", category: "Care" },
  { name: "Men's Haircut", desc: "Precision cut with finish", duration: "30–45 min", price: "UGX 120,000", category: "Cuts" },
  { name: "Beard Trim", desc: "Shape and tidy beard", duration: "20 min", price: "UGX 80,000", category: "Grooming" },
];

let reviews = [
  { name: "Molly Hawkins", avatar: "images/client-molly.jpg", date: "2 days ago", stars: 5, service: "Hair Coloring · Jessie Rae", text: "Absolutely loved my color! Jessie took the time to understand exactly what I wanted and the result is perfect." },
  { name: "Devon Price", avatar: "images/client-devon.jpg", date: "4 days ago", stars: 5, service: "Men's Haircut · Maximillian Neal", text: "Clean cut, great vibe, and on time. Already booked my next appointment." },
  { name: "Sienna Brooks", avatar: "images/client-sienna.jpg", date: "1 week ago", stars: 4, service: "Blow-dry · Angelina Haynes", text: "Salon feels calm and professional. Blow-dry lasted through a windy week — impressed!" },
  { name: "Amina Nalwoga", avatar: "images/client-amina.jpg", date: "1 week ago", stars: 5, service: "Women's Haircut · Jessica McGee", text: "Best cut I've had in Kampala. Jessica listens and the finish is always sharp." },
  { name: "Noah Okello", avatar: "images/client-noah.jpg", date: "2 weeks ago", stars: 5, service: "Beard Trim · Maximillian Neal", text: "Quick, precise, and friendly. Worth every shilling." },
  { name: "Kara Thornton", avatar: "images/client-kara.jpg", date: "2 weeks ago", stars: 4, service: "Hair Styling · Jessie Rae", text: "Looked amazing for my event. Booking online was easy too." },
  { name: "Grace Atim", avatar: "images/client-grace.jpg", date: "3 weeks ago", stars: 5, service: "Highlights / Balayage · Angelina Haynes", text: "Color came out exactly as we discussed. Soft and natural." },
  { name: "Brian Mugisha", avatar: "images/client-brian.jpg", date: "3 weeks ago", stars: 3, service: "Men's Haircut · Maximillian Neal", text: "Good cut but waited a bit longer than expected." },
  { name: "Linda Akello", avatar: "images/client-linda.jpg", date: "1 month ago", stars: 5, service: "Deep Conditioning · Jessie Rae", text: "Hair feels healthier already. Will be back." },
];

const pageTitles = {
  dashboard: "Dashboard",
  schedule: "Schedule",
  payments: "Payments",
  clients: "Clients",
  employees: "Employees",
  services: "Services",
  reviews: "Reviews",
  settings: "Settings",
};

let settingsState = {
  salonName: "Hair. Kampala",
  owner: "Admin User",
  phone: "+256 700 000 000",
  email: "hello@hair.ug",
  address: "Plot 12, Kampala Road, Kampala",
  currency: "UGX",
  timezone: "Africa/Kampala",
  openTime: "08:00",
  closeTime: "18:00",
  slotMins: "30",
  bufferMins: "10",
  onlineBooking: true,
  requireDeposit: false,
  smsReminders: true,
  emailReceipts: true,
  reviewAlerts: true,
  payMobileMoney: true,
  payCash: true,
  payCard: true,
};

/* ——— Local storage ——— */
const PIN_KEY = "hair_salon_pin";
const SESSION_KEY = "hair_salon_session";
const STORE_KEY = "hair_salon_data";
const DEFAULT_PIN = "2468";
const PIN_LEN = 4;
let pinBuffer = "";
let invoiceSeq = 2042;
let nextApptId = 100;

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      appointments,
      staff,
      payments,
      clients,
      services,
      reviews,
      settingsState,
      stylistsPage1,
      stylistsPage2,
      invoiceSeq,
      nextApptId,
    }));
  } catch (err) {
    console.warn("Could not save to localStorage", err);
  }
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      saveStore();
      return;
    }
    const data = JSON.parse(raw);
    if (Array.isArray(data.appointments)) appointments = data.appointments;
    if (Array.isArray(data.staff)) staff = data.staff;
    if (Array.isArray(data.payments)) payments = data.payments;
    if (Array.isArray(data.clients)) clients = data.clients;
    if (Array.isArray(data.services)) services = data.services;
    if (Array.isArray(data.reviews)) reviews = data.reviews;
    if (data.settingsState && typeof data.settingsState === "object") {
      settingsState = { ...settingsState, ...data.settingsState };
    }
    if (Array.isArray(data.stylistsPage1)) stylistsPage1 = data.stylistsPage1;
    if (Array.isArray(data.stylistsPage2)) stylistsPage2 = data.stylistsPage2;
    if (typeof data.invoiceSeq === "number") invoiceSeq = data.invoiceSeq;
    if (typeof data.nextApptId === "number") nextApptId = data.nextApptId;
    ensureStaffShifts();
    appointments.forEach((a) => {
      if (STATUS_LABELS[a.status]) a.statusLabel = STATUS_LABELS[a.status];
    });
    let seedChanged = migrateAvatars();
    const seedServices = [
      { name: "Lash Extensions", desc: "Classic or hybrid extensions", duration: "90–120 min", price: "UGX 220,000", category: "Lashes" },
      { name: "Lash Lift & Tint", desc: "Lift, curl, and tint natural lashes", duration: "60 min", price: "UGX 140,000", category: "Lashes" },
      { name: "Bridal / Soft Glam", desc: "Hair + soft glam finish", duration: "2–3 hrs", price: "UGX 380,000", category: "Styling" },
    ];
    seedServices.forEach((svc) => {
      if (!services.some((s) => s.name === svc.name)) {
        services.unshift(svc);
        seedChanged = true;
      }
    });
    if (seedChanged) saveStore();
  } catch (err) {
    console.warn("Could not load localStorage", err);
  }
}

/* ——— PIN auth ——— */
function getStoredPin() {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
}

function setStoredPin(pin) {
  localStorage.setItem(PIN_KEY, pin);
}

function isLoggedIn() {
  return localStorage.getItem(SESSION_KEY) === "1";
}

function updatePinDots() {
  document.querySelectorAll("#pinDots span").forEach((dot, i) => {
    dot.classList.toggle("filled", i < pinBuffer.length);
  });
}

function clearPinError() {
  const err = document.getElementById("pinError");
  if (err) err.hidden = true;
  document.getElementById("pinDots")?.classList.remove("shake");
}

function showPinError() {
  const err = document.getElementById("pinError");
  const dots = document.getElementById("pinDots");
  if (err) err.hidden = false;
  if (dots) {
    dots.classList.remove("shake");
    void dots.offsetWidth;
    dots.classList.add("shake");
  }
  pinBuffer = "";
  updatePinDots();
}

function unlockApp() {
  localStorage.setItem(SESSION_KEY, "1");
  document.body.classList.remove("locked");
  document.getElementById("loginScreen").hidden = true;
  const app = document.getElementById("appShell");
  app.hidden = false;
  app.removeAttribute("inert");
  pinBuffer = "";
  updatePinDots();
  clearPinError();
  const logoText = document.querySelector(".logo-text");
  if (logoText && settingsState.salonName) logoText.textContent = settingsState.salonName;
  document.title = `${settingsState.salonName || "Hair."} — Salon Booking`;
}

function lockApp() {
  localStorage.removeItem(SESSION_KEY);
  document.body.classList.add("locked");
  const app = document.getElementById("appShell");
  app.hidden = true;
  app.setAttribute("inert", "");
  document.getElementById("loginScreen").hidden = false;
  closeAllPanels();
  closeAllModals();
  closeSidebar();
  pinBuffer = "";
  updatePinDots();
  clearPinError();
  const brand = document.getElementById("loginBrand");
  if (brand) brand.textContent = settingsState.salonName || "Hair.";
}

function submitPin() {
  if (pinBuffer.length !== PIN_LEN) return;
  if (pinBuffer === getStoredPin()) {
    unlockApp();
    toast("Welcome back");
  } else {
    showPinError();
  }
}

function handlePinInput(key) {
  clearPinError();
  if (key === "clear") {
    pinBuffer = "";
    updatePinDots();
    return;
  }
  if (key === "del") {
    pinBuffer = pinBuffer.slice(0, -1);
    updatePinDots();
    return;
  }
  if (!/^\d$/.test(key) || pinBuffer.length >= PIN_LEN) return;
  pinBuffer += key;
  updatePinDots();
  if (pinBuffer.length === PIN_LEN) setTimeout(submitPin, 120);
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (window.ICONS && window.ICONS[name]) el.innerHTML = window.ICONS[name];
  });
}

const iconMail = () => icon("mail");
const iconPhone = () => icon("call");
const chevronL = () => icon("arrowLeft");
const chevronR = () => icon("arrowRight");
const star = () => icon("starFill");

let currentPage = "dashboard";
let availPage = 0;
let availDayOffset = 0;
let reviewIndex = 0;
let scheduleDay = 0;
const availDayLabels = ["Mon, 22 Jan", "Tue, 23 Jan", "Wed, 24 Jan", "Thu, 25 Jan", "Fri, 26 Jan", "Sat, 27 Jan", "Sun, 28 Jan"];
let payFilter = "all";
let serviceFilter = "All";
let pendingPayAppt = null;
let selectedPayMethod = "Mobile Money";
const PAGE_SIZE_DEFAULT = 5;
let apptSelectedStylist = null;
let apptSelectedSlot = null;

function getAvailPages() {
  return [stylistsPage1, stylistsPage2];
}

function getAllStylists() {
  return [...stylistsPage1, ...stylistsPage2];
}

function openSlotsFor(stylist) {
  return stylist.slots.filter((s) => s.state !== "booked");
}

function markSlotBooked(stylistName, time) {
  getAllStylists().forEach((s) => {
    if (s.name !== stylistName) return;
    const slot = s.slots.find((x) => x.t === time);
    if (slot) slot.state = "booked";
  });
}

function fillApptClientFields(client) {
  document.getElementById("apptClientName").value = client?.name || "";
  document.getElementById("apptClientPhone").value = client?.phone || "";
  document.getElementById("apptClientEmail").value = client?.email || "";
}

function upsertClientFromBooking({ name, phone, email, avatar, price, visitDate }) {
  let client = clients.find((c) => c.name.toLowerCase() === name.toLowerCase() || (phone && c.phone === phone));
  const priceNum = Number(String(price || "0").replace(/[^\d]/g, "")) || 0;
  if (client) {
    client.phone = phone || client.phone;
    client.email = email || client.email;
    if (avatar) client.avatar = avatar;
    client.visits = (client.visits || 0) + 1;
    client.last = visitDate || client.last;
    const prev = Number(String(client.spent || "0").replace(/[^\d]/g, "")) || 0;
    client.spent = fmtUgx(prev + priceNum);
    return client;
  }
  client = {
    name,
    avatar: avatar || avatarForName(name),
    phone: phone || "",
    email: email || "",
    visits: 1,
    last: visitDate || "—",
    spent: fmtUgx(priceNum),
    source: "booking",
  };
  clients.unshift(client);
  return client;
}

function syncClientsFromBookings() {
  let added = 0;
  appointments.forEach((a) => {
    const exists = clients.some((c) => c.name === a.client);
    if (exists) return;
    clients.unshift({
      name: a.client,
      avatar: avatarForName(a.client),
      phone: "",
      email: "",
      visits: appointments.filter((x) => x.client === a.client).length,
      last: weekDays[a.day]?.label || "—",
      spent: a.price || "UGX 0",
      source: "booking",
    });
    added += 1;
  });
  return added > 0;
}

function openApptModal(preset = {}) {
  const existingSel = document.getElementById("apptExistingClient");
  const serviceSel = document.getElementById("apptService");
  existingSel.innerHTML = `<option value="">New client from this booking</option>` +
    clients.map((c) => `<option value="${c.name}">${c.name}</option>`).join("");
  serviceSel.innerHTML = services.map((s) => `<option value="${s.name}" data-price="${s.price}">${s.name} — ${s.price}</option>`).join("");

  if (preset.service) serviceSel.value = preset.service;

  if (preset.client) {
    existingSel.value = preset.client;
    fillApptClientFields(clients.find((c) => c.name === preset.client));
  } else {
    existingSel.value = "";
    fillApptClientFields(null);
  }

  const stylists = getAllStylists();
  const preferred = preset.stylist
    ? stylists.find((s) => s.name === preset.stylist)
    : null;
  const withOpen = preferred || stylists.find((s) => openSlotsFor(s).length > 0) || stylists[0];
  apptSelectedStylist = withOpen?.name || null;
  apptSelectedSlot = preset.slot || null;

  renderApptStylists();
  renderApptSlots(!preset.slot);
  if (preset.slot) {
    document.getElementById("apptSlotValue").value = preset.slot;
    document.getElementById("apptSubmitBtn").disabled = false;
  } else {
    document.getElementById("apptSubmitBtn").disabled = !apptSelectedSlot;
  }
  openModal("apptModal");
  document.getElementById("apptClientName")?.focus();
}

function fmtUgx(n) {
  return "UGX " + Number(n || 0).toLocaleString("en-UG");
}

function renderApptStylists() {
  const root = document.getElementById("apptStylists");
  root.innerHTML = getAllStylists().map((s) => {
    const open = openSlotsFor(s).length;
    return `
      <button type="button" class="appt-stylist ${s.name === apptSelectedStylist ? "active" : ""}" data-stylist="${s.name}">
        <img src="${s.avatar}" alt="" />
        <div>
          <strong>${s.name}</strong>
          <span>${s.tags.join(" · ")}</span>
        </div>
        <em class="open-count">${open} open</em>
      </button>
    `;
  }).join("");

  root.querySelectorAll(".appt-stylist").forEach((btn) => {
    btn.addEventListener("click", () => {
      apptSelectedStylist = btn.dataset.stylist;
      apptSelectedSlot = null;
      document.getElementById("apptSlotValue").value = "";
      document.getElementById("apptSubmitBtn").disabled = true;
      renderApptStylists();
      renderApptSlots(true);
    });
  });
}

function renderApptSlots(autoSelect) {
  const stylist = getAllStylists().find((s) => s.name === apptSelectedStylist);
  const root = document.getElementById("apptSlots");
  const hint = document.getElementById("apptSlotHint");
  document.getElementById("apptStylistValue").value = apptSelectedStylist || "";

  if (!stylist) {
    root.innerHTML = `<div class="empty-slots">No stylist selected</div>`;
    hint.textContent = "";
    return;
  }

  const open = openSlotsFor(stylist);
  hint.textContent = `· ${open.length} available`;

  if (!stylist.slots.length) {
    root.innerHTML = `<div class="empty-slots">No slots today</div>`;
    return;
  }

  if (autoSelect && open.length) {
    apptSelectedSlot = open[0].t;
    document.getElementById("apptSlotValue").value = apptSelectedSlot;
    document.getElementById("apptSubmitBtn").disabled = false;
  }

  root.innerHTML = stylist.slots.map((slot) => {
    const booked = slot.state === "booked";
    const selected = !booked && slot.t === apptSelectedSlot;
    return `
      <button type="button" class="appt-slot ${booked ? "booked" : ""} ${selected ? "selected" : ""}"
        data-time="${slot.t}" ${booked ? "disabled" : ""}>
        ${slot.t}${booked ? "" : ""}
      </button>
    `;
  }).join("");

  if (!open.length) {
    root.insertAdjacentHTML("beforeend", `<div class="empty-slots">No open slots for this stylist</div>`);
  }

  root.querySelectorAll(".appt-slot:not(.booked)").forEach((btn) => {
    btn.addEventListener("click", () => {
      apptSelectedSlot = btn.dataset.time;
      document.getElementById("apptSlotValue").value = apptSelectedSlot;
      document.getElementById("apptSubmitBtn").disabled = false;
      renderApptSlots(false);
    });
  });

  // Suggest matching services for stylist tags
  const serviceSel = document.getElementById("apptService");
  const match = services.find((s) => stylist.tags.some((t) => t.toLowerCase().includes(s.name.toLowerCase().split(" ")[0]) || s.name.toLowerCase().includes(t.toLowerCase().split(" ")[0])));
  if (match) serviceSel.value = match.name;
}

const tableUI = {
  dashboard: { page: 1, size: 5, status: "all", master: "all", service: "all", q: "" },
  payments: { page: 1, size: 10, status: "all", method: "all", sort: "newest", q: "" },
  clients: { page: 1, size: 5, sort: "name", minVisits: "all", q: "" },
  employees: { page: 1, size: 4, status: "all", role: "all", q: "" },
  services: { page: 1, size: 4, category: "All", sort: "name", q: "" },
  reviews: { page: 1, size: 4, stars: "all", sort: "newest", q: "" },
  schedule: { page: 1, size: 5, status: "all", master: "all", q: "" },
};

function paginate(items, page, size) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const safePage = Math.min(Math.max(1, page), pages);
  const start = (safePage - 1) * size;
  return {
    page: safePage,
    pages,
    total,
    size,
    slice: items.slice(start, start + size),
    from: total ? start + 1 : 0,
    to: Math.min(start + size, total),
  };
}

function paginationBar(meta, ns) {
  const { page, pages, total, from, to, size } = meta;
  return `
    <div class="table-footer" data-ns="${ns}">
      <div class="table-meta">Showing <strong>${from}–${to}</strong> of <strong>${total}</strong></div>
      <div class="pager-controls">
        <label class="page-size">Rows
          <select data-page-size="${ns}">
            ${[4, 5, 8, 10].map((n) => `<option value="${n}" ${Number(size) === n ? "selected" : ""}>${n}</option>`).join("")}
          </select>
        </label>
        <button type="button" class="btn-ghost" data-page-go="${ns}" data-to="prev" ${page <= 1 ? "disabled" : ""}>${icon("arrowLeft")}</button>
        <span class="page-indicator">${page} / ${pages}</span>
        <button type="button" class="btn-ghost" data-page-go="${ns}" data-to="next" ${page >= pages ? "disabled" : ""}>${icon("arrowRight")}</button>
      </div>
    </div>
  `;
}

function bindPagination(ns, rerender) {
  const root =
    ns === "dashboard"
      ? document.getElementById("appointments")?.parentElement
      : document.getElementById(`page-${ns}`);
  if (!root) return;
  root.querySelector(`[data-page-size="${ns}"]`)?.addEventListener("change", (e) => {
    tableUI[ns].size = Number(e.target.value);
    tableUI[ns].page = 1;
    rerender();
  });
  root.querySelectorAll(`[data-page-go="${ns}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.to === "prev") tableUI[ns].page -= 1;
      else tableUI[ns].page += 1;
      rerender();
    });
  });
}

function filterSelect(name, value, options, label) {
  return `
    <label class="table-filter">
      <span>${label}</span>
      <select data-filter="${name}">
        ${options.map((o) => {
          const v = typeof o === "object" ? o.value : o;
          const t = typeof o === "object" ? o.label : o;
          return `<option value="${v}" ${String(value) === String(v) ? "selected" : ""}>${t}</option>`;
        }).join("")}
      </select>
    </label>
  `;
}

function bindTableSearch(ns, rerender) {
  const input = document.querySelector(`[data-table-q="${ns}"]`);
  if (!input) return;
  input.addEventListener("input", (e) => {
    tableUI[ns].q = e.target.value;
    tableUI[ns].page = 1;
    clearTimeout(bindTableSearch[`_${ns}`]);
    bindTableSearch[`_${ns}`] = setTimeout(() => {
      rerender();
      const again = document.querySelector(`[data-table-q="${ns}"]`);
      if (again) {
        again.focus();
        const len = again.value.length;
        again.setSelectionRange(len, len);
      }
    }, 180);
  });
}

const STATUS_FLOW = {
  confirmed: { next: "arrived", label: "Arrived" },
  arrived: { next: "in-progress", label: "In Progress" },
  "in-progress": { next: "complete", label: "Completed" },
  complete: { next: "pay", label: "Pay now" },
};

const STATUS_LABELS = {
  confirmed: "Booked",
  arrived: "Arrived",
  "in-progress": "In Progress",
  complete: "Pay now",
  past: "Paid",
};

const STATUS_HINT = {
  confirmed: "Mark arrived",
  arrived: "Start service",
  "in-progress": "Mark completed & collect payment",
  complete: "Collect payment",
  past: "Payment done",
};

function statusButtonLabel(appt) {
  return STATUS_LABELS[appt.status] || appt.statusLabel || appt.status;
}

function ensurePendingPayment(appt) {
  let payment = payments.find((p) => p.apptId === appt.id && p.status === "pending");
  if (payment) return payment;
  payment = payments.find((p) =>
    !p.apptId &&
    p.client === appt.client &&
    p.service === appt.service &&
    p.status === "pending"
  );
  if (payment) {
    payment.apptId = appt.id;
    return payment;
  }
  payment = {
    id: `INV-${invoiceSeq++}`,
    apptId: appt.id,
    client: appt.client,
    avatar: appt.avatar,
    service: appt.service,
    amount: appt.price,
    method: "—",
    date: weekDays[appt.day]?.label || "Today",
    status: "pending",
    statusLabel: "Pending",
  };
  payments.unshift(payment);
  return payment;
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ——— Dashboard renders ——— */
function getDashboardAppts() {
  const ui = tableUI.dashboard;
  let list = appointments.filter((a) => a.day === 0);
  if (ui.status !== "all") list = list.filter((a) => a.status === ui.status);
  if (ui.master !== "all") list = list.filter((a) => a.master === ui.master);
  if (ui.service !== "all") list = list.filter((a) => a.service === ui.service);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    list = list.filter((a) =>
      a.client.toLowerCase().includes(q) ||
      a.service.toLowerCase().includes(q) ||
      a.master.toLowerCase().includes(q) ||
      a.statusLabel.toLowerCase().includes(q)
    );
  }
  return list;
}

function renderAppointments(list) {
  const root = document.getElementById("appointments");
  if (!root) return;
  const source = list || getDashboardAppts();
  const ui = tableUI.dashboard;
  const meta = paginate(source, ui.page, ui.size);
  ui.page = meta.page;

  const masters = [...new Set(appointments.filter((a) => a.day === 0).map((a) => a.master))];
  const servicesList = [...new Set(appointments.filter((a) => a.day === 0).map((a) => a.service))];

  const filtersEl = document.getElementById("dashFilters");
  if (filtersEl) {
    filtersEl.innerHTML = `
      ${filterSelect("status", ui.status, [
        { value: "all", label: "All status" },
        { value: "confirmed", label: "Booked" },
        { value: "arrived", label: "Arrived" },
        { value: "in-progress", label: "In Progress" },
        { value: "complete", label: "Completed / Pay" },
        { value: "past", label: "Paid" },
      ], "Status")}
      ${filterSelect("master", ui.master, [{ value: "all", label: "All masters" }, ...masters.map((m) => ({ value: m, label: m }))], "Master")}
      ${filterSelect("service", ui.service, [{ value: "all", label: "All services" }, ...servicesList.map((s) => ({ value: s, label: s }))], "Service")}
    `;
    filtersEl.querySelectorAll("[data-filter]").forEach((sel) => {
      sel.addEventListener("change", () => {
        tableUI.dashboard[sel.dataset.filter] = sel.value;
        tableUI.dashboard.page = 1;
        renderAppointments();
      });
    });
  }

  if (!meta.slice.length) {
    root.innerHTML = `<div class="empty-state">No appointments match your filters.</div>${paginationBar(meta, "dashboard")}`;
    bindPagination("dashboard", () => renderAppointments());
    return;
  }
  root.innerHTML = meta.slice.map((a) => `
    <article class="appt" data-id="${a.id}">
      <div class="appt-time">${a.time}</div>
      <div class="appt-body">
        <div class="client">
          <img src="${a.avatar}" alt="${a.client}" />
          <div class="client-meta">
            <div class="client-name">${a.client}</div>
            <div class="client-actions">
                  <button type="button" title="Email" aria-label="Email ${a.client}">${iconMail()}</button>
                  <button type="button" title="Call" aria-label="Call ${a.client}">${iconPhone()}</button>
            </div>
          </div>
        </div>
        <div class="meta-block"><div class="label">Service</div><div class="value">${a.service}</div></div>
        <div class="meta-block"><div class="label">Master</div><div class="value">${a.master}</div></div>
        <div class="meta-block price"><div class="label">Price</div><div class="value">${a.price}</div></div>
      </div>
      <div class="appt-status-wrap">
        <button type="button" class="status ${a.status}" data-status-id="${a.id}" title="${STATUS_HINT[a.status] || ""}">${statusButtonLabel(a)}</button>
      </div>
    </article>
  `).join("") + paginationBar(meta, "dashboard");
  bindPagination("dashboard", () => renderAppointments());
}

function refreshDashboardAppts() {
  renderAppointments();
  renderStaff();
}

function openModal(id) {
  document.getElementById(id).hidden = false;
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
}
function closeAllModals() {
  document.querySelectorAll(".modal").forEach((m) => { m.hidden = true; });
}

function advanceStatus(apptId) {
  const appt = appointments.find((a) => a.id === Number(apptId));
  if (!appt || appt.status === "past") return;

  if (appt.status === "complete") {
    const payment = ensurePendingPayment(appt);
    saveStore();
    openPaymentModal({ ...appt, _existingPayment: payment });
    return;
  }

  const step = STATUS_FLOW[appt.status];
  if (!step) return;

  // Booked → Arrived → In Progress → Completed (+ payment immediately)
  if (step.next === "complete") {
    appt.status = "complete";
    appt.statusLabel = STATUS_LABELS.complete;
    const payment = ensurePendingPayment(appt);
    saveStore();
    refreshDashboardAppts();
    if (currentPage === "schedule") renderSchedule();
    if (currentPage === "payments") renderPayments();
    toast(`${appt.client} completed — collect payment`);
    openPaymentModal({ ...appt, _existingPayment: payment });
    return;
  }

  appt.status = step.next;
  appt.statusLabel = STATUS_LABELS[step.next];
  saveStore();
  refreshDashboardAppts();
  if (currentPage === "schedule") renderSchedule();
  toast(`${appt.client} → ${appt.statusLabel}`);
}

function openPaymentModal(appt) {
  pendingPayAppt = appt;
  selectedPayMethod = "Mobile Money";
  document.getElementById("paySummary").innerHTML = `
    <strong>${appt.client}</strong>
    <span>${appt.service} · ${appt.master} · ${appt.time}</span>
    <div class="pay-amount">${appt.price}</div>
    <p class="pay-flow-note">Status: Completed — payment due now</p>
  `;
  document.querySelectorAll(".pay-method").forEach((b) => {
    b.classList.toggle("active", b.dataset.method === selectedPayMethod);
  });
  openModal("paymentModal");
}

function printReceipt(payment, appt) {
  const s = settingsState;
  const box = document.getElementById("receiptPrint");
  box.innerHTML = `
    <div class="receipt-box">
      <h1>${s.salonName}</h1>
      <p class="muted">${s.address}<br>${s.phone} · ${s.email}</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #ddd;" />
      <div class="receipt-row"><span>Receipt</span><strong>${payment.id}</strong></div>
      <div class="receipt-row"><span>Date</span><strong>${payment.date}</strong></div>
      <div class="receipt-row"><span>Client</span><strong>${payment.client}</strong></div>
      <div class="receipt-row"><span>Service</span><strong>${payment.service}</strong></div>
      <div class="receipt-row"><span>Stylist</span><strong>${appt?.master || "—"}</strong></div>
      <div class="receipt-row"><span>Method</span><strong>${payment.method}</strong></div>
      <div class="receipt-total"><span>Total</span><span>${payment.amount}</span></div>
      <p class="muted" style="margin-top:20px;text-align:center;">Thank you for visiting Hair.</p>
    </div>
  `;
  window.print();
}

function completePayment() {
  if (!pendingPayAppt) return;
  const apptRef = pendingPayAppt;
  const liveAppt = appointments.find((a) => a.id === apptRef.id) || apptRef;
  let payment;
  if (apptRef._existingPayment) {
    payment = apptRef._existingPayment;
    payment.status = "paid";
    payment.statusLabel = "Paid";
    payment.method = selectedPayMethod;
  } else {
    payment = ensurePendingPayment(liveAppt);
    payment.status = "paid";
    payment.statusLabel = "Paid";
    payment.method = selectedPayMethod;
  }
  liveAppt.status = "past";
  liveAppt.statusLabel = STATUS_LABELS.past;
  closeModal("paymentModal");
  pendingPayAppt = null;
  saveStore();
  refreshDashboardAppts();
  if (currentPage === "payments") renderPayments();
  if (currentPage === "schedule") renderSchedule();
  if (currentPage === "dashboard") renderAppointments();
  toast(`Paid ${payment.amount} · printing receipt`);
  setTimeout(() => printReceipt(payment, liveAppt), 250);
}

function renderAvailability() {
  const pages = getAvailPages();
  const data = pages[availPage];
  const dayLabel = availDayLabels[availDayOffset] || availDayLabels[0];
  document.getElementById("availPage").textContent = `${availPage + 1}/${pages.length}`;
  document.getElementById("availPrev").disabled = availPage === 0;
  document.getElementById("availNext").disabled = availPage === pages.length - 1;
  document.getElementById("availability").innerHTML = data.map((s, si) => `
    <div class="stylist-card" data-stylist="${s.name}">
      <div class="stylist-top">
        <img src="${s.avatar}" alt="${s.name}" />
        <div class="stylist-info">
          <div class="stylist-name">${s.name}</div>
          <div class="tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
        </div>
      </div>
      <div class="avail-date">
        <button type="button" class="avail-day-btn" data-dir="-1" aria-label="Previous day">${chevronL()}</button>
        <span>${dayLabel}</span>
        <button type="button" class="avail-day-btn" data-dir="1" aria-label="Next day">${chevronR()}</button>
      </div>
      <div class="slots">
        ${s.slots.map((slot, i) => `
          <button type="button" class="slot ${slot.state}" data-si="${si}" data-i="${i}" data-time="${slot.t}" ${slot.state === "booked" ? "disabled" : ""}>${slot.t}</button>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderStaff() {
  const root = document.getElementById("staffStatus");
  root.innerHTML = staff.map((s) => `
    <button type="button" class="staff-row" data-staff-schedule="${s.name}" title="View ${s.name}'s schedule">
      <img src="${s.avatar}" alt="${s.name}" />
      <span class="staff-name">${s.name}</span>
      <span class="badge ${s.status}">${s.label}</span>
    </button>
  `).join("");
  root.querySelectorAll("[data-staff-schedule]").forEach((btn) => {
    btn.addEventListener("click", () => {
      tableUI.schedule.master = btn.dataset.staffSchedule;
      tableUI.schedule.page = 1;
      scheduleDay = 0;
      showPage("schedule");
    });
  });
}

function renderDashReview() {
  const r = reviews[reviewIndex];
  document.getElementById("reviewPage").textContent = `${reviewIndex + 1}/${reviews.length}`;
  document.getElementById("reviewPrev").disabled = reviewIndex === 0;
  document.getElementById("reviewNext").disabled = reviewIndex === reviews.length - 1;
  document.getElementById("reviews").innerHTML = `
    <article class="review">
      <img src="${r.avatar}" alt="${r.name}" />
      <div>
        <div class="review-top">
          <span class="review-name">${r.name}</span>
          <span class="review-date">${r.date}</span>
        </div>
            <div class="stars">${star().repeat(r.stars)}</div>
        <div class="review-service">${r.service}</div>
        <p class="review-text">${r.text}</p>
      </div>
    </article>
  `;
}

/* ——— Other pages ——— */
function renderSchedule() {
  const ui = tableUI.schedule;
  let dayAppts = appointments.filter((a) => a.day === scheduleDay);
  if (ui.status !== "all") dayAppts = dayAppts.filter((a) => a.status === ui.status);
  if (ui.master !== "all") dayAppts = dayAppts.filter((a) => a.master === ui.master);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    dayAppts = dayAppts.filter((a) =>
      a.client.toLowerCase().includes(q) || a.service.toLowerCase().includes(q) || a.master.toLowerCase().includes(q)
    );
  }
  const masters = [...new Set([
    ...staff.map((s) => s.name),
    ...appointments.map((a) => a.master),
    ...(ui.master !== "all" ? [ui.master] : []),
  ])].filter(Boolean).sort();
  const meta = paginate(dayAppts, ui.page, ui.size);
  ui.page = meta.page;

  const el = document.getElementById("page-schedule");
  el.innerHTML = `
    <div class="schedule-week">
      ${weekDays.map((d, i) => {
        const count = appointments.filter((a) => a.day === i && (ui.master === "all" || a.master === ui.master)).length;
        return `
          <button type="button" class="day-chip ${i === scheduleDay ? "active" : ""}" data-day="${i}">
            <div class="dow">${d.dow}</div>
            <div class="dom">${d.dom}</div>
            <div class="count">${count} appt${count === 1 ? "" : "s"}</div>
          </button>`;
      }).join("")}
    </div>
    <section class="panel">
      <div class="panel-head">
        <div>
          <span class="panel-title">Day schedule</span>
          <span class="panel-date">${weekDays[scheduleDay].label}${ui.master !== "all" ? ` · ${ui.master}` : ""}</span>
        </div>
        <button type="button" class="btn-primary" id="addApptBtn">+ New appointment</button>
      </div>
      <div class="toolbar table-toolbar">
        <div class="table-filters">
          ${filterSelect("status", ui.status, [
            { value: "all", label: "All status" },
            { value: "confirmed", label: "Booked" },
            { value: "arrived", label: "Arrived" },
            { value: "in-progress", label: "In Progress" },
            { value: "complete", label: "Completed / Pay" },
            { value: "past", label: "Paid" },
          ], "Status")}
          ${filterSelect("master", ui.master, [{ value: "all", label: "All masters" }, ...masters.map((m) => ({ value: m, label: m }))], "Master")}
        </div>
        <input class="table-search" type="search" placeholder="Filter schedule..." value="${ui.q}" data-table-q="schedule" />
      </div>
      <p class="flow-legend">Flow: <strong>Booked</strong> → <strong>Arrived</strong> → <strong>In Progress</strong> → <strong>Completed</strong> → <strong>Payment</strong></p>
      <div class="schedule-list">
        ${meta.slice.length ? meta.slice.map((a) => `
          <div class="schedule-block">
            <div class="sb-time">${a.time.split("–")[0].trim()}</div>
            <div class="sb-body">
              <div class="person-cell">
                <img src="${a.avatar}" alt="${a.client}" />
                <div>
                  <strong>${a.client}</strong>
                  <span>${a.service} · ${a.master}</span>
                </div>
              </div>
              <div class="schedule-actions">
                <strong>${a.price}</strong>
                <button type="button" class="status ${a.status}" data-status-id="${a.id}" title="${STATUS_HINT[a.status] || ""}">${statusButtonLabel(a)}</button>
              </div>
            </div>
          </div>
        `).join("") : `<div class="empty-state">No appointments match filters for this day.</div>`}
      </div>
      ${paginationBar(meta, "schedule")}
    </section>
  `;

  el.querySelectorAll(".day-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      scheduleDay = Number(btn.dataset.day);
      tableUI.schedule.page = 1;
      renderSchedule();
    });
  });
  el.querySelectorAll("[data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.schedule[sel.dataset.filter] = sel.value;
      tableUI.schedule.page = 1;
      renderSchedule();
    });
  });
  bindTableSearch("schedule", renderSchedule);
  bindPagination("schedule", renderSchedule);
  el.querySelector("#addApptBtn")?.addEventListener("click", () => openApptModal());
  el.querySelectorAll("[data-status-id]").forEach((btn) => {
    btn.addEventListener("click", () => advanceStatus(btn.dataset.statusId));
  });
}

function renderPayments() {
  const ui = tableUI.payments;
  const paid = payments.filter((p) => p.status === "paid");
  const pending = payments.filter((p) => p.status === "pending");
  const paidTotal = paid.reduce((s, p) => s + Number(p.amount.replace(/[^\d]/g, "")), 0);
  const pendingTotal = pending.reduce((s, p) => s + Number(p.amount.replace(/[^\d]/g, "")), 0);
  const fmt = (n) => "UGX " + n.toLocaleString("en-UG");

  let filtered = [...payments];
  if (ui.status !== "all") filtered = filtered.filter((p) => p.status === ui.status);
  if (ui.method !== "all") filtered = filtered.filter((p) => p.method === ui.method);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    filtered = filtered.filter((p) =>
      p.client.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.service.toLowerCase().includes(q)
    );
  }
  if (ui.sort === "amount-high") filtered.sort((a, b) => Number(b.amount.replace(/[^\d]/g, "")) - Number(a.amount.replace(/[^\d]/g, "")));
  else if (ui.sort === "amount-low") filtered.sort((a, b) => Number(a.amount.replace(/[^\d]/g, "")) - Number(b.amount.replace(/[^\d]/g, "")));
  else if (ui.sort === "client") filtered.sort((a, b) => a.client.localeCompare(b.client));

  const meta = paginate(filtered, ui.page, ui.size);
  ui.page = meta.page;

  document.getElementById("page-payments").innerHTML = `
    <div class="stats">
      <div class="stat-card"><div class="stat-label">Collected</div><div class="stat-value">${fmt(paidTotal)}</div><div class="stat-sub">${paid.length} paid invoices</div></div>
      <div class="stat-card"><div class="stat-label">Pending</div><div class="stat-value">${fmt(pendingTotal)}</div><div class="stat-sub">${pending.length} awaiting payment</div></div>
      <div class="stat-card"><div class="stat-label">Invoices</div><div class="stat-value">${payments.length}</div><div class="stat-sub">This period</div></div>
      <div class="stat-card"><div class="stat-label">Avg ticket</div><div class="stat-value">${fmt(Math.round(paidTotal / Math.max(paid.length, 1)))}</div><div class="stat-sub">Per paid visit</div></div>
    </div>
    <section class="panel">
      <div class="toolbar table-toolbar">
        <div class="table-filters">
          ${filterSelect("status", ui.status, [
            { value: "all", label: "All status" },
            { value: "paid", label: "Paid" },
            { value: "pending", label: "Pending" },
            { value: "refunded", label: "Refunded" },
          ], "Status")}
          ${filterSelect("method", ui.method, [
            { value: "all", label: "All methods" },
            { value: "Mobile Money", label: "Mobile Money" },
            { value: "Cash", label: "Cash" },
            { value: "Card", label: "Card" },
          ], "Method")}
          ${filterSelect("sort", ui.sort, [
            { value: "newest", label: "Newest" },
            { value: "amount-high", label: "Amount ↓" },
            { value: "amount-low", label: "Amount ↑" },
            { value: "client", label: "Client A–Z" },
          ], "Sort")}
        </div>
        <input class="table-search" type="search" placeholder="Filter table..." value="${ui.q}" data-table-q="payments" />
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Invoice</th><th>Client</th><th>Service</th><th>Method</th><th>Date</th><th>Amount</th><th>Status</th><th>Receipt</th></tr>
        </thead>
        <tbody>
          ${meta.slice.map((p) => `
            <tr>
              <td><strong>${p.id}</strong></td>
              <td><div class="person-cell"><img src="${p.avatar}" alt=""/><div><strong>${p.client}</strong></div></div></td>
              <td>${p.service}</td>
              <td>${p.method}</td>
              <td>${p.date}</td>
              <td><strong>${p.amount}</strong></td>
              <td><span class="badge pay-${p.status}">${p.statusLabel}</span></td>
              <td>${
                p.status === "paid"
                  ? `<button type="button" class="btn-ghost print-receipt" data-inv="${p.id}">Print receipt</button>`
                  : p.status === "pending"
                    ? `<button type="button" class="btn-ghost collect-pay" data-inv="${p.id}">Collect</button>`
                    : "—"
              }</td>
            </tr>
          `).join("") || `<tr><td colspan="8"><div class="empty-state">No payments in this filter.</div></td></tr>`}
        </tbody>
      </table>
      ${paginationBar(meta, "payments")}
    </section>
  `;

  document.querySelectorAll("#page-payments [data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.payments[sel.dataset.filter] = sel.value;
      tableUI.payments.page = 1;
      renderPayments();
    });
  });
  bindTableSearch("payments", renderPayments);
  bindPagination("payments", renderPayments);

  document.querySelectorAll(".print-receipt").forEach((btn) => {
    btn.addEventListener("click", () => {
      const payment = payments.find((p) => p.id === btn.dataset.inv);
      if (!payment) return;
      const appt = appointments.find((a) => a.client === payment.client && a.service === payment.service) || {
        master: "—",
      };
      printReceipt(payment, appt);
    });
  });
  document.querySelectorAll(".collect-pay").forEach((btn) => {
    btn.addEventListener("click", () => {
      const payment = payments.find((p) => p.id === btn.dataset.inv);
      if (!payment) return;
      const appt = appointments.find((a) => a.client === payment.client && a.service === payment.service) || {};
      openPaymentModal({
        _existingPayment: payment,
        client: payment.client,
        avatar: payment.avatar,
        service: payment.service,
        master: appt.master || "—",
        time: appt.time || "—",
        price: payment.amount,
      });
    });
  });
}

function renderClients() {
  const ui = tableUI.clients;
  let filtered = [...clients];
  if (ui.minVisits === "5+") filtered = filtered.filter((c) => c.visits >= 5);
  if (ui.minVisits === "10+") filtered = filtered.filter((c) => c.visits >= 10);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    filtered = filtered.filter((c) =>
      c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
    );
  }
  if (ui.sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (ui.sort === "visits") filtered.sort((a, b) => b.visits - a.visits);
  if (ui.sort === "spent") filtered.sort((a, b) => Number(b.spent.replace(/[^\d]/g, "")) - Number(a.spent.replace(/[^\d]/g, "")));

  const meta = paginate(filtered, ui.page, ui.size);
  ui.page = meta.page;

  const fromBooking = clients.filter((c) => c.source === "booking" || appointments.some((a) => a.client === c.name)).length;
  const topClient = [...clients].sort((a, b) => b.visits - a.visits)[0];

  document.getElementById("page-clients").innerHTML = `
    <div class="stats">
      <div class="stat-card"><div class="stat-label">Total clients</div><div class="stat-value">${clients.length}</div><div class="stat-sub">From bookings</div></div>
      <div class="stat-card"><div class="stat-label">Visits (all)</div><div class="stat-value">${clients.reduce((s, c) => s + c.visits, 0)}</div><div class="stat-sub">Booked visits</div></div>
      <div class="stat-card"><div class="stat-label">Top client</div><div class="stat-value" style="font-size:1.05rem;">${topClient?.name || "—"}</div><div class="stat-sub">Most visits</div></div>
      <div class="stat-card"><div class="stat-label">With bookings</div><div class="stat-value">${fromBooking}</div><div class="stat-sub">Linked to appointments</div></div>
    </div>
    <section class="panel">
      <div class="panel-head">
        <div>
          <span class="panel-title">Client directory</span>
          <span class="panel-date">Clients are created when you book</span>
        </div>
        <button type="button" class="btn-primary" id="addClientBtn">+ New booking</button>
      </div>
      <div class="toolbar table-toolbar">
        <div class="table-filters">
          ${filterSelect("minVisits", ui.minVisits, [
            { value: "all", label: "All visits" },
            { value: "5+", label: "5+ visits" },
            { value: "10+", label: "10+ visits" },
          ], "Visits")}
          ${filterSelect("sort", ui.sort, [
            { value: "name", label: "Name A–Z" },
            { value: "visits", label: "Most visits" },
            { value: "spent", label: "Top spenders" },
          ], "Sort")}
        </div>
        <input class="table-search" type="search" placeholder="Filter clients..." value="${ui.q}" data-table-q="clients" />
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Client</th><th>Phone</th><th>Email</th><th>Visits</th><th>Last visit</th><th>Lifetime spent</th><th></th></tr>
        </thead>
        <tbody>
          ${meta.slice.map((c) => `
            <tr>
              <td><div class="person-cell"><img src="${c.avatar}" alt=""/><div><strong>${c.name}</strong></div></div></td>
              <td>${c.phone}</td>
              <td>${c.email}</td>
              <td>${c.visits}</td>
              <td>${c.last}</td>
              <td><strong>${c.spent}</strong></td>
              <td><button type="button" class="btn-ghost book-client" data-name="${c.name}">Book</button></td>
            </tr>
          `).join("") || `<tr><td colspan="7"><div class="empty-state">No clients found.</div></td></tr>`}
        </tbody>
      </table>
      ${paginationBar(meta, "clients")}
    </section>
  `;

  document.querySelectorAll("#page-clients [data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.clients[sel.dataset.filter] = sel.value;
      tableUI.clients.page = 1;
      renderClients();
    });
  });
  bindTableSearch("clients", renderClients);
  bindPagination("clients", renderClients);

  document.getElementById("addClientBtn")?.addEventListener("click", () => openApptModal());
  document.querySelectorAll(".book-client").forEach((btn) => {
    btn.addEventListener("click", () => openApptModal({ client: btn.dataset.name }));
  });
}

function statusLabelForStaff(status) {
  return status === "active" ? "Active" : status === "off" ? "Off duty" : "On vacation";
}

function openShiftModal(idx) {
  shiftEditIdx = idx;
  const emp = staff[idx];
  if (!emp) return;
  ensureStaffShifts();
  document.getElementById("shiftModalTitle").textContent = `${emp.name}'s shifts`;
  document.getElementById("shiftModalSub").textContent = "Pick a shift for each day of the week";
  document.getElementById("shiftEditGrid").innerHTML = SHIFT_DAYS.map((d) => {
    const val = emp.shifts[d.key] || "off";
    return `
      <label class="shift-day-field">
        <span class="shift-day-label">${d.label}</span>
        <select name="${d.key}">
          ${Object.entries(SHIFT_PRESETS).map(([code, info]) => `
            <option value="${code}" ${code === val ? "selected" : ""}>${info.label} · ${info.hours}</option>
          `).join("")}
        </select>
      </label>
    `;
  }).join("");
  openModal("shiftModal");
}

function renderShiftWeekStrip(emp) {
  ensureStaffShifts();
  const today = todayShiftKey();
  return `
    <div class="shift-week" aria-label="Weekly shifts">
      ${SHIFT_DAYS.map((d) => {
        const info = shiftInfo(emp.shifts[d.key]);
        return `
          <div class="shift-chip ${info.cls} ${d.key === today ? "is-today" : ""}" title="${d.label}: ${info.label} ${info.hours}">
            <span class="shift-chip-day">${d.short}</span>
            <span class="shift-chip-hours">${info.hours === "—" ? "Off" : info.hours.replace(":00", "")}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderShiftRoster() {
  ensureStaffShifts();
  const today = todayShiftKey();
  const onShiftToday = staff.filter((s) => shiftInfo(s.shifts?.[today]).hours !== "—").length;
  return `
    <section class="panel shift-roster">
      <div class="panel-head">
        <div>
          <span class="panel-title">Weekly shifts</span>
          <span class="panel-date">${onShiftToday} on the floor today</span>
        </div>
      </div>
      <div class="shift-roster-scroll">
        <table class="shift-roster-table">
          <thead>
            <tr>
              <th>Employee</th>
              ${SHIFT_DAYS.map((d) => `<th class="${d.key === today ? "is-today" : ""}">${d.label}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${staff.map((s, idx) => `
              <tr>
                <td>
                  <button type="button" class="shift-roster-name emp-edit-shifts" data-idx="${idx}">
                    <img src="${s.avatar}" alt="" />
                    <span>${s.name}</span>
                  </button>
                </td>
                ${SHIFT_DAYS.map((d) => {
                  const info = shiftInfo(s.shifts[d.key]);
                  return `<td class="${d.key === today ? "is-today" : ""}"><span class="shift-pill ${info.cls}">${info.hours === "—" ? "Off" : info.hours}</span></td>`;
                }).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderEmployees() {
  ensureStaffShifts();
  const ui = tableUI.employees;
  let filtered = staff.map((s, idx) => ({ ...s, idx }));
  if (ui.status !== "all") filtered = filtered.filter((s) => s.status === ui.status);
  if (ui.role !== "all") filtered = filtered.filter((s) => s.role === ui.role);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    filtered = filtered.filter((s) =>
      s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.specialty.toLowerCase().includes(q)
    );
  }
  const roles = [...new Set(staff.map((s) => s.role))];
  const meta = paginate(filtered, ui.page, ui.size);
  ui.page = meta.page;
  const today = todayShiftKey();
  const onShiftToday = staff.filter((s) => shiftInfo(s.shifts?.[today]).hours !== "—").length;

  document.getElementById("page-employees").innerHTML = `
    <div class="toolbar table-toolbar">
      <div class="table-filters">
        ${filterSelect("status", ui.status, [
          { value: "all", label: "All status" },
          { value: "active", label: "Active" },
          { value: "off", label: "Off duty" },
          { value: "vacation", label: "On vacation" },
        ], "Status")}
        ${filterSelect("role", ui.role, [{ value: "all", label: "All roles" }, ...roles.map((r) => ({ value: r, label: r }))], "Role")}
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input class="table-search" type="search" placeholder="Filter team..." value="${ui.q}" data-table-q="employees" />
        <button type="button" class="btn-primary" id="addEmployeeBtn">+ Add employee</button>
      </div>
    </div>
    <div class="stats">
      <div class="stat-card"><div class="stat-label">Team size</div><div class="stat-value">${staff.length}</div><div class="stat-sub">Stylists & specialists</div></div>
      <div class="stat-card"><div class="stat-label">On duty</div><div class="stat-value">${staff.filter((s) => s.status === "active").length}</div><div class="stat-sub">Active now</div></div>
      <div class="stat-card"><div class="stat-label">Shifts today</div><div class="stat-value">${onShiftToday}</div><div class="stat-sub">Scheduled on floor</div></div>
      <div class="stat-card"><div class="stat-label">On leave</div><div class="stat-value">${staff.filter((s) => s.status === "vacation").length}</div><div class="stat-sub">Vacation</div></div>
    </div>
    ${renderShiftRoster()}
    <div class="cards-grid">
      ${meta.slice.map((s) => {
        const todayInfo = shiftInfo(s.shifts[today]);
        return `
        <article class="entity-card">
          <div class="entity-top">
            <img src="${s.avatar}" alt="${s.name}" />
            <div>
              <h3>${s.name}</h3>
              <div class="entity-role">${s.role}</div>
            </div>
            <span class="badge ${s.status}" style="margin-left:auto;">${s.label}</span>
          </div>
          <div class="entity-meta">
            <div>Specialty: <strong>${s.specialty}</strong></div>
            <div>Today: <strong class="today-shift ${todayInfo.cls}">${todayInfo.label} · ${todayInfo.hours}</strong></div>
            <div>${s.phone}</div>
            <div>${s.email}</div>
          </div>
          ${renderShiftWeekStrip(s)}
          <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn-ghost emp-edit-shifts" data-idx="${s.idx}">Edit shifts</button>
            <button type="button" class="btn-ghost emp-schedule" data-name="${s.name}">View schedule</button>
            <button type="button" class="btn-ghost emp-toggle-status" data-idx="${s.idx}">Change status</button>
          </div>
        </article>
      `;
      }).join("") || `<div class="empty-state">No employees match filters.</div>`}
    </div>
    ${paginationBar(meta, "employees")}
  `;

  document.querySelectorAll("#page-employees [data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.employees[sel.dataset.filter] = sel.value;
      tableUI.employees.page = 1;
      renderEmployees();
    });
  });
  bindTableSearch("employees", renderEmployees);
  bindPagination("employees", renderEmployees);

  document.getElementById("addEmployeeBtn")?.addEventListener("click", () => {
    document.getElementById("employeeForm").reset();
    openModal("employeeModal");
  });

  document.querySelectorAll(".emp-edit-shifts").forEach((btn) => {
    btn.addEventListener("click", () => openShiftModal(Number(btn.dataset.idx)));
  });

  document.querySelectorAll(".emp-schedule").forEach((btn) => {
    btn.addEventListener("click", () => {
      tableUI.schedule.master = btn.dataset.name;
      tableUI.schedule.page = 1;
      scheduleDay = 0;
      showPage("schedule");
      toast(`Showing ${btn.dataset.name}'s appointments`);
    });
  });

  document.querySelectorAll(".emp-toggle-status").forEach((btn) => {
    btn.addEventListener("click", () => {
      const s = staff[Number(btn.dataset.idx)];
      const order = ["active", "off", "vacation"];
      const next = order[(order.indexOf(s.status) + 1) % order.length];
      s.status = next;
      s.label = statusLabelForStaff(next);
      saveStore();
      renderEmployees();
      renderStaff();
      toast(`${s.name} → ${s.label}`);
    });
  });
}

function renderServicesPage() {
  const ui = tableUI.services;
  const categories = ["All", ...new Set(services.map((s) => s.category))];
  let list = ui.category === "All" ? [...services] : services.filter((s) => s.category === ui.category);
  if (ui.q) {
    const q = ui.q.toLowerCase();
    list = list.filter((s) => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }
  if (ui.sort === "price-high") list.sort((a, b) => Number(b.price.replace(/[^\d]/g, "")) - Number(a.price.replace(/[^\d]/g, "")));
  if (ui.sort === "price-low") list.sort((a, b) => Number(a.price.replace(/[^\d]/g, "")) - Number(b.price.replace(/[^\d]/g, "")));
  if (ui.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));

  const meta = paginate(list, ui.page, ui.size);
  ui.page = meta.page;

  document.getElementById("page-services").innerHTML = `
    <div class="toolbar table-toolbar">
      <div class="table-filters">
        ${filterSelect("category", ui.category, categories.map((c) => ({ value: c, label: c })), "Category")}
        ${filterSelect("sort", ui.sort, [
          { value: "name", label: "Name A–Z" },
          { value: "price-high", label: "Price ↓" },
          { value: "price-low", label: "Price ↑" },
        ], "Sort")}
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input class="table-search" type="search" placeholder="Filter services..." value="${ui.q}" data-table-q="services" />
        <button type="button" class="btn-primary" id="addServiceBtn">+ Add service</button>
      </div>
    </div>
    <div class="cards-grid">
      ${meta.slice.map((s) => `
        <article class="entity-card">
          <span class="tag">${s.category}</span>
          <h3 style="margin-top:12px;">${s.name}</h3>
          <p class="entity-role" style="margin-top:6px;line-height:1.4;">${s.desc}</p>
          <div class="service-price">${s.price}</div>
          <div class="service-duration">${s.duration}</div>
          <button type="button" class="btn-primary" style="margin-top:16px;" data-book-service="${s.name}">Book this</button>
        </article>
      `).join("") || `<div class="empty-state">No services match filters.</div>`}
    </div>
    ${paginationBar(meta, "services")}
  `;

  document.querySelectorAll("#page-services [data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.services[sel.dataset.filter] = sel.value;
      tableUI.services.page = 1;
      renderServicesPage();
    });
  });
  bindTableSearch("services", renderServicesPage);
  bindPagination("services", renderServicesPage);
  document.getElementById("addServiceBtn")?.addEventListener("click", () => {
    document.getElementById("serviceForm").reset();
    openModal("serviceModal");
  });
  document.querySelectorAll("[data-book-service]").forEach((btn) => {
    btn.addEventListener("click", () => openApptModal({ service: btn.dataset.bookService }));
  });
}

function renderReviewsPage() {
  const ui = tableUI.reviews;
  let list = [...reviews];
  if (ui.stars !== "all") list = list.filter((r) => r.stars === Number(ui.stars));
  if (ui.q) {
    const q = ui.q.toLowerCase();
    list = list.filter((r) =>
      r.name.toLowerCase().includes(q) || r.service.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
    );
  }
  if (ui.sort === "highest") list.sort((a, b) => b.stars - a.stars);
  if (ui.sort === "lowest") list.sort((a, b) => a.stars - b.stars);

  const meta = paginate(list, ui.page, ui.size);
  ui.page = meta.page;
  const avg = (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1);

  document.getElementById("page-reviews").innerHTML = `
    <div class="stats">
      <div class="stat-card"><div class="stat-label">Average rating</div><div class="stat-value">${avg} ★</div><div class="stat-sub">From ${reviews.length} reviews</div></div>
      <div class="stat-card"><div class="stat-label">5-star</div><div class="stat-value">${reviews.filter((r) => r.stars === 5).length}</div><div class="stat-sub">Excellent</div></div>
      <div class="stat-card"><div class="stat-label">4-star</div><div class="stat-value">${reviews.filter((r) => r.stars === 4).length}</div><div class="stat-sub">Great</div></div>
      <div class="stat-card"><div class="stat-label">This month</div><div class="stat-value">${reviews.length}</div><div class="stat-sub">New feedback</div></div>
    </div>
    <section class="panel">
      <div class="panel-head"><span class="panel-title">All reviews</span></div>
      <div class="toolbar table-toolbar">
        <div class="table-filters">
          ${filterSelect("stars", ui.stars, [
            { value: "all", label: "All ratings" },
            { value: "5", label: "5 stars" },
            { value: "4", label: "4 stars" },
            { value: "3", label: "3 stars" },
          ], "Rating")}
          ${filterSelect("sort", ui.sort, [
            { value: "newest", label: "Newest" },
            { value: "highest", label: "Highest" },
            { value: "lowest", label: "Lowest" },
          ], "Sort")}
        </div>
        <input class="table-search" type="search" placeholder="Filter reviews..." value="${ui.q}" data-table-q="reviews" />
      </div>
      ${meta.slice.map((r) => `
        <article class="review-full">
          <img src="${r.avatar}" alt="${r.name}" />
          <div style="flex:1;min-width:0;">
            <div class="review-top">
              <span class="review-name">${r.name}</span>
              <span class="review-date">${r.date}</span>
            </div>
            <div class="stars">${star().repeat(r.stars)}</div>
            <div class="review-service">${r.service}</div>
            <p class="review-text">${r.text}</p>
          </div>
        </article>
      `).join("") || `<div class="empty-state">No reviews match your filters.</div>`}
      ${paginationBar(meta, "reviews")}
    </section>
  `;

  document.querySelectorAll("#page-reviews [data-filter]").forEach((sel) => {
    sel.addEventListener("change", () => {
      tableUI.reviews[sel.dataset.filter] = sel.value;
      tableUI.reviews.page = 1;
      renderReviewsPage();
    });
  });
  bindTableSearch("reviews", renderReviewsPage);
  bindPagination("reviews", renderReviewsPage);
}

function renderSettings() {
  const s = settingsState;
  document.getElementById("page-settings").innerHTML = `
    <div class="settings-layout">
      <aside class="settings-nav panel">
        <button type="button" class="settings-nav-btn active" data-section="profile">
          ${icon("user")} Salon profile
        </button>
        <button type="button" class="settings-nav-btn" data-section="hours">
          ${icon("calendar")} Working hours
        </button>
        <button type="button" class="settings-nav-btn" data-section="booking">
          ${icon("calendarCheck")} Booking
        </button>
        <button type="button" class="settings-nav-btn" data-section="notifications">
          ${icon("bell")} Notifications
        </button>
        <button type="button" class="settings-nav-btn" data-section="payments">
          ${icon("card")} Payments
        </button>
        <button type="button" class="settings-nav-btn" data-section="security">
          ${icon("settings")} Security
        </button>
      </aside>

      <div class="settings-main">
        <section class="panel settings-section active" id="settings-profile">
          <div class="panel-head">
            <span class="panel-title">Salon profile</span>
            <button type="button" class="btn-primary settings-save">Save changes</button>
          </div>
          <div class="form-grid">
            <label class="field"><span>Salon name</span><input type="text" name="salonName" value="${s.salonName}" /></label>
            <label class="field"><span>Owner / admin</span><input type="text" name="owner" value="${s.owner}" /></label>
            <label class="field"><span>Phone</span><input type="tel" name="phone" value="${s.phone}" /></label>
            <label class="field"><span>Email</span><input type="email" name="email" value="${s.email}" /></label>
            <label class="field field-full"><span>Address</span><input type="text" name="address" value="${s.address}" /></label>
            <label class="field">
              <span>Currency</span>
              <select name="currency">
                <option value="UGX" ${s.currency === "UGX" ? "selected" : ""}>UGX — Ugandan Shilling</option>
                <option value="KES" ${s.currency === "KES" ? "selected" : ""}>KES — Kenyan Shilling</option>
                <option value="USD" ${s.currency === "USD" ? "selected" : ""}>USD — US Dollar</option>
              </select>
            </label>
            <label class="field">
              <span>Timezone</span>
              <select name="timezone">
                <option value="Africa/Kampala" ${s.timezone === "Africa/Kampala" ? "selected" : ""}>Africa/Kampala (EAT)</option>
                <option value="Africa/Nairobi" ${s.timezone === "Africa/Nairobi" ? "selected" : ""}>Africa/Nairobi (EAT)</option>
              </select>
            </label>
          </div>
        </section>

        <section class="panel settings-section" id="settings-hours">
          <div class="panel-head">
            <span class="panel-title">Working hours</span>
            <button type="button" class="btn-primary settings-save">Save changes</button>
          </div>
          <div class="form-grid">
            <label class="field"><span>Opens at</span><input type="time" name="openTime" value="${s.openTime}" /></label>
            <label class="field"><span>Closes at</span><input type="time" name="closeTime" value="${s.closeTime}" /></label>
            <label class="field">
              <span>Default slot length</span>
              <select name="slotMins">
                <option value="15" ${s.slotMins === "15" ? "selected" : ""}>15 minutes</option>
                <option value="30" ${s.slotMins === "30" ? "selected" : ""}>30 minutes</option>
                <option value="45" ${s.slotMins === "45" ? "selected" : ""}>45 minutes</option>
                <option value="60" ${s.slotMins === "60" ? "selected" : ""}>60 minutes</option>
              </select>
            </label>
            <label class="field">
              <span>Buffer between bookings</span>
              <select name="bufferMins">
                <option value="0" ${s.bufferMins === "0" ? "selected" : ""}>None</option>
                <option value="5" ${s.bufferMins === "5" ? "selected" : ""}>5 minutes</option>
                <option value="10" ${s.bufferMins === "10" ? "selected" : ""}>10 minutes</option>
                <option value="15" ${s.bufferMins === "15" ? "selected" : ""}>15 minutes</option>
              </select>
            </label>
          </div>
          <p class="settings-hint">These hours control Availability slots on the Dashboard.</p>
        </section>

        <section class="panel settings-section" id="settings-booking">
          <div class="panel-head">
            <span class="panel-title">Booking preferences</span>
            <button type="button" class="btn-primary settings-save">Save changes</button>
          </div>
          <div class="toggle-list">
            <label class="toggle-row">
              <div>
                <strong>Online booking</strong>
                <span>Let clients book available slots from Availability</span>
              </div>
              <input type="checkbox" name="onlineBooking" ${s.onlineBooking ? "checked" : ""} />
            </label>
            <label class="toggle-row">
              <div>
                <strong>Require deposit</strong>
                <span>Ask for a deposit before confirming an appointment</span>
              </div>
              <input type="checkbox" name="requireDeposit" ${s.requireDeposit ? "checked" : ""} />
            </label>
          </div>
        </section>

        <section class="panel settings-section" id="settings-notifications">
          <div class="panel-head">
            <span class="panel-title">Notifications</span>
            <button type="button" class="btn-primary settings-save">Save changes</button>
          </div>
          <div class="toggle-list">
            <label class="toggle-row">
              <div>
                <strong>SMS reminders</strong>
                <span>Send Mobile Money / SMS reminders before appointments</span>
              </div>
              <input type="checkbox" name="smsReminders" ${s.smsReminders ? "checked" : ""} />
            </label>
            <label class="toggle-row">
              <div>
                <strong>Email receipts</strong>
                <span>Email payment receipts after checkout</span>
              </div>
              <input type="checkbox" name="emailReceipts" ${s.emailReceipts ? "checked" : ""} />
            </label>
            <label class="toggle-row">
              <div>
                <strong>Review alerts</strong>
                <span>Notify when a new client review is posted</span>
              </div>
              <input type="checkbox" name="reviewAlerts" ${s.reviewAlerts ? "checked" : ""} />
            </label>
          </div>
        </section>

        <section class="panel settings-section" id="settings-payments">
          <div class="panel-head">
            <span class="panel-title">Accepted payments</span>
            <button type="button" class="btn-primary settings-save">Save changes</button>
          </div>
          <div class="toggle-list">
            <label class="toggle-row">
              <div>
                <strong>Mobile Money</strong>
                <span>MTN / Airtel Money in UGX</span>
              </div>
              <input type="checkbox" name="payMobileMoney" ${s.payMobileMoney ? "checked" : ""} />
            </label>
            <label class="toggle-row">
              <div>
                <strong>Cash</strong>
                <span>Accept cash at the salon counter</span>
              </div>
              <input type="checkbox" name="payCash" ${s.payCash ? "checked" : ""} />
            </label>
            <label class="toggle-row">
              <div>
                <strong>Card</strong>
                <span>Visa / Mastercard terminal</span>
              </div>
              <input type="checkbox" name="payCard" ${s.payCard ? "checked" : ""} />
            </label>
          </div>
        </section>

        <section class="panel settings-section" id="settings-security">
          <div class="panel-head">
            <span class="panel-title">PIN &amp; access</span>
          </div>
          <form id="pinChangeForm" class="form-grid">
            <label class="field"><span>Current PIN</span><input type="password" name="currentPin" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required placeholder="••••" autocomplete="off" /></label>
            <label class="field"><span>New PIN</span><input type="password" name="newPin" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required placeholder="4 digits" autocomplete="off" /></label>
            <label class="field"><span>Confirm new PIN</span><input type="password" name="confirmPin" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" required placeholder="4 digits" autocomplete="off" /></label>
            <div class="field field-full" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
              <button type="submit" class="btn-primary">Update PIN</button>
              <span class="settings-hint" style="margin:0;">Used to unlock the desk on this device</span>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;

  const root = document.getElementById("page-settings");
  root.querySelectorAll(".settings-nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".settings-nav-btn").forEach((b) => b.classList.remove("active"));
      root.querySelectorAll(".settings-section").forEach((sec) => sec.classList.remove("active"));
      btn.classList.add("active");
      root.querySelector(`#settings-${btn.dataset.section}`)?.classList.add("active");
    });
  });

  root.querySelectorAll(".settings-save").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".settings-section");
      section.querySelectorAll("input, select").forEach((el) => {
        if (el.type === "checkbox") settingsState[el.name] = el.checked;
        else settingsState[el.name] = el.value;
      });
      const logoText = document.querySelector(".logo-text");
      if (logoText && settingsState.salonName) logoText.textContent = settingsState.salonName;
      document.title = `${settingsState.salonName || "Hair."} — Salon Booking`;
      const loginBrand = document.getElementById("loginBrand");
      if (loginBrand) loginBrand.textContent = settingsState.salonName || "Hair.";
      saveStore();
      toast("Settings saved");
    });
  });

  root.querySelector("#pinChangeForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const current = String(fd.get("currentPin") || "");
    const next = String(fd.get("newPin") || "");
    const confirm = String(fd.get("confirmPin") || "");
    if (current !== getStoredPin()) {
      toast("Current PIN is incorrect");
      return;
    }
    if (!/^\d{4}$/.test(next)) {
      toast("New PIN must be 4 digits");
      return;
    }
    if (next !== confirm) {
      toast("New PIN does not match");
      return;
    }
    setStoredPin(next);
    e.target.reset();
    toast("PIN updated");
  });
}

function showPage(page) {
  if (!isLoggedIn()) return;
  currentPage = page;
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById(`page-${page}`)?.classList.add("active");
  document.getElementById("pageTitle").textContent = pageTitles[page] || page;
  document.querySelectorAll(".nav a").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === page);
  });
  document.getElementById("searchInput").value = "";
  document.getElementById("searchInput").placeholder =
    page === "clients" ? "Search clients..." :
    page === "payments" ? "Search payments..." :
    page === "services" ? "Search services..." :
    page === "reviews" ? "Search reviews..." :
    page === "employees" ? "Search employees..." :
    page === "schedule" ? "Search schedule..." :
    page === "settings" ? "Search settings..." :
    "Search...";

  if (page === "schedule") renderSchedule();
  if (page === "payments") renderPayments();
  if (page === "clients") renderClients();
  if (page === "employees") renderEmployees();
  if (page === "services") renderServicesPage();
  if (page === "reviews") renderReviewsPage();
  if (page === "settings") renderSettings();

  closeSidebar();
  const next = "#" + page;
  if (location.hash !== next) history.replaceState(null, "", next);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleSearch(q) {
  q = q.trim();
  const map = {
    dashboard: () => { tableUI.dashboard.q = q; tableUI.dashboard.page = 1; renderAppointments(); },
    payments: () => { tableUI.payments.q = q; tableUI.payments.page = 1; renderPayments(); },
    clients: () => { tableUI.clients.q = q; tableUI.clients.page = 1; renderClients(); },
    employees: () => { tableUI.employees.q = q; tableUI.employees.page = 1; renderEmployees(); },
    services: () => { tableUI.services.q = q; tableUI.services.page = 1; renderServicesPage(); },
    reviews: () => { tableUI.reviews.q = q; tableUI.reviews.page = 1; renderReviewsPage(); },
    schedule: () => { tableUI.schedule.q = q; tableUI.schedule.page = 1; renderSchedule(); },
  };
  map[currentPage]?.();
}

/* ——— Init ——— */
loadStore();
let storeDirty = ensureStaffShifts();
if (syncClientsFromBookings()) storeDirty = true;
appointments.forEach((a) => {
  if (STATUS_LABELS[a.status] && a.statusLabel !== STATUS_LABELS[a.status]) {
    a.statusLabel = STATUS_LABELS[a.status];
    storeDirty = true;
  }
});
if (storeDirty) saveStore();
hydrateIcons();
renderAppointments();
renderAvailability();
renderStaff();
renderDashReview();

document.getElementById("availPrev").addEventListener("click", () => {
  if (availPage > 0) { availPage--; renderAvailability(); }
});
document.getElementById("availNext").addEventListener("click", () => {
  if (availPage < getAvailPages().length - 1) { availPage++; renderAvailability(); }
});

document.getElementById("availability").addEventListener("click", (e) => {
  const dayBtn = e.target.closest(".avail-day-btn");
  if (dayBtn) {
    const dir = Number(dayBtn.dataset.dir);
    availDayOffset = (availDayOffset + dir + availDayLabels.length) % availDayLabels.length;
    scheduleDay = availDayOffset;
    renderAvailability();
    toast(availDayLabels[availDayOffset]);
    return;
  }
  const btn = e.target.closest(".slot");
  if (!btn || btn.disabled || btn.classList.contains("booked")) return;
  if (settingsState.onlineBooking === false) {
    toast("Online booking is disabled in Settings");
    return;
  }
  const card = btn.closest(".stylist-card");
  openApptModal({
    stylist: card.dataset.stylist,
    slot: btn.dataset.time || btn.textContent.trim(),
  });
});

document.getElementById("reviewPrev").addEventListener("click", () => {
  if (reviewIndex > 0) { reviewIndex--; renderDashReview(); }
});
document.getElementById("reviewNext").addEventListener("click", () => {
  if (reviewIndex < reviews.length - 1) { reviewIndex++; renderDashReview(); }
});

document.getElementById("searchInput").addEventListener("input", (e) => handleSearch(e.target.value));

document.getElementById("appointments").addEventListener("click", (e) => {
  const statusBtn = e.target.closest("[data-status-id]");
  if (statusBtn) {
    advanceStatus(statusBtn.dataset.statusId);
    return;
  }
  const btn = e.target.closest(".client-actions button");
  if (!btn) return;
  const name = btn.closest(".appt").querySelector(".client-name").textContent;
  const client = clients.find((c) => c.name === name);
  if (btn.title === "Email") {
    if (client?.email) window.location.href = `mailto:${client.email}`;
    else toast(`No email on file for ${name}`);
  } else {
    if (client?.phone) window.location.href = `tel:${client.phone.replace(/\s/g, "")}`;
    else toast(`No phone on file for ${name}`);
  }
});

document.getElementById("dashNewApptBtn")?.addEventListener("click", () => openApptModal());

/* Modals: close */
document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", () => closeAllModals());
});

/* Payment methods */
document.getElementById("payMethods")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".pay-method");
  if (!btn) return;
  selectedPayMethod = btn.dataset.method;
  document.querySelectorAll(".pay-method").forEach((b) => b.classList.toggle("active", b === btn));
});

document.getElementById("confirmPayBtn")?.addEventListener("click", completePayment);

document.getElementById("apptExistingClient")?.addEventListener("change", (e) => {
  const name = e.target.value;
  if (!name) {
    fillApptClientFields(null);
    document.getElementById("apptClientName")?.focus();
    return;
  }
  fillApptClientFields(clients.find((c) => c.name === name));
});

document.getElementById("apptForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const clientName = document.getElementById("apptClientName").value.trim();
  const clientPhone = document.getElementById("apptClientPhone").value.trim();
  const clientEmail = document.getElementById("apptClientEmail").value.trim();
  const serviceName = document.getElementById("apptService").value;
  const stylistName = document.getElementById("apptStylistValue").value;
  const slotTime = document.getElementById("apptSlotValue").value;
  if (!clientName || !clientPhone || !clientEmail || !serviceName || !stylistName || !slotTime) {
    toast("Add client details, service, stylist, and an open slot");
    return;
  }

  const service = services.find((s) => s.name === serviceName);
  const price = service?.price || "UGX 150,000";
  const visitDate = weekDays[scheduleDay]?.label || "Today";
  const client = upsertClientFromBooking({
    name: clientName,
    phone: clientPhone,
    email: clientEmail,
    price,
    visitDate,
  });
  const endHour = Number(slotTime.split(":")[0]) + 1;
  const end = `${String(endHour).padStart(2, "0")}:00`;

  appointments.unshift({
    id: nextApptId++,
    time: `${slotTime} – ${end}`,
    client: client.name,
    avatar: client.avatar,
    service: serviceName,
    master: stylistName,
    price,
    status: "confirmed",
    statusLabel: STATUS_LABELS.confirmed,
    day: scheduleDay,
  });

  markSlotBooked(stylistName, slotTime);
  saveStore();
  closeModal("apptModal");
  toast(`Booked ${client.name} · ${slotTime} with ${stylistName}`);
  renderAvailability();
  if (currentPage === "schedule") renderSchedule();
  if (currentPage === "dashboard") renderAppointments();
  if (currentPage === "clients") renderClients();
});

document.getElementById("employeeForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const status = fd.get("status");
  const name = String(fd.get("name")).trim();
  const emp = {
    name,
    avatar: avatarForName(name),
    status,
    label: statusLabelForStaff(status),
    role: String(fd.get("role")),
    phone: String(fd.get("phone")),
    email: String(fd.get("email")),
    specialty: String(fd.get("specialty")),
    shifts: defaultShifts(status === "vacation" ? "off" : "weekday-full"),
  };
  staff.unshift(emp);
  saveStore();
  closeModal("employeeModal");
  toast(`${emp.name} added to team`);
  if (currentPage === "employees") renderEmployees();
  renderStaff();
});

document.getElementById("shiftForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (shiftEditIdx == null || !staff[shiftEditIdx]) return;
  const fd = new FormData(e.target);
  const shifts = {};
  SHIFT_DAYS.forEach((d) => {
    shifts[d.key] = String(fd.get(d.key) || "off");
  });
  staff[shiftEditIdx].shifts = shifts;
  saveStore();
  closeModal("shiftModal");
  toast(`Shifts updated for ${staff[shiftEditIdx].name}`);
  if (currentPage === "employees") renderEmployees();
});

document.getElementById("clientForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  closeModal("clientModal");
  openApptModal();
  toast("Book an appointment to add a client");
});

document.getElementById("serviceForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const name = String(fd.get("name")).trim();
  const priceNum = Number(fd.get("price"));
  services.unshift({
    name,
    desc: String(fd.get("desc")),
    duration: String(fd.get("duration")),
    price: fmtUgx(priceNum),
    category: String(fd.get("category")),
  });
  saveStore();
  closeModal("serviceModal");
  toast(`${name} added to services`);
  if (currentPage === "services") renderServicesPage();
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});
overlay.addEventListener("click", closeSidebar);

/* ——— Top bar panels ——— */
const panelMap = [
  { btn: "messagesBtn", panel: "messagesPanel" },
  { btn: "notifyBtn", panel: "notifyPanel" },
  { btn: "profileBtn", panel: "profilePanel" },
];

function closeAllPanels() {
  panelMap.forEach(({ btn, panel }) => {
    const b = document.getElementById(btn);
    const p = document.getElementById(panel);
    if (b) b.setAttribute("aria-expanded", "false");
    if (p) p.hidden = true;
  });
}

function togglePanel(btnId, panelId) {
  const btn = document.getElementById(btnId);
  const panel = document.getElementById(panelId);
  const open = panel.hidden;
  closeAllPanels();
  if (open) {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
  }
}

panelMap.forEach(({ btn, panel }) => {
  document.getElementById(btn)?.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel(btn, panel);
  });
});

document.querySelectorAll("[data-close-panel]").forEach((el) => {
  el.addEventListener("click", closeAllPanels);
});

document.querySelectorAll("[data-go]").forEach((el) => {
  el.addEventListener("click", () => {
    closeAllPanels();
    showPage(el.dataset.go);
  });
});

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  closeAllPanels();
  lockApp();
  toast("Signed out");
});

document.getElementById("pinPad")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-pin]");
  if (!btn) return;
  handlePinInput(btn.dataset.pin);
});

document.addEventListener("keydown", (e) => {
  if (!document.body.classList.contains("locked")) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    handlePinInput("del");
  } else if (e.key === "Escape") {
    handlePinInput("clear");
  } else if (/^\d$/.test(e.key)) {
    handlePinInput(e.key);
  }
});

document.querySelectorAll("#messagesPanel .dropdown-item").forEach((el) => {
  el.addEventListener("click", () => {
    const name = el.querySelector("strong")?.textContent;
    closeAllPanels();
    if (name) openApptModal({ client: name });
  });
});

document.querySelectorAll("#notifyPanel .dropdown-item").forEach((el, i) => {
  el.addEventListener("click", () => {
    closeAllPanels();
    if (i === 0) showPage("schedule");
    else if (i === 1) showPage("payments");
    else showPage("reviews");
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".top-action")) closeAllPanels();
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeAllPanels();
  closeAllModals();
});

// Deep link from hash
function syncFromHash() {
  if (!isLoggedIn()) return;
  const hash = location.hash.replace("#", "");
  if (hash && pageTitles[hash] && hash !== currentPage) showPage(hash);
}
window.addEventListener("hashchange", syncFromHash);

if (isLoggedIn()) {
  unlockApp();
  if (location.hash) syncFromHash();
} else {
  lockApp();
}
