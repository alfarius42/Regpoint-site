import { useState, createContext, useContext, useEffect } from "react";
import {
  Menu, X, ChevronDown, ChevronRight, ArrowRight,
  Check, Shield, Server, Package, MessageCircle,
  Send, FileText, Lock, Users, Clock, Code2, Layers, Zap,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types & Context
// ─────────────────────────────────────────────────────────────
type Lang = "ru" | "en";
type PageId =
  | "home" | "products" | "reg-point" | "promo-point" | "promo-pro"
  | "ticket-point" | "pricing" | "technology" | "compliance"
  | "how-it-works" | "scenarios" | "faq" | "articles" | "contacts" | "privacy";

interface AppCtx {
  lang: Lang; setLang: (l: Lang) => void;
  page: PageId; nav: (p: PageId) => void;
  openContact: () => void; openDemo: () => void;
  articleSlug: string | null; openArticle: (slug: string) => void;
}
const Ctx = createContext<AppCtx>({} as AppCtx);
const useApp = () => useContext(Ctx);

// ─────────────────────────────────────────────────────────────
// Nav labels
// ─────────────────────────────────────────────────────────────
const NAV = {
  ru: {
    brand: "Рег.Поинт", products: "Продукты", pricing: "Цены",
    technology: "Технологии", compliance: "152-ФЗ", howItWorks: "Как работает",
    scenarios: "Сценарии", faq: "FAQ", articles: "Статьи", contacts: "Контакты",
    contact: "Связаться", demo: "Запросить КП / Демо",
    regPoint: "Рег.Поинт", promoPoint: "Промо.Поинт", promoPro: "Промо.Про", ticketPoint: "Тикет.Поинт",
  },
  en: {
    brand: "Reg.Point", products: "Products", pricing: "Pricing",
    technology: "Technology", compliance: "152-FZ", howItWorks: "How It Works",
    scenarios: "Use Cases", faq: "FAQ", articles: "Articles", contacts: "Contacts",
    contact: "Contact", demo: "Request Demo / Quote",
    regPoint: "Reg.Point", promoPoint: "Promo.Point", promoPro: "Promo.Pro", ticketPoint: "Ticket.Point",
  },
};

// ─────────────────────────────────────────────────────────────
// Contact Modal (smart button / умная кнопка)
// ─────────────────────────────────────────────────────────────
function ContactModal({ onClose, onDemo }: { onClose: () => void; onDemo: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white border border-[#b3b3b3] shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#b3b3b3]">
          <h3 className="font-ubuntu text-lg font-bold text-[#243954]">Написать в поддержку</h3>
          <button onClick={onClose} className="text-[#525252] hover:text-[#243954] transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-3">
          <button
            className="w-full flex items-center gap-4 px-4 py-4 border border-[#b3b3b3] hover:border-[#243954] hover:bg-[#e1eff2] transition-colors text-left"
            onClick={() => { alert("Jivo chat (stub): в продакшне откроется виджет Jivo — window.jivo_api.open()"); onClose(); }}
          >
            <MessageCircle size={20} className="text-[#243954] shrink-0" />
            <div><div className="font-medium text-[#243954] text-sm">Онлайн-чат</div><div className="text-xs text-[#525252]">Ответим в рабочее время</div></div>
          </button>
          <button
            className="w-full flex items-center gap-4 px-4 py-4 border border-[#b3b3b3] hover:border-[#243954] hover:bg-[#e1eff2] transition-colors text-left"
            onClick={() => { window.open("https://t.me/regpoint", "_blank"); onClose(); }}
          >
            <Send size={20} className="text-[#243954] shrink-0" />
            <div><div className="font-medium text-[#243954] text-sm">Telegram</div><div className="text-xs text-[#525252]">t.me/regpoint</div></div>
          </button>
          <div className="border-t border-[#b3b3b3] pt-3">
            <p className="text-xs text-[#525252] mb-3">Нужно КП или демо?</p>
            <button
              className="w-full flex items-center gap-4 px-4 py-4 bg-[#243954] text-white hover:bg-[#1a2d43] transition-colors text-left"
              onClick={() => { onClose(); onDemo(); }}
            >
              <FileText size={20} className="shrink-0" />
              <div className="font-medium text-sm">Запросить КП / Демо</div>
            </button>
          </div>
          <p className="text-xs text-[#525252]">Вне рабочих часов — ответим в течение 4 часов в следующий рабочий день</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Demo Form Modal (Jivo stub)
// ─────────────────────────────────────────────────────────────
function DemoModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", module: "", comment: "", consent: false });
  const [sent, setSent] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white border border-[#b3b3b3] shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#b3b3b3] sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-ubuntu text-lg font-bold text-[#243954]">Запросить КП / Демо</h3>
            <p className="text-xs text-[#525252] mt-0.5">Ответим в течение 1–2 рабочих дней</p>
          </div>
          <button onClick={onClose} className="text-[#525252] hover:text-[#243954] transition-colors mt-0.5"><X size={20} /></button>
        </div>
        {sent ? (
          <div className="p-10 text-center">
            <div className="w-14 h-14 bg-[#e1eff2] flex items-center justify-center mx-auto mb-5">
              <Check size={28} className="text-[#243954]" />
            </div>
            <h4 className="font-ubuntu font-bold text-[#243954] text-xl mb-2">Заявка отправлена</h4>
            <p className="text-[#525252] text-sm">Свяжемся с вами в течение 1–2 рабочих дней.</p>
            <p className="text-xs text-[#525252] mt-3 italic">Stub: в продакшне данные обрабатываются через Jivo (РФ, 152-ФЗ)</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-[#243954] text-white font-medium hover:bg-[#1a2d43] transition-colors">Закрыть</button>
          </div>
        ) : (
          <form className="p-6 space-y-4" onSubmit={e => { e.preventDefault(); setSent(true); }}>
            <div className="text-xs text-[#525252] bg-[#f2f2f2] p-3 border-l-2 border-[#243954]">
              <strong>Prototype stub.</strong> В продакшне — embed Jivo Contact Form. Данные в РФ, 152-ФЗ.
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: "Имя *", k: "name", t: "text", r: true }, { l: "Компания *", k: "company", t: "text", r: true }].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">{f.l}</label>
                  <input type={f.t} required={f.r} value={form[f.k as keyof typeof form] as string} onChange={set(f.k)}
                    className="w-full border border-[#b3b3b3] px-3 py-2.5 text-sm focus:outline-none focus:border-[#243954] transition-colors" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ l: "Email *", k: "email", t: "email", r: true }, { l: "Телефон", k: "phone", t: "tel", r: false }].map(f => (
                <div key={f.k}>
                  <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">{f.l}</label>
                  <input type={f.t} required={f.r} value={form[f.k as keyof typeof form] as string} onChange={set(f.k)}
                    className="w-full border border-[#b3b3b3] px-3 py-2.5 text-sm focus:outline-none focus:border-[#243954] transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">Интересующий модуль *</label>
              <select required value={form.module} onChange={set("module")}
                className="w-full border border-[#b3b3b3] px-3 py-2.5 text-sm focus:outline-none focus:border-[#243954] bg-white">
                <option value="">Выберите...</option>
                {["Рег.Поинт", "Промо.Поинт", "Промо.Про", "Тикет.Поинт", "Не знаю"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">Комментарий</label>
              <textarea rows={3} value={form.comment} onChange={set("comment")} placeholder="Опишите вашу задачу..."
                className="w-full border border-[#b3b3b3] px-3 py-2.5 text-sm focus:outline-none focus:border-[#243954] resize-none" />
            </div>
            <div className="flex items-start gap-3">
              <input type="checkbox" id="modal-consent" required checked={form.consent}
                onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))} className="mt-1 accent-[#243954]" />
              <label htmlFor="modal-consent" className="text-xs text-[#525252]">
                Согласен с <span className="text-[#314180] underline cursor-pointer">обработкой персональных данных</span> *
              </label>
            </div>
            <button type="submit" className="w-full py-3.5 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">
              Отправить заявку
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
function Header() {
  const { lang, setLang, nav, page, openContact, openDemo } = useApp();
  const t = NAV[lang];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const link = (p: PageId, label: string) => (
    <button key={p} onClick={() => { nav(p); setMobileOpen(false); }}
      className={`text-sm transition-colors ${page === p ? "text-white font-medium" : "text-white/65 hover:text-white"}`}>
      {label}
    </button>
  );

  return (
    <header className="bg-[#243954] sticky top-0 z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => nav("home")} className="font-ubuntu text-lg font-bold text-white tracking-tight shrink-0">
            {t.brand}
          </button>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-5">
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className={`flex items-center gap-1 text-sm transition-colors ${["products","reg-point","promo-point","promo-pro","ticket-point"].includes(page) ? "text-white font-medium" : "text-white/65 hover:text-white"}`}>
                {t.products} <ChevronDown size={13} />
              </button>
              {productsOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#b3b3b3] shadow-lg min-w-[220px] z-50">
                  {([
                    ["products", "Все модули — обзор"],
                    ["reg-point", t.regPoint],
                    ["promo-point", t.promoPoint],
                    ["promo-pro", t.promoPro],
                    ["ticket-point", t.ticketPoint],
                  ] as [PageId, string][]).map(([p, label]) => (
                    <button key={p} onClick={() => { nav(p); setProductsOpen(false); }}
                      className="block w-full text-left px-5 py-3 text-sm text-[#243954] hover:bg-[#e1eff2] transition-colors border-b border-[#b3b3b3] last:border-0">
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {link("pricing", t.pricing)}
            {link("technology", t.technology)}
            {link("compliance", t.compliance)}
            {link("how-it-works", t.howItWorks)}
            {link("scenarios", t.scenarios)}
            {link("faq", t.faq)}
            {link("articles", t.articles)}
            {link("contacts", t.contacts)}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center border border-white/25 text-xs overflow-hidden">
              <button onClick={() => setLang("ru")} className={`px-2.5 py-1.5 transition-colors ${lang === "ru" ? "bg-white text-[#243954] font-semibold" : "text-white/60 hover:text-white"}`}>RU</button>
              <button onClick={() => setLang("en")} className={`px-2.5 py-1.5 transition-colors ${lang === "en" ? "bg-white text-[#243954] font-semibold" : "text-white/60 hover:text-white"}`}>EN</button>
            </div>
            <button onClick={openContact} className="text-sm text-white/65 hover:text-white transition-colors">{t.contact}</button>
            <button onClick={openDemo} className="px-5 py-2 bg-white text-[#243954] text-sm font-semibold hover:bg-[#e1eff2] transition-colors">
              {t.demo}
            </button>
          </div>

          <button className="xl:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="xl:hidden border-t border-white/10 py-4 space-y-0.5">
            {([
              ["home", "Главная"], ["products", t.products], ["pricing", t.pricing],
              ["technology", t.technology], ["compliance", t.compliance],
              ["how-it-works", t.howItWorks], ["scenarios", t.scenarios],
              ["faq", t.faq], ["articles", t.articles], ["contacts", t.contacts],
            ] as [PageId, string][]).map(([p, label]) => (
              <button key={p} onClick={() => { nav(p); setMobileOpen(false); }}
                className="block w-full text-left px-2 py-2.5 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors">
                {label}
              </button>
            ))}
            <div className="pt-4 flex items-center gap-3 px-2">
              <div className="flex border border-white/25 text-xs overflow-hidden">
                <button onClick={() => setLang("ru")} className={`px-2.5 py-1.5 ${lang === "ru" ? "bg-white text-[#243954]" : "text-white/60"}`}>RU</button>
                <button onClick={() => setLang("en")} className={`px-2.5 py-1.5 ${lang === "en" ? "bg-white text-[#243954]" : "text-white/60"}`}>EN</button>
              </div>
              <button onClick={() => { openDemo(); setMobileOpen(false); }} className="px-4 py-2 bg-white text-[#243954] text-sm font-semibold">
                КП / Демо
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function Footer() {
  const { nav, openDemo, openContact } = useApp();
  return (
    <footer className="bg-[#243954] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-ubuntu text-2xl font-bold mb-2">Готовы обсудить ваш сценарий?</h2>
              <p className="text-white/60 text-sm">Подберём модули и услуги внедрения — пришлём КП в течение 1–2 рабочих дней.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button onClick={openDemo} className="px-6 py-3 bg-white text-[#243954] text-sm font-semibold hover:bg-[#e1eff2] transition-colors">Запросить КП / Демо</button>
              <button onClick={openContact} className="px-6 py-3 border border-white/35 text-white text-sm hover:border-white transition-colors">Связаться</button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-ubuntu font-bold text-lg mb-3">Рег.Поинт</div>
            <p className="text-white/50 text-xs leading-relaxed">Коробочная платформа для регистрации на мероприятия и промоакции. Self-hosted на VPS клиента.</p>
          </div>
          <div>
            <div className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">Продукты</div>
            <ul className="space-y-2 text-sm text-white/60">
              {([["reg-point","Рег.Поинт"],["promo-point","Промо.Поинт"],["promo-pro","Промо.Про"],["ticket-point","Тикет.Поинт"]] as [PageId,string][]).map(([p,l]) => (
                <li key={p}><button onClick={() => nav(p)} className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">Компания</div>
            <ul className="space-y-2 text-sm text-white/60">
              {([["pricing","Цены"],["technology","Технологии"],["compliance","152-ФЗ"],["how-it-works","Как работает"],["articles","Статьи"]] as [PageId,string][]).map(([p,l]) => (
                <li key={p}><button onClick={() => nav(p)} className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">Правовое</div>
            <ul className="space-y-2 text-sm text-white/60">
              {([["privacy","Политика конфиденциальности"],["contacts","Контакты"],["faq","FAQ"],["scenarios","Сценарии"]] as [PageId,string][]).map(([p,l]) => (
                <li key={p}><button onClick={() => nav(p)} className="hover:text-white transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">© 2026 Рег.Поинт. Все права защищены.</p>
          <p className="text-white/25 text-xs font-mono">Self-hosted · Docker · MySQL · 152-ФЗ</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`text-xs font-semibold tracking-widest uppercase mb-3 ${light ? "text-white/40" : "text-[#314180]"}`}>{children}</div>;
}

function SH({ label, title, sub, light = false }: { label?: string; title: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="mb-8">
      {label && <SectionLabel light={light}>{label}</SectionLabel>}
      <h2 className={`font-ubuntu text-3xl font-bold mb-3 ${light ? "text-white" : "text-[#243954]"}`}>{title}</h2>
      {sub && <p className={`text-lg ${light ? "text-white/65" : "text-[#525252]"}`}>{sub}</p>}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-[#525252]">
          <Check size={15} className="text-[#243954] mt-0.5 shrink-0" />{item}
        </li>
      ))}
    </ul>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage() {
  const { nav, openDemo, openContact } = useApp();
  return (
    <main>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Self-hosted · Docker · 152-ФЗ · Event &amp; BTL</SectionLabel>
            <h1 className="font-ubuntu text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#243954] leading-tight mb-6">
              Регистрация на мероприятия — на{" "}
              <span className="relative inline-block">
                <span className="relative z-10">вашем</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#e1eff2] -z-0" />
              </span>{" "}
              сервере, не в облаке чужого SaaS
            </h1>
            <p className="text-lg text-[#525252] leading-relaxed mb-8 max-w-2xl">
              <strong className="text-[#243954]">Рег.Поинт</strong> — коробочная платформа для event-агентств и организаторов: онлайн-запись, QR check-in, промоакции с проверкой чеков, билеты. Устанавливается на VPS клиента через Docker. Персональные данные не покидают инфраструктуру заказчика.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-2 text-sm">
                Запросить КП / Демо <ArrowRight size={16} />
              </button>
              <button onClick={openContact} className="px-8 py-4 bg-[#e1eff2] text-[#243954] font-semibold hover:bg-[#cfe3e8] transition-colors text-sm">
                Связаться
              </button>
            </div>
          </div>
          {/* Hero image */}
          <div className="hidden lg:block relative">
            <div className="bg-[#243954] overflow-hidden" style={{aspectRatio:"4/3"}}>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format"
                alt="Деловая конференция — регистрация участников"
                className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
              />
              {/* Overlay stats */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { n: "4", label: "модуля" },
                    { n: "152", label: "ФЗ из коробки" },
                    { n: "VPS", label: "клиента" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 text-white text-center">
                      <div className="font-ubuntu font-bold text-xl">{s.n}</div>
                      <div className="text-white/70 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
          {/* Trust badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#b3b3b3] mt-12">
            {[
              { icon: <Server size={20} />, title: "Self-hosted", desc: "Docker на VPS клиента; вы владеете БД и бэкапами" },
              { icon: <Shield size={20} />, title: "152-ФЗ", desc: "Шифрование, audit log, согласия на каждое мероприятие" },
              { icon: <Package size={20} />, title: "Модульно", desc: "Платите только за нужные модули: от регистрации до билетов" },
            ].map((b, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#b3b3b3]" : ""}`}>
                <div className="w-10 h-10 bg-[#e1eff2] flex items-center justify-center text-[#243954] shrink-0">{b.icon}</div>
                <div>
                  <div className="font-ubuntu font-bold text-[#243954] mb-1">{b.title}</div>
                  <div className="text-sm text-[#525252]">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not SaaS */}
      <section className="bg-[#e1eff2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SH label="Архитектура" title="Почему коробка, а не подписка на чужой облачный сервис" />
              <p className="text-[#525252] leading-relaxed mb-6 text-sm">
                SaaS-регистраторы хранят базу участников у себя. Для многих заказчиков — банки, госкорпорации, pharma, крупные агентства — это неприемлемо: персональные данные должны оставаться на серверах клиента или его провайдера в РФ. <strong className="text-[#243954]">Рег.Поинт</strong> поставляется как <strong className="text-[#243954]">лицензия + Docker-compose</strong>: развёртывание на вашем VPS, обновления по подписке, данные под вашим контролем.
              </p>
              <CheckList items={[
                "База MySQL на VPS заказчика — не shared multi-tenant",
                "Соглашение об обработке ПД настраивается на каждое мероприятие",
                "Роли director / manager с изоляцией доступа",
                "Offline-capable check-in на площадке",
              ]} />
            </div>
            <div className="bg-[#243954] text-white p-8">
              <div className="font-mono text-xs space-y-1 mb-5 text-white/70">
                <div className="text-[#e1eff2] font-semibold mb-2">$ docker-compose up -d</div>
                <div className="text-white/40">services:</div>
                <div className="pl-4 text-white/40">app:</div>
                <div className="pl-8">image: <span className="text-[#e1eff2]">regpoint/app:latest</span></div>
                <div className="pl-8">ports: <span className="text-white/60">["3000:3000"]</span></div>
                <div className="pl-4 text-white/40">db:</div>
                <div className="pl-8">image: <span className="text-[#e1eff2]">mysql:8</span></div>
                <div className="pl-8">volumes:</div>
                <div className="pl-12 text-white/60">- ./data:/var/lib/mysql</div>
              </div>
              <div className="border-t border-white/10 pt-5 space-y-3">
                {[
                  "VPS клиента, Linux, 2+ GB RAM",
                  "MySQL 8 — данные только на сервере заказчика",
                  "HTTPS + Let's Encrypt",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <SH label="Линейка продуктов" title="Четыре модуля — одна платформа" sub="Одна кодовая база — четыре лицензируемых модуля. Включайте только то, что нужно." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { id: "reg-point" as PageId, name: "Рег.Поинт", price: "от 100 000 ₽", desc: "Онлайн-запись + QR check-in + импорт списков" },
              { id: "promo-point" as PageId, name: "Промо.Поинт", price: "от 80 000 ₽", desc: "Промо-формы, кастом-поля, брендинг акции" },
              { id: "promo-pro" as PageId, name: "Промо.Про", price: "180 000 ₽", desc: "Промо + проверка чека через API ФНС и OCR" },
              { id: "ticket-point" as PageId, name: "Тикет.Поинт", price: "+80 000 ₽", desc: "Продажа билетов, шаблоны, ЮKassa на стороне клиента" },
            ]).map((p, i) => (
              <div key={p.id} className={`border border-[#b3b3b3] border-t-4 ${i % 2 === 0 ? "border-t-[#243954]" : "border-t-[#314180]"} p-6 flex flex-col hover:shadow-md transition-shadow`}>
                <h3 className="font-ubuntu font-bold text-[#243954] text-lg mb-1">{p.name}</h3>
                <div className="text-xs font-mono text-[#314180] mb-3">{p.price}</div>
                <p className="text-sm text-[#525252] mb-6 flex-1 leading-relaxed">{p.desc}</p>
                <button onClick={() => nav(p.id)} className="flex items-center gap-1 text-sm text-[#314180] hover:text-[#243954] transition-colors font-medium">
                  Подробнее <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 152-FZ dark */}
      <section className="bg-[#243954]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SH label="Compliance" title="Соответствие 152-ФЗ — в каждом модуле, без доплат" light />
              <p className="text-white/65 mb-6 text-sm leading-relaxed">
                Шифрование AES-256-GCM, журнал доступа к ПД, запрос удаления данных участником, маскирование для менеджеров, настраиваемый срок хранения.
              </p>
              <button onClick={() => nav("compliance")} className="px-6 py-3 border border-white/35 text-white hover:border-white transition-colors text-sm">
                Подробнее о compliance →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Lock size={18} />, label: "AES-256-GCM", desc: "Шифрование ПД" },
                { icon: <FileText size={18} />, label: "Audit Log", desc: "Журнал доступа" },
                { icon: <Users size={18} />, label: "Согласия", desc: "На каждое мероприятие" },
                { icon: <Shield size={18} />, label: "Удаление ПД", desc: "По запросу участника" },
              ].map((item, i) => (
                <div key={i} className="bg-white/8 border border-white/10 p-5">
                  <div className="text-white/50 mb-2">{item.icon}</div>
                  <div className="font-ubuntu font-bold text-white text-sm">{item.label}</div>
                  <div className="text-white/45 text-xs mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Целевая аудитория" title="Кому подходит Рег.Поинт" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Event- и BTL-агентства", desc: "Обслуживаете нескольких заказчиков — разворачиваете Рег.Поинт на VPS каждого клиента или на своей инфраструктуре с изоляцией данных." },
              { title: "Корпоративные организаторы", desc: "Банки, pharma, госкорпорации — у вас требования по локализации ПД. Self-hosted закрывает требования ИБ-отдела без согласования с SaaS-провайдером." },
              { title: "MICE-площадки и конгресс-бюро", desc: "Регулярные конференции, форумы, деловые встречи. Лицензия окупается за 2–3 мероприятия по сравнению с поштучной платой SaaS." },
              { title: "Маркетинговые агентства (BTL)", desc: "Промо с чеками ФНС, sampling, розыгрыши — Промо.Про закрывает весь стек верификации без сторонних API-прокси." },
              { title: "DevOps / Digital-отделы заказчика", desc: "Получаете Docker-compose + runbook. Деплой занимает 1–2 часа. Обновления — по расписанию вашей команды." },
              { title: "Агентства с требованиями 152-ФЗ", desc: "Согласие per-event, audit log, удаление ПД по запросу участника — без доработок и доп. тарифов." },
            ].map((item, i) => (
              <div key={i} className="border border-[#b3b3b3] p-6">
                <h3 className="font-ubuntu font-bold text-[#243954] mb-2">{item.title}</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to start */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
          <SH label="Быстрый старт" title="Три шага до первого мероприятия" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Запросите демо", desc: "Покажем сценарий под вашу задачу" },
              { n: "02", title: "Получите лицензию и Docker-пакет", desc: "Runbook для вашего DevOps или нашего внедрения" },
              { n: "03", title: "Запустите регистрацию", desc: "Публичная страница /event/:id за минуты" },
            ].map((step, i) => (
              <div key={i} className="flex gap-5">
                <div className="font-ubuntu font-bold text-5xl text-[#b3b3b3] leading-none shrink-0 select-none">{step.n}</div>
                <div>
                  <h3 className="font-ubuntu font-bold text-[#243954] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#525252]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-2 text-sm">
              Запросить демо <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Mini FAQ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="FAQ" title="Частые вопросы" />
          <div className="grid md:grid-cols-2 border border-[#b3b3b3]">
            {[
              { q: "Это SaaS?", a: "Нет. Коробка на VPS клиента." },
              { q: "Где хранятся персональные данные?", a: "В MySQL на сервере заказчика." },
              { q: "Нужен ли программист для установки?", a: "Docker-compose + runbook; внедрение — опциональный SKU." },
              { q: "Можно ли начать с одного модуля?", a: "Да, лицензия по модулям." },
            ].map((faq, i) => (
              <div key={i} className={`p-6 ${i % 2 === 0 ? "md:border-r border-[#b3b3b3]" : ""} ${i < 2 ? "border-b border-[#b3b3b3]" : ""}`}>
                <div className="font-ubuntu font-bold text-[#243954] mb-2 text-sm">{faq.q}</div>
                <div className="text-sm text-[#525252]">{faq.a}</div>
              </div>
            ))}
          </div>
          <button onClick={() => nav("faq")} className="mt-4 text-sm text-[#314180] hover:text-[#243954] transition-colors flex items-center gap-1">
            Все вопросы и ответы <ChevronRight size={14} />
          </button>
        </div>
      </section>

      {/* §9.1 Articles teaser — органический трафик */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <SH label="Экспертиза" title="Последние статьи" />
            <button onClick={() => nav("articles")} className="text-sm text-[#314180] hover:text-[#243954] transition-colors flex items-center gap-1 shrink-0 mb-8">
              Все статьи <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { slug: "self-hosted-vs-saas", title: "Self-hosted vs SaaS: как выбрать регистрацию на мероприятие", tag: "self-hosted", date: "15 мая 2026", time: "7 мин" },
              { slug: "152fz-checklist", title: "152-ФЗ на мероприятии: чеклист для организатора", tag: "152-ФЗ", date: "20 мая 2026", time: "9 мин" },
              { slug: "cost-of-registration", title: "Сколько стоит программа регистрации на мероприятие", tag: "цены", date: "25 июня 2026", time: "6 мин" },
            ].map((a, i) => {
              const tagStyle: Record<string,string> = {
                "self-hosted": "bg-[#243954] text-white",
                "152-ФЗ": "bg-[#314180] text-white",
                "цены": "bg-[#f2f2f2] text-[#525252] border border-[#b3b3b3]",
              };
              return (
                <button key={i} onClick={() => openArticle(a.slug)}
                  className="bg-white border border-[#b3b3b3] text-left p-6 hover:shadow-md hover:border-[#243954] transition-all group">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className={`text-xs font-mono px-2 py-0.5 ${tagStyle[a.tag] || "bg-[#f2f2f2] text-[#525252]"}`}>{a.tag}</span>
                    <span className="text-xs text-[#525252]">{a.date} · {a.time}</span>
                  </div>
                  <h3 className="font-ubuntu font-bold text-[#243954] mb-3 leading-snug text-sm">{a.title}</h3>
                  <div className="text-xs text-[#314180] font-medium group-hover:text-[#243954] transition-colors flex items-center gap-1">
                    Читать <ChevronRight size={12} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// PRODUCTS PAGE
// ─────────────────────────────────────────────────────────────
function ProductsPage() {
  const { nav, openDemo } = useApp();
  const modules = [
    { id: "reg-point" as PageId, name: "Рег.Поинт", price: "от 100 000 ₽", features: ["Публичная страница регистрации с брендингом","QR check-in и ручная отметка","Импорт CSV / Excel","Многодневный check-in, отчёт attendance","Роли director / manager","152-ФЗ compliance"], upsell: null },
    { id: "promo-point" as PageId, name: "Промо.Поинт", price: "от 80 000 ₽", features: ["Кастомные поля регистрации","Брендинг промо-страницы","Публичная регистрация promo-сценариев","152-ФЗ per-event"], upsell: "Нужна проверка чеков → Промо.Про" },
    { id: "promo-pro" as PageId, name: "Промо.Про", price: "180 000 ₽", features: ["Всё из Рег.Поинт и Промо.Поинт","Проверка чека через API ФНС","OCR fallback (Tesseract.js)","QR-сканер чека, валидация ИНН","Один телефон — одна регистрация"], upsell: null },
    { id: "ticket-point" as PageId, name: "Тикет.Поинт", price: "+80 000 ₽ (add-on)", features: ["Несколько категорий билетов","Редактор шаблона билета","ЮKassa заказчика","QR для входа"], upsell: "Требует Рег.Поинт · В разработке" },
  ];

  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel>Линейка продуктов</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-4">Модули платформы <span className="text-[#314180]">Рег.Поинт</span></h1>
          <p className="text-lg text-[#525252] max-w-2xl">Одна кодовая база — четыре лицензируемых модуля. Включайте только то, что нужно: от регистрации до билетов.</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
            {modules.map(m => (
              <div key={m.id} className="bg-white border border-[#b3b3b3] flex flex-col">
                <div className="p-6 border-b border-[#b3b3b3]">
                  <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-1">{m.name}</h2>
                  <div className="font-mono text-xs text-[#314180] font-semibold">{m.price}</div>
                </div>
                <div className="p-6 flex-1">
                  <CheckList items={m.features} />
                  {m.upsell && <div className="mt-4 text-xs text-[#314180] bg-[#e1eff2] px-3 py-2">{m.upsell}</div>}
                </div>
                <div className="p-6 border-t border-[#b3b3b3]">
                  <button onClick={() => nav(m.id)} className="w-full py-2.5 border border-[#243954] text-[#243954] text-sm font-semibold hover:bg-[#243954] hover:text-white transition-colors">
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Feature matrix */}
          <div className="bg-white border border-[#b3b3b3] overflow-x-auto">
            <div className="p-6 border-b border-[#b3b3b3]">
              <h2 className="font-ubuntu font-bold text-[#243954] text-lg">Матрица возможностей</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#b3b3b3]">
                  <th className="text-left px-6 py-3 font-ubuntu font-semibold text-[#243954] w-1/3">Возможность</th>
                  {["Рег.Поинт","Промо.Поинт","Промо.Про","Тикет.Поинт"].map(h => (
                    <th key={h} className="text-center px-4 py-3 font-ubuntu font-semibold text-[#243954] text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Онлайн-регистрация", true, true, true, true],
                  ["QR check-in", true, false, true, true],
                  ["Импорт CSV/Excel", true, false, true, true],
                  ["Кастом-поля формы", false, true, true, false],
                  ["Брендинг страницы", true, true, true, true],
                  ["Проверка чека ФНС", false, false, true, false],
                  ["OCR fallback", false, false, true, false],
                  ["Продажа билетов", false, false, false, true],
                  ["ЮKassa интеграция", false, false, false, true],
                  ["152-ФЗ compliance", true, true, true, true],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-3 text-[#525252]">{feature as string}</td>
                    {(vals as boolean[]).map((v, j) => (
                      <td key={j} className="text-center px-4 py-3">
                        {v ? <Check size={15} className="text-[#243954] mx-auto" /> : <span className="text-[#b3b3b3] text-base">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 text-center">
            <p className="text-[#525252] mb-4 text-sm">Не знаете, какой модуль выбрать?</p>
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">
              Запросить консультацию
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// INDIVIDUAL PRODUCT PAGE
// ─────────────────────────────────────────────────────────────
function ProductPage({ id }: { id: "reg-point" | "promo-point" | "promo-pro" | "ticket-point" }) {
  const { nav, openDemo, openArticle } = useApp();
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);
  const data = {
    "reg-point": {
      name: "Рег.Поинт", tagline: "Регистрация и check-in на мероприятия",
      intro: "Базовый модуль для конференций, форумов, корпоративов и деловых мероприятий. Участники регистрируются онлайн — вы отмечаете прибытие по QR или из списка.",
      price: "от 100 000 ₽", priceNote: "лицензия, 1-й год поддержки включён",
      features: ["Публичная страница регистрации с брендингом мероприятия","Импорт участников из CSV / Excel","QR check-in и ручная отметка на площадке","Многодневный check-in, отчёт attendance, экспорт","Роли руководитель / менеджер","Полный compliance-стек 152-ФЗ"],
      notIncluded: [
        { text: "Промо с чеками", target: "promo-pro" as PageId, targetName: "Промо.Про" },
        { text: "Продажа билетов", target: "ticket-point" as PageId, targetName: "Тикет.Поинт" },
      ], status: null,
    },
    "promo-point": {
      name: "Промо.Поинт", tagline: "Регистрация в промоакции",
      intro: "Для BTL, розыгрышей, sampling и акций, где нужна красивая форма и гибкие поля — без проверки чеков ФНС.",
      price: "от 80 000 ₽", priceNote: "лицензия, 1-й год поддержки включён",
      features: ["Кастомные поля регистрации, шаблоны полей","Брендинг промо-страницы","Публичная регистрация в рамках promo-сценариев","152-ФЗ per-event"],
      notIncluded: [
        { text: "Проверка чеков ФНС", target: "promo-pro" as PageId, targetName: "Промо.Про" },
      ], status: null,
    },
    "promo-pro": {
      name: "Промо.Про", tagline: "Промоакции с проверкой чеков ФНС",
      intro: "Для акций «купи — зарегистрируй чек — получи приз». Автоматическая верификация через API ФНС (kkt-online) с OCR fallback.",
      price: "180 000 ₽", priceNote: "лицензия, 1-й год поддержки включён",
      features: ["Всё из Рег.Поинт и Промо.Поинт","Проверка чека через API ФНС","OCR fallback (Tesseract.js)","QR-сканер чека, валидация ИНН, дат, суммы","Правило: один телефон — одна регистрация на акцию"],
      notIncluded: [] as Array<{ text: string; target: PageId; targetName: string }>, status: null,
    },
    "ticket-point": {
      name: "Тикет.Поинт", tagline: "Продажа билетов на мероприятия",
      intro: "Модуль add-on: несколько категорий билетов, редактор шаблона, оплата через магазин ЮKassa заказчика (комиссия провайдера — на стороне клиента).",
      price: "+80 000 ₽ (add-on)", priceNote: "требует активный Рег.Поинт на том же инстансе",
      features: ["Несколько категорий билетов","Редактор шаблона билета","Оплата через ЮKassa заказчика","QR для входа"],
      notIncluded: [], status: "В разработке (backlog). Запишитесь на уведомление о релизе.",
    },
  };
  const d = data[id];

  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <button onClick={() => nav("products")} className="text-xs text-[#314180] tracking-wide uppercase mb-6 flex items-center gap-1 hover:text-[#243954] transition-colors">
            ← Все продукты
          </button>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-1">{d.name}</h1>
              <div className="text-[#314180] font-medium mb-6">{d.tagline}</div>
              <p className="text-[#525252] leading-relaxed mb-8">{d.intro}</p>
              {d.status && (
                <div className="bg-[#e1eff2] border border-[#b3b3b3] border-l-4 border-l-[#314180] p-4 mb-6 text-sm text-[#243954]">
                  <strong>Статус:</strong> {d.status}
                </div>
              )}
              <h2 className="font-ubuntu font-bold text-[#243954] text-lg mb-4">Возможности</h2>
              <CheckList items={d.features} />
              {d.notIncluded.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-ubuntu font-semibold text-[#525252] text-sm mb-3">Не входит в этот модуль</h3>
                  <div className="space-y-2">
                    {d.notIncluded.map((item, i) => (
                      <div key={i} className="flex items-center justify-between border border-[#b3b3b3] px-4 py-3 bg-[#f2f2f2]">
                        <span className="text-sm text-[#525252]">{item.text}</span>
                        <button
                          onClick={() => nav(item.target)}
                          className="text-xs font-semibold text-[#243954] bg-[#e1eff2] px-3 py-1.5 hover:bg-[#243954] hover:text-white transition-colors flex items-center gap-1"
                        >
                          {item.targetName} <ChevronRight size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="bg-[#f2f2f2] border border-[#b3b3b3] p-6 sticky top-24">
                <div className="font-ubuntu font-bold text-3xl text-[#243954] mb-1">{d.price}</div>
                <div className="text-xs text-[#525252] mb-6">{d.priceNote}</div>
                <div className="space-y-3">
                  <button onClick={openDemo} className="w-full py-3.5 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">
                    Запросить КП / Демо
                  </button>
                  <button onClick={() => nav("pricing")} className="w-full py-3 border border-[#b3b3b3] text-[#243954] text-sm hover:border-[#243954] transition-colors">
                    Все цены и апгрейды
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t border-[#b3b3b3] space-y-2">
                  {["1-й год поддержки включён","Self-hosted на VPS клиента","152-ФЗ из коробки"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#525252]">
                      <Check size={12} className="text-[#243954] shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticket.Point waitlist form (spec: «Запишитесь на уведомление о релизе») */}
      {id === "ticket-point" && (
        <section className="bg-[#e1eff2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="max-w-xl">
              <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-2">Уведомить о релизе</h2>
              <p className="text-sm text-[#525252] mb-5">Тикет.Поинт в разработке. Оставьте email — пришлём уведомление при выходе и предложим beta-доступ.</p>
              {notifySent ? (
                <div className="flex items-center gap-3 text-[#243954] font-medium text-sm">
                  <Check size={18} className="text-[#243954]" /> Записано! Пришлём письмо при релизе.
                  <span className="text-xs text-[#525252] font-normal ml-1">(stub — в продакшне интеграция с Jivo / email-листом)</span>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setNotifySent(true); }} className="flex gap-3">
                  <input
                    type="email" required value={notifyEmail}
                    onChange={e => setNotifyEmail(e.target.value)}
                    placeholder="your@company.ru"
                    className="flex-1 border border-[#b3b3b3] px-4 py-2.5 text-sm focus:outline-none focus:border-[#243954] bg-white"
                  />
                  <button type="submit" className="px-5 py-2.5 bg-[#243954] text-white text-sm font-semibold hover:bg-[#1a2d43] transition-colors shrink-0">
                    Уведомить меня
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* §9.2 Related articles — internal linking */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-ubuntu font-bold text-[#243954] text-lg mb-6">Статьи по теме</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {(PRODUCT_ARTICLES[id] || []).map(slug => {
              const art = ARTICLES.find(a => a.slug === slug);
              if (!art) return null;
              const tagStyle: Record<string,string> = {
                "self-hosted":"bg-[#243954] text-white","152-ФЗ":"bg-[#314180] text-white",
                "check-in":"bg-[#e1eff2] text-[#243954]","promo":"bg-[#e1eff2] text-[#243954]",
                "билеты":"bg-white text-[#525252] border border-[#b3b3b3]","цены":"bg-white text-[#525252] border border-[#b3b3b3]",
              };
              return (
                <button key={slug} onClick={() => openArticle(slug)}
                  className="bg-white border border-[#b3b3b3] text-left p-5 hover:shadow-md hover:border-[#243954] transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-mono px-2 py-0.5 ${tagStyle[art.tag] || "bg-white"}`}>{art.tag}</span>
                    <span className="text-xs text-[#525252]">{art.time}</span>
                  </div>
                  <p className="font-ubuntu font-bold text-[#243954] text-sm leading-snug group-hover:text-[#314180] transition-colors">{art.title}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// Related articles per product
// ─────────────────────────────────────────────────────────────
const PRODUCT_ARTICLES: Record<string, string[]> = {
  "reg-point":    ["qr-check-in", "import-participants", "152fz-checklist"],
  "promo-point":  ["self-hosted-vs-saas", "consent-pd", "152fz-checklist"],
  "promo-pro":    ["promo-fns", "ocr-fallback", "cost-of-registration"],
  "ticket-point": ["tickets-yukassa", "qr-check-in", "cost-of-registration"],
};

// ─────────────────────────────────────────────────────────────
// PRICING PAGE
// ─────────────────────────────────────────────────────────────
function PricingStickyBar({ openDemo }: { openDemo: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed top-16 left-0 right-0 z-30 bg-[#243954] text-white border-b border-white/10 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm text-white/80 overflow-x-auto">
          <span className="shrink-0">Рег.Поинт <strong className="text-white">100 000 ₽</strong></span>
          <span className="shrink-0 hidden sm:inline">Промо.Про <strong className="text-white">180 000 ₽</strong></span>
          <span className="shrink-0 text-white/40 hidden md:inline">1-й год поддержки включён · Self-hosted · 152-ФЗ</span>
        </div>
        <button onClick={openDemo} className="shrink-0 px-5 py-1.5 bg-white text-[#243954] text-sm font-bold hover:bg-[#e1eff2] transition-colors">
          Запросить КП
        </button>
      </div>
    </div>
  );
}

function PricingPage() {
  const { openDemo, openContact, nav } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      <PricingStickyBar openDemo={openDemo} />
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel>Прозрачное ценообразование</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-4">Цены и лицензии <span className="text-[#314180]">Рег.Поинт</span></h1>
          <p className="text-[#525252] max-w-2xl mb-4 leading-relaxed">
            Фиксированные цены на модули — без скрытых платежей SaaS. <strong className="text-[#243954]">1-й год</strong> обновлений и базовой поддержки <strong className="text-[#243954]">включён в лицензию</strong>. Данные на VPS клиента; <strong className="text-[#243954]">152-ФЗ</strong> — во всех пакетах без доплат.
          </p>
          <p className="text-xs text-[#525252] italic border-l-2 border-[#b3b3b3] pl-4">
            Цены ориентировочные на 2026 год, не являются публичной офертой. Итоговая стоимость — в коммерческом предложении с учётом выбранных модулей и услуг.
          </p>
        </div>
      </section>

      {/* Блок 1 — Лицензии */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Блок 1" title="Лицензии модулей (разово)" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-[#b3b3b3]">
              <thead>
                <tr className="bg-[#243954] text-white">
                  {["Модуль","Лицензия","1-й год","С 2-го года *"].map(h => (
                    <th key={h} className="px-6 py-4 font-ubuntu font-semibold text-left last:text-right [&:nth-child(2)]:text-right [&:nth-child(3)]:text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Рег.Поинт","100 000 ₽","от 35 000 ₽/год"],
                  ["Промо.Поинт","80 000 ₽","от 30 000 ₽/год"],
                  ["Промо.Про","180 000 ₽","от 55 000 ₽/год"],
                  ["Тикет.Поинт (add-on)","+80 000 ₽","от 30 000 ₽/год"],
                ].map(([mod, price, sub], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-4 font-ubuntu font-bold text-[#243954]">{mod}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[#243954]">{price}</td>
                    <td className="px-6 py-4 text-center"><Check size={16} className="text-[#243954] mx-auto" /></td>
                    <td className="px-6 py-4 text-right text-[#525252] text-xs">{sub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#525252] mt-3 italic">* Подписка — обновления, патчи безопасности, базовая поддержка. Точная сумма зависит от даты покупки и состава модулей.</p>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#b3b3b3] p-6">
              <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Что входит в каждую лицензию</h3>
              <CheckList items={["Развёртывание на 1 инстанс / 1 юрлицо (Docker на VPS клиента)","Полный compliance-стек 152-ФЗ (шифрование, audit log, согласия per-event)","Активация по коду в кабинете director"]} />
            </div>
            <div className="bg-white border border-[#b3b3b3] p-6">
              <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Популярные комбинации</h3>
              <div className="space-y-3">
                {[
                  { s: "Конференция, check-in", m: "Рег.Поинт", p: "100 000 ₽" },
                  { s: "Промо без чеков", m: "Промо.Поинт", p: "80 000 ₽" },
                  { s: "Промо + чеки ФНС + мероприятия", m: "Промо.Про", p: "180 000 ₽" },
                  { s: "Билеты + регистрация", m: "Рег.Поинт + Тикет.Поинт", p: "180 000 ₽" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between text-sm ${i < 3 ? "border-b border-[#b3b3b3] pb-3" : ""}`}>
                    <div>
                      <div className="text-[#243954] font-medium">{item.s}</div>
                      <div className="text-[#525252] text-xs">{item.m}</div>
                    </div>
                    <div className="font-mono font-bold text-[#243954]">{item.p}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-2 text-sm">
              Запросить КП / Демо <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Блок 2 — Апгрейды */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Блок 2" title="Апгрейды — расширить уже купленный модуль" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#b3b3b3]">
              <thead>
                <tr className="bg-[#e1eff2]">
                  <th className="text-left px-6 py-3 font-ubuntu font-semibold text-[#243954]">Услуга</th>
                  <th className="text-right px-6 py-3 font-ubuntu font-semibold text-[#243954]">Цена</th>
                  <th className="text-left px-6 py-3 font-ubuntu font-semibold text-[#243954] hidden md:table-cell">Когда нужно</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Рег.Поинт → Промо.Про","+80 000 ₽","Появились промо с чеками и ФНС"],
                  ["Промо.Поинт → Промо.Про","+100 000 ₽","Нужен полный стек: мероприятия + ФНС/OCR"],
                  ["Рег.Поинт → + Промо.Поинт","+50 000 ₽","Промо-формы без проверки чеков"],
                  ["+ Тикет.Поинт","+80 000 ₽","Платные билеты на мероприятия"],
                  ["Второй инстанс (филиал)","50% от лицензии","Отдельное юрлицо или площадка"],
                  ["Перевыпуск лицензии (смена VPS)","15 000 ₽","Миграция на новый сервер"],
                ].map(([s, p, w], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-3.5 text-[#243954]">{s}</td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold text-[#243954]">{p}</td>
                    <td className="px-6 py-3.5 text-[#525252] hidden md:table-cell text-xs">{w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Блок 3 — Внедрение */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Блок 3" title="Внедрение на ваш VPS" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-[#b3b3b3]">
              <thead>
                <tr className="bg-[#e1eff2]">
                  <th className="text-left px-6 py-3 font-ubuntu font-semibold text-[#243954]">Услуга</th>
                  <th className="text-right px-6 py-3 font-ubuntu font-semibold text-[#243954]">Цена</th>
                  <th className="text-left px-6 py-3 font-ubuntu font-semibold text-[#243954] hidden md:table-cell">Примечание</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Установка Docker + базовая настройка","от 15 000 ₽","Частично включена в Рег.Поинт / Промо.Про"],
                  ["Turnkey «под ключ» (VPS + Docker + smoke)","45 000 ₽","Клиент предоставляет доступ к серверу"],
                  ["Настройка HTTPS (Let's Encrypt)","12 000 ₽","На домене клиента"],
                  ["Бэкап MySQL + проверка restore","18 000 ₽","Cron-скрипт остаётся у клиента"],
                  ["Миграция данных (CSV, Excel)","от 25 000 ₽","Зависит от объёма"],
                  ["Пакет заявки в ФНС (Open API)","от 15 000 ₽","Включена в Промо.Про; токен — на каждый инстанс"],
                  ["Настройка ЮKassa + webhook (Тикет.Поинт)","от 18 000 ₽","Shop_id и secret — клиента"],
                ].map(([s, p, n], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-3.5 text-[#243954]">{s}</td>
                    <td className="px-6 py-3.5 text-right font-mono font-bold text-[#243954]">{p}</td>
                    <td className="px-6 py-3.5 text-[#525252] hidden md:table-cell text-xs">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Блок 4 — Доработки */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Блок 4" title="Доработки под ваш процесс" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              ["Кастомное поле / валидация","35 000 ₽"],
              ["Кастомный отчёт / экспорт","45 000 ₽"],
              ["White-label кабинета (логотип, цвета)","49 000 ₽"],
              ["Интеграция CRM (Bitrix, amo и др.)","80 000 ₽"],
              ["Интеграция 1С","120 000 ₽"],
              ["Email / SMS уведомления","60 000 ₽"],
            ].map(([s, p], i) => (
              <div key={i} className="border border-[#b3b3b3] px-5 py-4 flex items-center justify-between gap-4">
                <span className="text-sm text-[#525252]">{s}</span>
                <span className="font-mono font-bold text-[#243954] text-sm shrink-0">от {p}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#525252] mt-4 italic">Scope и срок — фиксируются в приложении к договору. Почасовая разработка не продаётся.</p>
        </div>
      </section>

      {/* Блок 5 — Поддержка */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Блок 5" title="Обучение и расширенная поддержка" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white border border-[#b3b3b3]">
                <thead><tr className="bg-[#e1eff2]"><th className="text-left px-5 py-3 font-ubuntu font-semibold text-[#243954]">Услуга</th><th className="text-right px-5 py-3 font-ubuntu font-semibold text-[#243954]">Цена</th></tr></thead>
                <tbody className="divide-y divide-[#b3b3b3]">
                  {[["Обучение команды (2 ч, online)","12 000 ₽"],["Расширенное обучение (4 ч)","22 000 ₽"],["Расширенный SLA (реакция 4 ч)","+59 000 ₽/год"],["Приоритетная линия (телефон / Telegram)","+39 000 ₽/год"],["Аудит compliance-настроек инстанса","35 000 ₽"]].map(([s,p],i) => (
                    <tr key={i}><td className="px-5 py-3 text-[#525252]">{s}</td><td className="px-5 py-3 text-right font-mono font-bold text-[#243954]">{p}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="font-ubuntu font-bold text-[#243954] mb-2">Консалтинг по 152-ФЗ <span className="text-xs font-normal text-[#525252]">(не заменяет юридическое заключение)</span></div>
              <table className="w-full text-sm bg-white border border-[#b3b3b3] mt-3">
                <thead><tr className="bg-[#e1eff2]"><th className="text-left px-5 py-3 font-ubuntu font-semibold text-[#243954]">Услуга</th><th className="text-right px-5 py-3 font-ubuntu font-semibold text-[#243954]">Цена</th></tr></thead>
                <tbody className="divide-y divide-[#b3b3b3]">
                  {[["Шаблоны текстов согласий (3 типа мероприятий)","25 000 ₽"],["Ревью блока ПД перед pharma-ивентом","35 000 ₽"]].map(([s,p],i) => (
                    <tr key={i}><td className="px-5 py-3 text-[#525252]">{s}</td><td className="px-5 py-3 text-right font-mono font-bold text-[#243954]">{p}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="FAQ по ценам" title="Частые вопросы о стоимости" />
          <div className="divide-y divide-[#b3b3b3] border border-[#b3b3b3]">
            {[
              { q: "Почему нет помесячной подписки как у SaaS?", a: "Рег.Поинт — коробочная лицензия: вы платите за право установки на свой сервер и владение данными. Подписка со 2-го года — только за обновления и поддержку." },
              { q: "Что входит в первый год?", a: "Лицензия + обновления + базовая поддержка + патчи безопасности." },
              { q: "Можно ли купить только апгрейд без полной лицензии?", a: "Апгрейды — только при уже активной лицензии базового модуля." },
              { q: "Сколько стоит «под ключ» для первого мероприятия?", a: "Ориентир: лицензия Рег.Поинт (100 000 ₽) + turnkey внедрение (45 000 ₽) + обучение (12 000 ₽) ≈ 157 000 ₽ — уточняется в КП." },
              { q: "Есть ли скрытая комиссия с билетов?", a: "Нет. Оплата билетов идёт через ЮKassa заказчика; комиссия эквайринга — по договору клиента с ЮKassa." },
            ].map((faq, i) => (
              <div key={i}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f2f2f2] transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-ubuntu font-bold text-[#243954] pr-4 text-sm">{faq.q}</span>
                  <ChevronDown size={16} className={`text-[#525252] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-sm text-[#525252] leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
          {/* §7.7 Pricing footer CTA — точный текст по спеке */}
          <div className="mt-10 bg-[#243954] text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="font-ubuntu text-2xl font-bold mb-2">Нужен расчёт под ваш сценарий?</h2>
                <p className="text-white/70 text-sm">Подберём модули и услуги внедрения — пришлём КП в течение 1–2 рабочих дней.</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button onClick={openDemo} className="px-6 py-3 bg-white text-[#243954] text-sm font-semibold hover:bg-[#e1eff2] transition-colors">Запросить КП / Демо</button>
                <button onClick={openContact} className="px-6 py-3 border border-white/35 text-white text-sm hover:border-white transition-colors">Связаться (Jivo)</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// TECHNOLOGY PAGE
// ─────────────────────────────────────────────────────────────
function TechnologyPage() {
  const { openDemo } = useApp();
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel>Архитектура</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-6">Технологии и архитектура</h1>
          <p className="text-lg text-[#525252] max-w-2xl">
            <strong className="text-[#243954]">Рег.Поинт</strong> — модульный монолит: одно deployable-приложение (SPA + API), доменные модули изолированы, контракт — HTTP REST.
          </p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <Server size={22} />, title: "Инфраструктура", items: ["Docker-compose на Linux VPS (2+ GB RAM)","MySQL 8 — данные на сервере клиента","HTTPS, runbook деплоя"] },
              { icon: <Code2 size={22} />, title: "Backend", items: ["Node.js 20, Express 4","REST API (/api/…), публичные /api/public/*","AES-256-GCM для ПД, audit log"] },
              { icon: <Layers size={22} />, title: "Frontend", items: ["React 18, TypeScript, Vite","Публичные страницы регистрации","SSR-ready static"] },
              { icon: <Zap size={22} />, title: "Интеграции", items: ["API ФНС kkt-online (Промо.Про)","ЮKassa (Тикет.Поинт)","OCR Tesseract.js (fallback)"] },
            ].map((block, i) => (
              <div key={i} className="bg-white border border-[#b3b3b3] p-6">
                <div className="text-[#243954] mb-4">{block.icon}</div>
                <h2 className="font-ubuntu font-bold text-[#243954] mb-4">{block.title}</h2>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="text-xs text-[#525252] flex items-start gap-2">
                      <span className="text-[#b3b3b3] shrink-0 mt-0.5">—</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* What it means for the client */}
          <div className="bg-white border border-[#b3b3b3] mb-6">
            <div className="px-6 py-4 border-b border-[#b3b3b3]">
              <h2 className="font-ubuntu font-bold text-[#243954]">Что это значит для вас как заказчика</h2>
            </div>
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#b3b3b3]">
              {[
                {
                  title: "Без vendor lock-in",
                  desc: "Docker-образ разворачивается на любом Linux VPS — у вашего хостера в РФ или на корпоративной инфраструктуре. Нет привязки к облаку конкретного вендора. Смена сервера — перевыпуск лицензии (15 000 ₽).",
                },
                {
                  title: "Данные остаются у вас",
                  desc: "MySQL 8 хранит базу участников физически на вашем сервере. Рег.Поинт не имеет доступа к вашим данным после деплоя — нет «звонка домой», нет синхронизации в облако вендора.",
                },
                {
                  title: "Стандартный стек — нет чёрных ящиков",
                  desc: "Node.js + MySQL + Docker — технологии, которые ваш DevOps уже знает. Runbook для деплоя прилагается к лицензии. REST API задокументирован — интеграции с вашей CRM через стандартные HTTP-запросы.",
                },
              ].map((item, i) => (
                <div key={i} className="p-6">
                  <h3 className="font-ubuntu font-bold text-[#243954] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* VPS requirements card — §7.8 CTA */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#243954] text-white p-6">
              <h2 className="font-ubuntu font-bold text-lg mb-4">Минимальные требования к VPS</h2>
              <ul className="space-y-3 text-sm">
                {[
                  ["ОС", "Ubuntu 22.04 LTS или Debian 12"],
                  ["CPU", "2 vCPU (4 vCPU рекомендуется)"],
                  ["RAM", "2 GB (4 GB для Промо.Про с OCR)"],
                  ["Диск", "20 GB SSD (50 GB для production)"],
                  ["Сеть", "Статический IP или домен с A-записью"],
                  ["HTTPS", "Let's Encrypt — настраивается в runbook"],
                ].map(([param, val], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-mono text-white/50 text-xs mt-0.5 w-12 shrink-0">{param}</span>
                    <span className="text-white/80">{val}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-white/15 text-xs text-white/50">
                Хостеры РФ: Selectel, Timeweb Cloud, Beget VPS, МТС Cloud, Яндекс Cloud
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#e1eff2] border border-[#b3b3b3] p-6 flex-1">
                <h3 className="font-ubuntu font-bold text-[#243954] mb-2">Нет своего DevOps?</h3>
                <p className="text-sm text-[#525252] mb-4">Услуга «Turnkey» — развернём Рег.Поинт на вашем VPS, настроим HTTPS, проведём smoke-test. Всё, что нужно — предоставить SSH-доступ.</p>
                <div className="font-ubuntu font-bold text-[#243954] text-lg">45 000 ₽</div>
                <div className="text-xs text-[#525252]">Turnkey-внедрение под ключ</div>
              </div>
              <button
                onClick={openDemo}
                className="w-full py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm flex items-center justify-center gap-2"
              >
                Запросить технические требования (PDF) <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* REST API note for integrators */}
          <div className="border border-[#b3b3b3] p-6">
            <h2 className="font-ubuntu font-bold text-[#243954] mb-3">REST API для интеграций</h2>
            <p className="text-sm text-[#525252] mb-4">
              Публичные endpoints <code className="font-mono bg-[#f2f2f2] px-1.5 py-0.5 text-xs">/api/public/*</code> позволяют интегрировать Рег.Поинт с вашей CRM, сайтом или мобильным приложением. Кастомные интеграции — отдельный SKU внедрения.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Bitrix24", "amoCRM", "1С", "Telegram Bot", "Email / SMS", "Webhook"].map((item, i) => (
                <span key={i} className="text-xs font-mono border border-[#b3b3b3] px-3 py-1.5 text-[#525252]">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// 152-FZ PAGE
// ─────────────────────────────────────────────────────────────
function CompliancePage() {
  const { openDemo } = useApp();
  return (
    <main>
      <section className="bg-[#243954] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <SectionLabel light>Правовое</SectionLabel>
          <h1 className="font-ubuntu text-4xl md:text-5xl font-bold mb-5 max-w-3xl">Персональные данные на мероприятиях и <span className="text-[#e1eff2]">152-ФЗ</span></h1>
          <p className="text-lg text-white/65 max-w-2xl">Регистрация участников — обработка ПД. Рег.Поинт проектируется с compliance-by-design: не как дополнительный тариф, а как базовая функция каждого модуля.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SH label="Фундамент" title="Self-hosted — фундамент compliance" />
              <p className="text-[#525252] leading-relaxed text-sm">
                Когда база на VPS заказчика, вы определяете: где физически хранятся данные, кто администратор, как устроены бэкапы и доступ. Это принципиально иной уровень контроля, чем SaaS с мультиарендностью.
              </p>
            </div>
            <div>
              <SH label="Договор" title="Соглашение об обработке ПД на мероприятие" />
              <p className="text-[#525252] leading-relaxed text-sm">
                Организатор указывает оператора ПД, цели обработки, ссылки на политику — для каждого event. Система не подставляет «общую» политику vendor'а.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="В каждом модуле" title="Что входит в compliance-стек" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-[#b3b3b3]">
              <thead>
                <tr className="bg-[#243954] text-white">
                  <th className="text-left px-6 py-4 font-ubuntu font-semibold">Функция</th>
                  <th className="text-left px-6 py-4 font-ubuntu font-semibold">Описание</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Шифрование","AES-256-GCM для чувствительных полей"],
                  ["Audit log","Журнал доступа к ПД (access_logs)"],
                  ["Согласие","Текст согласия на каждое мероприятие — ручной ввод оператора"],
                  ["Удаление","Публичный запрос участника на удаление ПД"],
                  ["Роли","Маскирование ПД для manager"],
                  ["Retention","Настраиваемый срок хранения"],
                ].map(([func, desc], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-4 font-ubuntu font-bold text-[#243954] w-1/4">{func}</td>
                    <td className="px-6 py-4 text-[#525252]">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">
              Обсудить compliance для вашей отрасли
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────
function HowItWorksPage() {
  const { openDemo } = useApp();
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel>Процесс</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-3">Как это работает</h1>
          <p className="text-lg text-[#525252]">От лицензии до первого check-in — пошаговая схема коробочного внедрения</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="space-y-4">
            {[
              { n: "01", title: "Выбор модулей", desc: "По задаче: регистрация, промо, чеки, билеты" },
              { n: "02", title: "Лицензия", desc: "Код активации + license.json — активация в кабинете director" },
              { n: "03", title: "Развёртывание", desc: "Docker-compose на VPS (ваш DevOps или наше внедрение)" },
              { n: "04", title: "Мероприятие", desc: "Создание, compliance-блок, брендинг" },
              { n: "05", title: "Регистрация", desc: "Публичная ссылка /event/:id — участники регистрируются онлайн" },
              { n: "06", title: "Check-in / отчёты", desc: "QR на площадке, экспорт CSV, attendance report" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 bg-white border border-[#b3b3b3] p-6">
                <div className="font-ubuntu font-bold text-4xl text-[#e1eff2] leading-none shrink-0 w-14 select-none">{step.n}</div>
                <div>
                  <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-1">{step.title}</h2>
                  <p className="text-[#525252] text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">
              Запросить демо
            </button>
          </div>
        </div>
      </section>

      {/* SaaS vs Self-hosted comparison table */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Сравнение" title="Self-hosted vs SaaS — в чём разница" sub="Почему коробка, а не облачная подписка, важна для B2B и regulated-отраслей." />
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#b3b3b3]">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 bg-[#f2f2f2] font-ubuntu font-semibold text-[#243954] w-1/3 border-b border-[#b3b3b3]">Параметр</th>
                  <th className="text-left px-6 py-4 bg-[#243954] text-white font-ubuntu font-semibold border-b border-[#b3b3b3]">
                    <div className="flex items-center gap-2"><Server size={15} /> Рег.Поинт (Self-hosted)</div>
                  </th>
                  <th className="text-left px-6 py-4 bg-[#f2f2f2] font-ubuntu font-semibold text-[#525252] border-b border-[#b3b3b3]">Типичный SaaS-регистратор</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Где хранятся данные участников", "На VPS заказчика — физически", "На серверах SaaS-провайдера (multi-tenant)"],
                  ["Оператор ПД по 152-ФЗ", "Заказчик / агентство", "SaaS-компания (третья сторона)"],
                  ["Доступ провайдера к данным", "Нет — закрытый инстанс", "Есть — администраторы SaaS имеют доступ"],
                  ["Соответствие требованиям банков / pharma", "✓ Локализация ПД на инфраструктуре клиента", "✗ Данные за пределами корп. периметра"],
                  ["Установка на сервер заказчика", "✓ Docker-compose, runbook", "✗ Невозможно — SaaS архитектура"],
                  ["Стоимость в долгосрочной перспективе", "Разовая лицензия + подписка с 2-го года", "Ежемесячные платежи / % от участников бессрочно"],
                  ["Обновления и контроль версий", "По расписанию команды заказчика", "Автоматически (без возможности заморозить)"],
                  ["Offline-режим на площадке", "✓ Check-in без интернета", "Зависит от провайдера, чаще нет"],
                  ["Брендинг и кастомизация", "Полная (белый лейбл — SKU)", "Ограниченная шаблонами SaaS"],
                  ["White-label для перепродажи", "✓ Апгрейд SKU", "✗ Обычно запрещено ToS"],
                ].map(([param, self, saas], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-3.5 text-[#243954] font-medium">{param}</td>
                    <td className="px-6 py-3.5 text-[#243954] bg-[#e1eff2]/30">{self}</td>
                    <td className="px-6 py-3.5 text-[#525252]">{saas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={openDemo} className="px-6 py-3 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm flex items-center gap-2">
              Запросить КП / Демо <ArrowRight size={15} />
            </button>
            <button onClick={() => nav("technology")} className="px-6 py-3 border border-[#b3b3b3] text-[#243954] text-sm hover:border-[#243954] transition-colors">
              Технологии подробнее
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// SCENARIOS PAGE
// ─────────────────────────────────────────────────────────────
function ScenariosPage() {
  const { nav, openDemo } = useApp();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const scenarios = [
    {
      title: "Деловая конференция 500+",
      module: "Рег.Поинт",
      moduleId: "reg-point" as PageId,
      tag: "B2B · корпоратив · форум",
      what: "Pre-reg + QR check-in + отчёт attendance",
      details: [
        "Публичная страница регистрации с брендингом",
        "Импорт VIP-списка из Excel заказчика",
        "QR check-in на 2–4 входах одновременно",
        "Offline-режим при нестабильном WiFi на площадке",
        "Отчёт attendance + экспорт CSV для заказчика",
      ],
      compliance: "152-ФЗ per-event — критично для банков и госкорпораций",
    },
    {
      title: "BTL-акция в торговой сети",
      module: "Промо.Поинт",
      moduleId: "promo-point" as PageId,
      tag: "BTL · промо · sampling",
      what: "Форма + кастом-поля + брендинг акции",
      details: [
        "Кастомные поля: размер, вкус, предпочтение продукта",
        "Брендинг страницы под акцию сети",
        "Ограничение регистраций по региону / городу",
        "Выгрузка базы участников в CRM агентства",
        "152-ФЗ: согласие на получение промо-рассылок",
      ],
      compliance: "Данные на сервере агентства — не у ретейлера и не у SaaS-провайдера",
    },
    {
      title: "«Приз за чек» — акция с верификацией",
      module: "Промо.Про",
      moduleId: "promo-pro" as PageId,
      tag: "promo · ФНС · антифрод",
      what: "ФНС API + OCR + антифрод по телефону",
      details: [
        "Проверка чека через API ФНС (kkt-online)",
        "OCR fallback при недоступности ФНС",
        "Белый список ИНН партнёров акции",
        "Один телефон — N регистраций за период",
        "Ручная модерация спорных чеков директором",
      ],
      compliance: "Полный audit trail для отчётности перед заказчиком акции",
    },
    {
      title: "Платный воркшоп / мастер-класс",
      module: "Тикет.Поинт",
      moduleId: "ticket-point" as PageId,
      tag: "билеты · ЮKassa · платёж",
      what: "Билеты + ЮKassa заказчика + QR для входа",
      details: [
        "Несколько категорий: стандарт / VIP / онлайн",
        "Оплата через ЮKassa заказчика (деньги — клиенту)",
        "Автоматическая отправка билета на email",
        "QR check-in на входе — тот же, что в Рег.Поинт",
        "Отчёт по продажам и возвратам",
      ],
      compliance: "Модуль в разработке — запишитесь на уведомление о релизе",
    },
    {
      title: "Pharma / banking event",
      module: "Рег.Поинт",
      moduleId: "reg-point" as PageId,
      tag: "regulated · 152-ФЗ · enterprise",
      what: "Self-hosted + 152-ФЗ + изоляция доступа",
      details: [
        "Данные на корпоративном VPS заказчика",
        "Соглашение об обработке ПД с указанием DPO",
        "Роли: director видит всё, manager — только имя + статус",
        "Шифрование AES-256-GCM + audit log",
        "Настраиваемый срок хранения (нет фиксированного retention)",
      ],
      compliance: "Один DPA — с Рег.Поинт, без цепочки SaaS-провайдеров",
    },
  ];

  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SectionLabel>Применение</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-3">Сценарии использования</h1>
          <p className="text-lg text-[#525252]">Как event-агентства и организаторы используют модули Рег.Поинт</p>
        </div>
      </section>

      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {/* Module filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button onClick={() => setActiveModule(null)}
              className={`px-4 py-2 text-sm font-medium border transition-colors ${!activeModule ? "bg-[#243954] text-white border-[#243954]" : "bg-white text-[#525252] border-[#b3b3b3] hover:border-[#243954] hover:text-[#243954]"}`}>
              Все сценарии
            </button>
            {["Рег.Поинт","Промо.Поинт","Промо.Про","Тикет.Поинт"].map(m => (
              <button key={m} onClick={() => setActiveModule(activeModule === m ? null : m)}
                className={`px-4 py-2 text-sm font-medium border transition-colors ${activeModule === m ? "bg-[#243954] text-white border-[#243954]" : "bg-white text-[#525252] border-[#b3b3b3] hover:border-[#243954] hover:text-[#243954]"}`}>
                {m}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {scenarios.filter(s => !activeModule || s.module === activeModule).map((s, i) => (
              <div key={i} className="bg-white border border-[#b3b3b3]">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#b3b3b3]">
                  {/* Left: title + module */}
                  <div className="p-6">
                    <div className="text-xs font-mono text-[#525252] mb-2">{s.tag}</div>
                    <h2 className="font-ubuntu font-bold text-[#243954] text-lg mb-3">{s.title}</h2>
                    <button
                      onClick={() => nav(s.moduleId)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e1eff2] text-[#243954] text-xs font-semibold hover:bg-[#243954] hover:text-white transition-colors"
                    >
                      {s.module} <ChevronRight size={12} />
                    </button>
                  </div>
                  {/* Middle: details */}
                  <div className="p-6">
                    <div className="text-xs font-semibold text-[#314180] uppercase tracking-wide mb-3">Что даёт</div>
                    <ul className="space-y-2">
                      {s.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#525252]">
                          <Check size={13} className="text-[#243954] mt-0.5 shrink-0" />{d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Right: compliance note */}
                  <div className="p-6 bg-[#f2f2f2]">
                    <div className="text-xs font-semibold text-[#314180] uppercase tracking-wide mb-3">152-ФЗ / Контроль</div>
                    <p className="text-sm text-[#525252] leading-relaxed">{s.compliance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {scenarios.filter(s => !activeModule || s.module === activeModule).length === 0 && (
            <div className="text-center py-8 text-[#525252] text-sm">
              Нет сценариев для выбранного модуля.{" "}
              <button onClick={() => setActiveModule(null)} className="text-[#314180] underline">Показать все</button>
            </div>
          )}

          {/* Quick-select table */}
          <div className="mt-10 bg-white border border-[#b3b3b3] overflow-x-auto">
            <div className="px-6 py-4 border-b border-[#b3b3b3]">
              <h2 className="font-ubuntu font-bold text-[#243954]">Быстрый выбор модуля по задаче</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#e1eff2] border-b border-[#b3b3b3]">
                  {["Задача","Рег.Поинт","Промо.Поинт","Промо.Про","Тикет.Поинт"].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-ubuntu font-semibold text-[#243954] text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Регистрация участников онлайн", true, true, true, false],
                  ["QR check-in на входе", true, false, true, true],
                  ["Промо-форма с кастом-полями", false, true, true, false],
                  ["Проверка чека ФНС", false, false, true, false],
                  ["Продажа билетов + оплата", false, false, false, true],
                  ["Self-hosted, 152-ФЗ из коробки", true, true, true, true],
                ].map(([task, ...vals], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-5 py-3 text-[#525252]">{task as string}</td>
                    {(vals as boolean[]).map((v, j) => (
                      <td key={j} className="px-5 py-3">
                        {v
                          ? <Check size={15} className="text-[#243954]" />
                          : <span className="text-[#b3b3b3] text-sm">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm flex items-center gap-2">
              Обсудить ваш сценарий <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ PAGE
// ─────────────────────────────────────────────────────────────
function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Рег.Поинт — это SaaS?", a: "Нет. Это коробочная лицензия: приложение разворачивается на VPS клиента через Docker. Данные хранятся в MySQL на сервере заказчика." },
    { q: "Чем отличается от Eventbrite / Timepad / SaaS-регистраторов?", a: "Те — multi-tenant SaaS: база участников на стороне провайдера. Рег.Поинт — single-tenant на инфраструктуре клиента. Персональные данные не покидают ваш сервер." },
    { q: "Какие модули нужны для конференции?", a: "Обычно достаточно Рег.Поинт: онлайн-запись + check-in. Если нужны платные билеты — добавьте Тикет.Поинт." },
    { q: "Как обстоят дела с 152-ФЗ?", a: "Compliance-стек в каждом модуле без доплат. Шифрование AES-256-GCM, audit log, согласия per-event, маскирование для менеджеров, запрос удаления ПД участником." },
    { q: "Нужен ли отдельный сервер?", a: "Linux VPS от 2 GB RAM, Docker. Требования — в документации / по запросу. Turnkey внедрение — опциональная услуга от 45 000 ₽." },
    { q: "Как проходят обновления?", a: "Подписка со 2-го года; патчи безопасности и новые версии Docker-образов. 1-й год включён в лицензию." },
    { q: "Можно ли интегрировать с нашей CRM?", a: "REST API; кастомные интеграции — SKU внедрения (Bitrix, amo и др. от 80 000 ₽)." },
    { q: "Где хранятся данные с формы на этом сайте?", a: "Заявки и переписка обрабатываются через Jivo (ООО «Живой Сайт», РФ) согласно Политике конфиденциальности." },
  ];
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-3">Частые вопросы</h1>
          <p className="text-lg text-[#525252]">Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка.</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="divide-y divide-[#b3b3b3] border border-[#b3b3b3] bg-white">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f2f2f2] transition-colors" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-ubuntu font-bold text-[#243954] pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`text-[#525252] shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <div className="px-6 pb-5 text-[#525252] text-sm leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// ARTICLES PAGE
// ─────────────────────────────────────────────────────────────
function ArticlesPage() {
  const { openArticle } = useApp();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const allArticles = [
    { slug: "self-hosted-vs-saas", title: "Self-hosted vs SaaS: как выбрать регистрацию на мероприятие", tag: "self-hosted", date: "15 мая 2026", time: "7 мин" },
    { slug: "152fz-checklist", title: "152-ФЗ на мероприятии: чеклист для организатора", tag: "152-ФЗ", date: "20 мая 2026", time: "9 мин" },
    { slug: "qr-check-in", title: "QR check-in на конференции: пошаговое руководство", tag: "check-in", date: "28 мая 2026", time: "6 мин" },
    { slug: "import-participants", title: "Импорт участников из Excel и CSV без ошибок", tag: "check-in", date: "1 июня 2026", time: "5 мин" },
    { slug: "promo-fns", title: "Промоакция с чеком: как работает проверка ФНС", tag: "promo", date: "5 июня 2026", time: "8 мин" },
    { slug: "ocr-fallback", title: "OCR чеков в промо: когда нужен fallback", tag: "promo", date: "10 июня 2026", time: "6 мин" },
    { slug: "docker-vps", title: "Docker для event-платформы: требования к VPS", tag: "self-hosted", date: "15 июня 2026", time: "7 мин" },
    { slug: "consent-pd", title: "Согласие на обработку ПД: что указать на странице регистрации", tag: "152-ФЗ", date: "18 июня 2026", time: "10 мин" },
    { slug: "tickets-yukassa", title: "Продажа билетов через ЮKassa на своём сервере", tag: "билеты", date: "20 июня 2026", time: "8 мин" },
    { slug: "cost-of-registration", title: "Сколько стоит программа регистрации на мероприятие", tag: "цены", date: "25 июня 2026", time: "6 мин" },
  ];
  const tagStyle: Record<string, string> = {
    "self-hosted": "bg-[#243954] text-white",
    "152-ФЗ": "bg-[#314180] text-white",
    "check-in": "bg-[#e1eff2] text-[#243954]",
    "promo": "bg-[#e1eff2] text-[#243954]",
    "билеты": "bg-[#f2f2f2] text-[#525252] border border-[#b3b3b3]",
    "цены": "bg-[#f2f2f2] text-[#525252] border border-[#b3b3b3]",
  };
  const hasContent = (slug: string) => ARTICLES.some(a => a.slug === slug);
  const allTags = [...new Set(allArticles.map(a => a.tag))];
  const filtered = activeTag ? allArticles.filter(a => a.tag === activeTag) : allArticles;

  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-3">Статьи</h1>
          <p className="text-lg text-[#525252]">Экспертиза в event-технологиях и 152-ФЗ — органический трафик по специализированным запросам</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 text-sm font-medium transition-colors border ${!activeTag ? "bg-[#243954] text-white border-[#243954]" : "bg-white text-[#525252] border-[#b3b3b3] hover:border-[#243954] hover:text-[#243954]"}`}
            >
              Все ({allArticles.length})
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-2 text-sm font-medium transition-colors border ${activeTag === tag ? "bg-[#243954] text-white border-[#243954]" : "bg-white text-[#525252] border-[#b3b3b3] hover:border-[#243954] hover:text-[#243954]"}`}
              >
                {tag} ({allArticles.filter(a => a.tag === tag).length})
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((a, i) => (
              <button key={i} onClick={() => openArticle(a.slug)}
                className="bg-white border border-[#b3b3b3] flex flex-col text-left hover:shadow-md hover:border-[#243954] transition-all group">
                <div className="h-1.5 bg-[#243954] group-hover:bg-[#314180] transition-colors" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className={`text-xs font-mono px-2 py-0.5 ${tagStyle[a.tag] || "bg-[#f2f2f2] text-[#525252]"}`}>{a.tag}</span>
                    <span className="text-xs text-[#525252]">{a.date}</span>
                    <span className="text-xs text-[#525252]">· {a.time}</span>
                    {!hasContent(a.slug) && <span className="text-xs text-[#b3b3b3] italic">скоро</span>}
                  </div>
                  <h2 className="font-ubuntu font-bold text-[#243954] mb-4 flex-1 leading-snug text-sm">{a.title}</h2>
                  <div className="flex items-center gap-1 text-sm text-[#314180] font-medium mt-auto group-hover:text-[#243954] transition-colors">
                    Читать <ChevronRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#525252]">
              Нет статей по выбранному тегу. <button onClick={() => setActiveTag(null)} className="text-[#314180] underline">Показать все</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACTS PAGE
// ─────────────────────────────────────────────────────────────
function ContactsPage() {
  const { openContact } = useApp();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", module: "", comment: "", consent: false });
  const [sent, setSent] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-3">Контакты</h1>
          <p className="text-lg text-[#525252]">Запросите коммерческое предложение или демо. Чат поддержки. Email.</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2" id="demo">
              <div className="bg-white border border-[#b3b3b3]">
                <div className="px-8 py-6 border-b border-[#b3b3b3]">
                  <h2 className="font-ubuntu font-bold text-[#243954] text-2xl mb-1">Запросить КП / Демо</h2>
                  <p className="text-xs text-[#525252]">Ответим в течение 1–2 рабочих дней</p>
                </div>
                <div className="px-8 py-3 bg-[#f2f2f2] border-b border-[#b3b3b3]">
                  <p className="text-xs text-[#525252]">
                    <strong>Prototype stub.</strong> В продакшне — embed Jivo Contact Form (§4.2 спеки). Данные через Jivo (РФ, 152-ФЗ).
                  </p>
                </div>
                {sent ? (
                  <div className="px-8 py-12 text-center">
                    <div className="w-14 h-14 bg-[#e1eff2] flex items-center justify-center mx-auto mb-5">
                      <Check size={28} className="text-[#243954]" />
                    </div>
                    <h3 className="font-ubuntu font-bold text-[#243954] text-xl mb-2">Заявка отправлена</h3>
                    <p className="text-[#525252] text-sm">Свяжемся с вами в течение 1–2 рабочих дней.</p>
                  </div>
                ) : (
                  <form className="px-8 py-6 space-y-5" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[{ l: "Имя *", k: "name", t: "text", r: true }, { l: "Компания *", k: "company", t: "text", r: true }].map(f => (
                        <div key={f.k}>
                          <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">{f.l}</label>
                          <input type={f.t} required={f.r} value={form[f.k as keyof typeof form] as string} onChange={set(f.k)}
                            className="w-full border border-[#b3b3b3] px-4 py-3 text-sm focus:outline-none focus:border-[#243954] transition-colors" />
                        </div>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      {[{ l: "Email *", k: "email", t: "email", r: true }, { l: "Телефон", k: "phone", t: "tel", r: false }].map(f => (
                        <div key={f.k}>
                          <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">{f.l}</label>
                          <input type={f.t} required={f.r} value={form[f.k as keyof typeof form] as string} onChange={set(f.k)}
                            className="w-full border border-[#b3b3b3] px-4 py-3 text-sm focus:outline-none focus:border-[#243954] transition-colors" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">Интересующий модуль *</label>
                      <select required value={form.module} onChange={set("module")}
                        className="w-full border border-[#b3b3b3] px-4 py-3 text-sm focus:outline-none focus:border-[#243954] bg-white">
                        <option value="">Выберите модуль...</option>
                        {["Рег.Поинт","Промо.Поинт","Промо.Про","Тикет.Поинт","Не знаю"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#243954] mb-1.5 uppercase tracking-wide">Комментарий</label>
                      <textarea rows={4} value={form.comment} onChange={set("comment")} placeholder="Опишите вашу задачу..."
                        className="w-full border border-[#b3b3b3] px-4 py-3 text-sm focus:outline-none focus:border-[#243954] resize-none" />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="main-consent" required checked={form.consent}
                        onChange={e => setForm(p => ({ ...p, consent: e.target.checked }))} className="mt-1 accent-[#243954]" />
                      <label htmlFor="main-consent" className="text-xs text-[#525252]">
                        Согласен с <span className="text-[#314180] underline cursor-pointer">обработкой персональных данных</span> согласно Политике конфиденциальности *
                      </label>
                    </div>
                    <button type="submit" className="w-full py-4 bg-[#243954] text-white font-bold hover:bg-[#1a2d43] transition-colors text-sm">
                      Отправить заявку
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-[#b3b3b3] p-6">
                <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Связаться напрямую</h3>
                <button onClick={openContact} className="w-full py-3.5 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center justify-center gap-2 text-sm mb-2">
                  <MessageCircle size={18} /> Открыть чат
                </button>
                <p className="text-xs text-[#525252] text-center">Jivo · онлайн-чат · Telegram</p>
              </div>
              <div className="bg-[#e1eff2] border border-[#b3b3b3] p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock size={17} className="text-[#243954] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#243954] text-sm mb-1">Время ответа</div>
                    <div className="text-xs text-[#525252]">Рабочие дни: до 2 часов<br />Вне рабочих часов: до 4 часов (следующий рабочий день)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield size={17} className="text-[#243954] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#243954] text-sm mb-1">Данные формы</div>
                    <div className="text-xs text-[#525252]">Обрабатываются через Jivo (ООО «Живой Сайт», РФ, 152-ФЗ)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing clients support section */}
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#b3b3b3] p-6">
              <div className="text-xs font-semibold text-[#314180] uppercase tracking-widest mb-3">Для существующих клиентов</div>
              <h3 className="font-ubuntu font-bold text-[#243954] text-lg mb-3">Техническая поддержка</h3>
              <p className="text-sm text-[#525252] mb-4">Если у вас уже есть лицензия Рег.Поинт и вам нужна помощь с инстансом, обновлением или настройкой — обратитесь в чат с указанием вашего лицензионного ID.</p>
              <ul className="space-y-2 text-sm text-[#525252] mb-5">
                <li className="flex items-center gap-2"><Check size={13} className="text-[#243954] shrink-0" />Базовая поддержка — включена в 1-й год</li>
                <li className="flex items-center gap-2"><Check size={13} className="text-[#243954] shrink-0" />Расширенный SLA — от 59 000 ₽/год</li>
                <li className="flex items-center gap-2"><Check size={13} className="text-[#243954] shrink-0" />Приоритетная линия — от 39 000 ₽/год</li>
              </ul>
              <button onClick={openContact} className="w-full py-3 border border-[#243954] text-[#243954] text-sm font-semibold hover:bg-[#243954] hover:text-white transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={16} /> Написать в поддержку
              </button>
            </div>
            <div className="bg-white border border-[#b3b3b3] p-6">
              <div className="text-xs font-semibold text-[#314180] uppercase tracking-widest mb-3">Для новых клиентов</div>
              <h3 className="font-ubuntu font-bold text-[#243954] text-lg mb-3">Предпродажные вопросы</h3>
              <p className="text-sm text-[#525252] mb-4">Если вы рассматриваете Рег.Поинт для вашего проекта и хотите обсудить модули, ценообразование или провести демо — заполните форму выше или напишите в чат.</p>
              <div className="space-y-3 text-sm text-[#525252] mb-5">
                {[
                  "Демо под ваш сценарий — бесплатно",
                  "КП в течение 1–2 рабочих дней",
                  "Пилот / тестовый период — по запросу",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={13} className="text-[#243954] shrink-0" />{item}
                  </div>
                ))}
              </div>
              <button onClick={() => { const el = document.getElementById("demo"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full py-3 bg-[#243954] text-white text-sm font-semibold hover:bg-[#1a2d43] transition-colors flex items-center justify-center gap-2">
                <ArrowRight size={16} /> Заполнить форму выше
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// PRIVACY PAGE
// ─────────────────────────────────────────────────────────────
function PrivacyPage() {
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-2">Политика конфиденциальности</h1>
          <p className="text-[#525252] text-sm">Последнее обновление: январь 2026</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-8">
            {[
              { title: "1. Оператор сайта", text: "Настоящая политика регулирует обработку персональных данных на сайте reg.point. Оператор персональных данных — ООО «Рег.Поинт»." },
              { title: "2. Цели обработки персональных данных", text: "Персональные данные обрабатываются в следующих целях: обработка заявок на коммерческое предложение и демо, онлайн-чат и обращения в поддержку, аналитика использования сайта (Яндекс.Метрика, Google Analytics 4)." },
              { title: "3. Правовые основания", text: "Обработка ПД осуществляется на основании согласия субъекта ПД (статья 6, часть 1, пункт 1 Федерального закона №152-ФЗ «О персональных данных»)." },
              { title: "4. Сроки хранения", text: "Персональные данные из форм заявок хранятся в течение 3 лет или до отзыва согласия субъектом ПД. Данные чата Jivo — согласно политике Jivo." },
              { title: "5. Jivo как обработчик ПД", text: "Чат и формы сайта обслуживаются сервисом Jivo (ООО «Живой Сайт», Российская Федерация). Данные обрабатываются на серверах в РФ. С Jivo заключён договор об обработке ПД согласно требованиям 152-ФЗ." },
              { title: "6. Cookie и аналитика", text: "Сайт использует файлы cookie. Яндекс.Метрика и Google Analytics 4 используются для анализа трафика. При первом посещении отображается запрос на согласие с использованием cookie. Типы cookie описаны ниже." },
              { title: "7. Права субъекта ПД", text: "Вы вправе: запросить доступ к своим данным, потребовать исправления или удаления, отозвать согласие. Для реализации прав направьте запрос через форму на странице Контакты." },
              { title: "8. Контакт ответственного", text: "По вопросам обработки ПД: privacy@reg.point" },
            ].map((s, i) => (
              <div key={i} className={`${i > 0 ? "border-t border-[#b3b3b3] pt-8" : ""}`}>
                <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-3">{s.title}</h2>
                <p className="text-[#525252] leading-relaxed text-sm">{s.text}</p>
                {/* Cookie types breakdown after section 6 */}
                {i === 5 && (
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm border border-[#b3b3b3]">
                      <thead>
                        <tr className="bg-[#e1eff2]">
                          <th className="text-left px-4 py-2.5 font-ubuntu font-semibold text-[#243954]">Тип</th>
                          <th className="text-left px-4 py-2.5 font-ubuntu font-semibold text-[#243954]">Назначение</th>
                          <th className="text-left px-4 py-2.5 font-ubuntu font-semibold text-[#243954]">Срок</th>
                          <th className="text-left px-4 py-2.5 font-ubuntu font-semibold text-[#243954]">Отключить</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#b3b3b3]">
                        {[
                          ["Необходимые", "Работа сайта, сессия, lang-cookie", "Сессия", "Нельзя — критичны для работы"],
                          ["Аналитические", "Яндекс.Метрика — подсчёт посещений, вебвизор", "1 год", "Через баннер cookie"],
                          ["Аналитические", "Google Analytics 4 — анализ трафика EN", "2 года", "Через баннер cookie"],
                          ["Функциональные", "Jivo — онлайн-чат, сохранение диалога", "1 год", "Через баннер cookie"],
                        ].map(([type, desc, ttl, opt], j) => (
                          <tr key={j} className="hover:bg-[#f2f2f2] transition-colors">
                            <td className="px-4 py-2.5 font-medium text-[#243954]">{type}</td>
                            <td className="px-4 py-2.5 text-[#525252]">{desc}</td>
                            <td className="px-4 py-2.5 text-[#525252] font-mono text-xs">{ttl}</td>
                            <td className="px-4 py-2.5 text-[#525252] text-xs">{opt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// COOKIE BANNER (§4.6 — Яндекс.Метрика + GA4)
// ─────────────────────────────────────────────────────────────
function CookieBanner({ onAccept, onPrivacy }: { onAccept: () => void; onPrivacy: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#243954] text-white border-t border-white/15 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-white/80 max-w-2xl">
          Мы используем cookie для аналитики (Яндекс.Метрика, Google Analytics 4). Данные обрабатываются согласно{" "}
          <button onClick={onPrivacy} className="text-[#e1eff2] underline hover:text-white transition-colors">Политике конфиденциальности</button>.
          Заявки обрабатываются через Jivo (РФ, 152-ФЗ).
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={onAccept} className="px-5 py-2.5 bg-white text-[#243954] text-sm font-semibold hover:bg-[#e1eff2] transition-colors">
            Принять
          </button>
          <button onClick={onAccept} className="px-5 py-2.5 border border-white/35 text-white text-sm hover:border-white transition-colors">
            Только необходимые
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FLOATING CONTACT BUTTON (умная кнопка §4.5)
// ─────────────────────────────────────────────────────────────
function FloatingContact() {
  const { openContact } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={openContact}
      aria-label="Связаться"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 bg-[#243954] text-white font-semibold shadow-2xl hover:bg-[#1a2d43] transition-all duration-300 text-sm ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <MessageCircle size={18} />
      Связаться
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// ARTICLE DATA & DETAIL PAGE (§9.3, §9.4)
// ─────────────────────────────────────────────────────────────
const ARTICLES: Array<{
  slug: string; title: string; tag: string; date: string; time: string;
  lead: string; sections: Array<{ h: string; body: string }>;
  faq: Array<{ q: string; a: string }>; cta: string;
  productRef?: { page: PageId; name: string; price: string };
}> = [
  {
    slug: "self-hosted-vs-saas",
    title: "Self-hosted vs SaaS: как выбрать регистрацию на мероприятие",
    tag: "self-hosted", date: "15 мая 2026", time: "7 мин",
    lead: "SaaS удобен в старте, но хранит базу участников у себя. Self-hosted требует VPS, зато данные под вашим контролем. Разбираем, когда что выбрать — и почему для B2B и regulated-отраслей выбор однозначен.",
    sections: [
      { h: "Что такое SaaS-регистратор", body: "Сервисы вроде Timepad, Eventbrite, RegistrationDesk хранят всю базу участников на своих серверах в многопользовательской (multi-tenant) среде. Вы арендуете функционал — но данные ваших гостей физически находятся у провайдера. Для небольших публичных мероприятий это нормально. Для корпоративных, фармацевтических или банковских ивентов это может быть проблемой." },
      { h: "Что такое self-hosted (коробочное) решение", body: "Коробочное ПО разворачивается на сервере клиента — вашем VPS или VDS у российского хостера. База участников (MySQL), файлы и логи хранятся там же. Провайдер решения не имеет доступа к вашим данным и не является оператором ПД ваших участников. Вы сами управляете бэкапами, ротацией ключей и сроками хранения." },
      { h: "Когда важен self-hosted", body: "Self-hosted критичен, если: ваш заказчик — банк, фарма, госструктура или крупная корпорация с требованиями к локализации ПД; мероприятие собирает чувствительные данные (паспортные данные, медицинские анкеты, данные сотрудников); вы работаете по 152-ФЗ и хотите минимизировать цепочку обработчиков ПД; у клиента есть собственная ИБ-политика, требующая хранения данных только на корпоративной инфраструктуре." },
      { h: "Как помогает Рег.Поинт", body: "Рег.Поинт — коробочная платформа, которая разворачивается через Docker-compose на VPS клиента или агентства. MySQL-база остаётся на вашем сервере. Compliance-стек 152-ФЗ встроен: шифрование AES-256-GCM, audit log, согласие на обработку ПД на каждое мероприятие, запрос удаления по требованию участника. Стоимость лицензии — от 100 000 ₽, без ежемесячных платежей за каждое мероприятие." },
    ],
    faq: [
      { q: "Нужен ли программист для установки Рег.Поинт?", a: "Docker-compose + подробный runbook. Если нет своего DevOps — есть услуга turnkey-внедрения от 45 000 ₽." },
      { q: "SaaS дешевле на старте — это так?", a: "Да, но при регулярных мероприятиях (4+ в год) совокупная стоимость SaaS-подписки за 2–3 года превышает стоимость лицензии коробки." },
    ],
    cta: "Нужна регистрация на вашем сервере?",
    productRef: { page: "reg-point", name: "Рег.Поинт", price: "от 100 000 ₽" },
  },
  {
    slug: "152fz-checklist",
    title: "152-ФЗ на мероприятии: чеклист для организатора",
    tag: "152-ФЗ", date: "20 мая 2026", time: "9 мин",
    lead: "Каждое мероприятие, где собираются ФИО, email и телефоны участников — обработка персональных данных по 152-ФЗ. Разбираем, что должен сделать организатор до, во время и после ивента.",
    sections: [
      { h: "Что считается персональными данными на мероприятии", body: "ФИО, email, телефон, должность, компания — всё это ПД. Если вы регистрируете участников через форму, вы становитесь оператором ПД и обязаны соблюдать требования 152-ФЗ: получить согласие, обеспечить безопасность, ограничить доступ и дать возможность удалить данные по запросу." },
      { h: "Чеклист: до мероприятия", body: "✓ Определён оператор ПД (юрлицо или ИП). ✓ Подготовлен текст согласия на обработку ПД — отдельно для каждого мероприятия, с указанием целей и срока хранения. ✓ На форме регистрации обязательный чекбокс с ссылкой на политику конфиденциальности. ✓ Определён ответственный за обработку ПД (DPO или назначенное лицо). ✓ Выбрана платформа с локализацией данных в РФ." },
      { h: "Чеклист: во время мероприятия", body: "✓ Доступ к базе участников только у авторизованных сотрудников. ✓ Менеджеры на площадке видят маскированные данные (только имя + статус). ✓ Check-in через QR — никаких бумажных списков с полными данными. ✓ Offline-режим работает без передачи данных через публичные точки WiFi." },
      { h: "Чеклист: после мероприятия", body: "✓ Установлен срок хранения данных (рекомендуется не более 1 года для участников, если нет иного основания). ✓ Обеспечена процедура удаления ПД по запросу участника. ✓ Audit log сохранён на случай проверки Роскомнадзора." },
      { h: "Как помогает Рег.Поинт", body: "Все пункты чеклиста покрыты из коробки: согласие per-event, маскирование для manager, audit log, запрос удаления — без доплат и доработок. Данные хранятся на вашем сервере, что упрощает переговоры с корпоративными заказчиками." },
    ],
    faq: [
      { q: "Нужна ли нотификация Роскомнадзора?", a: "Да, операторы ПД обязаны уведомить РКН. Это отдельный процесс, не связанный напрямую с платформой регистрации." },
      { q: "Достаточно ли чекбокса на форме?", a: "Чекбокс необходим, но текст согласия должен быть конкретным: цели обработки, срок хранения, перечень данных. Шаблоны — отдельный SKU в Рег.Поинт." },
    ],
    cta: "Нужна платформа с compliance 152-ФЗ из коробки?",
    productRef: { page: "reg-point", name: "Рег.Поинт", price: "от 100 000 ₽" },
  },
  {
    slug: "cost-of-registration",
    title: "Сколько стоит программа регистрации на мероприятие",
    tag: "цены", date: "25 июня 2026", time: "6 мин",
    lead: "Сравниваем модели ценообразования: SaaS-подписки по участникам, коробочные лицензии и кастомная разработка. Реальные цифры для event-агентства с 5–20 мероприятиями в год.",
    sections: [
      { h: "Модели ценообразования на рынке", body: "Существует три основных модели: 1) SaaS с оплатой за участника (0,5–3% от стоимости билета + фиксированная плата за мероприятие); 2) SaaS-подписка (фиксированная ежемесячная плата, обычно 3 000–30 000 ₽/мес в зависимости от лимитов); 3) Коробочная лицензия (разовая оплата, данные на своём сервере, без ежемесячных платежей за каждое мероприятие)." },
      { h: "Расчёт для агентства с 12 мероприятиями в год", body: "SaaS-подписка: ~15 000 ₽/мес × 12 = 180 000 ₽/год. Через 2 года — 360 000 ₽ без владения данными и без возможности установить на сервер клиента. Рег.Поинт: 100 000 ₽ (лицензия) + 45 000 ₽ (turnkey) + 12 000 ₽ (обучение) = 157 000 ₽ в первый год. С 2-го года — от 35 000 ₽ подписка на обновления. Итого за 2 года: ~192 000 ₽." },
      { h: "Когда SaaS выгоднее", body: "SaaS оправдан при: 1–3 мероприятиях в год без требований к локализации ПД; стартовом бюджете без возможности единовременной выплаты 100k; если не нужна установка на сервер клиента." },
      { h: "Как помогает Рег.Поинт", body: "Для агентств с регулярными мероприятиями и корпоративными клиентами (банки, фарма, ретейл) коробочная модель Рег.Поинт экономически выгоднее уже со 2-го года и закрывает требования 152-ФЗ без доплат." },
    ],
    faq: [
      { q: "Есть ли скрытые платежи в Рег.Поинт?", a: "Нет. Лицензия, 1-й год поддержки включён. С 2-го года — подписка на обновления от 35 000 ₽/год. Никаких платежей за участника или мероприятие." },
      { q: "Можно ли начать с дешёвого модуля и апгрейдиться?", a: "Да. Промо.Поинт (80k) → апгрейд до Промо.Про (+100k). Рег.Поинт (100k) + Тикет.Поинт (+80k) при появлении задачи." },
    ],
    cta: "Рассчитать стоимость под ваш сценарий?",
    productRef: { page: "pricing", name: "Цены и лицензии", price: "от 80 000 ₽" },
  },
  {
    slug: "qr-check-in",
    title: "QR check-in на конференции: пошаговое руководство",
    tag: "check-in", date: "28 мая 2026", time: "6 мин",
    lead: "QR check-in ускоряет регистрацию на входе в 3–5 раз по сравнению с бумажными списками. Разбираем, как организовать процесс от импорта участников до выгрузки отчёта attendance.",
    sections: [
      { h: "Как работает QR check-in", body: "Каждый участник получает уникальный QR-код после регистрации (в письме-подтверждении или в личном кабинете). На входе волонтёр сканирует код смартфоном — система мгновенно фиксирует прибытие и показывает имя, статус, категорию билета. Никаких бумажных списков, никакого ручного поиска." },
      { h: "Шаг 1: подготовка списка участников", body: "Если участники уже зарегистрированы в другой системе — импортируйте список из CSV или Excel. Рег.Поинт принимает файлы со стандартными колонками: имя, email, телефон, тип участника. Дублирование по email определяется автоматически." },
      { h: "Шаг 2: настройка мероприятия в кабинете", body: "Создайте мероприятие, настройте compliance-блок (текст согласия на ПД, срок хранения), загрузите брендинг. Назначьте менеджеров — они получат доступ только к check-in-функции без доступа к полным данным." },
      { h: "Шаг 3: check-in на площадке", body: "Открываем приложение check-in на смартфоне или планшете волонтёра. Offline-режим: при потере интернета check-in продолжает работать, данные синхронизируются при восстановлении связи. Для конференций 500+ участников рекомендуется 2–3 планшета на разных входах." },
      { h: "Шаг 4: отчёт attendance", body: "После мероприятия выгружайте отчёт: кто пришёл, кто нет, время check-in, процент явки. CSV-экспорт для дальнейшей аналитики или передачи клиенту." },
    ],
    faq: [
      { q: "Работает ли check-in без интернета?", a: "Да. Offline-режим сохраняет отметки локально и синхронизирует при восстановлении сети." },
      { q: "Можно ли настроить многодневный check-in?", a: "Да. Для каждого дня — отдельная сессия check-in с накопленным отчётом attendance." },
    ],
    cta: "Нужен QR check-in на вашем сервере?",
    productRef: { page: "reg-point", name: "Рег.Поинт", price: "от 100 000 ₽" },
  },
  {
    slug: "import-participants",
    title: "Импорт участников из Excel и CSV без ошибок",
    tag: "check-in", date: "1 июня 2026", time: "5 мин",
    lead: "Организаторы часто получают списки участников в Excel от заказчика или из внешней CRM. Разбираем, как правильно подготовить файл, избежать дублей и что делать, если структура нестандартная.",
    sections: [
      { h: "Какой формат принимает Рег.Поинт", body: "CSV (UTF-8 или Windows-1251) и XLSX/XLS. Минимальный набор колонок: имя (или отдельно имя/фамилия), email. Телефон, должность, компания и любые кастомные поля добавляются опционально. Порядок колонок — произвольный: при загрузке вы указываете соответствие полей через интерфейс маппинга." },
      { h: "Подготовка файла: типичные ошибки", body: "1) Разные форматы телефона в одном файле (+7, 8, без кода) — нормализуйте к единому перед загрузкой. 2) Email с пробелами или опечатками — система выделяет невалидные. 3) Дубликаты по email — по умолчанию дубли пропускаются, оригинальная запись сохраняется. 4) Кириллица в заголовках колонок — допустима, но лучше использовать латиницу для надёжности." },
      { h: "Процесс импорта шаг за шагом", body: "Перейдите в мероприятие → вкладка «Участники» → «Импорт». Загрузите файл, укажите соответствие колонок, просмотрите превью (первые 5 строк), подтвердите. Система покажет статистику: добавлено, пропущено (дубли), ошибки (невалидный email). Частичный импорт не откатывается — убедитесь в качестве файла заранее." },
      { h: "Что происходит с ПД при импорте", body: "Импортированные данные сразу шифруются AES-256-GCM на сервере клиента. Audit log фиксирует факт импорта: кто, когда, сколько записей. Менеджеры видят только маскированные данные — полный доступ только у director." },
    ],
    faq: [
      { q: "Можно ли обновить запись, если участник уже зарегистрировался онлайн?", a: "Нет автоматического слияния. Дубль по email пропускается. Изменить данные можно вручную в карточке участника." },
      { q: "Сколько участников можно импортировать за раз?", a: "До 10 000 строк в одном файле. Для больших мероприятий рекомендуется разбивать на пакеты." },
    ],
    cta: "Нужен импорт участников на вашем сервере?",
    productRef: { page: "reg-point", name: "Рег.Поинт", price: "от 100 000 ₽" },
  },
  {
    slug: "promo-fns",
    title: "Промоакция с чеком: как работает проверка ФНС",
    tag: "promo", date: "5 июня 2026", time: "8 мин",
    lead: "Акции «купи — зарегистрируй чек — получи приз» требуют верификации чека через ФНС. Разбираем, как устроен API kkt-online, что проверяется и где типичные точки отказа.",
    sections: [
      { h: "Зачем нужна верификация чека", body: "Без проверки участник может ввести любой набор цифр в поле «номер чека». Верификация через ФНС (API kkt-online) подтверждает: чек существует в реестре ФНС, совпадают ИНН магазина/сети-партнёра акции, дата и сумма в допустимых диапазонах, чек ещё не использовался в этой акции (антидублирование)." },
      { h: "Как работает API ФНС kkt-online", body: "Пользователь вводит QFD-код (qr-сканером или вручную: fn, fd, fp, сумма, дата). Рег.Поинт отправляет запрос к API ФНС. Ответ: чек найден / не найден / ошибка сервиса. При успехе — дополнительная проверка: ИНН продавца входит в белый список партнёров акции, дата попадает в период акции, сумма ≥ минимальной по условиям. Если все условия выполнены — регистрация засчитывается." },
      { h: "OCR fallback: когда API ФНС недоступен", body: "API ФНС имеет регламентные окна обслуживания и нередко даёт timeout. Промо.Про включает OCR fallback на базе Tesseract.js: пользователь фотографирует чек, система распознаёт ключевые поля и ставит запись в очередь на повторную верификацию через API ФНС, когда сервис восстановится. Участник получает статус «на проверке» — не отказ." },
      { h: "Антифрод: один телефон — одна регистрация", body: "Правило настраивается на уровне акции: один номер телефона может подать не более N чеков за период. При превышении лимита — отказ с пояснением. Дополнительно: детектирование серийных чеков одного ИНН (признак покупки «на полке» специально для акции)." },
      { h: "Токен ФНС и УЦИБ", body: "Для работы API kkt-online требуется зарегистрированный токен на сайте ФНС. Токен привязан к юрлицу заказчика или агентства. Регистрация токена и его подключение к инстансу Рег.Поинт — отдельный SKU внедрения (от 15 000 ₽, входит в Промо.Про базово)." },
    ],
    faq: [
      { q: "Работает ли проверка для чеков из любого магазина?", a: "Только для ИНН, включённых в белый список акции. Стандартная настройка — список ИНН партнёров из условий акции." },
      { q: "Что если ФНС вернул ошибку «чек не найден»?", a: "Возможные причины: чек ещё не попал в реестр (кассы синхронизируются с ФНС с задержкой до 2 часов). Рекомендуем предусмотреть окно ожидания и повторную попытку для пользователя." },
    ],
    cta: "Нужна промоакция с проверкой чеков ФНС?",
    productRef: { page: "promo-pro", name: "Промо.Про", price: "180 000 ₽" },
  },
  {
    slug: "ocr-fallback",
    title: "OCR чеков в промо: когда нужен fallback",
    tag: "promo", date: "10 июня 2026", time: "6 мин",
    lead: "API ФНС недоступен в среднем 2–5% времени. Без fallback это потерянные регистрации и негатив участников. Разбираем, как OCR на Tesseract.js решает проблему и какие у него ограничения.",
    sections: [
      { h: "Проблема: API ФНС нестабилен", body: "API kkt-online (tax.gov.ru) имеет регламентное обслуживание по ночам и периодические таймауты в пиковые часы. Если ваша акция активна в выходные (высокая нагрузка на ФНС), вероятность ошибки выше. Без fallback участник получает «ошибку проверки» и уходит — негатив в соцсетях, жалобы на горячую линию." },
      { h: "Как работает OCR fallback в Промо.Про", body: "При таймауте API ФНС пользователю предлагается сфотографировать чек. Фото обрабатывается Tesseract.js (WASM, выполняется в браузере — данные не уходят на сторонний сервер). Распознаются: номер ФД, ФН, ФП, сумма, дата, время, ИНН. Запись ставится в статус «на верификации» — повторный запрос к ФНС идёт автоматически каждые 30 минут в течение 24 часов." },
      { h: "Точность OCR и типичные проблемы", body: "Tesseract.js хорошо работает с термочеками стандартного формата. Проблемы: смятый или влажный чек (точность падает до 60–70%), ручная касса с нестандартным шрифтом, QR-код не читается из-за бликов. Рекомендации для акции: инструкция «сфотографируйте чек на белом фоне при хорошем освещении», ограничение на 2 попытки OCR." },
      { h: "Модерация сложных случаев", body: "Записи с низкой уверенностью OCR (confidence < 80%) помечаются флагом для ручной проверки оператором в кабинете. Director видит фото чека и поля, может подтвердить или отклонить вручную. Полный trail в audit log." },
    ],
    faq: [
      { q: "OCR обрабатывается на сервере клиента или на стороннем?", a: "Tesseract.js работает в браузере участника (WASM). Фото чека передаётся только на сервер клиента для хранения и ручной проверки. Никаких сторонних OCR-сервисов." },
      { q: "Можно ли отключить OCR и оставить только API ФНС?", a: "Да. Fallback включается/выключается в настройках акции." },
    ],
    cta: "Нужна промоакция с надёжной проверкой чеков?",
    productRef: { page: "promo-pro", name: "Промо.Про", price: "180 000 ₽" },
  },
  {
    slug: "docker-vps",
    title: "Docker для event-платформы: требования к VPS",
    tag: "self-hosted", date: "15 июня 2026", time: "7 мин",
    lead: "Рег.Поинт разворачивается через Docker-compose. Разбираем минимальные и рекомендуемые требования к VPS, выбор хостинга в РФ и типичные проблемы деплоя.",
    sections: [
      { h: "Минимальные системные требования", body: "ОС: Ubuntu 22.04 LTS или Debian 12 (рекомендуется). CPU: 2 vCPU. RAM: 2 GB (минимум), 4 GB рекомендуется для Промо.Про с OCR. Диск: 20 GB SSD (под ОС + Docker-образы + MySQL). Сеть: статический IP или домен с A-записью для HTTPS." },
      { h: "Рекомендуемая конфигурация для production", body: "4 vCPU / 8 GB RAM / 50 GB SSD — для мероприятий до 5 000 участников одновременно. MySQL хранит данные в volume на отдельном разделе. Отдельный VPS для staging — опционально, но рекомендуется при активных доработках. Бэкап: cron-скрипт mysqldump + rsync на S3-совместимое хранилище." },
      { h: "Российские хостеры: на что обратить внимание", body: "Для 152-ФЗ данные должны обрабатываться на серверах в РФ. Рекомендуемые хостеры: Selectel, Timeweb Cloud, Beget VPS, МТС Cloud, Яндекс Cloud (VPC). Выбирайте датацентры в Москве или Санкт-Петербурге — более стабильный аптайм. Cloudflare можно использовать только для CDN статики, но не для проксирования API с ПД." },
      { h: "Процесс деплоя", body: "1) Установка Docker и docker-compose (runbook прилагается к лицензии). 2) Клонирование конфигурационного репозитория (приватный, выдаётся при покупке). 3) Настройка .env: DB_PASSWORD, LICENSE_KEY, APP_DOMAIN. 4) docker-compose up -d. 5) Настройка Nginx/Caddy + Let's Encrypt для HTTPS. 6) Smoke-test: создать тестовое мероприятие, зарегистрировать участника, выполнить check-in." },
      { h: "Turnkey внедрение", body: "Если нет своего DevOps — Рег.Поинт предоставляет услугу «под ключ» (45 000 ₽): подключаемся к серверу клиента по SSH, выполняем весь деплой, настраиваем HTTPS, запускаем smoke-test. Доступ к серверу остаётся у клиента." },
    ],
    faq: [
      { q: "Можно ли использовать shared-хостинг?", a: "Нет. Docker требует root-доступа или как минимум привилегированного пользователя. Только VPS/VDS." },
      { q: "Нужен ли выделенный сервер для каждого заказчика?", a: "Не обязательно. Одна лицензия — один инстанс / одно юрлицо. Несколько заказчиков можно обслуживать через роли director, изолируя данные на уровне приложения. Физически разные серверы — только если требования ИБ клиента это предписывают." },
    ],
    cta: "Нужна помощь с деплоем на ваш сервер?",
    productRef: { page: "technology", name: "Технологии", price: "turnkey от 45 000 ₽" },
  },
  {
    slug: "consent-pd",
    title: "Согласие на обработку ПД: что указать на странице регистрации",
    tag: "152-ФЗ", date: "18 июня 2026", time: "10 мин",
    lead: "Чекбокс «Согласен с обработкой ПД» на форме регистрации — необходимое, но недостаточное условие. Разбираем, что должен содержать текст согласия, чтобы выдержать проверку Роскомнадзора.",
    sections: [
      { h: "Что говорит 152-ФЗ о согласии", body: "Статья 9 152-ФЗ требует, чтобы согласие на обработку ПД было: конкретным (указаны цели), информированным (субъект понимает, что именно соглашается), сознательным (не предзаполненный чекбокс), однозначным (не смешано с другими условиями). Общая формулировка «согласен с политикой конфиденциальности» — недостаточна." },
      { h: "Обязательные элементы текста согласия", body: "1) Наименование оператора ПД (юрлицо или ИП). 2) Цели обработки — конкретные: «регистрация на мероприятие [название], уведомление об изменениях программы». 3) Перечень обрабатываемых данных: ФИО, email, телефон, должность. 4) Срок хранения. 5) Перечень действий с ПД: сбор, хранение, использование для уведомлений. 6) Способ отзыва согласия. 7) Ссылка на полную политику конфиденциальности." },
      { h: "Разные тексты для разных типов мероприятий", body: "Корпоратив закрытый (только сотрудники): упрощённая версия, ссылка на внутреннюю политику компании. Публичная конференция: стандартный текст с указанием организатора. Pharma-ивент: расширенная версия с указанием данных DPO, ссылкой на реестр операторов ПД. Рег.Поинт позволяет настраивать текст согласия отдельно для каждого мероприятия — не «общий» текст системы." },
      { h: "Форма выражения согласия", body: "Чекбокс должен быть: пустым по умолчанию (не предзаполненным), обязательным для заполнения формы, рядом с текстом (не в футере). Ссылка на политику открывается в новой вкладке, чтобы пользователь не потерял форму. Альтернатива: inline-текст с раскрывающимся блоком «подробнее» — удобнее на мобильных." },
      { h: "Как это работает в Рег.Поинт", body: "При создании мероприятия director вводит текст согласия вручную или выбирает из сохранённых шаблонов. Система не подставляет «дефолтный» текст — это намеренное решение: ответственность за формулировку остаётся у оператора. Audit log фиксирует факт акцепта согласия: timestamp, IP, версия текста." },
    ],
    faq: [
      { q: "Обязателен ли отдельный чекбокс, или можно включить согласие в оферту?", a: "Для обработки ПД нужен отдельный чекбокс. Смешивание с акцептом оферты или правил акции — риск: Роскомнадзор может признать согласие недействительным." },
      { q: "Что делать, если участник отзывает согласие после мероприятия?", a: "По запросу участника — удаление ПД в течение 30 дней. Рег.Поинт предоставляет публичный endpoint для подачи запроса на удаление. Director подтверждает удаление вручную или через автоматическое правило." },
    ],
    cta: "Нужна платформа с настраиваемыми согласиями per-event?",
    productRef: { page: "compliance", name: "152-ФЗ compliance", price: "в каждом модуле" },
  },
  {
    slug: "tickets-yukassa",
    title: "Продажа билетов через ЮKassa на своём сервере",
    tag: "билеты", date: "20 июня 2026", time: "8 мин",
    lead: "Тикет.Поинт — add-on модуль для продажи билетов через аккаунт ЮKassa заказчика. Деньги идут напрямую клиенту, комиссия ЮKassa — по его договору. Разбираем схему интеграции и ограничения.",
    sections: [
      { h: "Почему ЮKassa, а не встроенный эквайринг", body: "Рег.Поинт не является платёжным агентом и не проводит деньги через себя. Это принципиальная позиция для self-hosted: заказчик сам выступает продавцом, использует свой magaz ЮKassa, деньги поступают на его расчётный счёт. Комиссия ЮKassa (обычно 3,5% для физлиц через онлайн-оплату) — по договору клиента с ЮKassa, к лицензии Рег.Поинт не относится." },
      { h: "Что нужно для подключения", body: "1) Зарегистрированный магазин в ЮKassa (shop_id). 2) Тестовый и боевой secret_key. 3) Настроенный webhook URL — Рег.Поинт предоставит endpoint на вашем инстансе. 4) Активный модуль Рег.Поинт (Тикет.Поинт требует Рег.Поинт на том же инстансе)." },
      { h: "Схема оплаты", body: "Участник выбирает билет и нажимает «Купить». Рег.Поинт создаёт платёж через API ЮKassa от имени магазина заказчика. Участник оплачивает на странице ЮKassa (карта, СБП, ЮMoney). ЮKassa отправляет webhook на инстанс — Рег.Поинт активирует билет и генерирует QR. Деньги в течение T+1 на расчётный счёт заказчика за вычетом комиссии ЮKassa." },
      { h: "Шаблон билета и QR", body: "Редактор шаблона позволяет разместить: логотип мероприятия, имя участника, категорию, уникальный QR-код, дату и место. PDF генерируется на сервере клиента и отправляется на email участника. QR для check-in на входе — тот же механизм, что в Рег.Поинт." },
      { h: "Статус модуля", body: "Тикет.Поинт находится в разработке (backlog). Архитектура интеграции с ЮKassa зафиксирована. Запишитесь через форму — уведомим при релизе и предложим beta-доступ." },
    ],
    faq: [
      { q: "Можно ли продавать билеты без ЮKassa — например, через банковский перевод?", a: "В текущей версии — нет. Тикет.Поинт ориентирован на онлайн-оплату через ЮKassa. Ручной учёт оплат — через статус участника в Рег.Поинт." },
      { q: "Нужна ли онлайн-касса (54-ФЗ) для продажи билетов?", a: "Да. ЮKassa поддерживает передачу данных в ОФД и формирование чеков по 54-ФЗ. Настройка — в кабинете ЮKassa заказчика." },
    ],
    cta: "Интересует продажа билетов на своём сервере?",
    productRef: { page: "ticket-point", name: "Тикет.Поинт", price: "+80 000 ₽ add-on" },
  },
];

function ArticleDetailPage({ slug }: { slug: string }) {
  const { nav, openDemo, openArticle } = useApp();
  const article = ARTICLES.find(a => a.slug === slug);

  const tagStyle: Record<string, string> = {
    "self-hosted": "bg-[#243954] text-white",
    "152-ФЗ": "bg-[#314180] text-white",
    "check-in": "bg-[#e1eff2] text-[#243954]",
    "promo": "bg-[#e1eff2] text-[#243954]",
    "цены": "bg-[#f2f2f2] text-[#525252]",
  };

  if (!article) {
    return (
      <main>
        <section className="bg-white border-b border-[#b3b3b3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
            <button onClick={() => nav("articles")} className="text-xs text-[#314180] uppercase tracking-wide mb-6 flex items-center gap-1 hover:text-[#243954] transition-colors">← Все статьи</button>
            <h1 className="font-ubuntu text-3xl font-bold text-[#243954] mb-4">Статья готовится</h1>
            <p className="text-[#525252]">Эта статья скоро будет опубликована. Подпишитесь на обновления через форму обратной связи.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={openDemo} className="px-6 py-3 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm">Запросить КП / Демо</button>
              <button onClick={() => nav("articles")} className="px-6 py-3 border border-[#b3b3b3] text-[#243954] text-sm hover:border-[#243954] transition-colors">← Все статьи</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // §9.2 — article cover image map by tag
  const COVER_IMGS: Record<string, string> = {
    "self-hosted": "https://images.unsplash.com/photo-1506399309177-3b43e99fead2?w=1200&h=400&fit=crop&auto=format",
    "152-ФЗ":      "https://images.unsplash.com/photo-1593444285553-28163240e3f1?w=1200&h=400&fit=crop&auto=format",
    "check-in":    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop&auto=format",
    "promo":       "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=400&fit=crop&auto=format",
    "билеты":      "https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&h=400&fit=crop&auto=format",
    "цены":        "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&h=400&fit=crop&auto=format",
  };
  const coverImg = COVER_IMGS[article.tag];

  return (
    <main>
      {/* §9.2 Обложка (cover image) */}
      {coverImg && (
        <div className="w-full h-48 md:h-64 bg-[#243954] overflow-hidden">
          <img
            src={coverImg}
            alt={article.title}
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
        </div>
      )}
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <button onClick={() => nav("articles")} className="text-xs text-[#314180] uppercase tracking-wide mb-6 flex items-center gap-1 hover:text-[#243954] transition-colors">← Все статьи</button>
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-mono px-2 py-0.5 ${tagStyle[article.tag] || "bg-[#f2f2f2] text-[#525252]"}`}>{article.tag}</span>
            <span className="text-xs text-[#525252]">{article.date}</span>
            <span className="text-xs text-[#525252]">· {article.time}</span>
          </div>
          <h1 className="font-ubuntu text-3xl md:text-4xl font-bold text-[#243954] leading-tight mb-6">{article.title}</h1>
          <p className="text-lg text-[#525252] leading-relaxed border-l-4 border-[#e1eff2] pl-5">{article.lead}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="space-y-10">
            {article.sections.map((s, i) => (
              <div key={i}>
                <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-3">{s.h}</h2>
                <p className="text-[#525252] leading-relaxed">{s.body}</p>
                {/* §9.4 Inline product link after "Как помогает" section */}
                {article.productRef && s.h.toLowerCase().includes("как помогает") && (
                  <div className="mt-5 flex items-center justify-between border border-[#243954] bg-[#e1eff2] px-5 py-4 gap-4">
                    <div>
                      <div className="font-ubuntu font-bold text-[#243954]">{article.productRef.name}</div>
                      <div className="text-xs text-[#525252]">{article.productRef.price} · Self-hosted · 152-ФЗ</div>
                    </div>
                    <button
                      onClick={() => nav(article.productRef!.page)}
                      className="shrink-0 px-4 py-2 bg-[#243954] text-white text-sm font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-1"
                    >
                      Подробнее <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ block */}
          <div className="mt-12 border-t border-[#b3b3b3] pt-10">
            <h2 className="font-ubuntu font-bold text-[#243954] text-xl mb-5">FAQ</h2>
            <div className="divide-y divide-[#b3b3b3] border border-[#b3b3b3]">
              {article.faq.map((f, i) => (
                <div key={i} className="px-6 py-5">
                  <div className="font-ubuntu font-bold text-[#243954] mb-2 text-sm">{f.q}</div>
                  <div className="text-sm text-[#525252]">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-[#e1eff2] border border-[#b3b3b3] p-8">
            <h3 className="font-ubuntu font-bold text-[#243954] text-xl mb-2">{article.cta}</h3>
            <p className="text-sm text-[#525252] mb-5">Рег.Поинт — коробочная платформа. Данные на вашем сервере, 152-ФЗ из коробки.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openDemo} className="px-6 py-3 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm flex items-center gap-2">
                Запросить КП / Демо <ArrowRight size={15} />
              </button>
              <button onClick={() => nav("articles")} className="px-6 py-3 border border-[#b3b3b3] text-[#243954] text-sm hover:border-[#243954] transition-colors">
                ← Все статьи
              </button>
            </div>
          </div>

          {/* Related articles */}
          <div className="mt-10">
            <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Читайте также</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {ARTICLES.filter(a => a.slug !== slug).slice(0, 2).map(a => (
                <button key={a.slug} onClick={() => openArticle(a.slug)}
                  className="text-left border border-[#b3b3b3] p-5 hover:border-[#243954] hover:bg-[#f2f2f2] transition-all group">
                  <div className="text-xs text-[#314180] mb-2">{a.tag} · {a.time}</div>
                  <div className="font-ubuntu font-bold text-[#243954] text-sm leading-snug group-hover:text-[#314180] transition-colors">{a.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// EN PRICING PAGE (§8.2)
// ─────────────────────────────────────────────────────────────
function PricingEN() {
  const { openDemo, setLang, nav } = useApp();
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-2 text-xs text-[#525252] mb-6">
            <button onClick={() => { setLang("ru"); nav("pricing"); }} className="text-[#314180] underline hover:text-[#243954]">RU</button>
            <span>/</span><span className="font-semibold text-[#243954]">EN</span>
          </div>
          <SectionLabel>Transparent pricing · Self-hosted · 152-FZ included</SectionLabel>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-4">Pricing and licenses <span className="text-[#314180]">Reg.Point</span></h1>
          <p className="text-[#525252] max-w-2xl mb-3">Fixed module prices — no hidden SaaS fees. <strong className="text-[#243954]">Year 1</strong> updates and support <strong className="text-[#243954]">included in the license</strong>. Data stays on client VPS; <strong className="text-[#243954]">152-FZ</strong> compliance in all packages.</p>
          <p className="text-xs text-[#525252] italic border-l-2 border-[#b3b3b3] pl-4">Prices are indicative for 2026 and do not constitute a public offer. Final price — in the commercial proposal.</p>
        </div>
      </section>
      <section className="bg-[#f2f2f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <SH label="Module licenses" title="One-time license fees" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white border border-[#b3b3b3]">
              <thead>
                <tr className="bg-[#243954] text-white">
                  {["Module","License","Year 1 support","From Year 2 *"].map(h => (
                    <th key={h} className="px-6 py-4 font-ubuntu font-semibold text-left last:text-right [&:nth-child(2)]:text-right [&:nth-child(3)]:text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#b3b3b3]">
                {[
                  ["Reg.Point","₽100,000","from ₽35,000/yr"],
                  ["Promo.Point","₽80,000","from ₽30,000/yr"],
                  ["Promo.Pro","₽180,000","from ₽55,000/yr"],
                  ["Ticket.Point (add-on)","+₽80,000","from ₽30,000/yr"],
                ].map(([mod, price, sub], i) => (
                  <tr key={i} className="hover:bg-[#f2f2f2] transition-colors">
                    <td className="px-6 py-4 font-ubuntu font-bold text-[#243954]">{mod}</td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-[#243954]">{price}</td>
                    <td className="px-6 py-4 text-center"><Check size={16} className="text-[#243954] mx-auto" /></td>
                    <td className="px-6 py-4 text-right text-[#525252] text-xs">{sub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#525252] mt-3 italic">* Subscription covers updates, security patches, basic support. Exact renewal amount depends on purchase date and module set.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#b3b3b3] p-6">
              <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Included in every license</h3>
              <CheckList items={["Deployment on 1 instance / 1 legal entity (Docker on client VPS)","Full 152-FZ compliance stack (encryption, audit log, per-event consent)","Activation via code in director account"]} />
            </div>
            <div className="bg-white border border-[#b3b3b3] p-6">
              <h3 className="font-ubuntu font-bold text-[#243954] mb-4">Common bundles</h3>
              <div className="space-y-3">
                {[
                  { s: "Conference check-in", m: "Reg.Point", p: "₽100,000" },
                  { s: "Promo without receipts", m: "Promo.Point", p: "₽80,000" },
                  { s: "Promo + FNS receipts", m: "Promo.Pro", p: "₽180,000" },
                  { s: "Tickets + registration", m: "Reg.Point + Ticket.Point", p: "₽180,000" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between text-sm ${i < 3 ? "border-b border-[#b3b3b3] pb-3" : ""}`}>
                    <div><div className="text-[#243954] font-medium">{item.s}</div><div className="text-[#525252] text-xs">{item.m}</div></div>
                    <div className="font-mono font-bold text-[#243954]">{item.p}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-2 text-sm">
              Request Demo / Quote <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// EN HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomeEN() {
  const { openDemo, openContact, setLang, nav } = useApp();
  return (
    <main>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-[#525252] mb-6">
              <button onClick={() => { setLang("ru"); nav("home"); }} className="text-[#314180] underline hover:text-[#243954]">RU</button>
              <span>/</span><span className="font-semibold text-[#243954]">EN</span>
            </div>
            <SectionLabel>Self-hosted · Docker · 152-FZ · Events &amp; BTL</SectionLabel>
            <h1 className="font-ubuntu text-4xl md:text-5xl font-bold text-[#243954] leading-tight mb-6">
              Event registration — on{" "}
              <span className="relative inline-block">
                <span className="relative z-10">your</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#e1eff2] -z-0" />
              </span>{" "}
              server, not someone else's SaaS
            </h1>
            <p className="text-lg text-[#525252] leading-relaxed mb-8 max-w-2xl">
              <strong className="text-[#243954]">Reg.Point</strong> is a licensed box platform for event agencies and organizers: online registration, QR check-in, promo campaigns with FNS receipt verification, tickets. Deployed on client VPS via Docker. Personal data stays on client infrastructure.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={openDemo} className="px-8 py-4 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors flex items-center gap-2 text-sm">
                Request Demo / Quote <ArrowRight size={16} />
              </button>
              <button onClick={openContact} className="px-8 py-4 bg-[#e1eff2] text-[#243954] font-semibold hover:bg-[#cfe3e8] transition-colors text-sm">Contact Us</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-[#b3b3b3] mt-12">
            {[
              { icon: <Server size={20} />, title: "Self-hosted", desc: "Docker on client VPS; you own the DB and backups" },
              { icon: <Shield size={20} />, title: "152-FZ Ready", desc: "Encryption, audit log, per-event consent forms" },
              { icon: <Package size={20} />, title: "Modular", desc: "Pay only for the modules you need" },
            ].map((b, i) => (
              <div key={i} className={`flex items-start gap-4 p-6 ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#b3b3b3]" : ""}`}>
                <div className="w-10 h-10 bg-[#e1eff2] flex items-center justify-center text-[#243954] shrink-0">{b.icon}</div>
                <div>
                  <div className="font-ubuntu font-bold text-[#243954] mb-1">{b.title}</div>
                  <div className="text-sm text-[#525252]">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Reg.Point", price: "from ₽100,000", desc: "Online registration + QR check-in + list import" },
              { name: "Promo.Point", price: "from ₽80,000", desc: "Promo forms, custom fields, campaign branding" },
              { name: "Promo.Pro", price: "₽180,000", desc: "Promo + FNS API receipt verification + OCR" },
              { name: "Ticket.Point", price: "+₽80,000 add-on", desc: "Ticket sales, templates, YooKassa on client side" },
            ].map((p, i) => (
              <div key={i} className={`border border-[#b3b3b3] border-t-4 ${i % 2 === 0 ? "border-t-[#243954]" : "border-t-[#314180]"} p-6`}>
                <h3 className="font-ubuntu font-bold text-[#243954] text-lg mb-1">{p.name}</h3>
                <div className="font-mono text-xs text-[#314180] mb-3">{p.price}</div>
                <p className="text-sm text-[#525252]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// EN PAGE WRAPPER — generic stub for non-translated pages (§8)
// ─────────────────────────────────────────────────────────────
function ENPageStub({ title, ruPage }: { title: string; ruPage: PageId }) {
  const { setLang, nav, openDemo } = useApp();
  return (
    <main>
      <section className="bg-white border-b border-[#b3b3b3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center gap-2 text-xs text-[#525252] mb-6">
            <button onClick={() => { setLang("ru"); nav(ruPage); }} className="text-[#314180] underline hover:text-[#243954]">RU</button>
            <span>/</span><span className="font-semibold text-[#243954]">EN</span>
          </div>
          <h1 className="font-ubuntu text-4xl font-bold text-[#243954] mb-4">{title}</h1>
          <div className="bg-[#e1eff2] border border-[#b3b3b3] p-6 max-w-xl">
            <p className="text-[#243954] font-medium mb-2">English version of this page is being prepared.</p>
            <p className="text-sm text-[#525252] mb-4">Meanwhile, you can request a quote or demo in English — we respond in both languages.</p>
            <button onClick={openDemo} className="px-6 py-3 bg-[#243954] text-white font-semibold hover:bg-[#1a2d43] transition-colors text-sm flex items-center gap-2">
              Request Demo / Quote <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// SEO page titles map (§6.2)
// ─────────────────────────────────────────────────────────────
const PAGE_TITLES: Record<string, Record<string, string>> = {
  ru: {
    home: "Рег.Поинт — регистрация на мероприятия и промоакции на вашем сервере",
    products: "Модули Рег.Поинт — регистрация, промо, чеки ФНС, билеты",
    "reg-point": "Рег.Поинт — регистрация и check-in на мероприятия | Self-hosted",
    "promo-point": "Промо.Поинт — регистрация в промоакции, кастом-поля | Рег.Поинт",
    "promo-pro": "Промо.Про — промоакции с проверкой чека ФНС и OCR | Рег.Поинт",
    "ticket-point": "Тикет.Поинт — продажа билетов на мероприятия, ЮKassa | Рег.Поинт",
    pricing: "Цены Рег.Поинт 2026 — лицензии, подписка, внедрение и апгрейды",
    technology: "Технологии Рег.Поинт — Docker, REST API, модульный монолит",
    compliance: "152-ФЗ в Рег.Поинт — персональные данные на вашем сервере",
    "how-it-works": "Как работает Рег.Поинт — от лицензии до первого check-in",
    scenarios: "Сценарии использования Рег.Поинт — конференции, промо, билеты",
    faq: "FAQ — частые вопросы о Рег.Поинт",
    articles: "Статьи — экспертиза в event-технологиях и 152-ФЗ | Рег.Поинт",
    contacts: "Контакты Рег.Поинт — демо, КП, поддержка",
    privacy: "Политика конфиденциальности | Рег.Поинт",
  },
  en: {
    home: "Reg.Point — Event Registration on Your Own Server",
    pricing: "Reg.Point Pricing 2026 — Licenses, Subscription, Deployment",
    technology: "Reg.Point Technology — Docker, REST API, Modular Architecture",
    compliance: "152-FZ Compliance in Reg.Point — Personal Data on Your Server",
  },
};

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────
export default function App() {
  // §4.7 i18n — persist lang preference to cookie/localStorage
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem("lang") as Lang) || "ru"; } catch { return "ru"; }
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
  };
  const [page, setPage] = useState<PageId>("home");
  const [contactOpen, setContactOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [articleSlug, setArticleSlug] = useState<string | null>(null);
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    try { return !!localStorage.getItem("cookie-consent"); } catch { return false; }
  });

  const nav = (p: PageId) => {
    setPage(p);
    setArticleSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openArticle = (slug: string) => {
    setArticleSlug(slug);
    setPage("articles");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const acceptCookie = () => {
    try { localStorage.setItem("cookie-consent", "1"); } catch {}
    setCookieAccepted(true);
  };

  // §6.2, §6.3, §4.7 — SEO: title, meta, OG, hreflang, canonical, Schema.org
  useEffect(() => {
    const BASE = "https://reg.point";
    const titles = PAGE_TITLES[lang] || PAGE_TITLES.ru;
    const articleData = articleSlug ? ARTICLES.find(a => a.slug === articleSlug) : null;

    // ── Title ──────────────────────────────────────────────────
    document.title = articleData
      ? `${articleData.title} — Рег.Поинт`
      : (titles[page] || PAGE_TITLES.ru[page] || "Рег.Поинт — регистрация на мероприятия на вашем сервере");

    // ── Meta descriptions ──────────────────────────────────────
    const META_DESC: Record<string, string> = {
      home: "Коробочная платформа для регистрации участников, check-in и промо с чеками ФНС. Данные на VPS клиента, 152-ФЗ из коробки. Запросите демо.",
      products: "Линейка модулей для мероприятий: Рег.Поинт, Промо.Поинт, Промо.Про, Тикет.Поинт. Self-hosted, 152-ФЗ. Сравните возможности.",
      "reg-point": "Онлайн-запись участников, QR check-in, импорт CSV/Excel, отчёты attendance. Коробка на VPS. 152-ФЗ. От 100 000 ₽.",
      "promo-point": "Промо-формы, брендинг акции, гибкие поля регистрации. Без ФНС. Self-hosted, 152-ФЗ. От 80 000 ₽.",
      "promo-pro": "Полный стек: мероприятия + промо + API ФНС + OCR чеков. Коробка на VPS клиента. 152-ФЗ. 180 000 ₽.",
      "ticket-point": "Кастомные шаблоны билетов, оплата через ЮKassa заказчика, QR для входа. Add-on к Рег.Поинт. Self-hosted.",
      pricing: "Прозрачный прайс: Рег.Поинт от 100 000 ₽, Промо.Про 180 000 ₽, апгрейды и внедрение Docker. 1-й год поддержки в лицензии.",
      technology: "Node.js, React, MySQL 8, Docker-compose. Модульный монолит с REST API. Развёртывание на Linux VPS. Без vendor lock-in SaaS.",
      compliance: "Шифрование ПД, audit log, согласия per-event, запрос удаления, self-hosted. Как Рег.Поинт помогает соблюдать 152-ФЗ на мероприятиях.",
      "how-it-works": "Лицензия → Docker на VPS → настройка мероприятия → публичная регистрация → check-in. Пошаговая схема коробочного внедрения.",
      scenarios: "Как event-агентства и организаторы используют модули Рег.Поинт: конференции, BTL-акции, промо с чеками, продажа билетов.",
      faq: "Ответы: SaaS или коробка, где данные, цены, модули, 152-ФЗ, обновления, поддержка.",
      articles: "Экспертиза в event-технологиях и 152-ФЗ. Статьи для организаторов мероприятий и BTL-агентств.",
      contacts: "Запросите коммерческое предложение или демо. Чат поддержки. Рег.Поинт — коробочная платформа для мероприятий.",
      privacy: "Политика обработки персональных данных сайта Рег.Поинт. Оператор, цели, Jivo, cookie, права субъекта.",
    };
    const desc = articleData
      ? `${articleData.lead.slice(0, 155)}…`
      : (META_DESC[page] || META_DESC.home);

    // ── Helper to upsert <meta> ────────────────────────────────
    const setMeta = (sel: string, val: string, attr = "content") => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [k, v] = sel.replace("meta[","").replace("]","").split("=");
        (el as any)[k.trim()] = v?.replace(/'/g,"") || "";
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    const setLink = (id: string, rel: string, href: string, extra?: Record<string,string>) => {
      let el = document.getElementById(id) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.id = id;
        document.head.appendChild(el);
      }
      el.rel = rel;
      el.href = href;
      if (extra) Object.entries(extra).forEach(([k,v]) => el!.setAttribute(k,v));
    };

    // ── Meta description ───────────────────────────────────────
    setMeta("meta[name='description']", desc);

    // ── OG tags (§6.2) ────────────────────────────────────────
    const ogTitle = document.title;
    const ogLocale = lang === "ru" ? "ru_RU" : "en_US";
    const ogAlt   = lang === "ru" ? "en_US" : "ru_RU";
    const ogImage = `${BASE}/og/${articleData ? `articles/${articleData.slug}` : page}.png`;
    setMeta("meta[property='og:title']",             ogTitle,   "content");
    setMeta("meta[property='og:description']",        desc,      "content");
    setMeta("meta[property='og:image']",              ogImage,   "content");
    setMeta("meta[property='og:locale']",             ogLocale,  "content");
    setMeta("meta[property='og:locale:alternate']",   ogAlt,     "content");
    setMeta("meta[property='og:type']",               articleData ? "article" : "website", "content");
    setMeta("meta[property='og:site_name']",          "Рег.Поинт", "content");
    // Ensure property attr is set (querySelector needs it)
    document.querySelectorAll("meta[property^='og:']").forEach(el => {
      if (!el.getAttribute("property")) {
        const cont = el.getAttribute("content") || "";
        // no-op guard
        void cont;
      }
    });

    // ── Canonical + hreflang (§4.7) ────────────────────────────
    const ruPath  = articleData ? `/articles/${articleData.slug}` : `/${page === "home" ? "" : page}`;
    const enPath  = `/en${ruPath}`;
    const curPath = lang === "en" ? enPath : ruPath;
    setLink("link-canonical", "canonical", `${BASE}${curPath}`);
    setLink("link-hreflang-ru", "alternate", `${BASE}${ruPath}`);
    (document.getElementById("link-hreflang-ru") as HTMLLinkElement)?.setAttribute("hreflang","ru");
    setLink("link-hreflang-en", "alternate", `${BASE}${enPath}`);
    (document.getElementById("link-hreflang-en") as HTMLLinkElement)?.setAttribute("hreflang","en");
    setLink("link-hreflang-x", "alternate", `${BASE}${ruPath}`);
    (document.getElementById("link-hreflang-x") as HTMLLinkElement)?.setAttribute("hreflang","x-default");

    // ── Schema.org JSON-LD (§6.3) ──────────────────────────────
    const existingLd = document.getElementById("schema-org-ld");
    if (existingLd) existingLd.remove();

    let schema: object | null = null;

    const ORG = { "@type": "Organization", "name": "Рег.Поинт", "url": BASE };

    if (articleData) {
      // Article schema
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.lead,
        "datePublished": articleData.date,
        "publisher": ORG,
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE}/articles/${articleData.slug}` },
      };
    } else if (page === "home") {
      schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "name": "Рег.Поинт",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Linux (Docker)",
            "offers": { "@type": "Offer", "price": "100000", "priceCurrency": "RUB" },
            "description": META_DESC.home,
            "url": BASE,
          },
          { ...ORG, "@context": "https://schema.org" },
        ],
      };
    } else if (page === "faq") {
      const FAQ_ITEMS = [
        { q: "Рег.Поинт — это SaaS?", a: "Нет. Это коробочная лицензия: приложение разворачивается на VPS клиента через Docker." },
        { q: "Чем отличается от Eventbrite / Timepad?", a: "Те — multi-tenant SaaS. Рег.Поинт — single-tenant на инфраструктуре клиента." },
        { q: "Как обстоят дела с 152-ФЗ?", a: "Compliance-стек в каждом модуле без доплат: AES-256-GCM, audit log, согласия per-event." },
        { q: "Нужен ли отдельный сервер?", a: "Linux VPS от 2 GB RAM, Docker. Turnkey внедрение — опциональная услуга." },
        { q: "Как проходят обновления?", a: "Подписка со 2-го года; патчи безопасности и новые версии Docker-образов. 1-й год включён в лицензию." },
      ];
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      };
    } else if (page === "pricing") {
      const PRICING_FAQ = [
        { q: "Почему нет помесячной подписки как у SaaS?", a: "Рег.Поинт — коробочная лицензия: вы платите за право установки на свой сервер." },
        { q: "Что входит в первый год?", a: "Лицензия + обновления + базовая поддержка + патчи безопасности." },
        { q: "Есть ли скрытая комиссия с билетов?", a: "Нет. Оплата через ЮKassa заказчика; комиссия — по договору клиента с ЮKassa." },
      ];
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": PRICING_FAQ.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      };
    } else if (page === "contacts") {
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Рег.Поинт",
        "url": BASE,
        "contactPoint": { "@type": "ContactPoint", "contactType": "customer support", "availableLanguage": ["Russian","English"] },
      };
    } else if (["reg-point","promo-point","promo-pro","ticket-point"].includes(page)) {
      // §6.3 §7.7 — Product + Offer per module
      const PRODUCT_SCHEMA: Record<string, object> = {
        "reg-point": {
          "@context": "https://schema.org", "@type": "Product",
          "name": "Рег.Поинт",
          "description": "Коробочная платформа онлайн-регистрации и QR check-in для мероприятий. Self-hosted, Docker, 152-ФЗ.",
          "brand": ORG,
          "offers": { "@type": "Offer", "priceCurrency": "RUB", "price": "100000", "availability": "https://schema.org/InStock", "priceValidUntil": "2026-12-31", "seller": ORG },
          "url": `${BASE}/products/reg-point`,
        },
        "promo-point": {
          "@context": "https://schema.org", "@type": "Product",
          "name": "Промо.Поинт",
          "description": "Промо-формы с кастом-полями, брендинг акции. Self-hosted, 152-ФЗ.",
          "brand": ORG,
          "offers": { "@type": "Offer", "priceCurrency": "RUB", "price": "80000", "availability": "https://schema.org/InStock", "priceValidUntil": "2026-12-31", "seller": ORG },
          "url": `${BASE}/products/promo-point`,
        },
        "promo-pro": {
          "@context": "https://schema.org", "@type": "Product",
          "name": "Промо.Про",
          "description": "Полный стек: мероприятия + промо + API ФНС + OCR чеков. Self-hosted на VPS клиента.",
          "brand": ORG,
          "offers": { "@type": "Offer", "priceCurrency": "RUB", "price": "180000", "availability": "https://schema.org/InStock", "priceValidUntil": "2026-12-31", "seller": ORG },
          "url": `${BASE}/products/promo-pro`,
        },
        "ticket-point": {
          "@context": "https://schema.org", "@type": "Product",
          "name": "Тикет.Поинт",
          "description": "Add-on модуль продажи билетов с интеграцией ЮKassa. Self-hosted, QR-вход.",
          "brand": ORG,
          "offers": { "@type": "Offer", "priceCurrency": "RUB", "price": "80000", "availability": "https://schema.org/PreOrder", "priceValidUntil": "2026-12-31", "seller": ORG },
          "url": `${BASE}/products/ticket-point`,
        },
      };
      schema = PRODUCT_SCHEMA[page] || null;
    }

    if (schema) {
      const script = document.createElement("script");
      script.id = "schema-org-ld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [lang, page, articleSlug]);

  const ctx: AppCtx = {
    lang, setLang, page, nav,
    openContact: () => setContactOpen(true),
    openDemo: () => setDemoOpen(true),
    articleSlug, openArticle,
  };

  const renderPage = () => {
    // Article detail
    if (page === "articles" && articleSlug) return <ArticleDetailPage slug={articleSlug} />;
    // EN overrides
    if (lang === "en" && page === "home") return <HomeEN />;
    if (lang === "en" && page === "pricing") return <PricingEN />;
    if (lang === "en" && page === "technology") return <ENPageStub title="Technology — Reg.Point" ruPage="technology" />;
    if (lang === "en" && page === "compliance") return <ENPageStub title="152-FZ Compliance — Reg.Point" ruPage="compliance" />;
    if (lang === "en" && page === "faq") return <ENPageStub title="FAQ — Reg.Point" ruPage="faq" />;
    if (lang === "en" && page === "contacts") return <ENPageStub title="Contacts — Reg.Point" ruPage="contacts" />;
    switch (page) {
      case "home": return <HomePage />;
      case "products": return <ProductsPage />;
      case "reg-point": return <ProductPage id="reg-point" />;
      case "promo-point": return <ProductPage id="promo-point" />;
      case "promo-pro": return <ProductPage id="promo-pro" />;
      case "ticket-point": return <ProductPage id="ticket-point" />;
      case "pricing": return <PricingPage />;
      case "technology": return <TechnologyPage />;
      case "compliance": return <CompliancePage />;
      case "how-it-works": return <HowItWorksPage />;
      case "scenarios": return <ScenariosPage />;
      case "faq": return <FaqPage />;
      case "articles": return <ArticlesPage />;
      case "contacts": return <ContactsPage />;
      case "privacy": return <PrivacyPage />;
      default: return <HomePage />;
    }
  };

  return (
    <Ctx.Provider value={ctx}>
      <div className="min-h-screen flex flex-col font-inter">
        <Header />
        <div className="flex-1">{renderPage()}</div>
        <Footer />

        {/* Modals */}
        {contactOpen && (
          <ContactModal
            onClose={() => setContactOpen(false)}
            onDemo={() => { setContactOpen(false); setDemoOpen(true); }}
          />
        )}
        {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}

        {/* Cookie banner (§4.6) */}
        {!cookieAccepted && (
          <CookieBanner
            onAccept={acceptCookie}
            onPrivacy={() => { acceptCookie(); nav("privacy"); }}
          />
        )}

        {/* Floating умная кнопка (§4.5) — shown when cookie is accepted or scrolled */}
        {cookieAccepted && <FloatingContact />}
      </div>
    </Ctx.Provider>
  );
}
