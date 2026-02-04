
import React, { useEffect, useState, useRef } from 'react';
import { Play, ChevronDown, Star, Quote, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import Button from './components/Button';
import { APP_STORE_URL, GOOGLE_PLAY_URL, SCREENSHOTS } from './constants';
import logo from './src/images/logo.png';
import appStoreIcon from './src/images/app_store.png';
import playStoreIcon from './src/images/playstore.svg';
import './src/index.css';



type Language = 'en' | 'ru' | 'uk';

const TRANSLATIONS = {
  en: {
    download: "DOWNLOAD",
    heroTitle: <>DOMINATE <br /><span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">EVERY</span> <br /><span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]">ROUND.</span></>,
    heroSub: "The most aggressive interval timer on the market. Precision-engineered for fighters who demand perfection when the clock starts.",
    appStore: "App Store",
    googlePlay: "Google Play",
    appStoreSub: "Download on the",
    googlePlaySub: "GET IT ON",
    visualIntensity: "VISUAL",

    visualIntensitySub: "INTENSITY",
    battleTested: "BATTLE-TESTED INTERFACE FOR PROS",
    evolveTitle: <>EVOLVE <br /><span className="text-black drop-shadow-2xl">OR FAIL.</span></>,
    footerText: "THE DEFINITIVE COMBAT CLOCK. BUILT FOR THE 1%.",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    rights: "ALL RIGHTS RESERVED.",
    testimonials: [
      { name: "Alex Rivera", role: "Professional MMA Fighter", text: "The high-contrast display is a game changer. I can see the clock from across the mats even when I'm exhausted." },
      { name: "Sarah Chen", role: "Boxing Coach", text: "Finally a timer that is actually loud enough and looks professional. My students love the clear round transitions." },
      { name: "Mike Thompson", role: "HIIT Instructor", text: "Reliable, clean, and has everything you need without the bloat. It's the only timer I use for my classes now." }
    ]
  },
  ru: {
    download: "СКАЧАТЬ",
    heroTitle: <>ДОМИНИРУЙ <br /><span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">В КАЖДОМ</span> <br /><span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]">РАУНДЕ.</span></>,
    heroSub: "Самый агрессивный интервальный таймер на рынке. Разработан для бойцов, которые требуют совершенства с первой секунды.",
    appStore: "App Store",
    googlePlay: "Google Play",
    appStoreSub: "Загрузите в",
    googlePlaySub: "ДОСТУПНО В",
    visualIntensity: "ВИЗУАЛЬНАЯ",

    visualIntensitySub: "ИНТЕНСИВНОСТЬ",
    battleTested: "ИНТЕРФЕЙС, ПРОВЕРЕННЫЙ В БОЮ",
    evolveTitle: <>РАЗВИВАЙСЯ <br /><span className="text-black drop-shadow-2xl">ИЛИ ПРОИГРАЙ.</span></>,
    footerText: "ЛУЧШИЙ БОЕВОЙ ТАЙМЕР. СОЗДАН ДЛЯ ЛУЧШИХ.",
    support: "Поддержка",
    privacy: "Приватность",
    terms: "Условия",
    rights: "ВСЕ ПРАВА ЗАЩИЩЕНЫ.",
    testimonials: [
      { name: "Алекс Ривера", role: "Профессиональный боец MMA", text: "Контрастный дисплей меняет всё. Я вижу время даже когда полностью истощен." },
      { name: "Сара Чен", role: "Тренер по боксу", text: "Наконец-то достаточно громкий и профессиональный таймер. Мои ученики в восторге." },
      { name: "Майк Томпсон", role: "Инструктор HIIT", text: "Надежный, чистый и содержит всё необходимое. Это единственный таймер, который я использую." }
    ]
  },
  uk: {
    download: "ЗАВАНТАЖИТИ",
    heroTitle: <>ДОМІНУЙ <br /><span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">У КОЖНОМУ</span> <br /><span className="text-red-600 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)]">РАУНДІ.</span></>,
    heroSub: "Найагресивніший інтервальний таймер на ринку. Створений для бійців, які вимагають досконалості з першої секунди.",
    appStore: "App Store",
    googlePlay: "Google Play",
    appStoreSub: "Завантажте у",
    googlePlaySub: "ДОСТУПНО В",
    visualIntensity: "ВІЗУАЛЬНА",

    visualIntensitySub: "ІНТЕНСИВНІСТЬ",
    battleTested: "ІНТЕРФЕЙС, ПЕРЕВІРЕНИЙ У БОЮ",
    evolveTitle: <>РОЗВИВАЙСЯ <br /><span className="text-black drop-shadow-2xl">АБО ПРОГРАЙ.</span></>,
    footerText: "КРАЩИЙ БОЙОВИЙ ТАЙМЕР. СТВОРЕНИЙ ДЛЯ КРАЩИХ.",
    support: "Підтримка",
    privacy: "Приватність",
    terms: "Умови",
    rights: "ВСІ ПРАВА ЗАХИЩЕНІ.",
    testimonials: [
      { name: "Алекс Рівера", role: "Професійний боєць MMA", text: "Контрастний дисплей змінює все. Я бачу час навіть коли повністю виснажений." },
      { name: "Сара Чен", role: "Тренер з боксу", text: "Нарешті достатньо гучний і професійний таймер. Мои учні в захваті." },
      { name: "Майк Томпсон", role: "Інструктор HIIT", text: "Надійний, чистий і містить все необхідне. Це єдиний таймер, який я використовую." }
    ]
  }
};

const RounderLogoFull = ({ className = "h-12" }: { className?: string }) => (
  <div className={`flex items-center gap-2 sm:gap-4 ${className}`}>
    <div className="h-full aspect-square relative group/logo">
      <div className="absolute inset-0 bg-red-600/20 rounded-full blur-md group-hover/logo:bg-red-600/40 transition-colors duration-500"></div>
      <img
        src={logo}
        alt="Rounder"
        className="h-full w-full object-cover rounded-full border-2 border-red-600/30 relative z-10 shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-transform duration-500 group-hover/logo:scale-105 group-hover/logo:border-red-600/60"
      />
    </div>
    <span className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase text-white">
      Rounder
    </span>
  </div>
);


const AppStoreColoredIcon = ({ size = 32 }: { size?: number }) => (
  <img src={appStoreIcon} alt="App Store" style={{ width: size, height: size }} className="shrink-0" />
);


const GooglePlayColoredIcon = ({ size = 32 }: { size?: number }) => (
  <img src={playStoreIcon} alt="Google Play" style={{ width: size, height: size }} className="shrink-0" />
);


const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const userLang = navigator.language.split('-')[0];
      if (userLang === 'en') return 'en';
      if (userLang === 'uk') return 'uk';
      if (userLang === 'ru') return 'ru';
    } catch (e) { }
    return 'ru';
  });

  const [scrolled, setScrolled] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const downloadDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  const SUPPORT_LINK = "https://www.instagram.com/rounder.timer";
  const PRIVACY_LINK = "https://madit-story.blogspot.com/2023/11/privacy-policy.html?m=1";
  const TERMS_LINK = "https://madit-story.blogspot.com/2023/11/terms-of-service.html";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (downloadDropdownRef.current && !downloadDropdownRef.current.contains(target)) {
        setIsDownloadOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setIsLangOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % t.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [lang]);

  const scrollScreenshots = (dir: 'left' | 'right') => {
    if (screenshotRef.current) {
      const amount = 300;
      screenshotRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

  const LangSwitcherDropdown = () => (
    <div className="relative shrink-0" ref={langDropdownRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        aria-label="Select Language"
        className="flex items-center gap-2 px-3 sm:px-5 h-[40px] sm:h-[44px] lg:h-[48px] bg-white/5 hover:bg-white/10 transition-all rounded-full text-[10px] font-black tracking-widest border border-white/10"
      >
        <Globe size={14} className="text-red-600 shrink-0" />
        <span className="uppercase">{lang}</span>
        <ChevronDown size={12} className={`transition-transform duration-300 shrink-0 ${isLangOpen ? 'rotate-180' : ''}`} />
      </button>


      {isLangOpen && (
        <div className="absolute top-full right-0 mt-3 bg-neutral-900 border border-white/10 rounded-2xl py-2 w-32 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-3xl animate-in fade-in slide-in-from-top-2">
          {(['en', 'ru', 'uk'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setIsLangOpen(false);
              }}
              className={`w-full text-left px-5 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${lang === l ? 'text-red-600 bg-red-600/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {l === 'en' ? 'English' : l === 'ru' ? 'Русский' : 'Українська'}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-red-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-red-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-black/60 backdrop-blur-3xl py-3 sm:py-4 border-b border-white/10 shadow-2xl' : 'bg-transparent py-4 sm:py-8'}`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-1 sm:gap-4">
          <div className="hidden sm:group sm:flex cursor-pointer shrink-0 transition-transform hover:scale-105 active:scale-95" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <RounderLogoFull className="h-9 lg:h-11" />
          </div>

          <div className="flex items-center justify-between sm:justify-end flex-1 sm:flex-none gap-1 sm:gap-4 lg:gap-8">
            <LangSwitcherDropdown />
            <div className="relative shrink-0" ref={downloadDropdownRef}>
              <Button
                variant="primary"
                aria-label="Download Menu"
                className="px-1 sm:px-8 lg:px-10 h-[32px] sm:h-[44px] lg:h-[48px] rounded-full text-[7px] sm:text-[11px] lg:text-xs shadow-[0_10px_30px_rgba(220,38,38,0.4)] sm:min-w-[140px] border border-white/20 whitespace-nowrap"
                onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              >
                {t.download}
                <ChevronDown size={14} className={`transition-transform duration-500 shrink-0 ${isDownloadOpen ? 'rotate-180' : ''}`} />
              </Button>


              {isDownloadOpen && (
                <div className="absolute right-0 mt-4 w-64 sm:w-72 bg-neutral-900/95 border border-white/10 rounded-[2.5rem] p-3 shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300">
                  <a href={APP_STORE_URL} target="_blank" onClick={() => setIsDownloadOpen(false)} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 hover:bg-red-600 rounded-[2rem] transition-all group mb-1">
                    <AppStoreColoredIcon size={24} />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-black text-gray-500 group-hover:text-white/80 leading-none mb-1">{t.appStore}</p>
                      <p className="text-sm font-black group-hover:text-white uppercase">iOS {t.download}</p>
                    </div>
                  </a>
                  <a href={GOOGLE_PLAY_URL} target="_blank" onClick={() => setIsDownloadOpen(false)} className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 hover:bg-red-600 rounded-[2rem] transition-all group">
                    <GooglePlayColoredIcon size={24} />
                    <div className="text-left">
                      <p className="text-[10px] uppercase font-black text-gray-500 group-hover:text-white/80 leading-none mb-1">{t.googlePlay}</p>
                      <p className="text-sm font-black group-hover:text-white uppercase">Android {t.download}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <header className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-12 sm:hidden animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <RounderLogoFull className="h-12" />
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-[140px] font-black mb-10 tracking-tighter leading-[0.85] italic uppercase">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
              {t.heroSub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
              <a href={APP_STORE_URL} target="_blank" className="group relative flex items-center gap-6 bg-black/40 backdrop-blur-xl text-white px-10 py-5 sm:py-6 rounded-[3rem] font-black italic uppercase text-[10px] tracking-widest transition-all duration-300 shadow-2xl border border-white/10 hover:border-red-600/50 hover:-translate-y-1 w-full max-w-[280px] sm:w-[260px]">
                <AppStoreColoredIcon size={32} />
                <div className="text-left leading-tight">
                  <span className="block text-[9px] opacity-60">{t.appStoreSub}</span>
                  <span className="text-base">{t.appStore}</span>
                </div>
              </a>
              <a href={GOOGLE_PLAY_URL} target="_blank" className="group relative flex items-center gap-6 bg-black/40 backdrop-blur-xl text-white px-10 py-5 sm:py-6 rounded-[3rem] font-black italic uppercase text-[10px] tracking-widest transition-all duration-300 shadow-2xl border border-white/10 hover:border-red-600/50 hover:-translate-y-1 w-full max-w-[280px] sm:w-[260px]">
                <GooglePlayColoredIcon size={32} />
                <div className="text-left leading-tight">
                  <span className="block text-[9px] opacity-60">{t.googlePlaySub}</span>
                  <span className="text-base">{t.googlePlay}</span>
                </div>
              </a>
            </div>


          </div>
        </div>
      </header>

      <section className="py-10 bg-gradient-to-b from-transparent to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
              {t.visualIntensity} <span className="text-red-600">{t.visualIntensitySub}</span>
            </h2>
            <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px] sm:text-[11px]">{t.battleTested}</p>
          </div>

          <div ref={screenshotRef} className="flex overflow-x-auto gap-4 pb-10 snap-x no-scrollbar scroll-smooth px-2">
            {SCREENSHOTS.map((url, i) => (
              <div key={i} className="flex-none w-[240px] sm:w-[280px] lg:w-[320px] snap-center py-5">
                <div className="rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border-[4px] border-neutral-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-red-600/60 aspect-[10.8/24]">
                  <img src={url} alt={`Rounder App Screenshot ${i + 1}`} className="w-full h-full object-cover transition-all duration-500" />
                </div>
              </div>
            ))}


          </div>

          <div className="hidden sm:flex justify-center gap-6 mt-4 relative z-10">
            <button aria-label="Scroll Screenshots Left" onClick={() => scrollScreenshots('left')} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all active:scale-90 shadow-lg"><ChevronLeft size={24} /></button>
            <button aria-label="Scroll Screenshots Right" onClick={() => scrollScreenshots('right')} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-all active:scale-90 shadow-lg"><ChevronRight size={24} /></button>
          </div>

        </div>
      </section>

      <section className="py-12 sm:py-16 relative group/testimonials overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center relative">
            <Quote className="text-red-600 mx-auto mb-10 sm:mb-16 opacity-30 animate-pulse w-12 h-12 sm:w-20 sm:h-20" />

            <div className="min-h-[300px] flex flex-col justify-center">
              {t.testimonials.map((test, i) => (
                <div key={i} className={`transition-all duration-1000 ease-in-out ${activeTestimonial === i ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 absolute inset-0 pointer-events-none'}`}>
                  <p className="text-2xl sm:text-3xl md:text-5xl font-black italic text-white mb-10 sm:mb-14 leading-tight tracking-tight">"{test.text}"</p>
                  <div className="flex flex-col items-center">
                    <div className="flex gap-2 mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="#dc2626" className="text-red-600" />)}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-red-600 mb-1">{test.name}</h4>
                    <p className="text-gray-500 uppercase font-black text-[10px] tracking-[0.3em]">{test.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-12 sm:mt-16 relative z-20">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 flex items-center justify-center transition-all active:scale-95 text-white active:bg-red-700 shadow-2xl backdrop-blur-md"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-600 flex items-center justify-center transition-all active:scale-95 text-white active:bg-red-700 shadow-2xl backdrop-blur-md"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="relative rounded-[3rem] sm:rounded-[5rem] bg-gradient-to-br from-red-600 to-red-900 p-10 sm:p-20 lg:p-32 overflow-hidden text-center shadow-[0_0_150px_rgba(220,38,38,0.25)]">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black italic uppercase mb-10 sm:mb-14 leading-[0.85] tracking-tighter break-words overflow-hidden">
                {t.evolveTitle}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <a href={APP_STORE_URL} target="_blank" className="group relative flex items-center gap-6 bg-black/40 backdrop-blur-xl text-white px-10 py-5 sm:py-6 rounded-[3rem] font-black italic uppercase text-[10px] tracking-widest transition-all duration-300 shadow-2xl border border-white/10 hover:border-red-600/50 hover:-translate-y-1 w-full max-w-[280px] sm:w-[260px]">
                  <AppStoreColoredIcon size={32} />
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] opacity-60">{t.appStoreSub}</span>
                    <span className="text-base">{t.appStore}</span>
                  </div>
                </a>
                <a href={GOOGLE_PLAY_URL} target="_blank" className="group relative flex items-center gap-6 bg-black/40 backdrop-blur-xl text-white px-10 py-5 sm:py-6 rounded-[3rem] font-black italic uppercase text-[10px] tracking-widest transition-all duration-300 shadow-2xl border border-white/10 hover:border-red-600/50 hover:-translate-y-1 w-full max-w-[280px] sm:w-[260px]">
                  <GooglePlayColoredIcon size={32} />
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] opacity-60">{t.googlePlaySub}</span>
                    <span className="text-base">{t.googlePlay}</span>
                  </div>
                </a>
              </div>



            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 sm:py-12 border-t border-white/5 bg-[#010101]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 sm:gap-20">
            <div className="flex flex-col items-center md:items-start gap-6">
              <RounderLogoFull className="h-10" />
              <p className="text-gray-600 text-[11px] sm:text-sm font-bold uppercase tracking-widest max-w-xs text-center md:text-left">
                {t.footerText}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-10">
              <div className="flex gap-8 sm:gap-12 text-gray-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em]">
                <a href={SUPPORT_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">{t.support}</a>
                <a href={PRIVACY_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">{t.privacy}</a>
                <a href={TERMS_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">{t.terms}</a>
              </div>
              <p className="text-gray-700 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">
                &copy; {new Date().getFullYear()} ROUNDER COMBAT TECH. {t.rights}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
