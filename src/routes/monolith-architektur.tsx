import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Play, Check } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/monolith-architektur")({
  meta: () => [
    { title: "Monolith Architecture | Alex Voloshyn" }
  ],
  component: MonolithLanding,
});

function MonolithLanding() {
  const [formState, setFormState] = useState(0); // 0 = idle, 1 = loading, 2 = success
  const [selectedType, setSelectedType] = useState('private');

  // Basic smooth scroll for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(1);
    setTimeout(() => setFormState(2), 1200);
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full font-sans selection:bg-[#782415] selection:text-white" style={{ backgroundColor: "#F7F6F2", color: "#1C1916" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
        .text-brick { color: #8A2A2B; }
        .bg-brick { background-color: #8A2A2B; }
        .border-brick { border-color: #8A2A2B; }
        .border-sand { border-color: #DCD8C8; }
        .text-sand-dark { color: #8C8775; }
      `}</style>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-sand bg-[#F7F6F2]/90 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between text-[10px] font-bold tracking-[0.15em] uppercase text-sand-dark">
          <div className="flex gap-8">
            <Link to="/" className="hover:text-[#1C1916] transition-colors">← НАЗАД К ПОРТФОЛИО</Link>
          </div>
          <div className="hidden md:flex gap-10">
            <a href="#projects" className="hover:text-[#1C1916] transition-colors">ПРОЕКТЫ</a>
            <a href="#philosophy" className="hover:text-[#1C1916] transition-colors">ФИЛОСОФИЯ</a>
            <a href="#contact" className="hover:text-[#1C1916] transition-colors">КОНТАКТЫ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-sand-dark mb-4 uppercase">Architecture & Design</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tight uppercase">
              Monolith Architektur
            </h1>
          </div>
          <div className="text-xs font-medium text-sand-dark tracking-wide max-w-[200px] uppercase">
            Швейцарская традиция строительства с 1993
          </div>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex justify-end">
          <div className="w-full md:w-[85%] h-full relative">
            <img 
              src="/monolith/hero.jpg" 
              alt="Mountain house" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Box */}
            <div className="absolute bottom-0 left-0 md:-left-32 bg-[#F7F6F2] pt-8 pr-16 pb-0 w-[90%] md:w-[500px]">
              <h2 className="font-serif italic text-4xl md:text-6xl text-brick leading-[1.1] mb-6 tracking-tight">
                Тектоника<br/>тишины<br/>и света.
              </h2>
              <p className="text-[10px] tracking-[0.2em] text-sand-dark uppercase font-bold mb-4">
                EST. В ЦЮРИХЕ, 1993, CH-8001
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pb-16 border-b border-sand">
          <div className="col-span-1">
            <p className="text-lg font-medium leading-relaxed font-serif">
              Архитектурное бюро швейцарской традиции. Мы строим из камня, дерева, света и абсолютного покоя.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2">
            <p className="text-sm text-sand-dark leading-relaxed max-w-xl">
              Истинная архитектура не кричит. Она существует вне времени, подчиняясь лишь ландшафту и законам физики. Каждый наш объект — это манифест чистоты форм и бескомпромиссного качества.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 max-w-[1400px] mx-auto py-16">
        <div className="flex items-center justify-between mb-16 uppercase text-[10px] font-bold tracking-[0.2em] text-sand-dark border-b border-sand pb-4">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-brick"></div> РЕАЛИЗОВАННЫЕ ПРОЕКТЫ</span>
          <span>ВЫБРАННЫЕ РАБОТЫ (2018—2025)</span>
        </div>

        {/* Project 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-6xl font-serif text-sand-dark/30 block mb-4">01</span>
              <p className="text-[10px] font-bold tracking-[0.2em] text-brick uppercase mb-2">Жилая резиденция</p>
              <h3 className="font-serif text-4xl mb-12 uppercase tracking-wide">Вилла Valser<br/>Stein</h3>
            </div>
            
            <div className="text-[10px] uppercase tracking-wider font-semibold border-t border-sand pt-6 mb-8">
              <div className="flex justify-between border-b border-sand pb-3 mb-3">
                <span className="text-sand-dark">Локация</span>
                <span>Вальс, Швейцария</span>
              </div>
              <div className="flex justify-between border-b border-sand pb-3 mb-3">
                <span className="text-sand-dark">Площадь</span>
                <span>1 200 М²</span>
              </div>
              <div className="flex justify-between border-b border-sand pb-3 mb-3">
                <span className="text-sand-dark">Материал</span>
                <span>Кварцит, дикий камень</span>
              </div>
              <div className="flex justify-between pb-3">
                <span className="text-sand-dark">Год</span>
                <span>2024</span>
              </div>
            </div>
            
            <button className="bg-brick text-[#F7F6F2] hover:bg-[#6c2016] transition-colors py-4 px-6 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-4 w-full md:w-auto cursor-pointer group">
              ИЗУЧИТЬ ПРОЕКТ
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="lg:col-span-8">
            <div className="relative group overflow-hidden">
              <img src="/monolith/project1.jpg" alt="Villa Valser Stein" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-6 left-6 bg-[#F7F6F2]/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-sand-dark">
                СМОТРЕТЬ ГАЛЕРЕЮ (14 ФОТО)
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed max-w-3xl font-serif italic text-sand-dark">
              Скрытый в сосновом массиве объем, облицованный распиленным вручную местным камнем и микроцементом. Жилые уровни раскрываются к ущелью, формируя бескомпромиссный визуальный фасад.
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 border-t border-sand pt-16">
          <div className="lg:col-span-4 lg:order-2 flex flex-col justify-center">
            <div>
              <span className="text-6xl font-serif text-sand-dark/30 block mb-4">02</span>
              <p className="text-[10px] font-bold tracking-[0.2em] text-brick uppercase mb-2">Культурный объект</p>
              <h3 className="font-serif text-4xl mb-6 uppercase tracking-wide">Павильон Kozo</h3>
            </div>
            
            <p className="text-sm leading-relaxed mb-10 font-serif text-sand-dark">
              Синтез швейцарской геометрической строгости, точной утрамбовки глины и мягкого естественного луча.
            </p>

            <div className="text-[10px] uppercase tracking-wider font-bold border-t border-sand pt-4 mt-auto">
              <a href="#" className="flex items-center justify-between text-sand-dark hover:text-[#1C1916] transition-colors py-2 border-b border-sand mb-2">
                <span>МОРЖ, VD</span> <span>ЛЮК О. ФИШЕР *</span>
              </a>
              <a href="#" className="flex items-center justify-between text-sand-dark hover:text-[#1C1916] transition-colors py-2 border-b border-sand mb-6">
                <span>САН-РОМАН (RE-DESIGN)</span> <span>КИРПИЧНЫЙ ЗАВОД</span>
              </a>
              <a href="#" className="inline-flex items-center gap-2 text-brick hover:text-[#1C1916] transition-colors border-b border-brick pb-1">
                Читать архитектурный манифест <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-8 lg:order-1">
            <div className="relative group overflow-hidden">
              <img src="/monolith/project2.jpg" alt="Pavilion Kozo" className="w-full aspect-[3/4] md:aspect-auto md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-6 right-6 bg-[#F7F6F2]/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 cursor-pointer hover:bg-white transition-colors text-sand-dark">
                <Play className="w-3 h-3" fill="currentColor" />
                СМОТРЕТЬ ВИДЕОЭССЕ СТРОИТЕЛЬСТВА
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="border-t border-sand bg-[#EBE9E1] py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 uppercase text-[10px] font-bold tracking-[0.2em] text-brick mb-12">
            <div className="w-2 h-2 bg-brick"></div>
            <span>ФИЛОСОФИЯ БЮРО</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-16 tracking-tight">
            «Архитектура — это не заполнение пространства объектами, а дисциплина вычитания лишнего. Мы проектируем тишину, в которой свет и монолитный бетон обретают постоянство».
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-[#1C1916] leading-relaxed border-t border-sand pt-12">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-brick mb-4">МАТЕРИАЛЬНОСТЬ, СТАРЕНИЕ И КОНТЕКСТ</p>
            </div>
            <div>
              <p>В эпоху визуальной перенасыщенности мы избираем путь радикальной редукции. Форма не должна развлекать — она обязана резонировать с человеком и вечностью ландшафта.</p>
            </div>
            <div>
              <p>Мы не применяем облицовочные суррогаты или декоративные имитации. Если стена несет нагрузку — она обнажена. Бетон льется монолитом, сталь покрывается патиной естественным путем, а древесина стареет благородно.</p>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-sand flex justify-between items-center">
            <div>
              <p className="text-[10px] text-sand-dark uppercase tracking-widest font-bold">ОСНОВАТЕЛЬ И ГЛАВНЫЙ АРХИТЕКТОР</p>
              <p className="text-xl font-serif uppercase tracking-widest mt-1">МАРКУС ФОН ШТЕЙН</p>
              <p className="text-[10px] text-sand-dark uppercase tracking-widest mt-1">ETH, SIA</p>
            </div>
            <div className="opacity-60 text-brick">
              {/* Signature imitation */}
              <svg width="160" height="50" viewBox="0 0 160 50" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10,40 Q30,10 50,30 T90,20 T110,40 T130,25 T150,35" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 max-w-[900px] mx-auto">
        <div className="bg-white p-8 md:p-12 border border-sand shadow-2xl shadow-black/5">
          <div className="flex justify-between items-start border-b border-sand pb-6 mb-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-sand-dark uppercase mb-2">ФОРМА ИНИЦИАЦИИ ПРОЕКТА</p>
              <h2 className="font-serif text-2xl uppercase">Monolith Architektur</h2>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-sand-dark">
              <span className="flex items-center gap-2"><div className="w-2 h-2 bg-brick"></div> ЦЮРИХ</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className="text-[10px] text-sand-dark font-bold uppercase tracking-widest mb-4">Выберите масштаб и типологию предполагаемого объекта:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`border p-5 cursor-pointer relative transition-colors group ${selectedType === 'private' ? 'border-brick bg-[#F9F8F6]' : 'border-sand hover:border-brick/50'}`} onClick={() => setSelectedType('private')}>
                  <input type="radio" name="type" className="sr-only" checked={selectedType === 'private'} readOnly />
                  <div className={`absolute top-5 right-5 w-2 h-2 ${selectedType === 'private' ? 'bg-brick' : 'border border-sand group-hover:border-brick/50'}`}></div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">ЧАСТНАЯ РЕЗИДЕНЦИЯ</h4>
                  <p className="text-[10px] text-sand-dark uppercase leading-relaxed">Обособленные виллы, горные шале, площади от 300 М²</p>
                </label>
                
                <label className={`border p-5 cursor-pointer relative transition-colors group ${selectedType === 'cultural' ? 'border-brick bg-[#F9F8F6]' : 'border-sand hover:border-brick/50'}`} onClick={() => setSelectedType('cultural')}>
                  <input type="radio" name="type" className="sr-only" checked={selectedType === 'cultural'} readOnly />
                  <div className={`absolute top-5 right-5 w-2 h-2 ${selectedType === 'cultural' ? 'bg-brick' : 'border border-sand group-hover:border-brick/50'}`}></div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">КУЛЬТУРНЫЙ ОБЪЕКТ</h4>
                  <p className="text-[10px] text-sand-dark uppercase leading-relaxed">Музеи, галереи, павильоны, арт-фонды, мемориалы</p>
                </label>
                
                <label className={`border p-5 cursor-pointer relative transition-colors group ${selectedType === 'public' ? 'border-brick bg-[#F9F8F6]' : 'border-sand hover:border-brick/50'}`} onClick={() => setSelectedType('public')}>
                  <input type="radio" name="type" className="sr-only" checked={selectedType === 'public'} readOnly />
                  <div className={`absolute top-5 right-5 w-2 h-2 ${selectedType === 'public' ? 'bg-brick' : 'border border-sand group-hover:border-brick/50'}`}></div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">ПУБЛИЧНОЕ ЗДАНИЕ</h4>
                  <p className="text-[10px] text-sand-dark uppercase leading-relaxed">Штаб-квартиры, отели, рестораны, общественные пространства</p>
                </label>
                
                <label className={`border p-5 cursor-pointer relative transition-colors group ${selectedType === 'interior' ? 'border-brick bg-[#F9F8F6]' : 'border-sand hover:border-brick/50'}`} onClick={() => setSelectedType('interior')}>
                  <input type="radio" name="type" className="sr-only" checked={selectedType === 'interior'} readOnly />
                  <div className={`absolute top-5 right-5 w-2 h-2 ${selectedType === 'interior' ? 'bg-brick' : 'border border-sand group-hover:border-brick/50'}`}></div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-2">ТОТАЛЬНЫЙ ИНТЕРЬЕР</h4>
                  <p className="text-[10px] text-sand-dark uppercase leading-relaxed">Проектирование чистых пространств в готовом объеме</p>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-sand flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-sand-dark font-bold">
                ВСЕ ДАННЫЕ СТРОГО КОНФИДЕНЦИАЛЬНЫ
              </p>
              
              <button 
                type="submit" 
                disabled={formState !== 0}
                className="bg-brick text-[#F7F6F2] hover:bg-[#6c2016] transition-all py-3 px-8 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-3 w-full md:w-auto disabled:opacity-80"
              >
                {formState === 0 ? "ДАЛЕЕ: КОНТАКТЫ И ЛОКАЦИЯ [→]" : formState === 1 ? "ОБРАБОТКА..." : <><Check className="w-3 h-3"/> УСПЕШНО [✓]</>}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sand bg-[#EBE9E1] pt-16 pb-8 px-6 text-[10px] uppercase tracking-widest font-bold">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl tracking-normal mb-4 text-brick">MONOLITH</h3>
            <p className="text-[10px] text-sand-dark leading-loose">
              STUDIO FÜR BAUKUNST UND GESTALTUNG<br/>
              STIFTUNG, INGENIEURWESEN, ARCHITEKTUR<br/>
              ZÜRICH, SCHWEIZ
            </p>
            <p className="mt-4 text-sand-dark">EST. 1993, CHE-100.000.001</p>
          </div>
          <div>
            <p className="text-sand-dark mb-4 border-b border-sand pb-2">HEADQUARTERS</p>
            <p className="leading-loose">
              MONOLITH ARCHITEKTUR AG<br/>
              Seefeldstrasse 69, 8008 Zürich<br/>
              CH - Switzerland
            </p>
            <p className="mt-4">TEL +41 44 000 00 00</p>
          </div>
          <div>
            <p className="text-sand-dark mb-4 border-b border-sand pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-brick rounded-full"></span> ПРИЕМ НОВЫХ ПРОЕКТОВ ОТКРЫТ
            </p>
            <p className="leading-loose mb-4 text-[10px] text-sand-dark">
              Мы отбираем ограниченное количество проектов в год, чтобы гарантировать максимальное погружение.
            </p>
            <a href="mailto:office@monolith.ch" className="text-brick hover:text-[#1C1916] transition-colors flex items-center justify-between border-b border-brick pb-1">
              <span>E-MAIL ЗАПРОС</span> <span>office@monolith.ch</span>
            </a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto border-t border-sand pt-6 flex flex-col md:flex-row justify-between text-[10px] text-sand-dark">
          <p>© 2026 MONOLITH ARCHITEKTUR AG. ALL RIGHTS RESERVED.</p>
          <p>IMPRINT & PRIVACY POLICY</p>
        </div>
      </footer>
    </div>
  );
}
