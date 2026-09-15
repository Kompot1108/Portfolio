import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Phone, Clock, ShieldCheck, Trophy, FileBadge, Building2, Home, Hammer, Ruler, MapPin, HardHat, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../lib/i18n";
import { useEffect } from "react";
import aboutTeam from "../assets/about-team.jpg";

export const Route = createFileRoute("/construction-landing")({
  meta: () => [
    { title: "Premier Construct | Alex Voloshyn" }
  ],
  component: ConstructionLandingPage,
});

const translations = {
  en: {
    topPhone: "(555) 012-3456",
    topHours: "Mon-Fri 8am-6pm",
    navServices: "SERVICES",
    navProjects: "PROJECTS",
    navAbout: "ABOUT",
    navQuote: "GET A QUOTE",
    
    heroTitle1: "Solid Foundations.",
    heroTitle2: "Built to Last.",
    heroDesc: "No excuses, just hard work. We handle commercial and premium residential builds from dirt to handover, keeping you informed every step of the way.",
    btnEstimate: "REQUEST ESTIMATE",
    btnWork: "VIEW OUR WORK",
    
    barLicensed: "FULLY LICENSED",
    barExp: "15+ YEARS IN BUSINESS",
    barIso: "SAFETY FIRST",
    
    aboutQuote: "Quality is never an accident; it is always the result of high intention and sincere effort.",
    aboutTitle: "More Than Just Contractors",
    aboutText1: "We started in 2008 with a single pickup truck and a commitment to doing things right. Today, Premier Construct is a full-service construction management firm. We don't just pass off work to subcontractors — we take ownership of the site, the schedule, and the final quality.",
    aboutText2: "Whether it's a 50,000 sq ft logistics center or a custom hillside estate, our word is our bond. If we say it's done on Tuesday, it's done on Tuesday.",
    stat1: "250+", stat1Label: "Projects Completed",
    stat2: "0", stat2Label: "Safety Incidents",
    stat3: "15", stat3Label: "Years Experience",

    coreTitle: "What We Do",
    card1Title: "Commercial",
    card1Desc: "Office buildings, retail spaces, and warehouses. We understand that in business, time is money.",
    card2Title: "Custom Homes",
    card2Desc: "Architect-driven residential builds where every millimeter counts. High-end finishes and smart home integration.",
    card3Title: "Major Renovations",
    card3Desc: "Gutting, structural overhauls, and modernizing aging properties while preserving their core character.",
    card4Title: "Site Management",
    card4Desc: "Permitting, budget tracking, and daily site supervision. We deal with the headaches so you don't have to.",
    learnMore: "LEARN MORE",
    
    projectsTitle: "Recent Sites",
    viewAll: "VIEW ALL PROJECTS",
    proj1Badge: "COMMERCIAL",
    proj1Title: "Steelworks Office Complex",
    proj1Loc: "DOWNTOWN HUB",
    proj1Note: "Handed over 2 weeks ahead of schedule.",
    proj2Badge: "RESIDENTIAL",
    proj2Title: "Glass & Timber Residence",
    proj2Loc: "HILLSIDE ESTATE",
    proj2Note: "Custom millwork and zero-edge pool.",
    proj3Badge: "INDUSTRIAL",
    proj3Title: "Sector 4 Logistics",
    proj3Loc: "PORT AUTHORITY",
    proj3Note: "120,000 sq ft concrete tilt-up.",
    
    testiTitle: "Word on the Street",
    testi1: "Premier Construct took over our office build after the first contractor bailed. They fixed the foundation issues, got the permits sorted, and hit the original deadline. Absolute lifesavers.",
    testi1Author: "Marcus T., CEO",
    testi2: "They built our custom home in the hills. The crew was respectful, the site was always clean at the end of the day, and the craftsmanship on the exposed beams is incredible.",
    testi2Author: "Sarah & David L.",

    contactTitle: "Let's Build Something",
    contactDesc: "Fill out the form below or call us directly. We'll get back to you within 24 hours to schedule a site walk.",
    formName: "Full Name",
    formPhone: "Phone Number",
    formService: "Project Type",
    formService1: "Commercial Build",
    formService2: "Residential Build",
    formService3: "Renovation",
    formSubmit: "SEND INQUIRY",
    formNamePlaceholder: "John Doe",
    formPhonePlaceholder: "+1 (555) 000-0000",

    footerCopy: "© 2024 Premier Construct. No fluff, just solid builds."
  },
  uk: {
    topPhone: "+38 (044) 123-45-67",
    topHours: "Пн-Пт 8:00-18:00",
    navServices: "ПОСЛУГИ",
    navProjects: "ОБ'ЄКТИ",
    navAbout: "ПРО КОМПАНІЮ",
    navQuote: "ОТРИМАТИ ПРОРАХУНОК",
    
    heroTitle1: "Надійний фундамент.",
    heroTitle2: "Будуємо на віки.",
    heroDesc: "Жодних відмовок, лише результат. Ведемо комерційні та приватні об'єкти від котловану до передачі ключів, забезпечуючи повний контроль на кожному етапі.",
    btnEstimate: "ЗАМОВИТИ ПРОРАХУНОК",
    btnWork: "НАШІ ОБ'ЄКТИ",
    
    barLicensed: "ЛІЦЕНЗІЯ СС2/СС3",
    barExp: "15+ РОКІВ НА РИНКУ",
    barIso: "БЕЗПЕКА ПОНАД УСЕ",
    
    aboutQuote: "Якість ніколи не буває випадковістю; це завжди результат високих намірів та щирих зусиль.",
    aboutTitle: "Більше ніж просто підрядники",
    aboutText1: "Ми починали у 2008 році з однієї бригади та бажання будувати на совість. Сьогодні Premier Construct — це компанія повного циклу. Ми не просто передаємо об'єкти субпідрядникам, ми несемо особисту відповідальність за кожен залитий куб бетону та покладену цеглину.",
    aboutText2: "Будь то логістичний хаб на 10 000 квадратів чи приватна резиденція в лісі — наше слово має вагу. Якщо ми сказали, що здамо об'єкт у вівторок, він буде зданий у вівторок.",
    stat1: "250+", stat1Label: "Зданих об'єктів",
    stat2: "100%", stat2Label: "Дотримання термінів",
    stat3: "15", stat3Label: "Років досвіду",

    coreTitle: "Що ми робимо",
    card1Title: "Комерція",
    card1Desc: "Офісні центри, торгові площі та склади. Ми розуміємо, що в бізнесі кожен день простою коштує грошей.",
    card2Title: "Приватні будинки",
    card2Desc: "Елітні котеджі за індивідуальними проєктами. Від моноліту до фінішного оздоблення преміум-класу.",
    card3Title: "Капітальна реконструкція",
    card3Desc: "Повне перепланування, підсилення несучих конструкцій та модернізація старих фондів.",
    card4Title: "Технічний нагляд",
    card4Desc: "Отримання дозволів, контроль бюджету та щоденне управління майданчиком. Беремо весь головний біль на себе.",
    learnMore: "ДЕТАЛЬНІШЕ",
    
    projectsTitle: "Останні об'єкти",
    viewAll: "ДИВИТИСЬ УСІ",
    proj1Badge: "КОМЕРЦІЯ",
    proj1Title: "БЦ «Київ-Сіті»",
    proj1Loc: "ЦЕНТР МІСТА",
    proj1Note: "Здано в експлуатацію на 2 тижні раніше.",
    proj2Badge: "ЖИТЛОВИЙ",
    proj2Title: "Резиденція в лісі",
    proj2Loc: "КОНЧА-ЗАСПА",
    proj2Note: "Складні бетонні рішення та панорамне скління.",
    proj3Badge: "ПРОМИСЛОВИЙ",
    proj3Title: "Логістичний хаб",
    proj3Loc: "БРОВАРСЬКА ТРАСА",
    proj3Note: "Масштабний монтаж металоконструкцій.",
    
    testiTitle: "Що кажуть замовники",
    testi1: "Вони взяли наш об'єкт після того, як попередні будівельники просто зникли з авансом. Виправили косяки по фундаменту, швидко загнали техніку і вклалися в початковий дедлайн. Справжні профі.",
    testi1Author: "Михайло Т., Замовник БЦ",
    testi2: "Будували нам дім. Дуже сподобалась культура на майданчику: жодного сміття після зміни, виконроб завжди на зв'язку, а якість бетонних робіт — просто ідеал.",
    testi2Author: "Олена та Дмитро",

    contactTitle: "Почнемо будівництво",
    contactDesc: "Залиште заявку або зателефонуйте нам. Ми зв'яжемося з вами протягом робочого дня для обговорення деталей та виїзду на ділянку.",
    formName: "Як до вас звертатись?",
    formPhone: "Номер телефону",
    formService: "Що плануємо будувати?",
    formService1: "Комерційний об'єкт",
    formService2: "Приватний будинок",
    formService3: "Реконструкція",
    formSubmit: "ВІДПРАВИТИ ЗАЯВКУ",
    formNamePlaceholder: "Олександр",
    formPhonePlaceholder: "+38 (050) 123-45-67",

    footerCopy: "© 2024 Premier Construct. Будуємо на совість."
  },
  ru: {
    topPhone: "+38 (044) 123-45-67",
    topHours: "Пн-Пт 8:00-18:00",
    navServices: "УСЛУГИ",
    navProjects: "ОБЪЕКТЫ",
    navAbout: "О КОМПАНИИ",
    navQuote: "ПОЛУЧИТЬ ПРОСЧЕТ",
    
    heroTitle1: "Надежный фундамент.",
    heroTitle2: "Строим на века.",
    heroDesc: "Никаких отговорок, только результат. Ведем коммерческие и частные объекты от котлована до передачи ключей, обеспечивая полный контроль на каждом этапе.",
    btnEstimate: "ЗАКАЗАТЬ ПРОСЧЕТ",
    btnWork: "НАШИ ОБЪЕКТЫ",
    
    barLicensed: "ЛИЦЕНЗИЯ СС2/СС3",
    barExp: "15+ ЛЕТ НА РЫНКЕ",
    barIso: "БЕЗОПАСНОСТЬ ПРЕЖДЕ ВСЕГО",
    
    aboutQuote: "Качество никогда не бывает случайностью; это всегда результат высоких намерений и искренних усилий.",
    aboutTitle: "Больше, чем просто подрядчики",
    aboutText1: "Мы начинали в 2008 году с одной бригады и желания строить на совесть. Сегодня Premier Construct — это компания полного цикла. Мы не просто передаем объекты субподрядчикам, мы несем личную ответственность за каждый залитый куб бетона и уложенный кирпич.",
    aboutText2: "Будь то логистический хаб на 10 000 квадратов или частная резиденция в лесу — наше слово имеет вес. Если мы сказали, что сдадим объект во вторник, он будет сдан во вторник.",
    stat1: "250+", stat1Label: "Сданных объектов",
    stat2: "100%", stat2Label: "Соблюдение сроков",
    stat3: "15", stat3Label: "Лет опыта",

    coreTitle: "Что мы делаем",
    card1Title: "Коммерция",
    card1Desc: "Офисные центры, торговые площади и склады. Мы понимаем, что в бизнесе каждый день простоя стоит денег.",
    card2Title: "Частные дома",
    card2Desc: "Элитные коттеджи по индивидуальным проектам. От монолита до финишной отделки премиум-класса.",
    card3Title: "Капитальная реконструкция",
    card3Desc: "Полная перепланировка, усиление несущих конструкций и модернизация старых фондов.",
    card4Title: "Технический надзор",
    card4Desc: "Получение разрешений, контроль бюджета и ежедневное управление площадкой. Берем всю головную боль на себя.",
    learnMore: "ПОДРОБНЕЕ",
    
    projectsTitle: "Последние объекты",
    viewAll: "СМОТРЕТЬ ВСЕ",
    proj1Badge: "КОММЕРЦИЯ",
    proj1Title: "БЦ «Киев-Сити»",
    proj1Loc: "ЦЕНТР ГОРОДА",
    proj1Note: "Сдан в эксплуатацию на 2 недели раньше.",
    proj2Badge: "ЖИЛОЙ",
    proj2Title: "Резиденция в лесу",
    proj2Loc: "КОНЧА-ЗАСПА",
    proj2Note: "Сложные бетонные решения и панорамное остекление.",
    proj3Badge: "ПРОМЫШЛЕННЫЙ",
    proj3Title: "Логистический хаб",
    proj3Loc: "БРОВАРСКАЯ ТРАССА",
    proj3Note: "Масштабный монтаж металлоконструкций.",
    
    testiTitle: "Что говорят заказчики",
    testi1: "Они взяли наш объект после того, как предыдущие строители просто пропали с авансом. Исправили косяки по фундаменту, быстро загнали технику и уложились в изначальный дедлайн. Настоящие профи.",
    testi1Author: "Михаил Т., Заказчик БЦ",
    testi2: "Строили нам дом. Очень понравилась культура на площадке: никакого мусора после смены, прораб всегда на связи, а качество бетонных работ — просто идеал.",
    testi2Author: "Елена и Дмитрий",

    contactTitle: "Начнем строительство",
    contactDesc: "Оставьте заявку или позвоните нам. Мы свяжемся с вами в течение рабочего дня для обсуждения деталей и выезда на участок.",
    formName: "Как к вам обращаться?",
    formPhone: "Номер телефона",
    formService: "Что планируем строить?",
    formService1: "Коммерческий объект",
    formService2: "Частный дом",
    formService3: "Реконструкция",
    formSubmit: "ОТПРАВИТЬ ЗАЯВКУ",
    formNamePlaceholder: "Александр",
    formPhonePlaceholder: "+38 (050) 123-45-67",

    footerCopy: "© 2024 Premier Construct. Строим на совесть."
  }
};

function ConstructionLandingPage() {
  const { lang } = useLanguage();
  const l = translations[lang as keyof typeof translations] || translations.en;

  // Smooth scroll handler
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange, false);
    return () => window.removeEventListener('hashchange', handleHashChange, false);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden w-full bg-white font-sans text-neutral-900 selection:bg-amber-500/30">
      {/* Top Bar */}
      <div className="bg-[#1c1c1c] text-neutral-400 py-2.5 px-6 text-sm flex justify-between items-center hidden sm:flex">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{l.topPhone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{l.topHours}</span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center">
              <div className="h-6 w-2 bg-[#f2a61c] rounded-sm"></div>
              <div className="h-6 w-2 bg-[#1c1c1c] rounded-sm"></div>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-[#1c1c1c]">PREMIER CONSTRUCT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-neutral-600">
            <a href="#services" className="hover:text-[#f2a61c] transition-colors">{l.navServices}</a>
            <a href="#projects" className="hover:text-[#f2a61c] transition-colors">{l.navProjects}</a>
            <a href="#about" className="hover:text-[#f2a61c] transition-colors">{l.navAbout}</a>
          </div>
          
          <a href="#quote" className="inline-block bg-[#f2a61c] hover:bg-[#e09817] text-[#1c1c1c] px-4 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-sm font-bold tracking-wide transition-colors uppercase cursor-pointer text-center">
            {l.navQuote}
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[650px] flex flex-col justify-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-neutral-900/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2069&auto=format&fit=crop" 
            alt="Construction" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 mx-auto max-w-7xl px-6 w-full pb-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] mb-6 drop-shadow-lg">
              {l.heroTitle1} <br/>
              <span className="text-[#f2a61c]">{l.heroTitle2}</span>
            </h1>
            <p className="text-lg text-neutral-200 mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              {l.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#quote" className="w-full sm:w-auto text-center bg-[#f2a61c] hover:bg-[#e09817] text-[#1c1c1c] px-8 py-4 sm:py-3.5 text-sm font-bold tracking-wide transition-colors uppercase">
                {l.btnEstimate}
              </a>
              <a href="#projects" className="w-full sm:w-auto text-center bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 sm:py-3.5 text-sm font-bold tracking-wide transition-colors uppercase">
                {l.btnWork}
              </a>
            </div>
          </div>
        </div>

        {/* Info Bar at Bottom of Hero */}
        <div className="relative z-20 bg-[#232323]/95 border-t border-[#f2a61c]/30 py-5">
          <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 text-white text-sm font-bold tracking-wide">
              <HardHat className="h-5 w-5 text-[#f2a61c]" />
              {l.barLicensed}
            </div>
            <div className="flex items-center gap-3 text-white text-sm font-bold tracking-wide">
              <Trophy className="h-5 w-5 text-[#f2a61c]" />
              {l.barExp}
            </div>
            <div className="flex items-center gap-3 text-white text-sm font-bold tracking-wide">
              <ShieldCheck className="h-5 w-5 text-[#f2a61c]" />
              {l.barIso}
            </div>
          </div>
        </div>
      </section>

      {/* About Us (New Humanized Section) */}
      <section id="about" className="py-24 bg-[#f9f9f9]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#f2a61c] rounded-tl-3xl z-0"></div>
            <img 
              src={aboutTeam} 
              alt="Our Team" 
              className="relative z-10 w-full h-[500px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-8 -right-8 bg-[#1c1c1c] p-6 text-white z-20 shadow-xl max-w-xs hidden sm:block">
              <Quote className="h-8 w-8 text-[#f2a61c] mb-3" />
              <p className="text-sm font-medium leading-relaxed italic">"{l.aboutQuote}"</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1c1c1c] mb-6">{l.aboutTitle}</h2>
            <div className="h-1 w-12 bg-[#f2a61c] mb-8"></div>
            <p className="text-neutral-600 mb-6 leading-relaxed text-lg">
              {l.aboutText1}
            </p>
            <p className="text-neutral-600 mb-10 leading-relaxed text-lg">
              {l.aboutText2}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-neutral-200">
              <div>
                <div className="text-4xl sm:text-3xl font-extrabold text-[#1c1c1c] mb-1">{l.stat1}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold tracking-wide">{l.stat1Label}</div>
              </div>
              <div>
                <div className="text-4xl sm:text-3xl font-extrabold text-[#1c1c1c] mb-1">{l.stat2}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold tracking-wide">{l.stat2Label}</div>
              </div>
              <div>
                <div className="text-4xl sm:text-3xl font-extrabold text-[#1c1c1c] mb-1">{l.stat3}</div>
                <div className="text-xs text-neutral-500 uppercase font-bold tracking-wide">{l.stat3Label}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="services" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1c1c1c] mb-4">{l.coreTitle}</h2>
            <div className="h-1 w-12 bg-[#f2a61c] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: l.card1Title, desc: l.card1Desc },
              { icon: Home, title: l.card2Title, desc: l.card2Desc },
              { icon: Hammer, title: l.card3Title, desc: l.card3Desc },
              { icon: Ruler, title: l.card4Title, desc: l.card4Desc }
            ].map((card, i) => (
              <div key={i} className="border border-neutral-200 p-8 hover:shadow-xl hover:border-[#f2a61c]/50 transition-all bg-white flex flex-col h-full group">
                <div className="text-[#f2a61c] mb-6 group-hover:scale-110 transition-transform origin-left">
                  <card.icon className="h-8 w-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-[#1c1c1c] mb-3">{card.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-8 flex-grow">{card.desc}</p>
                <a href="#quote" className="flex items-center gap-2 text-[#1c1c1c] text-xs font-bold tracking-widest uppercase hover:text-[#f2a61c] transition-colors mt-auto w-fit">
                  {l.learnMore} <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 bg-[#1c1c1c] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-4">{l.projectsTitle}</h2>
              <div className="h-1 w-12 bg-[#f2a61c] rounded-full"></div>
            </div>
            <a href="#projects" className="flex items-center gap-2 text-[#f2a61c] text-xs font-bold tracking-widest uppercase hover:text-white transition-colors pb-1 w-fit">
              {l.viewAll} <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { 
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
                badge: l.proj1Badge, 
                title: l.proj1Title, 
                loc: l.proj1Loc, 
                note: l.proj1Note 
              },
              { 
                img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", 
                badge: l.proj2Badge, 
                title: l.proj2Title, 
                loc: l.proj2Loc, 
                note: l.proj2Note 
              },
              { 
                img: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?q=80&w=2070&auto=format&fit=crop", 
                badge: l.proj3Badge, 
                title: l.proj3Title, 
                loc: l.proj3Loc, 
                note: l.proj3Note 
              }
            ].map((proj, i) => (
              <div key={i} className="bg-[#2a2a2a] overflow-hidden group hover:shadow-2xl transition-shadow border border-neutral-800 hover:border-neutral-700">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-[#1c1c1c] text-[#f2a61c] px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    {proj.badge}
                  </div>
                  <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-6 font-medium uppercase tracking-wide">
                    <MapPin className="h-3 w-3" /> {proj.loc}
                  </div>
                  <div className="flex items-start gap-2 text-neutral-300 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-[#f2a61c] shrink-0" />
                    <span>{proj.note}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (New Section) */}
      <section className="py-24 bg-[#f2a61c]">
        <div className="mx-auto max-w-7xl px-6 text-[#1c1c1c]">
          <h2 className="text-3xl font-extrabold tracking-tight mb-12 text-center">{l.testiTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur p-8 shadow-lg">
              <Quote className="h-10 w-10 text-[#f2a61c] mb-4 opacity-50" />
              <p className="text-lg font-medium leading-relaxed mb-6">"{l.testi1}"</p>
              <p className="font-bold uppercase tracking-wide text-sm">{l.testi1Author}</p>
            </div>
            <div className="bg-white/90 backdrop-blur p-8 shadow-lg">
              <Quote className="h-10 w-10 text-[#f2a61c] mb-4 opacity-50" />
              <p className="text-lg font-medium leading-relaxed mb-6">"{l.testi2}"</p>
              <p className="font-bold uppercase tracking-wide text-sm">{l.testi2Author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form (New Section) */}
      <section id="quote" className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1c1c1c] mb-4">{l.contactTitle}</h2>
            <div className="h-1 w-12 bg-[#f2a61c] mx-auto rounded-full mb-6"></div>
            <p className="text-neutral-600 text-lg">{l.contactDesc}</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#1c1c1c] mb-2">{l.formName}</label>
                <input type="text" className="w-full bg-[#f9f9f9] border border-neutral-200 px-4 py-3 focus:outline-none focus:border-[#f2a61c] transition-colors" placeholder={l.formNamePlaceholder} />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1c1c1c] mb-2">{l.formPhone}</label>
                <input type="tel" className="w-full bg-[#f9f9f9] border border-neutral-200 px-4 py-3 focus:outline-none focus:border-[#f2a61c] transition-colors" placeholder={l.formPhonePlaceholder} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1c1c1c] mb-2">{l.formService}</label>
              <select className="w-full bg-[#f9f9f9] border border-neutral-200 px-4 py-3 focus:outline-none focus:border-[#f2a61c] transition-colors appearance-none">
                <option>{l.formService1}</option>
                <option>{l.formService2}</option>
                <option>{l.formService3}</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-[#1c1c1c] hover:bg-[#2a2a2a] text-white font-bold tracking-widest uppercase py-4 mt-4 transition-colors">
              {l.formSubmit}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] py-12">
        <div className="mx-auto max-w-7xl px-6 text-sm text-neutral-400">
          <div className="font-extrabold text-white mb-8 text-lg">PREMIER CONSTRUCT</div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <p>{l.footerCopy}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Safety Standards</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Portfolio Demo Notice */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="/" className="rounded-full bg-black border border-neutral-700 text-white shadow-2xl px-4 py-2 flex items-center gap-2 hover:bg-neutral-800 transition-colors">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span className="text-xs font-semibold">Back to Portfolio</span>
        </a>
      </div>
    </div>
  );
}
