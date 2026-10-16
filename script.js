
const monthNames = [
  "Januari", "Februari", "Maret", "April",
  "Mei", "Juni", "Juli", "Agustus",
  "September", "Oktober", "November", "Desember"
];

// Data contoh testimoni.
// Angka 9 berarti Oktober.
const testimonials = [
  {
    month: 9,
    image: "images/testimoni/netflix-1.jpg",
    app: "Netflix",
    plan: "Premium • 1 bulan"
  },
  {
    month: 9,
    image: "images/testimoni/capcut-1.jpg",
    app: "CapCut Pro",
    plan: "Pro • 1 bulan"
  },
  {
    month: 9,
    image: "images/testimoni/canva-1.jpg",
    app: "Canva Pro",
    plan: "Pro • 1 tahun"
  },
  {
    month: 9,
    image: "images/testimoni/spotify-1.jpg",
    app: "Spotify Premium",
    plan: "Premium • 1 bulan"
  },
  {
    month: 9,
    image: "images/testimoni/disney-1.jpg",
    app: "Disney+",
    plan: "Premium • 1 bulan"
  },
  {
    month: 9,
    image: "images/testimoni/youtube-1.jpg",
    app: "YouTube Premium",
    plan: "Individual • 1 bulan"
  }
];

const monthsElement = document.getElementById("months");
const gallery = document.getElementById("gallery");
const title = document.getElementById("galleryTitle");
const count = document.getElementById("galleryCount");
const empty = document.getElementById("empty");

const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const closeLightbox = document.getElementById("closeLightbox");

// Membuat tombol bulan
monthNames.forEach((month, index) => {
  const button = document.createElement("button");
  button.className = "month-btn";
  button.textContent = month.slice(0, 3).toUpperCase();
  button.title = month;

  button.addEventListener("click", () => showMonth(index));
  monthsElement.appendChild(button);
});

// Membuat foto dengan watermark
function createPhoto(item, className) {
  const wrapper = document.createElement("div");
  wrapper.className = "photo-wrapper";

  const photo = document.createElement("img");
  photo.className = className;
  photo.src = item.image;
  photo.alt = `Testimoni ${item.app}`;
  photo.draggable = false;
  photo.loading = "lazy";

  photo.addEventListener("dragstart", event => {
    event.preventDefault();
  });

  photo.addEventListener("error", () => {
    photo.alt = `Foto belum tersedia: ${item.app}`;
  });

  const watermark = document.createElement("span");
  watermark.className = "watermark";
  watermark.textContent = "WishlistZone ♡";

  wrapper.append(photo, watermark);
  return { wrapper, photo };
}

// Menampilkan testimoni sesuai bulan
function showMonth(monthIndex) {
  document.querySelectorAll(".month-btn").forEach((button, index) => {
    button.classList.toggle("active", index === monthIndex);
  });

  const selected = testimonials.filter(
    item => item.month === monthIndex
  );

  title.textContent = `♡ Testimoni ${monthNames[monthIndex]} ♡`;
  count.textContent = `${selected.length} testimoni pelanggan`;

  gallery.innerHTML = "";
  empty.style.display = selected.length ? "none" : "block";

  selected.forEach(item => {
    const card = document.createElement("article");
    card.className = "card";

    const { wrapper, photo } = createPhoto(item, "testi-photo");

    photo.addEventListener("click", () => {
      if (photo.naturalWidth > 0) {
        largeImage.src = item.image;
        lightbox.classList.add("show");
      }
    });

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

    const details = document.createElement("div");

    const appName = document.createElement("div");
    appName.className = "product-name";
    appName.textContent = item.app;

    const plan = document.createElement("div");
    plan.className = "product-plan";
    plan.textContent = item.plan;

    details.append(appName, plan);
    productInfo.append(details);

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const date = document.createElement("span");
    date.className = "date";
    date.textContent = `♡ ${monthNames[monthIndex]}`;

    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "♡";

    footer.append(date, heart);
    card.append(wrapper, productInfo, footer);
    gallery.appendChild(card);
  });
}

function closePhoto() {
  lightbox.classList.remove("show");
  largeImage.src = "";
}

closeLightbox.addEventListener("click", closePhoto);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closePhoto();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePhoto();
});

// Tampilkan Oktober saat website dibuka
showMonth(9);