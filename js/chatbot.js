// чатбот для сайта аэк, работает без интернета и без апи

const COLLEGE_INFO = {
  name: "Алматинский Экономический Колледж (АЭК)",
  address: "г. Алматы, ул. Гоголя 124",
  phones: ["+7 (705) 349 24 01", "+7 (727) 627 50 69"],
  email: "aec.official.almaty@gmail.com",
  experience: "более 80 лет",
  graduates: "2500+",
  specialties: [
    {
      name: "Программное обеспечение",
      qualifications: ["Web-дизайнер", "Разработчик программного обеспечения"],
      duration: "3 года",
      cost: "500 000 ₸/год",
    },
    {
      name: "Банковское дело",
      qualifications: ["Менеджер банковских операций"],
      duration: "2 года",
      cost: "500 000 ₸/год",
    },
    {
      name: "Организация питания",
      qualifications: ["Оператор по производству", "Кондитер", "Повар"],
      duration: "2–3 года",
      cost: "400 000 ₸/год",
    },
    {
      name: "Учет и аудит",
      qualifications: ["Бухгалтер"],
      duration: "2 года",
      cost: "500 000 ₸/год",
    },
  ],
  admissionDocs: [
    "Аттестат об образовании (подлинник)",
    "ЭЦП ключ",
    "6 фотографий 3×4",
    "Медицинская справка (формы №075/у, №063)",
    "Снимок флюорографии",
    "Копия удостоверения личности (своего и родителей)",
    "Для иностранных граждан: выдувка",
  ],
};

// список ключевых слов по которым понимаем что вопрос о колледже

const COLLEGE_KEYWORDS = [
  // общие слова о колледже
  "колледж", "аэк", "алматинский", "экономический", "учебное", "заведение",
  "образование", "обучение", "учёба", "учеба", "специальность", "специальности",
  "направление", "направления", "квалификация", "квалификации",
  // поступление
  "поступление", "поступить", "поступления", "приемная", "приёмная", "комиссия",
  "документы", "документ", "аттестат", "эцп", "флюорография", "справка",
  "гранты", "грант", "бюджет", "бюджетные", "места",
  // стоимость
  "стоимость", "цена", "стоит", "тенге", "оплата", "платить", "оплатить",
  "дорого", "деньги", "взнос",
  // общежитие
  "общежитие", "общага", "проживание", "жильё", "жилье", "иногородний",
  // контакты
  "контакт", "контакты", "адрес", "телефон", "телефоны", "email",
  "почта", "связаться", "позвонить",
  // специальности по направлениям
  "программирование", "программист", "разработчик", "разработка",
  "веб", "web", "дизайнер", "дизайн", "сайт",
  "банк", "банковское", "банкир", "финансы", "финансист",
  "бухгалтер", "бухгалтерия", "учет", "учёт", "аудит",
  "повар", "кондитер", "повара", "кулинария", "питание", "кухня", "готовить",
  // студенческая жизнь
  "студент", "студенты", "студенческий", "кружок", "кружки", "секция",
  "мероприятие", "мероприятия", "самоуправление", "спорт",
  // общие
  "преподаватель", "преподаватели", "учитель", "выпускник", "выпускники",
  "трудоустройство", "работа", "история", "опыт", "лет",
];

// проверяем связан ли вопрос с колледжем

function isCollegeRelated(message) {
  const lower = message.toLowerCase();
  return COLLEGE_KEYWORDS.some((kw) => lower.includes(kw));
}

// генерируем ответ по ключевым словам из сообщения

function generateResponse(message) {
  const m = message.toLowerCase();

  // специальности
  if (
    /специальност|направлени|что учат|чему учат|какие курс|факультет/.test(m)
  ) {
    if (/программ|разработ|веб|web|дизайн|сайт|it\b|ит\b/.test(m)) {
      return (
        "💻 <b>Программное обеспечение</b>\n\n" +
        "Квалификации:\n" +
        "• Web-дизайнер\n" +
        "• Разработчик программного обеспечения\n\n" +
        "📅 Срок обучения: <b>3 года</b>\n" +
        "💰 Стоимость: <b>500 000 ₸/год</b>\n\n" +
        "Хотите узнать о поступлении на это направление?"
      );
    }
    if (/банк|финанс/.test(m)) {
      return (
        "🏦 <b>Банковское дело</b>\n\n" +
        "Квалификации:\n" +
        "• Менеджер банковских операций\n\n" +
        "📅 Срок обучения: <b>2 года</b>\n" +
        "💰 Стоимость: <b>500 000 ₸/год</b>\n\n" +
        "Есть бюджетные места! Хотите узнать подробнее?"
      );
    }
    if (/питани|повар|кондитер|кулинар|кухн/.test(m)) {
      return (
        "🍳 <b>Организация питания</b>\n\n" +
        "Квалификации:\n" +
        "• Оператор по производству\n" +
        "• Кондитер\n" +
        "• Повар\n\n" +
        "📅 Срок обучения: <b>2–3 года</b>\n" +
        "💰 Стоимость: <b>400 000 ₸/год</b>\n\n" +
        "Хотите узнать о поступлении?"
      );
    }
    if (/учет|учёт|бухгалт|аудит/.test(m)) {
      return (
        "📊 <b>Учет и аудит</b>\n\n" +
        "Квалификации:\n" +
        "• Бухгалтер\n\n" +
        "📅 Срок обучения: <b>2 года</b>\n" +
        "💰 Стоимость: <b>500 000 ₸/год</b>\n\n" +
        "Есть бюджетные места! Хотите узнать подробнее?"
      );
    }
    // если спросили про все специальности сразу
    return (
      "📚 В АЭК есть <b>4 основных направления</b>:\n\n" +
      "💻 <b>Программное обеспечение</b>\n" +
      "   Web-дизайнер, Разработчик ПО — 3 года\n\n" +
      "🏦 <b>Банковское дело</b>\n" +
      "   Менеджер банковских операций — 2 года\n\n" +
      "🍳 <b>Организация питания</b>\n" +
      "   Повар, Кондитер, Оператор — 2–3 года\n\n" +
      "📊 <b>Учет и аудит</b>\n" +
      "   Бухгалтер — 2 года\n\n" +
      "Какое направление вас интересует? Расскажу подробнее! 😊"
    );
  }

  // стоимость
  if (/стоимост|цена|стоит|тенге|оплат|платить|деньг|сколько/.test(m)) {
    return (
      "💰 <b>Стоимость обучения в АЭК:</b>\n\n" +
      "• <b>500 000 ₸/год</b> — специалисты среднего звена\n" +
      "  (Программирование, Банковское дело, Учет и аудит)\n\n" +
      "• <b>400 000 ₸/год</b> — рабочие квалификации\n" +
      "  (Организация питания)\n\n" +
      "✅ Есть <b>бюджетные места (гранты)</b> по всем специальностям\n" +
      "✅ Оплата производится <b>поэтапно</b>\n\n" +
      "Хотите узнать об условиях гранта?"
    );
  }

  // поступление и документы
  if (/поступ|документ|аттестат|эцп|справк|флюорограф|как поступить|приемн|приёмн/.test(m)) {
    return (
      "📝 <b>Для поступления в АЭК нужны:</b>\n\n" +
      "1. Аттестат об образовании (подлинник)\n" +
      "2. ЭЦП ключ\n" +
      "3. 6 фотографий 3×4\n" +
      "4. Медицинская справка (формы №075/у, №063)\n" +
      "5. Снимок флюорографии\n" +
      "6. Копия удостоверения личности (своего и родителей)\n" +
      "7. Для иностранных граждан: выдувка\n\n" +
      "📅 <b>Приёмная комиссия открывается 25 июня</b>\n" +
      "🕘 Режим работы: <b>09:00 — 17:00</b>\n\n" +
      "📞 По всем вопросам: <b>+7 (705) 349 24 01</b>"
    );
  }

  // гранты
  if (/грант|бюджет|бесплатн/.test(m)) {
    return (
      "🎓 <b>Гранты (бюджетные места)</b>\n\n" +
      "Да! В АЭК есть бюджетные места по <b>всем специальностям</b>.\n\n" +
      "📅 <b>Приёмная комиссия открывается 25 июня</b>\n" +
      "🕘 Режим работы: <b>09:00 — 17:00</b>\n\n" +
      "Для уточнения количества мест и условий обращайтесь:\n" +
      "📞 <b>+7 (705) 349 24 01</b>\n" +
      "📧 aec.official.almaty@gmail.com"
    );
  }

  // общежитие
  if (/общежит|общага|проживан|жильё|жилье|иногородн/.test(m)) {
    return (
      "🏠 <b>Общежитие</b>\n\n" +
      "Да, у нас есть общежитие для иногородних студентов! ✅\n\n" +
      "Для получения места обращайтесь в приемную комиссию:\n" +
      "📞 <b>+7 (705) 349 24 01</b>\n" +
      "📍 г. Алматы, ул. Гоголя 124"
    );
  }

  // контакты
  if (/контакт|адрес|телефон|позвонить|email|почта|связат|где находит/.test(m)) {
    return (
      "📞 <b>Контакты АЭК:</b>\n\n" +
      "📍 <b>Адрес:</b> г. Алматы, ул. Гоголя 124\n\n" +
      "☎️ <b>Телефоны:</b>\n" +
      "• +7 (705) 349 24 01\n" +
      "• +7 (727) 627 50 69\n\n" +
      "📧 <b>Email:</b> aec.official.almaty@gmail.com\n\n" +
      "Будем рады ответить на все ваши вопросы! 😊"
    );
  }

  // история колледжа
  if (/истори|основан|сколько лет|опыт|о колледже|расскажи о|что такое аэк/.test(m)) {
    return (
      "🏫 <b>Алматинский Экономический Колледж (АЭК)</b>\n\n" +
      "• Государственное учебное заведение\n" +
      "• Более <b>80 лет</b> опыта подготовки специалистов\n" +
      "• <b>2500+</b> выпускников\n" +
      "• <b>7</b> специальностей и <b>10</b> квалификаций\n" +
      "• <b>100%</b> трудоустройство выпускников 🎯\n\n" +
      "Мы гордимся нашими выпускниками! Хотите узнать о специальностях?"
    );
  }

  // трудоустройство
  if (/трудоустройств|работа после|куда идут|перспектив/.test(m)) {
    return (
      "💼 <b>Трудоустройство выпускников АЭК</b>\n\n" +
      "✅ <b>100% трудоустройство</b> — наши выпускники востребованы на рынке!\n\n" +
      "Колледж активно сотрудничает с работодателями и помогает студентам\n" +
      "найти работу по специальности. Хотите узнать подробности?\n\n" +
      "📞 <b>+7 (705) 349 24 01</b>"
    );
  }

  // студенческая жизнь
  if (/студенческ|кружок|секци|мероприяти|спорт|самоуправлени|жизн/.test(m)) {
    return (
      "🎉 <b>Студенческая жизнь в АЭК</b>\n\n" +
      "• 🎭 Кружки по интересам\n" +
      "• ⚽ Спортивные секции\n" +
      "• 🏆 Мероприятия и конкурсы\n" +
      "• 🤝 Студенческое самоуправление\n\n" +
      "У нас интересно учиться и развиваться! 😊\n" +
      "Хотите узнать о специальностях или поступлении?"
    );
  }

  // дата и время работы приёмной комиссии
  if (/когда|откры|режим|часы|расписани|время работ|во сколько/.test(m)) {
    return (
      "📅 <b>Приёмная комиссия АЭК</b>\n\n" +
      "🗓 Открывается: <b>25 июня</b>\n" +
      "🕘 Время работы: <b>09:00 — 17:00</b>\n\n" +
      "📍 Адрес: г. Алматы, ул. Гоголя 124\n" +
      "📞 <b>+7 (705) 349 24 01</b>\n\n" +
      "Ждём вас! Если остались вопросы — с удовольствием отвечу 😊"
    );
  }

  // приветствие
  if (/привет|здравствуй|добр[ыоу]|hello|хай|салем/.test(m)) {
    return (
      "Привет! 👋 Я чат-бот <b>Алматинского Экономического Колледжа</b>.\n\n" +
      "Могу рассказать о:\n" +
      "• 📚 Специальностях и квалификациях\n" +
      "• 📝 Условиях поступления\n" +
      "• 💰 Стоимости обучения\n" +
      "• 🏠 Общежитии\n" +
      "• 📞 Контактах\n\n" +
      "Чем могу помочь? 😊"
    );
  }

  // спасибо
  if (/спасибо|благодар|рахмет/.test(m)) {
    return (
      "Пожалуйста! 😊 Рады помочь!\n\n" +
      "Если остались вопросы — обращайтесь напрямую:\n" +
      "📞 <b>+7 (705) 349 24 01</b>"
    );
  }

  // тема колледжа но не понял конкретно о чём — отправляем на звонок
  return (
    "Хороший вопрос! 😊 По этой теме лучше всего уточнить у нас напрямую:\n\n" +
    "📞 <b>+7 (705) 349 24 01</b>\n" +
    "📧 aec.official.almaty@gmail.com\n" +
    "📍 г. Алматы, ул. Гоголя 124\n\n" +
    "Или выберите одну из тем ниже — я помогу!"
  );
}

// быстрые кнопки для частых вопросов

const QUICK_REPLIES = [
  { label: "📅 Приёмная комиссия", value: "Когда открывается приёмная комиссия?" },
  { label: "📚 Специальности", value: "Какие специальности есть в колледже?" },
  { label: "📝 Как поступить", value: "Какие документы нужны для поступления?" },
  { label: "💰 Стоимость", value: "Сколько стоит обучение?" },
  { label: "🏠 Общежитие", value: "Есть ли общежитие?" },
  { label: "📞 Контакты", value: "Какие контакты колледжа?" },
];

// история сообщений за сессию

let chatHistory = [];

// создаём виджет и вставляем в страницу

function createChatWidget() {
  // подключаем стили если ещё не добавлены
  if (!document.getElementById("chatbot-css")) {
    const link = document.createElement("link");
    link.id = "chatbot-css";
    link.rel = "stylesheet";
    link.href = "/css/chatbot.css";
    document.head.appendChild(link);
  }

  const widget = document.createElement("div");
  widget.id = "chatbot-widget";
  widget.innerHTML = `
    <button id="chatbot-toggle" aria-label="Открыть чат" title="Чат с колледжем">
      <span class="chatbot-icon-open">💬</span>
      <span class="chatbot-icon-close">✕</span>
    </button>

    <div id="chatbot-window" role="dialog" aria-label="Чат с АЭК" aria-hidden="true">
      <div id="chatbot-header">
        <div class="chatbot-header-info">
          <span class="chatbot-avatar">🤖</span>
          <div>
            <div class="chatbot-header-name">Ассистент АЭК</div>
            <div class="chatbot-header-status">
              <span class="chatbot-status-dot"></span> Онлайн
            </div>
          </div>
        </div>
        <button class="chatbot-close-btn" id="chatbot-close" aria-label="Закрыть чат">✕</button>
      </div>

      <div id="chatbot-messages"></div>

      <div id="chatbot-quick-replies"></div>

      <div id="chatbot-input-area">
        <input
          type="text"
          id="chatbot-input"
          placeholder="Напишите вопрос о колледже..."
          maxlength="300"
          autocomplete="off"
        />
        <button id="chatbot-send" aria-label="Отправить">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(widget);
  initChatEvents();
}

// события — открытие закрытие и отправка

function initChatEvents() {
  const toggle = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");
  const window_ = document.getElementById("chatbot-window");

  let isOpen = false;

  function openChat() {
    isOpen = true;
    window_.classList.add("chatbot-open");
    window_.setAttribute("aria-hidden", "false");
    toggle.classList.add("chatbot-toggle-active");
    input.focus();

    if (chatHistory.length === 0) {
      setTimeout(() => {
        addMessage(
          "bot",
          "Привет! 👋 Я чат-бот <b>Алматинского Экономического Колледжа</b>.\n\nЧем могу помочь? Задайте вопрос или выберите тему ниже! 😊"
        );
        renderQuickReplies();
      }, 200);
    }
  }

  function closeChat() {
    isOpen = false;
    window_.classList.remove("chatbot-open");
    window_.setAttribute("aria-hidden", "true");
    toggle.classList.remove("chatbot-toggle-active");
  }

  toggle.addEventListener("click", () => (isOpen ? closeChat() : openChat()));
  closeBtn.addEventListener("click", closeChat);

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });
}

// обработка отправки сообщения

function handleSend() {
  const input = document.getElementById("chatbot-input");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMessage("user", escapeHtml(text));
  hideQuickReplies();

  setTimeout(() => {
    showTyping();
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      hideTyping();
      let response;
      if (isCollegeRelated(text)) {
        response = generateResponse(text);
      } else {
        response =
          "Извините, я могу отвечать только на вопросы об <b>Алматинском Экономическом Колледже</b>. 😊\n\nЧем могу помочь по теме обучения?";
      }
      addMessage("bot", response);
      renderQuickReplies();
    }, delay);
  }, 100);
}

// добавляем сообщение в чат

function addMessage(role, htmlContent) {
  const container = document.getElementById("chatbot-messages");
  const entry = { role, text: htmlContent, time: new Date() };
  chatHistory.push(entry);

  const wrap = document.createElement("div");
  wrap.className = `chatbot-msg-wrap chatbot-msg-${role}`;

  const bubble = document.createElement("div");
  bubble.className = "chatbot-bubble";
  bubble.innerHTML = formatText(htmlContent);

  const time = document.createElement("div");
  time.className = "chatbot-time";
  time.textContent = formatTime(entry.time);

  if (role === "bot") {
    const avatar = document.createElement("span");
    avatar.className = "chatbot-msg-avatar";
    avatar.textContent = "🤖";
    wrap.appendChild(avatar);
  }

  const msgInner = document.createElement("div");
  msgInner.className = "chatbot-msg-inner";
  msgInner.appendChild(bubble);
  msgInner.appendChild(time);
  wrap.appendChild(msgInner);

  container.appendChild(wrap);
  scrollToBottom();
}

// анимация печати — три точки пока бот думает

function showTyping() {
  const container = document.getElementById("chatbot-messages");
  const wrap = document.createElement("div");
  wrap.id = "chatbot-typing";
  wrap.className = "chatbot-msg-wrap chatbot-msg-bot";

  wrap.innerHTML = `
    <span class="chatbot-msg-avatar">🤖</span>
    <div class="chatbot-msg-inner">
      <div class="chatbot-bubble chatbot-typing-bubble">
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
        <span class="chatbot-dot"></span>
      </div>
    </div>
  `;
  container.appendChild(wrap);
  scrollToBottom();
}

function hideTyping() {
  const el = document.getElementById("chatbot-typing");
  if (el) el.remove();
}

// быстрые ответы под сообщениями

function renderQuickReplies() {
  const area = document.getElementById("chatbot-quick-replies");
  area.innerHTML = "";
  QUICK_REPLIES.forEach(({ label, value }) => {
    const btn = document.createElement("button");
    btn.className = "chatbot-quick-btn";
    btn.textContent = label;
    btn.addEventListener("click", () => {
      document.getElementById("chatbot-input").value = value;
      handleSend();
    });
    area.appendChild(btn);
  });
  area.style.display = "flex";
}

function hideQuickReplies() {
  const area = document.getElementById("chatbot-quick-replies");
  area.innerHTML = "";
  area.style.display = "none";
}

// вспомогательные функции

function scrollToBottom() {
  const container = document.getElementById("chatbot-messages");
  container.scrollTop = container.scrollHeight;
}

function formatTime(date) {
  return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatText(html) {
  // переносы строк заменяем на br
  return html.replace(/\n/g, "<br>");
}

// инициализация

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createChatWidget);
} else {
  createChatWidget();
}
