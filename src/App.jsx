import React, { useState } from "react";
import "./styles.css";

export default function FreelanceTaxPro() {
  const [activeTab, setActiveTab] = useState("landing");
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [language, setLanguage] = useState("en");

  const countries = {
    usa: {
      name: "United States",
      currency: "$",
      taxRate: 0.25,
      seTaxRate: 0.153,
      stateAvg: 0.05,
      flag: "🇺🇸",
    },
    uk: {
      name: "United Kingdom",
      currency: "£",
      taxRate: 0.2,
      niRate: 0.08,
      flag: "🇬🇧",
    },
    canada: {
      name: "Canada",
      currency: "CAD $",
      taxRate: 0.25,
      provAvg: 0.08,
      flag: "🇨🇦",
    },
    australia: {
      name: "Australia",
      currency: "AUD $",
      taxRate: 0.37,
      flag: "🇦🇺",
    },
    eu: {
      name: "European Union",
      currency: "€",
      taxRate: 0.22,
      vatRate: 0.19,
      flag: "🇪🇺",
    },
    russia: {
      name: "Russia",
      currency: "₽",
      taxRate: 0.06,
      flag: "🇷🇺",
    },
    india: {
      name: "India",
      currency: "₹",
      taxRate: 0.3,
      flag: "🇮🇳",
    },
    philippines: {
      name: "Philippines",
      currency: "₱",
      taxRate: 0.32,
      flag: "🇵🇭",
    },
  };

  const platforms = {
    upwork: { name: "Upwork", commission: 0.05 },
    fiverr: { name: "Fiverr", commission: 0.2 },
    freelancer: { name: "Freelancer.com", commission: 0.1 },
    direct: { name: "Direct Clients", commission: 0 },
    guru: { name: "Guru", commission: 0.09 },
  };

  const translations = {
    en: {
      landing_title: "Calculate Your Real Freelance Income",
      landing_subtitle:
        "Know exactly how much you'll earn after taxes and platform fees",
      landing_cta: "Calculate Now",
      calculator_title: "Freelance Tax Calculator",
      country: "Select Country",
      income_label: "Annual Income",
      platform_label: "Work Platform",
      calculate_btn: "Calculate",
      results: "Your Results",
      gross_income: "Gross Income",
      platform_fee: "Platform Commission",
      taxes: "Total Taxes",
      net_income: "Net Income (Take Home)",
      tax_breakdown: "Tax Breakdown",
      monthly_net: "Monthly Net Income",
      features: "Premium Features",
      feature1: "Support All Countries",
      feature2: "Tax Optimization Tips",
      feature3: "PDF Reports",
      feature4: "Monthly Tracking",
      price: "$4.99/month",
      cta_premium: "Go Premium",
    },
    es: {
      landing_title: "Calcula Tu Ingreso Real como Freelancer",
      landing_subtitle:
        "Sabe exactamente cuánto ganarás después de impuestos y comisiones",
      landing_cta: "Calcular Ahora",
      calculator_title: "Calculadora de Impuestos para Freelancers",
      country: "Selecciona País",
      income_label: "Ingreso Anual",
      platform_label: "Plataforma de Trabajo",
      calculate_btn: "Calcular",
      results: "Tus Resultados",
      gross_income: "Ingreso Bruto",
      platform_fee: "Comisión de Plataforma",
      taxes: "Impuestos Totales",
      net_income: "Ingreso Neto (A Tu Bolsillo)",
      tax_breakdown: "Desglose de Impuestos",
      monthly_net: "Ingreso Neto Mensual",
      features: "Características Premium",
      feature1: "Soporta Todos los Países",
      feature2: "Consejos de Optimización",
      feature3: "Reportes en PDF",
      feature4: "Seguimiento Mensual",
      price: "$4.99/mes",
      cta_premium: "Obtener Premium",
    },
    ru: {
      landing_title: "Рассчитай свой реальный доход фрилансера",
      landing_subtitle:
        "Узнай точно сколько ты заработаешь после налогов и комиссий",
      landing_cta: "Рассчитать",
      calculator_title: "Калькулятор налогов фрилансера",
      country: "Выбери страну",
      income_label: "Годовой доход",
      platform_label: "Платформа работы",
      calculate_btn: "Рассчитать",
      results: "Ваши результаты",
      gross_income: "Валовый доход",
      platform_fee: "Комиссия платформы",
      taxes: "Общие налоги",
      net_income: "Чистый доход (В кармане)",
      tax_breakdown: "Разбор налогов",
      monthly_net: "Месячный чистый доход",
      features: "Премиум функции",
      feature1: "Все страны",
      feature2: "Советы по оптимизации",
      feature3: "PDF отчёты",
      feature4: "Ежемесячное отслеживание",
      price: "$4.99/месяц",
      cta_premium: "Premium версия",
    },
  };

  const t = translations[language];

  const calculateTax = () => {
    const incomeNum = parseFloat(income) || 0;
    const country = countries[selectedCountry];
    const plat = platforms[platform];

    const platformFee = incomeNum * plat.commission;
    const afterPlatform = incomeNum - platformFee;

    let totalTax = 0;
    let taxBreakdown = {};

    if (selectedCountry === "usa") {
      const fedTax = afterPlatform * country.taxRate;
      const seTax = afterPlatform * country.seTaxRate;
      const stateTax = afterPlatform * country.stateAvg;
      totalTax = fedTax + seTax + stateTax;
      taxBreakdown = {
        federal: fedTax,
        selfEmployment: seTax,
        state: stateTax,
      };
    } else if (selectedCountry === "uk") {
      const incomeTax = afterPlatform * country.taxRate;
      const niTax = afterPlatform * country.niRate;
      totalTax = incomeTax + niTax;
      taxBreakdown = { incomeTax: incomeTax, ni: niTax };
    } else if (selectedCountry === "russia") {
      totalTax = afterPlatform * country.taxRate;
      taxBreakdown = { npd: totalTax };
    } else {
      totalTax = afterPlatform * country.taxRate;
      taxBreakdown = { income: totalTax };
    }

    const netIncome = afterPlatform - totalTax;
    const monthlyNet = netIncome / 12;

    return {
      grossIncome: incomeNum,
      platformFee: platformFee,
      totalTax: totalTax,
      netIncome: netIncome,
      monthlyNet: monthlyNet,
      taxBreakdown: taxBreakdown,
    };
  };

  const results = calculateTax();
  const country = countries[selectedCountry];

  const renderLanding = () => (
    <div className="landing">
      <div className="hero">
        <h1>{t.landing_title}</h1>
        <p>{t.landing_subtitle}</p>
        <button
          className="cta-button"
          onClick={() => setActiveTab("calculator")}
        >
          {t.landing_cta}
        </button>
      </div>

      <div className="features-section">
        <h2>{t.features}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <p>{t.feature1}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <p>{t.feature2}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <p>{t.feature3}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <p>{t.feature4}</p>
          </div>
        </div>
      </div>

      <div className="premium-section">
        <h2>Unlock Premium Features</h2>
        <p className="price">{t.price}</p>
        <button className="premium-button">{t.cta_premium}</button>
      </div>
    </div>
  );

  const renderCalculator = () => (
    <div className="calculator">
      <div className="calc-header">
        <h2>{t.calculator_title}</h2>
        <button className="back-button" onClick={() => setActiveTab("landing")}>
          ← Back
        </button>
      </div>

      <div className="calc-form">
        <div className="form-group">
          <label>{t.country}</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {Object.entries(countries).map(([key, val]) => (
              <option key={key} value={key}>
                {val.flag} {val.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t.income_label}</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="50000"
          />
        </div>

        <div className="form-group">
          <label>{t.platform_label}</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {Object.entries(platforms).map(([key, val]) => (
              <option key={key} value={key}>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        <div className="language-selector">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">🇬🇧 English</option>
            <option value="es">🇪🇸 Español</option>
            <option value="ru">🇷🇺 Русский</option>
          </select>
        </div>
      </div>

      <div className="results-section">
        <h3>{t.results}</h3>

        <div className="result-item">
          <span>{t.gross_income}</span>
          <span className="amount">
            {country.currency}
            {results.grossIncome.toFixed(2)}
          </span>
        </div>

        <div className="result-item highlight-red">
          <span>{t.platform_fee}</span>
          <span className="amount">
            -{country.currency}
            {results.platformFee.toFixed(2)}
          </span>
        </div>

        <div className="result-item highlight-red">
          <span>{t.taxes}</span>
          <span className="amount">
            -{country.currency}
            {results.totalTax.toFixed(2)}
          </span>
        </div>

        <div className="result-item main-result">
          <span>{t.net_income}</span>
          <span className="amount highlight-green">
            {country.currency}
            {results.netIncome.toFixed(2)}
          </span>
        </div>

        <div className="result-item monthly">
          <span>{t.monthly_net}</span>
          <span className="amount">
            {country.currency}
            {results.monthlyNet.toFixed(2)}
          </span>
        </div>

        <div className="chart">
          <div className="chart-breakdown">
            <div className="breakdown-item">
              <div
                className="bar"
                style={{
                  width: `${
                    (results.platformFee / results.grossIncome) * 100
                  }%`,
                  backgroundColor: "#E74C3C",
                }}
              ></div>
              <span>
                Platform (
                {((results.platformFee / results.grossIncome) * 100).toFixed(1)}
                %)
              </span>
            </div>
            <div className="breakdown-item">
              <div
                className="bar"
                style={{
                  width: `${(results.totalTax / results.grossIncome) * 100}%`,
                  backgroundColor: "#E67E22",
                }}
              ></div>
              <span>
                Taxes (
                {((results.totalTax / results.grossIncome) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="breakdown-item">
              <div
                className="bar"
                style={{
                  width: `${(results.netIncome / results.grossIncome) * 100}%`,
                  backgroundColor: "#27AE60",
                }}
              ></div>
              <span>
                Your Income (
                {((results.netIncome / results.grossIncome) * 100).toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>

        <button className="premium-button">{t.cta_premium}</button>
      </div>
    </div>
  );

  return (
    <div className="freelance-tax-pro">
      <nav className="navbar">
        <h1 className="logo">💰 FREELANCE TAX PRO</h1>
        <p className="tagline">Calculate Your Real Income</p>
      </nav>

      {activeTab === "landing" ? renderLanding() : renderCalculator()}

      <footer className="footer">
        <p>© 2024 Freelance Tax Pro. All rights reserved.</p>
        <p>
          This is a calculation tool. Consult a tax professional for
          personalized advice.
        </p>
      </footer>
    </div>
  );
}
