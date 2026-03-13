export function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", theme);
}

export function changeTheme() {
  let theme = localStorage.getItem("theme") || "light";
  theme = theme == "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
