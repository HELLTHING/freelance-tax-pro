import React, { useState, useEffect } from "react";
import "./styles.css";

const AnimatedNumber = ({ value, prefix = "$", decimals = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = parseFloat(value) || 0;
    if (start === end) return;
    const duration = 1200;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{prefix}{displayValue.toFixed(decimals)}</>;
};

const MoneyRain = ({ isActive }) => {
  const [moneys, setMoneys] = useState([]);
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      const newMoney = {
        id: Math.random(),
        left: Math.random() * 100,
        amount: [1, 5, 10, 20, 50][Math.floor(Math.random() * 5)],
      };
      setMoneys((prev) => [...prev, newMoney]);
      setTimeout(() => {
        setMoneys((prev) => prev.filter((m) => m.id !== newMoney.id));
      }, 3000);
    }, 300);
    return () => clearInterval(interval);
  }, [isActive]);
  return (
    <div className="money-rain">
      {moneys.map((money) => (
        <div key={money.id} className="money-drop" style={{ left: `${money.left}%` }}>
          💵 ${money.amount}
        </div>
      ))}
    </div>
  );
};

const countries = {
  usa: { name: "United States", currency: "$", taxRate: 0.25, seTaxRate: 0.153, stateAvg: 0.05, flag: "🇺🇸" },
  uk: { name: "United Kingdom", currency: "£", taxRate: 0.2, niRate: 0.08, flag: "🇬🇧" },
  ireland: { name: "Ireland", currency: "€", taxRate: 0.4, prsiRate: 0.04, uscRate: 0.08, flag: "🇮🇪" },
  canada: { name: "Canada", currency: "CAD $", taxRate: 0.25, provAvg: 0.08, flag: "🇨🇦" },
  australia: { name: "Australia", currency: "AUD $", taxRate: 0.37, flag: "🇦🇺" },
  eu: { name: "European Union", currency: "€", taxRate: 0.22, vatRate: 0.19, flag: "🇪🇺" },
  russia: { name: "Россия", currency: "₽", taxRate: 0.06, flag: "🇷🇺" },
  india: { name: "India", currency: "₹", taxRate: 0.3, flag: "🇮🇳" },
};

const platforms = {
  upwork: { name: "Upwork", commission: 0.05 },
  fiverr: { name: "Fiverr", commission: 0.2 },
  freelancer: { name: "Freelancer.com", commission: 0.1 },
  direct: { name: "Direct Clients", commission: 0 },
  guru: { name: "Guru", commission: 0.09 },
};

const translations = {
  ru: {
    title: "Income Tracker",
    subtitle: "Узнай свой реальный доход после налогов и комиссий",
    calcBtn: "Рассчитать",
    income: "Доход",
    platform: "Платформа",
    country: "Страна",
    grossIncome: "Валовый доход",
    platformFee: "Комиссии платформ",
    taxes: "Налоги",
    netIncome: "Чистый доход",
    monthlyNet: "В месяц",
    reverseTitle: "Обратный расчёт ставки",
    desiredIncome: "Желаемый годовой доход",
    requiredRate: "Необходимая почасовая ставка",
    progressTitle: "Прогрессия дохода",
    compareTitle: "Сравнение по странам",
    hoursPerWeek: "Часов в неделю",
    weeksPerYear: "Недель в году",
    expenses: "Бизнес-расходы в год",
    expensesHint: "Ноутбук, ПО, интернет, коворкинг...",
    taxSaving: "Экономия на налогах",
    addSource: "Добавить источник дохода",
    source: "Источник",
    totalPlatformFees: "Итого комиссии",
  },
  en: {
    title: "Income Tracker",
    subtitle: "Know your real income after taxes and platform fees",
    calcBtn: "Calculate",
    income: "Income",
    platform: "Platform",
    country: "Country",
    grossIncome: "Gross Income",
    platformFee: "Platform Fees",
    taxes: "Taxes",
    netIncome: "Net Income",
    monthlyNet: "Monthly",
    reverseTitle: "Reverse Rate Calculator",
    desiredIncome: "Desired Annual Income",
    requiredRate: "Required Hourly Rate",
    progressTitle: "Income Progression",
    compareTitle: "Country Comparison",
    hoursPerWeek: "Hours per week",
    weeksPerYear: "Weeks per year",
    expenses: "Annual Business Expenses",
    expensesHint: "Laptop, software, internet, coworking...",
    taxSaving: "Tax Saving",
    addSource: "Add income source",
    source: "Source",
    totalPlatformFees: "Total platform fees",
  },
  es: {
    title: "Income Tracker",
    subtitle: "Conoce tus ingresos reales después de impuestos y comisiones",
    calcBtn: "Calcular",
    income: "Ingreso",
    platform: "Plataforma",
    country: "País",
    grossIncome: "Ingreso Bruto",
    platformFee: "Comisiones",
    taxes: "Impuestos",
    netIncome: "Ingreso Neto",
    monthlyNet: "Mensual",
    reverseTitle: "Calculadora Inversa",
    desiredIncome: "Ingreso deseado",
    requiredRate: "Tarifa requerida",
    progressTitle: "Progresión de Ingresos",
    compareTitle: "Comparación por País",
    hoursPerWeek: "Horas por semana",
    weeksPerYear: "Semanas por año",
    expenses: "Gastos de Negocio Anuales",
    expensesHint: "Laptop, software, internet, coworking...",
    taxSaving: "Ahorro Fiscal",
    addSource: "Agregar fuente de ingresos",
    source: "Fuente",
    totalPlatformFees: "Total comisiones",
  },
  de: {
    title: "Income Tracker",
    subtitle: "Ihr reales Einkommen nach Steuern und Plattformgebühren",
    calcBtn: "Berechnen",
    income: "Einkommen",
    platform: "Plattform",
    country: "Land",
    grossIncome: "Bruttoeinkommen",
    platformFee: "Plattformgebühren",
    taxes: "Steuern",
    netIncome: "Nettoeinkommen",
    monthlyNet: "Monatlich",
    reverseTitle: "Umgekehrte Berechnung",
    desiredIncome: "Gewünschtes Einkommen",
    requiredRate: "Benötigter Stundensatz",
    progressTitle: "Einkommensprogression",
    compareTitle: "Ländervergleich",
    hoursPerWeek: "Stunden pro Woche",
    weeksPerYear: "Wochen pro Jahr",
    expenses: "Jährliche Betriebsausgaben",
    expensesHint: "Laptop, Software, Internet, Coworking...",
    taxSaving: "Steuerersparnis",
    addSource: "Einkommensquelle hinzufügen",
    source: "Quelle",
    totalPlatformFees: "Gesamtgebühren",
  },
  fr: {
    title: "Income Tracker",
    subtitle: "Connaissez votre revenu réel après impôts et commissions",
    calcBtn: "Calculer",
    income: "Revenu",
    platform: "Plateforme",
    country: "Pays",
    grossIncome: "Revenu Brut",
    platformFee: "Commissions",
    taxes: "Impôts",
    netIncome: "Revenu Net",
    monthlyNet: "Mensuel",
    reverseTitle: "Calcul Inverse",
    desiredIncome: "Revenu souhaité",
    requiredRate: "Taux horaire requis",
    progressTitle: "Progression des Revenus",
    compareTitle: "Comparaison par Pays",
    hoursPerWeek: "Heures par semaine",
    weeksPerYear: "Semaines par an",
    expenses: "Dépenses Professionnelles Annuelles",
    expensesHint: "Ordinateur, logiciels, internet, coworking...",
    taxSaving: "Économie Fiscale",
    addSource: "Ajouter une source de revenus",
    source: "Source",
    totalPlatformFees: "Total commissions",
  },
  pt: {
    title: "Income Tracker",
    subtitle: "Conheça sua renda real após impostos e taxas",
    calcBtn: "Calcular",
    income: "Renda",
    platform: "Plataforma",
    country: "País",
    grossIncome: "Renda Bruta",
    platformFee: "Taxas das Plataformas",
    taxes: "Impostos",
    netIncome: "Renda Líquida",
    monthlyNet: "Mensal",
    reverseTitle: "Cálculo Inverso",
    desiredIncome: "Renda desejada",
    requiredRate: "Taxa horária necessária",
    progressTitle: "Progressão de Renda",
    compareTitle: "Comparação por País",
    hoursPerWeek: "Horas por semana",
    weeksPerYear: "Semanas por ano",
    expenses: "Despesas Comerciais Anuais",
    expensesHint: "Laptop, software, internet, coworking...",
    taxSaving: "Economia Fiscal",
    addSource: "Adicionar fonte de renda",
    source: "Fonte",
    totalPlatformFees: "Total taxas",
  },
  zh: {
    title: "Income Tracker",
    subtitle: "了解您税后和平台费用后的真实收入",
    calcBtn: "计算",
    income: "收入",
    platform: "平台",
    country: "国家",
    grossIncome: "总收入",
    platformFee: "平台费用",
    taxes: "税款",
    netIncome: "净收入",
    monthlyNet: "月收入",
    reverseTitle: "反向费率计算",
    desiredIncome: "期望年收入",
    requiredRate: "所需时薪",
    progressTitle: "收入进展",
    compareTitle: "国家对比",
    hoursPerWeek: "每周工作小时",
    weeksPerYear: "每年工作周数",
    expenses: "年度业务费用",
    expensesHint: "笔记本、软件、网络、共享办公...",
    taxSaving: "节税金额",
    addSource: "添加收入来源",
    source: "来源",
    totalPlatformFees: "总平台费用",
  },
};

const langOptions = [
  { code: "ru", label: "🇷🇺 RU" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "es", label: "🇪🇸 ES" },
  { code: "de", label: "🇩🇪 DE" },
  { code: "fr", label: "🇫🇷 FR" },
  { code: "pt", label: "🇧🇷 PT" },
  { code: "zh", label: "🇨🇳 ZH" },
];

function getTaxRate(countryKey) {
  const c = countries[countryKey];
  if (countryKey === "usa") return c.taxRate + c.seTaxRate + c.stateAvg;
  if (countryKey === "uk") return c.taxRate + c.niRate;
  if (countryKey === "ireland") return c.taxRate + c.prsiRate + c.uscRate;
  return c.taxRate;
}

// Multi-source calculator: sums all sources, applies one country tax
function calculateMultiSource(sources, countryKey, expenses = 0) {
  const expensesNum = parseFloat(expenses) || 0;
  const rate = getTaxRate(countryKey);

  let totalGross = 0;
  let totalPlatformFee = 0;

  sources.forEach((src) => {
    const inc = parseFloat(src.income) || 0;
    totalGross += inc;
    totalPlatformFee += inc * platforms[src.platform].commission;
  });

  const totalAfterPlatform = totalGross - totalPlatformFee;
  const taxableIncome = Math.max(0, totalAfterPlatform - expensesNum);
  const totalTax = taxableIncome * rate;
  const taxSaving = expensesNum > 0 ? expensesNum * rate : 0;
  const netIncome = totalAfterPlatform - totalTax;

  return {
    grossIncome: totalGross,
    platformFee: totalPlatformFee,
    totalTax,
    netIncome,
    monthlyNet: netIncome / 12,
    taxSaving,
    expensesNum,
  };
}

// Single-source calculator used for comparison tab
function calculateTax(income, countryKey, platformKey) {
  const incomeNum = parseFloat(income) || 0;
  const p = platforms[platformKey];
  const platformFee = incomeNum * p.commission;
  const afterPlatform = incomeNum - platformFee;
  const rate = getTaxRate(countryKey);
  const totalTax = afterPlatform * rate;
  const netIncome = afterPlatform - totalTax;
  return { grossIncome: incomeNum, platformFee, totalTax, netIncome };
}

export default function FreelanceTaxPro() {
  const [language, setLanguage] = useState("ru");
  const [country, setCountry] = useState("usa");
  const [sources, setSources] = useState([{ id: 1, income: "50000", platform: "upwork" }]);
  const [expenses, setExpenses] = useState("0");
  const [compareIncome, setCompareIncome] = useState("50000");
  const [revPlatform, setRevPlatform] = useState("upwork");
  const [desiredIncome, setDesiredIncome] = useState("60000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [showResults, setShowResults] = useState(false);
  const [moneyRainActive, setMoneyRainActive] = useState(false);
  const [activeSection, setActiveSection] = useState("calculator");

  useEffect(() => {
    const saved = localStorage.getItem("language") || "ru";
    setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const addSource = () => {
    setSources((prev) => [...prev, { id: Date.now(), income: "0", platform: "direct" }]);
  };

  const removeSource = (id) => {
    setSources((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSource = (id, field, value) => {
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const t = translations[language];
  const results = calculateMultiSource(sources, country, expenses);
  const c = countries[country];
  const rate = getTaxRate(country);

  // Reverse tab
  const totalHours = parseFloat(hoursPerWeek) * parseFloat(weeksPerYear) || 1;
  const revPlatformMultiplier = 1 / (1 - platforms[revPlatform].commission);
  const taxMultiplier = 1 / (1 - rate);
  const requiredHourlyRate = ((parseFloat(desiredIncome) || 0) / totalHours) * revPlatformMultiplier * taxMultiplier;

  // Progression tab: scale total gross with effective commission rate
  const totalGross = results.grossIncome;
  const effectiveCommission = totalGross > 0 ? results.platformFee / totalGross : 0;
  const progressionSteps = [0.25, 0.5, 0.75, 1.0, 1.5, 2.0].map((mult) => {
    const scaledGross = totalGross * mult;
    const scaledAfterPlatform = scaledGross * (1 - effectiveCommission);
    const net = scaledAfterPlatform - scaledAfterPlatform * rate;
    return { label: `${c.currency}${(scaledGross / 1000).toFixed(0)}k`, net };
  });
  const maxNet = Math.max(...progressionSteps.map((s) => s.net), 1);

  // Compare tab: single income vs all countries, using first source's platform
  const comparePlatform = sources[0].platform;
  const countryComparison = Object.entries(countries)
    .map(([key, val]) => {
      const r = calculateTax(compareIncome, key, comparePlatform);
      return { key, flag: val.flag, name: val.name, currency: val.currency, net: r.netIncome };
    })
    .sort((a, b) => b.net - a.net);

  const handleCalculate = () => {
    setShowResults(true);
    setMoneyRainActive(true);
    setTimeout(() => setMoneyRainActive(false), 4000);
  };

  return (
    <div className="app">
      <div className="animated-bg" />
      <MoneyRain isActive={moneyRainActive} />

      <div className="container">
        <div className="header fade-in">
          <div className="lang-switcher">
            {langOptions.map((l) => (
              <button
                key={l.code}
                className={`lang-btn ${language === l.code ? "active" : ""}`}
                onClick={() => setLanguage(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <h1 className="app-title">💰 {t.title}</h1>
          <p className="app-subtitle">{t.subtitle}</p>
        </div>

        <div className="section-tabs">
          {["calculator", "reverse", "progression", "compare"].map((sec) => (
            <button
              key={sec}
              className={`tab-btn ${activeSection === sec ? "active" : ""}`}
              onClick={() => setActiveSection(sec)}
            >
              {sec === "calculator" && "🧮"}
              {sec === "reverse" && "🎯"}
              {sec === "progression" && "📈"}
              {sec === "compare" && "🌍"}
            </button>
          ))}
        </div>

        {activeSection === "calculator" && (
          <div className="inputs-section fade-in-delay-1">
            {/* Country */}
            <div className="input-group full-width">
              <label>{t.country}</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)}>
                {Object.entries(countries).map(([key, val]) => (
                  <option key={key} value={key}>{val.flag} {val.name}</option>
                ))}
              </select>
            </div>

            {/* Income sources */}
            <div className="sources-block full-width">
              {sources.map((src, i) => (
                <div key={src.id} className="source-row">
                  <span className="source-label">{t.source} {i + 1}</span>
                  <input
                    type="number"
                    className="source-income"
                    value={src.income}
                    onChange={(e) => updateSource(src.id, "income", e.target.value)}
                    placeholder="0"
                  />
                  <select
                    className="source-platform"
                    value={src.platform}
                    onChange={(e) => updateSource(src.id, "platform", e.target.value)}
                  >
                    {Object.entries(platforms).map(([key, val]) => (
                      <option key={key} value={key}>
                        {val.name} ({(val.commission * 100).toFixed(0)}%)
                      </option>
                    ))}
                  </select>
                  {sources.length > 1 && (
                    <button className="remove-source-btn" onClick={() => removeSource(src.id)}>×</button>
                  )}
                </div>
              ))}
              <button className="add-source-btn" onClick={addSource}>
                + {t.addSource}
              </button>
            </div>

            {/* Expenses */}
            <div className="input-group full-width">
              <label>{t.expenses} ({c.currency})</label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder={t.expensesHint}
              />
            </div>

            <button className="calculate-btn full-width" onClick={handleCalculate}>
              {t.calcBtn} 🚀
            </button>

            {showResults && (
              <div className="results-container fade-in full-width">
                <div className="result-row">
                  <span>{t.grossIncome}</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.grossIncome} prefix="" /></span>
                </div>
                <div className="result-row negative">
                  <span>{t.platformFee}</span>
                  <span className="result-value">-{c.currency}<AnimatedNumber value={results.platformFee} prefix="" /></span>
                </div>
                <div className="result-row negative">
                  <span>{t.taxes}</span>
                  <span className="result-value">-{c.currency}<AnimatedNumber value={results.totalTax} prefix="" /></span>
                </div>
                {results.expensesNum > 0 && (
                  <div className="result-row saving">
                    <span>💡 {t.taxSaving}</span>
                    <span className="result-value">+{c.currency}<AnimatedNumber value={results.taxSaving} prefix="" /></span>
                  </div>
                )}
                <div className="result-row positive main-result">
                  <span>{t.netIncome} 🎉</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.netIncome} prefix="" /></span>
                </div>
                <div className="result-row monthly">
                  <span>{t.monthlyNet}</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.monthlyNet} prefix="" /></span>
                </div>
                <div className="pie-chart">
                  <div className="pie-bar">
                    <div className="pie-segment platform-seg" style={{ width: `${results.grossIncome > 0 ? (results.platformFee / results.grossIncome) * 100 : 0}%` }} />
                    <div className="pie-segment tax-seg" style={{ width: `${results.grossIncome > 0 ? (results.totalTax / results.grossIncome) * 100 : 0}%` }} />
                    <div className="pie-segment net-seg" style={{ width: `${results.grossIncome > 0 ? (results.netIncome / results.grossIncome) * 100 : 0}%` }} />
                  </div>
                  <div className="pie-legend">
                    <span className="legend-dot platform-dot" /> {t.platformFee}: {results.grossIncome > 0 ? ((results.platformFee / results.grossIncome) * 100).toFixed(1) : 0}%
                    <span className="legend-dot tax-dot" /> {t.taxes}: {results.grossIncome > 0 ? ((results.totalTax / results.grossIncome) * 100).toFixed(1) : 0}%
                    <span className="legend-dot net-dot" /> {t.netIncome}: {results.grossIncome > 0 ? ((results.netIncome / results.grossIncome) * 100).toFixed(1) : 0}%
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "reverse" && (
          <div className="inputs-section fade-in-delay-1">
            <h3 className="section-title">{t.reverseTitle}</h3>
            <div className="input-group">
              <label>{t.desiredIncome} ({c.currency})</label>
              <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)} />
            </div>
            <div className="input-group">
              <label>{t.platform}</label>
              <select value={revPlatform} onChange={(e) => setRevPlatform(e.target.value)}>
                {Object.entries(platforms).map(([key, val]) => (
                  <option key={key} value={key}>{val.name} ({(val.commission * 100).toFixed(0)}%)</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>{t.hoursPerWeek}</label>
              <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
            </div>
            <div className="input-group">
              <label>{t.weeksPerYear}</label>
              <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
            </div>
            <div className="result-row positive main-result" style={{ marginTop: "20px", gridColumn: "1 / -1" }}>
              <span>{t.requiredRate}</span>
              <span className="result-value">{c.currency}{requiredHourlyRate.toFixed(2)}/hr</span>
            </div>
          </div>
        )}

        {activeSection === "progression" && (
          <div className="inputs-section fade-in-delay-1">
            <h3 className="section-title">{t.progressTitle}</h3>
            <div className="progression-grid">
              {progressionSteps.map((step, i) => (
                <div key={i} className="progression-card">
                  <div className="prog-label">{step.label}</div>
                  <div className="prog-bar-wrap">
                    <div className="prog-bar-fill" style={{ height: `${(step.net / maxNet) * 100}%` }} />
                  </div>
                  <div className="prog-net">{c.currency}{(step.net / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "compare" && (
          <div className="inputs-section fade-in-delay-1">
            <h3 className="section-title">{t.compareTitle}</h3>
            <div className="input-group full-width">
              <label>{t.income} ({c.currency})</label>
              <input type="number" value={compareIncome} onChange={(e) => setCompareIncome(e.target.value)} />
            </div>
            <div className="country-compare-list full-width">
              {countryComparison.map((item, i) => (
                <div key={item.key} className={`country-row ${item.key === country ? "active-country" : ""}`}>
                  <span className="rank">#{i + 1}</span>
                  <span className="country-flag">{item.flag} {item.name}</span>
                  <div className="country-bar-wrap">
                    <div className="country-bar-fill" style={{ width: `${(item.net / countryComparison[0].net) * 100}%` }} />
                  </div>
                  <span className="country-net">{item.currency}{item.net.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
