const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  if (current === "home") {
    document.title = "Home | Daily Calculator";
  } else if (current === "calculator") {
    document.title = "Calculator | Daily Calculator";
  } else if (current === "about") {
    document.title = "About | Daily Calculator";
  }
});
console.log("JS connected");