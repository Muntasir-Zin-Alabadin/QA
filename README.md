# 🚀 Advanced E2E Automation Testing Framework (UI & API)

A production-grade QA Automation Portfolio Project built using **Microsoft Playwright**, **TypeScript**, and **GitHub Actions**. This framework implements advanced test automation patterns designed to handle complex canvas rendering engines, unstable environment layers, and stateful REST API lifecycles.

---

## 🛠️ Architecture & Test Design Patterns

### 1. Embedded Flutter Web App Testing (`/tests/ui/counter.spec.ts`)

- **Technical Challenge:** The target application utilizes a custom Flutter CanvasKit compilation that completely abstracts the standard HTML DOM and Accessibility Semantics Tree, rendering traditional CSS/XPath locators and ARIA roles unavailable.
- **Engineering Solution:** Implements a dual-layered approach combining **Visual Regression Testing** (`toHaveScreenshot`) to lock layout stability, paired with **Dynamic Percentage-Based Viewport Bounds Calculations** to handle relative click targets responsively across changing resolution viewports.

### 2. E-Commerce UI Validation (`/tests/ui/ecommerce.spec.ts`)

- **Technical Challenge:** The target platform suffers from an active client-side environment state persistence defect where form submissions immediately reset the view back to empty.
- **Engineering Solution:** Employs strict user assertions to match real-world product expectations. To ensure this specific application defect does not stall or pollute the continuous integration execution loop, native `test.fail()` framework annotations are utilized to gate blocked steps cleanly while generating automated failure snapshots.

### 3. Stateless Notes REST API Testing (`/tests/api/notes.spec.ts`)

- **Technical Challenge:** Managing stateful user CRUD lifecycles (Register → Login → Create → Delete) across automated runners requires explicit header isolation to prevent Playwright's contextual overrides from dropping the required JSON data interchange formats.
- **Engineering Solution:** Structured using a fully **Stateless Data Isolation Pattern** where every test block contains its own independent user setup context. Explicit `application/json` and `Accept` header properties are structurally injected into every request, optimizing execution reliability across all independent worker threads.

---

## 📊 Core Technical Highlights Included

- **TypeScript Foundation:** Scaled completely under native Playwright TypeScript compiler guidelines.
- **API Payload Tracking:** Leverages dynamic `testInfo.attach()` parameters to embed raw JSON request and response data maps directly into execution reports.
- **Automated Visual Evidence:** Script flows generate localized `.png` screenshots automatically on failure.
- **Negative Security Boundary Scenarios:** Includes unauthorized authentication guard checkpoints verifying explicit `401 Unauthorized` API states.

---

## 🚀 How to Run the Project Locally

### 1. Prerequisite Installations

Ensure you have [Node.js](https://nodejs.org) installed, then clone the repository and run:

```bash
npm install
```

### 2. Install Playwright Automation Browser Binaries

```bash
npx playwright install
```

### 3. Generate Visual Reference Snapshot Baselines

```bash
npx playwright test --update-snapshots --workers=1
```

### 4. Execute the Full Automated Suite

```bash
npx playwright test --workers=1
```

### 5. Launch the Visual Interactive Execution Report

```bash
npx playwright show-report
```

---

## ⚙️ Continuous Integration (CI/CD)

This framework is integrated with **GitHub Actions**. On every `push` and `pull_request` to the main branches, a headless Linux cloud runner installs dependencies, spins up isolated browser layers, runs assertions sequentially, and archives the final Playwright HTML reports as downloadable workspace artifacts.
