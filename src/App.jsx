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

  return (
    <>
      {prefix}
      {displayValue.toFixed(decimals)}
    </>
  );
};

// Money Rain Component
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
        <div
          key={money.id}
          className="money-drop"
          style={{ left: `${money.left}%` }}
        >
          💵 ${money.amount}
        </div>
      ))}
    </div>
  );
};

export default function FreelanceTaxPro() {
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [country, setCountry] = useState("usa");
  const [desiredIncome, setDesiredIncome] = useState("100000");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [showResults, setShowResults] = useState(false);
  const [showReverse, setShowReverse] = useState(false);
  const [moneyRainActive, setMoneyRainActive] = useState(false);
  const [particles, setParticles] = useState([]);

  const countries = {
    usa: { name: "🇺🇸 United States", taxRate: 0.25 },
    uk: { name: "🇬🇧 United Kingdom", taxRate: 0.28 },
    russia: { name: "🇷🇺 Russia", taxRate: 0.13 },
    canada: { name: "🇨🇦 Canada", taxRate: 0.30 },
    australia: { name: "🇦🇺 Australia", taxRate: 0.37 },
    india: { name: "🇮🇳 India", taxRate: 0.30 },
    philippines: { name: "🇵🇭 Philippines", taxRate: 0.32 },
    eu: { name: "🇪🇺 European Union", taxRate: 0.35 },
  };

  const platforms = {
    upwork: { name: "Upwork", commission: 0.1 },
    fiverr: { name: "Fiverr", commission: 0.2 },
    freelancer: { name: "Freelancer", commission: 0.1 },
    guru: { name: "Guru", commission: 0.09 },
    direct: { name: "Direct Clients", commission: 0 },
  };

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    setShowResults(true);
    setMoneyRainActive(true);
  }, [income, platform, country]);

  const calculateForward = () => {
    const incomeNum = parseFloat(income) || 0;
    const platformData = platforms[platform];
    const countryData = countries[country];

    const platformFee = incomeNum * platformData.commission;
    const afterFee = incomeNum - platformFee;
    const taxes = afterFee * countryData.taxRate;
    const netIncome = afterFee - taxes;

    return {
      gross: incomeNum,
      platformFee,
      taxes,
      net: netIncome,
      taxPercentage: (taxes / afterFee) * 100,
      commissionPercentage: platformData.commission * 100,
    };
  };

  const calculateBackward = () => {
    const desiredNum = parseFloat(desiredIncome) || 0;
    const platformData = platforms[platform];
    const countryData = countries[country];

    const requiredGross =
      desiredNum / ((1 - platformData.commission) * (1 - countryData.taxRate));
    const rate = requiredGross / 2080;

    setHourlyRate(rate.toFixed(2));
    setShowReverse(true);
  };

  const compareCountries = () => {
    const incomeNum = parseFloat(income) || 0;
    const platformData = platforms[platform];

    const results = Object.entries(countries).map(([key, countryData]) => {
      const platformFee = incomeNum * platformData.commission;
      const afterFee = incomeNum - platformFee;
      const taxes = afterFee * countryData.taxRate;
      const netIncome = afterFee - taxes;

      return {
        key,
        name: countryData.name,
        net: netIncome,
        taxPercentage: (taxes / afterFee) * 100,
      };
    });

    return results.sort((a, b) => b.net - a.net);
  };

  const calculateEarnings = (incomeNum) => {
    const daily = incomeNum / 365;
    const weekly = incomeNum / 52;
    const monthly = incomeNum / 12;

    return { daily, weekly, monthly, yearly: incomeNum };
  };

  const forwardResults = calculateForward();
  const countryComparison = compareCountries();
  const earnings = calculateEarnings(parseFloat(income) || 0);
  const bestCountry = countryComparison[0];
  const worstCountry = countryComparison[countryComparison.length - 1];
  const savings =
    bestCountry && worstCountry ? bestCountry.net - worstCountry.net : 0;

  return (
    <div className="app">
      <div className="animated-bg">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          ></div>
        ))}
      </div>

      <MoneyRain isActive={moneyRainActive} />

      <div className="container">
        {/* ЗАГОЛОВОК */}
        <div className="header fade-in">
          <div className="logo">💸</div>
          <h1 className="title-main">Income Tracker</h1>
          <p className="subtitle">Узнай РЕАЛЬНЫЙ доход фрилансера</p>
        </div>

        {/* INPUTS */}
        <div className="inputs-section fade-in-delay-1">
          <div className="input-group">
            <label>💰 Годовой доход ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                setMoneyRainActive(true);
              }}
              placeholder="50000"
              className="input-animate"
            />
          </div>

          <div className="input-group">
            <label>🌐 Платформа</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="input-animate"
            >
              {Object.entries(platforms).map(([key, plat]) => (
                <option key={key} value={key}>
                  {plat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>🗺️ Страна</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input-animate"
            >
              {Object.entries(countries).map(([key, countryData]) => (
                <option key={key} value={key}>
                  {countryData.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SAVINGS BANNER */}
        {savings > 0 && (
          <div className="savings-banner bounce-in">
            <div className="savings-content">
              <span className="savings-icon">⭐</span>
              <div className="savings-text">
                <p className="savings-title">💡 СЭКОНОМЬ МАКСИМУМ!</p>
                <p className="savings-amount">
                  Выбери <strong>{bestCountry.name}</strong> вместо{" "}
                  <strong>{worstCountry.name}</strong>
                </p>
                <p className="savings-value">
                  +<AnimatedNumber value={savings.toFixed(2)} /> в год!
                </p>
              </div>
              <span className="savings-icon">⭐</span>
            </div>
          </div>
        )}

        {/* ВИЗУАЛЬНАЯ ПРОГРЕССИЯ */}
        {showResults && (
          <div className="earnings-progression fade-in-delay-2">
            <h2>Твой доход</h2>
            <div className="progression-grid">
              <div className="progression-card day slide-in">
                <span className="period">За ДЕНЬ</span>
                <span className="amount">
                  <AnimatedNumber value={earnings.daily.toFixed(2)} />
                </span>
              </div>
              <div className="progression-card week slide-in">
                <span className="period">За НЕДЕЛЮ</span>
                <span className="amount">
                  <AnimatedNumber value={earnings.weekly.toFixed(2)} />
                </span>
              </div>
              <div className="progression-card month slide-in">
                <span className="period">За МЕСЯЦ</span>
                <span className="amount">
                  <AnimatedNumber value={earnings.monthly.toFixed(2)} />
                </span>
              </div>
              <div className="progression-card year slide-in">
                <span className="period">За ГОД</span>
                <span className="amount">
                  <AnimatedNumber value={earnings.yearly.toFixed(2)} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* РЕЗУЛЬТАТЫ С ДИАГРАММОЙ */}
        {showResults && (
          <div className="results-section fade-in-delay-3">
            <h2>Куда уходят твои деньги</h2>
            <div className="results-container">
              <div className="pie-chart-wrapper">
                <svg viewBox="0 0 200 200" className="pie-chart">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#27ae60"
                    strokeWidth="45"
                    strokeDasharray={`${
                      (forwardResults.net / forwardResults.gross) * 565
                    } 565`}
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#f39c12"
                    strokeWidth="45"
                    strokeDasharray={`${
                      (forwardResults.taxes / forwardResults.gross) * 565
                    } 565`}
                    strokeDashoffset={`-${
                      (forwardResults.net / forwardResults.gross) * 565
                    }`}
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#e74c3c"
                    strokeWidth="45"
                    strokeDasharray={`${
                      (forwardResults.platformFee / forwardResults.gross) * 565
                    } 565`}
                    strokeDashoffset={`-${
                      ((forwardResults.net + forwardResults.taxes) /
                        forwardResults.gross) *
                      565
                    }`}
                    transform="rotate(-90 100 100)"
                  />
                </svg>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color net"></span>
                  <div className="legend-text">
                    <p className="legend-label">Твой доход</p>
                    <p className="legend-value">
                      <AnimatedNumber
                        value={forwardResults.net.toFixed(2)}
                        prefix="$"
                      />
                      ({((forwardResults.net / forwardResults.gross) * 100).toFixed(1)}%)
                    </p>
                  </div>
                </div>

                <div className="legend-item">
                  <span className="legend-color tax"></span>
                  <div className="legend-text">
                    <p className="legend-label">Налоги</p>
                    <p className="legend-value">
                      <AnimatedNumber
                        value={forwardResults.taxes.toFixed(2)}
                        prefix="$"
                      />
                      ({forwardResults.taxPercentage.toFixed(1)}%)
                    </p>
                  </div>
                </div>

                <div className="legend-item">
                  <span className="legend-color fee"></span>
                  <div className="legend-text">
                    <p className="legend-label">Комиссия платформы</p>
                    <p className="legend-value">
                      <AnimatedNumber
                        value={forwardResults.platformFee.toFixed(2)}
                        prefix="$"
                      />
                      ({forwardResults.commissionPercentage.toFixed(1)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ОБРАТНЫЙ КАЛЬКУЛЯТОР */}
        <div className="reverse-calculator fade-in-delay-4">
          <h2>📊 Сколько брать за работу?</h2>
          <p className="reverse-subtitle">
            Я хочу заработать $X нетто - какую ставку ставить?
          </p>

          <div className="reverse-inputs">
            <div className="input-group">
              <label>Желаемый доход за год ($)</label>
              <input
                type="number"
                value={desiredIncome}
                onChange={(e) => setDesiredIncome(e.target.value)}
                placeholder="100000"
                className="input-animate"
              />
            </div>

            <button
              className="calculate-btn btn-pulse"
              onClick={calculateBackward}
            >
              Рассчитать
            </button>
          </div>

          {hourlyRate !== "0" && showReverse && (
            <div className="reverse-result fade-in">
              <p>
                Твоя ставка на <strong>{platforms[platform].name}</strong> в{" "}
                <strong>{countries[country].name}</strong>:
              </p>
              <div className="hourly-rate-box bounce-in-box">
                <span className="hourly-value big">
                  $<AnimatedNumber value={hourlyRate} prefix="" />
                </span>
                <span className="hourly-label">/час</span>
                <span className="hourly-subtext">
                  для годового дохода ${desiredIncome}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* СРАВНЕНИЕ СТРАН */}
        <div className="comparison-section fade-in-delay-5">
          <h2>🌍 Где выгоднее работать?</h2>
          <p className="comparison-subtitle">
            Сравнение доходов по странам
          </p>

          <div className="countries-table">
            {countryComparison.map((countryItem, index) => (
              <div
                key={countryItem.key}
                className={`country-row ${index === 0 ? "best" : ""} stagger-in`}
                style={{ "--stagger-delay": `${index * 0.08}s` }}
              >
                <div className="country-info">
                  <span className="rank">#{index + 1}</span>
                  <span className="country-name">{countryItem.name}</span>
                </div>
                <div className="country-earnings">
                  <span className="net-amount">
                    <AnimatedNumber value={countryItem.net.toFixed(2)} />
                  </span>
                  <span className="tax-info">
                    Налог: {countryItem.taxPercentage.toFixed(1)}%
                  </span>
                </div>
                {index === 0 && <span className="badge">🏆 ЛУЧШЕ!</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
