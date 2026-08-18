"use client";

import { useEffect, useMemo, useState } from "react";
import { sections, tasks, topics, type SectionId, type Task } from "./content";

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
  const visibleTasks = useMemo(
    () => tasks.filter((task) => section === "all" || task.section === section),
    [section],
  );
  const currentTopic = topics.find((topic) => topic.id === topicId) ?? topics[0];
  const currentQuestion = currentTopic.questions[questionIndex];
  const isFinished = questionIndex >= currentTopic.questions.length;
  const bestScore = progress[currentTopic.id] ?? 0;
  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

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
            Расширенная база тем по Доке, learn.javascript.ru и React docs: конспекты,
            примеры кода, рабочие сценарии, частые ошибки, тесты и задачи для IDE.
          </p>
        </div>
        <div className="heroPanel" aria-label="Статистика тренажёра">
          <span>{topics.length} тем</span>
          <strong>{totalQuestions}</strong>
          <span>вопросов в базе</span>
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

              <section className="lessonBlock">
                <h3>Что важно запомнить</h3>
                <ul>
                  {currentTopic.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>

              <section className="lessonBlock">
                <h3>Мини-пример</h3>
                <pre>
                  <code>{currentTopic.code}</code>
                </pre>
              </section>

              <section className="workExample">
                <h3>Как это используется в работе</h3>
                <p>{currentTopic.workExample}</p>
              </section>

              <section className="lessonBlock">
                <h3>Частые ошибки</h3>
                <ul>
                  {currentTopic.mistakes.map((mistake) => (
                    <li key={mistake}>{mistake}</li>
                  ))}
                </ul>
              </section>

              <div className="sourceLine">
                Ориентир: <a href={currentTopic.source}>{currentTopic.source.replace("https://", "")}</a>
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
                {visibleTasks.map((task) => (
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
