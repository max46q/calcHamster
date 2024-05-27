// script.js
const textBoxes = document.querySelectorAll(".text-box");
textBoxes.forEach((box, index) => {
  box.style.setProperty("--index", index);
});
