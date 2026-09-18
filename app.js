/* ============================================================
   IMPORTANT: SARA CONTENT HTML ME HAI — YAHAN SIRF
   BEHAVIOR/ANIMATIONS HAIN.
   ============================================================ */

// Check agar user mouse/cursor use kar raha hai 
const isDesktop = window.matchMedia("(pointer:fine)").matches;

/* ------------------------------------------------------------
   1. Marquee Animation (Seamless Infinite Loop)
   ------------------------------------------------------------ */
// Content double, taake animation smoothly chale
const marqueeIds = ["#mq1", "#mq2"];
marqueeIds.forEach((id) => {
  const marqueeElement = document.querySelector(id);
  if (marqueeElement) {
    marqueeElement.innerHTML += marqueeElement.innerHTML;
  }
});

/* ------------------------------------------------------------
   2. Page Loader (000 → 100 Counter)
   ------------------------------------------------------------ */
const loaderElement = document.querySelector("#loader");
const loaderNumber = document.querySelector("#lnum");
let loadingPercent = 0;

const loaderInterval = setInterval(() => {
  loadingPercent = Math.min(
    100,
    loadingPercent + Math.floor(Math.random() * 11) + 5,
  );

  loaderNumber.textContent = String(loadingPercent).padStart(3, "0");

  if (loadingPercent >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      loaderElement.classList.add("done");
      document.body.classList.add("ready");
    }, 280);
  }
}, 65);

/* ------------------------------------------------------------
   3. Custom Smooth Cursor
   ------------------------------------------------------------ */
if (isDesktop) {
  document.body.classList.add("cur-on");

  const cursorDot = document.querySelector("#cdot");
  const cursorRing = document.querySelector("#cring");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  // Mouse move hone par dot ko instantly move karna
  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Ring ko halki smooth lag ke saath peeche lana (Lerp effect)
  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursorRing);
  }
  renderCursorRing();

  // Links/Buttons par hover karte waqt cursor style change karna
  document.addEventListener("mouseover", (event) => {
    const isProjectRow = !!event.target.closest(".row");
    const isInteractive = !!event.target.closest("a, button, input, textarea");

    cursorRing.classList.toggle("view", isProjectRow);
    cursorRing.classList.toggle("big", isInteractive);
  });
}

/* ------------------------------------------------------------
   4. Top Scroll Progress Bar
   ------------------------------------------------------------ */
const progressBar = document.querySelector("#prog");

window.addEventListener(
  "scroll",
  () => {
    const doc = document.documentElement;
    const totalScrollableHeight = doc.scrollHeight - doc.clientHeight;
    const currentScrollPercentage =
      (doc.scrollTop / totalScrollableHeight) * 100;

    progressBar.style.width = currentScrollPercentage + "%";
  },
  { passive: true },
);

/* ------------------------------------------------------------
   5. Scroll Reveal Animations
   ------------------------------------------------------------ */
// Every reveal element ko delay assign karna
const sections = document.querySelectorAll("section");
sections.forEach((sec) => {
  const revealElements = sec.querySelectorAll(".rv");
  revealElements.forEach((el, index) => {
    const delay = Math.min(index * 90, 420);
    el.style.setProperty("--d", delay + "ms");
  });
});

// Screen par aate hi animation trigger karna
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

const allRevealItems = document.querySelectorAll(".rv, .tli");
allRevealItems.forEach((el) => revealObserver.observe(el));

/* ------------------------------------------------------------
   6. Number Count-Up Animation (Stats Section)
   ------------------------------------------------------------ */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      counterObserver.unobserve(entry.target);
      const element = entry.target;
      const targetValue = Number(element.dataset.count);
      const suffix = element.dataset.suf || "";
      const startTime = performance.now();
      const duration = 1500;

      function updateCounter(currentTime) {
        const progress = Math.min(1, (currentTime - startTime) / duration);
        // Ease-out formula for smooth ending
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        element.textContent =
          Math.round(targetValue * easeOutProgress) + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });
  },
  { threshold: 0.6 },
);

const countElements = document.querySelectorAll(".cnt");
countElements.forEach((el) => counterObserver.observe(el));

/* ------------------------------------------------------------
   7. Hero Role Text Scramble
   ------------------------------------------------------------ */
const roleElement = document.querySelector("#role");
const rolesList = roleElement.dataset.roles.split(",").map((str) => str.trim());
let currentRoleIndex = 0;

function scrambleTextTo(targetText) {
  const randomChars = "#%&@*+=—/";
  let frame = 0;

  function animateFrame() {
    frame++;
    const scrambled = targetText
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < frame / 2) return char;
        return randomChars[Math.floor(Math.random() * randomChars.length)];
      })
      .join("");

    roleElement.textContent = scrambled;

    if (frame / 2 < targetText.length) {
      requestAnimationFrame(animateFrame);
    } else {
      roleElement.textContent = targetText;
    }
  }
  animateFrame();
}

setInterval(() => {
  currentRoleIndex = (currentRoleIndex + 1) % rolesList.length;
  scrambleTextTo(rolesList[currentRoleIndex]);
}, 2800);

/* ------------------------------------------------------------
   8. Magnetic Buttons Effect
   ------------------------------------------------------------ */
if (isDesktop) {
  const magneticButtons = document.querySelectorAll(".mag");

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const moveX = (event.clientX - rect.left - rect.width / 2) * 0.25;
      const moveY = (event.clientY - rect.top - rect.height / 2) * 0.25;
      button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

/* ------------------------------------------------------------
   9. Accordion (One Open at a Time)
   ------------------------------------------------------------ */
const accordionButtons = document.querySelectorAll(".row");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isCurrentlyOpen = button.getAttribute("aria-expanded") === "true";

    // Baqi sabhi open panels ko close kar do
    accordionButtons.forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.setAttribute("aria-expanded", "false");
        const panel = otherButton.parentElement.querySelector(".panel");
        panel.style.maxHeight = "0px";
      }
    });

    // Current panel ko toggle karo
    button.setAttribute("aria-expanded", String(!isCurrentlyOpen));
    const currentPanel = button.parentElement.querySelector(".panel");
    currentPanel.style.maxHeight = isCurrentlyOpen
      ? "0px"
      : currentPanel.scrollHeight + "px";
  });
});

/* ------------------------------------------------------------
   10. Project Image Hover Preview
   ------------------------------------------------------------ */
if (isDesktop) {
  const previewBox = document.querySelector("#peek");
  const previewImage = previewBox.querySelector("img");
  const projectListContainer = document.querySelector("#rows");

  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;

  projectListContainer.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  projectListContainer.addEventListener("mouseover", (event) => {
    const activeRow = event.target.closest(".row");
    if (activeRow && activeRow.dataset.img) {
      if (previewImage.src !== activeRow.dataset.img) {
        previewImage.src = activeRow.dataset.img;
      }
      previewBox.classList.add("on");
    }
  });

  projectListContainer.addEventListener("mouseleave", () => {
    previewBox.classList.remove("on");
  });

  function renderPreviewPosition() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    const rotation = (targetX - currentX) * 0.04;

    previewBox.style.transform = `translate(${currentX + 28}px, ${currentY - 95}px) rotate(${rotation}deg)`;
    requestAnimationFrame(renderPreviewPosition);
  }
  renderPreviewPosition();
}

/* ------------------------------------------------------------
   11. Process Section Draw Animation
   ------------------------------------------------------------ */
const processSection = document.querySelector("#process");

if (processSection) {
  const processObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  processObserver.observe(processSection);
}

/* ------------------------------------------------------------
   12. Email Scramble on Hover
   ------------------------------------------------------------ */
const scrambleElements = document.querySelectorAll("[data-scramble]");

scrambleElements.forEach((element) => {
  const originalText = element.textContent;
  let animationFrameId;

  element.addEventListener("mouseenter", () => {
    cancelAnimationFrame(animationFrameId);
    const randomChars = "#%&@*+=—";
    let frame = 0;

    function animateHoverText() {
      frame++;
      const scrambled = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < frame / 1.5) return char;
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        })
        .join("");

      element.textContent = scrambled;

      if (frame / 1.5 < originalText.length) {
        animationFrameId = requestAnimationFrame(animateHoverText);
      } else {
        element.textContent = originalText;
      }
    }
    animateHoverText();
  });
});

/* ------------------------------------------------------------
   13. Live Karachi Clock (PKT Time)
   ------------------------------------------------------------ */
const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Karachi",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

setInterval(() => {
  const currentTimeString = timeFormatter.format(new Date()) + " pkt";

  const clockElement1 = document.querySelector("#clock");
  const clockElement2 = document.querySelector("#clock2");

  if (clockElement1) clockElement1.textContent = "khi — " + currentTimeString;
  if (clockElement2) clockElement2.textContent = currentTimeString;
}, 1000);

/* ------------------------------------------------------------
   14. Contact Form Validation & Toast Notification
   ------------------------------------------------------------ */
const contactForm = document.querySelector("#cform");
const toastNotification = document.querySelector("#toast");

function displayToast(message) {
  toastNotification.textContent = message;
  toastNotification.classList.add("show");

  clearTimeout(toastNotification._timer);
  toastNotification._timer = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 3200);
}

function validateField(fieldId, errorMessage) {
  const inputElement = document.getElementById(fieldId);
  const parentContainer = inputElement.parentElement;
  const messageBox = parentContainer.querySelector(".msg");

  const hasError = !!errorMessage;
  parentContainer.classList.toggle("bad", hasError);
  messageBox.textContent = errorMessage || "";

  return !hasError;
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullNameInput = document.querySelector("#fn").value.trim();
    const emailInput = document.querySelector("#fe").value.trim();
    const messageInput = document.querySelector("#fm").value.trim();

    const isNameValid = validateField(
      "fn",
      fullNameInput.length >= 2 ? "" : "Please enter your name",
    );
    const isEmailValid = validateField(
      "fe",
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)
        ? ""
        : "Enter a valid email",
    );
    const isMessageValid = validateField(
      "fm",
      messageInput.length >= 10
        ? ""
        : "Message should be at least 10 characters",
    );

    if (isNameValid && isEmailValid && isMessageValid) {
      const sendButton = document.querySelector("#sendBtn");
      sendButton.textContent = "sending…";
      sendButton.disabled = true;

      setTimeout(() => {
        sendButton.textContent = "send message";
        sendButton.disabled = false;
        contactForm.reset();
        displayToast("message sent — I'll reply within 24h.");
      }, 900);
    }
  });
}

/* ------------------------------------------------------------
   15. Utilities (CV Print & Current Year)
   ------------------------------------------------------------ */
const cvButton = document.querySelector("#cvBtn");
if (cvButton) {
  cvButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.print();
  });
}

const yearElement = document.querySelector("#yr");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
