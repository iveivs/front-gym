"use client";

import { useEffect, useMemo, useState } from "react";

type SectionId = "html" | "css" | "js" | "react";

type Question = {
  prompt: string;
  options: string[];
  correct: number;
  explain: string;
};

type Topic = {
  id: string;
  section: SectionId;
  title: string;
  tag: string;
  level: string;
  time: string;
  source: string;
  summary: string;
  bullets: string[];
  questions: Question[];
};

type Task = {
  title: string;
  section: SectionId;
  level: string;
  prompt: string;
  input: string;
  output: string;
};

const sections: Record<SectionId, { title: string; note: string }> = {
  html: {
    title: "HTML",
    note: "Семантика, формы, структура документа и доступность.",
  },
  css: {
    title: "CSS",
    note: "Селекторы, каскад, Flexbox, Grid, адаптив и состояния.",
  },
  js: {
    title: "JavaScript",
    note: "DOM, события, асинхронность, типы, коллекции и браузерные API.",
  },
  react: {
    title: "React",
    note: "Компоненты, состояние, хуки, списки, формы и эффекты.",
  },
};

const topics: Topic[] = [
  {
    id: "html-semantics",
    section: "html",
    title: "Семантика и структура",
    tag: "основа",
    level: "junior",
    time: "12 мин",
    source: "https://doka.guide/html/",
    summary:
      "Семантическая разметка помогает браузеру, поисковикам, скринридерам и другим разработчикам понять, где навигация, основной контент, статья, боковой блок или кнопка действия. На собеседовании важно не просто назвать теги, а объяснить, почему div не всегда лучший выбор.",
    bullets: [
      "Используй header, main, nav, section, article, aside и footer по смыслу, а не ради красивого названия.",
      "У страницы должен быть один главный h1, а уровни заголовков должны идти логично.",
      "Кнопка запускает действие, ссылка ведёт на адрес. Это влияет на клавиатуру и доступность.",
      "alt у картинки описывает смысл изображения, а не только то, что на нём видно.",
    ],
    questions: [
      q("Зачем нужна семантическая разметка?", ["Чтобы код выглядел современно", "Чтобы CSS работал быстрее", "Чтобы смысл блоков был понятен браузеру и вспомогательным технологиям", "Чтобы отключить JavaScript", "Чтобы все теги стали блочными", "Чтобы не писать классы"], 2, "Семантика описывает роль контента, а не внешний вид."),
      q("Когда лучше использовать button, а не a?", ["Когда элемент отправляет пользователя на другую страницу", "Когда элемент запускает действие на текущей странице", "Когда нужен синий цвет", "Когда внутри есть иконка", "Когда текст короче 10 символов", "Когда надо открыть PDF"], 1, "button предназначен для действий, ссылка - для переходов."),
      q("Что должен описывать атрибут alt?", ["Размер картинки", "Имя файла", "Смысл изображения для пользователя", "Цветовую палитру", "Путь до картинки", "Только расширение файла"], 2, "alt заменяет изображение, когда его не видно или его читает скринридер."),
      q("Какой тег лучше подходит для основной области страницы?", ["section", "main", "article", "aside", "span", "b"], 1, "main обозначает основной уникальный контент документа."),
      q("Что не стоит делать с заголовками?", ["Держать понятную структуру", "Пропускать уровни только ради размера шрифта", "Использовать h1 для главной темы", "Описывать содержание секции", "Связывать заголовок с блоком", "Делать текст заголовка понятным"], 1, "Размер задаётся CSS, а уровни заголовков задают структуру."),
      q("Для чего нужен label у поля формы?", ["Только для жирного текста", "Чтобы связать подпись с полем и улучшить ввод", "Чтобы поле стало обязательным", "Чтобы скрыть placeholder", "Чтобы включить autocomplete", "Чтобы форма отправлялась без JS"], 1, "Связанный label увеличивает кликабельную область и помогает доступности."),
      q("Какой тег уместен для самостоятельной карточки новости?", ["article", "br", "small", "i", "script", "template"], 0, "article подходит для самостоятельного фрагмента контента."),
      q("Что означает lang на html?", ["Главный цвет сайта", "Язык документа", "Направление сетки", "Версию HTML", "Тип сборщика", "Размер шрифта"], 1, "lang помогает произношению скринридеров и поисковым системам."),
      q("Какой вариант лучше для навигации?", ["div с кликабельными span", "nav со списком ссылок", "table с ячейками", "canvas с текстом", "form без полей", "img-map без alt"], 1, "nav ясно обозначает область навигации, а ссылки остаются ссылками."),
      q("Почему не стоит делать всё на div?", ["div запрещён стандартом", "div не стилизуется", "div не несёт смысла сам по себе", "div всегда inline", "div ломает формы", "div нельзя вкладывать"], 2, "div полезен как контейнер, но не заменяет смысловые элементы."),
    ],
  },
  {
    id: "html-forms",
    section: "html",
    title: "Формы и валидация",
    tag: "практика",
    level: "junior+",
    time: "14 мин",
    source: "https://doka.guide/html/",
    summary:
      "Формы - это не только input. Важно понимать типы полей, связь label и control, required, name, autocomplete, нативную валидацию и удобство ввода на мобильных устройствах.",
    bullets: [
      "name нужен, чтобы значение поля попало в данные формы.",
      "type=email, type=tel и inputmode помогают мобильной клавиатуре.",
      "placeholder не заменяет label, потому что исчезает при вводе.",
      "Нативная валидация полезна, но сложные правила часто дополняют JavaScript.",
    ],
    questions: [
      q("Что делает атрибут required?", ["Скрывает поле", "Запрещает отправку формы без значения", "Меняет тип поля", "Добавляет label", "Очищает input", "Создаёт подсказку autocomplete"], 1, "required включает нативную проверку заполненности."),
      q("Зачем полю формы атрибут name?", ["Для отправки значения с ключом", "Для цвета рамки", "Для плейсхолдера", "Для отключения поля", "Для maxlength", "Для aria-hidden"], 0, "Без name значение обычно не попадёт в отправляемые данные."),
      q("Почему placeholder не заменяет label?", ["Он всегда на английском", "Он исчезает при вводе и не даёт устойчивой подписи", "Он запрещён в формах", "Он делает поле readonly", "Он работает только в Safari", "Он увеличивает bundle"], 1, "Подпись должна быть видна и связана с полем."),
      q("Какой тип input лучше для email?", ["text", "search", "email", "url", "number", "password"], 2, "type=email даёт нативную проверку и удобную клавиатуру."),
      q("Что делает disabled?", ["Запрещает редактирование и обычно исключает поле из отправки", "Только меняет курсор", "Только скрывает поле", "Делает поле обязательным", "Включает submit", "Меняет name"], 0, "disabled поле недоступно и не участвует как обычное активное поле."),
      q("Что лучше для выбора одного варианта из нескольких?", ["checkbox", "radio", "textarea", "meter", "progress", "output"], 1, "radio используется для взаимоисключающих вариантов."),
      q("Что помогает браузеру подставлять сохранённые данные?", ["autoplay", "autocomplete", "defer", "download", "scope", "decoding"], 1, "autocomplete описывает ожидаемые данные поля."),
      q("Для чего нужен fieldset?", ["Для группировки связанных полей", "Для загрузки файлов", "Для canvas", "Для подключения CSS", "Для отправки JSON", "Для lazy loading"], 0, "fieldset вместе с legend делает группу формы понятной."),
      q("Какой элемент подходит для длинного многострочного текста?", ["input type=text", "textarea", "select", "button", "option", "datalist"], 1, "textarea предназначен для многострочного ввода."),
      q("Что лучше показать при ошибке в форме?", ["Только красную рамку", "Понятный текст рядом с проблемным полем", "Ничего", "alert с пустым текстом", "Скрытый console.log", "Перезагрузку страницы"], 1, "Пользователь должен понять, что исправить."),
    ],
  },
  {
    id: "css-layout",
    section: "css",
    title: "Flexbox, Grid и адаптив",
    tag: "верстка",
    level: "junior",
    time: "16 мин",
    source: "https://doka.guide/css/",
    summary:
      "На практике junior чаще всего верстает списки, карточки, шапки, формы и адаптивные сетки. Flexbox удобен для распределения элементов в одной оси, Grid - для двухмерной сетки, а адаптивность строится на гибких размерах, медиазапросах и хорошем контентном мышлении.",
    bullets: [
      "Flexbox мыслит главной и поперечной осью.",
      "Grid позволяет управлять строками и колонками одновременно.",
      "minmax, auto-fit и clamp помогают делать гибкие интерфейсы без десятков брейкпоинтов.",
      "Мобильная версия важна не только шириной, но и размером касаний, читаемостью и порядком контента.",
    ],
    questions: [
      q("Что лучше для простого выравнивания элементов в строку?", ["position:absolute", "Flexbox", "z-index", "filter", "float", "clip-path"], 1, "Flexbox удобен для одномерного расположения."),
      q("Что управляет расстоянием между grid/flex элементами?", ["gap", "line-height", "opacity", "outline", "clear", "quotes"], 0, "gap задаёт промежутки между элементами."),
      q("Какое свойство во Flexbox выравнивает по главной оси?", ["align-items", "justify-content", "place-self", "grid-area", "object-fit", "visibility"], 1, "justify-content работает вдоль main axis."),
      q("Для чего удобно использовать CSS Grid?", ["Только для текста", "Для двухмерных сеток из строк и колонок", "Для запросов к API", "Для обработки событий", "Для хранения состояния", "Для валидации форм"], 1, "Grid управляет и колонками, и строками."),
      q("Что делает media query?", ["Меняет HTML", "Применяет CSS при выполнении условия", "Запускает React", "Создаёт cookie", "Удаляет классы", "Сжимает изображения"], 1, "Медиазапросы включают стили по условиям среды."),
      q("Почему px не всегда лучший выбор для всего?", ["px не работает в Chrome", "Гибкие единицы лучше учитывают экран и настройки пользователя", "px запрещён в CSS", "px всегда равен rem", "px ломает z-index", "px скрывает элемент"], 1, "rem, %, fr и другие единицы помогают адаптивности."),
      q("Что делает minmax(240px, 1fr) в Grid?", ["Задаёт колонке минимум и гибкий максимум", "Отключает сетку", "Меняет цвет", "Скрывает overflow", "Создаёт анимацию", "Фиксирует высоту body"], 0, "minmax задаёт диапазон размера трека."),
      q("Как сделать изображение аккуратно вписанным в рамку?", ["object-fit: cover", "display: none", "z-index: -1", "font-style: italic", "user-select: none", "white-space: pre"], 0, "object-fit управляет заполнением контейнера заменяемым элементом."),
      q("Что важно для мобильных кнопок?", ["Минимальная область касания и понятное состояние", "Только мелкий текст", "Отрицательный line-height", "Скрытый outline", "Ширина 20px", "Нулевой контраст"], 0, "На телефоне элемент должен быть удобно нажимать."),
      q("Что означает mobile first?", ["Писать только для телефонов", "Начать с базовых мобильных стилей и расширять для больших экранов", "Запретить desktop", "Использовать только vw", "Убрать изображения", "Не использовать CSS"], 1, "Так проще строить устойчивую адаптивность."),
    ],
  },
  {
    id: "css-cascade",
    section: "css",
    title: "Каскад, селекторы и состояния",
    tag: "основа",
    level: "junior+",
    time: "13 мин",
    source: "https://doka.guide/css/",
    summary:
      "CSS работает через каскад: важны источник стилей, специфичность, порядок, наследование и состояния. Для собеседования нужно уверенно объяснять, почему один стиль победил другой, когда нужен класс, а когда псевдокласс.",
    bullets: [
      "Специфичность ID выше класса, но злоупотреблять ID в стилях обычно неудобно.",
      ":hover, :focus-visible и :disabled описывают состояния интерфейса.",
      "Наследуются не все свойства: color наследуется, margin - нет.",
      "!important лучше держать как крайний случай, а не рабочий инструмент.",
    ],
    questions: [
      q("Что такое специфичность?", ["Вес селектора в конфликте стилей", "Размер CSS файла", "Скорость загрузки", "Порядок HTML тегов", "Тип шрифта", "Высота строки"], 0, "Специфичность помогает решить, какое правило победит."),
      q("Какой селектор обычно специфичнее?", [".card", "#card", "button", "*", ":where(.card)", "body"], 1, "ID имеет больший вес, чем класс и тег."),
      q("Что делает :focus-visible?", ["Состояние заметного фокуса для клавиатурной навигации", "Скрывает элемент", "Меняет HTML", "Запускает fetch", "Удаляет outline всегда", "Создаёт grid"], 0, "Это полезно для доступных фокус-состояний."),
      q("Какое свойство наследуется чаще всего?", ["margin", "padding", "color", "border", "display", "position"], 2, "Цвет текста наследуется потомками."),
      q("Почему !important лучше не использовать постоянно?", ["Он не работает", "Он усложняет переопределение и поддержку", "Он запрещён стандартом", "Он удаляет классы", "Он ломает HTML", "Он работает только в IE"], 1, "Частый !important превращает каскад в борьбу исключений."),
      q("Что делает box-sizing: border-box?", ["Включает padding и border в заданную ширину", "Удаляет border", "Меняет display на flex", "Скрывает overflow", "Делает текст жирным", "Запускает transition"], 0, "Так размеры элементов предсказуемее."),
      q("Что выбирает .menu > li?", ["Все li внутри menu на любой глубине", "Только прямые li-потомки", "Первый li", "Последний li", "Все элементы страницы", "Только li с id menu"], 1, "> означает прямого потомка."),
      q("Для чего нужен :disabled?", ["Для стилизации недоступного элемента формы", "Для скрытия body", "Для сетки", "Для импорта", "Для локального хранилища", "Для aria-label"], 0, "Псевдокласс описывает отключённые элементы."),
      q("Что делает transition?", ["Плавно изменяет значение свойства", "Создаёт HTML тег", "Отправляет форму", "Меняет язык страницы", "Ускоряет JS", "Создаёт Promise"], 0, "transition задаёт плавность между состояниями."),
      q("Что лучше для переиспользуемого стиля компонента?", ["Случайный ID", "Понятный класс", "style с !important везде", "Селектор из 8 уровней", "Только тег div", "Инлайн onclick"], 1, "Класс хорошо подходит для повторяемых паттернов."),
    ],
  },
  {
    id: "js-async",
    section: "js",
    title: "Асинхронность, Promise и fetch",
    tag: "часто спрашивают",
    level: "junior+",
    time: "18 мин",
    source: "https://doka.guide/js/async-await/",
    summary:
      "Асинхронность позволяет не блокировать интерфейс, пока приложение ждёт сеть, таймер или другую долгую операцию. Promise описывает будущий результат, а async/await делает код похожим на последовательный, не отменяя асинхронную природу.",
    bullets: [
      "async-функция всегда возвращает Promise.",
      "await ждёт выполнение Promise внутри async-функции или на верхнем уровне модуля.",
      "Ошибки в await обычно ловят через try/catch.",
      "fetch отклоняется из-за сетевых ошибок, но HTTP 404/500 нужно проверять через response.ok.",
    ],
    questions: [
      q("Что возвращает async-функция?", ["Обычную строку всегда", "Promise", "Только undefined", "Generator", "DOM Node", "Response без Promise"], 1, "Возвращаемое значение async-функции оборачивается в Promise."),
      q("Для чего нужен await?", ["Чтобы дождаться результата Promise", "Чтобы создать массив", "Чтобы остановить весь браузер", "Чтобы выбрать DOM элемент", "Чтобы задать CSS", "Чтобы включить strict mode"], 0, "await приостанавливает выполнение async-функции до результата."),
      q("Как лучше обработать ошибку с await?", ["try/catch", "margin:auto", "JSON.stringify без проверки", "querySelector", "localStorage.clear", "return false"], 0, "try/catch ловит исключения и rejected Promise при await."),
      q("Что делает Promise.all?", ["Ждёт все Promise и падает при первой ошибке", "Ждёт только первый успешный", "Игнорирует ошибки", "Создаёт DOM", "Сортирует массив", "Очищает стек"], 0, "Promise.all полезен для параллельных зависимых операций."),
      q("Что важно помнить про fetch и 404?", ["fetch всегда rejected при 404", "fetch может resolved, нужно проверить response.ok", "fetch не работает с JSON", "fetch синхронный", "fetch требует React", "fetch нельзя отменить"], 1, "HTTP ошибка не всегда означает rejected Promise."),
      q("Что такое event loop в простом смысле?", ["Механизм очередей выполнения задач в JS-среде", "CSS-анимация", "HTML тег", "Тип данных", "React-хук", "Метод массива"], 0, "Event loop координирует стек, очереди и выполнение асинхронных задач."),
      q("Что выполнится раньше: microtask или macrotask после текущего стека?", ["Microtask", "Macrotask", "Они случайны", "CSS", "HTML parser всегда", "Ничего"], 0, "then/catch/finally обычно попадают в очередь микрозадач."),
      q("Для чего нужен AbortController?", ["Чтобы отменять поддерживаемые асинхронные операции, например fetch", "Чтобы создать компонент", "Чтобы поменять класс", "Чтобы валидировать HTML", "Чтобы сделать deep clone", "Чтобы подключить CSS"], 0, "AbortController передаёт signal и может отменить операцию."),
      q("Что делает finally у Promise?", ["Выполняется после завершения независимо от успеха или ошибки", "Ловит только 404", "Меняет Promise на массив", "Повторяет запрос", "Останавливает event loop", "Создаёт fetch"], 0, "finally удобен для очистки и выключения загрузки."),
      q("Зачем не смешивать бесконтрольно then и await?", ["Код может стать труднее читать и обрабатывать ошибки", "Это запрещено", "Это всегда медленнее в 100 раз", "React перестанет работать", "CSS не применится", "HTML станет невалидным"], 0, "Смешивать можно, но единый стиль часто понятнее."),
    ],
  },
  {
    id: "js-dom",
    section: "js",
    title: "DOM, события и браузер",
    tag: "практика",
    level: "junior",
    time: "15 мин",
    source: "https://doka.guide/js/",
    summary:
      "DOM - это программное представление документа. JavaScript может находить элементы, менять текст, классы, атрибуты и слушать события. На интервью часто проверяют всплытие, делегирование, preventDefault и отличие текста от HTML.",
    bullets: [
      "querySelector ищет первый элемент по CSS-селектору, querySelectorAll - список.",
      "addEventListener добавляет обработчик без перезаписи других обработчиков.",
      "События часто всплывают от вложенного элемента к родителям.",
      "textContent безопаснее для текста, innerHTML нужен осторожно из-за риска XSS.",
    ],
    questions: [
      q("Что такое DOM?", ["Объектная модель документа", "CSS препроцессор", "Серверная база", "Метод массива", "React-компонент", "Сетевой протокол"], 0, "DOM представляет страницу как дерево объектов."),
      q("Что вернёт querySelector?", ["Все элементы", "Первый подходящий элемент или null", "Только массив", "Promise", "CSSStyleSheet", "Всегда body"], 1, "querySelector возвращает первый матч."),
      q("Чем addEventListener лучше onclick-свойства?", ["Позволяет добавить несколько обработчиков и настроить опции", "Всегда быстрее сети", "Не требует элемента", "Меняет HTML5 на HTML4", "Работает только в React", "Скрывает кнопку"], 0, "addEventListener гибче и не перетирает обработчик напрямую."),
      q("Что такое всплытие события?", ["Движение события от цели к родителям", "Загрузка CSS", "Сортировка DOM", "Удаление узла", "Создание Promise", "Отправка формы"], 0, "Большинство событий всплывают вверх по дереву."),
      q("Для чего нужен preventDefault?", ["Отменить стандартное действие браузера", "Удалить обработчик", "Остановить JS навсегда", "Создать div", "Скрыть консоль", "Запустить fetch"], 0, "Например, отменить обычную отправку формы."),
      q("Что делает stopPropagation?", ["Останавливает дальнейшее распространение события", "Останавливает загрузку страницы", "Очищает localStorage", "Меняет input type", "Создаёт CSS class", "Удаляет event target"], 0, "Это влияет на путь события."),
      q("Почему innerHTML опасен с пользовательским вводом?", ["Может привести к XSS", "Не отображает текст", "Работает только с числами", "Запрещён", "Всегда очищает body", "Не меняет DOM"], 0, "HTML из ненадёжной строки может выполнить вредный код."),
      q("Что такое делегирование событий?", ["Один обработчик на родителе для событий от потомков", "Копирование всех элементов", "Запрет событий", "Создание iframe", "CSS Grid", "Отправка JSON"], 0, "Делегирование удобно для динамических списков."),
      q("Как добавить класс элементу?", ["element.classList.add('active')", "element.style = '.active'", "document.add('active')", "className.add()", "querySelector.addClass()", "html.class('active')"], 0, "classList даёт методы add/remove/toggle."),
      q("Что такое target у события?", ["Элемент, на котором событие возникло", "Всегда window", "Только form", "CSS-селектор", "Promise result", "HTTP ответ"], 0, "event.target указывает исходную цель события."),
    ],
  },
  {
    id: "react-hooks",
    section: "react",
    title: "Компоненты, state и hooks",
    tag: "основа",
    level: "junior",
    time: "17 мин",
    source: "https://doka.guide/recipes/react/",
    summary:
      "React помогает описывать интерфейс как набор компонентов, состояние которых меняется со временем. Junior должен понимать props, state, key, controlled inputs, useEffect и базовые правила хуков.",
    bullets: [
      "Компонент должен быть предсказуемой функцией от props и state.",
      "State меняют через setter, а не прямым присваиванием.",
      "key нужен React для устойчивого сопоставления элементов списка.",
      "useEffect подходит для синхронизации с внешним миром: сетью, DOM API, подписками.",
    ],
    questions: [
      q("Что такое props?", ["Данные, переданные компоненту снаружи", "Локальное хранилище", "CSS файл", "Событие браузера", "Promise", "HTML атрибут lang"], 0, "Props позволяют родителю передать данные ребёнку."),
      q("Как правильно изменить state?", ["Прямо присвоить переменной", "Через setter из useState", "Через document.write", "Через CSS", "Через JSON.parse", "Через alert"], 1, "Setter сообщает React, что нужен новый рендер."),
      q("Зачем нужен key в списках?", ["Для стабильной идентификации элементов при обновлениях", "Для цвета", "Для fetch", "Для aria-label", "Для валидации формы", "Для импорта CSS"], 0, "key помогает React корректно сопоставлять элементы."),
      q("Почему индекс массива не всегда хороший key?", ["При перестановке элементов состояние может привязаться не туда", "Индекс запрещён", "Индекс не число", "React его не принимает", "CSS ломается", "HTML невалиден"], 0, "Индекс безопасен только для действительно статичных списков."),
      q("Когда выполняется useEffect без массива зависимостей?", ["После каждого рендера", "Только один раз", "Никогда", "До первого рендера", "Только при клике", "Только на сервере"], 0, "Без зависимостей эффект запускается после каждого коммита."),
      q("Что означает controlled input?", ["Значение поля хранится в React state", "Поле отключено", "Поле без label", "Поле только для чтения браузером", "Поле внутри iframe", "Поле отправляется fetch"], 0, "value и onChange связывают input со state."),
      q("Где можно вызывать хуки?", ["Внутри условий", "В компонентах и пользовательских хуках на верхнем уровне", "В обычных циклах", "В CSS", "В HTML строке", "В обработчике после if всегда"], 1, "Порядок вызова хуков должен быть стабильным."),
      q("Что такое lifting state up?", ["Перенос общего состояния к ближайшему общему родителю", "Удаление state", "Замена props на CSS", "Подключение роутера", "Сборка проекта", "Скрытие компонента"], 0, "Так несколько компонентов получают согласованные данные."),
      q("Для чего нужен cleanup в useEffect?", ["Для отписки, очистки таймеров и внешних ресурсов", "Для удаления React", "Для смены key", "Для форматирования CSS", "Для JSON", "Для установки npm"], 0, "cleanup предотвращает утечки и лишние подписки."),
      q("Что вызывает повторный рендер компонента?", ["Изменение state или props", "Любой console.log", "CSS hover всегда", "Комментарий в коде", "Название файла", "alt у картинки"], 0, "React обновляет компонент при изменении данных рендера."),
    ],
  },
  {
    id: "react-effects",
    section: "react",
    title: "Эффекты, формы и данные",
    tag: "junior+",
    level: "junior+",
    time: "18 мин",
    source: "https://doka.guide/recipes/react/",
    summary:
      "На junior+ уровне часто спрашивают, как загрузить данные, избежать бесконечного эффекта, обработать форму, показать loading/error и не смешивать вычисления с эффектами без необходимости.",
    bullets: [
      "Не каждый расчёт нужен в useEffect: часто достаточно вычислить значение во время рендера.",
      "Зависимости эффекта должны отражать данные, которые эффект использует.",
      "Для загрузки данных нужны состояния loading, error и data.",
      "Формы становятся проще, если явно хранить значения и ошибки.",
    ],
    questions: [
      q("Что часто вызывает бесконечный useEffect?", ["Изменение зависимости внутри эффекта без условия", "Пустой массив зависимостей", "Обычный div", "CSS gap", "alt у img", "type button"], 0, "Если эффект меняет то, от чего сам зависит, можно получить цикл."),
      q("Где лучше хранить текст input в контролируемой форме?", ["В state", "В className", "В key", "В alt", "В CSS variable без чтения", "В title документа всегда"], 0, "State делает значение частью React-данных."),
      q("Что стоит показать при загрузке данных?", ["Состояние загрузки", "Пустую страницу без объяснения", "Только ошибку", "Новый роутер", "Случайный key", "alert в цикле"], 0, "Пользователь должен понимать, что данные загружаются."),
      q("Что делать с ошибкой fetch в компоненте?", ["Поймать и показать понятное состояние ошибки", "Игнорировать", "Перезагрузить браузер всегда", "Скрыть компонент навсегда", "Удалить state", "Поставить z-index"], 0, "Ошибки являются частью пользовательского сценария."),
      q("Когда useMemo действительно полезен?", ["Для дорогих вычислений или стабильных ссылок при реальной необходимости", "Для каждого числа", "Чтобы заменить useState", "Чтобы отправить форму", "Чтобы создать CSS", "Чтобы выключить React"], 0, "useMemo не нужен автоматически везде."),
      q("Что делает dependency array у useEffect?", ["Определяет, при изменении каких значений перезапустить эффект", "Сортирует JSX", "Меняет key", "Создаёт endpoint", "Отключает браузер", "Задаёт media query"], 0, "Зависимости управляют повторным запуском эффекта."),
      q("Почему нельзя делать component async напрямую для клиентского компонента?", ["Рендер должен вернуть JSX синхронно в обычном клиентском сценарии", "JS не поддерживает async", "React не поддерживает функции", "CSS не загрузится", "HTML запретит форму", "useState исчезнет"], 0, "Данные обычно грузят в эффекте или через подходящий фреймворк-паттерн."),
      q("Что такое derived state?", ["Состояние, которое можно вычислить из props/state", "Серверный лог", "CSS класс", "HTML шаблон", "Promise.any", "Индекс массива"], 0, "Не всё вычисляемое нужно хранить отдельно."),
      q("Что лучше для submit-кнопки внутри формы, если есть обработчик onSubmit?", ["button type='submit'", "a href='#'", "div role='button' без клавиатуры", "span onclick", "img", "input type='range'"], 0, "Нативная форма даёт ожидаемое поведение."),
      q("Что важно при списке ошибок формы?", ["Связать сообщение с полем и дать понятный текст", "Показать только красный цвет", "Скрыть все labels", "Удалить submit", "Использовать только console.log", "Не хранить ошибки"], 0, "Ошибка должна быть видимой и полезной."),
    ],
  },
];

const tasks: Task[] = [
  {
    title: "Фильтрация пользователей",
    section: "js",
    level: "junior",
    prompt: "Напиши функцию getActiveNames(users), которая вернёт массив имён активных пользователей старше 18 лет.",
    input: "getActiveNames([{ name: 'Ann', age: 22, active: true }, { name: 'Bob', age: 17, active: true }, { name: 'Sam', age: 31, active: false }])",
    output: "['Ann']",
  },
  {
    title: "Счётчик повторов",
    section: "js",
    level: "junior+",
    prompt: "Напиши функцию countWords(words), которая вернёт объект с количеством повторений каждого слова.",
    input: "countWords(['js', 'react', 'js', 'css'])",
    output: "{ js: 2, react: 1, css: 1 }",
  },
  {
    title: "Безопасный список",
    section: "html",
    level: "junior",
    prompt: "Сверстай список статей: заголовок, дата, краткое описание и ссылка на полную статью. Используй семантические теги.",
    input: "articles = [{ title: 'DOM', date: '2026-08-18', text: 'Как устроено дерево документа' }]",
    output: "section с article, h2, time, p и a",
  },
  {
    title: "Адаптивные карточки",
    section: "css",
    level: "junior",
    prompt: "Сделай сетку карточек, где на телефоне одна колонка, а на широком экране карточки сами раскладываются по 240px+.",
    input: ".cards > .card * 8",
    output: "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))",
  },
  {
    title: "Debounce поиска",
    section: "js",
    level: "junior+",
    prompt: "Напиши debounce(fn, delay), чтобы функция вызывалась только после паузы в вводе.",
    input: "const search = debounce(console.log, 300); search('r'); search('re'); search('react');",
    output: "В консоль попадёт только 'react' после паузы",
  },
  {
    title: "React: список задач",
    section: "react",
    level: "junior",
    prompt: "Собери компонент TodoList: поле ввода, кнопка добавления, список задач и удаление по кнопке.",
    input: "Пользователь вводит 'Повторить DOM' и нажимает Добавить",
    output: "Новая задача появляется в списке, её можно удалить",
  },
  {
    title: "React: фильтр",
    section: "react",
    level: "junior+",
    prompt: "Сделай компонент ProductFilter, который фильтрует товары по строке поиска без изменения исходного массива.",
    input: "products = ['MacBook', 'Magic Mouse', 'Keyboard']; query = 'ma'",
    output: "['MacBook', 'Magic Mouse']",
  },
  {
    title: "Форма регистрации",
    section: "html",
    level: "junior+",
    prompt: "Сверстай форму с email, паролем, чекбоксом согласия и понятными сообщениями ошибок.",
    input: "Пустой email, короткий пароль, чекбокс не отмечен",
    output: "Форма не отправляется, рядом с полями видны ошибки",
  },
];

function q(prompt: string, options: string[], correct: number, explain: string): Question {
  return { prompt, options, correct, explain };
}

function getStoredProgress() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("frontGymProgress") || "{}") as Record<string, number>;
  } catch {
    return {};
  }
}

export default function Home() {
  const [section, setSection] = useState<SectionId | "all">("all");
  const [topicId, setTopicId] = useState(topics[0].id);
  const [mode, setMode] = useState<"learn" | "train" | "tasks">("learn");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [copiedTask, setCopiedTask] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    setProgress(getStoredProgress());
  }, []);

  const visibleTopics = useMemo(
    () => topics.filter((topic) => section === "all" || topic.section === section),
    [section],
  );
  const currentTopic = topics.find((topic) => topic.id === topicId) ?? topics[0];
  const currentQuestion = currentTopic.questions[questionIndex];
  const isFinished = questionIndex >= currentTopic.questions.length;
  const bestScore = progress[currentTopic.id] ?? 0;

  function chooseSection(nextSection: SectionId | "all") {
    const firstTopic = topics.find((topic) => nextSection === "all" || topic.section === nextSection);
    setSection(nextSection);
    if (firstTopic) setTopicId(firstTopic.id);
    resetTraining();
    setMode("learn");
  }

  function chooseTopic(id: string) {
    setTopicId(id);
    resetTraining();
    setMode("learn");
  }

  function resetTraining() {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
  }

  function answer(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === currentQuestion.correct) setScore((value) => value + 1);
  }

  function nextQuestion() {
    const nextIndex = questionIndex + 1;
    if (nextIndex >= currentTopic.questions.length) {
      const finalScore = score + (selected === currentQuestion.correct ? 1 : 0);
      const nextProgress = {
        ...progress,
        [currentTopic.id]: Math.max(bestScore, finalScore),
      };
      setProgress(nextProgress);
      localStorage.setItem("frontGymProgress", JSON.stringify(nextProgress));
    }
    setQuestionIndex(nextIndex);
    setSelected(null);
  }

  async function copyTask(task: Task) {
    const text = `${task.title}\n\nЗадача:\n${task.prompt}\n\nПример ввода:\n${task.input}\n\nПример вывода:\n${task.output}`;
    await navigator.clipboard.writeText(text);
    setCopiedTask(task.title);
    window.setTimeout(() => setCopiedTask(null), 1800);
  }

  return (
    <main className="shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Front Gym</p>
          <h1>Тренажёр, чтобы вспомнить HTML, CSS, JavaScript и React</h1>
          <p className="heroText">
            Короткие конспекты, вопросы как на junior/junior+ собеседовании и задачи,
            которые удобно копировать в IDE. Всё работает прямо в браузере.
          </p>
        </div>
        <div className="heroPanel" aria-label="Статистика тренажёра">
          <span>{topics.length} тем</span>
          <strong>{topics.reduce((sum, topic) => sum + topic.questions.length, 0)}</strong>
          <span>вопросов в первом наборе</span>
        </div>
      </section>

      <nav className="sectionTabs" aria-label="Разделы">
        <button className={section === "all" ? "active" : ""} onClick={() => chooseSection("all")}>
          Все
        </button>
        {(Object.keys(sections) as SectionId[]).map((id) => (
          <button key={id} className={section === id ? "active" : ""} onClick={() => chooseSection(id)}>
            {sections[id].title}
          </button>
        ))}
      </nav>

      <section className="workspace">
        <aside className="topicList" aria-label="Темы">
          <div className="asideTitle">
            <span>Темы</span>
            <small>{visibleTopics.length}</small>
          </div>
          {visibleTopics.map((topic) => (
            <button
              key={topic.id}
              className={topic.id === currentTopic.id ? "topicButton active" : "topicButton"}
              onClick={() => chooseTopic(topic.id)}
            >
              <span>{topic.title}</span>
              <small>
                {sections[topic.section].title} · лучший {progress[topic.id] ?? 0}/{topic.questions.length}
              </small>
            </button>
          ))}
        </aside>

        <section className="content">
          <div className="modeTabs" aria-label="Режим">
            <button className={mode === "learn" ? "active" : ""} onClick={() => setMode("learn")}>
              Конспект
            </button>
            <button
              className={mode === "train" ? "active" : ""}
              onClick={() => {
                resetTraining();
                setMode("train");
              }}
            >
              Тренировка
            </button>
            <button className={mode === "tasks" ? "active" : ""} onClick={() => setMode("tasks")}>
              Задачи
            </button>
          </div>

          {mode === "learn" && (
            <article className="article">
              <div className="meta">
                <span>{currentTopic.tag}</span>
                <span>{currentTopic.level}</span>
                <span>{currentTopic.time}</span>
              </div>
              <h2>{currentTopic.title}</h2>
              <p>{currentTopic.summary}</p>
              <ul>
                {currentTopic.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="sourceLine">
                Ориентир: <a href={currentTopic.source}>Дока</a>
              </div>
              <button
                className="primaryAction"
                onClick={() => {
                  resetTraining();
                  setMode("train");
                }}
              >
                Тренировка
              </button>
            </article>
          )}

          {mode === "train" && (
            <section className="trainer" aria-live="polite">
              {!isFinished ? (
                <>
                  <div className="quizTop">
                    <span>
                      Вопрос {questionIndex + 1}/{currentTopic.questions.length}
                    </span>
                    <span>
                      Счёт {score}/{currentTopic.questions.length}
                    </span>
                  </div>
                  <div className="progressBar">
                    <span style={{ width: `${(questionIndex / currentTopic.questions.length) * 100}%` }} />
                  </div>
                  <h2>{currentQuestion.prompt}</h2>
                  <div className="answers">
                    {currentQuestion.options.map((option, index) => {
                      const state =
                        selected === null
                          ? ""
                          : index === currentQuestion.correct
                            ? "right"
                            : selected === index
                              ? "wrong"
                              : "muted";
                      return (
                        <button key={option} className={state} onClick={() => answer(index)}>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {selected !== null && (
                    <div className="feedback">
                      <strong>{selected === currentQuestion.correct ? "Верно" : "Почти"}</strong>
                      <p>{currentQuestion.explain}</p>
                      <button className="primaryAction" onClick={nextQuestion}>
                        {questionIndex + 1 === currentTopic.questions.length ? "Завершить" : "Следующий вопрос"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="result">
                  <span>Тема пройдена</span>
                  <h2>
                    {Math.max(bestScore, score)}/{currentTopic.questions.length}
                  </h2>
                  <p>Лучший результат сохранён на этом устройстве. Можно повторить тему или перейти к задачам.</p>
                  <div className="resultActions">
                    <button className="primaryAction" onClick={resetTraining}>
                      Повторить
                    </button>
                    <button onClick={() => setMode("tasks")}>К задачам</button>
                  </div>
                </div>
              )}
            </section>
          )}

          {mode === "tasks" && (
            <section className="tasks">
              <div>
                <h2>Задачи для IDE</h2>
                <p>Копируй условие одной кнопкой, решай у себя и проверяй по примеру вывода.</p>
              </div>
              <div className="taskGrid">
                {tasks
                  .filter((task) => section === "all" || task.section === section)
                  .map((task) => (
                    <article key={task.title} className="taskCard">
                      <div className="meta">
                        <span>{sections[task.section].title}</span>
                        <span>{task.level}</span>
                      </div>
                      <h3>{task.title}</h3>
                      <p>{task.prompt}</p>
                      <dl>
                        <div>
                          <dt>Ввод</dt>
                          <dd>{task.input}</dd>
                        </div>
                        <div>
                          <dt>Вывод</dt>
                          <dd>{task.output}</dd>
                        </div>
                      </dl>
                      <button onClick={() => copyTask(task)}>
                        {copiedTask === task.title ? "Скопировано" : "Копировать"}
                      </button>
                    </article>
                  ))}
              </div>
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
