/* =========================================================
   ViralGotIt — 12 Pair Premium Colorful Jhumki Collection
   Vanilla JS: slider, zoom, countdown, live counters,
   FAQ accordion, sticky buttons, form validation, smooth scroll
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================================================
     STICKY HEADER HIDE ON SCROLL DOWN
     ========================================================= */
  (function stickyHeader() {
    var header = document.getElementById("siteHeader");
    var lastScroll = 0;
    window.addEventListener("scroll", function () {
      var current = window.scrollY;
      if (current > lastScroll && current > 140) {
        header.classList.add("hide");
      } else {
        header.classList.remove("hide");
      }
      lastScroll = current;
    }, { passive: true });
  })();

  /* =========================================================
     MOBILE NAV TOGGLE
     ========================================================= */
  (function mobileNav() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  })();

  /* =========================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================= */
  (function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId.length < 2) return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      });
    });
  })();

  /* =========================================================
     IMAGE SLIDER (thumbnails, prev/next, swipe, autoplay, zoom)
     ========================================================= */
  (function slider() {
    var track = document.getElementById("sliderTrack");
    var slides = track ? track.querySelectorAll(".slide") : [];
    var thumbs = document.querySelectorAll(".thumb");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    if (!track || slides.length === 0) return;

    var current = 0;
    var total = slides.length;
    var autoSlideTimer = null;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = "translateX(-" + (current * 100) + "%)";
      thumbs.forEach(function (t, i) {
        t.classList.toggle("active", i === current);
      });
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var idx = parseInt(thumb.getAttribute("data-index"), 10);
        goTo(idx);
        restartAuto();
      });
    });

    /* Autoplay */
    function startAuto() {
      autoSlideTimer = setInterval(next, 4500);
    }
    function restartAuto() {
      clearInterval(autoSlideTimer);
      startAuto();
    }
    startAuto();

    var sliderEl = document.getElementById("slider");
    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", function () { clearInterval(autoSlideTimer); });
      sliderEl.addEventListener("mouseleave", function () { restartAuto(); });
    }

    /* Touch swipe support */
    var touchStartX = 0;
    var touchEndX = 0;
    if (sliderEl) {
      sliderEl.addEventListener("touchstart", function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      sliderEl.addEventListener("touchend", function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          if (diff > 0) { next(); } else { prev(); }
          restartAuto();
        }
      }, { passive: true });
    }

    /* Click-to-zoom on the active slide image */
    var zoomables = track.querySelectorAll(".zoomable");
    zoomables.forEach(function (img) {
      img.addEventListener("click", function () {
        img.classList.toggle("zoomed");
      });
    });
  })();

  /* =========================================================
     GALLERY LIGHTBOX
     ========================================================= */
  (function lightbox() {
    var lb = document.getElementById("lightbox");
    var lbImg = document.getElementById("lightboxImg");
    var closeBtn = document.getElementById("lightboxClose");
    var galleryImgs = document.querySelectorAll(".gallery-img");
    if (!lb || !lbImg) return;

    galleryImgs.forEach(function (img) {
      img.addEventListener("click", function () {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add("active");
      });
    });

    function closeLightbox() { lb.classList.remove("active"); }
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  })();

  /* =========================================================
     COUNTDOWN TIMER (resets to 4 hours on load, persists per session)
     ========================================================= */
  (function countdown() {
    var hEl = document.getElementById("cd-h");
    var mEl = document.getElementById("cd-m");
    var sEl = document.getElementById("cd-s");
    if (!hEl || !mEl || !sEl) return;

    var DURATION_MS = 4 * 60 * 60 * 1000; /* 4 hours */
    var storageKey = "vgi_countdown_end";
    var endTime = sessionStorage.getItem(storageKey);

    if (!endTime || parseInt(endTime, 10) < Date.now()) {
      endTime = Date.now() + DURATION_MS;
      sessionStorage.setItem(storageKey, endTime);
    } else {
      endTime = parseInt(endTime, 10);
    }

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function tick() {
      var remaining = endTime - Date.now();
      if (remaining <= 0) {
        endTime = Date.now() + DURATION_MS;
        sessionStorage.setItem(storageKey, endTime);
        remaining = DURATION_MS;
      }
      var hours = Math.floor(remaining / (1000 * 60 * 60));
      var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      hEl.textContent = pad(hours);
      mEl.textContent = pad(minutes);
      sEl.textContent = pad(seconds);
    }
    tick();
    setInterval(tick, 1000);
  })();

  /* =========================================================
     LIVE VISITORS COUNTER
     ========================================================= */
  (function liveVisitors() {
    var el = document.getElementById("liveVisitors");
    if (!el) return;
    function randomize() {
      var val = 18 + Math.floor(Math.random() * 40); /* 18 - 57 */
      el.textContent = val;
    }
    randomize();
    setInterval(randomize, 6000);
  })();

  /* =========================================================
     STOCK LEFT COUNTER (slowly decreases, floor at 3)
     ========================================================= */
  (function stockCounter() {
    var stockEl = document.getElementById("stockLeft");
    var fillEl = document.getElementById("stockFill");
    if (!stockEl || !fillEl) return;
    var stock = 14;
    var maxStock = 20;

    function render() {
      stockEl.textContent = stock;
      fillEl.style.width = Math.max(8, (stock / maxStock) * 100) + "%";
    }
    render();

    setInterval(function () {
      if (stock > 3) {
        stock -= 1;
        render();
      }
    }, 25000);
  })();

  /* =========================================================
     RECENTLY ORDERED POPUP
     ========================================================= */
  (function recentOrders() {
    var container = document.getElementById("recentOrderPopup");
    if (!container) return;

    var names = ["Aarav", "Priya", "Rohit", "Sneha", "Kabir", "Ananya", "Vivaan", "Isha", "Aditya", "Meera", "Kavya", "Nikhil"];
    var cities = ["Lucknow", "Delhi", "Mumbai", "Jaipur", "Pune", "Kanpur", "Patna", "Indore", "Surat", "Bhopal", "Nagpur", "Varanasi"];

    function showToast() {
      var name = names[Math.floor(Math.random() * names.length)];
      var city = cities[Math.floor(Math.random() * cities.length)];
      var minutesAgo = 1 + Math.floor(Math.random() * 30);

      container.innerHTML =
        '<div class="recent-order-toast">🛍️ <strong>' + name + '</strong> from ' + city +
        ' ordered this ' + minutesAgo + ' min ago</div>';
    }

    showToast();
    setInterval(showToast, 7000);
  })();

  /* =========================================================
     FAQ ACCORDION
     ========================================================= */
  (function faqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (i) { i.classList.remove("open"); });
        if (!isOpen) item.classList.add("open");
      });
    });
  })();

  /* =========================================================
     STICKY BUY BUTTON (shows after hero, hides near order form)
     ========================================================= */
  (function stickyBuy() {
    var stickyBar = document.getElementById("stickyBuy");
    var orderSection = document.getElementById("order");
    var heroSection = document.querySelector(".hero");
    if (!stickyBar || !orderSection || !heroSection) return;

    window.addEventListener("scroll", function () {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      var orderTop = orderSection.getBoundingClientRect().top;
      var viewportH = window.innerHeight;

      if (heroBottom < 0 && orderTop > viewportH * 0.5) {
        stickyBar.classList.add("show");
      } else {
        stickyBar.classList.remove("show");
      }
    }, { passive: true });
  })();

  /* =========================================================
     QUANTITY SELECTOR + TOTAL AMOUNT
     ========================================================= */
  (function quantitySelector() {
    var qtyInput = document.getElementById("quantity");
    var minusBtn = document.getElementById("qtyMinus");
    var plusBtn = document.getElementById("qtyPlus");
    var totalEl = document.getElementById("totalAmount");
    if (!qtyInput || !minusBtn || !plusBtn || !totalEl) return;

    var UNIT_PRICE = 599;

    function updateTotal() {
      var qty = parseInt(qtyInput.value, 10) || 1;
      totalEl.textContent = "₹" + (qty * UNIT_PRICE);
    }

    minusBtn.addEventListener("click", function () {
      var qty = parseInt(qtyInput.value, 10) || 1;
      if (qty > 1) qtyInput.value = qty - 1;
      updateTotal();
    });

    plusBtn.addEventListener("click", function () {
      var qty = parseInt(qtyInput.value, 10) || 1;
      if (qty < 10) qtyInput.value = qty + 1;
      updateTotal();
    });

    updateTotal();
  })();

  /* =========================================================
     ORDER FORM VALIDATION
     ========================================================= */
  (function orderForm() {
    var form = document.getElementById("orderForm");
    if (!form) return;

    var fields = {
      name: { el: document.getElementById("name"), err: document.getElementById("err-name") },
      phone: { el: document.getElementById("phone"), err: document.getElementById("err-phone") },
      address: { el: document.getElementById("address"), err: document.getElementById("err-address") },
      state: { el: document.getElementById("state"), err: document.getElementById("err-state") },
      city: { el: document.getElementById("city"), err: document.getElementById("err-city") },
      pincode: { el: document.getElementById("pincode"), err: document.getElementById("err-pincode") }
    };

    function setError(field, message) {
      fields[field].err.textContent = message;
      fields[field].el.closest(".form-row").classList.add("error");
    }

    function clearError(field) {
      fields[field].err.textContent = "";
      fields[field].el.closest(".form-row").classList.remove("error");
    }

    function validate() {
      var valid = true;

      if (fields.name.el.value.trim().length < 3) {
        setError("name", "Please enter your full name.");
        valid = false;
      } else { clearError("name"); }

      var phoneVal = fields.phone.el.value.trim();
      if (!/^[6-9][0-9]{9}$/.test(phoneVal)) {
        setError("phone", "Enter a valid 10 digit mobile number.");
        valid = false;
      } else { clearError("phone"); }

      if (fields.address.el.value.trim().length < 10) {
        setError("address", "Please enter your complete address.");
        valid = false;
      } else { clearError("address"); }

      if (fields.state.el.value.trim().length < 2) {
        setError("state", "Please enter your state.");
        valid = false;
      } else { clearError("state"); }

      if (fields.city.el.value.trim().length < 2) {
        setError("city", "Please enter your city.");
        valid = false;
      } else { clearError("city"); }

      var pinVal = fields.pincode.el.value.trim();
      if (!/^[1-9][0-9]{5}$/.test(pinVal)) {
        setError("pincode", "Enter a valid 6 digit pincode.");
        valid = false;
      } else { clearError("pincode"); }

      return valid;
    }

    /* Live validation on blur */
    Object.keys(fields).forEach(function (key) {
      fields[key].el.addEventListener("blur", validate);
    });

    /* Phone & pincode numeric-only input */
    fields.phone.el.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
    fields.pincode.el.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstError = form.querySelector(".form-row.error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      var qty = document.getElementById("quantity").value;
      var total = document.getElementById("totalAmount").textContent;

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = "Placing Order...";
      submitBtn.disabled = true;

      const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx7wTWeMzRzJfPwKAgAxDSS-ZGX1TwKpIgkv4GhF_guHUMBpeKBkbVRduD9y51ID1b9IQ/exec";

var orderData = {
  name: fields.name.el.value.trim(),
  phone: fields.phone.el.value.trim(),
  address: fields.address.el.value.trim(),
  city: fields.city.el.value.trim(),
  state: fields.state.el.value.trim(),
  pincode: fields.pincode.el.value.trim(),
  qty: qty,
  total: total
};

fetch(WEB_APP_URL, {
  method: "POST",
  mode: "cors",
  redirect: "follow",
  headers: {
    "Content-Type": "text/plain;charset=utf-8"
  },
  body: JSON.stringify(orderData)
})
.then(function(response){
  return response.json();
})
.then(function(data){

  if(data.success){

    submitBtn.textContent = "✔ Order Placed Successfully!";

    alert(
      "Thank you " + orderData.name +
      "! Your order has been received successfully."
    );

    form.reset();
    document.getElementById("quantity").value = 1;
    document.getElementById("totalAmount").textContent = "₹599";

  }else{

    alert("Error : " + data.error);

  }

})
.catch(function(error){

  alert("Network Error\n" + error);

})
.finally(function(){

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;

});
    });
  })();

  /* =========================================================
     PRIVACY / TERMS MODAL
     ========================================================= */
  (function policyModal() {
    var modal = document.getElementById("policyModal");
    var content = document.getElementById("modalContent");
    var closeBtn = document.getElementById("modalClose");
    var privacyLink = document.getElementById("privacyLink");
    var termsLink = document.getElementById("termsLink");
    if (!modal || !content) return;

    var privacyHTML =
      "<h3>Privacy Policy</h3>" +
      "<p>ViralGotIt collects only the information needed to process and deliver your order, such as your name, phone number and address.</p>" +
      "<p>We never sell your personal data to third parties. Information is used solely for order confirmation, delivery and customer support.</p>" +
      "<p>By placing an order on this site, you consent to this collection and use of your information.</p>";

    var termsHTML =
      "<h3>Terms &amp; Conditions</h3>" +
      "<p>All orders are subject to availability. Prices displayed are inclusive of applicable taxes unless stated otherwise.</p>" +
      "<p>Cash on Delivery orders must be paid in full at the time of delivery. Replacement requests must be raised within 7 days of delivery.</p>" +
      "<p>ViralGotIt reserves the right to cancel any order suspected of fraud or abuse of the replacement policy.</p>";

    function openModal(html) {
      content.innerHTML = html;
      modal.classList.add("active");
    }
    function closeModal() { modal.classList.remove("active"); }

    if (privacyLink) privacyLink.addEventListener("click", function (e) { e.preventDefault(); openModal(privacyHTML); });
    if (termsLink) termsLink.addEventListener("click", function (e) { e.preventDefault(); openModal(termsHTML); });
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  })();

  /* =========================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================= */
  (function scrollReveal() {
    var elements = document.querySelectorAll("[data-aos]");
    if (!("IntersectionObserver" in window) || elements.length === 0) {
      elements.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(function (el) { observer.observe(el); });
  })();

});
