* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* NAVBAR */
.navbar {
  background: linear-gradient(135deg, #27ae60 0%, #2980b9 100%);
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar h1 {
  font-size: 24px;
  font-weight: bold;
}

.nav-button {
  background-color: rgba(255,255,255,0.2);
  color: white;
  border: none;
  padding: 8px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255,255,255,0.3);
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* LANDING PAGE */
.landing-page {
  text-align: center;
}

.hero {
  background: linear-gradient(135deg, #27ae60 0%, #2980b9 100%);
  color: white;
  padding: 60px 30px;
  border-radius: 15px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero h2 {
  font-size: 28px;
  margin-bottom: 15px;
}

.hero p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
}

.cta-button {
  background-color: #f39c12;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #e67e22;
}

/* FEATURES */
.features-section {
  margin-bottom: 40px;
}

.features-section h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.feature span {
  font-size: 40px;
  display: block;
  margin-bottom: 10px;
}

/* PRICING */
.pricing-section {
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  margin: 40px 0;
}

.pricing-section h2 {
  font-size: 28px;
  margin-bottom: 15px;
}

.pricing-section p {
  font-size: 20px;
  margin-bottom: 20px;
}

.premium-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 35px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.premium-button:hover {
  background-color: #45a049;
}

/* CALCULATOR PAGE */
.calculator-page {
  width: 100%;
}

.calculator-container {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.calculator-container h2 {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

/* INPUTS */
.input-section {
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.input-group input,
.input-group select {
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  outline: none;
  border-color: #27ae60;
}

/* LANGUAGE SELECTOR */
.language-selector {
  display: flex;
  gap: 10px;
  grid-column: 1 / -1;
}

.language-selector button {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.language-selector button.active {
  background-color: #27ae60;
  color: white;
  border-color: #27ae60;
}

/* RESULTS */
.results-section {
  margin-top: 40px;
}

.results-section h3 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.result-item {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  border-left: 5px solid #27ae60;
}

.result-item.commission {
  border-left-color: #e74c3c;
}

.result-item.taxes {
  border-left-color: #f39c12;
}

.result-item.net-income {
  border-left-color: #27ae60;
  background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
}

.result-item.monthly {
  border-left-color: #2980b9;
}

.result-item span {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.result-item strong {
  font-size: 22px;
  color: #333;
}

/* CHART */
.breakdown-chart {
  margin: 30px 0;
}

.chart-bar {
  display: flex;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.bar-segment {
  height: 100%;
}

.bar-segment.green {
  background-color: #27ae60;
}

.bar-segment.orange {
  background-color: #f39c12;
}

.bar-segment.red {
  background-color: #e74c3c;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.legend span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.dot.green {
  background-color: #27ae60;
}

.dot.orange {
  background-color: #f39c12;
}

.dot.red {
  background-color: #e74c3c;
}

/* BUTTONS */
.back-button {
  display: block;
  margin: 30px auto 0;
  background-color: #95a5a6;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #7f8c8d;
}

/* FOOTER */
.footer {
  background-color: #2c3e50;
  color: white;
  text-align: center;
  padding: 30px 20px;
  margin-top: 40px;
  font-size: 14px;
}

.footer p {
  margin: 8px 0;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 10px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .hero h2 {
    font-size: 20px;
  }

  .calculator-container {
    padding: 20px;
  }

  .input-section {
    grid-template-columns: 1fr;
  }
}
