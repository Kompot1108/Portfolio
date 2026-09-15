import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Scissors, CheckSquare, Square, ChevronDown, Clock, MapPin, Phone, ShieldAlert, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/steel-blade")({
  meta: () => [
    { title: "Steel & Blade Barbershop | Alex Voloshyn" }
  ],
  component: SteelBladeLanding,
});

function SteelBladeLanding() {
  const [formState, setFormState] = useState({
    master: "",
    service: "",
    date: "",
    time: "",
    accept: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.accept) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("СЛОТ ЗАХВАЧЕН. ЖДЕМ В ЦЕХЕ.");
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full font-mono bg-[#0c0c0c] text-[#e0e0e0] selection:bg-[#FF5500] selection:text-white pb-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .font-oswald { font-family: 'Oswald', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        
        /* Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }

        /* Glitch Hover Effect for Buttons */
        .btn-glitch {
          position: relative;
          overflow: hidden;
          transition: all 0.1s ease;
        }
        .btn-glitch:hover {
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0px 0px rgba(255,85,0,1);
        }
        .btn-glitch:active {
          transform: translate(0px, 0px);
          box-shadow: 0px 0px 0px 0px rgba(255,85,0,1);
        }
        
        .btn-glitch-green:hover {
          box-shadow: 4px 4px 0px 0px rgba(198,255,0,1);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0c0c0c;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF5500;
        }
      `}</style>

      {/* Top Navbar */}
      <nav className="border-b border-[#333] bg-[#0c0c0c] sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between text-xs font-bold uppercase">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[#FF5500] hover:text-white transition-colors flex items-center gap-2">
              <Scissors className="w-5 h-5 -rotate-90" />
              <span>СТАЛЬ &amp; ЛЕЗВИЕ<br/><span className="text-[9px] text-[#888] leading-none">БАРБЕРШОП // МЯСНИЦКАЯ</span></span>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[#888]">
            <a href="#masters" className="hover:text-white transition-colors">МАСТЕРА</a>
            <a href="#price" className="hover:text-white transition-colors">ПРАЙС-ЛИСТ</a>
            <a href="#manifest" className="hover:text-white transition-colors">МАНИФЕСТ</a>
            <a href="#contact" className="hover:text-white transition-colors">КОНТАКТЫ</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] text-[#888] border-r border-[#333] pr-4">
              <div className="w-2 h-2 bg-[#C6FF00] animate-pulse"></div>
              <span>РЕЖИМ: 10:00 - 21:00 / РЕЗ ЭКСТРИМ</span>
            </div>
            <a href="#booking" className="btn-glitch bg-[#FF5500] text-black px-6 py-2 border border-[#FF5500] hover:bg-black hover:text-[#FF5500]">
              ЗАПИСЬ
            </a>
          </div>
        </div>
      </nav>

      {/* Green Marquee */}
      <div className="bg-[#C6FF00] text-black text-[10px] font-bold overflow-hidden border-b border-[#333] py-1">
        <div className="animate-marquee">
          <span className="mx-4">/// ОПАСНОЕ БРИТЬЕ</span>
          <span className="mx-4">/// ЧЕСТНЫЙ СРЕЗ</span>
          <span className="mx-4">/// НИКАКОГО ГЛЯНЦА</span>
          <span className="mx-4">/// ТОЛЬКО ЖЕЛЕЗО И ХАРАКТЕР</span>
          <span className="mx-4">/// ПРАЙСОВЫЕ ЦЕПИ</span>
          <span className="mx-4">/// МАКСИМАЛЬНАЯ ТОЧНОСТЬ</span>
          {/* Duplicate for seamless loop */}
          <span className="mx-4">/// ОПАСНОЕ БРИТЬЕ</span>
          <span className="mx-4">/// ЧЕСТНЫЙ СРЕЗ</span>
          <span className="mx-4">/// НИКАКОГО ГЛЯНЦА</span>
          <span className="mx-4">/// ТОЛЬКО ЖЕЛЕЗО И ХАРАКТЕР</span>
          <span className="mx-4">/// ПРАЙСОВЫЕ ЦЕПИ</span>
          <span className="mx-4">/// МАКСИМАЛЬНАЯ ТОЧНОСТЬ</span>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 pt-12 pb-24">
        
        {/* Header Badges */}
        <div className="flex justify-between items-start mb-6 text-[10px] uppercase font-bold text-[#888]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF5500]">▲</span> РЕГЛАМЕНТ ГОРЯЧЕГО ЦЕХА // 2024
          </div>
          <div className="border border-[#333] px-2 py-1 flex items-center gap-2">
            ИНФО-СБОР // ПРЕСС-ЦЕНТР <span className="bg-[#C6FF00] text-black px-1">LIVE SLOT</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col xl:flex-row gap-12 mb-16">
          <div className="xl:w-2/3">
            <div className="flex gap-2 mb-6 text-xs font-bold">
              <span className="bg-[#FF5500] text-black px-3 py-1 border border-[#FF5500]">ЧЕСТНЫЙ СРЕЗ</span>
              <span className="bg-[#C6FF00] text-black px-3 py-1 border border-[#C6FF00]">БЕЗ СОПЛЕЙ И РАФА</span>
            </div>
            
            <h1 className="font-oswald text-6xl md:text-8xl xl:text-[100px] leading-[0.9] uppercase tracking-tight mb-8">
              Стрижем без соплей.<br/>
              <span className="text-[#FF5500]">Бреем до кости.</span>
            </h1>
            
            <p className="text-sm md:text-base text-[#888] max-w-2xl mb-12 border-l-2 border-[#333] pl-4">
              Никаких лавандовых рафов и фальшивых улыбок. Сталь, ремень, горячий компресс и идеальная геометрия твоей головы.
            </p>

            <div className="border border-[#333] p-6 bg-[#111] relative">
              <p className="text-[10px] text-[#888] mb-4">// ЦЕЛЕВОЙ ЭКШН-СТАНДАРТ</p>
              <h2 className="font-oswald text-2xl md:text-4xl uppercase mb-2">Готов к честной работе?</h2>
              <p className="text-xs text-[#888] mb-8">Бронирование места фиксируется в протоколе. Опоздание аннулирует слот и твою очередь навсегда.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#booking" className="btn-glitch bg-[#FF5500] text-black font-bold uppercase px-8 py-4 flex items-center justify-center gap-3 border border-[#FF5500] hover:bg-black hover:text-[#FF5500]">
                  <Square className="w-4 h-4" fill="currentColor" /> ЗАБРОНИРОВАТЬ КРЕСЛО
                </a>
                <a href="#price" className="btn-glitch-green bg-transparent text-[#e0e0e0] border border-[#333] font-bold uppercase px-8 py-4 flex items-center justify-center hover:border-[#C6FF00] hover:text-[#C6FF00]">
                  ТАРИФЫ
                </a>
              </div>
            </div>
          </div>
          
          {/* Hero Stats */}
          <div className="xl:w-1/3 flex flex-col gap-4">
            <div className="border border-[#333] p-6 bg-[#111] flex items-start justify-between group hover:border-[#FF5500] transition-colors">
              <div>
                <div className="font-oswald text-4xl mb-1 text-white">100%</div>
                <div className="text-[10px] text-[#888] font-bold uppercase">ОСТРЫЕ ЛЕЗВИЯ ЯПОНИИ</div>
              </div>
              <Scissors className="text-[#FF5500] group-hover:rotate-180 transition-transform duration-500" />
            </div>
            
            <div className="border border-[#333] p-6 bg-[#111] flex items-start justify-between group hover:border-[#C6FF00] transition-colors">
              <div>
                <div className="font-oswald text-4xl mb-1 text-[#C6FF00]">0%</div>
                <div className="text-[10px] text-[#888] font-bold uppercase">СВЕТСКИХ БЕСЕД И ГЛЯНЦА</div>
              </div>
              <ShieldAlert className="text-[#C6FF00]" />
            </div>
            
            <div className="border border-[#333] p-6 bg-[#111] flex items-start justify-between group hover:border-white transition-colors">
              <div>
                <div className="font-oswald text-4xl mb-1 flex items-center gap-2"><span className="text-xl text-[#FF5500]">С</span> 2018</div>
                <div className="text-[10px] text-[#888] font-bold uppercase">ГОДА НА РАЙОНЕ / -3 ЭТАЖ</div>
              </div>
              <MapPin className="text-[#888] group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

      </main>

      {/* Orange Marquee */}
      <div className="bg-[#FF5500] text-black text-xs font-bold overflow-hidden border-y border-[#333] py-2 mb-20">
        <div className="animate-marquee">
          <span className="mx-6">/// БОРОДА /// ФЕЙД /// ОПАСНАЯ БРИТВА /// КОРОЛЕВСКОЕ БРИТЬЕ /// ТАТУ-ЗОНА /// РЕЗКИЙ СРЕЗ /// ЧИСТАЯ СТАЛЬ /// НИКАКИХ КОМПРОМИССОВ ///</span>
          <span className="mx-6">/// БОРОДА /// ФЕЙД /// ОПАСНАЯ БРИТВА /// КОРОЛЕВСКОЕ БРИТЬЕ /// ТАТУ-ЗОНА /// РЕЗКИЙ СРЕЗ /// ЧИСТАЯ СТАЛЬ /// НИКАКИХ КОМПРОМИССОВ ///</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section 1: Masters */}
        <section id="masters" className="mb-32">
          <div className="mb-8">
            <p className="text-[#C6FF00] text-[10px] font-bold uppercase mb-2">/ PERSONNEL / ЛИЧНЫЙ СОСТАВ /</p>
            <h2 className="font-oswald text-4xl md:text-5xl uppercase text-white">
              <span className="text-[#FF5500]">// 01.</span> НАШИ МЯСНИКИ // МАСТЕРА
            </h2>
            <div className="flex justify-between items-end mt-4 border-b border-[#333] pb-4">
              <p className="text-[#888] text-xs">Лица со стальным хватом. Опыт от 3 лет. Никаких новичков и практикантов на боевых линиях.</p>
              <div className="hidden md:flex text-[10px] bg-[#111] border border-[#333] px-2 py-1 items-center gap-2">
                <div className="w-2 h-2 bg-[#FF5500]"></div> АТТЕСТАЦИЯ ПРОЙДЕНА / 2024
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Barber 1 */}
            <div className="border border-[#333] bg-[#111] p-4 flex flex-col group hover:border-[#FF5500] transition-colors">
              <div className="flex justify-between text-[10px] font-bold text-[#888] mb-4 uppercase">
                <span>UID // ID-072</span>
                <span className="text-[#C6FF00]">ОТКРЫТО 2 ОКНА</span>
              </div>
              <div className="relative aspect-square mb-6 overflow-hidden border border-[#333] grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="/barber1.jpg" alt="Master" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-[#FF5500] text-black text-[10px] font-bold px-2 py-1">СТАТУС: В ЦЕХЕ</div>
              </div>
              <h3 className="font-oswald text-2xl uppercase mb-1">АРТЁМ «СКАЛЬПЕЛЬ» СИДОРОВ</h3>
              <p className="text-[10px] text-[#FF5500] font-bold uppercase mb-4">ШЕФ-БАРБЕР // 8 ЛЕТ У СТАНКА</p>
              <div className="flex gap-2 text-[10px] mb-6">
                <span className="border border-[#333] px-2 py-1 bg-[#1a1a1a]">КЛАССИЧЕСКИЙ ФЕЙД</span>
                <span className="border border-[#333] px-2 py-1 bg-[#1a1a1a]">ОПАСНОЕ БРИТЬЕ</span>
              </div>
              <p className="text-xs text-[#888] mb-8 flex-grow">«Хорошая стрижка держит форму полтора месяца, а не три дня».</p>
              
              <div className="flex items-center justify-between border-t border-[#333] pt-4">
                <div className="text-[10px] text-[#888]">СТАТУС СЛОТА:<br/><span className="text-[#C6FF00]">2 СЕГОДНЯ</span></div>
                <a href="#booking" className="btn-glitch bg-[#FF5500] text-black font-bold text-xs px-6 py-2 border border-[#FF5500] hover:bg-black hover:text-[#FF5500]">ВЫБРАТЬ</a>
              </div>
            </div>

            {/* Barber 2 */}
            <div className="border border-[#333] bg-[#111] p-4 flex flex-col group hover:border-[#FF5500] transition-colors">
              <div className="flex justify-between text-[10px] font-bold text-[#888] mb-4 uppercase">
                <span>UID // ID-045</span>
                <span>ПЛОТНЫЙ ГРАФИК</span>
              </div>
              <div className="relative aspect-square mb-6 overflow-hidden border border-[#333] grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="/barber2.jpg" alt="Master" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-[#C6FF00] text-black text-[10px] font-bold px-2 py-1">СТАТУС: В ЦЕХЕ</div>
              </div>
              <h3 className="font-oswald text-2xl uppercase mb-1">ИЛЬЯ «МОЛОТ» ВОЛКОВ</h3>
              <p className="text-[10px] text-[#C6FF00] font-bold uppercase mb-4">ТОП-БАРБЕР // ТЯЖЕЛОВЕСНАЯ БОРОДА</p>
              <div className="flex gap-2 text-[10px] mb-6">
                <span className="border border-[#333] px-2 py-1 bg-[#1a1a1a]">СКУЛЬПТУРА БОРОДЫ</span>
                <span className="border border-[#333] px-2 py-1 bg-[#1a1a1a]">ROYAL SHAVE</span>
              </div>
              <p className="text-xs text-[#888] mb-8 flex-grow">«Не даю советов по стилю. Делаю так, чтобы тебе не было стыдно перед зеркалом».</p>
              
              <div className="flex items-center justify-between border-t border-[#333] pt-4">
                <div className="text-[10px] text-[#888]">СТАТУС СЛОТА:<br/><span>ЗАПИСЬ ЗА 3 ДНЯ</span></div>
                <a href="#booking" className="btn-glitch bg-[#FF5500] text-black font-bold text-xs px-6 py-2 border border-[#FF5500] hover:bg-black hover:text-[#FF5500]">ВЫБРАТЬ</a>
              </div>
            </div>

            {/* Hiring Card */}
            <div className="border border-[#FF5500] bg-[#FF5500]/5 p-4 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert className="w-32 h-32 text-[#FF5500]" />
              </div>
              <div className="flex justify-end text-[10px] font-bold text-[#888] mb-4 uppercase">
                <span className="bg-[#C6FF00] text-black px-2">ВАКАНСИЯ ОТКРЫТА</span>
              </div>
              <div className="w-12 h-12 border border-[#FF5500] text-[#FF5500] flex items-center justify-center mb-6">
                <Scissors className="w-6 h-6" />
              </div>
              <p className="text-[10px] text-[#FF5500] font-bold uppercase mb-2">/ СВОБОДНЫЙ СТАНОК /</p>
              <h3 className="font-oswald text-3xl uppercase mb-6 leading-tight">ИЩЕМ ТРЕТЬЕГО В<br/>ОБОЙМУ</h3>
              
              <ul className="text-xs text-[#888] space-y-3 mb-8">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-[#FF5500] mt-1.5"></div> Опыт от 5 лет жесткой практики</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-[#FF5500] mt-1.5"></div> Твердые навыки без дрожи в руках</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-[#FF5500] mt-1.5"></div> Свой заточенный инструмент</li>
              </ul>

              <div className="bg-[#111] p-4 text-[10px] text-[#888] border-l-2 border-[#FF5500] mb-8 italic">
                * ТОЛЬКО С ОПЫТОМ В ОПАСНОМ БРИТЬЕ.<br/>ПРИХОДИ СО СВОИМ ИНСТРУМЕНТОМ — ПОКАЖИ, ЧЕГО ТЫ СТОИШЬ.*
              </div>
              
              <div className="flex items-center justify-between border-t border-[#FF5500]/30 pt-4 mt-auto">
                <div className="text-[10px] text-[#FF5500]">ПРИСЛАТЬ РАБОТЫ:</div>
                <a href="mailto:job@steelblade.ru" className="btn-glitch-green bg-[#C6FF00] text-black font-bold text-xs px-6 py-2 border border-[#C6FF00] hover:bg-black hover:text-[#C6FF00]">НАПИСАТЬ В ЦЕХ</a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pricing */}
        <section id="price" className="mb-32">
          <div className="mb-8">
            <p className="text-[#FF5500] text-[10px] font-bold uppercase mb-2">/ SPECIFICATION SHEET / ГОСТ-ПРАЙС /</p>
            <h2 className="font-oswald text-4xl md:text-5xl uppercase text-white">
              <span className="text-[#C6FF00]">// 02.</span> ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ &amp; ПРАЙС-ЛИСТ
            </h2>
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mt-4 border-b border-[#333] pb-4 gap-4">
              <p className="text-[#888] text-xs">Фиксированный тариф. Без скрытых доплат за укладку, мытье, кофе и баланс.</p>
              <div className="text-[10px] bg-[#111] border border-[#333] px-4 py-2 uppercase">
                ВАЛЮТА: ГРИВНЯ<br/>[UAH]
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap md:whitespace-normal">
              <thead>
                <tr className="bg-[#111] text-[#888] text-[10px] uppercase border border-[#333]">
                  <th className="p-4 font-normal">КОД</th>
                  <th className="p-4 font-normal">НАИМЕНОВАНИЕ ОПЕРАЦИИ</th>
                  <th className="p-4 font-normal hidden md:table-cell">ТЕХНОЛОГИЧЕСКИЙ ПРОТОКОЛ</th>
                  <th className="p-4 font-normal text-center">ТАЙМИНГ</th>
                  <th className="p-4 font-normal text-right">СТОИМОСТЬ</th>
                </tr>
              </thead>
              <tbody className="border-x border-b border-[#333] divide-y divide-[#333]">
                <tr className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-[#C6FF00] font-bold">[SS-01]</td>
                  <td className="p-4 font-oswald text-lg md:text-xl uppercase group-hover:text-[#FF5500] transition-colors">МУЖСКАЯ СТРИЖКА</td>
                  <td className="p-4 text-[#888] text-[10px] hidden md:table-cell max-w-sm whitespace-normal">Мытье головы до/после, работа ножницами и машинкой, укладка классикой, глиной или кремом.</td>
                  <td className="p-4 text-center text-[#C6FF00]">45 МИН</td>
                  <td className="p-4 text-right font-oswald text-xl text-[#FF5500]">1 200 ₴</td>
                </tr>
                <tr className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-[#C6FF00] font-bold">[BR-01]</td>
                  <td className="p-4 font-oswald text-lg md:text-xl uppercase group-hover:text-[#FF5500] transition-colors">МОДЕЛИРОВАНИЕ БОРОДЫ</td>
                  <td className="p-4 text-[#888] text-[10px] hidden md:table-cell max-w-sm whitespace-normal">Распаривание кожи, снятие длины машинкой, геометрия формы триммером и ножницами, опасное лезвие.</td>
                  <td className="p-4 text-center text-[#C6FF00]">40 МИН</td>
                  <td className="p-4 text-right font-oswald text-xl text-[#FF5500]">800 ₴</td>
                </tr>
                <tr className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-[#FF5500] font-bold">[CB-01]</td>
                  <td className="p-4 font-oswald text-lg md:text-xl uppercase group-hover:text-[#FF5500] transition-colors">КОМПЛЕКС [СТРИЖКА + БОРОДА]</td>
                  <td className="p-4 text-[#888] text-[10px] hidden md:table-cell max-w-sm whitespace-normal">Полный цикл обслуживания. Идеальная синхронизация линий головы и бороды в один цикл.</td>
                  <td className="p-4 text-center text-[#C6FF00]">75 МИН</td>
                  <td className="p-4 text-right font-oswald text-xl text-[#FF5500]">1 800 ₴</td>
                </tr>
                <tr className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-[#C6FF00] font-bold">[SH-01]</td>
                  <td className="p-4 font-oswald text-lg md:text-xl uppercase group-hover:text-[#FF5500] transition-colors">КОРОЛЕВСКОЕ ОПАСНОЕ БРИТЬЕ</td>
                  <td className="p-4 text-[#888] text-[10px] hidden md:table-cell max-w-sm whitespace-normal">Двойной горячий компресс, взбитая пена из помазка барсука, холодный компресс, лосьон.</td>
                  <td className="p-4 text-center text-[#C6FF00]">50 МИН</td>
                  <td className="p-4 text-right font-oswald text-xl text-[#FF5500]">1 000 ₴</td>
                </tr>
                <tr className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="p-4 text-[#C6FF00] font-bold">[SH-02]</td>
                  <td className="p-4 font-oswald text-lg md:text-xl uppercase group-hover:text-[#FF5500] transition-colors">СБРИВАНИЕ ПОД НОЛЬ / НАЛЫСО</td>
                  <td className="p-4 text-[#888] text-[10px] hidden md:table-cell max-w-sm whitespace-normal">Шейвер + финальное опасное лезвие. Обработка антисептическим лосьоном.</td>
                  <td className="p-4 text-center text-[#C6FF00]">45 МИН</td>
                  <td className="p-4 text-right font-oswald text-xl text-[#FF5500]">700 ₴</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 border border-[#FF5500] bg-[#FF5500]/5 p-4 flex gap-4 items-start">
            <ShieldAlert className="text-[#FF5500] shrink-0" />
            <div>
              <p className="text-[#FF5500] font-bold text-xs uppercase mb-1">ЖЕСТКИЙ РЕГЛАМЕНТ ПО ВРЕМЕНИ</p>
              <p className="text-[10px] text-[#888] uppercase">ВНИМАНИЕ: ОПОЗДАНИЕ БОЛЕЕ ЧЕМ НА 15 МИНУТ АННУЛИРУЕТ БРОНЬ БЕЗ ВОЗВРАТА СЛОТА. МЫ ЦЕНИМ ВРЕМЯ СЛЕДУЮЩЕГО ГОСТЯ И СВОЙ ИНСТРУМЕНТ.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Booking Form */}
        <section id="booking" className="mb-32">
          <div className="mb-8">
            <p className="text-[#C6FF00] text-[10px] font-bold uppercase mb-2">/ TERMINAL / БРОНИРОВАНИЕ СЛОТА /</p>
            <h2 className="font-oswald text-4xl md:text-5xl uppercase text-white">
              <span className="text-[#FF5500]">// 03.</span> ЗАХВАТ СЛОТА В ЦЕХЕ
            </h2>
            <div className="border-b border-[#333] pb-4 mt-4">
              <p className="text-[#888] text-xs">Заполни форму без ошибок. Телефония проверится автоматически SMS-шлюзом.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-2 border border-[#FF5500] bg-[#0A0A0A] p-6 md:p-8">
              <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
                <span className="text-xs text-[#888] uppercase">// ЭЛЕКТРОННАЯ ФОРМА СЛОТА</span>
                <span className="text-[10px] text-[#C6FF00] font-bold animate-pulse">TERMINAL: ON-LINE</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div>
                  <label className="block text-[#e0e0e0] font-bold uppercase mb-2">01. ВЫБОР МАСТЕРА:</label>
                  <div className="relative">
                    <select 
                      required
                      value={formState.master}
                      onChange={(e) => setFormState({...formState, master: e.target.value})}
                      className="w-full bg-[#111] border border-[#333] text-white p-4 appearance-none focus:outline-none focus:border-[#FF5500] transition-colors"
                    >
                      <option value="" disabled>ВЫБЕРИ СВОБОДНЫЙ СЛОТ...</option>
                      <option value="1">АРТЁМ «СКАЛЬПЕЛЬ» СИДОРОВ</option>
                      <option value="2">ИЛЬЯ «МОЛОТ» ВОЛКОВ</option>
                      <option value="any">ЛЮБОЙ МАСТЕР (БЛИЖАЙШИЙ СЛОТ)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[#e0e0e0] font-bold uppercase mb-2">02. ТИП ОПЕРАЦИИ:</label>
                  <div className="relative">
                    <select 
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({...formState, service: e.target.value})}
                      className="w-full bg-[#111] border border-[#333] text-white p-4 appearance-none focus:outline-none focus:border-[#FF5500] transition-colors"
                    >
                      <option value="" disabled>ЧТО ДЕЛАЕМ?</option>
                      <option value="cut">МУЖСКАЯ СТРИЖКА // 1 200 ₴</option>
                      <option value="beard">МОДЕЛИРОВАНИЕ БОРОДЫ // 800 ₴</option>
                      <option value="combo">КОМПЛЕКС [СТРИЖКА + БОРОДА] // 1 800 ₴</option>
                      <option value="shave">КОРОЛЕВСКОЕ ОПАСНОЕ БРИТЬЕ // 1 000 ₴</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#e0e0e0] font-bold uppercase mb-2">03. ДАТА ВИЗИТА:</label>
                    <input 
                      type="date" 
                      required
                      value={formState.date}
                      onChange={(e) => setFormState({...formState, date: e.target.value})}
                      className="w-full bg-[#111] border border-[#333] text-white p-4 focus:outline-none focus:border-[#FF5500] transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#e0e0e0] font-bold uppercase mb-2">04. НОМЕР СВЯЗИ:</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+380 (__) ___-__-__"
                      value={formState.time}
                      onChange={(e) => setFormState({...formState, time: e.target.value})}
                      className="w-full bg-[#111] border border-[#333] text-white p-4 focus:outline-none focus:border-[#FF5500] transition-colors placeholder:text-[#444]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#333]">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        required
                        checked={formState.accept}
                        onChange={(e) => setFormState({...formState, accept: e.target.checked})}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border transition-colors ${formState.accept ? 'bg-[#FF5500] border-[#FF5500]' : 'border-[#888] group-hover:border-[#FF5500]'}`}></div>
                      {formState.accept && <CheckSquare className="w-5 h-5 absolute text-black pointer-events-none" />}
                    </div>
                    <span className="text-[10px] text-[#888] uppercase leading-relaxed">
                      Ознакомлен с правилами отмены. Понимаю стиль, отвечаю с собой за адекватность, разрешаю применить сталь ко мне.
                    </span>
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || !formState.accept}
                  className={`btn-glitch w-full py-5 px-6 font-oswald text-xl uppercase tracking-wider flex items-center justify-center gap-4 transition-all ${formState.accept ? 'bg-[#FF5500] text-black border border-[#FF5500] hover:bg-black hover:text-[#FF5500]' : 'bg-[#111] text-[#555] border border-[#333] cursor-not-allowed'}`}
                >
                  {isSubmitting ? (
                    "СИНХРОНИЗАЦИЯ..."
                  ) : (
                    <>
                      ПОДТВЕРДИТЬ ВЫБОР И ЗАБРОНИРОВАТЬ
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Side Info */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="border border-[#333] bg-[#111] p-6 min-h-[200px] flex flex-col">
                <div className="flex justify-between items-center mb-auto">
                  <span className="text-[10px] font-bold text-[#888] uppercase">[ФАЙЛ // ПОЗИЦИЯ - 1 УГОЛ]</span>
                  <span className="text-[10px] text-[#C6FF00]">АРТ: 03-7412_ 22 БИТА</span>
                </div>
                
                <p className="text-[10px] text-[#888] uppercase mt-12 border-t border-[#333] pt-4">
                  ПРОЕЗД: ВЪЕЗД ПОД ЧЕРНЫЙ ШЛАГБАУМ БЫВШЕЙ ФАБРИКИ, ВНИЗ В АРКУ, ЖЕЛЕЗНАЯ ДВЕРЬ С ТАБЛИЧКОЙ "СТАЛЬ".
                </p>
              </div>
              
              <div className="border border-[#333] bg-[#0A0A0A] p-6">
                <h4 className="font-oswald text-xl uppercase mb-4 text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF5500]"></div> МАНИФЕСТ ЖЕЛЕЗА
                </h4>
                <p className="text-[10px] text-[#888] leading-relaxed mb-4 text-justify">
                  Мы не продаем "элитный сервис для джентльменов". Мы срезаем лишнее, правим бороды и держим сталь острой как бритва на подшипниках. Ты пришел за формой — ты её получишь.
                </p>
                <div className="flex justify-between items-center text-[10px] text-[#555] border-t border-[#333] pt-4 uppercase">
                  <span>СТАБИЛЬНОСТЬ: 100%</span>
                  <span>СТАЛЬ И ЛЕЗВИЕ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* Footer Banner */}
      <div className="h-4 w-full bg-[repeating-linear-gradient(45deg,#FF5500,#FF5500_10px,#0A0A0A_10px,#0A0A0A_20px)] border-y border-[#333]"></div>

      {/* Footer */}
      <footer id="contact" className="max-w-[1400px] mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-[#333] pb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="text-white hover:text-[#FF5500] transition-colors flex items-center gap-2 mb-6">
              <Scissors className="w-8 h-8 text-[#FF5500] -rotate-90" />
              <span className="font-oswald text-2xl uppercase leading-none">СТАЛЬ &amp;<br/>ЛЕЗВИЕ</span>
            </Link>
            <p className="text-[10px] text-[#888] leading-relaxed uppercase mb-6">
              Подземный мужской клуб и рабочая станция жестких стрижек. Никаких компромиссов, никакого лишнего лоска.
            </p>
            <div className="text-[10px] font-bold text-[#FF5500] border border-[#333] px-3 py-1 inline-block bg-[#111]">
              ХОСТ // СЕРВЕР-ЦР 21
            </div>
          </div>
          
          <div>
            <p className="text-[10px] text-[#FF5500] font-bold uppercase mb-4">[ЛОКАЦИЯ]</p>
            <p className="text-xs text-white mb-2 font-bold uppercase">Київ, вул. Нижній Вал, 15</p>
            <p className="text-[10px] text-[#888] uppercase leading-relaxed">
              Подземный уровень (-1 эт.)<br/>
              Парковка: въезд под шлагбаум звонком.
            </p>
          </div>

          <div>
            <p className="text-[10px] text-[#FF5500] font-bold uppercase mb-4">[СВЯЗЬ & СЕТЬ]</p>
            <p className="font-oswald text-2xl text-white mb-2">+380 (44) 660-94-21</p>
            <p className="text-[10px] text-[#888] uppercase mb-4">
              Единый шлюз связи. Telegram - 24/7/365.
            </p>
            <a href="#" className="text-[10px] text-white hover:text-[#FF5500] uppercase font-bold transition-colors">
              @STEEL_RAZOR_BOT ↗
            </a>
          </div>

          <div>
            <p className="text-[10px] text-[#FF5500] font-bold uppercase mb-4">[СТАТУС ЦЕХА]</p>
            <div className="border border-[#333] bg-[#111] p-4 flex flex-col h-[100px]">
              <div className="flex items-center gap-2 text-white font-bold text-lg uppercase font-oswald">
                <div className="w-3 h-3 bg-[#C6FF00] animate-pulse"></div> ОТКРЫТО СЕЙЧАС
              </div>
              <div className="mt-auto text-[10px] text-[#888] uppercase">
                СТЕРИЛИЗАЦИЯ ИНСТРУМЕНТА:<br/>НОЧЬЮ В / ГЛУХОЙ ПУСТОТЕ
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-[#555] uppercase font-bold gap-4">
          <p>© 2026 СТАЛЬ &amp; ЛЕЗВИЕ. БЕЗ КОМПРОМИССОВ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
          <p className="flex items-center gap-2">INDUSTRIAL BRUTALISM ENGINE <ShieldAlert className="w-3 h-3" /></p>
        </div>
      </footer>
    </div>
  );
}
