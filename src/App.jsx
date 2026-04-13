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
  eu: { name: "European Union", currency: "€", taxRate: 0.22, flag: "🇪🇺" },
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
    title: "TakeHomePro",
    subtitle: "Узнай свой реальный доход после налогов и комиссий",
    calcBtn: "Рассчитать",
    income: "Годовой доход",
    platform: "Платформа",
    country: "Страна",
    grossIncome: "Валовый доход",
    platformFee: "Комиссия платформы",
    taxes: "Налоги",
    netIncome: "Чистый доход",
    monthlyNet: "В месяц",
    reverseTitle: "Обратный расчёт ставки",
    desiredIncome: "Желаемый годовой доход",
    requiredRate: "Необходимая почасовая ставка",
    progressTitle: "Прогрессия дохода",
    compareTitle: "Сравнение по странам",
    scenarioTitle: "Сравнение сценариев",
    scenarioSubtitle: "Сравни до 3 сценариев с разными условиями",
    addScenario: "Добавить сценарий",
    removeScenario: "Удалить",
    scenario: "Сценарий",
    hoursPerWeek: "Часов в неделю",
    weeksPerYear: "Недель в году",
    net: "Нетто",
    tax: "Налоги",
    fee: "Комиссия",
  },
  en: {
    title: "TakeHomePro",
    subtitle: "Know your real income after taxes and platform fees",
    calcBtn: "Calculate",
    income: "Annual Income",
    platform: "Platform",
    country: "Country",
    grossIncome: "Gross Income",
    platformFee: "Platform Fee",
    taxes: "Taxes",
    netIncome: "Net Income",
    monthlyNet: "Monthly",
    reverseTitle: "Reverse Rate Calculator",
    desiredIncome: "Desired Annual Income",
    requiredRate: "Required Hourly Rate",
    progressTitle: "Income Progression",
    compareTitle: "Country Comparison",
    scenarioTitle: "Scenario Comparison",
    scenarioSubtitle: "Compare up to 3 scenarios with different conditions",
    addScenario: "Add Scenario",
    removeScenario: "Remove",
    scenario: "Scenario",
    hoursPerWeek: "Hours per week",
    weeksPerYear: "Weeks per year",
    net: "Net",
    tax: "Taxes",
    fee: "Fee",
  },
  es: {
    title: "TakeHomePro",
    subtitle: "Conoce tus ingresos reales después de impuestos y comisiones",
    calcBtn: "Calcular",
    income: "Ingreso Anual",
    platform: "Plataforma",
    country: "País",
    grossIncome: "Ingreso Bruto",
    platformFee: "Comisión",
    taxes: "Impuestos",
    netIncome: "Ingreso Neto",
    monthlyNet: "Mensual",
    reverseTitle: "Calculadora Inversa",
    desiredIncome: "Ingreso deseado",
    requiredRate: "Tarifa requerida",
    progressTitle: "Progresión de Ingresos",
    compareTitle: "Comparación por País",
    scenarioTitle: "Comparación de Escenarios",
    scenarioSubtitle: "Compara hasta 3 escenarios con diferentes condiciones",
    addScenario: "Agregar Escenario",
    removeScenario: "Quitar",
    scenario: "Escenario",
    hoursPerWeek: "Horas por semana",
    weeksPerYear: "Semanas por año",
    net: "Neto",
    tax: "Impuestos",
    fee: "Comisión",
  },
  de: {
    title: "TakeHomePro",
    subtitle: "Ihr reales Einkommen nach Steuern und Plattformgebühren",
    calcBtn: "Berechnen",
    income: "Jahreseinkommen",
    platform: "Plattform",
    country: "Land",
    grossIncome: "Bruttoeinkommen",
    platformFee: "Plattformgebühr",
    taxes: "Steuern",
    netIncome: "Nettoeinkommen",
    monthlyNet: "Monatlich",
    reverseTitle: "Umgekehrte Berechnung",
    desiredIncome: "Gewünschtes Einkommen",
    requiredRate: "Benötigter Stundensatz",
    progressTitle: "Einkommensprogression",
    compareTitle: "Ländervergleich",
    scenarioTitle: "Szenariovergleich",
    scenarioSubtitle: "Vergleiche bis zu 3 Szenarien mit verschiedenen Bedingungen",
    addScenario: "Szenario hinzufügen",
    removeScenario: "Entfernen",
    scenario: "Szenario",
    hoursPerWeek: "Stunden pro Woche",
    weeksPerYear: "Wochen pro Jahr",
    net: "Netto",
    tax: "Steuern",
    fee: "Gebühr",
  },
  fr: {
    title: "TakeHomePro",
    subtitle: "Connaissez votre revenu réel après impôts et commissions",
    calcBtn: "Calculer",
    income: "Revenu Annuel",
    platform: "Plateforme",
    country: "Pays",
    grossIncome: "Revenu Brut",
    platformFee: "Commission",
    taxes: "Impôts",
    netIncome: "Revenu Net",
    monthlyNet: "Mensuel",
    reverseTitle: "Calcul Inverse",
    desiredIncome: "Revenu souhaité",
    requiredRate: "Taux horaire requis",
    progressTitle: "Progression des Revenus",
    compareTitle: "Comparaison par Pays",
    scenarioTitle: "Comparaison de Scénarios",
    scenarioSubtitle: "Comparez jusqu'à 3 scénarios avec des conditions différentes",
    addScenario: "Ajouter un scénario",
    removeScenario: "Supprimer",
    scenario: "Scénario",
    hoursPerWeek: "Heures par semaine",
    weeksPerYear: "Semaines par an",
    net: "Net",
    tax: "Impôts",
    fee: "Commission",
  },
  pt: {
    title: "TakeHomePro",
    subtitle: "Conheça sua renda real após impostos e taxas",
    calcBtn: "Calcular",
    income: "Renda Anual",
    platform: "Plataforma",
    country: "País",
    grossIncome: "Renda Bruta",
    platformFee: "Taxa da Plataforma",
    taxes: "Impostos",
    netIncome: "Renda Líquida",
    monthlyNet: "Mensal",
    reverseTitle: "Cálculo Inverso",
    desiredIncome: "Renda desejada",
    requiredRate: "Taxa horária necessária",
    progressTitle: "Progressão de Renda",
    compareTitle: "Comparação por País",
    scenarioTitle: "Comparação de Cenários",
    scenarioSubtitle: "Compare até 3 cenários com condições diferentes",
    addScenario: "Adicionar Cenário",
    removeScenario: "Remover",
    scenario: "Cenário",
    hoursPerWeek: "Horas por semana",
    weeksPerYear: "Semanas por ano",
    net: "Líquido",
    tax: "Impostos",
    fee: "Taxa",
  },
  zh: {
    title: "TakeHomePro",
    subtitle: "了解您税后和平台费用后的真实收入",
    calcBtn: "计算",
    income: "年收入",
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
    scenarioTitle: "场景对比",
    scenarioSubtitle: "比较最多3个不同条件的场景",
    addScenario: "添加场景",
    removeScenario: "删除",
    scenario: "场景",
    hoursPerWeek: "每周工作小时",
    weeksPerYear: "每年工作周数",
    net: "净收入",
    tax: "税款",
    fee: "费用",
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

const SCENARIO_COLORS = ["#00ff88", "#00ccff", "#ff6b6b"];

function calculateTax(income, countryKey, platformKey) {
  const incomeNum = parseFloat(income) || 0;
  const c = countries[countryKey];
  const p = platforms[platformKey];
  const platformFee = incomeNum * p.commission;
  const afterPlatform = incomeNum - platformFee;
  let totalTax = 0;

  if (countryKey === "usa") {
    totalTax = afterPlatform * (c.taxRate + c.seTaxRate + c.stateAvg);
  } else if (countryKey === "uk") {
    totalTax = afterPlatform * (c.taxRate + c.niRate);
  } else if (countryKey === "ireland") {
    totalTax = afterPlatform * (c.taxRate + c.prsiRate + c.uscRate);
  } else {
    totalTax = afterPlatform * c.taxRate;
  }

  const netIncome = afterPlatform - totalTax;
  return { grossIncome: incomeNum, platformFee, totalTax, netIncome, monthlyNet: netIncome / 12 };
}

const defaultScenario = () => ({ income: "50000", country: "usa", platform: "upwork" });

export default function TakeHomePro() {
  const [language, setLanguage] = useState("ru");
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [country, setCountry] = useState("usa");
  const [desiredIncome, setDesiredIncome] = useState("60000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("48");
  const [showResults, setShowResults] = useState(false);
  const [moneyRainActive, setMoneyRainActive] = useState(false);
  const [activeSection, setActiveSection] = useState("calculator");
  const [scenarios, setScenarios] = useState([defaultScenario(), defaultScenario()]);

  useEffect(() => {
    const saved = localStorage.getItem("language") || "ru";
    setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = translations[language];
  const results = calculateTax(income, country, platform);
  const c = countries[country];

  const totalHours = parseFloat(hoursPerWeek) * parseFloat(weeksPerYear) || 1;
  const platformMultiplier = 1 / (1 - platforms[platform].commission);
  let taxMultiplier = 1;
  if (country === "usa") taxMultiplier = 1 / (1 - (countries.usa.taxRate + countries.usa.seTaxRate + countries.usa.stateAvg));
  else if (country === "uk") taxMultiplier = 1 / (1 - (countries.uk.taxRate + countries.uk.niRate));
  else if (country === "ireland") taxMultiplier = 1 / (1 - (countries.ireland.taxRate + countries.ireland.prsiRate + countries.ireland.uscRate));
  else taxMultiplier = 1 / (1 - countries[country].taxRate);
  const requiredHourlyRate = ((parseFloat(desiredIncome) || 0) / totalHours) * platformMultiplier * taxMultiplier;

  const progressionSteps = [0.25, 0.5, 0.75, 1.0, 1.5, 2.0].map((mult) => {
    const r = calculateTax(parseFloat(income) * mult, country, platform);
    return { label: `${c.currency}${(parseFloat(income) * mult / 1000).toFixed(0)}k`, net: r.netIncome };
  });
  const maxNet = Math.max(...progressionSteps.map((s) => s.net));

  const countryComparison = Object.entries(countries).map(([key, val]) => {
    const r = calculateTax(income, key, platform);
    return { key, flag: val.flag, name: val.name, currency: val.currency, net: r.netIncome };
  }).sort((a, b) => b.net - a.net);

  const scenarioResults = scenarios.map((sc) => calculateTax(sc.income, sc.country, sc.platform));
  const maxScenarioNet = Math.max(...scenarioResults.map((r) => r.netIncome), 1);

  const handleCalculate = () => {
    setShowResults(true);
    setMoneyRainActive(true);
    setTimeout(() => setMoneyRainActive(false), 4000);
  };

  const updateScenario = (index, field, value) => {
    setScenarios((prev) => prev.map((sc, i) => i === index ? { ...sc, [field]: value } : sc));
  };

  const addScenario = () => {
    if (scenarios.length < 3) setScenarios((prev) => [...prev, defaultScenario()]);
  };

  const removeScenario = (index) => {
    if (scenarios.length > 1) setScenarios((prev) => prev.filter((_, i) => i !== index));
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
          {[
            { key: "calculator", icon: "🧮" },
            { key: "scenarios", icon: "⚖️" },
            { key: "reverse", icon: "🎯" },
            { key: "progression", icon: "📈" },
            { key: "compare", icon: "🌍" },
          ].map((sec) => (
            <button
              key={sec.key}
              className={`tab-btn ${activeSection === sec.key ? "active" : ""}`}
              onClick={() => setActiveSection(sec.key)}
            >
              {sec.icon}
            </button>
          ))}
        </div>

        {activeSection === "calculator" && (
          <div className="card fade-in-delay-1">
            <div className="inputs-grid">
              <div className="input-group">
                <label>{t.country}</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  {Object.entries(countries).map(([key, val]) => (
                    <option key={key} value={key}>{val.flag} {val.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>{t.income} ({c.currency})</label>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
              </div>
              <div className="input-group">
                <label>{t.platform}</label>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  {Object.entries(platforms).map(([key, val]) => (
                    <option key={key} value={key}>{val.name} ({(val.commission * 100).toFixed(0)}%)</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="calculate-btn" onClick={handleCalculate}>{t.calcBtn} 🚀</button>

            {showResults && (
              <div className="results-box fade-in">
                <div className="result-row">
                  <span>{t.grossIncome}</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.grossIncome} prefix="" /></span>
                </div>
                <div className="result-row negative">
                  <span>{t.platformFee} ({(platforms[platform].commission * 100).toFixed(0)}%)</span>
                  <span className="result-value">-{c.currency}<AnimatedNumber value={results.platformFee} prefix="" /></span>
                </div>
                <div className="result-row negative">
                  <span>{t.taxes}</span>
                  <span className="result-value">-{c.currency}<AnimatedNumber value={results.totalTax} prefix="" /></span>
                </div>
                <div className="result-row positive main-result">
                  <span>{t.netIncome} 🎉</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.netIncome} prefix="" /></span>
                </div>
                <div className="result-row monthly">
                  <span>{t.monthlyNet}</span>
                  <span className="result-value">{c.currency}<AnimatedNumber value={results.monthlyNet} prefix="" /></span>
                </div>

                <div className="breakdown-bar-wrap">
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-seg seg-net"
                      style={{ width: `${(results.netIncome / results.grossIncome) * 100}%` }}
                      title={`${t.net}: ${((results.netIncome / results.grossIncome) * 100).toFixed(1)}%`}
                    />
                    <div
                      className="breakdown-seg seg-tax"
                      style={{ width: `${(results.totalTax / results.grossIncome) * 100}%` }}
                      title={`${t.taxes}: ${((results.totalTax / results.grossIncome) * 100).toFixed(1)}%`}
                    />
                    <div
                      className="breakdown-seg seg-fee"
                      style={{ width: `${(results.platformFee / results.grossIncome) * 100}%` }}
                      title={`${t.fee}: ${((results.platformFee / results.grossIncome) * 100).toFixed(1)}%`}
                    />
                  </div>
                  <div className="breakdown-legend">
                    <span><span className="leg-dot dot-net" />{t.net}: {((results.netIncome / results.grossIncome) * 100).toFixed(1)}%</span>
                    <span><span className="leg-dot dot-tax" />{t.taxes}: {((results.totalTax / results.grossIncome) * 100).toFixed(1)}%</span>
                    <span><span className="leg-dot dot-fee" />{t.fee}: {((results.platformFee / results.grossIncome) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "scenarios" && (
          <div className="card fade-in-delay-1">
            <h3 className="section-title">{t.scenarioTitle}</h3>
            <p className="section-subtitle">{t.scenarioSubtitle}</p>

            <div className="scenarios-grid">
              {scenarios.map((sc, idx) => {
                const res = scenarioResults[idx];
                const scCountry = countries[sc.country];
                const color = SCENARIO_COLORS[idx];
                return (
                  <div key={idx} className="scenario-card" style={{ borderColor: color }}>
                    <div className="scenario-header" style={{ color }}>
                      <span>{t.scenario} {idx + 1}</span>
                      {scenarios.length > 1 && (
                        <button className="remove-btn" onClick={() => removeScenario(idx)}>{t.removeScenario}</button>
                      )}
                    </div>
                    <div className="input-group">
                      <label>{t.country}</label>
                      <select value={sc.country} onChange={(e) => updateScenario(idx, "country", e.target.value)}>
                        {Object.entries(countries).map(([key, val]) => (
                          <option key={key} value={key}>{val.flag} {val.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="input-group">
                      <label>{t.income} ({scCountry.currency})</label>
                      <input type="number" value={sc.income} onChange={(e) => updateScenario(idx, "income", e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label>{t.platform}</label>
                      <select value={sc.platform} onChange={(e) => updateScenario(idx, "platform", e.target.value)}>
                        {Object.entries(platforms).map(([key, val]) => (
                          <option key={key} value={key}>{val.name} ({(val.commission * 100).toFixed(0)}%)</option>
                        ))}
                      </select>
                    </div>

                    <div className="scenario-result">
                      <div className="scenario-net" style={{ color }}>
                        {scCountry.currency}{res.netIncome.toFixed(0)}
                        <span className="scenario-net-label"> / {t.netIncome}</span>
                      </div>
                      <div className="scenario-monthly">
                        {scCountry.currency}{res.monthlyNet.toFixed(0)} / {t.monthlyNet}
                      </div>
                    </div>

                    <div className="breakdown-bar-wrap">
                      <div className="breakdown-bar">
                        <div
                          className="breakdown-seg"
                          style={{
                            width: `${(res.netIncome / res.grossIncome) * 100}%`,
                            background: color,
                          }}
                        />
                        <div
                          className="breakdown-seg seg-tax"
                          style={{ width: `${(res.totalTax / res.grossIncome) * 100}%` }}
                        />
                        <div
                          className="breakdown-seg seg-fee"
                          style={{ width: `${(res.platformFee / res.grossIncome) * 100}%` }}
                        />
                      </div>
                      <div className="breakdown-legend small">
                        <span><span className="leg-dot" style={{ background: color }} />{t.net}: {((res.netIncome / res.grossIncome) * 100).toFixed(0)}%</span>
                        <span><span className="leg-dot dot-tax" />{t.taxes}: {((res.totalTax / res.grossIncome) * 100).toFixed(0)}%</span>
                        <span><span className="leg-dot dot-fee" />{t.fee}: {((res.platformFee / res.grossIncome) * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <div className="scenario-bar-wrap">
                      <div
                        className="scenario-bar-fill"
                        style={{
                          width: `${(res.netIncome / maxScenarioNet) * 100}%`,
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {scenarios.length < 3 && (
              <button className="add-scenario-btn" onClick={addScenario}>
                + {t.addScenario}
              </button>
            )}
          </div>
        )}

        {activeSection === "reverse" && (
          <div className="card fade-in-delay-1">
            <h3 className="section-title">{t.reverseTitle}</h3>
            <div className="inputs-grid">
              <div className="input-group">
                <label>{t.desiredIncome} ({c.currency})</label>
                <input type="number" value={desiredIncome} onChange={(e) => setDesiredIncome(e.target.value)} />
              </div>
              <div className="input-group">
                <label>{t.hoursPerWeek}</label>
                <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
              </div>
              <div className="input-group">
                <label>{t.weeksPerYear}</label>
                <input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
              </div>
            </div>
            <div className="result-row positive main-result" style={{ marginTop: "20px" }}>
              <span>{t.requiredRate}</span>
              <span className="result-value">{c.currency}{requiredHourlyRate.toFixed(2)}/hr</span>
            </div>
          </div>
        )}

        {activeSection === "progression" && (
          <div className="card fade-in-delay-1">
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
          <div className="card fade-in-delay-1">
            <h3 className="section-title">{t.compareTitle}</h3>
            <div className="inputs-grid" style={{ marginBottom: "20px" }}>
              <div className="input-group">
                <label>{t.income}</label>
                <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
              </div>
            </div>
            <div className="country-compare-list">
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
