import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/6089211e-fd2f-4620-b9da-c39e72188cce/files/72bde98e-d0bc-49fd-becf-96f3862c5b1e.jpg";

const services = [
  {
    icon: "Users",
    title: "Аутстаффинг персонала",
    description:
      "Предоставляем квалифицированных сотрудников в ваш штат на условиях аутстаффинга. Юридическое оформление, налоги и кадровое делопроизводство — наша забота.",
    details: ["Официальное оформление по трудовому договору", "Любые категории специалистов", "Гибкие условия сотрудничества"],
  },
  {
    icon: "Briefcase",
    title: "Аутсорсинг процессов",
    description:
      "Полная передача бизнес-функций под наше управление. Сокращаем ваши операционные расходы и повышаем эффективность без найма штатных сотрудников.",
    details: ["Производственный персонал", "Складская логистика", "Клиентский сервис и back-office"],
  },
  {
    icon: "Search",
    title: "Подбор персонала",
    description:
      "Профессиональный рекрутинг под ваши задачи: от рабочих специальностей до топ-менеджмента. Работаем быстро и с гарантией результата.",
    details: ["Массовый подбор от 1 дня", "Executive Search", "Замена кандидата в случае отказа"],
  },
  {
    icon: "FileCheck",
    title: "Кадровые решения",
    description:
      "Комплексное сопровождение кадровых процессов: от разработки организационных структур до автоматизации HR-функций вашего бизнеса.",
    details: ["Кадровый аудит и оптимизация", "Разработка HR-стратегии", "Сопровождение трудовых отношений"],
  },
];

const stats = [
  { value: "500+", label: "Клиентов по всей России" },
  { value: "12 лет", label: "На рынке кадровых услуг" },
  { value: "10 000+", label: "Трудоустроенных специалистов" },
  { value: "98%", label: "Клиентов возвращаются снова" },
];

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "Услуги", href: "#services" },
  { label: "О компании", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-golos" style={{ backgroundColor: "#071510", color: "#ddeadf" }}>
      {/* НАВИГАЦИЯ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(7, 21, 16, 0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center rounded"
              style={{ backgroundColor: "var(--gold)", color: "#071510" }}
            >
              <span className="font-cormorant font-bold text-lg leading-none">Г</span>
            </div>
            <div>
              <div className="font-cormorant font-semibold text-lg leading-tight" style={{ color: "var(--gold)" }}>
                ГК СТАФФСИНТЕЗ
              </div>
              <div className="text-xs opacity-50 leading-tight" style={{ fontSize: "10px", color: "#9dbfab" }}>Группа компаний</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="nav-link text-sm opacity-75 hover:opacity-100 transition-opacity"
                style={{ color: "#ddeadf" }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 text-sm font-medium rounded transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: "var(--gold)", color: "#071510" }}
            >
              Оставить заявку
            </button>
          </div>

          <button className="md:hidden opacity-75 hover:opacity-100" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "#ddeadf" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: "rgba(7,21,16,0.98)" }}>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left text-sm opacity-75 hover:opacity-100 transition-opacity py-2 border-b"
                style={{ borderColor: "rgba(201,168,76,0.15)", color: "#ddeadf" }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="mt-2 px-5 py-2.5 text-sm font-medium rounded"
              style={{ backgroundColor: "var(--gold)", color: "#071510" }}
            >
              Оставить заявку
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Команда профессионалов"
            className="w-full h-full object-cover"
            style={{ opacity: 0.2 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(7,21,16,0.97) 0%, rgba(7,21,16,0.7) 50%, rgba(7,21,16,0.95) 100%)",
            }}
          />
        </div>

        <div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-64 h-64 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2f8a60 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 animate-fade-up"
              style={{
                border: "1px solid rgba(201,168,76,0.3)",
                color: "var(--gold)",
                animationFillMode: "both",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--gold)" }} />
              Официальный партнёр крупнейших работодателей России
            </div>

            <h1
              className="font-cormorant leading-tight mb-6 animate-fade-up"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 600,
                animationDelay: "0.1s",
                animationFillMode: "both",
                color: "#f0f7f2",
              }}
            >
              Кадровые решения
              <br />
              <span style={{ color: "var(--gold)" }}>для вашего бизнеса</span>
            </h1>

            <p
              className="text-lg mb-10 leading-relaxed animate-fade-up"
              style={{
                color: "#9dbfab",
                animationDelay: "0.25s",
                animationFillMode: "both",
                maxWidth: "560px",
              }}
            >
              ГК «СТАФФСИНТЕЗ» осуществляет массовый подбор сотрудников разного уровня компетенций, специальностей для выполнения Ваших работ на постоянной основе. За весь период работы наша компания зарекомендовала себя как ответственный и серьезный деловой партнер, добросовестный налогоплательщик и надежный работодатель.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <button
                onClick={() => scrollTo("#contacts")}
                className="px-8 py-3.5 font-medium rounded text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "var(--gold)", color: "#071510" }}
              >
                Получить консультацию
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="px-8 py-3.5 font-medium rounded text-base transition-all duration-300 hover:opacity-100"
                style={{
                  border: "1px solid rgba(201,168,76,0.4)",
                  color: "#e2c97a",
                  opacity: 0.85,
                }}
              >
                Наши услуги
              </button>
            </div>
          </div>

          <div
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-up"
            style={{ animationDelay: "0.55s", animationFillMode: "both" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <div className="font-cormorant font-semibold mb-1" style={{ fontSize: "2rem", color: "var(--gold)" }}>
                  {s.value}
                </div>
                <div className="text-sm leading-snug" style={{ color: "#7da891" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce" style={{ color: "#7da891" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em" }}>ЛИСТАЙТЕ</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      <div className="gold-line mx-auto" style={{ maxWidth: "200px" }} />

      {/* УСЛУГИ */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", opacity: 0.7 }}>
              Что мы предлагаем
            </div>
            <h2 className="font-cormorant font-semibold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f7f2" }}>
              Услуги компании
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7da891" }}>
              Полный спектр кадровых услуг для бизнеса любого масштаба — от стартапа до крупной корпорации
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="service-card rounded-xl p-8 animate-on-scroll"
                style={{ backgroundColor: "rgba(10, 32, 24, 0.6)", animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold)" }}
                >
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="font-cormorant font-semibold text-2xl mb-3" style={{ color: "#f0f7f2" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#7da891" }}>
                  {s.description}
                </p>
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm" style={{ color: "#9dbfab" }}>
                      <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>
                        <Icon name="Check" size={14} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О КОМПАНИИ */}
      <section id="about" className="py-28 px-6" style={{ backgroundColor: "rgba(10, 32, 24, 0.4)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", opacity: 0.7 }}>
                О нас
              </div>
              <h2 className="font-cormorant font-semibold mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f7f2" }}>Мы предлагаем работу на крупнейших строительных
и промышленных предприятиях
различных отраслей на всей территории России</h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#7da891" }}>
                ООО «ГК СТАФФСИНТЕЗ» — это профессиональная группа компаний, специализирующаяся на комплексных кадровых решениях для российского бизнеса. Мы работаем с предприятиями из промышленности, торговли, логистики, IT и сферы услуг.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#7da891" }}>
                Наш подход: индивидуальные решения, прозрачные условия и реальная ответственность за результат. Более 500 компаний-клиентов доверяют нам управление своими кадровыми процессами.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Shield", text: "Полная юридическая ответственность" },
                  { icon: "Clock", text: "Закрываем вакансии от 24 часов" },
                  { icon: "MapPin", text: "Работаем по всей России" },
                  { icon: "Award", text: "Аккредитованное кадровое агентство" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: "rgba(26,80,56,0.2)", border: "1px solid rgba(201,168,76,0.1)" }}
                  >
                    <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>
                      <Icon name={item.icon} size={18} />
                    </span>
                    <span className="text-sm leading-snug" style={{ color: "#9dbfab" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll relative">
              <div className="rounded-2xl overflow-hidden relative" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <img
                  src={HERO_IMAGE}
                  alt="Офис компании"
                  className="w-full h-80 object-cover"
                  style={{ opacity: 0.5 }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(7,21,16,0.9) 0%, transparent 60%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-cormorant text-3xl font-semibold mb-1" style={{ color: "var(--gold)" }}>
                    «Ваш кадровый рост — наша ответственность»
                  </div>
                  <div className="text-sm opacity-60" style={{ color: "#9dbfab" }}>
                    — Команда ГК СТАФФСИНТЕЗ
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-5 -right-5 px-6 py-4 rounded-xl text-center hidden lg:block"
                style={{ backgroundColor: "var(--gold)", color: "#071510" }}
              >
                <div className="font-cormorant font-bold text-3xl">500+</div>
                <div className="text-xs font-medium">довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <div
            className="rounded-2xl p-12"
            style={{
              background: "linear-gradient(135deg, rgba(26,80,56,0.4) 0%, rgba(14,45,32,0.6) 100%)",
              border: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            <h2 className="font-cormorant font-semibold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#f0f7f2" }}>
              Готовы оптимизировать ваши кадровые расходы?
            </h2>
            <p className="mb-8 text-base" style={{ color: "#7da891" }}>
              Оставьте заявку — наш эксперт свяжется с вами в течение 15 минут и подберёт оптимальное решение
            </p>
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-10 py-4 font-medium text-base rounded transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ backgroundColor: "var(--gold)", color: "#071510" }}
            >
              Получить бесплатную консультацию
            </button>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="contacts" className="py-28 px-6" style={{ backgroundColor: "rgba(5,15,8,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)", opacity: 0.7 }}>
              Связаться с нами
            </div>
            <h2 className="font-cormorant font-semibold mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f0f7f2" }}>
              Контакты
            </h2>
            <p className="text-base" style={{ color: "#7da891" }}>
              Напишите или позвоните нам — ответим быстро
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-on-scroll space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00", sub: "Бесплатно по России" },
                { icon: "Mail", label: "Email", value: "info@staffsyntez.ru", sub: "Ответим в течение 1 часа" },
                { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1", sub: "Пн–Пт: 9:00–18:00" },
                { icon: "Clock", label: "Режим работы", value: "Понедельник – Пятница", sub: "09:00 — 18:00 МСК" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 p-5 rounded-xl"
                  style={{ backgroundColor: "rgba(10,32,24,0.6)", border: "1px solid rgba(201,168,76,0.1)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "var(--gold)" }}
                  >
                    <Icon name={c.icon} size={18} />
                  </div>
                  <div>
                    <div className="text-xs opacity-50 mb-0.5" style={{ color: "#9dbfab" }}>{c.label}</div>
                    <div className="font-medium" style={{ color: "#f0f7f2" }}>{c.value}</div>
                    <div className="text-sm opacity-60 mt-0.5" style={{ color: "#7da891" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="animate-on-scroll rounded-xl p-8"
              style={{ backgroundColor: "rgba(10,32,24,0.6)", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <h3 className="font-cormorant font-semibold text-2xl mb-6" style={{ color: "#f0f7f2" }}>
                Оставить заявку
              </h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
                }}
              >
                {[
                  { label: "Ваше имя *", type: "text", placeholder: "Иван Иванов", required: true },
                  { label: "Компания", type: "text", placeholder: "ООО «Ваша компания»", required: false },
                  { label: "Телефон или Email *", type: "text", placeholder: "+7 (999) 000-00-00", required: true },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs mb-1.5 opacity-60" style={{ color: "#9dbfab" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                      style={{
                        backgroundColor: "rgba(20,61,44,0.4)",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#f0f7f2",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs mb-1.5 opacity-60" style={{ color: "#9dbfab" }}>
                    Комментарий
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Опишите вашу задачу..."
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none"
                    style={{
                      backgroundColor: "rgba(20,61,44,0.4)",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#f0f7f2",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  style={{ backgroundColor: "var(--gold)", color: "#071510" }}
                >
                  Отправить заявку
                </button>
                <p className="text-xs text-center opacity-40" style={{ color: "#9dbfab" }}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6"
        style={{ borderTop: "1px solid rgba(201,168,76,0.1)", backgroundColor: "rgba(5,15,8,0.8)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center rounded"
              style={{ backgroundColor: "var(--gold)", color: "#071510" }}
            >
              <span className="font-cormorant font-bold text-sm">Г</span>
            </div>
            <span className="font-cormorant font-semibold" style={{ color: "var(--gold)" }}>
              ГК СТАФФСИНТЕЗ
            </span>
          </div>
          <div className="text-xs opacity-40 text-center" style={{ color: "#9dbfab" }}>
            © 2024 ООО «ГК СТАФФСИНТЕЗ». Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            {navLinks.slice(0, 3).map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                style={{ color: "#9dbfab" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}