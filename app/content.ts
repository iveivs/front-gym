export type SectionId = "html" | "css" | "js" | "react";

export type Question = {
  prompt: string;
  options: string[];
  correct: number;
  explain: string;
};

export type LessonPart = {
  title: string;
  body: string[];
  code?: string;
};

export type Topic = {
  id: string;
  section: SectionId;
  title: string;
  tag: string;
  level: string;
  time: string;
  source: string;
  summary: string;
  bullets: string[];
  code: string;
  workExample: string;
  mistakes: string[];
  parts?: LessonPart[];
  cheatsheet?: string[];
  questions: Question[];
};

export type Task = {
  title: string;
  section: SectionId;
  level: string;
  topicId?: string;
  prompt: string;
  input: string;
  output: string;
};

export const sections: Record<SectionId, { title: string; note: string }> = {
  html: {
    title: "HTML",
    note: "Документ, семантика, формы, медиа, доступность и SEO-основа.",
  },
  css: {
    title: "CSS",
    note: "Каскад, layout, адаптив, состояния, анимации и поддерживаемая стилизация.",
  },
  js: {
    title: "JavaScript",
    note: "Язык, DOM, события, асинхронность, сеть, хранение, ошибки и браузерные API.",
  },
  react: {
    title: "React",
    note: "Компоненты, состояние, хуки, формы, эффекты, производительность и архитектура UI.",
  },
};

type TopicSeed = {
  id: string;
  section: SectionId;
  title: string;
  tag: string;
  level: string;
  time: string;
  source: string;
  focus: string;
  bullets: string[];
  code: string;
  workExample: string;
  mistakes: string[];
};

const dokaHtml = "https://doka.guide/html/";
const dokaCss = "https://doka.guide/css/";
const dokaJs = "https://doka.guide/js/";
const learnJs = "https://learn.javascript.ru/";
const reactDocs = "https://react.dev/learn";

const htmlCode = `<main>
  <article class="lesson-card">
    <h2>Асинхронность в JS</h2>
    <p>Короткое описание темы.</p>
    <a href="/topics/js-async">Открыть тему</a>
  </article>
</main>`;

const formCode = `<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required />
  <button type="submit">Сохранить</button>
</form>`;

const cssCode = `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.card {
  padding: 16px;
  border: 1px solid #ded7cb;
}`;

const jsCode = `const activeNames = users
  .filter((user) => user.active && user.age >= 18)
  .map((user) => user.name);

console.log(activeNames);`;

const asyncCode = `async function loadProfile(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error("Не удалось загрузить профиль");
  return response.json();
}`;

const reactCode = `function Search({ items }) {
  const [query, setQuery] = useState("");
  const visibleItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return <input value={query} onChange={(event) => setQuery(event.target.value)} />;
}`;

const seeds: TopicSeed[] = [
  seed("html-document", "html", "Структура HTML-документа", "основа", "junior", "16 мин", dokaHtml, "doctype, html, head, body, lang, title, meta viewport и порядок базовых частей страницы", ["DOCTYPE включает стандартный режим браузера.", "lang помогает скринридерам и поисковикам.", "meta viewport нужен, чтобы мобильная версия не выглядела как уменьшенный десктоп.", "title и description влияют на вкладку, сниппеты и сохранённые ссылки."], htmlCode, "На работе это встречается в каждом лендинге, SPA и Next/Vite-проекте: важно не забыть viewport, язык документа и осмысленный title для каждой страницы.", ["Писать страницу без lang.", "Забывать viewport и потом чинить странный мобильный масштаб.", "Класть видимый контент в head."]),
  seed("html-text", "html", "Текст, заголовки и списки", "контент", "junior", "14 мин", dokaHtml, "иерархия h1-h6, p, strong, em, small, blockquote, ul, ol, li и читаемая структура текста", ["Заголовки описывают структуру, а не размер шрифта.", "strong и em добавляют смысл, а не только жирность или курсив.", "Списки нужны для однотипных элементов, инструкций и навигации.", "Текстовые теги помогают роботам и вспомогательным технологиям понимать страницу."], htmlCode, "В интерфейсе документации, блога или карточки товара правильные заголовки помогают пользователю быстро сканировать страницу.", ["Использовать h3 сразу после h1 только ради внешнего вида.", "Делать список из набора div.", "Путать strong с декоративным жирным шрифтом."]),
  seed("html-semantics", "html", "Семантическая разметка", "семантика", "junior", "18 мин", dokaHtml, "header, nav, main, section, article, aside, footer и выбор тега по смыслу", ["main обозначает основной уникальный контент страницы.", "article подходит для самостоятельной карточки новости, поста или товара.", "section должна иметь понятную тему, часто с заголовком.", "button запускает действие, а a ведёт по адресу."], htmlCode, "На работе семантика делает карточки, навигацию и страницы понятнее для SEO, скринридеров и других разработчиков в команде.", ["Верстать всё на div.", "Ставить section вокруг каждого блока без смысловой темы.", "Делать кликабельные span вместо ссылок и кнопок."]),
  seed("html-links", "html", "Ссылки, навигация и якоря", "навигация", "junior", "13 мин", dokaHtml, "a, href, target, rel, download, nav, якорные ссылки и безопасность внешних переходов", ["href определяет адрес, поэтому ссылка работает с клавиатуры и из контекстного меню.", "Для target='_blank' обычно добавляют rel='noopener noreferrer'.", "Якоря помогают быстро переходить к секциям длинной страницы.", "download уместен для скачиваемых файлов, если это поддерживает сценарий."], `<nav>
  <a href="#topics">Темы</a>
  <a href="https://doka.guide/" target="_blank" rel="noopener noreferrer">Дока</a>
</nav>`, "В кабинете пользователя ссылки ведут в разделы, открывают документы, скачивают отчёты и должны оставаться доступными без мыши.", ["Использовать button для обычного перехода.", "Открывать внешнюю ссылку в новой вкладке без rel.", "Оставлять href='#' без реального поведения."]),
  seed("html-media", "html", "Изображения, видео и адаптивные медиа", "media", "junior", "15 мин", dokaHtml, "img, alt, picture, srcset, sizes, loading, video, audio и производительность медиа", ["alt описывает смысл изображения в контексте страницы.", "loading='lazy' помогает не грузить всё сразу.", "picture и srcset позволяют отдавать разные изображения под разные экраны.", "У видео нужны controls, постер и понятная альтернатива, если контент важен."], `<picture>
  <source srcSet="/hero.avif" type="image/avif" />
  <img src="/hero.jpg" alt="Интерфейс тренажёра Front Gym" loading="lazy" />
</picture>`, "На продуктовой странице медиа часто дают основную информацию: скриншот интерфейса, фото товара, обучающее видео.", ["Писать alt='картинка'.", "Грузить огромные изображения на мобильный экран.", "Прятать важный текст только внутри изображения."]),
  seed("html-tables", "html", "Таблицы для данных", "данные", "junior", "14 мин", dokaHtml, "table, caption, thead, tbody, tr, th, td, scope и отличие таблицы данных от layout-сетки", ["Таблица нужна для табличных данных, а не для раскладки страницы.", "caption кратко объясняет, что в таблице.", "th и scope помогают связать заголовки с ячейками.", "Для адаптива таблицу часто превращают в горизонтально прокручиваемую область."], `<table>
  <caption>Результаты тренировки</caption>
  <thead><tr><th scope="col">Тема</th><th scope="col">Счёт</th></tr></thead>
  <tbody><tr><td>DOM</td><td>9/10</td></tr></tbody>
</table>`, "В админках таблицы используются для заказов, пользователей, платежей, расписаний и отчётов.", ["Верстать карточки таблицей.", "Не подписывать колонки через th.", "Делать таблицу шире экрана без прокрутки."]),
  seed("html-forms", "html", "Формы, поля и отправка", "формы", "junior", "20 мин", dokaHtml, "form, label, input, textarea, select, button, name, value, method, action и данные формы", ["label должен быть связан с полем через for/id или вложенность.", "name нужен, чтобы значение попало в данные формы.", "type влияет на нативную валидацию и мобильную клавиатуру.", "button внутри формы по умолчанию может быть submit."], formCode, "Формы есть в логине, поиске, фильтрах, оплате, создании задач, настройках профиля и почти любом бизнес-интерфейсе.", ["Заменять label placeholder-ом.", "Забывать name у полей.", "Не указывать type='button' для обычной кнопки внутри формы."]),
  seed("html-validation", "html", "Нативная валидация форм", "формы", "junior+", "18 мин", dokaHtml, "required, minlength, maxlength, pattern, min, max, step, type email/url/number и понятные ошибки", ["Нативная валидация быстро закрывает базовые правила.", "Сложные бизнес-правила лучше валидировать дополнительно в JS.", "Сообщение об ошибке должно объяснять, что исправить.", "aria-describedby связывает поле с текстом подсказки или ошибки."], formCode, "В регистрации можно проверить email, пароль и согласие ещё до запроса на сервер, но сервер всё равно остаётся главным источником проверки.", ["Показывать только красную рамку без текста.", "Доверять только фронтенд-валидации.", "Использовать pattern без понятной подсказки."]),
  seed("html-accessibility", "html", "Доступность: роли, подписи и клавиатура", "a11y", "junior+", "22 мин", dokaHtml, "семантика, aria-label, aria-describedby, focus, клавиатурная навигация и доступные имена элементов", ["Сначала выбирают правильный HTML-тег, ARIA добавляют там, где семантики не хватает.", "Интерактивный элемент должен быть доступен с клавиатуры.", "Фокус должен быть видимым.", "У кнопок с одной иконкой нужен доступный текст через aria-label."], `<button type="button" aria-label="Закрыть окно">×</button>
<p id="email-hint">Введите рабочий email.</p>
<input aria-describedby="email-hint" />`, "В продукте доступность улучшает UX для всех: фокус помогает клавиатуре, подписи помогают автотестам, семантика снижает баги.", ["Ставить role='button' на div без обработки клавиатуры.", "Убирать outline без замены.", "Писать aria-label, который противоречит видимому тексту."]),
  seed("html-meta-seo", "html", "Мета-теги, SEO и превью ссылок", "seo", "junior", "15 мин", dokaHtml, "title, description, canonical, Open Graph, favicon, robots и базовая подготовка страницы к индексации", ["title должен быть конкретным для страницы.", "description помогает сниппету и шарингу.", "Open Graph управляет карточкой ссылки в мессенджерах и соцсетях.", "canonical помогает избежать дублей."], `<title>Front Gym - тренажёр фронтенда</title>
<meta name="description" content="Конспекты, тесты и задачи по фронтенду" />`, "Для лендинга или статьи хорошее превью ссылки напрямую влияет на клики из Telegram, Slack, поисковика или избранного.", ["Оставлять Starter Project в title.", "Дублировать один description на всех важных страницах.", "Забывать favicon."]),
  seed("html-interactive", "html", "details, dialog и встроенная интерактивность", "html api", "junior+", "16 мин", dokaHtml, "details/summary, dialog, popover-подходы, progress, meter и интерактивность без тяжёлого JS", ["details подходит для раскрывающихся блоков.", "dialog даёт нативную основу модального окна.", "progress показывает ход операции, meter - значение в диапазоне.", "Нативные элементы часто доступнее самописных."], `<details>
  <summary>Что повторить перед собеседованием?</summary>
  <p>Семантику, формы, события, промисы и React hooks.</p>
</details>`, "FAQ, фильтры, подсказки и модальные подтверждения часто можно собрать на нативных элементах и добавить JS только для бизнес-логики.", ["Делать аккордеон на div без клавиатуры.", "Использовать progress для произвольной оценки вместо meter.", "Забывать закрытие и фокус в модальном окне."]),
  seed("html-scripts-data", "html", "script, template и data-атрибуты", "интеграция", "junior+", "17 мин", dokaHtml, "script defer/async/type=module, noscript, template, data-* и связь HTML с JS", ["defer сохраняет порядок скриптов и ждёт разбор HTML.", "async подходит для независимых скриптов, например аналитики.", "data-* хранит небольшие данные для поведения UI.", "template содержит разметку, которую можно клонировать через JS."], `<button data-action="save" data-id="42">Сохранить</button>
<script type="module" src="/app.js"></script>`, "data-атрибуты удобны для делегирования событий: один обработчик читает action и решает, что сделать.", ["Класть секреты в data-*.", "Подключать тяжёлый скрипт без defer.", "Смешивать много логики прямо в HTML-атрибутах."]),

  seed("css-cascade", "css", "Каскад, специфичность и наследование", "основа", "junior", "20 мин", dokaCss, "почему одно CSS-правило побеждает другое: источник, важность, специфичность, порядок и наследование", ["Каскад выбирает победившее значение среди подходящих правил.", "ID специфичнее класса, класс специфичнее тега.", "Не все свойства наследуются: color наследуется, margin нет.", "!important усложняет поддержку и должен быть редким исключением."], cssCode, "В реальном проекте это нужно каждый раз, когда стиль из дизайн-системы не применился или компонент внезапно наследовал цвет.", ["Лечить любой конфликт !important.", "Писать слишком длинные селекторы.", "Не понимать, откуда пришло наследуемое значение."]),
  seed("css-selectors", "css", "Селекторы и псевдоклассы", "селекторы", "junior", "18 мин", dokaCss, "классы, атрибуты, комбинаторы, :hover, :focus-visible, :checked, :disabled, :not, :is, :where", ["Класс остаётся основным способом стилизовать компонент.", "Псевдоклассы описывают состояние или положение элемента.", ":where() не добавляет специфичность.", "Атрибутные селекторы удобны для состояний и data-атрибутов."], `.field:focus-visible {
  outline: 3px solid #f2c94c;
}

.button:not(:disabled):hover {
  background: #14634f;
}`, "Состояния кнопок, полей, выбранных фильтров и ошибок часто полностью описываются CSS-селекторами.", ["Прятать focus-состояние.", "Использовать селектор по тегу для всех кнопок проекта.", "Злоупотреблять вложенностью."]),
  seed("css-box-model", "css", "Блочная модель и размеры", "layout", "junior", "17 мин", dokaCss, "content, padding, border, margin, box-sizing, width, min/max и управление реальным размером элемента", ["box-sizing: border-box делает размеры предсказуемее.", "margin задаёт внешний отступ, padding - внутренний.", "min-width: 0 важен для сжатия элементов в flex/grid.", "max-width помогает тексту не растягиваться на широких экранах."], `.panel {
  box-sizing: border-box;
  width: min(100%, 720px);
  padding: 16px;
  border: 1px solid #ded7cb;
}`, "Карточки, сайдбары, формы и модальные окна ломаются именно на неправильных размерах и отступах.", ["Путать margin и padding.", "Не учитывать border в ширине.", "Ставить фиксированную ширину без max-width."]),
  seed("css-display-flow", "css", "Поток документа и display", "layout", "junior", "16 мин", dokaCss, "block, inline, inline-block, flow layout, display none, visibility hidden и отличие скрытия от удаления из потока", ["Блочные элементы занимают строку, inline идут внутри текста.", "display: none убирает элемент из дерева отображения.", "visibility: hidden оставляет место.", "display меняет поведение внешнего и внутреннего форматирования."], cssCode, "Понимание потока помогает чинить неожиданные переносы, высоту карточек и поведение инлайн-элементов.", ["Ставить width на inline-элемент и ждать результата.", "Скрывать важный контент display:none без альтернативы.", "Использовать br для layout."]),
  seed("css-position", "css", "Позиционирование и z-index", "layout", "junior+", "18 мин", dokaCss, "static, relative, absolute, fixed, sticky, containing block, stacking context и слои интерфейса", ["absolute позиционируется относительно ближайшего позиционированного предка.", "sticky работает внутри области прокрутки.", "z-index зависит от контекста наложения.", "fixed удобен для глобальных панелей, но требует осторожности на мобильных."], `.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
}`, "Попапы, бейджи, липкие шапки, тултипы и модальные окна почти всегда требуют понимания слоёв.", ["Ставить z-index: 999999 без понимания контекста.", "Забывать position: relative у родителя.", "Делать sticky внутри overflow-контейнера и удивляться."]),
  seed("css-flexbox", "css", "Flexbox", "layout", "junior", "20 мин", dokaCss, "одномерная раскладка, main/cross axis, justify-content, align-items, flex-wrap, gap, flex-grow/shrink/basis", ["Flexbox лучше всего работает вдоль одной оси.", "justify-content выравнивает по главной оси.", "align-items выравнивает по поперечной оси.", "flex: 1 означает возможность расти и занимать доступное место."], `.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}`, "Шапки, тулбары, строки карточек, группы кнопок и форма поиска обычно проще всего собрать на flex.", ["Использовать flex для сложной двумерной сетки.", "Не учитывать flex-shrink.", "Выравнивать отступами вместо justify/align."]),
  seed("css-grid", "css", "CSS Grid", "layout", "junior+", "22 мин", dokaCss, "двумерная сетка, columns, rows, gap, fr, minmax, auto-fit, grid areas и адаптивные карточки", ["Grid управляет строками и колонками одновременно.", "fr распределяет свободное пространство.", "repeat(auto-fit, minmax()) помогает строить адаптив без множества брейкпоинтов.", "grid-template-areas делает крупную раскладку читаемой."], cssCode, "Каталог товаров, дашборд, плитка уроков и layout страницы часто удобнее делать на grid.", ["Пытаться сделать двумерную сетку только flex-ом.", "Забывать gap и компенсировать margin-ами.", "Ставить фиксированные колонки на мобильном."]),
  seed("css-responsive", "css", "Адаптивность и mobile first", "mobile", "junior", "21 мин", dokaCss, "viewport, media queries, fluid sizes, touch targets, контентные брейкпоинты и mobile-first подход", ["Сначала задают базовую мобильную раскладку, затем расширяют её.", "Брейкпоинты лучше привязывать к контенту, а не только к устройствам.", "Кнопки на телефоне должны иметь удобную область касания.", "Текст не должен упираться в края экрана."], `@media (min-width: 760px) {
  .layout {
    grid-template-columns: 280px 1fr;
  }
}`, "Если пользователь учится с телефона, мобильная версия является главным интерфейсом, а не уменьшенной копией десктопа.", ["Начинать с широкой таблицы и потом пытаться ужать.", "Использовать vw для всего текста.", "Делать кнопки слишком маленькими."]),
  seed("css-units", "css", "Единицы, функции и ограничения", "основа", "junior+", "17 мин", dokaCss, "px, %, rem, em, vh, svh, fr, calc, min, max, clamp и гибкие размеры", ["rem уважает базовый размер шрифта пользователя.", "% зависит от контекста.", "clamp задаёт нижнюю, предпочтительную и верхнюю границу.", "svh/dvh помогают точнее работать с мобильной высотой."], `.title {
  font-size: clamp(28px, 4vw, 48px);
}

.sidebar {
  width: min(100%, 320px);
}`, "Гибкие размеры уменьшают число медиазапросов и защищают интерфейс от переполнений.", ["Масштабировать весь текст через vw.", "Ставить height: 100vh для мобильного экрана без проверки.", "Не ограничивать слишком широкие строки."]),
  seed("css-typography", "css", "Типографика и читаемость", "ui", "junior", "16 мин", dokaCss, "font-family, font-size, line-height, font-weight, text-wrap, letter-spacing и работа с длинным текстом", ["line-height сильно влияет на читаемость.", "Длинные строки лучше ограничивать max-width.", "letter-spacing не должен ломать русский текст.", "font-weight стоит выбирать из доступных начертаний шрифта."], `.article {
  max-width: 72ch;
  line-height: 1.65;
}

.article h2 {
  text-wrap: balance;
}`, "Конспекты, карточки задач и формы становятся удобнее, когда текст можно сканировать без напряжения.", ["Делать плотный line-height для длинного текста.", "Оставлять строки на всю ширину монитора.", "Использовать декоративный шрифт для интерфейсного текста."]),
  seed("css-colors", "css", "Цвет, контраст и темы", "ui", "junior+", "18 мин", dokaCss, "color, background, currentColor, opacity, contrast, light/dark theme и CSS-переменные для палитры", ["Цвет должен помогать состоянию, а не быть единственным носителем смысла.", "Контраст текста важнее декоративности.", "CSS-переменные удобны для темизации.", "currentColor позволяет иконкам наследовать цвет текста."], `:root {
  --accent: #1f8a70;
}

.link {
  color: var(--accent);
}`, "В дизайн-системе палитра должна работать для кнопок, ошибок, успеха, фона и disabled-состояний.", ["Обозначать ошибку только цветом.", "Делать слабый контраст серого текста.", "Хранить один и тот же цвет в десятках мест."]),
  seed("css-transitions", "css", "Переходы и анимации", "motion", "junior+", "19 мин", dokaCss, "transition, animation, keyframes, transform, opacity, prefers-reduced-motion и производительность", ["transition подходит для плавного перехода между состояниями.", "transform и opacity обычно анимируются дешевле layout-свойств.", "prefers-reduced-motion уважает системные настройки пользователя.", "Анимация должна помогать понять изменение, а не мешать."], `.button {
  transition: transform 160ms ease, background 160ms ease;
}

.button:active {
  transform: translateY(1px);
}`, "Микроанимации полезны для нажатий, раскрытий, появления уведомлений и смены состояния загрузки.", ["Анимировать width/height без необходимости.", "Игнорировать reduced motion.", "Делать слишком долгие интерфейсные анимации."]),
  seed("css-transform-overflow", "css", "Transform, overflow и прокрутка", "layout", "junior+", "18 мин", dokaCss, "transform, overflow, scroll containers, sticky внутри прокрутки, object-fit и управление выходящим контентом", ["overflow создаёт область прокрутки и влияет на sticky.", "transform может создать новый контекст наложения.", "object-fit помогает управлять изображениями.", "overflow-wrap защищает интерфейс от длинных слов и ссылок."], `.code {
  overflow-x: auto;
  overflow-wrap: normal;
}

.avatar {
  object-fit: cover;
}`, "Таблицы, кодовые блоки, длинные URL и карточки с изображениями часто ломают мобильную версию без overflow-правил.", ["Скрывать важный контент overflow:hidden.", "Не проверять длинные строки.", "Ждать, что sticky работает в любом overflow."]),
  seed("css-forms", "css", "Стилизация форм и состояний", "forms", "junior", "17 мин", dokaCss, "input, button, label, focus, disabled, invalid, placeholder, размеры касаний и визуальная обратная связь", ["Состояние focus должно быть видимым.", "disabled должен выглядеть недоступным, но не исчезать.", ":invalid можно использовать для базовой подсветки ошибок.", "Кнопка должна иметь понятное hover/active/focus состояние."], `.field:invalid {
  border-color: #c2413b;
}

.field:focus-visible {
  outline: 3px solid #f2c94c;
}`, "Формы регистрации, фильтров и оплаты требуют ясной обратной связи на каждое состояние.", ["Убирать outline.", "Делать placeholder слишком бледным.", "Не стилизовать disabled."]),
  seed("css-custom-properties", "css", "CSS-переменные и дизайн-система", "architecture", "junior+", "20 мин", dokaCss, "custom properties, tokens, fallback, scope, theme override и поддерживаемость UI", ["Переменные наследуются и могут переопределяться на уровне компонента.", "Fallback задаётся вторым аргументом var().", "Токены помогают держать цвета, отступы и радиусы едиными.", "Переменные можно менять через классы темы."], `.theme-dark {
  --panel: #171411;
  --text: #fffdfa;
}

.card {
  background: var(--panel, white);
  color: var(--text, black);
}`, "Когда в проекте десятки экранов, переменные помогают быстро менять тему и не искать цвета вручную.", ["Создавать переменную для случайного одноразового значения.", "Не задавать fallback там, где значение критично.", "Смешивать токены и сырые цвета без системы."]),
  seed("css-modern", "css", "Современный CSS: container queries, layers, nesting", "modern", "junior+", "22 мин", dokaCss, "container queries, cascade layers, :has, nesting и осторожное использование новых возможностей", ["Container queries реагируют на размер контейнера, а не окна.", "Cascade layers помогают управлять приоритетом групп стилей.", ":has() позволяет выбирать родителя по содержимому.", "Новые возможности нужно проверять по поддержке браузеров проекта."], `@container (min-width: 420px) {
  .card {
    grid-template-columns: auto 1fr;
  }
}`, "Компонент в сайдбаре и в широкой области может выглядеть по-разному без глобальных брейкпоинтов.", ["Использовать новую фичу без проверки поддержки.", "Путать container query с media query.", "Усложнять CSS ради модности."]),

  seed("js-values", "js", "Переменные, типы и преобразования", "язык", "junior", "20 мин", learnJs, "let, const, primitive types, typeof, truthy/falsy, явные и неявные преобразования", ["const запрещает переназначение переменной, но не делает объект неизменяемым.", "null и undefined означают разные состояния отсутствия значения.", "Неявные преобразования часто являются источником багов.", "Для сравнения обычно используют ===."], jsCode, "Валидация формы, подготовка данных для API и отображение пустых состояний постоянно требуют аккуратной работы с типами.", ["Использовать == без причины.", "Думать, что const замораживает объект.", "Не отличать пустую строку от отсутствующего значения."]),
  seed("js-control-flow", "js", "Условия, циклы и управление потоком", "язык", "junior", "16 мин", learnJs, "if, switch, for, while, break, continue, early return и читаемая ветвистая логика", ["Ранний return часто делает функцию проще.", "switch полезен для набора известных вариантов.", "for...of удобен для перебора значений.", "Циклы должны иметь понятные условия остановки."], `function getBadge(score) {
  if (score >= 90) return "Отлично";
  if (score >= 70) return "Хорошо";
  return "Повторить";
}`, "Бизнес-правила скидок, статусов заказа и доступности кнопок обычно состоят из условий.", ["Писать вложенные if на пять уровней.", "Забывать break в switch, если падение не задумано.", "Менять массив во время сложного перебора без необходимости."]),
  seed("js-functions", "js", "Функции, область видимости и замыкания", "язык", "junior+", "23 мин", learnJs, "function declaration, expression, arrow, параметры, return, scope, closure и lexical environment", ["Функция создаёт свою область видимости.", "Замыкание позволяет функции помнить внешние переменные.", "Arrow function не имеет своего this.", "Параметры по умолчанию упрощают защиту от undefined."], `function createCounter() {
  let value = 0;
  return () => {
    value += 1;
    return value;
  };
}`, "Debounce, обработчики событий, фабрики функций и кастомные хуки React опираются на замыкания.", ["Не понимать, почему обработчик видит старое значение.", "Использовать arrow там, где нужен собственный this.", "Делать функцию с несколькими несвязанными обязанностями."]),
  seed("js-objects", "js", "Объекты, this и прототипы", "язык", "junior+", "24 мин", learnJs, "object literals, property access, methods, this, prototype chain, Object.keys/values/entries", ["this определяется способом вызова функции.", "Прототипы позволяют объектам наследовать свойства и методы.", "Object.entries удобен для преобразования объекта в пары ключ-значение.", "Опциональная цепочка ?. защищает чтение вложенных свойств."], `const user = {
  name: "Svetoslav",
  sayHi() {
    return \`Привет, \${this.name}\`;
  },
};`, "Данные пользователя, настройки приложения, ответы API и словари статусов почти всегда представлены объектами.", ["Потерять this при передаче метода как callback.", "Мутировать общий объект настроек.", "Путать свойство из объекта и свойство из прототипа."]),
  seed("js-arrays", "js", "Массивы и методы перебора", "язык", "junior", "22 мин", learnJs, "map, filter, reduce, find, some, every, sort, includes и неизменяемая обработка списков", ["map возвращает новый массив той же длины.", "filter оставляет элементы по условию.", "find возвращает первый найденный элемент или undefined.", "sort мутирует массив, поэтому копируй перед сортировкой, если исходный порядок важен."], jsCode, "Списки товаров, задач, уроков, комментариев и результатов тестов почти всегда фильтруются, сортируются и мапятся.", ["Использовать map ради side effect.", "Забывать, что sort мутирует.", "Писать reduce там, где find/filter читается проще."]),
  seed("js-strings-numbers", "js", "Строки, числа, даты и JSON", "данные", "junior", "19 мин", learnJs, "string methods, template literals, Number, parseInt, Intl, Date, JSON.parse/stringify", ["Template literals удобны для строк с выражениями.", "Number.isNaN надёжнее глобального isNaN для проверки NaN.", "Date хранит момент времени, форматирование лучше отдавать Intl.", "JSON не хранит функции, undefined и специальные типы как Date без преобразования."], `const price = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
}).format(1290);`, "Фронтенд постоянно форматирует цены, даты, имена, локализацию и сериализует данные для localStorage.", ["Парсить деньги через parseInt без проверки.", "Сравнивать даты как отформатированные строки.", "Ждать, что JSON сохранит методы объекта."]),
  seed("js-map-set", "js", "Map, Set, WeakMap и итераторы", "данные", "junior+", "20 мин", learnJs, "Map, Set, WeakMap, WeakSet, iterable protocol, for...of и уникализация данных", ["Set хранит уникальные значения.", "Map позволяет использовать ключи любого типа.", "WeakMap не мешает сборке мусора для объектных ключей.", "for...of работает с итерируемыми объектами."], `const uniqueTags = [...new Set(["js", "css", "js"])];
const cache = new Map();
cache.set("profile:42", { name: "Ann" });`, "Set удобен для выбранных фильтров, Map - для кешей и быстрого доступа по id.", ["Использовать объект как Map для любых ключей.", "Ждать индексы у Set.", "Путать for...in и for...of."]),
  seed("js-destructuring-modules", "js", "Деструктуризация, spread/rest и модули", "язык", "junior+", "21 мин", learnJs, "destructuring, spread, rest parameters, import/export, named/default exports и организация файлов", ["Деструктуризация делает извлечение данных короче.", "Spread копирует поверхностно.", "Rest собирает остаток аргументов или свойств.", "ES-модули помогают делить проект на понятные файлы."], `const { id, profile: { name } } = user;
const nextFilters = { ...filters, page: 1 };
export function formatUser(user) { return user.name; }`, "В React props, API-ответы, настройки фильтров и утилиты почти всегда проходят через spread/rest и модули.", ["Думать, что spread делает глубокую копию.", "Смешивать default и named import без понимания.", "Деструктурировать слишком глубоко без читаемости."]),
  seed("js-errors", "js", "Ошибки, try/catch и отладка", "качество", "junior+", "19 мин", learnJs, "throw, Error, try/catch/finally, stack trace, console, graceful degradation и сообщения пользователю", ["throw создаёт ошибочный сценарий, который можно поймать выше.", "finally подходит для очистки состояния загрузки.", "Пользователю нужен понятный текст, разработчику - техническая причина.", "Не каждую ошибку нужно проглатывать."], `try {
  const profile = await loadProfile(id);
  render(profile);
} catch (error) {
  showMessage("Профиль не загрузился. Попробуйте ещё раз.");
}`, "Загрузка данных, формы и платежи требуют аккуратного error state, иначе интерфейс зависает или молча ломается.", ["Писать пустой catch.", "Показывать пользователю сырой stack trace.", "Не выключать loading при ошибке."]),
  seed("js-dom", "js", "DOM: поиск и изменение элементов", "browser", "junior", "21 мин", dokaJs, "document, querySelector, textContent, classList, attributes, dataset, createElement и безопасное обновление DOM", ["querySelector возвращает первый элемент или null.", "textContent безопаснее для пользовательского текста.", "classList управляет классами без ручной строки.", "dataset читает data-атрибуты."], `const button = document.querySelector("[data-action='save']");
button?.classList.add("is-loading");
button?.setAttribute("aria-busy", "true");`, "В проектах без React, виджетах, аналитике и интеграциях часто нужно точечно управлять DOM.", ["Использовать innerHTML с пользовательским вводом.", "Не проверять null после querySelector.", "Перетирать все классы через className без причины."]),
  seed("js-events", "js", "События, всплытие и делегирование", "browser", "junior+", "24 мин", learnJs, "addEventListener, event target/currentTarget, bubbling, capturing, preventDefault, stopPropagation и delegation", ["Большинство событий всплывают от цели к родителям.", "target - исходный элемент, currentTarget - элемент с обработчиком.", "preventDefault отменяет стандартное действие.", "Делегирование позволяет обрабатывать динамические списки одним обработчиком."], `list.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  removeItem(button.dataset.remove);
});`, "Списки задач, таблицы, меню и карточки часто создаются динамически, поэтому делегирование снижает число обработчиков.", ["Путать target и currentTarget.", "Останавливать propagation без необходимости.", "Вешать обработчик на каждый элемент большого списка."]),
  seed("js-forms-browser", "js", "Формы в JavaScript", "browser", "junior", "20 мин", learnJs, "submit, FormData, input/change, constraint validation API и управление ошибками формы", ["submit лучше ловить на форме, а не только на кнопке.", "FormData собирает значения полей по name.", "input срабатывает при каждом вводе, change - после изменения значения.", "setCustomValidity добавляет кастомную ошибку в нативную валидацию."], `form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});`, "Форма регистрации, фильтр заказов или поиск по каталогу должны собирать данные, валидировать и показывать ошибки без перезагрузки.", ["Забывать preventDefault при AJAX-отправке.", "Читать value у всех полей вручную без FormData.", "Не очищать старые ошибки."]),
  seed("js-storage", "js", "localStorage, sessionStorage и cookies", "browser", "junior+", "18 мин", learnJs, "browser storage, сериализация, ограничения, cookie flags и что можно хранить на клиенте", ["localStorage хранит строки между сессиями.", "sessionStorage живёт в рамках вкладки.", "Объекты нужно сериализовать через JSON.", "Секреты и токены лучше не хранить в localStorage без веской архитектурной причины."], `const progress = { "js-dom": 8 };
localStorage.setItem("progress", JSON.stringify(progress));
const saved = JSON.parse(localStorage.getItem("progress") || "{}");`, "Прогресс тренажёра, тема интерфейса и локальные черновики подходят для browser storage.", ["Хранить пароль в localStorage.", "Забывать JSON.parse/stringify.", "Не обрабатывать битые данные из хранилища."]),
  seed("js-timers-event-loop", "js", "Таймеры, event loop и очереди", "асинхронность", "junior+", "25 мин", learnJs, "setTimeout, setInterval, call stack, task queue, microtasks, rendering и порядок выполнения кода", ["setTimeout ставит задачу на будущее, но не гарантирует точную миллисекунду.", "Promise callbacks обычно попадают в microtask queue.", "Долгий синхронный код блокирует интерфейс.", "Интервалы нужно очищать."], `console.log("start");
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
console.log("end");`, "Понимание event loop помогает объяснить задержки UI, debounce, loading state и порядок логов на собеседовании.", ["Думать, что setTimeout(..., 0) выполнится сразу.", "Не очищать setInterval.", "Блокировать поток тяжёлым циклом."]),
  seed("js-promises-fetch", "js", "Promise, async/await и fetch", "асинхронность", "junior+", "28 мин", learnJs, "Promise states, then/catch/finally, async functions, await, fetch, response.ok, AbortController и параллельные запросы", ["async-функция всегда возвращает Promise.", "await работает внутри async-функции или модуля.", "fetch не падает на HTTP 404 сам по себе, проверяй response.ok.", "Promise.all запускает ожидание нескольких операций и падает при первой ошибке."], asyncCode, "Любой список данных, профиль пользователя, автокомплит или сохранение формы используют асинхронность и состояния loading/error/success.", ["Не проверять response.ok.", "Смешивать then и await так, что ошибки теряются.", "Делать последовательные await там, где запросы независимы."]),
  seed("js-network", "js", "Сеть: REST, CORS, WebSocket и SSE", "browser", "junior+", "22 мин", learnJs, "HTTP methods, headers, status codes, CORS, REST, WebSocket, Server-Sent Events и обработка сетевых сценариев", ["GET обычно читает данные, POST создаёт или запускает действие.", "CORS контролирует доступ браузера к ответу другого origin.", "WebSocket нужен для двустороннего real-time.", "SSE подходит для потока событий от сервера к клиенту."], `const response = await fetch("/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Повторить CSS Grid" }),
});`, "Чаты, уведомления, статусы заказов, аналитика и автосохранение требуют понимания сетевых ограничений браузера.", ["Пытаться починить CORS только на фронтенде.", "Не различать 401, 403 и 404.", "Повторять запрос без ограничения попыток."]),
  seed("js-classes", "js", "Классы и наследование", "язык", "junior+", "20 мин", learnJs, "class, constructor, extends, super, private fields, static methods и отличие синтаксиса классов от прототипной природы JS", ["class - синтаксис поверх прототипов.", "constructor создаёт начальное состояние экземпляра.", "extends и super связывают наследование.", "static методы принадлежат классу, а не экземпляру."], `class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}`, "Классы полезны для ошибок, моделей SDK, сервисов и обёрток вокруг API, хотя в React UI чаще используют функции.", ["Забывать super в наследнике.", "Использовать классы там, где объект или функция проще.", "Путать static и instance методы."]),
  seed("js-regexp", "js", "Регулярные выражения", "данные", "junior+", "18 мин", learnJs, "RegExp, test, match, replace, flags, groups и осторожная валидация строк", ["test проверяет совпадение.", "Флаги i, g, u меняют поведение поиска.", "Группы помогают извлекать части строки.", "Сложная валидация email регуляркой часто хуже нативного type=email и серверной проверки."], `const phone = "+7 999 123-45-67";
const digits = phone.replace(/\\D/g, "");
console.log(digits);`, "Регулярки часто нужны для масок, очистки телефона, поиска в тексте и простого парсинга логов.", ["Писать нечитаемую регулярку без комментария.", "Валидировать сложные форматы только регуляркой.", "Забывать экранирование спецсимволов."]),
  seed("js-performance", "js", "Производительность: debounce, throttle, lazy work", "качество", "junior+", "24 мин", learnJs, "debounce, throttle, requestAnimationFrame, lazy loading, expensive calculations и измерение проблем", ["Debounce ждёт паузу перед вызовом.", "Throttle ограничивает частоту вызовов.", "requestAnimationFrame синхронизируется с отрисовкой.", "Сначала измеряй проблему, потом оптимизируй."], `function debounce(fn, delay) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}`, "Поиск, resize, scroll, автосохранение и аналитика не должны запускать тяжёлую работу на каждый пиксель или символ.", ["Оптимизировать без измерения.", "Делать API-запрос на каждый ввод символа.", "Путать debounce и throttle."]),
  seed("js-security", "js", "Безопасность в браузере: XSS, CSRF, CORS", "security", "junior+", "24 мин", learnJs, "XSS, innerHTML, escaping, CSP, same-origin policy, CSRF basics и безопасная работа с пользовательским вводом", ["XSS часто возникает при вставке неподготовленного HTML.", "textContent безопаснее для обычного текста.", "CORS не является авторизацией.", "CSRF связан с тем, что браузер автоматически отправляет cookies."], `message.textContent = userInput;
// Не так: message.innerHTML = userInput;`, "Комментарии, чат, профиль пользователя и CMS-контент нельзя вставлять как HTML без санитайза.", ["Доверять данным с клиента.", "Использовать innerHTML для пользовательского ввода.", "Считать CORS защитой API от всех клиентов."]),
  seed("js-tooling", "js", "Модули, npm, сборка и качество кода", "tooling", "junior", "20 мин", learnJs, "package.json, npm scripts, dependencies, bundlers, transpilation, linting, formatting и окружения dev/prod", ["package.json описывает зависимости и команды проекта.", "devDependencies нужны для разработки, dependencies - для runtime.", "Сборщик объединяет модули и подготавливает код для браузера.", "Линтер ловит часть ошибок и поддерживает стиль команды."], `{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`, "Junior часто запускает проект, чинит сборку, добавляет пакет и должен понимать, что поменялось в lockfile.", ["Ставить пакет без понимания размера и назначения.", "Коммитить секреты в .env.", "Игнорировать ошибки сборки."]),

  seed("react-jsx", "react", "JSX и компоненты", "основа", "junior", "20 мин", reactDocs, "JSX, components, props, composition, fragments и отличие описания UI от HTML-строки", ["Компонент возвращает описание интерфейса.", "JSX выражения пишутся в фигурных скобках.", "Композиция обычно лучше наследования UI.", "Фрагмент позволяет вернуть несколько элементов без лишнего div."], reactCode, "Любой экран React-приложения собирается из маленьких компонентов: кнопок, карточек, форм, списков и layout-блоков.", ["Думать, что JSX - обычная HTML-строка.", "Делать огромный компонент на весь экран.", "Забывать key в списке фрагментов."]),
  seed("react-props-state", "react", "Props, state и события", "основа", "junior", "24 мин", reactDocs, "передача данных сверху вниз, локальное состояние, setState/useState, обработчики событий и controlled UI", ["Props нельзя менять внутри дочернего компонента.", "State меняют через setter.", "Обработчик события получает объект события React.", "Состояние должно быть минимальным и достаточным."], reactCode, "Фильтр товаров, открытие модального окна, выбранный таб и текст поиска - типичные state-сценарии.", ["Мутировать state напрямую.", "Копировать props в state без причины.", "Вызывать обработчик во время рендера вместо передачи функции."]),
  seed("react-lists-keys", "react", "Списки, условия и key", "рендер", "junior", "20 мин", reactDocs, "map в JSX, conditional rendering, key, empty state и стабильная идентичность элементов", ["key должен быть стабильным среди соседей.", "Индекс подходит только для статичных списков.", "Условный рендер должен оставлять понятное пустое состояние.", "map в JSX должен возвращать элемент."], `{items.length === 0 ? (
  <p>Пока ничего нет</p>
) : (
  items.map((item) => <Card key={item.id} item={item} />)
)}`, "Таблицы, карточки товаров, результаты поиска и todo-листы почти всегда рендерятся из массива.", ["Использовать Math.random() как key.", "Не показывать empty state.", "Писать сложные условия прямо в JSX без вынесения."]),
  seed("react-forms", "react", "Формы в React", "forms", "junior+", "24 мин", reactDocs, "controlled inputs, textarea/select, checkbox, validation, submit, touched/errors и UX форм", ["Controlled input хранит value в state.", "onSubmit на form лучше клика по кнопке.", "Ошибки должны быть связаны с полями.", "Для сложных форм состояние лучше структурировать."], `function LoginForm() {
  const [email, setEmail] = useState("");
  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}`, "Форма логина, настройки профиля и фильтры требуют синхронизации значения, ошибок и состояния отправки.", ["Делать форму только на onClick кнопки.", "Не обрабатывать disabled/loading при submit.", "Хранить все поля отдельными useState в огромной форме без системы."]),
  seed("react-effects", "react", "useEffect и синхронизация", "hooks", "junior+", "28 мин", reactDocs, "useEffect, dependencies, cleanup, subscriptions, fetch, timers и отличие эффекта от вычисления во время рендера", ["useEffect нужен для синхронизации с внешним миром.", "Зависимости должны соответствовать значениям, которые использует эффект.", "Cleanup очищает подписки, таймеры и незавершённые операции.", "Не каждый derived value требует эффекта."], `useEffect(() => {
  const controller = new AbortController();
  loadData({ signal: controller.signal });
  return () => controller.abort();
}, [userId]);`, "Загрузка профиля, подписка на resize, таймер тренировки и интеграция с DOM API - нормальные причины для эффекта.", ["Использовать effect для простого фильтра массива.", "Оставлять пустой массив зависимостей при использовании props.", "Не чистить таймер или подписку."]),
  seed("react-hooks-rules", "react", "Правила хуков и custom hooks", "hooks", "junior+", "23 мин", reactDocs, "rules of hooks, custom hooks, shared logic, naming use*, stable order и вынос повторяемой логики", ["Хуки вызывают только на верхнем уровне компонента или другого хука.", "Порядок вызовов должен быть одинаковым между рендерами.", "Custom hook начинается с use.", "Хук переиспользует логику, а не состояние между разными вызовами автоматически."], `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}`, "Повторяемая логика загрузки, localStorage, media query или формы часто выносится в custom hook.", ["Вызывать hook внутри if.", "Думать, что custom hook делает глобальное состояние.", "Называть обычную функцию useSomething без хуков внутри."]),
  seed("react-ref", "react", "useRef и работа с DOM", "hooks", "junior+", "18 мин", reactDocs, "useRef, mutable value, DOM reference, focus management и отличие ref от state", ["Изменение ref не вызывает ререндер.", "ref подходит для доступа к DOM-элементу.", "ref можно использовать для хранения id таймера.", "Фокусом лучше управлять осознанно после пользовательского действия."], `const inputRef = useRef<HTMLInputElement | null>(null);

function focusSearch() {
  inputRef.current?.focus();
}`, "Фокус поля поиска, прокрутка к ошибке формы, измерение элемента и хранение таймера - частые ref-сценарии.", ["Хранить отображаемые данные в ref вместо state.", "Читать ref до монтирования.", "Манипулировать DOM там, где лучше описать UI через state."]),
  seed("react-memo", "react", "useMemo, useCallback и ререндеры", "performance", "junior+", "24 мин", reactDocs, "memoization, referential equality, React.memo, expensive calculations и когда оптимизация оправдана", ["useMemo кеширует результат вычисления.", "useCallback кеширует ссылку на функцию.", "Мемоизация имеет цену и не нужна автоматически.", "Оптимизацию лучше делать после понимания причины ререндеров."], `const visibleItems = useMemo(
  () => items.filter((item) => item.title.includes(query)),
  [items, query],
);`, "Большие таблицы, фильтры и дочерние memo-компоненты могут выиграть от стабильных значений.", ["Оборачивать всё в useMemo.", "Не указывать реальные зависимости.", "Использовать memo для дешёвого компонента без проблемы."]),
  seed("react-context", "react", "Context и сквозные данные", "architecture", "junior+", "22 мин", reactDocs, "createContext, Provider, useContext, theme, auth, locale и отличие context от глобального хранилища для всего", ["Context удобен для данных, нужных многим компонентам.", "Частые изменения context могут ререндерить много потомков.", "Provider задаёт значение для дерева ниже.", "Context не заменяет архитектуру состояния автоматически."], `const ThemeContext = createContext("light");

function Button() {
  const theme = useContext(ThemeContext);
  return <button data-theme={theme}>Сохранить</button>;
}`, "Тема, язык интерфейса, текущий пользователь и настройки доступа часто идут через context.", ["Класть в один context всё приложение.", "Часто менять большое значение context.", "Использовать context там, где достаточно props."]),
  seed("react-reducer", "react", "useReducer и сложное состояние", "state", "junior+", "22 мин", reactDocs, "reducer, actions, immutable updates, state transitions и предсказуемость сложной логики", ["Reducer описывает переход из старого состояния в новое по action.", "Обновления должны быть неизменяемыми.", "Actions лучше называть по событию пользователя или доменной операции.", "useReducer полезен, когда state связан и ветвится."], `function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, items: [...state.items, action.item] };
    default:
      return state;
  }
}`, "Конструктор фильтров, квиз, корзина и многошаговая форма часто читаются лучше через reducer.", ["Мутировать state в reducer.", "Делать слишком общий action type='set'.", "Выносить в reducer простую булевую кнопку без нужды."]),
  seed("react-data", "react", "Загрузка данных и состояния UI", "data", "junior+", "26 мин", reactDocs, "loading, error, data, empty state, retry, abort, race conditions и разделение серверных данных от локального UI", ["Для запроса нужны состояния загрузки, ошибки и данных.", "Пустой список - отдельное состояние, не ошибка.", "Повторный запрос должен уметь отменить или игнорировать старый результат.", "Серверные данные и UI-состояние лучше не смешивать без причины."], `const [status, setStatus] = useState("idle");
const [data, setData] = useState(null);
const [error, setError] = useState(null);`, "Профиль, список заказов, поиск и автокомплит должны показывать понятные loading/error/empty/success состояния.", ["Показывать пустой экран во время загрузки.", "Не учитывать race condition при быстром поиске.", "Хранить ответ API и форму редактирования в одном объекте без разделения."]),
  seed("react-routing", "react", "Роутинг и SPA-навигация", "architecture", "junior+", "19 мин", reactDocs, "client routing, routes, params, query string, navigation state и доступность переходов", ["Роут отражает состояние экрана в URL.", "Параметры удобны для id сущности.", "Query string подходит для фильтров и поиска.", "Навигация должна работать через ссылки, где это переход."], `<a href="/topics/js-promises-fetch">Promise и fetch</a>`, "Каталог тем, профиль пользователя, карточка заказа и фильтры должны открываться по ссылке и переживать перезагрузку.", ["Хранить важный экран только в локальном state без URL.", "Использовать button для переходов.", "Не сбрасывать scroll/focus при смене страницы."]),
  seed("react-styling", "react", "Стилизация React-компонентов", "ui", "junior", "18 мин", reactDocs, "className, CSS modules, utility CSS, CSS-in-JS, conditional classes и связь состояния со стилем", ["В React используется className, а не class.", "Состояние компонента часто превращается в класс или data-атрибут.", "Подход стилизации должен быть единым в проекте.", "Инлайн-стили удобны для динамических чисел, но плохо заменяют CSS."], `<button className={isActive ? "tab active" : "tab"}>
  Конспект
</button>`, "Табы, кнопки, выбранные фильтры, ошибки формы и активная навигация требуют условных классов.", ["Смешивать все подходы стилизации в одном компоненте.", "Писать class вместо className.", "Хранить сложные media queries в inline style."]),
  seed("react-composition", "react", "Композиция, children и переиспользование", "architecture", "junior+", "21 мин", reactDocs, "children, slots-подход, presentational/container split и границы ответственности компонентов", ["children позволяет передавать внутрь компонента произвольный UI.", "Композиция делает компоненты гибче, чем набор флагов на всё.", "Компонент должен иметь понятную ответственность.", "Переиспользование не должно ухудшать читаемость."], `function Panel({ title, children }) {
  return <section className="panel"><h2>{title}</h2>{children}</section>;
}`, "Модальные окна, панели, layout, карточки и формы часто делают через композицию.", ["Делать компонент с двадцатью boolean props.", "Выносить абстракцию после одного использования.", "Смешивать загрузку данных и оформление везде подряд."]),
  seed("react-errors-suspense", "react", "Error boundaries, Suspense и fallback UI", "advanced", "junior+", "22 мин", reactDocs, "error boundaries, fallback, Suspense, lazy loading и graceful degradation интерфейса", ["Error boundary ловит ошибки рендера ниже по дереву.", "Suspense показывает fallback для поддерживаемых асинхронных сценариев.", "Fallback должен быть похож на будущий контент по размеру.", "Ошибка части экрана не должна ломать всё приложение."], `const Settings = lazy(() => import("./Settings"));

<Suspense fallback={<p>Загрузка настроек...</p>}>
  <Settings />
</Suspense>`, "Ленивая загрузка тяжёлых экранов настроек, редакторов и графиков улучшает первый запуск приложения.", ["Делать fallback, который прыгает по высоте.", "Ждать, что error boundary поймает ошибку в async callback.", "Лениво грузить каждый крошечный компонент."]),
  seed("react-tests", "react", "Тестирование React-интерфейсов", "quality", "junior+", "20 мин", reactDocs, "unit tests, component tests, user-centric queries, events, mocks и проверка поведения вместо реализации", ["Тест лучше описывает поведение пользователя.", "Ищи элементы по роли и видимому тексту, когда возможно.", "Моки нужны для сети и внешних зависимостей.", "Слишком хрупкие тесты мешают рефакторингу."], `// пример идеи теста:
// пользователь вводит текст, нажимает Добавить,
// новая задача появляется в списке`, "Формы, фильтры, модальные окна и критичные пользовательские сценарии стоит покрывать тестами.", ["Проверять внутренний state вместо результата на экране.", "Мокать всё подряд.", "Писать тесты только на snapshot."]),
];

export const topics: Topic[] = seeds.map((item) => enrichTopic({
  ...item,
  summary: makeSummary(item),
  questions: makeQuestions(item),
}));

export const tasks: Task[] = [
  task("Семантическая страница урока", "html", "junior", "Сверстай страницу темы: шапка, навигация, основной материал, блок практики и футер. Используй семантические теги и один h1.", "title = 'Promise и fetch'; sections = ['Конспект', 'Пример', 'Тренировка']", "header + nav + main + article + section + footer"),
  task("Форма профиля", "html", "junior+", "Сверстай форму профиля с email, именем, городом, чекбоксом подписки и понятными ошибками. Подумай о label, name, autocomplete и required.", "Пользователь не ввёл email и отправил форму", "Форма не отправляется, ошибка связана с email"),
  task("Адаптивная сетка карточек", "css", "junior", "Сделай сетку карточек тем: на телефоне одна колонка, дальше карточки от 240px, расстояние 12px.", ".topics содержит 12 карточек", "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))"),
  task("Липкая боковая навигация", "css", "junior+", "Сделай сайдбар тем липким на десктопе и горизонтальной прокруткой на мобильном.", "Ширина экрана 390px и 1200px", "На телефоне список прокручивается по горизонтали, на десктопе sticky"),
  task("Нормализация телефона", "js", "junior", "Напиши normalizePhone(value), которая оставляет только цифры и возвращает строку.", "normalizePhone('+7 (999) 123-45-67')", "'79991234567'"),
  task("Группировка по статусу", "js", "junior+", "Напиши groupByStatus(tasks), которая возвращает объект, где ключ - статус, значение - массив задач.", "[{title:'A', status:'todo'}, {title:'B', status:'done'}]", "{ todo: [{...}], done: [{...}] }"),
  task("Debounce автопоиска", "js", "junior+", "Напиши debounce(fn, delay) и покажи пример, где запрос поиска отправляется только после паузы во вводе.", "search('r'); search('re'); search('react')", "Через delay вызывается только последний запрос"),
  task("Безопасный рендер комментариев", "js", "junior+", "Есть массив комментариев с пользовательским текстом. Выведи их в DOM безопасно, не используя innerHTML для текста.", "comments = ['<img onerror=alert(1)>', 'Привет']", "Текст отображается как текст, код не выполняется"),
  task("React todo list", "react", "junior", "Собери TodoList: input, добавление, удаление, empty state и стабильные key.", "Пользователь добавляет 'Повторить Grid'", "Задача появляется в списке и удаляется по кнопке"),
  task("React фильтр товаров", "react", "junior", "Сделай ProductFilter: поле поиска, список товаров, фильтрация без мутации исходного массива.", "products = ['MacBook', 'Mouse', 'Keyboard']; query = 'mo'", "['Mouse']"),
  task("React загрузка профиля", "react", "junior+", "Собери компонент ProfileLoader с loading, error, retry и отменой устаревшего запроса при смене id.", "userId меняется с 1 на 2 до завершения первого запроса", "На экране данные пользователя 2, старый ответ игнорируется"),
  task("React custom hook localStorage", "react", "junior+", "Напиши useLocalStorage для сохранения прогресса темы. Хук должен читать стартовое значение и записывать изменения.", "useLocalStorage('progress', {})", "После обновления state значение появляется в localStorage"),
  task("Класс TrainingSession", "js", "junior", "Создай класс TrainingSession. Конструктор принимает topicId и questionsCount. У экземпляра должны быть методы answer(isCorrect), getScore() и reset().", "const session = new TrainingSession('js-classes', 10); session.answer(true); session.getScore()", "1", "js-classes"),
  task("Приватное состояние квиза", "js", "junior+", "Перепиши TrainingSession так, чтобы score и answers были приватными полями #score и #answers. Снаружи нельзя менять счёт напрямую, только через методы.", "session.#score = 100", "SyntaxError или невозможность доступа снаружи", "js-classes"),
  task("Static factory из localStorage", "js", "junior+", "Добавь static fromStorage(topicId), который читает сохранённый JSON из localStorage и возвращает экземпляр TrainingSession. Если данных нет или JSON битый, возвращай новую сессию.", "TrainingSession.fromStorage('js-classes')", "Экземпляр TrainingSession с восстановленным или пустым состоянием", "js-classes"),
  task("Наследование ошибки API", "js", "junior+", "Создай класс HttpError extends Error с полями status и details. Затем создай ValidationError extends HttpError для ошибок 422.", "throw new ValidationError('Bad form', { email: 'required' })", "error instanceof ValidationError и error instanceof HttpError дают true", "js-classes"),
  task("Переопределение метода через super", "js", "junior+", "Есть BaseStorage с методом save(key, value). Создай JsonStorage extends BaseStorage, который переопределяет save и перед вызовом super.save сериализует value в JSON.", "storage.save('progress', { score: 8 })", "В базовое хранилище попадает строка JSON", "js-classes"),
  task("Геттеры и сеттеры для ограничений", "js", "junior+", "Создай класс Rating с приватным полем #value. Сеттер value должен принимать только числа от 1 до 5, иначе бросать RangeError. Геттер value возвращает текущее значение.", "const rating = new Rating(); rating.value = 6", "RangeError", "js-classes"),
  task("Instance vs static", "js", "junior", "Создай класс TopicProgress: экземпляр хранит score, а static compare(a, b) сортирует прогресс по score. Проверь, что compare вызывается на классе, а не на экземпляре.", "items.sort(TopicProgress.compare)", "Массив отсортирован по score", "js-classes"),
  task("Mixin для событий", "js", "junior+", "Создай eventMixin с методами on(event, handler), off(event, handler), emit(event, payload). Подмешай его в класс Store через Object.assign(Store.prototype, eventMixin).", "store.on('change', console.log); store.emit('change', { count: 1 })", "Обработчик получает payload", "js-classes"),
];

function seed(
  id: string,
  section: SectionId,
  title: string,
  tag: string,
  level: string,
  time: string,
  source: string,
  focus: string,
  bullets: string[],
  code: string,
  workExample: string,
  mistakes: string[],
): TopicSeed {
  return { id, section, title, tag, level, time, source, focus, bullets, code, workExample, mistakes };
}

function task(title: string, section: SectionId, level: string, prompt: string, input: string, output: string, topicId?: string): Task {
  return { title, section, level, prompt, input, output, topicId };
}

function enrichTopic(topic: Topic): Topic {
  if (topic.id !== "js-classes") return topic;

  return {
    ...topic,
    title: "Классы, наследование и ООП в JavaScript",
    tag: "глубокая глава",
    time: "55 мин",
    source: "https://learn.javascript.ru/classes",
    summary:
      "Классы в JavaScript - это современный синтаксис для создания однотипных объектов с общим поведением. Они не отменяют прототипы: методы класса попадают в prototype, экземпляры ищут методы по цепочке прототипов, а наследование через extends настраивает связи между prototype и самими конструкторами. Тему нужно знать не ради академического ООП, а чтобы уверенно читать SDK, писать собственные ошибки, моделировать доменные сущности, понимать this, super, static, private fields и отличать хороший класс от лишней обёртки.",
    bullets: [
      "class создаёт функцию-конструктор, а методы кладёт в ClassName.prototype; экземпляр получает к ним доступ через цепочку прототипов.",
      "constructor запускается при new и задаёт начальное состояние конкретного экземпляра; методы описывают поведение, общее для всех экземпляров.",
      "Код внутри class работает в strict mode, класс нельзя вызвать без new, а методы класса неперечислимые.",
      "extends создаёт наследование, а в конструкторе наследника super() обязателен до первого обращения к this.",
      "static методы и поля принадлежат самому классу, а не экземплярам: это удобно для фабрик, сравнения, валидации и служебных операций.",
      "Приватные элементы с # реально закрыты языком; условный protected через _ - только договорённость команды.",
      "Классы уместны для сущностей с состоянием и поведением, пользовательских ошибок, клиентов API, парсеров, адаптеров и SDK.",
      "В UI на React классы чаще встречаются не в компонентах, а рядом: в моделях, сервисах, ошибках, кешах, утилитах и интеграциях.",
    ],
    code: `class TrainingSession {
  #score = 0;
  #answers = [];

  constructor(topicId, questionsCount) {
    this.topicId = topicId;
    this.questionsCount = questionsCount;
  }

  answer(isCorrect) {
    this.#answers.push(Boolean(isCorrect));
    if (isCorrect) this.#score += 1;
  }

  get score() {
    return this.#score;
  }

  get progress() {
    return this.#answers.length / this.questionsCount;
  }

  reset() {
    this.#score = 0;
    this.#answers = [];
  }

  toJSON() {
    return {
      topicId: this.topicId,
      questionsCount: this.questionsCount,
      score: this.#score,
      answers: [...this.#answers],
    };
  }

  static fromJSON(data) {
    const session = new TrainingSession(data.topicId, data.questionsCount);
    for (const answer of data.answers ?? []) session.answer(answer);
    return session;
  }
}`,
    workExample:
      "В рабочем фронтенде класс может быть удобен для TrainingSession, ApiClient, HttpError, Money, DateRange, FeatureFlagStore, AnalyticsQueue или любого объекта, где данные и правила должны жить рядом. Например, компонент React может просто вызвать session.answer(true), не зная, как именно считается прогресс и как он сериализуется.",
    mistakes: [
      "Делать класс только потому, что «так взрослее», хотя достаточно функции или обычного объекта.",
      "Мутировать приватное состояние в обход публичных методов или раскрывать наружу слишком много внутренних деталей.",
      "Забывать super() в конструкторе наследника до обращения к this.",
      "Путать методы экземпляра и static методы: session.fromJSON() не сработает, если fromJSON объявлен static.",
      "Передавать метод как callback и терять this.",
      "Строить глубокую иерархию наследования там, где проще композиция.",
      "Наследоваться от встроенных классов без понимания instanceof, name, message и stack.",
    ],
    cheatsheet: [
      "new Class(args) создаёт экземпляр и вызывает constructor.",
      "ClassName.prototype хранит обычные методы экземпляров.",
      "field = value создаётся на каждом экземпляре, а не в prototype.",
      "static method() вызывается как ClassName.method(), а не instance.method().",
      "#private доступен только внутри тела класса, даже наследник не может обратиться к private полю родителя.",
      "В extends-конструкторе сначала super(...args), потом this.",
      "super.method() вызывает метод родителя, сохраняя текущий this.",
      "instanceof проверяет, встречается ли prototype конструктора в цепочке прототипов объекта.",
      "Геттер выглядит как свойство при чтении, сеттер - как свойство при записи, но внутри может быть логика.",
      "Если метод будет передаваться как callback, заранее подумай о this: bind, arrow field или обёртка.",
    ],
    parts: classLessonParts(),
    questions: classQuestions(),
  };
}

function classLessonParts(): LessonPart[] {
  return [
    {
      title: "1. Когда классы вообще нужны",
      body: [
        "Класс стоит рассматривать, когда в приложении есть понятная сущность: у неё есть состояние, правила изменения этого состояния и операции, которые естественно принадлежат самой сущности. Например: сессия тренировки знает выбранную тему, количество вопросов, ответы и умеет посчитать результат. Если оставить эти знания раскиданными по компонентам и функциям, код быстро становится хрупким.",
        "Класс не обязан быть «большой архитектурой». Это просто способ собрать данные и поведение рядом. В то же время класс не нужен для любой мелкой операции. formatPrice(value), normalizePhone(input), isValidEmail(value) обычно лучше оставить функциями: они не хранят состояние и не создают экземпляры.",
        "На собеседовании хороший ответ звучит так: классы полезны для моделирования однотипных объектов и инкапсуляции правил, но в JavaScript они построены поверх прототипов, поэтому важно понимать не только синтаксис class, но и prototype chain.",
      ],
      code: `// Хороший кандидат на класс: состояние + правила + поведение.
class Cart {
  items = [];

  add(product, count = 1) {
    if (count <= 0) throw new RangeError("count must be positive");
    this.items.push({ product, count });
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }
}

// Лучше как функция: нет собственного состояния.
function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value);
}`,
    },
    {
      title: "2. Базовый синтаксис: constructor, поля и методы",
      body: [
        "constructor - специальный метод, который запускается при создании экземпляра через new. В нём обычно проверяют входные данные и записывают начальное состояние. Методы класса записываются без function и без запятых между ними.",
        "Поля класса вроде status = 'idle' создаются на каждом экземпляре. Методы вроде start() находятся в prototype и переиспользуются всеми экземплярами. Это важное отличие: если создать метод как стрелочное поле handleClick = () => {}, такая функция будет новой для каждого экземпляра. Иногда это нужно для сохранения this, но это дороже по памяти.",
        "Класс нельзя вызвать как обычную функцию. Если написать TrainingSession(), будет ошибка: конструктор класса требует new. Внутри class автоматически действует строгий режим, поэтому многие ошибки с this проявляются явно.",
      ],
      code: `class TrainingSession {
  status = "idle";

  constructor(topicId, questionsCount) {
    if (!topicId) throw new Error("topicId is required");
    if (questionsCount <= 0) throw new RangeError("questionsCount must be positive");

    this.topicId = topicId;
    this.questionsCount = questionsCount;
  }

  start() {
    this.status = "active";
  }
}

const session = new TrainingSession("js-classes", 10);
session.start();
console.log(session.status); // "active"`,
    },
    {
      title: "3. Что class делает под капотом",
      body: [
        "В JavaScript class технически создаёт функцию. Метод constructor становится телом этой функции-конструктора, а методы класса сохраняются в ClassName.prototype. Когда ты вызываешь session.start(), движок сначала ищет start на самом объекте session, затем идёт в TrainingSession.prototype.",
        "Это объясняет, почему методы доступны всем экземплярам, но не лежат в каждом экземпляре отдельно. Это также объясняет instanceof: проверяется не название класса, а наличие prototype конструктора в цепочке прототипов объекта.",
        "Методы класса неперечислимые. Это удобно: при переборе полей объекта ты видишь данные экземпляра, а не весь набор методов из prototype.",
      ],
      code: `class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return "Привет, " + this.name;
  }
}

const user = new User("Иван");

console.log(typeof User); // "function"
console.log(User === User.prototype.constructor); // true
console.log(Object.getOwnPropertyNames(User.prototype)); // ["constructor", "sayHi"]
console.log(user instanceof User); // true`,
    },
    {
      title: "4. this: почему метод иногда ломается",
      body: [
        "this в JavaScript зависит от способа вызова. Когда ты пишешь session.start(), this внутри start указывает на session, потому что слева от точки стоит session. Но если передать const start = session.start; start(); связь с объектом потеряется.",
        "В рабочих проектах это всплывает в обработчиках событий, таймерах, колбэках и старом классовом React. Решения: вызвать через обёртку, привязать bind, использовать стрелочное поле, либо проектировать метод так, чтобы он не зависел от this.",
        "На интервью часто проверяют именно этот момент: класс сам по себе не «фиксирует» this для методов prototype.",
      ],
      code: `class Timer {
  seconds = 0;

  tick() {
    this.seconds += 1;
  }
}

const timer = new Timer();
setInterval(() => timer.tick(), 1000); // this не теряется

// Альтернатива:
const safeTick = timer.tick.bind(timer);`,
    },
    {
      title: "5. Геттеры и сеттеры: свойство с логикой",
      body: [
        "Геттер читается как обычное свойство, но внутри запускает функцию. Сеттер выглядит как присваивание, но может валидировать значение. Это удобно, когда внешний интерфейс должен быть простым, а внутреннее состояние нужно защищать от невалидных значений.",
        "Важно не превращать getter в дорогую операцию с побочными эффектами. Когда разработчик пишет user.fullName, он ожидает чтение значения, а не сетевой запрос или изменение состояния.",
        "Сеттер без понятной ошибки - плохой UX для разработчика. Если значение не подходит, бросай конкретную ошибку или явно игнорируй с документированным поведением.",
      ],
      code: `class Rating {
  #value = 1;

  get value() {
    return this.#value;
  }

  set value(nextValue) {
    if (!Number.isInteger(nextValue) || nextValue < 1 || nextValue > 5) {
      throw new RangeError("rating must be an integer from 1 to 5");
    }
    this.#value = nextValue;
  }
}

const rating = new Rating();
rating.value = 5;
console.log(rating.value); // 5`,
    },
    {
      title: "6. static: методы и данные уровня класса",
      body: [
        "static принадлежит не экземпляру, а самому классу. Это уместно для операций, которые логически относятся к типу сущности целиком: создать экземпляр из JSON, сравнить два экземпляра, проверить входные данные, вернуть дефолтную конфигурацию.",
        "Типичная рабочая форма - static factory. Конструктор оставляют для уже нормализованных данных, а static метод умеет собрать объект из localStorage, URLSearchParams или ответа API.",
        "Статические методы наследуются через связь между самими конструкторами. Но не стоит злоупотреблять этим: если static метод использует private static поле родителя через this, наследник может получить неожиданную ошибку. Для приватной static-логики часто безопаснее обращаться к имени класса.",
      ],
      code: `class TopicProgress {
  constructor(topicId, score, total) {
    this.topicId = topicId;
    this.score = score;
    this.total = total;
  }

  get percent() {
    return Math.round((this.score / this.total) * 100);
  }

  static compareByScore(a, b) {
    return b.score - a.score;
  }

  static fromStorage(topicId) {
    try {
      const raw = localStorage.getItem("progress:" + topicId);
      if (!raw) return new TopicProgress(topicId, 0, 10);
      const data = JSON.parse(raw);
      return new TopicProgress(topicId, data.score, data.total);
    } catch {
      return new TopicProgress(topicId, 0, 10);
    }
  }
}

const progress = TopicProgress.fromStorage("js-classes");
console.log(progress.percent);`,
    },
    {
      title: "7. Приватные поля # и условно защищённые _",
      body: [
        "Синтаксис #field делает поле приватным на уровне языка. К нему нельзя обратиться снаружи класса, нельзя прочитать через квадратные скобки, нельзя случайно перезаписать как обычное свойство. Это сильная инкапсуляция.",
        "Приватные поля должны быть объявлены в теле класса заранее. Нельзя внезапно создать this.#value в методе, если #value не объявлен. Это помогает движку и человеку видеть внутреннюю структуру класса.",
        "В JavaScript нет настоящего protected как в некоторых других языках. Префикс _value - договорённость: команда обещает не трогать поле снаружи, но язык не мешает. Наследник тоже не имеет доступа к #private полям родителя, поэтому если наследникам нужен контролируемый доступ, обычно делают protected-подобный публичный/полупубличный метод или геттер.",
      ],
      code: `class TokenStore {
  #token = null;

  setToken(token) {
    if (typeof token !== "string" || token.length < 10) {
      throw new Error("Invalid token");
    }
    this.#token = token;
  }

  hasToken() {
    return this.#token !== null;
  }
}

const store = new TokenStore();
store.setToken("1234567890");
console.log(store.hasToken()); // true
// console.log(store.#token); // SyntaxError`,
    },
    {
      title: "8. Наследование, extends и super",
      body: [
        "extends говорит: новый класс расширяет поведение базового класса. Экземпляр наследника получает методы родителя через цепочку прототипов. При этом наследник может добавить свои поля и методы или переопределить родительские.",
        "В конструкторе наследника обязательно вызвать super() до обращения к this. До super родительская часть объекта ещё не инициализирована, поэтому this недоступен.",
        "super.method() вызывает метод родителя, но this остаётся текущим экземпляром. Это удобно, когда нужно расширить поведение, а не полностью переписать его.",
      ],
      code: `class StorageAdapter {
  save(key, value) {
    localStorage.setItem(key, value);
  }

  read(key) {
    return localStorage.getItem(key);
  }
}

class JsonStorageAdapter extends StorageAdapter {
  save(key, value) {
    super.save(key, JSON.stringify(value));
  }

  read(key) {
    const raw = super.read(key);
    return raw ? JSON.parse(raw) : null;
  }
}

const storage = new JsonStorageAdapter();
storage.save("settings", { theme: "dark" });`,
    },
    {
      title: "9. Собственные ошибки через extends Error",
      body: [
        "Один из самых практичных кейсов классов во фронтенде - собственные типы ошибок. Они помогают различать сетевую ошибку, ошибку валидации, истёкшую авторизацию и неизвестную проблему.",
        "Класс ошибки обычно наследуется от Error, вызывает super(message), задаёт name и добавляет полезные поля: status, details, code, response. После этого catch может проверять error instanceof ValidationError и показывать правильный UI.",
        "Это лучше, чем бросать обычные строки или безымянные объекты: у Error есть message, stack, нормальная интеграция с инструментами отладки и мониторинга.",
      ],
      code: `class HttpError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

class ValidationError extends HttpError {
  constructor(details) {
    super("Validation failed", 422, details);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError({ email: "Email is required" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.details.email);
  }
}`,
    },
    {
      title: "10. Наследование встроенных классов и instanceof",
      body: [
        "Можно наследоваться от встроенных классов: Error, Array, Map и других. Самый полезный и частый вариант во фронтенде - Error. Наследование Array или Map встречается реже и часто создаёт больше вопросов, чем пользы.",
        "instanceof проверяет прототипную цепочку. Это хорошо для объектов, созданных в одном JavaScript realm. Но в iframe, разных окнах или при смешивании сборок могут быть нюансы. Для plain object часто лучше проверять форму данных, а не constructor.",
        "Если класс нужен только чтобы сгруппировать набор функций, возможно, лучше использовать модуль с named exports. Класс хорош, когда есть экземпляры и состояние.",
      ],
      code: `const error = new ValidationError({ email: "required" });

console.log(error instanceof ValidationError); // true
console.log(error instanceof HttpError); // true
console.log(error instanceof Error); // true`,
    },
    {
      title: "11. Mixins и композиция",
      body: [
        "JavaScript-класс может наследоваться только от одного класса. Когда хочется добавить поведение из нескольких источников, используют композицию или mixin. Mixin обычно копирует методы в prototype через Object.assign.",
        "Mixin стоит использовать осторожно: он может сделать источник метода неочевидным. В больших проектах часто понятнее композиция: объект получает зависимость через constructor и вызывает её методы.",
        "На junior+ уровне важно сказать: наследование описывает отношение «является разновидностью», композиция - «использует внутри». Если UserRepository использует ApiClient, это не значит, что UserRepository extends ApiClient.",
      ],
      code: `const eventMixin = {
  on(event, handler) {
    this.handlers ??= {};
    (this.handlers[event] ??= new Set()).add(handler);
  },
  off(event, handler) {
    this.handlers?.[event]?.delete(handler);
  },
  emit(event, payload) {
    this.handlers?.[event]?.forEach((handler) => handler(payload));
  },
};

class Store {
  state = {};
}

Object.assign(Store.prototype, eventMixin);

const store = new Store();
store.on("change", console.log);
store.emit("change", { count: 1 });`,
    },
    {
      title: "12. Как отвечать на собеседовании",
      body: [
        "Начинай с сути: class - синтаксис для объявления конструктора и методов prototype. Затем добавь отличия от function constructor: нельзя вызвать без new, методы неперечислимые, strict mode внутри класса, удобный синтаксис fields/static/private/extends.",
        "Дальше покажи практику: классы помогают моделировать сущности и ошибки, но не заменяют функции. В React-приложении классовые компоненты сейчас редко нужны, но классы вне UI всё ещё встречаются в сервисах, SDK и Error-классах.",
        "Если спрашивают про наследование, обязательно скажи про super() до this, переопределение методов, static inheritance и то, что #private поля родителя недоступны наследнику. Это сразу звучит как человек, который не просто видел слово class, а понимает реальные ловушки.",
      ],
      code: `// Короткая формула:
// class = constructor function + prototype methods + строгие правила синтаксиса.
// Экземпляр = объект, созданный через new.
// Наследование = связь prototype наследника с prototype родителя.
// Инкапсуляция = наружу даём методы, внутрь прячем детали.`,
    },
  ];
}

function classQuestions(): Question[] {
  return [
    q("Что технически создаёт объявление class в JavaScript?", ["Функцию-конструктор и методы в её prototype", "Новый примитивный тип данных", "HTML-шаблон", "Отдельный поток выполнения", "JSON-схему", "CSS-класс"], 0, "Класс в JS связан с функцией-конструктором и прототипами."),
    q("Что происходит при new User('Ann')?", ["Создаётся объект, вызывается constructor, this указывает на новый объект", "Вызывается статический метод render", "Создаётся только prototype без объекта", "Класс преобразуется в JSON", "Методы копируются в window", "Запускается fetch"], 0, "new создаёт экземпляр и запускает constructor с this нового объекта."),
    q("Где обычно находятся методы, объявленные как method() {} внутри класса?", ["В ClassName.prototype", "В localStorage", "В каждом экземпляре как отдельная копия всегда", "В document.body", "В массиве arguments", "В CSSOM"], 0, "Обычные методы класса хранятся в prototype и переиспользуются экземплярами."),
    q("Какое утверждение про поля класса верное?", ["field = value создаётся на каждом экземпляре", "field = value попадает в prototype как метод", "field = value всегда static", "Поле нельзя читать из методов", "Поле создаёт DOM-атрибут", "Поле работает только в React"], 0, "Поля класса становятся собственными свойствами экземпляра."),
    q("Почему class User {} нельзя вызвать как User()?", ["Класс-конструктор должен вызываться через new", "У класса нет имени", "User() всегда возвращает null", "Нужно сначала импортировать React", "Методы класса enumerable", "Потому что User - CSS-селектор"], 0, "Class constructor нельзя вызвать без new."),
    q("Что обязательно сделать в constructor наследника перед обращением к this?", ["Вызвать super()", "Вызвать JSON.parse", "Назначить static поле", "Добавить запятую после метода", "Вызвать document.createElement", "Удалить prototype"], 0, "В derived class this доступен только после super()."),
    q("Что делает super.method() в методе наследника?", ["Вызывает метод родителя с текущим this", "Создаёт новый родительский объект всегда", "Удаляет метод наследника", "Превращает метод в static", "Вызывает метод без this", "Отключает strict mode"], 0, "super помогает расширить поведение родителя, сохраняя текущий экземпляр."),
    q("Чем static method отличается от обычного метода экземпляра?", ["Вызывается на классе, а не на экземпляре", "Всегда приватный", "Автоматически запускается при каждом render", "Не может возвращать значение", "Доступен только через this в constructor", "Хранится в массиве экземпляра"], 0, "static относится к конструктору класса целиком."),
    q("Для чего хорошо подходит static factory method?", ["Создать экземпляр из JSON, localStorage или другого формата", "Заменить любую функцию в проекте", "Скрыть все ошибки", "Отрисовать CSS-анимацию", "Привязать label к input", "Сделать поле приватным без #"], 0, "Фабричный static метод подготавливает данные и возвращает экземпляр."),
    q("Что означает #score в классе?", ["Приватное поле, доступное только внутри тела класса", "ID элемента DOM", "Комментарий", "Обычное публичное свойство со строковым ключом", "Статический метод", "CSS-переменная"], 0, "#private элементы закрыты на уровне языка."),
    q("Может ли наследник обратиться к #private полю родителя напрямую?", ["Нет, private поле доступно только классу, который его объявил", "Да, через super.#field", "Да, если поставить _ перед именем", "Да, через Object.keys", "Да, через JSON.stringify", "Да, если поле static"], 0, "Private элементы scoped к телу класса, а не ко всей иерархии."),
    q("Что такое protected через _name в JavaScript?", ["Договорённость команды, а не защита языка", "Настоящее приватное поле", "Поле только для static методов", "Синтаксис TypeScript runtime", "Запрет на чтение в DevTools", "Автоматическая валидация"], 0, "Подчёркивание сигнализирует намерение, но JS не блокирует доступ."),
    q("Почему метод класса может потерять this при передаче как callback?", ["this зависит от способа вызова, а не от места объявления", "class всегда удаляет this", "prototype запрещает callback", "static методы меняют this всех методов", "Потому что callback не может быть функцией", "Из-за CSS cascade"], 0, "Если метод вызван без объекта слева от точки, this может стать undefined."),
    q("Какой вариант корректно сохраняет this при передаче метода?", ["setInterval(() => timer.tick(), 1000)", "setInterval(timer.tick, 1000) всегда безопасно", "timer.tick.call(null)", "delete timer.tick", "JSON.stringify(timer.tick)", "class tick(timer)"], 0, "Обёртка вызывает метод через объект timer."),
    q("Что проверяет instanceof?", ["Есть ли prototype конструктора в цепочке прототипов объекта", "Совпадает ли имя переменной с именем класса", "Есть ли поле id", "Является ли объект JSON", "Наследуется ли CSS-класс", "Есть ли static method compare"], 0, "instanceof основан на прототипной цепочке."),
    q("Когда класс уместнее обычной функции?", ["Когда есть однотипные экземпляры со своим состоянием и поведением", "Когда нужно сложить два числа", "Когда нужно обрезать строку", "Когда нет состояния", "Когда функция уже понятна", "Когда нужен только CSS"], 0, "Класс оправдан, если он моделирует сущность и её правила."),
    q("Что лучше для parsePhone(value)?", ["Обычная функция", "Класс с пятью уровнями наследования", "Наследник Array", "Private static constructor", "Mixin через Object.assign", "HTMLElement"], 0, "Чистое преобразование без состояния проще выразить функцией."),
    q("Зачем наследоваться от Error?", ["Чтобы различать типы ошибок через instanceof и хранить дополнительные поля", "Чтобы ошибка стала CSS-классом", "Чтобы fetch перестал падать", "Чтобы JSON сам валидировался", "Чтобы не писать catch", "Чтобы скрыть stack trace от разработчика"], 0, "Собственные Error-классы помогают обработке и диагностике."),
    q("Что опасно в глубокой иерархии наследования?", ["Поведение становится трудно проследить и менять", "Код перестаёт быть JavaScript", "Все методы становятся private", "Нельзя использовать constructor", "Нельзя писать tests", "Строки перестают работать"], 0, "Чем глубже дерево, тем сложнее понять источник поведения."),
    q("Что такое mixin в JS-практике?", ["Способ добавить методы, например через Object.assign в prototype", "Обязательная часть любого класса", "Новый тип private поля", "Метод сортировки массива", "Событие DOM", "Форма наследования от двух классов через extends A, B"], 0, "Mixin подмешивает поведение без прямого множественного наследования."),
  ];
}

function makeSummary(topic: TopicSeed) {
  const sectionName = sections[topic.section].title;
  return `${topic.title} - обязательная тема раздела ${sectionName}. Здесь важно понимать ${topic.focus}. На junior/junior+ собеседовании обычно проверяют не пересказ определения, а способность выбрать правильный инструмент, объяснить trade-off и не сломать доступность, поддержку или пользовательский сценарий.`;
}

function makeQuestions(topic: TopicSeed): Question[] {
  const first = topic.bullets[0];
  const second = topic.bullets[1] ?? topic.focus;
  const third = topic.bullets[2] ?? topic.focus;
  const fourth = topic.bullets[3] ?? topic.focus;
  const bad = topic.mistakes[0] ?? "Выбирать решение без понимания задачи.";

  return [
    q(`Что в теме «${topic.title}» важнее всего объяснить на собеседовании?`, [topic.focus, "Только название технологии", "Как полностью отключить браузерные ограничения", "Почему можно не проверять результат", "Как заменить всю тему одним div", "Как избежать чтения документации"], 0, `Ключевой фокус темы: ${topic.focus}.`),
    q(`Какой тезис по теме «${topic.title}» верный?`, [first, "Эта тема нужна только backend-разработчику", "Это всегда решается одной библиотекой", "Это не влияет на пользователя", "Это нельзя проверить в браузере", "Это работает одинаково во всех ситуациях"], 0, first),
    q(`Что чаще всего будет рабочим применением темы «${topic.title}»?`, [topic.workExample, "Случайная смена цвета без задачи", "Удаление всей семантики", "Отключение ошибок", "Хранение паролей в HTML", "Замена интерфейса console.log"], 0, topic.workExample),
    q("Какой вариант больше похож на типичную ошибку junior-разработчика?", [bad, second, third, fourth, "Проверить поведение на мобильном", "Назвать элемент по смыслу"], 0, bad),
    q(`Почему тема «${topic.title}» важна в реальном проекте?`, ["Она влияет на читаемость, поддержку и пользовательский сценарий", "Она нужна только для теоретических тестов", "Она всегда удаляется на production", "Она заменяет коммуникацию с дизайнером", "Она делает backend ненужным", "Она запрещает рефакторинг"], 0, "На работе ценится не знание термина, а устойчивое решение задачи."),
    q("Как лучше закреплять эту тему после конспекта?", ["Написать маленький пример руками и проверить крайние случаи", "Только перечитать заголовок", "Скопировать чужой код без запуска", "Игнорировать ошибки", "Сразу добавить тяжёлую библиотеку", "Учить только сокращения"], 0, "Практика руками быстро показывает пробелы."),
    q(`Что стоит спросить себя при выборе решения для «${topic.title}»?`, ["Как это поведёт себя на мобильном, с клавиатуры и при ошибке", "Как сделать максимально непонятно", "Как спрятать состояние от пользователя", "Как не писать названия переменных", "Как избежать тестирования вообще", "Как удалить все подсказки"], 0, "Такие вопросы приближают учебный пример к рабочему коду."),
    q("Что обычно ценят на junior+ уровне?", ["Понимание ограничений и умение объяснить trade-off", "Только знание редкого синтаксиса", "Запоминание всех тегов без смысла", "Отсутствие проверок", "Самый длинный код", "Случайные оптимизации"], 0, "Junior+ должен видеть последствия решения."),
    q(`Какой источник подходит, чтобы углубить «${topic.title}»?`, [topic.source, "Случайный пост без даты и примеров", "Только мемы", "Ошибка из консоли без контекста", "Любой minified bundle", "Комментарии в production HTML"], 0, "В теме указан ориентир для дальнейшего чтения."),
    q("Что лучше сделать перед тем, как считать тему освоенной?", ["Объяснить её вслух, написать пример и решить задачу", "Пропустить тренировку", "Запомнить только первое слово", "Не открывать DevTools", "Не проверять доступность", "Удалить все состояния"], 0, "Освоение видно по объяснению и применению, а не по узнаванию названия."),
  ];
}

function q(prompt: string, options: string[], correct: number, explain: string): Question {
  return { prompt, options, correct, explain };
}
