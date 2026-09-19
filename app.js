let isDesktop = window.matchMedia("(pointer:fine)").matches;

/* ------------------------------------------------------------
   1. Marquee Animation (Content ko double karna)
   ------------------------------------------------------------ */

// Selecting both marquee
let marquee1 = document.querySelector("#mq1");
let marquee2 = document.querySelector("#mq2");

if (marquee1) {
  marquee1.innerHTML = marquee1.innerHTML + marquee1.innerHTML;
}
if (marquee2) {
  marquee2.innerHTML = marquee2.innerHTML + marquee2.innerHTML;
}

/* ------------------------------------------------------------
   2. Page Loader (0 to 100 counting)
   ------------------------------------------------------------ */
let loaderElement = document.querySelector("#loader");
let loaderNumber = document.querySelector("#lnum");
let loadingPercent = 0;

// Run after 60 milliseconds
let loaderInterval = setInterval(function () {
  loadingPercent = loadingPercent + 5; // 5 karke number barhao

  if (loadingPercent > 100) {
    loadingPercent = 100;
  }

  // Showing Number in screen (ex 005, 050, 100)
  if (loadingPercent < 10) {
    loaderNumber.textContent = "00" + loadingPercent;
  } else if (loadingPercent < 100) {
    loaderNumber.textContent = "0" + loadingPercent;
  } else {
    loaderNumber.textContent = loadingPercent;
  }

  if (loadingPercent === 100) {
    clearInterval(loaderInterval);

    setTimeout(function () {
      loaderElement.classList.add("done");
      document.body.classList.add("ready");
    }, 300); // Delay 300ms
  }
}, 60);

/* ------------------------------------------------------------
   3. Custom Smooth Cursor (Sirf Desktop ke liye)
   ------------------------------------------------------------ */
if (isDesktop) {
  document.body.classList.add("cur-on");

  let cursorDot = document.querySelector("#cdot");
  let cursorRing = document.querySelector("#cring");

  // Mouse kahan par hai, uski position save karne ke variable
  let mouseX = 0;
  let mouseY = 0;

  // Jab bhi mouse hilega, ye function chalega
  window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Chota dot form fauran mouse ki jagah par chala jayega
    cursorDot.style.transform = "translate(" + mouseX + "px, " + mouseY + "px)";
  });

  // Badi ring ko thora smoothly mouse ke piche lane ke liye
  let ringX = 0;
  let ringY = 0;

  setInterval(function () {
    // Ring ki position ko mouse ki position ke qareeb late raho
    ringX = ringX + (mouseX - ringX) * 0.2;
    ringY = ringY + (mouseY - ringY) * 0.2;

    cursorRing.style.transform = "translate(" + ringX + "px, " + ringY + "px)";
  }, 15); // Updating after 15ms

  // Hover effects
  document.addEventListener("mouseover", function (event) {
    // If user hovering in link or button
    let isLink = event.target.closest("a, button, input, textarea");
    if (isLink) {
      cursorRing.classList.add("big");
    } else {
      cursorRing.classList.remove("big");
    }

    // If user hovering in project row
    let isProject = event.target.closest(".row");
    if (isProject) {
      cursorRing.classList.add("view");
    } else {
      cursorRing.classList.remove("view");
    }
  });
}

/* ------------------------------------------------------------
   4. Top Scroll Progress Bar
   ------------------------------------------------------------ */
let progressBar = document.querySelector("#prog");

window.addEventListener("scroll", function () {
  let scrollPura =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollAbhi = document.documentElement.scrollTop;

  // Percentage calculate
  let percentage = (scrollAbhi / scrollPura) * 100;

  // Setting bar width
  progressBar.style.width = percentage + "%";
});

/* ------------------------------------------------------------
   5. Scroll Reveal Animations 
   ------------------------------------------------------------ */
let allRevealItems = document.querySelectorAll(".rv, .tli, #process");

// Checking for every element
for (let i = 0; i < allRevealItems.length; i++) {
  let item = allRevealItems[i];

  window.addEventListener("scroll", function () {
    let itemPosition = item.getBoundingClientRect().top;
    let screenHeight = window.innerHeight;

    if (itemPosition < screenHeight - 50) {
      item.classList.add("in");

      // Specific class of process section
      if (item.id === "process") {
        item.classList.add("on");
      }
    }
  });
}

/* ------------------------------------------------------------
   6. Number Count-Up Animation (Stats)
   ------------------------------------------------------------ */
let countElements = document.querySelectorAll(".cnt");

for (let i = 0; i < countElements.length; i++) {
  let element = countElements[i];
  let targetValue = parseInt(element.getAttribute("data-count"));
  let suffix = element.getAttribute("data-suf") || "";
  let currentValue = 0;

  // Count start when scrolling
  window.addEventListener("scroll", function startCount() {
    let position = element.getBoundingClientRect().top;

    if (position < window.innerHeight) {
      window.removeEventListener("scroll", startCount);

      // Simple timer base counting
      let step = Math.ceil(targetValue / 50); // setting speed

      let timer = setInterval(function () {
        currentValue = currentValue + step;

        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }

        element.textContent = currentValue + suffix;
      }, 30);
    }
  });
}

/* ------------------------------------------------------------
   7. Hero Role Text Scramble 
   ------------------------------------------------------------ */
let roleElement = document.querySelector("#role");
let rolesList = [
  "frontend developer",
  "react.js developer",
  "tailwind css enjoyer",
  "rest api integrator",
];
let roleIndex = 0;

setInterval(function () {
  // Select next role
  roleIndex = roleIndex + 1;
  if (roleIndex >= rolesList.length) {
    roleIndex = 0;
  }

  let newRole = rolesList[roleIndex];
  roleElement.textContent = newRole; // Direct changed (scramble math is hard for beginners)
}, 3000); // Run after 3 seconds

/* ------------------------------------------------------------
   8. Magnetic Buttons Effect
   ------------------------------------------------------------ */
if (isDesktop) {
  let magneticButtons = document.querySelectorAll(".mag");

  for (let i = 0; i < magneticButtons.length; i++) {
    let button = magneticButtons[i];

    button.addEventListener("mousemove", function (event) {
      let rect = button.getBoundingClientRect();
      let centerX = rect.left + rect.width / 2;
      let centerY = rect.top + rect.height / 2;

      let moveX = (event.clientX - centerX) * 0.2;
      let moveY = (event.clientY - centerY) * 0.2;

      button.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "translate(0px, 0px)"; // Reset
    });
  }
}

/* ------------------------------------------------------------
   9. Accordion (Open when clicked on project)
   ------------------------------------------------------------ */
let accordionButtons = document.querySelectorAll(".row");

for (let i = 0; i < accordionButtons.length; i++) {
  let button = accordionButtons[i];

  button.addEventListener("click", function () {
    let isOpen = button.getAttribute("aria-expanded") === "true";

    // Closing all
    for (let j = 0; j < accordionButtons.length; j++) {
      let otherBtn = accordionButtons[j];
      otherBtn.setAttribute("aria-expanded", "false");
      otherBtn.parentElement.querySelector(".panel").style.maxHeight = "0px";
    }

    // If close than open it
    if (isOpen === false) {
      button.setAttribute("aria-expanded", "true");
      let panel = button.parentElement.querySelector(".panel");
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

/* ------------------------------------------------------------
   10. Project Image Hover Preview
   ------------------------------------------------------------ */
if (isDesktop) {
  let previewBox = document.querySelector("#peek");
  let previewImage = previewBox.querySelector("img");
  let projectListContainer = document.querySelector("#rows");

  // Mouse move par box ki position set karo
  projectListContainer.addEventListener("mousemove", function (event) {
    let x = event.clientX + 20;
    let y = event.clientY - 80;
    previewBox.style.transform = "translate(" + x + "px, " + y + "px)";
  });

  // Project hovering
  projectListContainer.addEventListener("mouseover", function (event) {
    let activeRow = event.target.closest(".row");
    if (activeRow && activeRow.getAttribute("data-img")) {
      previewImage.src = activeRow.getAttribute("data-img");
      previewBox.classList.add("on");
    }
  });

  // If mouse leaving hide img
  projectListContainer.addEventListener("mouseleave", function () {
    previewBox.classList.remove("on");
  });
}

/* ------------------------------------------------------------
   11. Email Scramble on Hover
   ------------------------------------------------------------ */
let emailElement = document.querySelector("[data-scramble]");

if (emailElement) {
  let originalEmail = emailElement.textContent;
  let randomChars = "#%&@*+=—";

  emailElement.addEventListener("mouseenter", function () {
    let count = 0;
    let scrambleTimer = setInterval(function () {
      count++;

      // Creating random characters
      let fakeText = "";
      for (let i = 0; i < originalEmail.length; i++) {
        if (i < count) {
          fakeText += originalEmail[i];
        } else {
          let randomNum = Math.floor(Math.random() * randomChars.length);
          fakeText += randomChars[randomNum];
        }
      }

      emailElement.textContent = fakeText;

      if (count >= originalEmail.length) {
        clearInterval(scrambleTimer);
        emailElement.textContent = originalEmail;
      }
    }, 40);
  });
}

/* ------------------------------------------------------------
   12. Live Karachi Clock (PKT Time)
   ------------------------------------------------------------ */
setInterval(function () {
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;

  let timeString = hours + ":" + minutes + ":" + seconds + " pkt";

  let clockElement1 = document.querySelector("#clock");
  let clockElement2 = document.querySelector("#clock2");

  if (clockElement1) clockElement1.textContent = "khi — " + timeString;
  if (clockElement2) clockElement2.textContent = timeString;
}, 1000);

/* ------------------------------------------------------------
   13. Contact Form Validation (Simple If-Else)
   ------------------------------------------------------------ */
let contactForm = document.querySelector("#cform");
let toastNotification = document.querySelector("#toast");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Getting Inputs val
    let nameInput = document.querySelector("#fn");
    let emailInput = document.querySelector("#fe");
    let messageInput = document.querySelector("#fm");

    let isFormValid = true;

    // 1. Name check
    if (nameInput.value.trim().length < 2) {
      nameInput.parentElement.classList.add("bad");
      nameInput.parentElement.querySelector(".msg").textContent =
        "Please enter your name";
      isFormValid = false;
    } else {
      nameInput.parentElement.classList.remove("bad");
      nameInput.parentElement.querySelector(".msg").textContent = "";
    }

    // 2. Email check
    if (
      emailInput.value.includes("@") === false ||
      emailInput.value.includes(".") === false
    ) {
      emailInput.parentElement.classList.add("bad");
      emailInput.parentElement.querySelector(".msg").textContent =
        "Enter a valid email";
      isFormValid = false;
    } else {
      emailInput.parentElement.classList.remove("bad");
      emailInput.parentElement.querySelector(".msg").textContent = "";
    }

    // 3. Message check
    if (messageInput.value.trim().length < 10) {
      messageInput.parentElement.classList.add("bad");
      messageInput.parentElement.querySelector(".msg").textContent =
        "Message should be at least 10 characters";
      isFormValid = false;
    } else {
      messageInput.parentElement.classList.remove("bad");
      messageInput.parentElement.querySelector(".msg").textContent = "";
    }

    if (isFormValid === true) {
      let sendButton = document.querySelector("#sendBtn");
      sendButton.textContent = "sending…";

      setTimeout(function () {
        sendButton.textContent = "send message";
        contactForm.reset();

        // For Toast message
        toastNotification.textContent = "message sent — I'll reply within 24h.";
        toastNotification.classList.add("show");

        // After 3 second hide toast
        setTimeout(function () {
          toastNotification.classList.remove("show");
        }, 3000);
      }, 1000);
    }
  });
}

/* ------------------------------------------------------------
   14. Utilities (CV Print & Current Year)
   ------------------------------------------------------------ */
let cvButton = document.querySelector("#cvBtn");
if (cvButton) {
  cvButton.addEventListener("click", function (event) {
    event.preventDefault();
    window.print();
  });
}

let yearElement = document.querySelector("#yr");
if (yearElement) {
  let currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
}
