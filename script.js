const tabData = {
  closure: {
    kicker: "Closure",
    title: "Make room for one more goodbye.",
    body:
      "Return to a captured home, street or room with the people approved for entry. Loops gives memory a place to stand.",
    image: "assets/images/vespera_closure_room.png",
    alt: "A sunlit home prepared for a private memory visit.",
    statOne: "Private participant list",
    statTwo: "Up to 14 days",
  },
  event: {
    kicker: "Events",
    title: "Relive the unforgettable with full presence.",
    body:
      "Concerts, weddings and once-only public moments can be preserved as complete environmental experiences, ready to revisit with guests, family or approved clients.",
    image: "assets/images/vespera_event_loop.png",
    alt: "Guests enjoying a preserved event at golden hour.",
    statOne: "Large-scale capture",
    statTwo: "Guest access controls",
  },
  civic: {
    kicker: "Review",
    title: "Understand decisions with complete context.",
    body:
      "Organizations can return to meetings, negotiations and critical environments with a stable record of movement, sound, light and surrounding context.",
    image: "assets/images/vespera_review_suite.png",
    alt: "Professionals reviewing a preserved memory model in a bright boardroom.",
    statOne: "Context preservation",
    statTwo: "Oversight available",
  },
  custom: {
    kicker: "Custom",
    title: "Build around a place only you understand.",
    body:
      "Private residences, retreats and meaningful locations can be captured by request, with bespoke access controls and preservation goals.",
    image: "assets/images/vespera_consultation.png",
    alt: "A Vespera advisor welcoming clients in a bright consultation suite.",
    statOne: "Bespoke capture radius",
    statTwo: "Advisor-led setup",
  },
};

const tabButtons = document.querySelectorAll("[data-tab]");
const tabImage = document.querySelector("#tab-image");
const tabKicker = document.querySelector("#tab-kicker");
const tabTitle = document.querySelector("#tab-title");
const tabBody = document.querySelector("#tab-body");
const tabStatOne = document.querySelector("#tab-stat-one");
const tabStatTwo = document.querySelector("#tab-stat-two");

function selectTab(key) {
  const item = tabData[key];
  if (!item) return;

  tabButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === key);
  });

  tabImage.src = item.image;
  tabImage.alt = item.alt;
  tabKicker.textContent = item.kicker;
  tabTitle.textContent = item.title;
  tabBody.textContent = item.body;
  tabStatOne.textContent = item.statOne;
  tabStatTwo.textContent = item.statTwo;

  tabImage.classList.remove("is-glitching");
  window.requestAnimationFrame(() => tabImage.classList.add("is-glitching"));
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => selectTab(button.dataset.tab));
});

const radiusInput = document.querySelector("#radius");
const daysInput = document.querySelector("#days");
const typeInput = document.querySelector("#loop-type");
const radiusOutput = document.querySelector("#radius-output");
const daysOutput = document.querySelector("#days-output");
const fill = document.querySelector("#coherence-fill");
const coherenceLabel = document.querySelector("#coherence-label");
const consoleNote = document.querySelector("#console-note");

function updateConsole() {
  const radius = Number(radiusInput.value);
  const days = Number(daysInput.value);
  const complexityByType = {
    closure: 4,
    event: 8,
    civic: 12,
    custom: 16,
  };
  const load = radius * 34 + days * 3.2 + complexityByType[typeInput.value];
  const profile = Math.max(12, Math.round(100 - load));

  radiusOutput.textContent = radius.toFixed(1);
  daysOutput.textContent = String(days);
  fill.style.width = `${profile}%`;

  let label = "Standard";
  let note = "Recommended for private consultation.";

  if (profile < 58) {
    label = "Enhanced";
    note = "Recommended for advisor-led planning and privacy review.";
  }

  if (profile < 36) {
    label = "Bespoke";
    note = "Recommended for custom capture design and extension review.";
  }

  coherenceLabel.textContent = label;
  consoleNote.textContent = note;
}

[radiusInput, daysInput, typeInput].forEach((input) => {
  input.addEventListener("input", updateConsole);
});

updateConsole();

const legalStrip = document.querySelector("#legal-strip");
const legalToggles = document.querySelectorAll("[data-toggle-legal]");

legalToggles.forEach((button) => {
  button.addEventListener("click", () => {
    legalStrip.hidden = !legalStrip.hidden;
  });
});

const modal = document.querySelector("#access-modal");
const openModalButtons = document.querySelectorAll("[data-open-modal]");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

const veilItems = document.querySelectorAll("[data-veil]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

veilItems.forEach((item) => observer.observe(item));
