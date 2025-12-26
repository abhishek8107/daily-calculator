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
const switcher = document.getElementById("themeSwitch");

// default theme
document.body.classList.add("light");

switcher.addEventListener("change", () => {
  if (switcher.checked) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
});
