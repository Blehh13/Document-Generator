# Workers Compensation Board of Manitoba (WCB) — Document Suite

A pixel-perfect, data-driven web application built with **pure HTML5, CSS3, and Vanilla JavaScript (ES Modules)** to generate, preview, dynamically edit, and print official WCB Manitoba statutory forms.

---

## 📌 Project Overview

This project was built to reproduce two complex official statutory documents with 100% visual fidelity, robust dynamic data binding, and print-ready pagination:

1. **Exercise 1 — Worker Progress Report (`Form WP`)**
   - Official progress tracking document for injured workers reporting back to the WCB.
   - Captures claim metadata, return-to-work timelines, work duty modes, subjective functional recovery status, a 1–10 visual pain checklist scale, healthcare provider history, prescribed medications, home exercise regimens, and formal certification signatures.

2. **Exercise 2 — Medical & Travel Expense Request**
   - Multi-category reimbursement claim form for out-of-pocket medical and travel expenditures.
   - Dynamically manages 6 distinct repeating expense categories:
     - **Prescription Drugs** (Drug name, prescription date, date purchased, prescriber, amount)
     - **Over-the-Counter Drugs** (Drug name, purchase date, cost, retailer, therapeutic reason)
     - **Bandages, Braces & Medical Supplies** (Item description, purchase date, prescription verification, provider, seller, amount)
     - **Parking for Medical Appointments** (Facility address, date, meter validation, meter number, cost)
     - **Mileage to Medical Appointments** (Appointment date, clinic address, employer workplace address, round-trip km calculation)
     - **Bus or Taxi Fare** (Date, starting point address, clinic destination, mode of transit, total fare)

---

## 🎥 Video Demonstrations (with PiP Narration)

As per submission criteria, both exercises feature a complete narrated walkthrough covering requirements, dynamic data behavior, code architecture, and challenge resolutions:

- 📄 **Exercise 1 Video (Worker Progress Report):**  
  [Watch Exercise 1 Demonstration on Loom](https://www.loom.com/share/4556e9d9bb5e4cda86f29487543933ee)  
  `https://www.loom.com/share/4556e9d9bb5e4cda86f29487543933ee`

- 🧾 **Exercise 2 Video (Medical & Travel Expense Request):**  
  [Watch Exercise 2 Demonstration on Loom](https://www.loom.com/share/c9d374b873f9424fab6b2fdff9d9e39b)  
  `https://www.loom.com/share/c9d374b873f9424fab6b2fdff9d9e39b`

---

## 🛠️ Tech Stack & Constraints

- **Language & Runtime:** Pure Vanilla JavaScript (ECMAScript Modern ES Modules) — **Zero TypeScript**, **Zero React/Vue/Angular**, **Zero external UI frameworks**.
- **Markup:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<table>`, `<footer>`).
- **Styling:** Custom CSS3 with standard Box Model, CSS Grid, Flexbox, custom typography scales, and print media rules (`@media print`, `@page`).
- **Graphics:** High-resolution inline vector SVG for the official WCB Manitoba logo.
- **Dev Server / Bundling:** Lightweight Vite environment for local serving and zero-config static exports.

---

## 🏗️ Architecture & Key Design Principles

```text
├── index.html          # Application entry point with navigation, toolbar, and container
├── package.json        # Project metadata and run scripts
├── PROMPTS.md          # Comprehensive AI development and prompt history log
├── README.md           # Detailed technical documentation and project guide
├── videos/             # Video walkthrough references
│   ├── exercise-1.md   # Exercise 1 video link and details
│   └── exercise-2.md   # Exercise 2 video link and details
└── src/
    ├── data.js         # Centralized data model, vector SVG logo, and dynamic presets
    ├── main.js         # Pure Vanilla JS state management, template engine, and print hooks
    └── style.css       # Clean typography, layout structure, interactive editor, and print rules
```

### 1. Centralized Data-Driven Model (`src/data.js`)
All static text and structural markup are decoupled from dynamic submission values. Every field—names, claim numbers, dates, checkboxes, ratings, and repeating tables—is driven entirely by structured JavaScript state objects.

### 2. Reactive Template Literal Renderer (`src/main.js`)
Instead of heavy virtual DOM libraries, lightweight template functions (`renderExercise1HTML`, `renderExercise2HTML`, `renderExercise1Editor`, `renderExercise2Editor`) render markup directly from state. When state changes, targeted DOM updates sync the document sheet in real time.

### 3. Print & PDF Generation System
- **Standard Letter Dimensions:** The document container is structured to match standard physical Letter paper (`8.5in x 11in`).
- **Page Break Control:** Elements use `break-inside: avoid` (and `page-break-inside: avoid`) to prevent awkward row or box splits across pages.
- **Dedicated Print Window (Blob URL):** To prevent sandboxed iframe restrictions from blocking `window.print()`, a custom Blob URL is constructed on the fly containing the self-contained printable document with automated print triggers.
- **Standalone HTML Download:** Users can export the complete self-contained printable HTML file directly to disk.

---

## 📊 Dynamic Datasets & Test Scenarios

### Exercise 1 Presets:
- **Dataset A — Minimal Baseline:**
  - *Claimant:* Madeleine Willson (Claim No. `20042047 WP`)
  - *Status:* Returned on modified duties / reduced hours. Pain rating: **2**.
- **Dataset B — Full Recovery Complete:**
  - *Claimant:* Robert Anderson (Claim No. `20054312 WP`)
  - *Status:* Returned to regular full duties. Pain rating: **1**. Discharged from physician. Maintenance home exercises.
- **Dataset C — Complex Multi-Provider Case:**
  - *Claimant:* Elena Rostova (Claim No. `20068994 WP`)
  - *Status:* Off work awaiting spinal MRI consultation. Pain rating: **7**. Active medications and twice-weekly physiotherapy.

### Exercise 2 Presets:
- **Dataset 1 — Baseline Single Row:** Single expense entry across all 6 tables.
- **Dataset 2 — Stress Test (10+ Items):** Extensive multi-item claim testing large tables, pagination resilience, and currency alignment.
- **Dataset 3 — Empty State:** Demonstrates graceful fallback handling when no expenses are incurred (`"No expenses claimed"`).

---

## 🚀 How to Run Locally

### Method 1: Using Node.js & Vite (Recommended)

1. Clone or download the repository:
   ```bash
   git clone <YOUR_REPO_URL>
   cd <REPO_DIRECTORY>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open in browser:
   Navigate to `http://localhost:3000`.

---

### Method 2: Using Any Static Server / VS Code Live Server

Because the application is written in standard HTML, CSS, and ES Modules without compilation prerequisites, you can serve it with any local server:

```bash
# Python 3
python3 -m http.server 3000

# npx serve
npx serve .

# VS Code
# Right-click 'index.html' -> "Open with Live Server"
```

---

## 💻 Interactive UI Features

1. **Exercise Switcher (Top Header):** One-click toggle between Exercise 1 and Exercise 2.
2. **View Mode Toggle:**
   - **Document View:** Full-page official view of the document.
   - **Split View:** Real-time side-by-side view with live editor on the left and preview on the right.
   - **Live Editor:** Dedicated data manipulation form allowing real-time edits, row insertions, and deletions.
3. **Preset Dropdown:** Instant dataset switching with toast feedback.
4. **Zoom Controls:** Adjustable zoom scale (50% to 150%) for viewing on different screen sizes.
5. **Print Toolbar:**
   - `🖨️ Print / PDF`: Direct browser print trigger.
   - `↗️ Print in New Tab`: Opens isolated print tab for reliable PDF export.
   - `💾 Save HTML`: Downloads standalone print-ready HTML file.

---

## 📝 AI Development Transparency

Detailed logs of all engineering prompts, design iterations, and audit cycles are documented in [`PROMPTS.md`](./PROMPTS.md).
