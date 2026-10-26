/* НОВАЯ ЖИЗНЬ — общий JS. ФОТО: меняйте значения photo и photos в массиве seedPets ниже.
   Сложите свои изображения в assets/photos/ и укажите путь вида assets/photos/cat1.jpg.
   Если файл отсутствует, показывается SVG-заглушка (не битая картинка). */
const fallback = (label = "Фото питомца") =>
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420"><rect width="600" height="420" fill="#e8e5fa"/><text x="300" y="190" font-size="82" text-anchor="middle">🐾</text><text x="300" y="245" font-size="24" font-family="Arial" text-anchor="middle" fill="#7365ed">${label}</text></svg>`,
  );
const seedPets = [
  {
    id: 1,
    type: "Кошка",
    district: "Железнодорожный",
    date: "2026-10-09",
    phone: "+7 (925) 728-23-27",
    email: "anna@example.com",
    finder: "Анна",
    description:
      "Найдена чёрная кошка около подъезда. Очень ласковая, ждёт хозяина.",
    mark: "Нет",
    sex: "Неизвестно",
    age: "1–3 года",
    color: "Чёрный",
    status: "Активно",
    owner: "demo@newlife.ru",
    photo: "assets/photos/котик1.jpg",
    photos: [
      "assets/photos/котик1.jpg",
      "assets/photos/котик2.webp",
      "assets/photos/котик3.jpg",
    ],
  },
  {
    id: 2,
    type: "Собака",
    district: "Советский",
    date: "2026-10-11",
    phone: "+7 (900) 123-45-67",
    email: "helper@example.com",
    finder: "Мария",
    description: "Небольшая рыжая собака найдена возле парка, дружелюбная.",
    mark: "Нет",
    status: "Активно",
    photo: "assets/photos/sobaka1.jpg",
  },
  {
    id: 3,
    type: "Собака",
    district: "Московский",
    date: "2026-10-12",
    phone: "+7 (900) 555-20-20",
    email: "volunteer@example.com",
    finder: "Иван",
    description: "Найдена крупная собака, с ошейником.",
    mark: "Нет",
    status: "На модерации",
    photo: "assets/photos/sobaka3.jpg",
  },
  {
    id: 4,
    type: "Кошка",
    district: "Октябрьский",
    date: "2026-09-12",
    phone: "+7 (925) 728-23-27",
    email: "gorrors22@gmail.com",
    finder: "Анна",
    description:
      "Кошка была найдена у подъезда жилого дома. Очень ласковая, спокойная, доверяет людям. Возможно, потерялась, сейчас находится на временной передержке.",
    mark: "Нет",
    sex: "Неизвестно",
    age: "1–3 года",
    color: "Бело-коричневый",
    status: "Найдено",
    photo: "assets/photos/котик4.jpg",
    photos: [
      "assets/photos/котик4.jpg",
      "assets/photos/котик1.jpg",
      "assets/photos/котик2.webp",
    ],
  },
  {
    id: 5,
    type: "Кошка",
    district: "Московский",
    date: "2026-10-15",
    phone: "+7 (900) 333-22-11",
    email: "found@example.com",
    finder: "Елена",
    description: "Серая кошка найдена у магазина.",
    mark: "Нет",
    status: "В архиве",
    photo: "assets/photos/котик3.jpg",
  },
  {
    id: 6,
    type: "Собака",
    district: "Железнодорожный",
    date: "2026-10-17",
    phone: "+7 (900) 222-11-33",
    email: "dog@example.com",
    finder: "Олег",
    description: "Собака с белыми лапами, найдена у остановки.",
    mark: "Нет",
    status: "Активно",
    photo: "assets/photos/sobaka2.jpg",
  },
];
const getPets = () => {
  const stored = JSON.parse(localStorage.getItem("nl_pets") || "null");
  if (!stored) return seedPets;

  let updated = false;
  const pets = stored.map((pet) => {
    const seed = seedPets.find(
      (item) =>
        item.id === pet.id &&
        item.type === pet.type &&
        item.email === pet.email &&
        item.finder === pet.finder,
    );
    if (
      !seed ||
      pet.type !== "Собака" ||
      typeof pet.photo !== "string" ||
      pet.photo.startsWith("data:")
    )
      return pet;

    const fileName = pet.photo.split(/[\\/]/).pop();
    if (
      ["dog-small.jpg", "dog-big.jpg", "sobaka1.jpg", "sobaka2.jpg", "sobaka3.jpg"].includes(
        fileName,
      ) &&
      pet.photo !== seed.photo
    ) {
      updated = true;
      return { ...pet, photo: seed.photo };
    }
    return pet;
  });

  if (updated) localStorage.setItem("nl_pets", JSON.stringify(pets));
  return pets;
};
const savePets = (p) => localStorage.setItem("nl_pets", JSON.stringify(p));
const user = () => JSON.parse(localStorage.getItem("nl_user") || "null");
const el = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function img(src, alt, cls = "") {
  return `<img class="${cls}" src="${esc(src || "")}" alt="${esc(alt)}" onerror="this.onerror=null;this.src='${fallback().replaceAll("'", "%27")}'">`;
}
function header() {
  return `<header class="header"><div class="header-inner"><a class="brand" href="index.html"><img class="brand-cat" src="assets/photos/kotlogo.svg" alt="" style="width:90px;height:90px;object-fit:contain;margin-right:8px;flex-shrink:0;filter:none"><span style="line-height:1.2">Новая<br>Жизнь</span></a><nav class="nav" id="nav"><a href="search.html">Поиск</a><a href="add.html">Добавить</a><a href="index.html#reviews">Отзывы</a><a href="profile.html">Личный кабинет</a><a href="admin.html">Админ</a></nav><div class="auth-actions"><a class="btn small" href="${user() ? "profile.html" : "login.html"}">${user() ? "Профиль" : "Войти"}</a><a class="btn small outline" href="register.html">Регистрация</a></div><button class="menu-toggle" aria-label="Открыть меню" onclick="el('#nav').classList.toggle('open')">☰</button></div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="footer-inner"><a class="brand" href="index.html"><img class="brand-cat" src="assets/photos/kotpodval.png" alt="" style="width:45px;height:45px;object-fit:contain;margin-right:8px;flex-shrink:0;filter:none"><span>Новая<br>жизнь</span></a><div><small>☎ 8 (800) 123-45-67</small><small>✉ mail@newlife.ru</small></div><div class="footer-links"><a href="register.html">Регистрация</a><a href="index.html">Главная</a><a href="login.html">Авторизация</a><a href="profile.html">Личный кабинет</a><a href="add.html">Найденное животное</a><a href="search.html">Поиск</a></div></div></footer>`;
}
function card(p) {
  return `<article class="pet-card">${img(p.photo, p.type)}<div class="pet-card-body"><h3>${esc(p.type)}</h3><p><img class="inline-icon" src="assets/photos/tochka.png" alt=""> Район: ${esc(p.district)}</p><p>${esc(p.description).slice(0, 60)}…</p><a class="link" href="pet.html?id=${p.id}">Подробнее →</a></div></article>`;
}
function searchForm() {
  return `<form class="search-form" action="search.html"><input class="input" name="q" list="animals" placeholder="Например, кошка или собака" aria-label="Поиск животного"><datalist id="animals"><option value="Кошка"><option value="Собака"><option value="Московский"><option value="Советский"></datalist><button class="btn" type="submit">Искать</button></form>`;
}
let slide = 0,
  reviewIndex = 0;
const reviews = [
  {
    name: "Елена",
    date: "12.09.2026",
    text: "Спасибо всем, кто помог нам снова быть вместе!",
    photo: "C:\\Users\\gorro\\OneDrive\\Рабочий стол\\практика\\new-life-site\\new-life-site\\assets\\photos\\dovolna.jpg",
  },
  {
    name: "Александр",
    date: "18.09.2026",
    text: "Благодаря сервису наш пёс вернулся домой. Огромное спасибо!",
    photo: "C:\\Users\\gorro\\OneDrive\\Рабочий стол\\практика\\new-life-site\\new-life-site\\assets\\photos\\mss.jpg",
  },
  {
    name: "Мария",
    date: "03.10.2026",
    text: "Нашли нашу кошку уже на следующий день. Очень благодарны волонтёрам!",
    photo: "C:\\Users\\gorro\\OneDrive\\Рабочий стол\\практика\\new-life-site\\new-life-site\\assets\\photos\\jsk.jpg",
  },
];
function renderCards() {
  let pets = getPets().filter((p) => p.status === "Активно");
  let root = el("#recent-cards");
  if (root)
    root.innerHTML = [
      ...pets,
      ...getPets().filter((p) => p.status !== "Активно"),
    ]
      .slice(slide, slide + 5)
      .map(card)
      .join("");
}
function renderReview() {
  let r = reviews[reviewIndex];
  el("#review-box").innerHTML =
    `${img(r.photo, "Фото питомца")}<div class="review-body"><p>“${esc(r.text)}”</p><b>${esc(r.name)}</b><br><small>${r.date}</small><div class="slider-controls" style="margin-top:18px"><button class="circle-btn" onclick="moveReview(-1)">‹</button><span>${reviewIndex + 1} / ${reviews.length}</span><button class="circle-btn" onclick="moveReview(1)">›</button></div></div>`;
}
function moveReview(d) {
  reviewIndex = (reviewIndex + d + reviews.length) % reviews.length;
  renderReview();
}
function moveCards(d) {
  slide = Math.max(0, Math.min(Math.max(0, getPets().length - 5), slide + d));
  renderCards();
}
function home() {
  return `<main class="container"><section class="hero"><div class="hero-copy"><h1>Поможем найти<br>дорогу домой</h1><p>Каждый найденный питомец заслуживает вернуться к своему хозяину. Вместе мы можем сделать их немного счастливее.</p><div class="hero-buttons"><a class="btn" href="search.html">Найти питомца</a><a class="btn outline" href="add.html">＋ Я нашёл животное</a></div></div><img class="hero-figure" src="assets/photos/zaez.png" alt="" aria-hidden="true"></section><div class="stats">
  <div class="stat">
    <img class="stat-icon stat-image" src="assets/photos/lapka.png" alt="" width="55" height="55">
    <div><strong>500+</strong><span>Животных найдено</span></div>
  </div>
  <div class="stat">
    <img class="stat-icon stat-image" src="assets/photos/kalendar.png" alt="Календарь" width="55" height="55">
    <div><strong>3+</strong><span>Года помогаем</span></div>
  </div>
  <div class="stat">
    <img class="stat-icon stat-image" src="assets/photos/heart.png" alt="Сердце" width="55" height="55">
    <div><strong>Бесплатно</strong><span>Все услуги</span></div>
  </div>
</div>
<section class="section">
  <div class="section-head"><h2>Недавно найдены</h2>
  <div><a class="link" href="search.html">Смотреть все →</a>
  <button class="circle-btn" onclick="moveCards(-1)">‹</button> 
  <button class="circle-btn" onclick="moveCards(1)">›</button>
  </div>
  </div>
  <div class="pet-grid" id="recent-cards">
  </div></section><section class="section search-band">
  <h2>Кого ищем?</h2>${searchForm()}
  </section><section class="section">
  <h2>Мы помогаем возвращаться домой</h2>
  <div class="features">
  <div class="feature">
  <b><img src="assets/photos/3l.png" alt="лапка" width="55" height="55"></b>Люди, которые заботятся о животных</div>
  <div class="feature">
  <b><img class="feature-icon" src="assets/photos/hit.png" alt="Проверка" width="55" height="55"></b>Проверка и модерация объявлений</div>
  <div class="feature">
  <b><img class="feature-icon" src="assets/photos/ser.png" alt="сердце" width="55" height="55"></b>Поддержка волонтёров и зоозащитников</div>
  </div></section><section class="section" id="reviews">
  <div class="section-head">
  <h2>Истории возвращения домой</h2>
  </div><div class="review" id="review-box">
  </div></section>
  <section class="section newsletter"><div>
  <h3>✉ Новости «Новой жизни»</h3>
  <p>Узнавайте новые возможности сервиса</p></div>
  <form id="newsletter">
  <input class="input" type="email" required placeholder="Ваш e-mail">
  <button class="btn">Подписаться</button>
  <label class="consent">
  <input type="checkbox" required> Согласен на обработку персональных данных</label>
  <div id="newsletter-message"></div></form></section></main>`;
}
function auth(mode) {
  let reg = mode === "register";
  return `<main class="auth-page">
  <form class="auth-card" id="auth-form">
  <h2>${reg ? "Регистрация" : "Вход в личный кабинет"}</h2>
  <p class="sub">${reg ? "Создайте аккаунт, чтобы пользоваться всеми функциями сайта" : "Пожалуйста, введите свои данные для входа"}
  </p>${reg ? `<div class="field">
    <label>Имя</label>
    <input class="input" name="first" required placeholder="Ваше имя"></div>
    <div class="field"><label>Фамилия</label>
    <input class="input" name="last" required placeholder="Ваша фамилия"></div>
    <div class="field">
    <label>Телефон</label>
    <input class="input" name="phone" type="tel" required placeholder="+7 999 123-45-67"></div>` : ""}
    <div class="field">
    <label>E-mail${reg ? "" : " или телефон"}
    </label><input class="input" name="email"
     ${reg ? 'type="email"' : 'type="text"'} 
     required placeholder="Введите e-mail${reg ? "" : " или телефон"}"></div><div class="field">
     <label>Пароль</label>
     <input class="input" name="password" type="password" minlength="6" required placeholder="Введите пароль">
     <button type="button" class="link" style="border:0;background:none" onclick="togglePass(this)">Показать пароль</button>
     </div>${reg ? `<div class="field"><label>Повтор пароля</label><input class="input" name="repeat" type="password" required placeholder="Повторите пароль">
        </div>` : ""}<div class="auth-options">
        <label class="consent">
        <input type="checkbox" name="agree" 
        ${reg ? "required" : ""}> ${reg ? "Согласен на обработку персональных данных" : "Запомнить меня"}
        </label>${!reg ? '<a class="link" href="#" id="forgot">Забыли пароль?</a>' : ""}
        </div><div id="auth-message" role="status">
        </div>
        <button class="btn" type="submit">${reg ? "Зарегистрироваться" : "Войти"}
        </button><p style="text-align:center;font-size:12px">${reg ? 'Уже есть аккаунт? <a class="link" href="login.html">Войти</a>' : 'Нет аккаунта? <a class="link" href="register.html">Зарегистрироваться</a>'}
        </p></form></main>`;
}
function authInit(mode) {
  el("#auth-form").onsubmit = (e) => {
    e.preventDefault();
    let f = e.target,
      v = Object.fromEntries(new FormData(f));
    let box = el("#auth-message");
    if (mode === "register") {
      if (v.password !== v.repeat) {
        box.innerHTML = '<div class="message bad">Пароли не совпадают.</div>';
        return;
      }
      let users = JSON.parse(localStorage.getItem("nl_users") || "[]");
      if (users.some((x) => x.email === v.email)) {
        box.innerHTML =
          '<div class="message bad">Этот e-mail уже зарегистрирован.</div>';
        return;
      }
      let u = {
        email: v.email,
        first: v.first,
        last: v.last,
        phone: v.phone,
        password: v.password,
        created: new Date().toISOString(),
      };
      users.push(u);
      localStorage.setItem("nl_users", JSON.stringify(users));
      localStorage.setItem(
        "nl_user",
        JSON.stringify({ ...u, password: undefined }),
      );
      location.href = "profile.html";
    } else {
      let u = JSON.parse(localStorage.getItem("nl_users") || "[]").find(
        (x) =>
          (x.email === v.email || x.phone === v.email) &&
          x.password === v.password,
      );
      if (!u) {
        box.innerHTML =
          '<div class="message bad">Неверный логин или пароль. Сначала зарегистрируйтесь.</div>';
        return;
      }
      localStorage.setItem(
        "nl_user",
        JSON.stringify({ ...u, password: undefined }),
      );
      location.href = "profile.html";
    }
  };
  if (mode === "login")
    el("#forgot").onclick = (e) => {
      e.preventDefault();
      el("#auth-message").innerHTML =
        '<div class="message">В демонстрационной версии восстановление через e-mail не подключено. Создайте новую учётную запись.</div>';
    };
}
function togglePass(btn) {
  let input = btn.previousElementSibling;
  input.type = input.type === "password" ? "text" : "password";
  btn.textContent =
    input.type === "password" ? "Показать пароль" : "Скрыть пароль";
}
function profile() {
  let u = user();
  if (!u)
    return `<main class="container section"><div class="panel"><h2>Личный кабинет</h2><p>Войдите или зарегистрируйтесь, чтобы увидеть свои объявления.</p><a class="btn" href="login.html">Войти</a></div></main>`;
  return `<main class="profile-page"><div class="container profile-layout"><aside class="sidebar"><div class="avatar">👤</div><b>${esc(u.first || "Пользователь")} ${esc(u.last || "")}</b><p style="font-size:12px">${esc(u.email)}</p><div class="sidebar-menu"><button onclick="showProfileTab('account')">👤 Мой профиль</button><button class="active" onclick="showProfileTab('ads')">▤ Мои объявления</button><button onclick="showProfileTab('favorites')">♥ Избранное</button><button onclick="showProfileTab('account')">⚙ Настройки</button><button onclick="logout()">⇥ Выход</button></div></aside><div><h2>Личный кабинет</h2><div class="panel profile-stats"><div>▣ <strong id="count-all">0</strong><small>Мои объявления</small></div><div>⌕ <strong id="count-active">0</strong><small>В поиске</small></div><div>♥ <strong id="count-found">0</strong><small>Найдено</small></div></div><div id="profile-content"></div></div></div></main>`;
}
function logout() {
  localStorage.removeItem("nl_user");
  location.href = "index.html";
}
let activeStatus = "Все";
function showProfileTab(tab) {
  let u = user(),
    root = el("#profile-content");
  if (!root) return;
  if (tab === "account") {
    let days = Math.floor(
      (Date.now() - new Date(u.created || Date.now())) / 86400000,
    );
    root.innerHTML = `<div class="panel"><h3>Мои данные</h3><p>Имя: ${esc(u.first)} ${esc(u.last)}</p><p>E-mail: <span id="current-email">${esc(u.email)}</span> <button class="btn small outline" onclick="editAccount('email')">Изменить</button></p><p>Телефон: ${esc(u.phone || "Не указан")} <button class="btn small outline" onclick="editAccount('phone')">Изменить</button></p><p>Дата регистрации: ${new Date(u.created || Date.now()).toLocaleDateString("ru-RU")}</p><p>На сайте дней: ${days}</p></div>`;
    return;
  }
  if (tab === "favorites") {
    root.innerHTML =
      '<div class="panel"><h3>Избранное</h3><p>Сохранённые объявления появятся здесь.</p></div>';
    return;
  }
  let all = getPets().filter((p) => p.owner === u.email),
    a = all.filter((p) => activeStatus === "Все" || p.status === activeStatus);
  root.innerHTML = `<div class="panel"><div class="section-head"><h3>Мои объявления</h3><a class="btn small" href="add.html">Добавить</a></div><div class="tabs">${["Все", "Активно", "На модерации", "Найдено", "В архиве"].map((s) => `<button class="tab ${activeStatus === s ? "active" : ""}" onclick="activeStatus='${s}';showProfileTab('ads')">${s}</button>`).join("")}</div>${a.length ? a.map((p) => `<div class="listing">${img(p.photo, p.type)}<div class="listing-info"><strong>${esc(p.type)}</strong><p>${esc(p.date)} · ${esc(p.district)} район</p><span class="status ${p.status === "На модерации" ? "pending" : p.status === "Найдено" ? "found" : p.status === "В архиве" ? "archive" : ""}">${esc(p.status)}</span></div><div class="listing-actions"><a class="link" href="pet.html?id=${p.id}">Открыть</a>${["Активно", "На модерации"].includes(p.status) ? `<button onclick="editPet(${p.id})">Редактировать</button><button onclick="deletePet(${p.id})">Удалить</button>` : ""}</div></div>`).join("") : '<div class="empty">В этой категории пока нет объявлений.</div>'}</div>`;
  el("#count-all").textContent = all.length;
  el("#count-active").textContent = all.filter(
    (p) => p.status === "Активно",
  ).length;
  el("#count-found").textContent = all.filter(
    (p) => p.status === "Найдено",
  ).length;
}
function editAccount(field) {
  let u = user(),
    v = prompt(field === "email" ? "Новый e-mail" : "Новый телефон", u[field]);
  if (!v) return;
  if (field === "email" && !/^\S+@\S+\.\S+$/.test(v)) {
    alert("Некорректный e-mail");
    return;
  }
  let users = JSON.parse(localStorage.getItem("nl_users") || "[]"),
    found = users.find((x) => x.email === u.email);
  if (found) found[field] = v;
  if (field === "email") {
    let pets = getPets();
    pets.forEach((p) => {
      if (p.owner === u.email) p.owner = v;
    });
    savePets(pets);
  }
  u[field] = v;
  localStorage.setItem("nl_users", JSON.stringify(users));
  localStorage.setItem("nl_user", JSON.stringify(u));
  location.reload();
}
function deletePet(id) {
  if (confirm("Удалить объявление?")) {
    savePets(getPets().filter((p) => p.id !== id));
    showProfileTab("ads");
  }
}
function editPet(id) {
  location.href = "add.html?edit=" + id;
}
function petPage() {
  let id = Number(new URLSearchParams(location.search).get("id") || 4),
    p = getPets().find((x) => x.id === id);
  if (!p)
    return `<main class="container section"><h2>Объявление не найдено</h2><a href="search.html">Вернуться к поиску</a></main>`;
  let photos = p.photos?.length ? p.photos : [p.photo, p.photo, p.photo];
  return `<main class="pet-page"><div class="container"><a class="link" href="search.html">← Назад к поиску</a><section class="section pet-detail"><div class="pet-gallery"><div class="pet-gallery-row">${img(photos[0], p.type, "pet-main-photo")}<div class="pet-thumbs">${photos
    .slice(1, 3)
    .map(
      (src) =>
        `<div onclick="swapPhoto(this)" style="cursor:pointer">${img(src, p.type)}</div>`,
    )
    .join(
      "",
    )}</div></div>
    <div class="pet-description">
    <h3>Описание</h3><p>${esc(p.description)}</p></div>
    </div><div class="pet-info">
    <span class="status">${esc(p.status)}</span><h2>${esc(p.type)}</h2>
    <p><img class="inline-icon" src="assets/photos/tochka.png" alt=""> ${esc(p.district)} район, Рязань</p>
    <p><img class="inline-icon" src="assets/photos/kalen.svg" alt=""> Найдено ${esc(p.date)}</p>
    <dl class="details"><dt>Вид животного</dt>
    <dd>${esc(p.type)}</dd><dt>Пол</dt>
    <dd>${esc(p.sex || "Неизвестно")}</dd>
    <dt>Возраст</dt>
    <dd>${esc(p.age || "Неизвестно")}</dd>
    <dt>Окрас</dt><dd>${esc(p.color || "Не указан")}</dd>
    <dt>Особые приметы</dt>
    <dd>${esc(p.mark || "Нет")}</dd>
    </dl><p class="hint">ⓘ Если это ваш питомец, пожалуйста, свяжитесь с нашедшим. Мы поможем вернуть его домой.</p>
    <a class="btn" style="width:100%" href="tel:${esc(p.phone)}"><img class="contact-icon" src="assets/photos/tg.png" alt=""> Связаться</a>
    </div></section><section class="panel">
    <h2>Контактная информация</h2>
    <div class="contact-box"><div>
    <p><img class="inline-icon" src="assets/photos/telo.png" alt=""> ${esc(p.finder)}</p>
    <p><img class="inline-icon" src="assets/photos/telef.png" alt=""> <a href="tel:${esc(p.phone)}">${esc(p.phone)}</a>
    </p><p>✉ <a href="mailto:${esc(p.email)}">${esc(p.email)}</a>
    </p></div><div class="hint contact-hint"><img class="contact-hint-icon" src="assets/photos/lapka2.png" alt=""><span>Вы можете написать нам в любое время. Мы обязательно ответим!</span></div>
    </div></section><section class="section"><h2>Похожие объявления</h2><div class="pet-grid">${getPets()
    .filter((x) => x.id !== p.id)
    .slice(0, 5)
    .map(card)
    .join("")}</div></section></div></main>`;
}
function swapPhoto(node) {
  let main = el(".pet-main-photo"),
    s = main.src;
  main.src = node.querySelector("img").src;
  node.querySelector("img").src = s;
}
function searchPage() {
  return `<main class="results-page"><div class="container"><h2>Поиск найденных животных</h2><div class="search-band">${searchForm()}</div><div class="panel section"><div class="section-head"><h3>Результаты поиска</h3><span id="result-count"></span></div><div id="search-results"></div><div class="pagination" id="pages"></div></div></div></main>`;
}
let page = 1;
function renderSearch() {
  let q =
    new URLSearchParams(location.search).get("q")?.trim().toLowerCase() || "";
  let input = el(".search-form input");
  if (input) input.value = q;
  let a = getPets().filter((p) =>
    [p.type, p.district, p.description].some((v) =>
      v?.toLowerCase().includes(q),
    ),
  );
  el("#result-count").textContent = `Найдено: ${a.length}`;
  let chunk = a.slice((page - 1) * 10, page * 10);
  el("#search-results").innerHTML = chunk.length
    ? `<div class="search-table-wrap"><table class="search-table"><thead><tr><th>Фото</th><th>Вид</th><th>Описание</th><th>Клеймо</th><th>Район</th><th>Дата</th><th>Телефон</th></tr></thead><tbody>${chunk.map((p) => `<tr><td><a href="pet.html?id=${p.id}">${img(p.photo, p.type)}</a></td><td><a class="link" href="pet.html?id=${p.id}">${esc(p.type)}</a></td><td>${esc(p.description).slice(0, 110)}</td><td>${esc(p.mark)}</td><td>${esc(p.district)}</td><td>${esc(p.date)}</td><td>${esc(p.phone)}</td></tr>`).join("")}</tbody></table></div>`
    : '<div class="empty">По вашему запросу животных не найдено.</div>';
  el("#pages").innerHTML = Array.from(
    { length: Math.ceil(a.length / 10) },
    (_, i) =>
      `<button class="${page === i + 1 ? "active" : ""}" onclick="page=${i + 1};renderSearch()">${i + 1}</button>`,
  ).join("");
}
function addPage() {
  return `<main class="results-page"><div class="container" style="max-width:850px">
  <h2 id="add-title">Я нашёл животное</h2>
  <p>Расскажите о найденном питомце. Объявление появится после модерации.</p>
  <form id="add-form" class="panel form-grid"><div class="field">
  <label>Ваше имя</label>
  <input class="input" name="finder" required></div>
  <div class="field">
  <label>Телефон</label>
  <input class="input" type="tel" name="phone" required>
  </div>
  <div class="field"><label>E-mail</label>
  <input class="input" type="email" name="email" required>
  </div>
  <div class="field">
  <label>Вид животного</label>
  <select name="type" required>
  <option value="">Выберите вид</option><option>Кошка</option>
  <option>Собака</option>
  <option>Другое</option></select>
  </div><div class="field">
  <label>Район</label>
  <select name="district" required>
  <option value="">Выберите район</option>
  <option>Московский</option>
  <option>Советский</option>
  <option>Октябрьский</option>
  <option>Железнодорожный</option>
  </select></div>
  <div class="field"><label>Дата находки</label>
  <input class="input" type="date" name="date" required>
  </div>
  <div class="field">
  <label>Клеймо (если есть)</label>
  <input class="input" name="mark"></div>
  <div class="field">
  <label>Фото (до 3 штук)</label><input class="input" id="photos" type="file" accept="image/*" multiple>
  <div class="preview-images" id="previews"></div>
  </div>
  <div class="field full">
  <label>Дополнительная информация</label>
  <textarea name="description" rows="5" required placeholder="Где и при каких обстоятельствах нашли животное, порода, приметы…">
  </textarea></div>${!user() ? `<div class="field full">
    <label class="consent">
    <input type="checkbox" id="auto-reg"> Создать личный кабинет при отправке</label>
    <div id="auto-fields" style="display:none;margin-top:12px">
    <label>Пароль (не менее 6 символов)</label>
    <input class="input" type="password" id="auto-password" minlength="6">
    <label>Повтор пароля</label>
    <input class="input" type="password" id="auto-repeat">
    </div>
    </div>` : ""}<label class="consent full">
    <input type="checkbox" required> Согласен на обработку персональных данных</label><div id="add-message" class="full"></div><button class="btn full" type="submit">Опубликовать объявление</button></form></div></main>`;
}
let uploaded = [];
function addInit() {
  let edit = Number(new URLSearchParams(location.search).get("edit")),
    existing = getPets().find((p) => p.id === edit);
  if (existing) {
    el("#add-title").textContent = "Редактирование объявления";
    for (let [k, v] of Object.entries(existing)) {
      let f = el(`[name="${k}"]`);
      if (f) f.value = v;
    }
    uploaded = existing.photos || [existing.photo];
  }
  el("#photos").onchange = async (e) => {
    let files = [...e.target.files];
    if (files.length > 3) {
      alert("Можно добавить не более трёх фотографий");
      e.target.value = "";
      return;
    }
    uploaded = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            let r = new FileReader();
            r.onload = () => resolve(r.result);
            r.onerror = reject;
            r.readAsDataURL(file);
          }),
      ),
    );
    el("#previews").innerHTML = uploaded
      .map((s) => img(s, "Предпросмотр"))
      .join("");
  };
  if (el("#auto-reg"))
    el("#auto-reg").onchange = (e) =>
      (el("#auto-fields").style.display = e.target.checked ? "block" : "none");
  el("#add-form").onsubmit = (e) => {
    e.preventDefault();
    let f = e.target,
      v = Object.fromEntries(new FormData(f));
    let u = user();
    if (el("#auto-reg")?.checked) {
      let a = el("#auto-password").value,
        b = el("#auto-repeat").value;
      if (a.length < 6 || a !== b) {
        el("#add-message").innerHTML =
          '<div class="message bad">Пароль должен содержать минимум 6 символов, пароли должны совпадать.</div>';
        return;
      }
      let users = JSON.parse(localStorage.getItem("nl_users") || "[]");
      if (users.some((x) => x.email === v.email)) {
        el("#add-message").innerHTML =
          '<div class="message bad">Такой e-mail уже зарегистрирован.</div>';
        return;
      }
      u = {
        email: v.email,
        first: v.finder,
        last: "",
        phone: v.phone,
        password: a,
        created: new Date().toISOString(),
      };
      users.push(u);
      localStorage.setItem("nl_users", JSON.stringify(users));
      localStorage.setItem(
        "nl_user",
        JSON.stringify({ ...u, password: undefined }),
      );
    }
    let all = getPets(),
      p = {
        ...existing,
        ...v,
        id: existing?.id || Date.now(),
        owner: u?.email || "",
        status: existing?.status || "На модерации",
        photo: uploaded[0] || existing?.photo || "",
        photos: uploaded.length ? uploaded : existing?.photos || [],
        sex: existing?.sex || "Неизвестно",
        age: existing?.age || "Неизвестно",
      };
    if (existing) all = all.map((x) => (x.id === edit ? p : x));
    else all.unshift(p);
    try {
      savePets(all);
    } catch (err) {
      el("#add-message").innerHTML =
        '<div class="message bad">Недостаточно места в браузере для фотографий. Используйте файлы меньшего размера.</div>';
      return;
    }
    location.href = "pet.html?id=" + p.id;
  };
}
function adminPage() {
  return `<main class="results-page"><div class="container"><h2>Панель администратора</h2><p>Демонстрационная модерация объявлений (локально в этом браузере).</p><div class="panel"><div class="admin-toolbar"><select id="admin-status"><option value="">Все статусы</option><option>На модерации</option><option>Активно</option><option>Найдено</option><option>В архиве</option></select><select id="admin-sort"><option value="new">Сначала новые</option><option value="old">Сначала старые</option></select></div><div id="admin-list"></div></div></div></main>`;
}
function renderAdmin() {
  let status = el("#admin-status").value,
    sort = el("#admin-sort").value;
  let a = getPets()
    .filter((p) => !status || p.status === status)
    .sort((x, y) =>
      sort === "new"
        ? y.date.localeCompare(x.date)
        : x.date.localeCompare(y.date),
    );
  el("#admin-list").innerHTML =
    a
      .map(
        (p) =>
          `<div class="listing">${img(p.photo, p.type)}<div class="listing-info"><strong>${esc(p.type)}</strong><p>${esc(p.district)} · ${esc(p.date)} · ${esc(p.finder)} · ${esc(p.phone)} · ${esc(p.email)}</p><p>${esc(p.description)} · Клеймо: ${esc(p.mark)}</p></div><div class="listing-actions"><select aria-label="Статус объявления" onchange="setStatus(${p.id},this.value)">${["На модерации", "Активно", "Найдено", "В архиве"].map((s) => `<option ${p.status === s ? "selected" : ""}>${s}</option>`).join("")}</select></div></div>`,
      )
      .join("") || "<p>Нет объявлений.</p>";
}
function setStatus(id, status) {
  let p = getPets();
  p.find((x) => x.id === id).status = status;
  savePets(p);
  renderAdmin();
}
function init() {
  let name = location.pathname.split("/").pop() || "index.html",
    mode = name.replace(".html", "");
  document.title =
    ({
      index: "Главная",
      login: "Вход",
      register: "Регистрация",
      profile: "Личный кабинет",
      pet: "Карточка питомца",
      search: "Поиск",
      add: "Добавить животное",
      admin: "Администратор",
    }[mode] || "Новая жизнь") + " — Новая жизнь";
  el("#app").innerHTML =
    header() +
    (
      {
        index: home,
        login: () => auth("login"),
        register: () => auth("register"),
        profile,
        pet: petPage,
        search: searchPage,
        add: addPage,
        admin: adminPage,
      }[mode] || home
    )() +
    footer();
  if (mode === "index") {
    renderCards();
    renderReview();
    el("#newsletter").onsubmit = (e) => {
      e.preventDefault();
      el("#newsletter-message").innerHTML =
        '<div class="message">Спасибо! Вы подписались на новости.</div>';
      e.target.reset();
    };
  }
  if (["login", "register"].includes(mode)) authInit(mode);
  if (mode === "profile" && user()) showProfileTab("ads");
  if (mode === "search") renderSearch();
  if (mode === "add") addInit();
  if (mode === "admin") {
    el("#admin-status").onchange = renderAdmin;
    el("#admin-sort").onchange = renderAdmin;
    renderAdmin();
  }
}
document.addEventListener("DOMContentLoaded", init);
