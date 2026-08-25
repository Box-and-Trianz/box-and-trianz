const projectDetails = {
  project1: {
    category: "Website project",
    title: "Jolena Events",
    summary:
      "Jolena Events is an event-planning business that delivers thoughtfully coordinated experiences for clients celebrating important occasions.",
    challenge:
      "The business needed a professional digital presence that reflected the quality of its work, clearly explained its services and packages, and made it easier for prospective clients to evaluate the brand before making an enquiry.",
    solution:
      "We developed an elegant, responsive website presenting the company’s services, event portfolio, client testimonials, and tiered packages including Signature Luxe, Elite Experience, and Prestige Collection with clear calls to action and enquiry options.",
    outcome:
      "Jolena Events gained a credible online destination that helps potential clients understand its offering, compare service options, view previous work, and begin the enquiry process with greater confidence.",
    services: ["Web strategy", "UI design", "Development"],
    image: "assets/project-images/jolena.png",
    website: "https://www.jolenaevents.com/",
  },
  project2: {
    category: "Website project",
    title: "Imek Beauty",
    summary:
      "Imek Beauty is a UK-based beauty brand offering lash-care products and accessories through a modern e-commerce website.",
    challenge:
      "The brand needed a professional online store that could present its products clearly, communicate promotions and delivery offers, and give customers a simple path from product discovery to purchase.",
    solution:
      "We created a responsive Shopify storefront with an organised product catalogue, detailed product pages, promotional offers, customer account options, social media links, and newsletter signup for product updates and community offers.",
    outcome:
      "Imek Beauty gained a polished, easy-to-manage storefront that supports direct online sales, promotional campaigns, customer engagement, and future product expansion.",
    services: ["Website design", "Development", "Integration"],
    image: "assets/project-images/imek.png",
    website: "https://imekbeauty.com/",
  },
  project3: {
    category: "Web solution",
    title: "SavorByLexi",
    summary:
      "SavorByLexi is a food and catering business offering à la carte meals, event catering, food tastings, and online ordering. We developed its main e-commerce website alongside a dedicated catering inquiry system.",
    challenge:
      "The business needed to manage two different customer journeys: customers placing regular food orders and event clients requesting customised catering. Catering estimates depended on variables such as guest count, service style, menu selections, setup, and staffing—making enquiries difficult to handle through a basic contact form.",
    solution:
      "We built a responsive WordPress and WooCommerce website with online ordering, configurable portions and pricing, secure payments, weekend pickup scheduling, and automated notifications. We also developed a dedicated inquiry system that guides catering clients through service options, event details, menu selections, and contact information while calculating preliminary estimates in real time. The platform also provides access to pricing, menu collections, and food-tasting bookings.",
    outcome:
      "SavorByLexi now has an integrated digital experience for both everyday orders and event catering. Customers can order meals directly, while catering prospects can understand pricing, build a suitable menu, receive an estimated cost, and submit a detailed enquiry. This gives the team better-qualified leads and reduces the manual back-and-forth required before preparing a formal proposal.",
    services: ["Product thinking", "Web application", "Ongoing support"],
    image: "assets/project-images/savorbylexi.png",
    website: "https://savorbylexi.com/",
  },
};
const modal = document.querySelector("#projectModal"),
  modalClose = document.querySelector("#modalClose"),
  modalBackdrop = document.querySelector("#modalBackdrop"),
  modalCta = document.querySelector("#modalCta");
let previousFocus = null;
function openProject(id) {
  const project = projectDetails[id];
  if (!project) return;
  previousFocus = document.activeElement;
  document.querySelector("#modalCategory").textContent = project.category;
  document.querySelector("#modalTitle").textContent = project.title;
  document.querySelector("#modalSummary").textContent = project.summary;
  document.querySelector("#modalChallenge").textContent = project.challenge;
  document.querySelector("#modalSolution").textContent = project.solution;
  document.querySelector("#modalOutcome").textContent = project.outcome;
  const modalImage = document.querySelector("#modalImage");
  modalImage.src = project.image;
  modalImage.alt = project.title + " project screenshot";
  document.querySelector("#modalWebsiteLink").href = project.website;
  const services = document.querySelector("#modalServices");
  services.innerHTML = "";
  project.services.forEach(function (service) {
    const item = document.createElement("li");
    item.className =
      "rounded-full bg-mist px-3 py-2 text-xs font-bold text-teal";
    item.textContent = service;
    services.appendChild(item);
  });
  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  modalClose.focus();
}
function closeProject() {
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll(".project-card").forEach(function (card) {
  card.addEventListener("click", function () {
    openProject(card.dataset.project);
  });
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});
modalClose.addEventListener("click", closeProject);
modalBackdrop.addEventListener("click", closeProject);
modalCta.addEventListener("click", closeProject);
document.addEventListener("keydown", function (event) {
  if (modal.classList.contains("hidden")) return;
  if (event.key === "Escape") {
    closeProject();
    return;
  }
  if (event.key === "Tab") {
    const focusable = [modalClose, modalCta];
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
const menuButton = document.querySelector("#menuButton"),
  mobileMenu = document.querySelector("#mobileMenu");
menuButton.addEventListener("click", function () {
  const open = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  menuButton.setAttribute("aria-expanded", String(!open));
  menuButton.querySelector("span").textContent = open ? "☰" : "×";
});
mobileMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("span").textContent = "☰";
  });
});
document.querySelectorAll(".tab").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (tab) {
      const active = tab === button;
      tab.setAttribute("aria-selected", String(active));
      tab.classList.toggle("bg-ink", active);
      tab.classList.toggle("text-white", active);
      tab.classList.toggle("text-slate", !active);
    });
    document.querySelectorAll(".panel").forEach(function (panel) {
      panel.hidden = panel.id !== button.dataset.target;
    });
  });
});
document.querySelectorAll(".faq-button").forEach(function (button) {
  button.addEventListener("click", function () {
    const item = button.closest(".faq"),
      open = item.dataset.open === "true";
    item.dataset.open = String(!open);
    button.setAttribute("aria-expanded", String(!open));
  });
});
document
  .querySelector("#contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const formNote = document.querySelector("#formNote");
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      business: data.get("business"),
      service: data.get("service"),
      message: data.get("message"),
    };
    formNote.textContent = "Sending…";
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        formNote.textContent =
          "Thanks — your message has been sent. We'll be in touch soon.";
        form.reset();
      })
      .catch(function () {
        formNote.textContent =
          "Sorry, something went wrong sending your message. Please try again or email us directly.";
      });
  });
document.querySelector("#year").textContent = new Date().getFullYear();
