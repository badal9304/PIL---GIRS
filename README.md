# PIL GIRS — UI Prototype

Clickable prototype of the GIRS Live Build UI Showcase screens. Designed for 1920×1080 desktop and responsive down to tablet (768px+) and mobile (360px+). Below 1024px the side panel opens from the menu button.

| Page | File |
| --- | --- |
| Operations Cockpit | `index.html` |
| Charge Processing | `charge-processing.html` |
| D&D Engine | `dd-engine.html` |
| Integration Monitor | `integration-monitor.html` |
| Document Intake | `document-intake.html` |
| Invoice List | `invoice-list-v2.html` |
| Invoice List v1 (hidden from the nav; kept for reference) | `invoice-list.html` (layouts `-b`, `-c`, `-d`) |
| Split B/L & Billed-To | `split-billing.html` |
| Manual & MISC Invoice | `manual-invoice.html` |
| Invoice Template Previewer | `invoice-previewer.html` |
| Credit Notes | `credit-notes.html` |
| DAR Console | `dar-console.html` |
| E-invoice Exceptions | `einvoice-exceptions.html` |
| Receipting | `receipting.html` |
| CashApp AI Allocation Workbench | `cashapp-workbench.html` |
| Tolerance & COREOR Release | `tolerance-coreor.html` |
| SOA & Aging Dashboard | `soa-aging.html` |
| Credit Management | `credit-management.html` |
| Customer Master | `customer-master.html` |
| Charge Master | `charge-master.html` |
| Contract Master | `contract-master.html` |
| Country Master | `country-master.html` |
| Currency Master | `currency-master.html` |
| City Master | `city-master.html` |
| Port Master | `port-master.html` |
| Tax Set-up | `tax-setup.html` |
| Exchange Rate Master | `exchange-rate-master.html` |
| Approvals Inbox | `approvals-inbox.html` |
| Enquiry & Monitoring | `enquiry.html` |
| Reconciliation | `reconciliation.html` |
| Month-End Close | `month-end.html` |
| Reports & Analytics | `reports.html` |

## Global search

The search box in the top bar (Ctrl/⌘ K or `/` from any screen) searches screens, invoices (with status), B/Ls ready to invoice, bookings, containers, vessel/voyages, customers, charge codes and master data. It lives in `girs-search.js`; its sample-data index `girs-index.js` is generated — after changing sample data run `node tools/build-search-index.js`.

## Language and appearance

Language and Light/Dark live in the profile menu and apply to every screen. English is the source; `girs-i18n.js` translates the interface — including the invoice / receipt documents on screen and in the downloaded PDF — into Chinese (Simplified), Spanish and Arabic (right-to-left) from `i18n-<lang>.js`. Chinese and Arabic PDFs are rendered as print-resolution page images because the built-in PDF fonts have no glyphs for those scripts. To add or fix a phrase, edit `tools/i18n/*.tsv` (English, Chinese, Spanish, Arabic; `#` stands for any number) and run `python3 tools/build-i18n.py`.

## Run locally

Open `index.html` through a local web server (for example the VS Code "Live Server" extension), or simply open it in a browser.

## Deploy on GitHub Pages

1. Create a new repository on GitHub and upload all files in this folder.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

All data on these screens is dummy prototype data. Values in [square brackets] are placeholders for PIL to provide.
