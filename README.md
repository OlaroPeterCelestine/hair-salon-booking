# Hair. — Salon Booking

HTML/CSS/JS desk app for salon appointments, clients, payments, and team — priced in **UGX**.

## Run locally

```bash
python3 -m http.server 8765
```

- **Client booking (home):** http://127.0.0.1:8765/  
- **Salon desk:** http://127.0.0.1:8765/desk.html (PIN `2468`)

Bookings from the client site write into the same **localStorage** store the desk uses (`hair_salon_data`), so new appointments show as **Booked** on the schedule.

## Login

Unlock with PIN **`2468`** (change it under Settings → Security).  
PIN, session, and salon data (appointments, clients, payments, settings, slots) persist in **localStorage**.

## Features

- Dashboard appointments with status flow → payment → print receipt  
- Availability slot booking and schedule  
- Clients, employees, services, payments, reviews, settings  
- Table filters, search, and pagination  
- Local persistence — refresh keeps your desk state  

