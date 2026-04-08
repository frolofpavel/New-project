const menuButton = document.querySelector(".mobile-icon--menu");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  const menuLinks = mobileMenu.querySelectorAll("a");

  const setMenuState = (isOpen) => {
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "+";
    menuButton.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      setMenuState(false);
    }
  });
}
