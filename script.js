const list = document.querySelector("#song-list");
const original = [...list.children];
const buttons = document.querySelectorAll("[data-sort]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.toggle("selected", b === button));
    const mode = button.dataset.sort; // rank | year | length
    const sorted = [...original].sort((a, b) => Number(a.dataset[mode]) - Number(b.dataset[mode]));
    list.replaceChildren(...sorted);
  });
});

// ถ้ารูปใน images/ โหลดไม่ขึ้น ใช้ภาพสำรองจาก covers.js
document.querySelectorAll(".cover img").forEach((img) => {
  const backup = () => {
    const name = img.getAttribute("src").split("/").pop();
    if (typeof COVERS !== "undefined" && COVERS[name] && img.src !== COVERS[name]) img.src = COVERS[name];
  };
  img.addEventListener("error", backup);
  if (img.complete && img.naturalWidth === 0) backup();
});
