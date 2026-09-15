import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
  type PortfolioData,
  type LandingProject,
  type BotProject,
  type AutomationProject,
  type AutomationStep,
  type BotMessage,
  type MultilingualText,
} from "../lib/portfolio-store";
import { 
  Lock,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  LogOut,
  ChevronLeft,
  Settings,
  FolderOpen,
  Smartphone,
  Cpu,
  Globe,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const DEFAULT_PASSWORD = "admin";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState<"landings" | "bots" | "automations">("landings");

  // Authentication check on load
  useEffect(() => {
    const auth = sessionStorage.getItem("alex_voloshyn_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      setData(loadPortfolioData());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("alex_voloshyn_admin_auth", "true");
      setData(loadPortfolioData());
      setError("");
    } else {
      setError("Неверный пароль");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("alex_voloshyn_admin_auth");
  };

  const handleSave = (newData: PortfolioData) => {
    savePortfolioData(newData);
    setData({ ...newData });
    alert("Данные портфолио успешно сохранены!");
  };

  const handleReset = () => {
    if (confirm("Вы уверены, что хотите сбросить все элементы портфолио к первоначальным настройкам?")) {
      const defaultData = resetPortfolioData();
      setData(defaultData);
      alert("Данные сброшены к значениям по умолчанию.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 font-sans text-foreground antialiased">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Панель управления</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Введите административный пароль, чтобы управлять проектами в портфолио.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="pass" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Пароль администратора
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary">
              <ChevronLeft className="h-4 w-4" /> Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      {/* Admin header */}
      <header className="border-b border-border bg-card/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-tight text-foreground">
              Alex.Voloshyn <span className="text-xs text-primary font-bold ml-1">Админка</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              title="Сбросить все данные к дефолтным"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-input px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <LogOut className="h-3.5 w-3.5" /> Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Управление портфолио</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Редактируйте лендинги, чат-боты и автоматизации, отображаемые клиентам.
            </p>
          </div>

          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary">
            На главную
          </Link>
        </div>

        {/* Section Tabs */}
        <div className="mt-8 flex border-b border-border gap-6">
          <button
            onClick={() => setActiveSection("landings")}
            className={`flex items-center gap-2 pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeSection === "landings" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FolderOpen className="h-4 w-4" /> Лендинги ({data.landings.length})
          </button>
          <button
            onClick={() => setActiveSection("bots")}
            className={`flex items-center gap-2 pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeSection === "bots" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="h-4 w-4" /> Telegram-боты ({data.bots.length})
          </button>
          <button
            onClick={() => setActiveSection("automations")}
            className={`flex items-center gap-2 pb-4 text-sm font-semibold border-b-2 transition-colors ${
              activeSection === "automations" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Cpu className="h-4 w-4" /> Автоматизации ({data.automations.length})
          </button>
        </div>

        {/* Editor Form Blocks */}
        <div className="mt-8">
          {activeSection === "landings" && (
            <LandingsEditor
              landings={data.landings}
              onSave={(items) => handleSave({ ...data, landings: items })}
            />
          )}
          {activeSection === "bots" && (
            <BotsEditor
              bots={data.bots}
              onSave={(items) => handleSave({ ...data, bots: items })}
            />
          )}
          {activeSection === "automations" && (
            <AutomationsEditor
              automations={data.automations}
              onSave={(items) => handleSave({ ...data, automations: items })}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-EDITORS
// ---------------------------------------------------------------------------

interface MultilingualInputProps {
  label: string;
  values: MultilingualText;
  onChange: (lang: keyof MultilingualText, val: string) => void;
  textarea?: boolean;
  rows?: number;
}

function MultilingualInput({ label, values, onChange, textarea = false, rows = 3 }: MultilingualInputProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/80 bg-secondary/20 p-4">
      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="grid gap-3 sm:grid-cols-3">
        {/* EN */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60">
            <Globe className="h-3 w-3" /> EN (Английский)
          </div>
          {textarea ? (
            <textarea
              value={values.en}
              onChange={(e) => onChange("en", e.target.value)}
              rows={rows}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          ) : (
            <input
              type="text"
              value={values.en}
              onChange={(e) => onChange("en", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          )}
        </div>

        {/* UK */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60">
            <Globe className="h-3 w-3" /> UK (Украинский)
          </div>
          {textarea ? (
            <textarea
              value={values.uk}
              onChange={(e) => onChange("uk", e.target.value)}
              rows={rows}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          ) : (
            <input
              type="text"
              value={values.uk}
              onChange={(e) => onChange("uk", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          )}
        </div>

        {/* RU */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/60">
            <Globe className="h-3 w-3" /> RU (Русский)
          </div>
          {textarea ? (
            <textarea
              value={values.ru}
              onChange={(e) => onChange("ru", e.target.value)}
              rows={rows}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          ) : (
            <input
              type="text"
              value={values.ru}
              onChange={(e) => onChange("ru", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// LANDINGS EDITOR
function LandingsEditor({ landings, onSave }: { landings: LandingProject[]; onSave: (items: LandingProject[]) => void }) {
  const [items, setItems] = useState<LandingProject[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => setItems([...landings]), [landings]);

  const handleUpdate = (idx: number, field: keyof LandingProject, val: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    setItems(next);
  };

  const handleTextUpdate = (idx: number, field: "title" | "description", lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    const prevText = next[idx][field];
    next[idx] = { ...next[idx], [field]: { ...prevText, [lang]: val } };
    setItems(next);
  };

  const handleAdd = () => {
    const newItem: LandingProject = {
      id: "landing-" + Date.now(),
      imageKey: "projectMonolith",
      previewImage: "/thumb-kinetic.png",
      title: { en: "New Awesome Project", uk: "Новий крутий проєкт", ru: "Новый крутой проект" },
      description: { en: "High-conversion landing page", uk: "Лендінг з високою конверсією", ru: "Лендинг с высокой конверсией" },
      tags: ["React", "Tailwind", "Vite"],
      url: "https://t.me/tugar1n11",
    };
    setItems([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Точно удалить этот проект?")) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  const moveItem = (idx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx + dir < 0 || idx + dir >= items.length) return;
    const next = [...items];
    const temp = next[idx];
    next[idx] = next[idx + dir];
    next[idx + dir] = temp;
    setItems(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        
        return (
          <div key={item.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300">
            {/* Header */}
            <div 
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex flex-col gap-1 items-center bg-secondary/50 rounded-lg p-1 shrink-0">
                  <button onClick={(e) => moveItem(idx, -1, e)} className="hover:text-primary p-0.5"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={(e) => moveItem(idx, 1, e)} className="hover:text-primary p-0.5"><ChevronDown className="h-4 w-4" /></button>
                </div>
                <div className="hidden sm:flex h-12 w-20 shrink-0 rounded-md bg-secondary items-center justify-center overflow-hidden border border-border">
                  {item.previewImage ? (
                    <img src={item.previewImage} alt="preview" className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="truncate">
                  <h3 className="font-bold text-foreground truncate">{item.title.ru || "Без названия"}</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{item.description.ru}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => handleDelete(idx, e)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                  title="Удалить"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {isExpanded && (
              <div className="p-4 sm:p-6 border-t border-border bg-secondary/10 flex flex-col gap-6">
                <MultilingualInput label="Название проекта" values={item.title} onChange={(lang, val) => handleTextUpdate(idx, "title", lang, val)} />
                <MultilingualInput label="Описание проекта" values={item.description} onChange={(lang, val) => handleTextUpdate(idx, "description", lang, val)} textarea rows={2} />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">Изображение (URL)</label>
                    <input type="text" placeholder="/thumb-kinetic.png" value={item.previewImage || ""} onChange={(e) => handleUpdate(idx, "previewImage", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">Резервный шаблон</label>
                    <select value={item.imageKey} onChange={(e) => handleUpdate(idx, "imageKey", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none">
                      <option value="projectFood">Доставка еды</option>
                      <option value="projectBooking">Клиника</option>
                      <option value="projectConstruction">Стройка</option>
                      <option value="projectMonolith">Архитектура</option>
                      <option value="projectBarber">Барбершоп</option>
                      <option value="projectCrm">CRM</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">Теги (запятая)</label>
                    <input type="text" value={item.tags.join(", ")} onChange={(e) => handleUpdate(idx, "tags", e.target.value.split(",").map(t => t.trim()))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">URL проекта</label>
                    <input type="text" value={item.url} onChange={(e) => handleUpdate(idx, "url", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex gap-4 mt-2">
        <button onClick={handleAdd} className="flex-1 border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all font-semibold bg-card"><PlusCircle className="h-5 w-5" /> Добавить новую работу</button>
        <button onClick={() => onSave(items)} className="rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] flex items-center gap-2 shadow-lg shadow-primary/20"><Save className="h-5 w-5" /> Сохранить изменения</button>
      </div>
    </div>
  );
}

// BOTS EDITOR
function BotsEditor({ bots, onSave }: { bots: BotProject[]; onSave: (items: BotProject[]) => void }) {
  const [items, setItems] = useState<BotProject[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => setItems([...bots]), [bots]);

  const handleUpdate = (idx: number, field: keyof BotProject, val: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    setItems(next);
  };

  const handleTextUpdate = (idx: number, field: "title" | "description", lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: { ...next[idx][field], [lang]: val } };
    setItems(next);
  };

  const handleAdd = () => {
    const newItem: BotProject = {
      id: "bot-" + Date.now(),
      title: { en: "New Bot", uk: "Новий бот", ru: "Новый бот" },
      description: { en: "Bot description", uk: "Опис бота", ru: "Описание бота" },
      tags: ["Python", "Telegram API"],
      url: "https://t.me/tugar1n11",
      messages: [
        { isBot: false, text: { en: "Hi!", uk: "Привіт!", ru: "Привет!" } },
        { isBot: true, text: { en: "How can I help you?", uk: "Чим допомогти?", ru: "Чем помочь?" } },
      ],
      buttons: [
        { label: { en: "Help", uk: "Допомога", ru: "Помощь" }, botReply: { en: "How can I help you?", uk: "Чим я можу допомогти?", ru: "Чем я могу помочь?" } },
      ],
    };
    setItems([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Точно удалить этот чат-бот?")) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  const moveItem = (idx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx + dir < 0 || idx + dir >= items.length) return;
    const next = [...items];
    const temp = next[idx];
    next[idx] = next[idx + dir];
    next[idx + dir] = temp;
    setItems(next);
  };

  const handleMessageUpdate = (botIdx: number, msgIdx: number, field: keyof BotMessage, lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    const prevMsg = next[botIdx].messages[msgIdx];
    if (field === "text") {
      next[botIdx].messages[msgIdx] = { ...prevMsg, text: { ...prevMsg.text, [lang]: val } };
    }
    setItems(next);
  };

  const toggleMsgSender = (botIdx: number, msgIdx: number) => {
    const next = [...items];
    next[botIdx].messages[msgIdx].isBot = !next[botIdx].messages[msgIdx].isBot;
    setItems(next);
  };

  const addMessage = (botIdx: number) => {
    const next = [...items];
    next[botIdx].messages.push({ isBot: false, text: { en: "New Message", uk: "Нове повідомлення", ru: "Новое сообщение" } });
    setItems(next);
  };

  const deleteMessage = (botIdx: number, msgIdx: number) => {
    const next = [...items];
    next[botIdx].messages = next[botIdx].messages.filter((_, i) => i !== msgIdx);
    setItems(next);
  };

  const handleButtonUpdate = (botIdx: number, btnIdx: number, field: "label" | "botReply", lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    const prevBtn = next[botIdx].buttons[btnIdx];
    next[botIdx].buttons[btnIdx] = { ...prevBtn, [field]: { ...prevBtn[field], [lang]: val } };
    setItems(next);
  };

  const addButton = (botIdx: number) => {
    const next = [...items];
    next[botIdx].buttons.push({
      label: { en: "Button", uk: "Кнопка", ru: "Кнопка" },
      botReply: { en: "Bot Reply", uk: "Відповідь бота", ru: "Ответ бота" },
    });
    setItems(next);
  };

  const deleteButton = (botIdx: number, btnIdx: number) => {
    const next = [...items];
    next[botIdx].buttons = next[botIdx].buttons.filter((_, i) => i !== btnIdx);
    setItems(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={item.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300">
            {/* Header */}
            <div 
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex flex-col gap-1 items-center bg-secondary/50 rounded-lg p-1 shrink-0">
                  <button onClick={(e) => moveItem(idx, -1, e)} className="hover:text-primary p-0.5"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={(e) => moveItem(idx, 1, e)} className="hover:text-primary p-0.5"><ChevronDown className="h-4 w-4" /></button>
                </div>
                <div className="hidden sm:flex h-12 w-12 shrink-0 rounded-full bg-primary/10 items-center justify-center text-primary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div className="truncate">
                  <h3 className="font-bold text-foreground truncate">{item.title.ru || "Без названия"}</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{item.description.ru}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => handleDelete(idx, e)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                  title="Удалить"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {isExpanded && (
              <div className="p-4 sm:p-6 border-t border-border bg-secondary/10 flex flex-col gap-6">
                <MultilingualInput label="Название бота" values={item.title} onChange={(lang, val) => handleTextUpdate(idx, "title", lang, val)} />
                <MultilingualInput label="Описание бота" values={item.description} onChange={(lang, val) => handleTextUpdate(idx, "description", lang, val)} textarea rows={2} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">Теги (запятая)</label>
                    <input type="text" value={item.tags.join(", ")} onChange={(e) => handleUpdate(idx, "tags", e.target.value.split(",").map(t => t.trim()))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">URL бота</label>
                    <input type="text" value={item.url} onChange={(e) => handleUpdate(idx, "url", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                </div>

                {/* Messages Editor */}
                <div className="border-t border-border pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Имитация переписки в чате</span>
                  <div className="flex flex-col gap-4">
                    {item.messages.map((msg, msgIdx) => (
                      <div key={msgIdx} className="rounded-xl border border-border/80 bg-background/40 p-4 relative">
                        <button onClick={() => deleteMessage(idx, msgIdx)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold text-muted-foreground">Сообщение #{msgIdx + 1}</span>
                          <button onClick={() => toggleMsgSender(idx, msgIdx)} className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase ${msg.isBot ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-muted-foreground"}`}>
                            {msg.isBot ? "Отправитель: Бот 🤖" : "Отправитель: Юзер 👤"}
                          </button>
                        </div>
                        <MultilingualInput label="Текст сообщения" values={msg.text} onChange={(lang, val) => handleMessageUpdate(idx, msgIdx, "text", lang, val)} />
                      </div>
                    ))}
                    <button onClick={() => addMessage(idx)} className="self-start rounded-lg border border-dashed border-border px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary transition-all">
                      + Добавить сообщение
                    </button>
                  </div>
                </div>

                {/* Buttons Editor */}
                <div className="border-t border-border pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Кнопки клавиатуры</span>
                  <div className="flex flex-col gap-4">
                    {item.buttons.map((btn, btnIdx) => (
                      <div key={btnIdx} className="relative flex flex-col gap-4 rounded-xl border border-border/80 bg-background/40 p-4">
                        <button onClick={() => deleteButton(idx, btnIdx)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        <span className="text-xs font-bold text-muted-foreground">Кнопка #{btnIdx + 1}</span>
                        <MultilingualInput label="Текст кнопки" values={btn.label} onChange={(lang, val) => handleButtonUpdate(idx, btnIdx, "label", lang, val)} />
                        <MultilingualInput label="Ответ бота" values={btn.botReply} onChange={(lang, val) => handleButtonUpdate(idx, btnIdx, "botReply", lang, val)} />
                      </div>
                    ))}
                    <button onClick={() => addButton(idx)} className="self-start rounded-lg border border-dashed border-border px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary transition-all">
                      + Добавить кнопку
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex gap-4 mt-2">
        <button onClick={handleAdd} className="flex-1 border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all font-semibold bg-card"><PlusCircle className="h-5 w-5" /> Добавить чат-бот</button>
        <button onClick={() => onSave(items)} className="rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] flex items-center gap-2 shadow-lg shadow-primary/20"><Save className="h-5 w-5" /> Сохранить изменения</button>
      </div>
    </div>
  );
}



// AUTOMATIONS EDITOR
function AutomationsEditor({ automations, onSave }: { automations: AutomationProject[]; onSave: (items: AutomationProject[]) => void }) {
  const [items, setItems] = useState<AutomationProject[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => setItems([...automations]), [automations]);

  const handleUpdate = (idx: number, field: keyof AutomationProject, val: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    setItems(next);
  };

  const handleTextUpdate = (idx: number, field: "title" | "description" | "result", lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: { ...next[idx][field], [lang]: val } };
    setItems(next);
  };

  const handleAdd = () => {
    const newItem: AutomationProject = {
      id: "auto-" + Date.now(),
      title: { en: "New Flow", uk: "Новий потік", ru: "Новый поток" },
      description: { en: "Flow description", uk: "Опис потоку", ru: "Описание потока" },
      tags: ["Zapier", "Webhooks"],
      result: { en: "Result EN", uk: "Результат UK", ru: "Результат RU" },
      url: "https://t.me/tugar1n11",
      steps: [{ iconType: "list", name: { en: "Trigger", uk: "Тригер", ru: "Триггер" }, source: { en: "Webhook", uk: "Вебхук", ru: "Вебхук" } }],
    };
    setItems([newItem, ...items]);
    setExpandedId(newItem.id);
  };

  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Точно удалить этот процесс автоматизации?")) {
      setItems(items.filter((_, i) => i !== idx));
    }
  };

  const moveItem = (idx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx + dir < 0 || idx + dir >= items.length) return;
    const next = [...items];
    const temp = next[idx];
    next[idx] = next[idx + dir];
    next[idx + dir] = temp;
    setItems(next);
  };

  const handleStepUpdate = (autoIdx: number, stepIdx: number, field: keyof AutomationStep, lang: keyof MultilingualText, val: string) => {
    const next = [...items];
    const prevStep = next[autoIdx].steps[stepIdx];
    if (field === "name" || field === "source") {
      next[autoIdx].steps[stepIdx] = { ...prevStep, [field]: { ...prevStep[field], [lang]: val } };
    }
    setItems(next);
  };

  const handleStepIconChange = (autoIdx: number, stepIdx: number, val: any) => {
    const next = [...items];
    next[autoIdx].steps[stepIdx].iconType = val;
    setItems(next);
  };

  const addStep = (autoIdx: number) => {
    const next = [...items];
    next[autoIdx].steps.push({ iconType: "plug", name: { en: "Action", uk: "Дія", ru: "Действие" }, source: { en: "Service", uk: "Сервіс", ru: "Сервис" } });
    setItems(next);
  };

  const deleteStep = (autoIdx: number, stepIdx: number) => {
    const next = [...items];
    next[autoIdx].steps = next[autoIdx].steps.filter((_, i) => i !== stepIdx);
    setItems(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isExpanded = expandedId === item.id;
        return (
          <div key={item.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden transition-all duration-300">
            {/* Header */}
            <div 
              className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-colors"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="flex flex-col gap-1 items-center bg-secondary/50 rounded-lg p-1 shrink-0">
                  <button onClick={(e) => moveItem(idx, -1, e)} className="hover:text-primary p-0.5"><ChevronUp className="h-4 w-4" /></button>
                  <button onClick={(e) => moveItem(idx, 1, e)} className="hover:text-primary p-0.5"><ChevronDown className="h-4 w-4" /></button>
                </div>
                <div className="hidden sm:flex h-12 w-12 shrink-0 rounded-full bg-primary/10 items-center justify-center text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="truncate">
                  <h3 className="font-bold text-foreground truncate">{item.title.ru || "Без названия"}</h3>
                  <p className="text-xs text-muted-foreground mt-1 truncate">{item.description.ru}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => handleDelete(idx, e)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                  title="Удалить"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            {isExpanded && (
              <div className="p-4 sm:p-6 border-t border-border bg-secondary/10 flex flex-col gap-6">
                <MultilingualInput label="Название процесса" values={item.title} onChange={(lang, val) => handleTextUpdate(idx, "title", lang, val)} />
                <MultilingualInput label="Описание процесса" values={item.description} onChange={(lang, val) => handleTextUpdate(idx, "description", lang, val)} textarea rows={2} />
                <MultilingualInput label="Ключевой результат (B2B ROI)" values={item.result} onChange={(lang, val) => handleTextUpdate(idx, "result", lang, val)} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">Теги (запятая)</label>
                    <input type="text" value={item.tags.join(", ")} onChange={(e) => handleUpdate(idx, "tags", e.target.value.split(",").map(t => t.trim()))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-muted-foreground uppercase">URL демо</label>
                    <input type="text" value={item.url} onChange={(e) => handleUpdate(idx, "url", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none" />
                  </div>
                </div>

                {/* Steps Editor */}
                <div className="border-t border-border pt-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Шаги пайплайна (Интеграции)</span>
                  <div className="flex flex-col gap-4">
                    {item.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="rounded-xl border border-border/80 bg-background/40 p-4 relative flex flex-col gap-4">
                        <button onClick={() => deleteStep(idx, stepIdx)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-muted-foreground">Шаг #{stepIdx + 1}</span>
                          <select value={step.iconType} onChange={(e) => handleStepIconChange(idx, stepIdx, e.target.value)} className="rounded-md border border-input bg-background px-2 py-1 text-[10px] text-foreground focus:border-primary">
                            <option value="list">list (Анкета)</option>
                            <option value="plug">plug (Коннектор)</option>
                            <option value="database">database (База данных)</option>
                            <option value="send">send (Отправка)</option>
                            <option value="check">check (Проверка)</option>
                            <option value="mail">mail (Почта)</option>
                            <option value="rocket">rocket (Запуск)</option>
                          </select>
                        </div>
                        <MultilingualInput label="Название шага" values={step.name} onChange={(lang, val) => handleStepUpdate(idx, stepIdx, "name", lang, val)} />
                        <MultilingualInput label="Название сервиса (например, Make.com)" values={step.source} onChange={(lang, val) => handleStepUpdate(idx, stepIdx, "source", lang, val)} />
                      </div>
                    ))}
                    <button onClick={() => addStep(idx)} className="self-start rounded-lg border border-dashed border-border px-4 py-2 text-xs text-muted-foreground hover:text-primary hover:border-primary transition-all">
                      + Добавить шаг
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex gap-4 mt-2">
        <button onClick={handleAdd} className="flex-1 border-2 border-dashed border-border rounded-xl py-4 flex items-center justify-center gap-2 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all font-semibold bg-card"><PlusCircle className="h-5 w-5" /> Добавить автоматизацию</button>
        <button onClick={() => onSave(items)} className="rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.02] flex items-center gap-2 shadow-lg shadow-primary/20"><Save className="h-5 w-5" /> Сохранить изменения</button>
      </div>
    </div>
  );
}

