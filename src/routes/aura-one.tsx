import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/aura-one")({
  meta: () => [
    { title: "Aura One Acoustics | Alex Voloshyn" }
  ],
  component: AuraOneLanding,
});

function AuraOneLanding() {
  const pedestalRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPush, setShowPush] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState("Titanium Grey");
  const [isBooked, setIsBooked] = useState(false);

  // Tilt effect
  useEffect(() => {
    const pedestal = pedestalRef.current;
    if (!pedestal) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = pedestal.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      pedestal.style.transform = `perspective(1000px) rotateX(${-y / 18}deg) rotateY(${x / 18}deg)`;
    };
    const handleMouseLeave = () => {
      pedestal.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    pedestal.addEventListener('mousemove', handleMouseMove);
    pedestal.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      pedestal.removeEventListener('mousemove', handleMouseMove);
      pedestal.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Intersection Observer for steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(step);
          }
        });
      },
      { threshold: 0.6 }
    );

    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Push notification timer
  useEffect(() => {
    const t1 = setTimeout(() => setShowPush(true), 2200);
    const t2 = setTimeout(() => setShowPush(false), 8500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => setIsBooked(false), 4000);
  };

  return (
    <div className="bg-[#f9f9fb] font-sans text-[#1a1c1d] antialiased selection:bg-[#ddddf9] selection:text-[#5f6178] min-h-screen overflow-x-hidden w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-4">
          <div className="h-20 pointer-events-auto bg-white/70 backdrop-blur-2xl rounded-full shadow-lg px-6 flex items-center justify-between transition-all">
            <div className="flex items-center gap-4">
              <img alt="AURA ONE Brand Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1WtnjW08xsDFkZKfbVyqBa7a2VU2bcePSgKlRgn1D6E5f_gd3_xdUu_QTnKxMvgftsLSqiyc8oe2uAmJ8NgymP8lPa2qsgWH0v3EmFxmBIHFkuJ92y5kfMKCTanryLiJSXBR6h7UgI1pCVy6Y06uLY0PtvbDKqRhteT2YAbs8ECy8xux-cRFlycEnsVbGRH1Ae4Inp9CfbF9A_k5XriaBJD2Tw9JWzioqeoEdElwwclqHtulGhxlIp4XH-I" />
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider font-semibold">AURA ONE</span>
                <span className="font-mono text-[#47464a] text-[10px] leading-tight">MOD.01 // REV.4</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-6">
              <a href="#" className="font-medium">Обзор</a>
              <a href="#tehnologii" className="text-[13px] text-[#47464a] hover:text-black transition-colors">Технологии</a>
              <a href="#materialy" className="text-[13px] text-[#47464a] hover:text-black transition-colors">Материалы</a>
              <a href="#sravnenie" className="text-[13px] text-[#47464a] hover:text-black transition-colors">Сравнение</a>
              <a href="#otzyvy" className="text-[13px] text-[#47464a] hover:text-black transition-colors">Отзывы</a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="#preorder" className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full bg-black text-white text-[13px] hover:bg-[#1b1b1d] transition-all active:scale-[0.98]">
                Оформить предзаказ
              </a>
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20">
        <div className="flex flex-col w-full relative">
          {/* Ambient Lights */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-white/90 via-[#e2e2e4]/40 to-transparent blur-3xl opacity-80 -z-10"></div>
          
          {/* Hero Section */}
          <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 pt-6 lg:pt-10 pb-24 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 backdrop-blur-md shadow-sm mb-6 transition-transform hover:scale-[1.02]">
              <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
              <span className="text-[11px] uppercase tracking-widest font-semibold">Флагман тактильной акустики · Лимитированная серия</span>
            </div>
            
            <h1 className="text-[40px] md:text-[72px] font-semibold tracking-tight max-w-4xl leading-tight">
              Чистая материя звука.
            </h1>
            
            <p className="mt-4 text-[18px] text-[#47464a] max-w-2xl leading-relaxed">
              Бесшовный корпус из титанового сплава Grade 5, оптический диск тактильной калибровки и бериллиевый акустический излучатель.
            </p>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <div className="px-4 py-1 rounded-full bg-white/70 backdrop-blur-xl shadow-sm flex items-center gap-1">
                <span className="font-mono text-[12px] font-semibold">360° АКУСТИЧЕСКОЕ ПОЛЕ</span>
              </div>
              <div className="px-4 py-1 rounded-full bg-white/70 backdrop-blur-xl shadow-sm flex items-center gap-1">
                <span className="font-mono text-[12px] font-semibold">ТИТАНОВЫЙ СПЛАВ GRADE 5</span>
              </div>
              <div className="px-4 py-1 rounded-full bg-white/70 backdrop-blur-xl shadow-sm flex items-center gap-1">
                <span className="font-mono text-[12px] font-semibold">0.01° ТОЧНОСТЬ ЭНКОДЕРА</span>
              </div>
            </div>

            {/* Pedestal */}
            <div className="relative w-full max-w-3xl mt-10 flex justify-center items-center group">
              <div className="absolute bottom-6 w-3/4 h-24 bg-gradient-to-t from-[#d9dadc]/40 to-transparent rounded-full blur-2xl -z-10"></div>
              
              <div ref={pedestalRef} className="relative w-full max-w-md aspect-square rounded-[36px] bg-white/50 backdrop-blur-2xl p-6 shadow-2xl transition-all duration-700 hover:shadow-3xl cursor-grab active:cursor-grabbing flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 p-8" fill="none" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="180" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1"></circle>
                  <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="0.75"></circle>
                  <line stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.5" x1="200" x2="200" y1="10" y2="390"></line>
                  <line stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.5" x1="10" x2="390" y1="200" y2="200"></line>
                </svg>
                
                <img alt="AURA ONE" className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANfaIVvfQnuflZrObivYjhOMDewNQlkpfIn0MULOK9MvRFSlQFVsltpp5A1ITG1J0hp2j4rW2vdHzG5qDI0RgIjSiYCXTDUmR-tARSFBXbuH0xqlRL4ZgNmCpG-iku1zJnwheDNrB_6Vmo3DfUuboJXv9dBkQkeovTRbpkqfQarXsLHHaJbkXoHo1r1mrGOeylSDeCu1qG8SFMur6NPKHUwqmHelji9wt1Hva8Q8UgwLgTwgghfL8SKg" />
                
                <div className="absolute bottom-6 right-6 z-20 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
                  <span className="font-mono text-[12px] tracking-tighter">HAPTIC: ARMED</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <a href="#preorder" className="px-10 py-4 rounded-full bg-black text-white text-[15px] font-medium shadow-xl hover:bg-[#1b1b1d] transition-all active:scale-95 flex items-center gap-2">
                <span>Предзаказ — 39 000 ₴</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 rounded-full bg-white/80 backdrop-blur-xl text-[13px] hover:bg-[#e8e8ea] transition-all active:scale-95 flex items-center gap-1 shadow-sm">
                <span>Интерактивный 3D-осмотр</span>
              </button>
            </div>
          </section>

          {/* Technology Dissection Section */}
          <section id="tehnologii" className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-24">
            <div className="mb-10">
              <span className="text-[11px] uppercase text-[#47464a] font-semibold tracking-widest">ДЕКОНСТРУКЦИЯ И ТОЧНОСТЬ</span>
              <h2 className="text-[32px] md:text-[48px] font-semibold tracking-tight mt-1">Анатомия идеального давления.</h2>
            </div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sticky Viewer */}
              <div className="lg:col-span-6 lg:sticky lg:top-28 w-full aspect-square rounded-[32px] bg-white/60 backdrop-blur-2xl p-8 shadow-xl flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img alt="Chassis" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 scale-95 ${activeStep === 1 ? 'opacity-100' : 'opacity-0'}`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuANfaIVvfQnuflZrObivYjhOMDewNQlkpfIn0MULOK9MvRFSlQFVsltpp5A1ITG1J0hp2j4rW2vdHzG5qDI0RgIjSiYCXTDUmR-tARSFBXbuH0xqlRL4ZgNmCpG-iku1zJnwheDNrB_6Vmo3DfUuboJXv9dBkQkeovTRbpkqfQarXsLHHaJbkXoHo1r1mrGOeylSDeCu1qG8SFMur6NPKHUwqmHelji9wt1Hva8Q8UgwLgTwgghfL8SKg" />
                  <img alt="Exploded" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 scale-95 ${activeStep > 1 ? 'opacity-100' : 'opacity-0'}`} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhluS-BBxPqSzFCtrJGnVtT8i6LYz0madkAGHsTtaI-ufzkMRTlwTFIyACB7Ugg0PYUn8_7MIMGkask3JmZkCTk7KUgflLmMei-RTGZMNeyTFCNtbM0aHAWD8tOSEkqJmmerGmXLcr8HK9g0Ri1omjW8YGz4xH7TI1USpDH4yuks-Kz59WY1rCQOF7UEQKHkIqK6am7MrqumVqLhZ2vIiT0EtjUxBH4ObARPUxvl_SsvvSLcnqS9A7hg" />
                  
                  <div className={`absolute top-1/4 right-8 px-2 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center gap-1 transition-all duration-500 ${activeStep > 1 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span className="font-mono text-[12px] font-medium">Бериллиевый купол</span>
                  </div>
                  
                  <div className={`absolute bottom-1/3 left-6 px-2 py-1 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center gap-1 transition-all duration-500 ${activeStep === 3 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span className="font-mono text-[12px] font-medium">Массив N52</span>
                  </div>
                  
                  <div className="absolute bottom-4 inset-x-4 px-4 py-1 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-between text-[#47464a] font-mono text-[12px]">
                    <span>МОДУЛЬ: 0{activeStep} // {activeStep === 1 ? 'ЭНКОДЕР' : activeStep === 2 ? 'ШАССИ' : 'DSP'}</span>
                    <span>TOLERANCE: &lt; 0.005mm</span>
                  </div>
                </div>
              </div>
              
              {/* Scroll Content */}
              <div className="lg:col-span-6 space-y-24 py-10">
                {[
                  { title: "Аналоговый тактильный диск", desc: "Верхняя грань выполнена из полированного сапфирового стекла. Оптический энкодер считывает 120 прецизионных положений за один оборот.", mat: "Sapphire Crystal", res: "0.4ms Piezo-snap" },
                  { title: "Акустическая камера из цельного титана", desc: "Монолитная цилиндрическая капсула фрезеруется на 5-осевом ЧПУ из болванки титана Ti-6Al-4V. Полное отсутствие внутренних резонансов.", mat: "Unibody Titanium", res: "-48 dB Dampening" },
                  { title: "Акустическое сканирование пространства", desc: "Встроенный массив из 6 калибровочных микрофонов с DSP-сопроцессором за 3 секунды сканирует отражения от стен.", mat: "3.0 сек Real-time", res: "Dual 64-bit DSP" }
                ].map((item, idx) => (
                  <div key={idx} data-step={idx + 1} className="step-card group p-10 rounded-[28px] bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-500 hover:shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[12px] text-[#47464a]">ЭТАП // 0{idx + 1}</span>
                    </div>
                    <h3 className="text-[24px] font-semibold mb-2">{item.title}</h3>
                    <p className="text-[15px] text-[#47464a] leading-relaxed mb-4">{item.desc}</p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="p-2 rounded-xl bg-[#f3f3f5]">
                        <span className="text-[11px] uppercase text-[#47464a] font-semibold">ХАРАКТЕРИСТИКА</span>
                        <p className="font-mono text-[12px] font-semibold mt-1">{item.mat}</p>
                      </div>
                      <div className="p-2 rounded-xl bg-[#f3f3f5]">
                        <span className="text-[11px] uppercase text-[#47464a] font-semibold">ПОКАЗАТЕЛЬ</span>
                        <p className="font-mono text-[12px] font-semibold mt-1">{item.res}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          
          {/* Materials Section */}
          <section id="materialy" className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-24">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[11px] font-semibold uppercase text-[#47464a] tracking-widest">СПЕЦИФИКАЦИЯ ЭЛЕМЕНТОВ</span>
              <h2 className="text-[32px] font-medium mt-2">Чистота субстанции.</h2>
              <p className="text-[13px] text-[#47464a] mt-2">
                Материалы отобраны по коэффициентам плотности, упругости и тактильной термопередачи.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 rounded-[28px] bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eeeef0] flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="14" width="18" height="8" rx="2"/><path d="M7 14v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"/><path d="M12 8V2"/></svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase text-[#47464a]">01 // КОРПУС</span>
                  <h4 className="text-[24px] font-medium mt-2">Анодированный титан</h4>
                  <p className="text-[13px] text-[#47464a] mt-4 leading-relaxed">
                    Химическое пассивирование поверхности для шелковистой микротекстуры. Высочайшая жесткость при минимальной массе.
                  </p>
                </div>
                <div className="mt-8 bg-[#f3f3f5] p-3 rounded-xl font-mono text-[12px] flex justify-between">
                  <span className="text-[#47464a]">ТВЕРДОСТЬ:</span>
                  <span className="font-semibold">36 HRC Grade 5</span>
                </div>
              </div>
              <div className="p-10 rounded-[28px] bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eeeef0] flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase text-[#47464a]">02 // ЭНКОДЕР</span>
                  <h4 className="text-[24px] font-medium mt-2">Оптическое стекло</h4>
                  <p className="text-[13px] text-[#47464a] mt-4 leading-relaxed">
                    Полировка с алмазным абразивом и олеофобное нано-покрытие. Скольжение пальца без микротрения.
                  </p>
                </div>
                <div className="mt-8 bg-[#f3f3f5] p-3 rounded-xl font-mono text-[12px] flex justify-between">
                  <span className="text-[#47464a]">ПРОПУСКАНИЕ:</span>
                  <span className="font-semibold">99.4% Optical Glass</span>
                </div>
              </div>
              <div className="p-10 rounded-[28px] bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#eeeef0] flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                  </div>
                  <span className="text-[11px] font-semibold uppercase text-[#47464a]">03 // ИЗЛУЧАТЕЛЬ</span>
                  <h4 className="text-[24px] font-medium mt-2">Бериллиевая мембрана</h4>
                  <p className="text-[13px] text-[#47464a] mt-4 leading-relaxed">
                    Сверхлегкая фольга CVD-осаждения с частотой первого изгибного резонанса далеко за пределами слуха человека.
                  </p>
                </div>
                <div className="mt-8 bg-[#f3f3f5] p-3 rounded-xl font-mono text-[12px] flex justify-between">
                  <span className="text-[#47464a]">СКОРОСТЬ ЗВУКА:</span>
                  <span className="font-semibold">12 890 м/с</span>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          <section id="sravnenie" className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-semibold uppercase text-[#47464a] tracking-widest">СРАВНИТЕЛЬНЫЙ АНАЛИЗ</span>
              <h2 className="text-[32px] md:text-[48px] font-semibold tracking-tight mt-2">Бескомпромиссная инженерия.</h2>
              <p className="text-[15px] text-[#47464a] mt-4">
                Сопоставление архитектуры AURA ONE со стандартными премиальными колонками и референсными мониторами студий.
              </p>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[720px] rounded-[32px] bg-white/60 backdrop-blur-2xl shadow-xl p-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-4 px-4 text-[11px] font-semibold uppercase text-[#47464a] w-1/3">Параметр</th>
                      <th className="py-4 px-4 bg-[#e8e8ea]/60 rounded-t-2xl text-[11px] font-semibold uppercase w-1/3 text-center">
                        <div className="inline-flex items-center gap-2">
                          <span className="text-[24px] font-semibold">AURA ONE</span>
                          <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[10px]">ВЫБОР ИНЖЕНЕРОВ</span>
                        </div>
                      </th>
                      <th className="py-4 px-4 text-[11px] font-semibold uppercase text-[#47464a] w-1/6 text-center">Обычные колонки</th>
                      <th className="py-4 px-4 text-[11px] font-semibold uppercase text-[#47464a] w-1/6 text-center">Студийные мониторы</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    <tr className="hover:bg-[#f3f3f5]/40 transition-colors">
                      <td className="py-4 px-4 font-medium">Материал корпуса</td>
                      <td className="py-4 px-4 bg-[#e8e8ea]/60 text-center font-semibold">Монолитный титан Grade 5</td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Пластик / MDF шпон</td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Фанера / Алюминий</td>
                    </tr>
                    <tr className="hover:bg-[#f3f3f5]/40 transition-colors">
                      <td className="py-4 px-4 font-medium">Привод регулировки</td>
                      <td className="py-4 px-4 bg-[#e8e8ea]/60 text-center font-semibold">Оптический энкодер + Haptic</td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Кнопки / Потенциометр</td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Аналоговый регулятор</td>
                    </tr>
                    <tr className="hover:bg-[#f3f3f5]/40 transition-colors">
                      <td className="py-4 px-4 font-medium">Диапазон частот</td>
                      <td className="py-4 px-4 bg-[#e8e8ea]/60 text-center font-semibold font-mono">18 Гц — 45 000 Гц (±1.5 dB)</td>
                      <td className="py-4 px-4 text-center text-[#47464a] font-mono">45 Гц — 20 000 Гц</td>
                      <td className="py-4 px-4 text-center text-[#47464a] font-mono">35 Гц — 25 000 Гц</td>
                    </tr>
                    <tr className="hover:bg-[#f3f3f5]/40 transition-colors">
                      <td className="py-4 px-4 font-medium">Задержка аудио (AirPlay / DSP)</td>
                      <td className="py-4 px-4 bg-[#e8e8ea]/60 text-center font-semibold font-mono">0.8 мс (Ultra-Low)</td>
                      <td className="py-4 px-4 text-center text-[#47464a] font-mono">40 – 120 мс</td>
                      <td className="py-4 px-4 text-center text-[#47464a] font-mono">Кабель (0 мс)</td>
                    </tr>
                    <tr className="hover:bg-[#f3f3f5]/40 transition-colors">
                      <td className="py-4 px-4 font-medium">Тактильный клик (Haptic Ultra)</td>
                      <td className="py-4 px-4 bg-[#e8e8ea]/60 rounded-b-2xl text-center font-semibold flex items-center justify-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Да (120 градаций)
                      </td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Отсутствует</td>
                      <td className="py-4 px-4 text-center text-[#47464a]">Отсутствует</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="otzyvy" className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16">
              <div>
                <span className="text-[11px] font-semibold uppercase text-[#47464a] tracking-widest">ДЕЛИВЕРИ-ОТЗЫВЫ</span>
                <h2 className="text-[32px] font-semibold tracking-tight mt-2">Первые впечатления владельцев.</h2>
              </div>
              <div className="mt-4 sm:mt-0 font-mono text-[12px] text-[#47464a]">
                СЕРТИФИЦИРОВАННЫЙ РЕЙТИНГ: 5.0 / 5.0
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Михаил С. // Архитектор", time: "2 мин назад", text: "«Аналоговый диск — это медитация. Поворот колеса отзывается физическим щелчком прямо в ладонь. Звук кристально чистый, никакой мути на низах.»" },
                { name: "Елена В. // Sound Designer", time: "Вчера 19:42", text: "«Калибровка комнаты работает феноменально. Поставил в угол гостиной с бетонными стенами — ни одного гудящего пика на 60 Гц. Шедевр.»" },
                { name: "Константин Б. // Пром. дизайнер", time: "3 дня назад", text: "«Качество сборки на уровне швейцарских хронометров. Холодный металл, идеальный зазор со стеклом. Это будущее персонального звука.»" }
              ].map((review, idx) => (
                <div key={idx} className="p-8 rounded-[26px] bg-white/80 backdrop-blur-2xl shadow-lg hover:-translate-y-1 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#e8e8ea] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      </div>
                      <span className="text-[11px] font-semibold uppercase">AURA DISPATCH</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#47464a]">{review.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-black mb-4">
                    {[1,2,3,4,5].map(i => <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                  </div>
                  <p className="text-[15px] leading-snug">{review.text}</p>
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[#47464a]">
                    <span className="font-mono text-[12px] font-semibold text-black">{review.name}</span>
                    <span className="text-[10px] uppercase font-semibold text-black">Верифицирован</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing / Booking Form */}
          <section id="preorder" className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-24">
            <div className="rounded-[36px] bg-white/80 backdrop-blur-2xl shadow-xl p-10 md:p-16 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-[#e8e8ea] font-mono text-[12px]">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                    <span>ПЕРВАЯ ПАРТИЯ: ОСТАЛОСЬ 42 ИЗ 500 ШТУК</span>
                  </div>
                  <h2 className="text-[48px] font-semibold tracking-tight leading-tight">Оформите предзаказ на AURA ONE.</h2>
                  <p className="text-[18px] text-[#47464a] max-w-xl">
                    Комплект поставки включает сертификат подлинности с лазерным серийным номером, кабель в оплетке из паракорда и 5 лет заводской гарантии.
                  </p>
                </div>
                
                <div className="lg:col-span-5 p-8 rounded-[28px] bg-[#f3f3f5]/70 backdrop-blur-xl shadow-inner space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[32px] font-semibold">39 000 ₴</span>
                    <span className="font-mono text-[#47464a] line-through">55 000 ₴</span>
                  </div>
                  
                  <form onSubmit={handlePreorder} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-[#47464a] block mb-1">ИМЯ И ФАМИЛИЯ</label>
                      <input required className="w-full px-4 py-2 rounded-xl bg-white text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-black" placeholder="Константин Романов" type="text"/>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-[#47464a] block mb-1">КОНТАКТНЫЙ ТЕЛЕФОН</label>
                      <input required className="w-full px-4 py-2 rounded-xl bg-white text-[13px] outline-none shadow-sm focus:ring-2 focus:ring-black" placeholder="+380 99 000-00-00" type="text"/>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold uppercase text-[#47464a] block mb-1">ОТДЕЛКА КОРПУСА</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setSelectedFinish('Titanium Grey')} className={`px-2 py-1 rounded-xl font-mono text-[12px] flex items-center justify-center gap-1 shadow-sm transition-colors ${selectedFinish === 'Titanium Grey' ? 'bg-black text-white' : 'bg-[#eeeef0] text-black'}`}>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Titanium
                        </button>
                        <button type="button" onClick={() => setSelectedFinish('Raw Carbon')} className={`px-2 py-1 rounded-xl font-mono text-[12px] flex items-center justify-center gap-1 shadow-sm transition-colors ${selectedFinish === 'Raw Carbon' ? 'bg-black text-white' : 'bg-[#eeeef0] text-black'}`}>
                          <span className="w-2.5 h-2.5 rounded-full bg-stone-900"></span> Carbon
                        </button>
                      </div>
                    </div>
                    
                    <button type="submit" className={`w-full mt-4 py-4 rounded-full text-[15px] font-medium transition-all ${isBooked ? 'bg-[#1b1b1d] text-white' : 'bg-black text-white hover:bg-[#1b1b1d]'}`}>
                      {isBooked ? 'Слот забронирован ✓' : 'Забронировать номерной слот'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modals & Notifications */}
      {showPush && (
        <div className="fixed bottom-6 left-6 z-40 max-w-sm p-4 rounded-2xl bg-white/90 backdrop-blur-2xl shadow-2xl border border-gray-100 flex items-start gap-2 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase">НОВЫЙ ПРЕДЗАКАЗ</span>
              <span className="font-mono text-[10px] text-gray-500">Только что</span>
            </div>
            <p className="text-[13px] leading-tight mt-1">Олександр із Києва только что оформил предзаказ на AURA ONE.</p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[32px] p-10 shadow-2xl flex flex-col items-center">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
              ✕
            </button>
            <span className="text-[11px] font-semibold uppercase text-gray-500 mb-1">ТАКТИЛЬНЫЙ ОСМОТР</span>
            <h3 className="text-[24px] font-semibold">AURA ONE // РЕНДЕР СРЕЗА</h3>
            <img alt="3D" className="w-full max-w-sm mt-6 drop-shadow-xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhluS-BBxPqSzFCtrJGnVtT8i6LYz0madkAGHsTtaI-ufzkMRTlwTFIyACB7Ugg0PYUn8_7MIMGkask3JmZkCTk7KUgflLmMei-RTGZMNeyTFCNtbM0aHAWD8tOSEkqJmmerGmXLcr8HK9g0Ri1omjW8YGz4xH7TI1USpDH4yuks-Kz59WY1rCQOF7UEQKHkIqK6am7MrqumVqLhZ2vIiT0EtjUxBH4ObARPUxvl_SsvvSLcnqS9A7hg" />
          </div>
        </div>
      )}
    </div>
  );
}
