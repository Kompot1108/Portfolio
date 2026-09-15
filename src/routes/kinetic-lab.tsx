import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/kinetic-lab")({
  meta: () => [
    { title: "Kinetic Lab | Alex Voloshyn" }
  ],
  component: KineticLabLanding,
});

function KineticLabLanding() {
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [glowColor, setGlowColor] = useState('rgba(3, 86, 255, 0.35)');

  const glowColors: Record<number, string> = {
    1: 'rgba(3, 86, 255, 0.35)',
    2: 'rgba(195, 244, 0, 0.35)',
    3: 'rgba(198, 0, 97, 0.35)',
    4: 'rgba(182, 196, 255, 0.35)',
    5: 'rgba(255, 217, 225, 0.35)'
  };

  const handleModuleClick = (idx: number) => {
    if (activeModule === idx) {
      setActiveModule(null);
    } else {
      setActiveModule(idx);
      setGlowColor(glowColors[idx] || 'rgba(3, 86, 255, 0.35)');
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFaqClick = (idx: number) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <div className="bg-[#13121c] text-[#e4e1ee] selection:bg-[#c3f400] selection:text-[#161e00] min-h-screen relative overflow-x-hidden font-body-md" style={{ zoom: 0.9 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Syne:wght@600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        
        .font-body-sm, .font-body-md, .font-body-lg, .font-label-sm, .font-label-lg { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-display-hero, .font-headline-lg, .font-headline-md, .font-headline-sm { font-family: 'Syne', sans-serif; }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.08); }
        }
        @keyframes float-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        
        .animate-aurora-1 { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-aurora-2 { animation: float-drift 12s ease-in-out infinite; }
        .animate-marquee { animation: marquee 24s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 26s linear infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Ambient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#0356ff] blur-[120px] opacity-30 animate-aurora-1"></div>
        <div class="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#c3f400] blur-[130px] opacity-25 animate-aurora-2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-88 h-88 rounded-full bg-[#c60061] blur-[140px] opacity-20 animate-aurora-1"></div>
      </div>
      
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.035] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" type="fractalNoise"></feTurbulence>
        </filter>
        <rect filter="url(#noiseFilter)" height="100%" width="100%"></rect>
      </svg>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="h-20 max-w-[1360px] mx-auto rounded-full bg-[#1f1f28]/75 backdrop-blur-2xl shadow-[0_12px_32px_-4px_rgba(0,0,0,0.65)] px-6 flex items-center justify-between">
          <a className="flex items-center gap-3 group" href="#">
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#c3f400] text-[#283500] shadow-[0_0_15px_rgba(195,244,0,0.35)] group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
            </span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] leading-tight tracking-tight uppercase text-white">KINETIC LAB</span>
              <span className="font-label-sm text-[10px] tracking-widest uppercase text-[#c4c9ac]">АВТОРСКИЙ КУРС</span>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a className="px-4 py-2 rounded-full font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#o-kurse">О курсе</a>
            <a className="px-4 py-2 rounded-full font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#programma">Программа</a>
            <a className="px-4 py-2 rounded-full font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#avtor">Автор</a>
            <a className="px-4 py-2 rounded-full font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#tarify">Тарифы</a>
            <a className="px-4 py-2 rounded-full font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-4">
            <a className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full font-headline-sm text-[14px] font-bold bg-[#c3f400] text-[#161e00] shadow-[0_0_24px_rgba(195,244,0,0.45)] hover:scale-105 transition-all" href="#tarify">
              Занять место
            </a>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[#283500] text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full pt-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full select-none relative">
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-[#0356ff] blur-[140px] opacity-40 animate-aurora-1"></div>
            <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#c3f400] blur-[150px] opacity-35 animate-aurora-2"></div>
            <div className="absolute top-2/3 left-10 w-96 h-96 rounded-full bg-[#c60061] blur-[160px] opacity-30 animate-aurora-1"></div>
            <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-[#0356ff] blur-[130px] opacity-25 animate-aurora-2"></div>
          </div>

          {/* Hero Section */}
          <section className="relative z-10 pt-10 pb-20 lg:pt-16 lg:pb-28" id="o-kurse">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col items-start gap-8">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#292933] shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-ping"></span>
                    <span className="font-label-sm text-[12px] font-bold uppercase tracking-wider text-[#c3f400]">ПОТОК #4 СТАРТУЕТ 15 МАЯ</span>
                  </div>
                  <span className="px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#1f1f28] text-[#b6c4ff]">
                    ⚡ 6 недель сверхзвукового апгрейда
                  </span>
                </div>
                
                <h1 className="font-display-hero text-[32px] md:text-[44px] lg:text-[48px] md:text-[80px] uppercase tracking-tight text-white leading-none font-extrabold">
                  Перестань <br/>
                  делать скучно. <br/>
                  <span className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] italic font-normal text-[#c60061] tracking-tighter">СОЗДАВАЙ</span> ДИЗАЙН, ЧТО ВЫЗЫВАЕТ 
                  <span className="relative inline-block mt-3 px-5 py-2 bg-[#c3f400] text-[#161e00] font-display-hero text-[32px] md:text-[44px] lg:text-[40px] md:text-[76px] rounded-2xl -rotate-2 shadow-[0_0_35px_rgba(195,244,0,0.5)] transform hover:rotate-0 transition-transform duration-300 ml-2">
                    ЭЙФОРИЮ
                    <svg className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none text-[#0356ff] opacity-80" fill="none" preserveAspectRatio="none" viewBox="0 0 260 70">
                      <path d="M5,35 C30,-5 230,-5 250,30 C270,65 20,70 10,40" fill="none" stroke="currentColor" strokeDasharray="8 4" strokeLinecap="round" strokeWidth="3"></path>
                    </svg>
                  </span>
                </h1>
                
                <div className="max-w-xl flex flex-col gap-3">
                  <p className="font-body-lg text-[20px] text-[#c4c9ac] leading-relaxed">
                    Революционный онлайн-интенсив по креативному арбитражу стилей, генеративным AI-пайплайнам, 3D и кинетической веб-типографике от призера <span className="text-white font-bold">Awwwards</span> и <span className="text-white font-bold">FWA of the Day</span>.
                  </p>
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex -space-x-3 items-center">
                      <div className="w-10 h-10 rounded-full bg-[#34343e] shadow flex items-center justify-center font-headline-sm text-sm font-bold text-white">AL</div>
                      <div className="w-10 h-10 rounded-full bg-[#0356ff] shadow flex items-center justify-center font-headline-sm text-sm font-bold text-white">MK</div>
                      <div className="w-10 h-10 rounded-full bg-[#c60061] shadow flex items-center justify-center font-headline-sm text-sm font-bold text-white">DA</div>
                      <div className="w-10 h-10 rounded-full bg-[#c3f400] shadow flex items-center justify-center font-headline-sm text-sm font-bold text-black">+140</div>
                    </div>
                    <p className="font-body-sm text-[14px] text-[#e4e1ee]">Выпустили 140+ арт-директоров и senior-дизайнеров</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                  <a className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-headline-sm text-[16px] uppercase tracking-wider font-extrabold bg-[#c3f400] text-[#161e00] shadow-[0_0_30px_rgba(195,244,0,0.5)] hover:scale-105 transition-all duration-300" href="#tarify">
                    <span>Ворваться в поток</span>
                    <span className="material-symbols-outlined text-[22px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                  </a>
                  <button className="inline-flex items-center justify-center gap-3 px-7 py-5 rounded-full font-headline-sm text-[15px] uppercase tracking-wide font-bold bg-[#1f1f28]/70 backdrop-blur-xl hover:bg-[#292933] transition-colors shadow-lg" type="button" onClick={() => alert('Шоурил курса откроется в модальном окне.')}>
                    <span className="w-8 h-8 rounded-full bg-[#0356ff] flex items-center justify-center text-white shadow-[0_0_15px_rgba(3,86,255,0.4)]">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </span>
                    <span>Шоурил курса (1:45)</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[520px] flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#0356ff] via-[#c60061] to-[#c3f400] blur-[70px] opacity-40 animate-pulse-slow"></div>
                
                <div className="absolute w-full max-w-[380px] h-[440px] rounded-3xl bg-[#1f1f28]/40 backdrop-blur-xl shadow-2xl p-6 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-center opacity-60">
                    <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-white">KINETIC FEEDBACK STREAM</span>
                    <span className="font-label-sm text-[12px] font-bold text-[#c3f400]">LIVE / VERIFIED</span>
                  </div>
                  <div className="flex flex-col gap-2 items-center opacity-40">
                    <span className="material-symbols-outlined text-[64px] text-[#b6c4ff]">auto_awesome</span>
                    <span className="font-headline-sm text-[24px] font-bold text-center">FEEDBACK ENGINE</span>
                  </div>
                  <div className="text-center font-label-sm text-[12px] font-bold text-[#c4c9ac]">
                    Синхронизировано из Telegram комьюнити курса
                  </div>
                </div>

                <div className="absolute -top-4 right-0 sm:-right-4 max-w-[280px] p-5 rounded-2xl bg-[#292933]/90 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.7)] rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center font-bold text-xs">M</div>
                    <div>
                      <div className="font-headline-sm text-[13px] font-bold text-white">Марк • Lead UI</div>
                      <div className="flex text-[#c3f400]">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-body-sm text-[14px] text-[#e4e1ee] font-medium leading-snug">
                    «Уже на 3-й неделе поднял чек на лендинг <span className="bg-[#c3f400]/20 text-[#c3f400] font-bold px-1 rounded">с 40k до 150k 🔥</span>. Клиенты просто не спорят с таким уровнем.»
                  </p>
                </div>

                <div className="absolute top-28 -left-4 sm:-left-8 max-w-[300px] p-5 rounded-2xl bg-[#34343e]/95 backdrop-blur-2xl shadow-[0_24px_50px_rgba(198,0,97,0.35)] -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#c60061] text-white flex items-center justify-center font-bold text-xs">A</div>
                    <div>
                      <div className="font-headline-sm text-[13px] font-bold text-white">Алиса • Art Director</div>
                      <div className="font-label-sm text-[11px] font-bold text-[#b6c4ff]">Студия Смысл</div>
                    </div>
                    <span className="ml-auto px-2 py-0.5 rounded bg-[#c60061]/30 text-white text-[10px] font-bold uppercase">TOP CASE</span>
                  </div>
                  <p className="font-body-sm text-[14px] text-[#e4e1ee] leading-snug">
                    «Никакой воды и душных лекций по сеткам из 2012 года. Только <span className="text-white font-bold underline">чистый визуальный дофамин</span> и AI-инструменты, о которых еще никто не знает!»
                  </p>
                </div>

                <div className="absolute bottom-10 right-2 sm:-right-2 max-w-[270px] p-4 rounded-2xl bg-[#0356ff]/90 backdrop-blur-2xl text-white shadow-[0_15px_35px_rgba(3,86,255,0.45)] rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                    <span className="font-headline-sm text-[13px] font-bold">Денис Бауэр</span>
                  </div>
                  <p className="font-body-sm text-[13px] leading-snug text-[#e4e7ff]">
                    «Клиенты буквально визжат от новых кейсов в моем Behance. Получил оффер на $4200/mo удаленно!»
                  </p>
                </div>
                
                <div className="absolute -bottom-6 left-6 max-w-[260px] px-4 py-3 rounded-xl bg-[#0d0d16]/95 backdrop-blur-md shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-200 z-40">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#c3f400]"></span>
                    <p className="font-label-sm text-[12px] font-semibold text-white">
                      Сделал запуск для FinTech. Окупил курс за 2 дня.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Marquee Ticker */}
          <div className="relative w-full -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden py-4 my-10 bg-[#0d0d16]/90 shadow-inner">
            <div className="flex whitespace-nowrap overflow-hidden py-2 select-none">
              <div className="flex shrink-0 items-center gap-8 animate-marquee text-white font-headline-sm text-[24px] uppercase tracking-wider font-extrabold">
                <span>★ БЕЗ КОРПОРАТИВНОЙ СКУКИ</span>
                <span className="text-[#c3f400]">★ ТОЛЬКО ЖИВОЙ ДИЗАЙН</span>
                <span>★ 100% ПРАКТИКА</span>
                <span className="text-[#b6c4ff]">★ AI WORKFLOW 2025</span>
                <span>★ 3D &amp; MOTION DRIVE</span>
                <span className="text-[#c60061]">★ БЕЗ ШАБЛОНОВ</span>
                <span>★ БЕЗ КОРПОРАТИВНОЙ СКУКИ</span>
                <span className="text-[#c3f400]">★ ТОЛЬКО ЖИВОЙ ДИЗАЙН</span>
                <span>★ 100% ПРАКТИКА</span>
                <span className="text-[#b6c4ff]">★ AI WORKFLOW 2025</span>
                <span>★ 3D &amp; MOTION DRIVE</span>
                <span className="text-[#c60061]">★ БЕЗ ШАБЛОНОВ</span>
              </div>
            </div>
            <div className="flex whitespace-nowrap overflow-hidden py-2 select-none opacity-80">
              <div className="flex shrink-0 items-center gap-8 animate-marquee-reverse text-[#c4c9ac] font-label-lg text-[14px] uppercase tracking-widest font-bold">
                <span>● KINETIC LAB MASTERCLASS</span>
                <span className="text-white">● SPLINE 3D TO WEBGL</span>
                <span>● MIDJOURNEY V6 CRAFT</span>
                <span className="text-[#c3f400]">● RUNWAY GEN-3 AUTOMATION</span>
                <span>● ADVANCED INTERACTION DESIGN</span>
                <span className="text-[#b6c4ff]">● ПЕРСОНАЛЬНЫЙ АРТ-ДИРЕКШН</span>
                <span>● KINETIC LAB MASTERCLASS</span>
                <span className="text-white">● SPLINE 3D TO WEBGL</span>
                <span>● MIDJOURNEY V6 CRAFT</span>
                <span className="text-[#c3f400]">● RUNWAY GEN-3 AUTOMATION</span>
              </div>
            </div>
          </div>

          {/* Author Section */}
          <section className="relative z-10 py-16" id="avtor">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 relative group">
                <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl bg-[#1f1f28]">
                  <img className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuoOx9SHjEaOqsqBWzh-fUcSGp0rqyMsyhehRMIqRdvBLSjNnO1o1ajRjrdUaYpwRP3xsgJF5mQnwVcjcNt_gy6eQta623hroaJDry57aPl8qeWOEt0vCAyYzis5aueRJn_-thNq4LZ7JKNyznIhnPwUdG92J0_Y32eviN-y2MkCghCmBaQtTVf0oKPg6_8bfOVe0_cIx97okpzcWuRQTRhuMEwPBNAMfZrJjelNKOqMHlWxbFAlXd" alt="Author" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13121c] via-[#13121c]/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#292933]/85 backdrop-blur-xl shadow-xl flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-[20px] font-extrabold text-white">АРТУР ЛЕВИН</span>
                      <span className="font-label-sm text-[12px] font-bold text-[#c4c9ac] uppercase tracking-wider">CREATIVE TECH LEAD &amp; FOUNDER</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#1f1f28] text-[11px] font-bold text-[#c3f400]">FWA x5</span>
                      <span className="px-2.5 py-1 rounded bg-[#1f1f28] text-[11px] font-bold text-[#b6c4ff]">Awwwards SOTD</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-4 p-4 rounded-2xl bg-[#c3f400] text-[#161e00] font-headline-sm text-[24px] uppercase font-black -rotate-3 shadow-[0_0_30px_rgba(195,244,0,0.5)]">
                  9 ЛЕТ В ТОП-ДИЗАЙНЕ
                </div>
              </div>
              
              <div className="lg:col-span-7 flex flex-col gap-6 lg:pl-6">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-0.5 bg-[#c3f400]"></span>
                  <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#c3f400]">МАНИФЕСТ КУРСА</span>
                </div>
                <h2 className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-bold text-white leading-tight">
                  Дизайн умер. Да здравствует <span className="text-[#c3f400] underline decoration-wavy decoration-[#c3f400]/40">гипер-чувственный</span> кинетический опыт.
                </h2>
                <p className="font-body-lg text-[20px] text-[#c4c9ac] leading-relaxed">
                  Большинство современных интерфейсов стерильны, унылы и безлики. Стандартные сетки, скучные синие кнопки и предсказуемая типографика убивают внимание пользователя за полторы секунды. 
                </p>
                <p className="font-body-md text-[16px] text-[#e4e1ee] leading-relaxed">
                  Я создал KINETIC LAB, чтобы научить тебя проектировать визуальные миры, вызывающие эмоции на физиологическом уровне. Мы объединяем силу кинетической типографики, генеративный арт Midjourney v6, интерактивные сцены Spline 3D и передовые веб-технологии в единый мощный рабочий процесс, который поднимет твою рыночную ценность втрое.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="p-4 rounded-2xl bg-[#1f1f28] flex flex-col">
                    <span className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-extrabold text-[#c3f400]">6</span>
                    <span className="font-label-sm text-[12px] font-bold uppercase text-[#c4c9ac] mt-1">Недель интенсива</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1f1f28] flex flex-col">
                    <span className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-extrabold text-[#b6c4ff]">3</span>
                    <span className="font-label-sm text-[12px] font-bold uppercase text-[#c4c9ac] mt-1">Кейса в портфолио</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#1f1f28] flex flex-col">
                    <span className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-extrabold text-white">30</span>
                    <span className="font-label-sm text-[12px] font-bold uppercase text-[#c4c9ac] mt-1">Мест на потоке</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Program Section */}
          <section className="relative z-10 py-20 transition-colors duration-700" id="programma">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#b6c4ff]">УЧЕБНЫЙ МАРШРУТ</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#0356ff]/30 text-[#dce1ff] font-bold">2025 UPGRADE</span>
                </div>
                <h2 className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-black uppercase tracking-tight text-white leading-none">
                  Программа, которая <br className="hidden sm:inline"/>
                  <span className="text-[#b6c4ff]">перевернет твое</span> мышление
                </h2>
              </div>
              <p className="max-w-md font-body-md text-[16px] text-[#c4c9ac]">
                5 глубоких модулей без абстрактной теории. Каждая неделя завершается готовым арт-артефактом под ревью ментора.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 relative">
              <div className="absolute -inset-10 rounded-3xl blur-[110px] pointer-events-none transition-all duration-700 z-0" style={{ backgroundColor: glowColor }}></div>
              
              {[
                {
                  id: 1,
                  num: "01",
                  numColor: "text-[#b6c4ff]",
                  week: "НЕДЕЛЯ 1 • ФУНДАМЕНТ ДИСРАПТА",
                  title: "Анатомия Визуальной Эйфории и Кинетическая Типографика",
                  hours: "12 академических часов",
                  desc: "Ломаем правила швейцарской сетки и строим экспрессивные типографические постеры. Работа с масштабными контрастами, экстремальным кернингом, живыми анимациями текста и ритмом страницы.",
                  tags: ["Figma Variable Fonts", "Micro-Interactions", "Editorial Brutalism", "SVG Warp Effects"],
                  tagClass: "bg-[#0356ff]/20 text-[#b6c4ff]",
                  iconColor: "text-[#b6c4ff]",
                  resTitle: "РЕЗУЛЬТАТ МОДУЛЯ:",
                  resDesc: "Интерактивный кинетический манифест-постер в Figma и готовый веб-прототип для Awwwards."
                },
                {
                  id: 2,
                  num: "02",
                  numColor: "text-[#c3f400]",
                  week: "НЕДЕЛЯ 2 • ГЕНЕРАТИВНЫЙ РАЗГОН",
                  title: "Midjourney v6 & Stable Diffusion для Коммерческого Арт-дирекшна",
                  hours: "16 часов практики",
                  desc: "Создание собственных генеративных пайплайнов без лотереи с промптами. Научишься генерировать консистентных 3D-персонажей, хромированные текстуры, футуристические интерьеры и дизайн-системы на лету.",
                  tags: ["Midjourney v6 Master Prompting", "ControlNet OpenPose", "Magnific AI 4K Upscale", "Consistent Branding Pack"],
                  tagClass: "bg-[#c3f400]/20 text-[#c3f400]",
                  iconColor: "text-[#c3f400]",
                  resTitle: "РЕЗУЛЬТАТ МОДУЛЯ:",
                  resDesc: "Генеративный лукбук для люксового fashion или tech-бренда из 12 синхронизированных артов."
                },
                {
                  id: 3,
                  num: "03",
                  numColor: "text-[#c60061]",
                  week: "НЕДЕЛЯ 3-4 • ТРЕТЬЕ ИЗМЕРЕНИЕ",
                  title: "Интерактивный 3D & Spline в Реальном Времени",
                  hours: "20 часов воркшопов",
                  desc: "Полноценное внедрение физики и 3D-объектов в веб без тяжелого кода. Создаем интерактивные жидкие металлы, стеклянные преломления и реакцию на курсор мыши в Spline с экспортом в Webflow/React.",
                  tags: ["Spline 3D Shaders", "Physics Collisions", "Glass & Dispersion Materials", "Three.js Export"],
                  tagClass: "bg-[#c60061]/20 text-white",
                  iconColor: "text-[#c60061]",
                  resTitle: "РЕЗУЛЬТАТ МОДУЛЯ:",
                  resDesc: "Живой 3D-продукт с откликом на скролл и гироскоп смартфона."
                },
                {
                  id: 4,
                  num: "04",
                  numColor: "text-[#dce1ff]",
                  week: "НЕДЕЛЯ 5 • ЖИВОЙ ЭКРАН",
                  title: "Runway Gen-3 & Кинематический Моушн-дизайн",
                  hours: "14 часов практики",
                  desc: "Оживление статичных интерфейсов с помощью нейросетевой видеогенерации нового поколения. Бесшовные видеопетли, микро-анимации наградных сайтов и кинематографический сторителлинг.",
                  tags: ["Runway Gen-3 Alpha", "Luma Dream Machine", "Motion Blur & Ramping", "Loop Architecture"],
                  tagClass: "bg-[#0356ff]/30 text-[#dce1ff]",
                  iconColor: "text-[#dce1ff]",
                  resTitle: "РЕЗУЛЬТАТ МОДУЛЯ:",
                  resDesc: "Видео-шоурил кейса с кинематографическими кадрами и бесшовными петлями для Behance."
                },
                {
                  id: 5,
                  num: "05",
                  numColor: "text-white",
                  week: "НЕДЕЛЯ 6 • МОНЕТИЗАЦИЯ & РЕЛИЗ",
                  title: "Упаковка Дипломного Кейса, Защита и Выход на Зарубежный Рынок",
                  hours: "Финальная неделя",
                  desc: "Оформляем портфолио, которое продает само себя без откликов на вакансии. Стратегия подачи на Awwwards, коммуникация с международными заказчиками, ценообразование от $3000 за сайт.",
                  tags: ["Behance Featured Case Prep", "Awwwards Submission Checklist", "Contracts & Pricing 2025"],
                  tagClass: "bg-[#c3f400]/30 text-[#c3f400]",
                  iconColor: "text-[#c3f400]",
                  resTitle: "РЕЗУЛЬТАТ МОДУЛЯ:",
                  resDesc: "Полностью готовый кейс высшей пробы, выложенный в сеть + сертификат аккредитации."
                }
              ].map(mod => (
                <div key={mod.id} onClick={() => handleModuleClick(mod.id)} className={`module-card group relative z-10 rounded-3xl bg-[#1f1f28]/70 backdrop-blur-xl shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${activeModule === mod.id ? 'active-module' : ''}`}>
                  <div className="module-header p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-6">
                      <span className={`font-headline-sm text-[24px] font-black ${mod.numColor}`}>{mod.num}</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[12px] font-bold uppercase tracking-wider text-[#c4c9ac]">{mod.week}</span>
                        <h3 className="font-headline-md text-[28px] md:text-[36px] font-bold text-white mt-1">{mod.title}</h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <span className="hidden md:inline-flex px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#34343e] text-[#e4e1ee]">{mod.hours}</span>
                      <div className={`chevron-icon w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeModule === mod.id ? 'bg-[#c3f400] text-[#161e00]' : 'bg-[#34343e] text-white group-hover:bg-[#c3f400] group-hover:text-[#161e00]'}`}>
                        <span className={`material-symbols-outlined transition-transform duration-300 ${activeModule === mod.id ? 'rotate-180' : ''}`}>expand_more</span>
                      </div>
                    </div>
                  </div>
                  <div className={`module-content px-6 sm:px-8 pb-8 pt-2 flex flex-col gap-6 ${activeModule === mod.id ? 'block' : 'hidden'}`}>
                    <p className="font-body-lg text-[20px] text-[#c4c9ac] max-w-3xl">{mod.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {mod.tags.map(tag => (
                        <span key={tag} className={`px-3.5 py-1.5 rounded-full font-label-sm text-[12px] font-bold ${mod.tagClass}`}>{tag}</span>
                      ))}
                    </div>
                    <div className="p-4 rounded-2xl bg-[#0d0d16]/80 flex items-center gap-4 mt-2">
                      <span className={`material-symbols-outlined ${mod.iconColor} text-[24px]`}>verified</span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[12px] uppercase font-bold text-white">{mod.resTitle}</span>
                        <span className="font-body-sm text-[14px] text-[#c4c9ac]">{mod.resDesc}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="relative z-10 py-24" id="tarify">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1f1f28] shadow">
                <span className="material-symbols-outlined text-[#c3f400] text-[18px]">workspace_premium</span>
                <span className="font-label-sm text-[12px] font-bold uppercase tracking-wider text-white">ИНВЕСТИЦИЯ В КАРЬЕРНЫЙ КВАНТОВЫЙ СКАЧОК</span>
              </div>
              <h2 className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-black uppercase tracking-tight text-white">
                Выбери свой формат трансформации
              </h2>
              <p className="font-body-lg text-[20px] text-[#c4c9ac]">
                Количество мест строго ограничено ради персонального внимания к каждому проекту.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 lg:gap-0 relative">
              <div className="lg:w-[105%] lg:-mr-4 rounded-3xl bg-[#1f1f28]/80 backdrop-blur-2xl p-8 shadow-xl relative z-10 lg:transform lg:-rotate-1 hover:rotate-0 hover:z-30 transition-all duration-300 flex flex-col justify-between min-h-[580px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#c4c9ac]">ТАРИФ</span>
                      <h3 className="font-headline-md text-[28px] md:text-[36px] font-bold text-white">BASE EXPLORER</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#34343e] text-[#e4e1ee]">Самостоятельно</span>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[32px] md:text-[44px] font-black text-white">49 000 ₽</span>
                      <span className="font-body-sm text-[14px] text-[#c4c9ac] line-through">65 000 ₽</span>
                    </div>
                    <span className="font-label-sm text-[12px] font-bold text-[#c4c9ac]">Доступна рассрочка от 4 080 ₽ / мес</span>
                  </div>
                  <ul className="flex flex-col gap-3.5 mb-8">
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-white text-[20px]">check_circle</span>
                      <span>Доступ ко всем 5 модулям курса</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-white text-[20px]">check_circle</span>
                      <span>База промптов и 3D-ассетов 2025</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-white text-[20px]">check_circle</span>
                      <span>Общий закрытый чат студентов</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-white text-[20px]">check_circle</span>
                      <span>Доступ к записям на 6 месяцев</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-[#c4c9ac] opacity-50">
                      <span className="material-symbols-outlined text-[20px]">close</span>
                      <span className="line-through">Личный ревью домашних заданий</span>
                    </li>
                  </ul>
                </div>
                <a className="w-full py-4 rounded-full font-headline-sm text-[14px] font-bold text-center uppercase tracking-wider bg-[#34343e] hover:bg-[#c3f400] hover:text-[#161e00] transition-all duration-300" href="#register">
                  Выбрать тариф
                </a>
              </div>
              
              <div className="rounded-3xl bg-[#292933]/95 backdrop-blur-2xl p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(255,0,127,0.4),0_0_40px_rgba(204,255,0,0.25)] relative z-20 lg:scale-105 transition-transform duration-300 flex flex-col justify-between min-h-[640px]">
                <div className="absolute -top-4 right-6 px-4 py-1.5 rounded-full font-label-sm text-[11px] font-black uppercase tracking-wider bg-[#c3f400] text-[#161e00] shadow-[0_0_20px_rgba(195,244,0,0.6)] rotate-2">
                  ХИТ ПРОДАЖ / ОСТАЛОСЬ 4 МЕСТА
                </div>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#c3f400]">РЕКОМЕНДУЕМ</span>
                      <h3 className="font-headline-md text-[32px] font-extrabold text-white">PRO MENTORSHIP</h3>
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[28px] md:text-[36px] md:text-[52px] font-black text-[#c3f400]">89 000 ₽</span>
                      <span className="font-body-sm text-[14px] text-[#c4c9ac] line-through">120 000 ₽</span>
                    </div>
                    <span className="font-label-sm text-[12px] font-bold text-white">Беспроцентная рассрочка от 7 410 ₽ / мес</span>
                  </div>
                  <ul className="flex flex-col gap-3.5 mb-8">
                    <li className="flex items-center gap-3 font-body-md text-[16px] text-white font-semibold">
                      <span className="material-symbols-outlined text-[#c3f400] text-[22px]">check_circle</span>
                      <span>Все опции тарифа BASE</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-md text-[16px] text-white font-semibold">
                      <span className="material-symbols-outlined text-[#c3f400] text-[22px]">check_circle</span>
                      <span>Еженедельные 1-on-1 разборы с Артуром</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-md text-[16px] text-white font-semibold">
                      <span className="material-symbols-outlined text-[#c3f400] text-[22px]">check_circle</span>
                      <span>Детальный аудит дипломного кейса</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-md text-[16px] text-white font-semibold">
                      <span className="material-symbols-outlined text-[#c3f400] text-[22px]">check_circle</span>
                      <span>Помощь с подачей на Awwwards &amp; Behance</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-md text-[16px] text-white font-semibold">
                      <span className="material-symbols-outlined text-[#c3f400] text-[22px]">check_circle</span>
                      <span>Бессрочный доступ в закрытый клуб выпускников</span>
                    </li>
                  </ul>
                </div>
                <a className="w-full py-5 rounded-full font-headline-sm text-[16px] font-black text-center uppercase tracking-wider bg-[#c3f400] text-[#161e00] shadow-[0_0_25px_rgba(195,244,0,0.6)] hover:scale-105 transition-all duration-300" href="#register">
                  Занять место на PRO
                </a>
              </div>
              
              <div className="lg:w-[105%] lg:-ml-4 rounded-3xl bg-[#1f1f28]/80 backdrop-blur-2xl p-8 shadow-xl relative z-10 lg:transform lg:rotate-1 hover:rotate-0 hover:z-30 transition-all duration-300 flex flex-col justify-between min-h-[580px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#b6c4ff]">ЭКСКЛЮЗИВ</span>
                      <h3 className="font-headline-md text-[28px] md:text-[36px] font-bold text-white">VIP ACCELERATOR</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#0356ff]/20 text-[#b6c4ff]">3 места</span>
                  </div>
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-lg text-[32px] md:text-[44px] font-black text-white">160 000 ₽</span>
                      <span className="font-body-sm text-[14px] text-[#c4c9ac] line-through">220 000 ₽</span>
                    </div>
                    <span className="font-label-sm text-[12px] font-bold text-[#c4c9ac]">Персональный контракт с куратором</span>
                  </div>
                  <ul className="flex flex-col gap-3.5 mb-8">
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-[#b6c4ff] text-[20px]">check_circle</span>
                      <span>Полный VIP-арт-дирекшн от автора курса</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-[#b6c4ff] text-[20px]">check_circle</span>
                      <span>Прямая передача клиентских заказов студии</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-[#b6c4ff] text-[20px]">check_circle</span>
                      <span>Разработка персональной бренд-стратегии</span>
                    </li>
                    <li className="flex items-center gap-3 font-body-sm text-[14px] text-white">
                      <span className="material-symbols-outlined text-[#b6c4ff] text-[20px]">check_circle</span>
                      <span>Офлайн воркшоп в Москве или Дубае</span>
                    </li>
                  </ul>
                </div>
                <a className="w-full py-4 rounded-full font-headline-sm text-[14px] font-bold text-center uppercase tracking-wider bg-[#34343e] hover:bg-[#0356ff] hover:text-white transition-all duration-300" href="#register">
                  Связаться с куратором
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative z-10 py-16" id="faq">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
              <div className="text-center flex flex-col items-center gap-2">
                <span className="font-label-sm text-[12px] font-bold uppercase tracking-widest text-[#c3f400]">ОТВЕТЫ НА СОМНЕНИЯ</span>
                <h2 className="font-headline-lg text-[28px] md:text-[36px] md:text-[56px] font-bold text-white">Часто задаваемые вопросы</h2>
              </div>
              <div className="flex flex-col gap-4">
                {[
                  { id: 1, q: "Подойдет ли курс, если у меня нет опыта в 3D и нейросетях?", a: "Да. Мы начинаем с интуитивного освоения инструментов Spline и Midjourney с нуля, минуя сложный 3D-софт вроде Cinema4D или Blender. Главное — ваше визуальное чутье и желание экспериментировать." },
                  { id: 2, q: "Сколько часов в неделю потребуется уделять обучению?", a: "Оптимально закладывать от 6 до 8 часов в неделю: 2 часа на просмотр лекций и разборов, остальное время — на живую творческую практику. Все материалы доступны в записи 24/7." },
                  { id: 3, q: "Нужен ли мощный компьютер с топовой видеокартой?", a: "Нет, генерации Midjourney и Runway происходят в облачных серверах, а Spline оптимизирован для работы в обычном браузере даже на базовом MacBook Air или среднем PC." },
                  { id: 4, q: "Как устроена оплата и рассрочка?", a: "Доступна внутренняя рассрочка на 6 или 12 месяцев без первого взноса и переплат от банков-партнеров (Т-Банк, Сбер). Также принимаем зарубежные карты и криптовалюту (USDT)." }
                ].map(faq => (
                  <div key={faq.id} onClick={() => handleFaqClick(faq.id)} className="rounded-2xl bg-[#1f1f28]/70 backdrop-blur-md p-6 cursor-pointer hover:bg-[#1f1f28] transition-colors shadow">
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="font-headline-sm text-[18px] font-bold text-white">{faq.q}</h4>
                      <span className={`material-symbols-outlined text-[#c4c9ac] transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`}>
                        {openFaq === faq.id ? 'remove' : 'add'}
                      </span>
                    </div>
                    <p className={`font-body-md text-[16px] text-[#c4c9ac] mt-4 ${openFaq === faq.id ? 'block' : 'hidden'}`}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration Section */}
          <section className="relative z-10 py-16" id="register">
            <div className="relative rounded-3xl bg-[#292933]/90 backdrop-blur-2xl p-8 sm:p-14 overflow-hidden shadow-2xl">
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-[#c3f400]/30 blur-[100px] pointer-events-none"></div>
              <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#0356ff]/40 blur-[100px] pointer-events-none"></div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#c60061]/30 text-white uppercase">ФИНАЛЬНЫЙ НАБОР ГОДА</span>
                    <span className="font-label-sm text-[12px] font-bold text-[#c3f400]">ОСТАЛОСЬ 7 МЕСТ</span>
                  </div>
                  <h2 className="font-display-hero text-[32px] md:text-[44px] lg:text-[28px] md:text-[36px] md:text-[56px] font-black uppercase text-white leading-tight">
                    Твой переход в лигу <br/>
                    <span className="text-[#c3f400] underline decoration-[#c3f400]/50">высокооплачиваемых</span> визионеров
                  </h2>
                  <p className="font-body-lg text-[20px] text-[#c4c9ac] max-w-xl">
                    Забронируй место со скидкой 30% до 12 мая. После закрытия регистрации следующий поток откроется только осенью.
                  </p>
                  <div className="flex items-center gap-4 text-[#c4c9ac] font-label-sm text-[13px] font-bold">
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#c3f400] text-[18px]">verified_user</span> Гарантия возврата 14 дней</span>
                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[#c3f400] text-[18px]">credit_card</span> Рассрочка 0%</span>
                  </div>
                </div>
                
                <div className="lg:col-span-4 flex flex-col gap-4 bg-[#0d0d16]/80 p-6 rounded-2xl shadow-xl">
                  <span className="font-headline-sm text-[16px] font-bold text-white">Быстрая бронь места</span>
                  <input className="w-full px-4 py-3 rounded-xl bg-[#1f1f28] font-body-sm text-[14px] text-white placeholder:text-[#c4c9ac] focus:outline-none focus:ring-2 focus:ring-[#c3f400] transition-all" placeholder="Твое имя" type="text"/>
                  <input className="w-full px-4 py-3 rounded-xl bg-[#1f1f28] font-body-sm text-[14px] text-white placeholder:text-[#c4c9ac] focus:outline-none focus:ring-2 focus:ring-[#c3f400] transition-all" placeholder="Email для доступа" type="email"/>
                  <input className="w-full px-4 py-3 rounded-xl bg-[#1f1f28] font-body-sm text-[14px] text-white placeholder:text-[#c4c9ac] focus:outline-none focus:ring-2 focus:ring-[#c3f400] transition-all" placeholder="+7 (999) 000-00-00" type="tel"/>
                  <button className="w-full mt-2 py-4 rounded-xl font-headline-sm text-[14px] font-extrabold uppercase tracking-wider bg-[#c3f400] text-[#161e00] shadow-[0_0_20px_rgba(195,244,0,0.5)] hover:scale-[1.02] hover:bg-[#abd600] transition-all" type="button">
                    Зафиксировать скидку 30%
                  </button>
                  <span className="font-label-sm text-[11px] font-bold text-center text-[#c4c9ac]">Нажимая кнопку, вы соглашаетесь с условиями оферты</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full mt-24 bg-[#0d0d16]/90 backdrop-blur-xl shadow-[0_-1px_16px_rgba(0,0,0,0.5)] py-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#34343e]">
            <div className="flex items-center gap-4">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c3f400] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c3f400]"></span>
              </span>
              <span className="font-label-sm text-[12px] font-bold uppercase tracking-wider text-white">Набор открыт / Поток #4</span>
              <span className="px-3 py-1 rounded-full font-label-sm text-[12px] font-bold bg-[#34343e] text-[#b6c4ff]">Старт 15 Мая</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-[12px] font-bold text-[#c4c9ac]">Осталось мест:</span>
              <span className="font-headline-sm text-[24px] font-bold text-[#c3f400]">07</span>
              <span className="font-label-sm text-[12px] font-bold text-[#c4c9ac]">из 30</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-headline-sm text-[15px] font-bold uppercase tracking-wider text-white">KINETIC LAB</span>
              <p className="font-body-sm text-[14px] text-[#c4c9ac]">Иммерсивный онлайн-интенсив по креативному нарративу и медиа-арту.</p>
            </div>
            <div className="flex items-center gap-6">
              <a className="font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#">Telegram</a>
              <a className="font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#">YouTube</a>
              <a className="font-label-lg text-[14px] font-bold text-[#c4c9ac] hover:text-white transition-colors" href="#">Behance</a>
            </div>
            <div className="font-body-sm text-[14px] text-[#c4c9ac] text-center md:text-right">© 2026 KINETIC LAB. Все права защищены.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
