// ---------------------------------------------------------------------------
// Portfolio Data Store
// ---------------------------------------------------------------------------

export interface MultilingualText {
  en: string;
  uk: string;
  ru: string;
}

export interface LandingProject {
  id: string;
  imageKey: "projectFood" | "projectBooking" | "projectConstruction" | "projectMonolith" | "projectBarber" | "projectCrm";
  title: MultilingualText;
  description: MultilingualText;
  tags: string[];
  url: string;
  metrics?: MultilingualText;
  previewImage?: string;
}

export interface BotMessage {
  isBot: boolean;
  text: MultilingualText;
}

export interface BotButton {
  label: MultilingualText;
  botReply: MultilingualText;
}

export interface BotProject {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  tags: string[];
  url: string;
  messages: BotMessage[];
  buttons: BotButton[];
}

export interface AutomationStep {
  iconType: "list" | "plug" | "database" | "send" | "check" | "mail" | "rocket";
  name: MultilingualText;
  source: MultilingualText;
}

export interface AutomationProject {
  id: string;
  title: MultilingualText;
  description: MultilingualText;
  tags: string[];
  result: MultilingualText;
  url: string;
  steps: AutomationStep[];
}

export interface PortfolioData {
  landings: LandingProject[];
  bots: BotProject[];
  automations: AutomationProject[];
}

const STORAGE_KEY = "alex_voloshyn_portfolio_data_v15";

// ---------------------------------------------------------------------------
// Default Multilingual Data (Init State)
// ---------------------------------------------------------------------------
export const defaultPortfolioData: PortfolioData = {
  landings: [
    {
      id: "landing-kinetic",
      imageKey: "projectMonolith",
      title: {
        en: "Kinetic Lab - Design Masterclass",
        uk: "Kinetic Lab - Авторський курс",
        ru: "Kinetic Lab - Авторский курс",
      },
      description: {
        en: "Immersive online intensive on creative narrative, media art, and generative AI pipelines.",
        uk: "Іммерсивний онлайн-інтенсив з креативного наративу, медіа-арту та генеративних AI-пайплайнів.",
        ru: "Иммерсивный онлайн-интенсив по креативному нарративу, медиа-арту и генеративным AI-пайплайнам.",
      },
      tags: ["React", "Tailwind", "Neon UI"],
      url: "/kinetic-lab",
      metrics: {
        en: "Kinetic Typography",
        uk: "Кінетична Типографіка",
        ru: "Кинетическая Типографика",
      },
      previewImage: "/thumb-kinetic.png"
    },
    {
      id: "landing-monolith",
      imageKey: "projectMonolith",
      title: {
        en: "Swiss Architecture Bureau",
        uk: "Швейцарське архітектурне бюро",
        ru: "Швейцарское архитектурное бюро",
      },
      description: {
        en: "Premium architecture landing page with extreme attention to detail, elegant typography, and minimalistic approach.",
        uk: "Преміальний лендінг для архітектурного бюро з екстремальною увагою до деталей, елегантною типографікою та мінімалістичним підходом.",
        ru: "Премиальный лендинг для архитектурного бюро с экстремальным вниманием к деталям, элегантной типографикой и минималистичным подходом.",
      },
      tags: ["React", "Tailwind CSS", "Premium UI"],
      url: "/monolith-architektur",
      metrics: {
        en: "High-end aesthetic",
        uk: "Преміальна естетика",
        ru: "Премиальная эстетика",
      },
      previewImage: "/thumb-monolith.png",
    },
    {
      id: "landing-steel",
      imageKey: "projectBooking",
      title: {
        en: "Brutalist Barbershop",
        uk: "Брутальний барбершоп",
        ru: "Брутальный барбершоп",
      },
      description: {
        en: "Industrial brutalist design with neon accents, custom marquees, and a rugged masculine aesthetic.",
        uk: "Індустріальний брутальний дизайн з неоновими акцентами, кастомними рухомими рядками та чоловічою естетикою.",
        ru: "Индустриальный брутальный дизайн с неоновыми акцентами, кастомными бегущими строками и мужской эстетикой.",
      },
      tags: ["React", "Tailwind", "Brutalism"],
      url: "/steel-blade",
      metrics: {
        en: "Industrial UI",
        uk: "Індустріальний UI",
        ru: "Индустриальный UI",
      },
      previewImage: "/thumb-steel.png",
    },
    {
      id: "landing-aura",
      imageKey: "projectCrm",
      title: {
        en: "Aura One - Premium Acoustics",
        uk: "Aura One - Преміальна акустика",
        ru: "Aura One - Премиальная акустика",
      },
      description: {
        en: "High-end tactile acoustic speaker landing page with 3D interactions and scroll-driven dissect animations.",
        uk: "Преміальний лендінг тактильної акустики з 3D-взаємодіями та анімаціями розбирання під час скролу.",
        ru: "Премиальный лендинг тактильной акустики с 3D-взаимодействиями и анимациями разборки при скролле.",
      },
      tags: ["React", "Tailwind", "3D Anim"],
      url: "/aura-one",
      metrics: {
        en: "Premium Hardware",
        uk: "Преміум Обладнання",
        ru: "Премиум Оборудование",
      },
      previewImage: "/thumb-aura.png"
    },
    {
      id: "landing-1",
      imageKey: "projectConstruction",
      title: {
        en: "Premier Construct Website",
        uk: "Сайт будівельної компанії",
        ru: "Сайт строительной компании",
      },
      description: {
        en: "Before: Outdated design with high bounce rate. After: Modern, multilingual landing with clear services breakdown. Result: Lead generation increased by 35%.",
        uk: "До: Застарілий дизайн з високим відсотком відмов. Після: Сучасний багатомовний лендінг зі зрозумілим переліком послуг. Результат: Кількість заявок зросла на 35%.",
        ru: "До: Устаревший дизайн с высоким процентом отказов. После: Современный мультиязычный лендинг с понятными услугами. Результат: Количество заявок выросло на 35%.",
      },
      tags: ["React", "i18n", "Tailwind CSS"],
      url: "/construction-landing",
      previewImage: "/thumb-construction.png"
    },
  ],
  bots: [
    {
      id: "bot-1",
      title: {
        en: "Crypto Trading Assistant",
        uk: "Крипто-торговий Bot",
        ru: "Крипто-торговый Bot"
      },
      description: {
        en: "Automated trading bot with real-time price alerts, technical analysis, and portfolio tracking.",
        uk: "Автоматизований торговий бот зі сповіщеннями про ціни, технічним аналізом та відстеженням портфеля.",
        ru: "Автоматизированный торговый бот с оповещениями о ценах, техническим анализом и отслеживанием портфеля."
      },
      tags: ["Node.js", "Telegraf", "Binance API"],
      url: "https://t.me/crypto_portfolio_bot",
      messages: [
        { isBot: false, text: { en: "/portfolio", uk: "/portfolio", ru: "/portfolio" } },
        { isBot: true, text: { en: "💼 Your Portfolio Value: $12,450.00\n\n📈 24h Profit: +$450 (+3.7%)\n🟢 BTC: $64,200\n🟢 ETH: $3,450", uk: "💼 Ваш портфель: $12,450.00\n\n📈 24г Прибуток: +$450 (+3.7%)\n🟢 BTC: $64,200\n🟢 ETH: $3,450", ru: "💼 Ваш портфель: $12,450.00\n\n📈 24ч Прибыль: +$450 (+3.7%)\n🟢 BTC: $64,200\n🟢 ETH: $3,450" } }
      ],
      buttons: [
        { 
          label: { en: "Buy Crypto", uk: "Купити Crypto", ru: "Купить Crypto" }, 
          botReply: { en: "💳 Payment gateway generated! Please follow the secure link to purchase via Stripe:\n👉 buy.crypto.com/pay/abc1234", uk: "💳 Шлюз оплати згенеровано! Перейдіть за захищеним посиланням для оплати через Stripe:\n👉 buy.crypto.com/pay/abc1234", ru: "💳 Шлюз оплаты сгенерирован! Перейдите по защищенной ссылке для оплаты через Stripe:\n👉 buy.crypto.com/pay/abc1234" } 
        },
        { 
          label: { en: "Technical Analysis", uk: "Технічний аналіз", ru: "Технический анализ" }, 
          botReply: { en: "📊 Generating AI technical report...\n\nBTC/USDT:\nRSI: 65 (Neutral/Bullish)\nMACD: Bullish Crossover\nSupport: $62K | Resistance: $68K", uk: "📊 Генерація AI звіту...\n\nBTC/USDT:\nRSI: 65 (Нейтральний/Бичачий)\nMACD: Бичачий перетин\nПідтримка: $62K | Опір: $68K", ru: "📊 Генерация AI отчета...\n\nBTC/USDT:\nRSI: 65 (Нейтральный/Бычий)\nMACD: Бычье пересечение\nПоддержка: $62K | Сопротивление: $68K" } 
        }
      ]
    },
    {
      id: "bot-2",
      title: {
        en: "AI Customer Support",
        uk: "AI Бот підтримки",
        ru: "AI Бот поддержки"
      },
      description: {
        en: "GPT-4 powered customer support bot capable of handling complex queries and CRM integration.",
        uk: "Бот підтримки на базі GPT-4, здатний обробляти складні запити та інтегруватися з CRM.",
        ru: "Бот поддержки на базе GPT-4, способный обрабатывать сложные запросы и интегрироваться с CRM."
      },
      tags: ["Python", "OpenAI API", "Aiogram"],
      url: "https://t.me/ai_support_agent_bot",
      messages: [
        { isBot: false, text: { en: "Where is my order #88492?", uk: "Де моє замовлення #88492?", ru: "Где мой заказ #88492?" } },
        { isBot: true, text: { en: "I found your order! 📦\nIt is currently out for delivery via DHL and should arrive today by 4:00 PM.\n\nTracking PIN: DHL-998822", uk: "Я знайшов ваше замовлення! 📦\nВоно зараз доставляється компанією DHL і прибуде сьогодні до 16:00.\n\nТрек-номер: DHL-998822", ru: "Я нашел ваш заказ! 📦\nОн сейчас доставляется курьером DHL и прибудет сегодня к 16:00.\n\nТрек-номер: DHL-998822" } }
      ],
      buttons: [
        { 
          label: { en: "Track on Map", uk: "На мапі", ru: "На карте" }, 
          botReply: { en: "📍 Opening WebApp tracking map...\nYour driver (Michael) is 3 stops away. Estimated arrival in 14 minutes.", uk: "📍 Відкриваю карту відстеження WebApp...\nВаш водій (Михайло) за 3 зупинки від вас. Орієнтовний час: 14 хвилин.", ru: "📍 Открываю карту отслеживания WebApp...\nВаш курьер (Михаил) находится в 3 остановках от вас. Ориентировочное время: 14 минут." } 
        },
        { 
          label: { en: "Call Operator", uk: "Зв'язок з оператором", ru: "Связь с оператором" }, 
          botReply: { en: "📞 Transferring you to a human agent... Wait time is approximately 2 minutes. Please hold on.", uk: "📞 Перемикаю вас на живого оператора... Приблизний час очікування 2 хвилини. Залишайтесь на зв'язку.", ru: "📞 Переключаю вас на живого оператора... Примерное время ожидания 2 минуты. Оставайтесь на связи." } 
        }
      ]
    }
  ],
  automations: [
    {
      id: "auto-1",
      title: {
        en: "Airtable → CRM Real-Time Sync",
        uk: "Airtable → CRM синхронізація",
        ru: "Airtable → CRM синхронизация",
      },
      description: {
        en: "Two-way sync between Airtable and a custom CRM. Deals, contacts, and invoices always up to date — zero manual updates.",
        uk: "Двостороння синхронізація між Airtable і CRM у реальному часі. Угоди, контакти та рахунки завжди актуальні.",
        ru: "Двусторонняя синхронизация между Airtable и CRM в реальном времени. Сделки, контакты и счета всегда актуальны.",
      },
      tags: ["Airtable", "Webhooks", "Node.js"],
      result: {
        en: "0 manual updates · real-time · no data gaps",
        uk: "0 ручних дій · реальний час · жодних прогалин",
        ru: "0 ручных действий · реальное время · без пробелов",
      },
      url: "https://t.me/tugar1n11",
      steps: [
        {
          iconType: "list",
          name: { en: "New deal", uk: "Нова угода", ru: "Новая сделка" },
          source: { en: "Airtable form", uk: "Форма Airtable", ru: "Форма Airtable" },
        },
        {
          iconType: "plug",
          name: { en: "Webhook fired", uk: "Вебхук спрацював", ru: "Вебхук сработал" },
          source: { en: "Instant trigger", uk: "Миттєвий тригер", ru: "Мгновенный триггер" },
        },
        {
          iconType: "database",
          name: { en: "CRM synced", uk: "CRM оновлено", ru: "CRM обновлена" },
          source: { en: "2-way update", uk: "2-стороння синхр.", ru: "2-сторонняя синхр." },
        },
        {
          iconType: "send",
          name: { en: "Team notified", uk: "Команда сповіщена", ru: "Команда оповещена" },
          source: { en: "Telegram alert", uk: "Telegram-алерт", ru: "Telegram-алерт" },
        },
      ],
    },
    {
      id: "auto-2",
      title: {
        en: "Clinic Booking Pipeline",
        uk: "Пайплайн запису в клініку",
        ru: "Пайплайн записи в клинику",
      },
      description: {
        en: "Intake form → calendar block → confirmation → reminder → follow-up. Fully automated end-to-end, no admin needed.",
        uk: "Анкета → блокування слоту → підтвердження → нагадування → зворотний зв'язок. Повна автоматизація без адміна.",
        ru: "Анкета → блокировка слота → подтверждение → напоминание → обратная связь. Полная автоматизация без администратора.",
      },
      tags: ["Supabase", "Google API", "Zapier"],
      result: {
        en: "–40% no-shows · zero admin · auto follow-ups",
        uk: "–40% пропусків · нуль адміну · авто-фідбек",
        ru: "–40% пропусков · ноль администратора · авто-фидбек",
      },
      url: "https://t.me/tugar1n11",
      steps: [
        {
          iconType: "list",
          name: { en: "Patient fills form", uk: "Пацієнт заповнює анкету", ru: "Пациент заполняет анкету" },
          source: { en: "Bot / Typeform", uk: "Бот / Typeform", ru: "Бот / Typeform" },
        },
        {
          iconType: "check",
          name: { en: "Slot blocked", uk: "Слот заблоковано", ru: "Слот заблокирован" },
          source: { en: "Google Calendar", uk: "Google Calendar", ru: "Google Calendar" },
        },
        {
          iconType: "mail",
          name: { en: "Confirmation sent", uk: "Підтвердження надіслано", ru: "Подтверждение отправлено" },
          source: { en: "Email + Telegram", uk: "Email + Telegram", uk: "Email + Telegram" },
        },
        {
          iconType: "rocket",
          name: { en: "Reminder & follow-up", uk: "Нагадування і фідбек", ru: "Напоминание и фидбек" },
          source: { en: "24h before & after", uk: "За 24г до і після", ru: "За 24ч до и после" },
        },
      ],
    },
  ],
};

// Helper check for browser env
const isBrowser = typeof window !== "undefined";

export function loadPortfolioData(): PortfolioData {
  if (!isBrowser) return defaultPortfolioData;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
    return defaultPortfolioData;
  }
  try {
    const parsed = JSON.parse(stored) as PortfolioData;
    let hasMigration = false;
    if (parsed.bots && Array.isArray(parsed.bots)) {
      parsed.bots = parsed.bots.map((bot) => {
        if (bot.buttons && Array.isArray(bot.buttons)) {
          bot.buttons = bot.buttons.map((btn: any) => {
            // Check if it is the old string dictionary format (e.g. has en/uk/ru directly instead of label property)
            if (btn && !btn.label && (btn.en || btn.uk || btn.ru)) {
              hasMigration = true;
              return {
                label: btn,
                botReply: {
                  en: "Thanks! I've registered your request.",
                  uk: "Дякую! Мій розробник вже отримав запит.",
                  ru: "Спасибо! Мой разработчик уже получил запрос.",
                },
              };
            }
            return btn;
          });
        }
        return bot;
      });
    }
    if (hasMigration) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    console.error("Failed to parse portfolio data from storage, resetting", e);
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetPortfolioData(): PortfolioData {
  if (isBrowser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
  }
  return defaultPortfolioData;
}






