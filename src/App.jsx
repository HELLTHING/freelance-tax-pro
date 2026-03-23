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
  const [language, setLanguage] = useState("ru");
  const [income, setIncome] = useState("50000");
  const [platform, setPlatform] = useState("upwork");
  const [country, setCountry] = useState("usa");
  const [desiredIncome, setDesiredIncome] = useState("100000");
  const [hourlyRate, setHourlyRate] = useState("0");
  const [showResults, setShowResults] = useState(false);
  const [showReverse, setShowReverse] = useState(false);
  const [moneyRainActive, setMoneyRainActive] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ru";
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = {
    ru: {
      title: "Income Tracker",
      subtitle: "Узн
