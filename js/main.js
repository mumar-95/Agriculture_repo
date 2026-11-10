(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Deep-link scroll ---------- */
  const scrollToHash = () => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;
    window.setTimeout(() => {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }, 60);
  };
  scrollToHash();
  window.addEventListener("hashchange", scrollToHash);

  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Active nav by page ---------- */
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  const pageKey =
    path === "" || path === "index.html" || path === "/"
      ? "home"
      : path.replace(/\.html$/, "");

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const key = link.getAttribute("data-nav");
    link.classList.toggle("is-active", key === pageKey);
  });

  /* ---------- Mobile navigation ---------- */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");

  const closeMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  const openMenu = () => {
    if (!nav || !toggle) return;
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };

  if (toggle && nav && menu) {
    toggle.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Stat count-up ---------- */
  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    if (!Number.isFinite(target)) return;

    if (reduceMotion) {
      el.textContent = target.toLocaleString();
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const statNums = document.querySelectorAll(".stat__num");
  if (statNums.length && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    statNums.forEach((el) => statsObserver.observe(el));
  } else {
    statNums.forEach(animateCount);
  }

  /* ---------- Contact helpers ---------- */
  const form = document.getElementById("contact-form");
  const successEl = document.getElementById("form-success");
  const messageField = document.getElementById("message");
  const INQUIRE_KEY = "gh-inquire-message";

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    contact.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const fillMessage = (message) => {
    if (!messageField) return;
    messageField.value = message;
    if (successEl) successEl.hidden = true;
    window.setTimeout(() => {
      messageField.focus();
      messageField.setSelectionRange(messageField.value.length, messageField.value.length);
    }, reduceMotion ? 0 : 200);
  };

  const inquire = (message) => {
    if (messageField) {
      fillMessage(message);
      scrollToContact();
      return;
    }
    try {
      sessionStorage.setItem(INQUIRE_KEY, message);
    } catch (_) {
      /* ignore */
    }
    window.location.href = "contact.html";
  };

  if (messageField) {
    let pending = null;
    try {
      pending = sessionStorage.getItem(INQUIRE_KEY);
      if (pending) sessionStorage.removeItem(INQUIRE_KEY);
    } catch (_) {
      /* ignore */
    }
    if (pending) fillMessage(pending);
  }

  document.querySelectorAll(".js-inquire").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const message =
        btn.getAttribute("data-message") ||
        `I am interested in ${btn.getAttribute("data-product") || "your services"}.`;
      inquire(message);
    });
  });

  /* ---------- Interactive product cards ---------- */
  const setOfferOpen = (offer, open) => {
    const details = offer.querySelector(".offer__details");
    const expandBtn = offer.querySelector(".offer__expand");
    const toggleBtn = offer.querySelector(".offer__toggle");

    offer.classList.toggle("is-open", open);

    if (details) details.hidden = !open;
    if (expandBtn) expandBtn.textContent = open ? "Hide details" : "View details";
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  document.querySelectorAll(".offer").forEach((offer) => {
    const toggleBtn = offer.querySelector(".offer__toggle");
    const expandBtn = offer.querySelector(".offer__expand");

    const toggleOffer = () => {
      setOfferOpen(offer, !offer.classList.contains("is-open"));
    };

    if (toggleBtn) {
      toggleBtn.addEventListener("click", (event) => {
        event.preventDefault();
        toggleOffer();
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleOffer();
      });
    }
  });

  /* ---------- Contact form validation ---------- */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[\d\s()+-]{7,20}$/;

  const setError = (field, message) => {
    const input = form.querySelector(`#${field}`);
    const error = form.querySelector(`[data-error-for="${field}"]`);
    if (!input || !error) return;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  };

  const clearError = (field) => {
    const input = form.querySelector(`#${field}`);
    const error = form.querySelector(`[data-error-for="${field}"]`);
    if (!input || !error) return;
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    error.textContent = "";
  };

  const validate = () => {
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    ["name", "email", "phone", "message"].forEach(clearError);

    if (!name) {
      setError("name", "Please enter your name.");
      valid = false;
    }

    if (!email) {
      setError("email", "Please enter your email.");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    }

    if (!phone) {
      setError("phone", "Please enter your phone number.");
      valid = false;
    } else if (!phonePattern.test(phone)) {
      setError("phone", "Please enter a valid phone number.");
      valid = false;
    }

    if (!message) {
      setError("message", "Please enter a message.");
      valid = false;
    } else if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      valid = false;
    }

    return valid;
  };

  if (form) {
    ["name", "email", "phone", "message"].forEach((field) => {
      const input = form.querySelector(`#${field}`);
      if (!input) return;
      input.addEventListener("input", () => clearError(field));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (successEl) successEl.hidden = true;

      if (!validate()) {
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.reset();
      if (successEl) {
        successEl.hidden = false;
        successEl.focus();
      }
    });
  }
})();
