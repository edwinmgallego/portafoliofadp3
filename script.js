
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. MENÚ RESPONSIVO
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {

    const closeMenu = () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");

      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    };

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );

    });

    // Cerrar menú al seleccionar un enlace
    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    // Cerrar menú con Escape
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Restaurar menú al pasar a escritorio
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) {
        closeMenu();
      }
    });

  }

  /* =====================================
     2. FORMULARIO DE CONTACTO
  ===================================== */

  const contactForm = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");

  if (contactForm && feedback) {

    contactForm.addEventListener("submit", event => {

      event.preventDefault();

      const nombre = document.querySelector("#nombre");
      const email = document.querySelector("#email");
      const asunto = document.querySelector("#asunto");
      const mensaje = document.querySelector("#mensaje");

      // Limpiar mensaje anterior
      feedback.textContent = "";
      feedback.className = "form-feedback";

      // Validar campos vacíos
      if (
        !nombre.value.trim() ||
        !email.value.trim() ||
        !asunto.value.trim() ||
        !mensaje.value.trim()
      ) {
        feedback.textContent =
          "Por favor, completa todos los campos.";

        feedback.classList.add("error");
        return;
      }

      // Validar formato del correo
      if (!email.checkValidity()) {
        feedback.textContent =
          "Por favor, introduce un correo válido.";

        feedback.classList.add("error");
        email.focus();
        return;
      }

      // Demostración de envío
      console.log("Formulario validado:", {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        asunto: asunto.value.trim(),
        mensaje: mensaje.value.trim()
      });

      feedback.textContent =
        "¡Formulario validado correctamente! Esta es una demostración; el mensaje aún no se ha enviado.";

      feedback.classList.add("success");

      contactForm.reset();

    });

  }

});
