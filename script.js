
const monthNames = [
  "Januari", "Februari", "Maret", "April",
  "Mei", "Juni", "Juli", "Agustus",
  "September", "Oktober", "November", "Desember"
];

// Ganti nama file dan informasi sesuai foto milikmu.
// Januari = 0, Februari = 1, Maret = 2, ... Oktober = 9.
const testimonials = [
  {
    month: 9,
    image: "images/testimoni/Netflix-1.jpg",
    app: "Netflix",
    plan: "Premium • 3 Hari "
  },
  {
    month: 9,
    image: "images/testimoni/Netflix-2.jpg",
    app: "Netflix",
    plan: "Pro • 7 Hari"
  },
  {
    month: 9,
    image: "images/testimoni/Netflix-3.jpg",
    app: "Netflix",
    plan: "Premium • 7 Hari"
  },
  {
    month: 9,
    image: "images/testimoni/Netflix-4.jpg",
    app: "Netflix",
    plan: "Premium • 3 Hari"
  },
  {
    month: 9,
    image: "images/testimoni/Canva-1.jpg",
    app: "Canva",
    plan: "Pro • 3 Hari"
  },
];

const monthsContainer = document.getElementById("months");
const gallery = document.getElementById("gallery");
const galleryTitle = document.getElementById("galleryTitle");
const galleryCount = document.getElementById("galleryCount");
const empty = document.getElementById("empty");

const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const closeLightbox = document.getElementById("closeLightbox");

let selectedMonth = 9;

function createMonthButtons() {
  monthsContainer.innerHTML = "";

  monthNames.forEach((month, index) => {
    const button = document.createElement("button");
    button.className = "month-btn";
    button.textContent = month.slice(0, 3);
    button.type = "button";
    button.setAttribute("aria-label", month);

    button.addEventListener("click", () => {
      selectedMonth = index;
      showMonth(index);
    });

    monthsContainer.appendChild(button);
  });
}

function showMonth(month) {
  selectedMonth = month;

  gallery.innerHTML = "";
  galleryTitle.textContent = `Testimoni ${monthNames[month]} ♡`;

  const filtered = testimonials.filter(item => item.month === month);

  galleryCount.textContent =
    `${filtered.length} testimoni`;

  empty.hidden = filtered.length !== 0;

  document.querySelectorAll(".month-btn").forEach((button, index) => {
    button.classList.toggle("active", index === month);
    button.setAttribute("aria-pressed", index === month);
  });

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "testi-card";

    const wrapper = document.createElement("div");
    wrapper.className = "photo-wrapper";
    wrapper.tabIndex = 0;
    wrapper.setAttribute("role", "button");
    wrapper.setAttribute("aria-label", `Lihat foto ${item.app}`);

    const image = document.createElement("img");
    image.className = "testi-photo";
    image.src = item.image;
    image.alt = `Testimoni ${item.app}`;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.alt = `Foto tidak ditemukan: ${item.image}`;
      image.style.display = "none";
      wrapper.style.minHeight = "180px";
      wrapper.style.padding = "20px";
      wrapper.textContent = `Foto tidak ditemukan: ${item.image}`;
    });

    const watermark = document.createElement("span");
    watermark.className = "watermark";
    watermark.textContent = "WishlistZone ♡";

    wrapper.append(image, watermark);

    const info = document.createElement("div");
    info.className = "testi-info";

    const title = document.createElement("h3");
    title.textContent = item.app;

    const plan = document.createElement("p");
    plan.textContent = item.plan;

    info.append(title, plan);
    card.append(wrapper, info);
    gallery.appendChild(card);

    function openPhoto() {
      largeImage.src = item.image;
      largeImage.alt = `Testimoni ${item.app}`;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    wrapper.addEventListener("click", openPhoto);
    wrapper.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPhoto();
      }
    });
  });
}

function closePhoto() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  largeImage.src = "";
}

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closePhoto();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closePhoto();
  }
});

createMonthButtons();
showMonth(selectedMonth);

  filtered.forEach(item => {
    // kode kartu testimoni kamu tetap di sini
  });

 
function protectImages() {
  document.querySelectorAll(".photo-wrapper, .lightbox-photo")
    .forEach(wrapper => {
      if (wrapper.dataset.protectionAdded) return;
      wrapper.dataset.protectionAdded = "true";

      wrapper.addEventListener("contextmenu", event => {
        event.preventDefault();
        wrapper.classList.add("protected");

        alert("Foto WishlistZone dilindungi ♡");

        setTimeout(() => {
          wrapper.classList.remove("protected");
        }, 2500);
      });
    });
}

