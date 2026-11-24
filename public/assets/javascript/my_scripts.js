/*
 * -----------------------------------------------------------------------------
 * Name: my_scripts.js
 * Summary: Recruiter interactions, PT/EN language switching, theme persistence,
 *          scroll-spy navigation, clipboard copy, and synchronized PDF links.
 * Author: Alexsander Lopes Camargos
 * License: MIT
 * -----------------------------------------------------------------------------
 */

(() => {
    "use strict";

    const PDF_FILES = {
        pt: {
            href: "assets/pdf/Alexsander-Lopes-Camargos-Curriculo-PT.pdf",
            filename: "Alexsander-Lopes-Camargos-Curriculo-PT.pdf",
            title: "Alexsander Lopes Camargos | Cientista de Dados Sênior",
            ogTitle:
                "Alexsander Lopes Camargos | Cientista de Dados Sênior · Engenharia de Dados & BI",
            description:
                "Currículo formal de Alexsander Lopes Camargos — Cientista de Dados Sênior, Engenharia de Dados e Business Intelligence. Atuação no setor financeiro cooperativo (Sicoob), Python, SQL, Polars, DuckDB, dbt, Power BI, Machine Learning e formação pela USP/ESALQ.",
            ogDescription:
                "Cientista de Dados Sênior | Engenharia de Dados | Business Intelligence | Python, SQL, ETL/ELT, DuckDB, dbt, Power BI e Machine Learning.",
            langAttr: "pt-BR",
        },
        en: {
            href: "assets/pdf/Alexsander-Lopes-Camargos-Resume-EN.pdf",
            filename: "Alexsander-Lopes-Camargos-Resume-EN.pdf",
            title: "Alexsander Lopes Camargos | Senior Data Scientist",
            ogTitle:
                "Alexsander Lopes Camargos | Senior Data Scientist · Data Engineering & BI",
            description:
                "Formal resume of Alexsander Lopes Camargos — Senior Data Scientist, Data Engineering, and Business Intelligence. Cooperative financial sector experience (Sicoob), Python, SQL, Polars, DuckDB, dbt, Power BI, Machine Learning, and USP/ESALQ MBA.",
            ogDescription:
                "Senior Data Scientist | Data Engineering | Business Intelligence | Python, SQL, ETL/ELT, DuckDB, dbt, Power BI, and Machine Learning.",
            langAttr: "en",
        },
    };

    const EN_TRANSLATIONS = {
        "ui.skipLink": "Skip to main content",
        "ui.downloadPdf": "Download PDF",
        "ui.downloadPdfA4": "Download PDF (A4 · ATS)",
        "ui.currentBadge": "Current",
        "ui.inProgressBadge": "In progress",

        "nav.summary": "Summary",
        "nav.experience": "Experience",
        "nav.projects": "Projects",
        "nav.skills": "Skills",
        "nav.education": "Education",

        "masthead.eyebrow": "Formal Resume · Data Science, Data Engineering &amp; BI",
        "masthead.location": "Capelinha, MG, Brazil · Open to remote work",
        "masthead.headline":
            "Senior Data Scientist | Data Engineering | Business Intelligence",

        "kpi.eyebrow": "Business Impact",
        "kpi.acquisitionLabel": "Client acquisition",
        "kpi.acquisitionDesc":
            "Customer segmentation built from scratch for targeted campaigns",
        "kpi.automationLabel": "Critical reporting time",
        "kpi.automationDesc":
            "Automated check clearing and return monitoring with Power Query and Excel",
        "kpi.openSourceEyebrow": "Engineering &amp; Open Source",
        "kpi.projectsValue": "PyPI · 499k",
        "kpi.projectsLabel": "Scale &amp; public packages",
        "kpi.projectsDesc":
            "Predictive models validated on 499k official TSE sections and financial packages on PyPI",

        "sections.summary": "Professional Summary",
        "sections.experience": "Professional Experience",
        "sections.projects": "Featured &amp; Open-Source Projects",
        "sections.skills": "Core Skills",
        "sections.education": "Education",
        "sections.languages": "Languages",

        "summary.p1":
            "Senior data professional working end-to-end across Data Science, Data Engineering, and Business Intelligence in the cooperative financial sector.",
        "summary.p2":
            "Combine formal training in Economics, Business Administration, and Applied Statistics with reproducible engineering in Python, SQL, Polars, DuckDB, dbt, and Power BI to deliver ETL/ELT pipelines, predictive models (Scikit-learn, XGBoost, SHAP), and executive decision-support analytics. Proven track record in data governance (LGPD), risk management, and internal controls, backed by auditable GitHub projects, published PyPI packages, and an ongoing MBA in Data Science &amp; Analytics at USP/ESALQ.",

        "exp.locationCapelinha": "Capelinha, MG, Brazil",
        "exp.sicoob.tenure": "Since 03/2023",
        "exp.sicoob.employerPrint": "Sicoob Credijequitinhonha · Capelinha, MG, Brazil",
        "exp.sicoobBi.title": "Business Intelligence Analyst",
        "exp.sicoobBi.period": "03/2025 – Present",
        "exp.sicoobBi.summary":
            "Partner with business units and executive leadership to structure high-volume data, build analytical models, and support commercial and operational decisions.",
        "exp.sicoobBi.b1":
            "Built the credit union's customer segmentation from scratch, grouping client profiles to focus commercial campaigns, improve lead qualification, and drive a <strong>10% increase in new client acquisition</strong>.",
        "exp.sicoobBi.b2":
            "Designed and deployed an executive Power BI budget monitoring dashboard providing leadership with a single view of resource allocation and cost variances.",
        "exp.sicoobBi.b3":
            "Optimized SQL queries behind critical business reports, removing processing bottlenecks and enabling <strong>daily tracking of executive key performance indicators (KPIs)</strong>.",

        "exp.sicoobRisk.title": "Risk and Controls Analyst",
        "exp.sicoobRisk.period":
            '03/2023 – 03/2025<span class="period-duration"> · 2 yrs</span>',
        "exp.sicoobRisk.summary":
            "Worked across audit, accounting, and risk management to strengthen internal controls and replace manual routines with automated analytical workflows.",
        "exp.sicoobRisk.b1":
            "Led the automation of check clearing and return monitoring with Power Query and Excel, <strong>cutting critical report generation time by 90%</strong> and freeing the team for strategic analysis.",
        "exp.sicoobRisk.b2":
            "Built a real-time treasury monitoring workflow across branch units, flagging cash discrepancies immediately and strengthening loss and fraud prevention.",
        "exp.sicoobRisk.b3":
            "Produced technical operational loss and compliance reports backing Executive Board decisions and business continuity.",

        "exp.cartorio.org":
            "Real Estate Registry Office of Capelinha (Cartório de Registro de Imóveis)",
        "exp.cartorio.tenure": "7 yrs 2 mos",
        "exp.cartorio.employerPrint":
            "Real Estate Registry Office of Capelinha (Cartório de Registro de Imóveis) · Capelinha, MG, Brazil",
        "exp.cartorioCombined.title":
            "Senior Administrative Analyst &amp; Data Protection Officer (DPO)",
        "exp.cartorioCombined.period":
            '01/2016 – 03/2023<span class="period-duration"> · 7 yrs 2 mos</span>',
        "exp.cartorioCombined.summary":
            "Progressed from managing regulated document workflows to formal leadership as DPO (01/2022 – 03/2023), driving regulatory compliance and sensitive-data governance.",
        "exp.cartorioCombined.b1":
            "Led full alignment with Brazil's General Data Protection Law (LGPD), mapping data flows, redesigning storage and handling procedures, and training all staff in information security.",
        "exp.cartorioCombined.b2":
            "Authored privacy policies and managed the full lifecycle of real estate registry records under National Council of Justice (CNJ) Provision No. 50, improving accuracy, traceability, and turnaround.",

        "exp.earlierNote":
            "<strong>Earlier career (2004–2015):</strong> Risk and Internal Processes Analyst at Câmara Municipal de Angelândia (01/2013 – 12/2014), financial and project management at Sítio Córrego do Ipé (01/2004 – 11/2014), and CadÚnico Data Processing Technician at Prefeitura Municipal de Veredinha (06/2005 – 12/2005).",

        "projects.p1.title":
            "Horizonte Eleitoral — Real-Time Predictive Election Projection (TSE)",
        "projects.p1.desc":
            "Brazilian presidential projection platform combining Multilevel Regression with Poststratification (MRP), adaptive Bayesian shrinkage, and Monte Carlo simulations validated across 499,206 official TSE polling sections (0.06 pp MAE at 2% counted), sub-0.8s columnar loads, and 183 automated tests.",
        "projects.p2.title":
            "Credit Union Insolvency Prediction (Early Warning System · PEARLS)",
        "projects.p2.desc":
            "USP/ESALQ MBA thesis building a reproducible supervised Machine Learning pipeline on public Central Bank COSIF/IF.data filings (2000–2024), PEARLS financial feature engineering, out-of-time temporal validation, and SHAP explainability (XAI).",
        "projects.p3.desc":
            "End-to-end ETL/ELT pipeline (17 GitHub stars, published on PyPI) automating extraction, cleaning, schema validation, and loading of Central Bank IF.data quarterly reports into DuckDB OLAP storage and dbt Star Schema dimensional models for BI.",
        "projects.p4.title":
            "Margem Eleitoral — Statistical Polling Audit &amp; Data Storytelling (TSE)",
        "projects.p4.desc":
            "Deployed statistical audit application evaluating official TSE-registered polls via an exponentially weighted dynamic aggregator, Total Survey Error decomposition, and pollster house-effect benchmarking.",
        "projects.p5.desc":
            "Open-source Python package (16 GitHub stars, 5 forks, published on PyPI) extracting and structuring fundamental indicators, valuation multiples, and financial statements for B3-listed equities with request caching and automated tests.",

        "tags.dataModeling": "Data Modeling",
        "tags.auditAnalytics": "Audit &amp; Risk Analytics",
        "tags.internalControls": "Internal Controls",
        "tags.fraudPrevention": "Fraud Prevention",
        "tags.dataGov": "Data Governance",
        "tags.infoSec": "Information Security",
        "tags.regCompliance": "Regulatory Compliance",
        "tags.processOpt": "Process Optimization",

        "skills.dsTitle": "Data Science &amp; Machine Learning",
        "skills.timeSeries": "Time Series",
        "skills.bayesian": "Bayesian Modeling (MRP)",
        "skills.monteCarlo": "Monte Carlo Simulation",
        "skills.validation": "Temporal Validation &amp; AUC-ROC",
        "skills.engTitle": "Data Engineering &amp; Architecture",
        "skills.starSchema": "Dimensional Modeling (Star Schema)",
        "skills.biTitle": "Business Intelligence &amp; Visualization",
        "skills.storytelling": "Data Storytelling",
        "skills.kpis": "Executive KPIs",
        "skills.govTitle": "Quality, Governance &amp; Business",
        "skills.lgpd": "Data Governance (LGPD)",
        "skills.riskMgmt": "Risk Management &amp; Controls",
        "skills.bacen": "Financial Regulation (BACEN / COSIF)",
        "skills.econ": "Economic &amp; Financial Analysis",

        "edu.usp.degree": "MBA in Data Science &amp; Analytics",
        "edu.usp.school": "USP/ESALQ (University of São Paulo)",
        "edu.usp.period": "05/2025 – 03/2027",
        "edu.stat.degree": "Postgraduate Diploma in Applied Statistics",
        "edu.stat.school": "Anhanguera Educacional",
        "edu.stat.period": "04/2024 – 01/2025",
        "edu.bi.degree": "MBA in Business Intelligence",
        "edu.bi.school": "Anhanguera Educacional",
        "edu.bi.period": "03/2024 – 12/2024",
        "edu.econ.degree": "B.A. in Economics",
        "edu.econ.school": "UniCesumar",
        "edu.econ.period": "02/2022 – 12/2024",
        "edu.adm.degree": "B.B.A. in Business Administration",
        "edu.adm.school": "UNINTER International University Center",
        "edu.adm.period": "2012 – 2016",

        "langs.ptName": "Portuguese",
        "langs.ptLevel": "Native",
        "langs.enName": "English",
        "langs.enLevel":
            'Upper-Intermediate (B2 · EF SET)<span class="ext-arrow" aria-hidden="true"> ↗</span>',

        "callout.title": "ATS PDF Version &amp; Portfolio",
        "callout.text":
            "Download this resume as an A4 PDF (2 pages, selectable text, ATS-structured) or explore additional projects and write-ups on the main portfolio.",
        "callout.portfolioCta": "Portfolio alcamargos.com",

        "footer.note": "Synchronized Web &amp; ATS PDF Resume · alcamargos.com",
    };

    const EN_ATTR_TRANSLATIONS = {
        "aria.brand": "Alexsander L. Camargos, top",
        "aria.nav": "Resume sections navigation",
        "aria.langSwitch": "Resume language",
        "aria.themeToggle": "Toggle light and dark theme",
        "title.themeToggle": "Toggle theme",
        "aria.printBtn": "Print or save as PDF",
        "title.printBtn": "Print / Save PDF",
        "aria.contactStrip": "Contact details and profiles",
        "aria.copyEmail": "Copy email",
        "title.copyEmail": "Copy email",
        "aria.copyPhone": "Copy phone number",
        "title.copyPhone": "Copy phone number",
        "aria.impactStrip": "Key measurable business impact",
        "aria.appliedSkills": "Applied skills",
        "aria.sidebar": "Core technical skills and quick access",
        "aria.socialLinks": "Social links",
        "aria.backToTop": "Back to top",
        "title.backToTop": "Back to top",
    };

    const ATTR_BINDINGS = [
        { dataAttr: "data-i18n-aria-label", targetAttr: "aria-label" },
        { dataAttr: "data-i18n-title", targetAttr: "title" },
    ];

    const PT_CACHE = new Map();
    const PT_ATTR_CACHE = new Map();
    let activeLang = "pt";
    let toastTimer = null;

    /**
     * Normalize and validate a language option ("pt" or "en").
     */
    function parseLanguage(value) {
        if (!value) return null;
        const normalized = String(value).trim().toLowerCase();
        if (normalized === "en" || normalized.startsWith("en-")) return "en";
        if (normalized === "pt" || normalized.startsWith("pt-")) return "pt";
        return null;
    }

    /**
     * Normalize and validate a theme option ("light" or "dark").
     */
    function parseTheme(value) {
        if (!value) return null;
        const normalized = String(value).trim().toLowerCase();
        if (normalized === "dark" || normalized === "light") return normalized;
        return null;
    }

    /**
     * Cache initial Portuguese DOM markup and attributes so toggling languages is lossless.
     */
    function captureDefaultPortuguese() {
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (key && !PT_CACHE.has(key)) {
                PT_CACHE.set(key, el.innerHTML);
            }
        });

        ATTR_BINDINGS.forEach(({ dataAttr, targetAttr }) => {
            document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
                const key = el.getAttribute(dataAttr);
                const val = el.getAttribute(targetAttr);
                if (key && val !== null && !PT_ATTR_CACHE.has(key)) {
                    PT_ATTR_CACHE.set(key, val);
                }
            });
        });
    }

    /**
     * Apply the requested language ("pt" or "en") to UI copy, ARIA labels, metadata, and PDF links.
     */
    function applyLanguage(lang, persist = true) {
        const normalized = parseLanguage(lang) || "pt";
        activeLang = normalized;

        const meta = PDF_FILES[normalized];
        document.documentElement.lang = meta.langAttr;
        document.title = meta.title;

        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta && meta.description) {
            descMeta.setAttribute("content", meta.description);
        }

        const ogTitleMeta = document.querySelector('meta[property="og:title"]');
        if (ogTitleMeta && meta.ogTitle) {
            ogTitleMeta.setAttribute("content", meta.ogTitle);
        }

        const ogDescMeta = document.querySelector('meta[property="og:description"]');
        if (ogDescMeta && meta.ogDescription) {
            ogDescMeta.setAttribute("content", meta.ogDescription);
        }

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (!key) return;
            if (normalized === "en" && Object.prototype.hasOwnProperty.call(EN_TRANSLATIONS, key)) {
                el.innerHTML = EN_TRANSLATIONS[key];
            } else if (PT_CACHE.has(key)) {
                el.innerHTML = PT_CACHE.get(key);
            }
        });

        ATTR_BINDINGS.forEach(({ dataAttr, targetAttr }) => {
            document.querySelectorAll(`[${dataAttr}]`).forEach((el) => {
                const key = el.getAttribute(dataAttr);
                if (!key) return;
                if (
                    normalized === "en" &&
                    Object.prototype.hasOwnProperty.call(EN_ATTR_TRANSLATIONS, key)
                ) {
                    el.setAttribute(targetAttr, EN_ATTR_TRANSLATIONS[key]);
                } else if (PT_ATTR_CACHE.has(key)) {
                    el.setAttribute(targetAttr, PT_ATTR_CACHE.get(key));
                }
            });
        });

        // Update both direct PDF download CTAs so the downloaded file matches active language
        ["download-pdf-btn", "sidebar-download-pdf"].forEach((id) => {
            const link = document.getElementById(id);
            if (!link) return;
            link.setAttribute("href", meta.href);
            link.setAttribute("download", meta.filename);
        });

        // Update segmented toggle state
        document.querySelectorAll("[data-lang-option]").forEach((btn) => {
            const isSelected = btn.getAttribute("data-lang-option") === normalized;
            btn.classList.toggle("is-active", isSelected);
            btn.setAttribute("aria-pressed", String(isSelected));
        });

        if (persist) {
            try {
                window.localStorage.setItem("resume-lang", normalized);
            } catch {
                // Ignore storage restrictions in private browsing
            }
        }
    }

    /**
     * Apply and optionally persist light or dark theme (aligned with alexcamargos.github.io).
     */
    function applyTheme(theme, persist = true) {
        const normalized = parseTheme(theme) || "light";
        const isDark = normalized === "dark";
        document.documentElement.setAttribute("data-theme", normalized);
        document.documentElement.classList.toggle("dark", isDark);

        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) {
            themeMeta.setAttribute("content", isDark ? "#020617" : "#0F172A");
        }

        if (persist) {
            try {
                window.localStorage.setItem("theme", normalized);
            } catch {
                // Ignore storage restrictions
            }
        }
    }

    /**
     * Display transient status toast for clipboard copy actions.
     */
    function showToast(message) {
        const toast = document.getElementById("toast");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("is-visible");

        if (toastTimer) {
            window.clearTimeout(toastTimer);
        }
        toastTimer = window.setTimeout(() => {
            toast.classList.remove("is-visible");
        }, 2200);
    }

    /**
     * Copy text to clipboard with validated fallback for file:// or restricted contexts.
     */
    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch {
                // Fall through to legacy textarea copy path
            }
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";
        textarea.style.pointerEvents = "none";
        document.body.appendChild(textarea);
        try {
            textarea.select();
            textarea.setSelectionRange(0, text.length);
            const copied = document.execCommand("copy");
            if (!copied) {
                throw new Error("Clipboard copy rejected");
            }
        } finally {
            document.body.removeChild(textarea);
        }
    }

    /**
     * Initialize topbar scroll-spy (two-column and bottom-aware) and back-to-top button.
     */
    function initNavigationObservers() {
        const navLinks = Array.from(document.querySelectorAll(".topbar__nav .nav-link"));
        const entries = navLinks
            .map((link) => {
                const id = link.getAttribute("href")?.replace("#", "") || "";
                const el = id ? document.getElementById(id) : null;
                return el ? { id, el, link } : null;
            })
            .filter(Boolean);

        const setActiveLink = (activeId) => {
            navLinks.forEach((lnk) => {
                const isMatch = lnk.getAttribute("href") === `#${activeId}`;
                lnk.classList.toggle("is-active", isMatch);
                if (isMatch) {
                    lnk.setAttribute("aria-current", "location");
                } else {
                    lnk.removeAttribute("aria-current");
                }
            });
        };

        if (entries.length > 0) {
            const mainCol = document.querySelector(".resume-main");
            const sidebarEl = document.querySelector(".resume-sidebar");
            const skillsEntry = entries.find((item) => item.id === "competencias");

            let pinnedId = null;
            let pinnedScrollY = 0;
            let rafId = null;

            const isTwoColumn = () => {
                if (!mainCol || !sidebarEl) return false;
                return (
                    sidebarEl.getBoundingClientRect().left >
                    mainCol.getBoundingClientRect().left + 100
                );
            };

            const updateScrollSpy = () => {
                rafId = null;

                if (pinnedId) {
                    if (Math.abs(window.scrollY - pinnedScrollY) < 80) {
                        setActiveLink(pinnedId);
                        return;
                    }
                    pinnedId = null;
                }

                const twoCol = isTwoColumn();
                const flowEntries = twoCol
                    ? entries.filter((item) => item.id !== "competencias")
                    : entries;

                const scrollBottom = window.scrollY + window.innerHeight;
                const docHeight = document.documentElement.scrollHeight;
                if (docHeight - scrollBottom <= 24) {
                    setActiveLink(flowEntries[flowEntries.length - 1].id);
                    return;
                }

                const activationOffset = Math.min(200, Math.max(110, window.innerHeight * 0.24));
                let currentId = flowEntries[0].id;
                for (const item of flowEntries) {
                    if (item.el.getBoundingClientRect().top <= activationOffset) {
                        currentId = item.id;
                    }
                }
                setActiveLink(currentId);
            };

            const scheduleUpdate = () => {
                if (rafId !== null) return;
                rafId = window.requestAnimationFrame(updateScrollSpy);
            };

            entries.forEach(({ id, link }) => {
                link.addEventListener("click", (event) => {
                    if (id === "competencias" && isTwoColumn() && skillsEntry) {
                        const rect = skillsEntry.el.getBoundingClientRect();
                        const alreadyVisible =
                            rect.top >= 60 && rect.top <= window.innerHeight * 0.45;
                        if (alreadyVisible) {
                            event.preventDefault();
                        }
                        pinnedId = id;
                        pinnedScrollY = window.scrollY;
                        setActiveLink(id);
                        return;
                    }
                    pinnedId = null;
                    setActiveLink(id);
                });
            });

            window.addEventListener("scroll", scheduleUpdate, { passive: true });
            window.addEventListener("resize", scheduleUpdate, { passive: true });
            updateScrollSpy();
        }

        const backToTop = document.getElementById("back-to-top");
        if (backToTop) {
            const updateVisibility = () => {
                backToTop.classList.toggle("is-visible", window.scrollY > 360);
            };
            window.addEventListener("scroll", updateVisibility, { passive: true });
            updateVisibility();

            backToTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    /**
     * Wire all UI controls on DOMContentLoaded.
     */
    function init() {
        captureDefaultPortuguese();

        const params = new URLSearchParams(window.location.search);
        const queryLang = parseLanguage(params.get("lang"));
        const queryTheme = parseTheme(params.get("theme"));

        let savedLang = null;
        let savedTheme = null;
        try {
            savedLang = parseLanguage(window.localStorage.getItem("resume-lang"));
            savedTheme = parseTheme(window.localStorage.getItem("theme"));
        } catch {
            // Ignore storage restrictions
        }

        const initialLang = queryLang || savedLang || "pt";
        applyLanguage(initialLang, false);

        const mediaQuery = window.matchMedia
            ? window.matchMedia("(prefers-color-scheme: dark)")
            : null;
        const prefersDark = Boolean(mediaQuery && mediaQuery.matches);
        const initialTheme = queryTheme || savedTheme || (prefersDark ? "dark" : "light");
        applyTheme(initialTheme, false);

        if (mediaQuery && typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", (event) => {
                if (queryTheme) return;
                try {
                    if (parseTheme(window.localStorage.getItem("theme"))) return;
                } catch {
                    // Ignore storage restrictions
                }
                applyTheme(event.matches ? "dark" : "light", false);
            });
        }

        // Language toggle buttons
        document.querySelectorAll("[data-lang-option]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const chosen = parseLanguage(btn.getAttribute("data-lang-option"));
                if (chosen) {
                    applyLanguage(chosen, true);
                }
            });
        });

        // Theme toggle button
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                const current = document.documentElement.getAttribute("data-theme");
                applyTheme(current === "dark" ? "light" : "dark", true);
            });
        }

        // Print / Save Live PDF button
        const printBtn = document.getElementById("print-btn");
        if (printBtn) {
            printBtn.addEventListener("click", () => {
                window.print();
            });
        }

        // One-click contact copy buttons
        document.querySelectorAll(".copy-btn").forEach((btn) => {
            btn.addEventListener("click", async () => {
                const value = btn.getAttribute("data-copy");
                if (!value) return;
                try {
                    await copyToClipboard(value);
                    const label =
                        activeLang === "en"
                            ? btn.getAttribute("data-copy-label-en") || "Copied"
                            : btn.getAttribute("data-copy-label-pt") || "Copiado";
                    showToast(`${label}: ${value}`);
                } catch {
                    showToast(value);
                }
            });
        });

        initNavigationObservers();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
