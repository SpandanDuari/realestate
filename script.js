const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const listingCards = document.querySelectorAll(".listing-card");

const listingTypeLabel = {
  house: "House",
  apartment: "Apartment",
  commercial: "Commercial Property",
};

const listingDescriptions = {
  "Palm Grove Villa": "A spacious villa in New Town with landscaped surroundings, ideal for families seeking a calm premium neighborhood.",
  "Riverfront Heights": "Modern apartment with excellent connectivity to IT hubs, schools, and metro links in Salt Lake.",
  "Cyber City Office Hub": "Grade-A commercial space in Sector V with high visibility and easy access for teams and clients.",
  "Maple Garden Residency": "Large independent home in Alipore offering elegant interiors and premium neighborhood access.",
  "Metro Luxe Residency": "Compact and stylish 1 BHK in Garia, perfect for professionals and first-time buyers.",
  "Parkside Retail Arcade": "Prime retail frontage in Howrah Maidan suitable for boutique brands and high-footfall businesses.",
};

const listingModal = document.getElementById("listingModal");
const listingModalClose = document.getElementById("listingModalClose");
const listingModalImage = document.getElementById("listingModalImage");
const listingModalType = document.getElementById("listingModalType");
const listingModalTitle = document.getElementById("listingModalTitle");
const listingModalSpecs = document.getElementById("listingModalSpecs");
const listingModalLocation = document.getElementById("listingModalLocation");
const listingModalPrice = document.getElementById("listingModalPrice");
const listingModalDescription = document.getElementById("listingModalDescription");

function closeListingModal() {
  if (!listingModal) {
    return;
  }

  listingModal.classList.remove("open");
  listingModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function openListingModal(card) {
  if (
    !listingModal ||
    !listingModalImage ||
    !listingModalType ||
    !listingModalTitle ||
    !listingModalSpecs ||
    !listingModalLocation ||
    !listingModalPrice ||
    !listingModalDescription
  ) {
    return;
  }

  const title = card.querySelector("h3")?.textContent?.trim() || "Listing";
  const specs = card.querySelector(".listing-body p")?.textContent?.trim() || "";
  const price = card.querySelector(".listing-meta span:first-child")?.textContent?.trim() || "";
  const location = card.querySelector(".listing-meta span:last-child")?.textContent?.trim() || "";
  const image = card.querySelector(".listing-image");
  const imageBackground = image ? window.getComputedStyle(image).backgroundImage : "";
  const type = card.dataset.type || "property";

  listingModalType.textContent = listingTypeLabel[type] || "Property";
  listingModalTitle.textContent = title;
  listingModalSpecs.textContent = specs;
  listingModalPrice.textContent = `Price: ${price}`;
  listingModalLocation.textContent = `Location: ${location}`;
  listingModalDescription.textContent = listingDescriptions[title] || "Contact our advisors to get full property specifications, floor plans, and site-visit availability.";
  listingModalImage.style.backgroundImage = imageBackground;

  listingModal.classList.add("open");
  listingModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    listingCards.forEach((card) => {
      const show = filter === "all" || card.dataset.type === filter;
      card.style.display = show ? "block" : "none";
    });
  });
});

listingCards.forEach((card) => {
  card.addEventListener("click", () => {
    openListingModal(card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openListingModal(card);
    }
  });
});

if (listingModalClose) {
  listingModalClose.addEventListener("click", closeListingModal);
}

if (listingModal) {
  listingModal.addEventListener("click", (event) => {
    if (event.target === listingModal) {
      closeListingModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && listingModal?.classList.contains("open")) {
    closeListingModal();
  }
});

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const contactForm = document.querySelector(".contact-form");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent = "Thanks! Your inquiry has been received. Our team will contact you shortly.";
    contactForm.reset();
  });
}
