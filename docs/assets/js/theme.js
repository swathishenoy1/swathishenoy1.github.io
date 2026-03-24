(function () {
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var icon = document.querySelector(".theme-toggle__icon");

  if (!toggle) return;

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    icon.textContent = theme === "light" ? "☀" : "☾";
  }

  var initial = root.getAttribute("data-theme") || "dark";
  setTheme(initial);

  toggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
})();
