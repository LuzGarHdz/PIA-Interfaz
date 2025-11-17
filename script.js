/* ==========================================================
   MENÚ HAMBURGUESA
   ========================================================== */
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebarBtn = document.getElementById("closeSidebar");

let overlay = document.getElementById("sidebarOverlay");
if (!overlay) {
  overlay = document.createElement("div");
  overlay.id = "sidebarOverlay";
  document.body.appendChild(overlay);
}

function openSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('open');
  overlay?.classList.add('active');
}

function closeSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('open');
  overlay?.classList.remove('active');
}

if (hamburger) {
  hamburger.addEventListener('click', openSidebar);
}
overlay.addEventListener('click', closeSidebar);
closeSidebarBtn?.addEventListener("click", closeSidebar);
overlay?.addEventListener("click", closeSidebar);


/* ==========================================================
   TEMA CLARO / OSCURO
   ========================================================== */
const themeBtn = document.getElementById("themeToggleBtn");

function applyTheme(mode) {
  const isLight = mode === "light";
  document.documentElement.classList.toggle("light-theme", isLight);
  themeBtn.innerHTML = isLight
    ? '🌙 <span id="themeLabel">Modo oscuro</span>'
    : '☀️ <span id="themeLabel">Modo claro</span>';
}

function updateAvatar() {
  const avatarImg = document.getElementById("profileAvatar");
  if (!avatarImg) return;
  avatarImg.src = document.documentElement.classList.contains("light-theme")
    ? "imagenes/avatar.png"
    : "imagenes/avatar-dark.png";
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);
  updateAvatar();
});

themeBtn?.addEventListener("click", () => {
  const isLight = !document.documentElement.classList.contains("light-theme");
  const newTheme = isLight ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
  updateAvatar();
});

// ====================== TAMAÑO DE TEXTO (SLIDER) ======================
const fontSizeSlider = document.getElementById("fontSizeRange");

function applyFontSize(px) {
  if (!px) return;
  document.documentElement.style.fontSize = px + "px";
}

// Al cargar la página, aplicar tamaño guardado (o 16px por defecto)
window.addEventListener("DOMContentLoaded", () => {
  const savedFont = localStorage.getItem("fontSizePx");
  const initial = savedFont ? parseInt(savedFont, 10) : 16;
  applyFontSize(initial);
  if (fontSizeSlider) {
    fontSizeSlider.value = initial;
  }
});

// Cambiar tamaño cuando se mueve el slider
if (fontSizeSlider) {
  fontSizeSlider.addEventListener("input", () => {
    const px = parseInt(fontSizeSlider.value, 10);
    applyFontSize(px);
    localStorage.setItem("fontSizePx", px);
  });
}

/* ==========================================================
   POPUP LOGIN / REGISTRO
   ========================================================== */
const profileBtn = document.getElementById("profileBtn");
const authModal = document.getElementById("authModalBackdrop");

profileBtn?.addEventListener("click", () => {
  const u = getCurrentUser();
  if (!u) {
    authModal.style.display = "grid";
    setTimeout(() => {
      authModal.classList.add("active");
    }, 10);
  } else {
    window.location.href = "mi-perfil.html";
  }
});

if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.classList.remove("active");

      setTimeout(() => {
        authModal.style.display = "none";
      }, 250);
    }
  });
}
// ===== POPUP LOGIN / REGISTRO + ANIMACIÓN =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// Abrir modal desde el botón de perfil
if (profileBtn && authModal) {
  profileBtn.addEventListener("click", () => {
    const u = getCurrentUser();
    if (!u) {
      // Invitado → abrir login
      authModal.style.display = "grid";
      // pequeña pausa para que el navegador aplique display antes del fade
      setTimeout(() => {
        authModal.classList.add("active");
      }, 10);
    } else {
      // Usuario logueado → ir a mi perfil
      window.location.href = "mi-perfil.html";
    }
  });
}

// Cerrar modal haciendo click fuera
if (authModal) {
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      authModal.classList.remove("active");
      setTimeout(() => {
        authModal.style.display = "none";
      }, 250); // duración del fade en el CSS
    }
  });
}

// Cambiar a REGISTRO con transición
if (showRegister && loginForm && registerForm) {
  showRegister.addEventListener("click", (e) => {
    e.preventDefault();

    loginForm.classList.remove("active");
    setTimeout(() => {
      loginForm.style.display = "none";
      registerForm.style.display = "flex";

      requestAnimationFrame(() => {
        registerForm.classList.add("active");
      });
    }, 200); // mismo tiempo que tu transición
  });
}

// Cambiar a LOGIN con transición
if (showLogin && loginForm && registerForm) {
  showLogin.addEventListener("click", (e) => {
    e.preventDefault();

    registerForm.classList.remove("active");
    setTimeout(() => {
      registerForm.style.display = "none";
      loginForm.style.display = "flex";

      requestAnimationFrame(() => {
        loginForm.classList.add("active");
      });
    }, 200);
  });
}


// ====================== NUEVA PUBLICACIÓN (solo logueados) ======================
function setupCustomSelectLogic() {
  document.querySelectorAll(".custom-select").forEach(select => {
    const trigger = select.querySelector(".custom-select-trigger");
    const options = select.querySelector(".custom-options");
    const span = trigger.querySelector("span");

    trigger.addEventListener("click", () => {
      select.classList.toggle("open");
    });

    options.querySelectorAll(".custom-option").forEach(option => {
      option.addEventListener("click", () => {
        span.textContent = option.textContent;
        select.dataset.value = option.dataset.value;
        select.classList.remove("open");
      });
    });
  });

  // cerrar dropdown al hacer click fuera
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-select.open").forEach(sel => {
      if (!sel.contains(e.target)) sel.classList.remove("open");
    });
  });
}

const worldCupYears = [
  1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978,
  1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026
];

function initPostSelects() {
  const yearSelect = document.querySelector('.custom-select[data-type="postYear"] .custom-options');
  const categorySelect = document.querySelector('.custom-select[data-type="postCategory"] .custom-options');

  if (yearSelect) {
    worldCupYears.forEach(y => {
      const opt = document.createElement("div");
      opt.classList.add("custom-option");
      opt.textContent = y;
      opt.dataset.value = y;
      yearSelect.appendChild(opt);
    });
  }

  if (categorySelect) {
    ["Jugadas", "Memes", "Entrevistas", "Noticias"].forEach(cat => {
      const opt = document.createElement("div");
      opt.classList.add("custom-option");
      opt.textContent = cat;
      opt.dataset.value = cat;
      categorySelect.appendChild(opt);
    });
  }

  setupCustomSelectLogic();
}

const btnNewPostGlobal = document.getElementById("btnNewPost");
const newPostModal = document.getElementById("modalBackdrop");        // modal de crear publicación
const authModalGlobal = document.getElementById("authModalBackdrop");    // popup login / registro

if (btnNewPostGlobal) {
  btnNewPostGlobal.addEventListener("click", () => {
    const u = getCurrentUser();

    // Invitado → abrir login
    if (!u) {
      if (authModalGlobal) {
        authModalGlobal.style.display = "grid";
        // si usas animación:
        setTimeout(() => authModalGlobal.classList.add("active"), 10);
      }
      return;
    }

    // Usuario logueado → abrir modal de nueva publicación
    if (newPostModal) {
      newPostModal.style.display = "grid";
      setTimeout(() => newPostModal.classList.add("active"), 10);
      initPostSelects();
    }
  });
}

// Cerrar modal de nueva publicación
const btnCancelModal = document.getElementById("btnCancelModal");
if (btnCancelModal && newPostModal) {
  btnCancelModal.addEventListener("click", () => {
    newPostModal.classList.remove("active");
    setTimeout(() => {
      newPostModal.style.display = "none";
    }, 200);
  });
}





/* ==========================================================
   COUNTDOWN MUNDIAL
   ========================================================== */
const countdown = document.getElementById("countdown");
if (countdown) {
  const targetDate = new Date("June 11, 2026 19:00:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const dist = targetDate - now;

    if (dist <= 0) {
      countdown.textContent = "¡El Mundial ha comenzado!";
      return;
    }

    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
    const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dist % (1000 * 60)) / 1000);

    countdown.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}


/* ==========================================================
   ACCESIBILIDAD
   ========================================================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (authModal?.style.display === "grid") authModal.style.display = "none";
    if (sidebar?.classList.contains("open")) closeSidebar();
  }

  if (e.altKey && e.key === "m") {
    e.preventDefault();
    if (sidebar.classList.contains("open")) closeSidebar();
    else {
      sidebar.classList.add("open");
      overlay.classList.add("active");
    }
  }
});
// ====================== REGISTRO + LOGIN + ROLES + PERFIL ======================

// --- Helpers generales ---
function calcularEdad(fechaStr) {
  const hoy = new Date();
  const nacimiento = new Date(fechaStr);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
  return edad;
}

// ADMIN HARDCODEADO
const ADMIN_EMAIL = "luzg@fifa.co";
const ADMIN_PASS = "fifaMund1@l";

// Obtener / guardar usuario actual
function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

function setCurrentUser(userObj) {
  localStorage.setItem("currentUser", JSON.stringify(userObj));
}

function isAdmin(user) {
  return user && user.role === "admin";
}

// Logout global
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Actualizar nombre en el header
function updateProfileUI() {
  const user = getCurrentUser();
  const profileName = document.getElementById("profileName");

  if (!profileName) return;

  if (!user) {
    profileName.textContent = "Invitado";
  } else {
    profileName.textContent = isAdmin(user)
      ? `${user.name} (Admin)`
      : user.name;
  }
}

// Llamamos una vez al cargar el script (defer ya espera al DOM)
updateProfileUI();

// ====================== VALIDACIÓN REGISTRO ======================

const btnRegister = document.getElementById("btnRegisterSubmit");
const btnLogin = document.getElementById("btnLoginSubmit");
const profileNameSpan = document.getElementById("profileName");

const inputFullName = document.getElementById("registerFullName");
const birthDaySelect = document.getElementById('regBirthDay');
const birthMonthSelect = document.getElementById('regBirthMonth');
const birthYearSelect = document.getElementById('regBirthYear');
const inputEmail = document.getElementById("registerEmail");
const inputPassword = document.getElementById("registerPassword");

const errorFullName = document.getElementById("errorNombre");
const errorBirthDate = document.getElementById("errorFecha");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPass");

// reglas de contraseña
const ruleLength = document.getElementById("rule-length");
const ruleUpper = document.getElementById("rule-upper");
const ruleNumber = document.getElementById("rule-number");
const ruleSpecial = document.getElementById("rule-special");

[ruleLength, ruleUpper, ruleNumber, ruleSpecial].forEach(el => {
  if (el) el.classList.add("rule-bad");
});

function setRuleState(el, ok) {
  if (!el) return;
  el.classList.toggle("rule-ok", ok);
  el.classList.toggle("rule-bad", !ok);
}

// Construir fecha a partir de los 3 selects, en formato YYYY-MM-DD
function getBirthDateISO() {
  if (!birthDaySelect || !birthMonthSelect || !birthYearSelect) return "";

  const d = birthDaySelect.value;
  const m = birthMonthSelect.value;
  const y = birthYearSelect.value;

  if (!d || !m || !y) return "";

  // PadStart para que queden 2 dígitos
  const dd = d.toString().padStart(2, "0");
  const mm = m.toString().padStart(2, "0");

  return `${y}-${mm}-${dd}`;
}

// Rellenar selects de fecha de nacimiento
function initBirthSelects() {
  if (!birthDaySelect || !birthMonthSelect || !birthYearSelect) return;

  // Días 1-31
  for (let i = 1; i <= 31; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    birthDaySelect.appendChild(opt);
  }

  // Meses 1-12 (puedes cambiar texto si quieres "Ene", "Feb"...)
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  meses.forEach((nombre, index) => {
    const opt = document.createElement("option");
    opt.value = index + 1;          // 1-12
    opt.textContent = nombre;
    birthMonthSelect.appendChild(opt);
  });

  // Años: del actual hacia atrás 100 años
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= currentYear - 100; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    birthYearSelect.appendChild(opt);
  }
}

initBirthSelects();

// Nombre
function validarNombre() {
  if (!inputFullName || !errorFullName) return true;
  const v = inputFullName.value.trim();
  if (!v) {
    errorFullName.textContent = "Obligatorio";
    return false;
  }
  const regex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
  if (!regex.test(v)) {
    errorFullName.textContent = "Solo letras y espacios";
    return false;
  }
  errorFullName.textContent = "";
  return true;
}

// Fecha
function validarFechaNacimiento() {
  if (!errorBirthDate) return true;

  const dateISO = getBirthDateISO(); // YYYY-MM-DD

  if (!dateISO) {
    errorBirthDate.textContent = 'Obligatorio';
    return false;
  }

  const edad = calcularEdad(dateISO);
  if (isNaN(edad)) {
    errorBirthDate.textContent = 'Fecha no válida';
    return false;
  }
  if (edad < 12) {
    errorBirthDate.textContent = 'Tienes que ser mayor a 12 años para registrarte';
    return false;
  }

  errorBirthDate.textContent = '';
  return true;
}


// Correo
function validarCorreo() {
  if (!inputEmail || !errorEmail) return true;
  const v = inputEmail.value.trim();
  if (!v) {
    errorEmail.textContent = "Obligatorio";
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(v)) {
    errorEmail.textContent = "Correo inválido";
    return false;
  }
  errorEmail.textContent = "";
  return true;
}

// Password
function validarPassword() {
  if (!inputPassword || !errorPassword) return true;
  const v = inputPassword.value;

  const lenOk = v.length >= 8;
  const upperOk = /[A-Z]/.test(v);
  const numOk = /[0-9]/.test(v);
  const specialOk = /[^A-Za-z0-9]/.test(v);

  setRuleState(ruleLength, lenOk);
  setRuleState(ruleUpper, upperOk);
  setRuleState(ruleNumber, numOk);
  setRuleState(ruleSpecial, specialOk);

  if (!v) {
    errorPassword.textContent = "Obligatoria";
    return false;
  }
  if (!lenOk || !upperOk || !numOk || !specialOk) {
    errorPassword.textContent = "La contraseña no cumple todas las reglas";
    return false;
  }

  errorPassword.textContent = "";
  return true;
}

// eventos en vivo
if (inputFullName) inputFullName.addEventListener("input", validarNombre);
if (birthDaySelect) birthDaySelect.addEventListener('change', validarFechaNacimiento);
if (birthMonthSelect) birthMonthSelect.addEventListener('change', validarFechaNacimiento);
if (birthYearSelect) birthYearSelect.addEventListener('change', validarFechaNacimiento);
if (inputEmail) inputEmail.addEventListener("input", validarCorreo);
if (inputPassword) inputPassword.addEventListener("input", validarPassword);

// ====================== REGISTRO USUARIO NORMAL ======================

if (btnRegister) {
  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();

    const okNombre = validarNombre();
    const okFecha = validarFechaNacimiento();
    const okCorreo = validarCorreo();
    const okPass = validarPassword();

    if (!okNombre || !okFecha || !okCorreo || !okPass) return;

    const fullName = inputFullName ? inputFullName.value.trim() : "";
    const birthDate = getBirthDateISO();
    const gender = document.getElementById("regGender")?.value || "";
    const birthCountry = document.getElementById("regBirthCountry")?.value.trim() || "";
    const email = inputEmail ? inputEmail.value.trim() : "";
    const password = inputPassword ? inputPassword.value : "";
    const photoInput = document.getElementById("regPhoto");
    const photoName = photoInput && photoInput.files[0] ? photoInput.files[0].name : "";

    if (!gender || !birthCountry) {
      alert("Completa todos los campos obligatorios.");
      return;
    }

    const edad = calcularEdad(birthDate);
    if (isNaN(edad) || edad < 12) {
      alert("Solo los usuarios de 12 años o más pueden registrarse.");
      return;
    }

    const usuario = {
      fullName,
      birthDate,
      gender,
      birthCountry,
      email,
      password,
      photoName,
      description: ""
    };

    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    if (loginForm && registerForm) {
      registerForm.style.display = "none";
      loginForm.style.display = "flex";
    }
  });
}

// ====================== LOGIN (ADMIN / USER) ======================

if (btnLogin) {
  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("loginEmail");
    const passInput = document.getElementById("loginPassword");
    if (!emailInput || !passInput) return;

    const email = emailInput.value.trim();
    const pass = passInput.value.trim();

    // ADMIN
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      const adminUser = {
        name: "Luz García",
        email: ADMIN_EMAIL,
        role: "admin",
        description: "Administrador de FIFAverse ⚽"
      };
      setCurrentUser(adminUser);
      updateProfileUI();
      alert("Bienvenido Administrador");
      const modal = document.getElementById("authModalBackdrop");
      if (modal) modal.style.display = "none";
      return;
    }

    // USUARIO NORMAL
    const saved = localStorage.getItem("usuarioRegistrado");
    if (!saved) {
      alert("No hay usuarios registrados.");
      return;
    }

    let usuario;
    try {
      usuario = JSON.parse(saved);
    } catch {
      alert("Error leyendo los datos guardados. Intenta registrarte de nuevo.");
      return;
    }

    if (email === usuario.email && pass === usuario.password) {
      const normalUser = {
        name: usuario.fullName.split(" ")[0],
        fullName: usuario.fullName,
        email: usuario.email,
        role: "user",
        photoName: usuario.photoName || "",
        description: usuario.description || ""
      };

      setCurrentUser(normalUser);
      updateProfileUI();
      const modal = document.getElementById("authModalBackdrop");
      if (modal) modal.style.display = "none";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
}

// ====================== PERFIL / MI-PERFIL ======================

// Botón de perfil: si invitado → login, si logueado → mi-perfil.html
const profileBtn2 = document.getElementById("profileBtn");
if (profileBtn2) {
  profileBtn2.addEventListener("click", (e) => {
    const user = getCurrentUser();
    if (!user) {
      const modal = document.getElementById("authModalBackdrop");
      if (modal) modal.style.display = "grid";
    } else {
      window.location.href = "mi-perfil.html";
    }
  });
}

// Proteger mi-perfil y páginas admin + poblar datos
window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const u = getCurrentUser();

  // Páginas SOLO admin
  if (
    path.includes("publicaciones-admin.html") ||
    path.includes("detalle-admin.html") ||
    path.includes("historia-admin.html")
  ) {
    if (!u || !isAdmin(u)) {
      window.location.href = "index.html";
      return;
    }
  }

  // mi-perfil protegido
  if (path.includes("mi-perfil.html")) {
    if (!u) {
      window.location.href = "index.html";
      return;
    }

    // Rellenar datos del perfil
    const foto = document.getElementById("perfilFoto");
    const userEl = document.getElementById("perfilUsername");
    const descEl = document.getElementById("perfilDesc");

    if (foto) {
      foto.src = u.photoName ? `uploads/${u.photoName}` : "imagenes/avatar-dark.png";
    }

    if (userEl) {
      userEl.innerHTML = "@" + (u.name || "user");
      if (isAdmin(u)) {
        userEl.innerHTML += ' <span class="admin-badge">Admin</span>';
      }
    }

    if (descEl) {
      descEl.textContent =
        u.description || "Apasionado del fútbol y coleccionista de momentos históricos del Mundial ⚽";
    }

    // Lógica de edición real
    const editToggle = document.querySelector(".editar-toggle");
    const editSection = document.querySelector(".perfil-editar");
    const cancelEdit = document.getElementById("cancelEdit");
    const formEdit = document.getElementById("profileEditForm");
    const inputUser = document.getElementById("editUsername");
    const inputDesc = document.getElementById("editDescription");
    const inputPhoto = document.getElementById("editPhoto");

    if (inputUser) inputUser.value = u.name || "";
    if (inputDesc) inputDesc.value = u.description || "";

    if (editToggle && editSection) {
      editToggle.addEventListener("click", () => {
        editSection.style.display =
          editSection.style.display === "none" || !editSection.style.display
            ? "block"
            : "none";
      });
    }

    if (cancelEdit && editSection) {
      cancelEdit.addEventListener("click", () => {
        editSection.style.display = "none";
      });
    }

    if (formEdit) {
      formEdit.addEventListener("submit", (e) => {
        e.preventDefault();

        const newName = inputUser ? inputUser.value.trim() : u.name;
        const newDesc = inputDesc ? inputDesc.value.trim() : u.description;

        if (newName) u.name = newName;
        u.description = newDesc || "";

        if (inputPhoto && inputPhoto.files && inputPhoto.files[0]) {
          u.photoName = inputPhoto.files[0].name;
        }

        setCurrentUser(u);
        updateProfileUI();

        // refrescar vista del perfil
        if (userEl) {
          userEl.innerHTML = "@" + (u.name || "user");
          if (isAdmin(u)) {
            userEl.innerHTML += ' <span class="admin-badge">Admin</span>';
          }
        }
        if (descEl) {
          descEl.textContent =
            u.description || "Apasionado del fútbol y coleccionista de momentos históricos del Mundial ⚽";
        }
        if (foto) {
          foto.src = u.photoName ? `uploads/${u.photoName}` : "imagenes/avatar-dark.png";
        }

        alert("Perfil actualizado.");
        if (editSection) editSection.style.display = "none";
      });
    }

    // Logout en mi-perfil
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  }

  // Reemplazar links del menú si el usuario es admin
  if (u && isAdmin(u)) {
    const links = document.querySelectorAll("a[data-title]");
    links.forEach(a => {
      if (a.dataset.title === "Historia") a.href = "historia-admin.html";
      if (a.dataset.title === "Publicaciones") a.href = "publicaciones-admin.html";
    });
  }
});

// ====================== GUIDED TOUR (Driver.js) ======================
function initGuidedTour() {
  // Verifica que Driver.js esté disponible
  if (!window.driver || !window.driver.js) {
    console.warn("Driver.js no está disponible en window.driver.js");
    return;
  }

  const driver = window.driver.js.driver;

  // Asegura que exista el elemento que vas a resaltar
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) {
    console.warn("No se encontró el elemento #countdown para el tour");
    return;
  }

  const tour = driver({
    showProgress: true,
    // Puedes ir agregando más pasos aquí
    steps: [
      {
        popover: {
          title: "¡Bienvenido a FIFAverse!",
          description: "Te daremos un pequeño tour por la página",
          position: "center"
        }
      },
      {
        element: "#worldCupSlider",
        popover: {
          title: "¡Explora los mundiales!",
          description: "Descubre todo sobre la historia de cada mundial navegando por las diferentes ediciones del FIFA",
          position: "center"
        }
      },
      {
        element: "#recentPostsSlider",
        popover: {
          title: "Publicaciones recientes",
          description: "¡Aquí encontrarás los posts más recientes de miembros de nuestra gran comunidad!",
          position: "center"
        }
      },
      {
        element: "#profileBtn",
        popover: {
          title: "¿Quieres publicar cosas sobre el FIFA?",
          description: "¡Entonces, únete a la comunidad! Sigue los pasos para registrarte ",
          position: "center"
        }
      },
      // === ABRIR MENÚ LATERAL AUTOMÁTICAMENTE ===
      {
        element: "#hamburger",
        onHighlighted: () => {
          openSidebar();
        },
        popover: {
          title: "Menú",
          description: "En nuestro menú encontrarás una variedad de opciones! tales cómo: Publicaciones, Noticias, Jugadas y más! También, puedes acceder a él cuando quieras usando Alt+M",
          position: "left"
        }
      },

      // INICIO!!
      {
        element: "a[data-title='Inicio']",
        popover: {
          title: "Inicio",
          description: "¡Estás aquí! Nuestra página prinicipal.",
          position: "right"
        }
      },

      // PUBLICACIONES
      {
        element: "a[data-title='Publicaciones']",
        popover: {
          title: "Publicaciones",
          description: "Explora publicaciones aprobadas por administradores.",
          position: "right"
        }
      },

      // NOTICIAS
      {
        element: "a[data-title='Noticias']",
        popover: {
          title: "Noticias oficiales",
          description: "Entérate de las noticias más importantes del fútbol.",
          position: "right"
        }
      },

      // JUGADAS
      {
        element: "a[data-title='Jugadas & Más']",
        popover: {
          title: "Jugadas",
          description: "¡Mira tus videos favoritos de jugadas, fails, entrevistas y más!",
          position: "right"
        }
      },

      // COMUNIDADES
      {
        element: "a[data-title='Comunidades']",
        popover: {
          title: "Comunidades",
          description: "Únete a grupos de fans y comparte contenido.",
          position: "right"
        }
      },

      // HISTORIA
      {
        element: "a[data-title='Historia']",
        popover: {
          title: "Historia de la FIFA",
          description: "Descubre datos históricos y curiosidades del Mundial.",
          position: "right"
        }
      },

      // Modo Claro
      {
        element: "#themeToggleBtn",
        popover: {
          title: "¿No eres fan del modo oscuro?",
          description: "¡Ajusta la página a tus necesidades!",
          position: "right"
        }
      },

      // Font size
      {
        element: "#fontSizeRange",
        popover: {
          title: "¡Ajusta el tamaño!",
          description: "Usando el deslizador, ajusta el tamaño de la letra de toda la página",
          position: "right"
        }
      },

      {
        onHighlighted: () => {
          closeSidebar();
        },
        popover: {
          title: "¡Eso es todo!",
          description: "Ya conoces lo básico de FIFAverse. ¡Explora libremente!",
          position: "center"
        }
      }
    ]
  });

  const tourBtn = document.getElementById("btnTour");
  if (tourBtn) {
    tourBtn.addEventListener("click", () => {
      tour.drive();
    });
  } else {
  }
}

initGuidedTour();
