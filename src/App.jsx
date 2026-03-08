import React, { useState, useEffect } from "react";
import "./styles.css";

// Компонент для анимированных чисел
const AnimatedNumber = ({ value, prefix = "$", decimals = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value) || 0;
    if (start === end) return;

    const duration = 1000; // 1 секунда
    const increment = end / (duration / 16); // 60fps

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

export default function FreelanceTaxPro() {
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [country, setCountry] = useState("usa");
  const [desiredIncome, setDesiredIncome] = useState("100000");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [earnedToday, setEarnedToday] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showReverse, setShowReverse] = useState(false);
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

  // Генерируем анимированные частицы
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  // Таймер реального времени
  useEffect(() => {
    const incomeNum = parseFloat(income) || 0;
    const secondsInYear = 365.25 * 24 * 60 * 60;
    const earningsPerSecond = incomeNum / secondsInYear;

    const timer = setInterval(() => {
      setEarnedToday((prev) => prev + earningsPerSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [income]);

  // Показываем результаты с задержкой
  useEffect(() => {
    setShowResults(true);
  }, [income, platform, country]);

  // Прямой расчет
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
    };
  };

  // Обратный расчет
  const calculateBackward = () => {
    const desiredNum = parseFloat(desiredIncome) || 0;
    const platformData = platforms[platform];
    const countryData = countries[country];

    const requiredGross =
      desiredNum / ((1 - platformData.commission) * (1 - countryData.taxRate));
    const hourlyRate = requiredGross / 2080;

    setHourlyRate(hourlyRate.toFixed(2));
    setShowReverse(true);
  };

  // Сравнение стран
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

  const forwardResults = calculateForward();
  const countryComparison = compareCountries();

  return (
    <div className="app">
      {/* АНИМИРОВАННЫЙ ФОН */}
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

      <div className="container">
        {/* ЗАГОЛОВОК */}
        <div className="header fade-in">
          <h1 className="title-animate">💰 Freelance Calculator</h1>
          <p className="subtitle-animate">Узнай сколько ты РЕАЛЬНО заработаешь</p>
        </div>

        {/* ТАЙМЕР */}
        <div className="timer-box pulse-glow fade-in-delay-1">
          <div className="timer-content">
            <span className="timer-label">Ты заработал пока ты здесь:</span>
            <span className="timer-value pulse">
              <AnimatedNumber value={earnedToday.toFixed(2)} prefix="$" />
            </span>
            <span className="timer-subtext">Зависит от твоего годового дохода</span>
          </div>
        </div>

        {/* INPUTS */}
        <div className="inputs-section fade-in-delay-2">
          <div className="input-group">
            <label>💰 Годовой доход ($)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => {
                setIncome(e.target.value);
                setEarnedToday(0);
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

        {/* РЕЗУЛЬТАТЫ */}
        {showResults && (
          <div className="results-box fade-in-delay-3">
            <h2>Сколько ты заработаешь:</h2>
            <div className="result-grid">
              <div className="result-card gross slide-in" style={{ "--delay": "0s" }}>
                <span className="label">Валовой доход</span>
                <span className="value">
                  <AnimatedNumber value={forwardResults.gross.toFixed(2)} />
                </span>
              </div>

              <div className="result-card fee slide-in" style={{ "--delay": "0.1s" }}>
                <span className="label">Комиссия платформы</span>
                <span className="value">
                  -<AnimatedNumber value={forwardResults.platformFee.toFixed(2)} />
                </span>
              </div>

              <div className="result-card tax slide-in" style={{ "--delay": "0.2s" }}>
                <span className="label">Налоги</span>
                <span className="value">
                  -<AnimatedNumber value={forwardResults.taxes.toFixed(2)} />
                  <small> ({forwardResults.taxPercentage.toFixed(1)}%)</small>
                </span>
              </div>

              <div
                className="result-card net slide-in bounce-in"
                style={{ "--delay": "0.3s" }}
              >
                <span className="label">💰 ТЫ ЗАРАБОТАЕШЬ</span>
                <span className="value big">
                  <AnimatedNumber value={forwardResults.net.toFixed(2)} />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ОБРАТНЫЙ КАЛЬКУЛЯТОР */}
        <div className="reverse-calculator fade-in-delay-4">
          <h2>📊 Обратный расчет</h2>
          <p className="reverse-subtitle">
            Я хочу заработать $X нетто - какую ставку ставить?
          </p>

          <div className="reverse-inputs">
            <div className="input-group">
              <label>Желаемый нетто доход за год ($)</label>
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
                На платформе <strong>{platforms[platform].name}</strong> в{" "}
                <strong>{countries[country].name}</strong>:
              </p>
              <div className="hourly-rate-box bounce-in-box">
                <span className="hourly-label">Нужна ставка:</span>
                <span className="hourly-value">
                  $<AnimatedNumber value={hourlyRate} prefix="" />
                  /час
                </span>
                <span className="hourly-subtext">
                  для годового дохода ${desiredIncome}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* СРАВНЕНИЕ СТРАН */}
        <div className="comparison-section fade-in-delay-5">
          <h2>🗺️ Сравнение стран</h2>
          <p className="comparison-subtitle">
            Доход: ${income} на {platforms[platform].name}
          </p>

          <div className="countries-table">
            {countryComparison.map((country, index) => (
              <div
                key={country.key}
                className={`country-row ${index === 0 ? "best" : ""} stagger-in`}
                style={{ "--stagger-delay": `${index * 0.1}s` }}
              >
                <div className="country-info">
                  <span className="rank">#{index + 1}</span>
                  <span className="country-name">{country.name}</span>
                </div>
                <div className="country-earnings">
                  <span className="net-amount">
                    <AnimatedNumber value={country.net.toFixed(2)} />
                  </span>
                  <span className="tax-info">
                    Налог: {country.taxPercentage.toFixed(1)}%
                  </span>
                </div>
                {index === 0 && <span className="badge">⭐ ЛУЧШЕ!</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
