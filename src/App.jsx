import { useState, useCallback } from "react";

const STRIPE_LINK = "https://buy.stripe.com/your_link_here";
const fmt = (n, sym) => `${sym}${Math.round(n).toLocaleString()}`;
const pct = (n) => `${(n * 100).toFixed(1)}%`;

const COUNTRIES = {
  ireland:     { name:"Ireland",     flag:"🇮🇪", symbol:"€", calc:(g)=>{ let t=0,u=0,r=g; for(const [l,rt] of [[42000,.20],[Infinity,.40]]){const x=Math.min(r,l-(g-r));if(x<=0)break;t+=x*rt;r-=x;} r=g; for(const [l,rt] of [[12012,.005],[25760,.02],[70044,.04],[Infinity,.08]]){const x=Math.min(r,l-(g-r));if(x<=0)break;u+=x*rt;r-=x;} return {total:t+u+g*.04}; }},
  usa:         { name:"USA",         flag:"🇺🇸", symbol:"$", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[11600,.10],[47150,.12],[100525,.22],[191950,.24],[243725,.32],[609350,.35],[Infinity,.37]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.153}; }},
  uk:          { name:"UK",          flag:"🇬🇧", symbol:"£", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[12570,0],[50270,.20],[125140,.40],[Infinity,.45]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+Math.max(0,Math.min(g,50270)-12570)*.08+Math.max(0,g-50270)*.02}; }},
  germany:     { name:"Germany",     flag:"🇩🇪", symbol:"€", calc:(g)=>{ const t=g<=11604?0:g<=17005?(g-11604)*.14:g<=66760?(g-11604)*.26:g<=277825?(g-11604)*.35:(g-11604)*.42; return {total:t+g*.205}; }},
  france:      { name:"France",      flag:"🇫🇷", symbol:"€", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[11294,0],[28797,.11],[82341,.30],[177106,.41],[Infinity,.45]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.22}; }},
  spain:       { name:"Spain",       flag:"🇪🇸", symbol:"€", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[12450,.19],[20200,.24],[35200,.30],[60000,.37],[300000,.45],[Infinity,.47]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.065}; }},
  netherlands: { name:"Netherlands", flag:"🇳🇱", symbol:"€", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[75518,.3693],[Infinity,.495]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t}; }},
  portugal:    { name:"Portugal",    flag:"🇵🇹", symbol:"€", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[7703,.1325],[11623,.18],[16472,.23],[21321,.26],[27146,.3275],[39791,.37],[51997,.435],[81199,.45],[Infinity,.48]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.214}; }},
  ukraine:     { name:"Ukraine",     flag:"🇺🇦", symbol:"₴", calc:(g)=>({ total:g*.415 }) },
  poland:      { name:"Poland",      flag:"🇵🇱", symbol:"zł",calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[120000,.12],[Infinity,.32]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.1371}; }},
  canada:      { name:"Canada",      flag:"🇨🇦", symbol:"C$",calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[55867,.15],[111733,.205],[154906,.26],[220000,.29],[Infinity,.33]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+Math.min(g*.0595,3867)+Math.min(g*.0166,1049)}; }},
  italy:       { name:"Italy",       flag:"🇮🇹", symbol:"€", calc:(g)=>{ let t=0,p=0; for(const [l,r] of [[28000,.23],[50000,.35],[Infinity,.43]]){const x=Math.min(g,l)-p;if(x<=0)break;t+=x*r;p=l;} return {total:t+g*.259}; }},
};

const PLATFORMS = {
  none:       { name:"Direct",         fee:0     },
  upwork:     { name:"Upwork",         fee:0.10  },
  fiverr:     { name:"Fiverr",         fee:0.20  },
  toptal:     { name:"Toptal",         fee:0     },
  freelancer: { name:"Freelancer.com", fee:0.10  },
  deel:       { name:"Deel",           fee:0     },
  wise:       { name:"Wise",           fee:0.005 },
};

const LANGS = {
  en: { flag:"🇬🇧", label:"English",    gross:"Annual Gross",         country:"Country",  platform:"Platform",  calculate:"Calculate",   net:"Net Income",      taxes:"Total Taxes",    platformFee:"Platform Fee", effectiveRate:"Effective Rate", monthly:"Monthly",     weekly:"Weekly",      daily:"Daily",       rateFinder:"Rate Finder",   rateQ:"Desired annual net?",      rateA:"You need to charge", perHour:"per hour",   perMonth:"per month",  growth:"Income Growth",  growthStart:"Starting Income", growthGoal:"Goal Income", years:"years to goal",    compare:"Compare Countries", addCountry:"Add Country", compare3:"Compare up to 3 countries", history:"History",     noHistory:"No calculations yet",    clearHistory:"Clear",    premium:"PRO", premiumTitle:"Unlock Pro",        premiumSub:"Get the full picture",    premiumCta:"Subscribe — $4.99/mo",    premiumF1:"PDF Reports",          premiumF2:"Calculation History", premiumF3:"Multi-Country Compare", premiumF4:"30+ Countries",    premiumF5:"Tax Tips & Alerts",  freeLabel:"Free",        proLabel:"Pro",  secure:"Secure payment via Stripe"       },
  ru: { flag:"🇷🇺", label:"Русский",    gross:"Годовой доход (брутто)", country:"Страна",   platform:"Платформа", calculate:"Рассчитать",  net:"Чистый доход",    taxes:"Всего налогов",  platformFee:"Комиссия",     effectiveRate:"Эффект. ставка",monthly:"В месяц",     weekly:"В неделю",    daily:"В день",      rateFinder:"Подбор ставки", rateQ:"Желаемый чистый доход?",   rateA:"Нужно брать",        perHour:"в час",      perMonth:"в месяц",    growth:"Рост дохода",    growthStart:"Стартовый доход", growthGoal:"Целевой доход",years:"лет до цели",      compare:"Сравнить страны",   addCountry:"Добавить",    compare3:"Сравните до 3 стран",       history:"История",     noHistory:"Пока нет расчётов",      clearHistory:"Очистить", premium:"ПРО", premiumTitle:"Премиум доступ",    premiumSub:"Полная картина доходов",  premiumCta:"Подписка — $4.99/мес",    premiumF1:"PDF отчёты",           premiumF2:"История расчётов",    premiumF3:"Сравнение стран",       premiumF4:"30+ стран",        premiumF5:"Налоговые советы",   freeLabel:"Бесплатно",   proLabel:"Про",  secure:"Безопасная оплата через Stripe"  },
  uk: { flag:"🇺🇦", label:"Українська", gross:"Річний дохід (брутто)", country:"Країна",   platform:"Платформа", calculate:"Розрахувати", net:"Чистий дохід",    taxes:"Всього податків",platformFee:"Комісія",      effectiveRate:"Ефект. ставка", monthly:"На місяць",   weekly:"На тиждень",  daily:"На день",     rateFinder:"Підбір ставки", rateQ:"Бажаний чистий дохід?",    rateA:"Потрібно брати",     perHour:"на годину",  perMonth:"на місяць",  growth:"Зростання",      growthStart:"Початковий дохід",growthGoal:"Цільовий дохід",years:"років до цілі",    compare:"Порівняти країни",  addCountry:"Додати",      compare3:"Порівняйте до 3 країн",     history:"Історія",     noHistory:"Поки немає розрахунків",clearHistory:"Очистити", premium:"ПРО", premiumTitle:"Преміум доступ",    premiumSub:"Повна картина доходів",   premiumCta:"Підписка — $4.99/міс",    premiumF1:"PDF звіти",            premiumF2:"Історія розрахунків", premiumF3:"Порівняння країн",      premiumF4:"30+ країн",        premiumF5:"Податкові поради",   freeLabel:"Безкоштовно", proLabel:"Про",  secure:"Безпечна оплата через Stripe"    },
  de: { flag:"🇩🇪", label:"Deutsch",    gross:"Jahresbruttoeinkommen", country:"Land",     platform:"Plattform", calculate:"Berechnen",   net:"Nettoeinkommen",  taxes:"Steuern gesamt", platformFee:"Gebühr",       effectiveRate:"Effektiv",      monthly:"Monatlich",   weekly:"Wöchentlich", daily:"Täglich",     rateFinder:"Stundensatz",   rateQ:"Gewünschtes Netto?",       rateA:"Du musst verlangen", perHour:"pro Stunde", perMonth:"pro Monat",  growth:"Einkommenswachstum",growthStart:"Startgehalt",     growthGoal:"Zielgehalt",  years:"Jahre",            compare:"Länder vergleichen",addCountry:"Hinzufügen",  compare3:"Bis zu 3 Länder vergleichen",history:"Verlauf",     noHistory:"Noch keine Berechnungen",clearHistory:"Löschen",  premium:"PRO", premiumTitle:"Premium freischalten",premiumSub:"Das volle Bild",          premiumCta:"Upgrade — $4.99/Mo",      premiumF1:"PDF Berichte",         premiumF2:"Berechnungsverlauf",  premiumF3:"Ländervergleich",       premiumF4:"30+ Länder",       premiumF5:"Steuertipps",        freeLabel:"Kostenlos",   proLabel:"Pro",  secure:"Sichere Zahlung via Stripe"      },
  es: { flag:"🇪🇸", label:"Español",    gross:"Ingreso bruto anual",   country:"País",     platform:"Plataforma",calculate:"Calcular",    net:"Ingreso neto",    taxes:"Impuestos",      platformFee:"Comisión",     effectiveRate:"Tasa efectiva", monthly:"Mensual",     weekly:"Semanal",     daily:"Diario",      rateFinder:"Tarifa",        rateQ:"¿Neto deseado?",           rateA:"Debes cobrar",       perHour:"por hora",   perMonth:"por mes",    growth:"Crecimiento",    growthStart:"Ingreso inicial", growthGoal:"Meta",        years:"años",             compare:"Comparar países",   addCountry:"Agregar",     compare3:"Compara hasta 3 países",    history:"Historial",   noHistory:"Sin cálculos aún",       clearHistory:"Borrar",   premium:"PRO", premiumTitle:"Desbloquear Premium", premiumSub:"La imagen completa",      premiumCta:"Suscribirse — $4.99/mes", premiumF1:"Informes PDF",         premiumF2:"Historial",           premiumF3:"Comparar países",       premiumF4:"30+ países",       premiumF5:"Consejos fiscales",  freeLabel:"Gratis",      proLabel:"Pro",  secure:"Pago seguro via Stripe"          },
  fr: { flag:"🇫🇷", label:"Français",   gross:"Revenu brut annuel",    country:"Pays",     platform:"Plateforme",calculate:"Calculer",    net:"Revenu net",      taxes:"Impôts totaux",  platformFee:"Commission",   effectiveRate:"Taux effectif", monthly:"Mensuel",     weekly:"Hebdo",       daily:"Journalier",  rateFinder:"Tarif",         rateQ:"Net souhaité?",            rateA:"Vous devez facturer",perHour:"par heure",  perMonth:"par mois",   growth:"Croissance",     growthStart:"Revenu initial",  growthGoal:"Objectif",    years:"ans",              compare:"Comparer",          addCountry:"Ajouter",     compare3:"Comparez jusqu'à 3 pays",   history:"Historique",  noHistory:"Aucun calcul",           clearHistory:"Effacer",  premium:"PRO", premiumTitle:"Débloquer Premium",   premiumSub:"Vue complète",            premiumCta:"S'abonner — 4,99$/mois",  premiumF1:"Rapports PDF",         premiumF2:"Historique",          premiumF3:"Comparer pays",         premiumF4:"30+ pays",         premiumF5:"Conseils fiscaux",   freeLabel:"Gratuit",     proLabel:"Pro",  secure:"Paiement sécurisé via Stripe"    },
  pt: { flag:"🇵🇹", label:"Português",  gross:"Rendimento bruto anual",country:"País",     platform:"Plataforma",calculate:"Calcular",    net:"Rendimento líq.", taxes:"Impostos totais",platformFee:"Comissão",     effectiveRate:"Taxa efetiva",  monthly:"Mensal",      weekly:"Semanal",     daily:"Diário",      rateFinder:"Tarifa",        rateQ:"Líquido desejado?",        rateA:"Deve cobrar",        perHour:"por hora",   perMonth:"por mês",    growth:"Crescimento",    growthStart:"Rend. inicial",   growthGoal:"Meta",        years:"anos",             compare:"Comparar",          addCountry:"Adicionar",   compare3:"Compare até 3 países",      history:"Histórico",   noHistory:"Sem cálculos",           clearHistory:"Limpar",   premium:"PRO", premiumTitle:"Premium",             premiumSub:"Visão completa",          premiumCta:"Assinar — $4.99/mês",     premiumF1:"Relatórios PDF",       premiumF2:"Histórico",           premiumF3:"Comparar países",       premiumF4:"30+ países",       premiumF5:"Dicas fiscais",      freeLabel:"Grátis",      proLabel:"Pro",  secure:"Pagamento seguro via Stripe"     },
  nl: { flag:"🇳🇱", label:"Nederlands", gross:"Jaarlijks bruto inkomen",country:"Land",    platform:"Platform",  calculate:"Berekenen",   net:"Netto inkomen",   taxes:"Totale belasting",platformFee:"Kosten",       effectiveRate:"Effectief",     monthly:"Maandelijks", weekly:"Wekelijks",   daily:"Dagelijks",   rateFinder:"Uurtarief",     rateQ:"Gewenst netto?",           rateA:"Je moet vragen",     perHour:"per uur",    perMonth:"per maand",  growth:"Groei",          growthStart:"Startinkomen",    growthGoal:"Doel",        years:"jaar",             compare:"Vergelijken",       addCountry:"Toevoegen",   compare3:"Vergelijk tot 3 landen",    history:"Geschiedenis",noHistory:"Nog geen berekeningen",  clearHistory:"Wissen",   premium:"PRO", premiumTitle:"Premium ontgrendelen",premiumSub:"Het volledige beeld",      premiumCta:"Abonneren — $4.99/ma",    premiumF1:"PDF Rapporten",        premiumF2:"Geschiedenis",        premiumF3:"Landen vergelijken",    premiumF4:"30+ landen",       premiumF5:"Belastingtips",      freeLabel:"Gratis",      proLabel:"Pro",  secure:"Veilige betaling via Stripe"     },
  it: { flag:"🇮🇹", label:"Italiano",   gross:"Reddito lordo annuale", country:"Paese",    platform:"Piattaforma",calculate:"Calcola",     net:"Reddito netto",   taxes:"Tasse totali",   platformFee:"Commissione",  effectiveRate:"Aliquota eff.", monthly:"Mensile",     weekly:"Settimanale", daily:"Giornaliero", rateFinder:"Tariffa",       rateQ:"Netto desiderato?",        rateA:"Devi chiedere",      perHour:"all'ora",    perMonth:"al mese",    growth:"Crescita",       growthStart:"Reddito iniziale",growthGoal:"Obiettivo",   years:"anni",             compare:"Confronta",         addCountry:"Aggiungi",    compare3:"Confronta fino a 3 paesi",  history:"Cronologia",  noHistory:"Nessun calcolo",         clearHistory:"Cancella", premium:"PRO", premiumTitle:"Sblocca Premium",     premiumSub:"Il quadro completo",      premiumCta:"Abbonati — $4.99/mese",   premiumF1:"Report PDF",           premiumF2:"Cronologia",          premiumF3:"Confronta paesi",       premiumF4:"30+ paesi",        premiumF5:"Consigli fiscali",   freeLabel:"Gratis",      proLabel:"Pro",  secure:"Pagamento sicuro via Stripe"     },
};

const S = {
  card:  { background:"rgba(255,255,255,0.04)", borderRadius:16, padding:20, border:"1px solid rgba(255,255,255,0.07)", marginBottom:16 },
  label: { display:"block", fontSize:"0.75rem", fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:6, marginTop:14 },
  input: { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:"0.95rem", outline:"none", fontFamily:"inherit", boxSizing:"border-box" },
  btn:   { width:"100%", padding:13, background:"linear-gradient(135deg,#7c3aed,#2563eb)", border:"none", borderRadius:12, color:"#fff", fontSize:"0.95rem", fontWeight:800, cursor:"pointer", marginTop:16, fontFamily:"inherit" },
};

export default function TakeHomePro() {
  const [lang, setLang] = useState("ru");
  const [tab, setTab] = useState("calc");
  const [gross, setGross] = useState("");
  const [country, setCountry] = useState("ireland");
  const [platform, setPlatform] = useState("none");
  const [results, setResults] = useState(null);
  const [rain, setRain] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [history, setHistory] = useState([]);
  const [desiredNet, setDesiredNet] = useState("");
  const [rateCountry, setRateCountry] = useState("ireland");
  const [rateResult, setRateResult] = useState(null);
  const [growthStart, setGrowthStart] = useState("");
  const [growthGoal, setGrowthGoal] = useState("");
  const [growthRate, setGrowthRate] = useState(10);
  const [growthData, setGrowthData] = useState(null);
  const [compareCountries, setCompareCountries] = useState(["ireland","usa"]);
  const [compareGross, setCompareGross] = useState("");
  const [compareResults, setCompareResults] = useState(null);

  const t = LANGS[lang] || LANGS.ru;

  const calculate = useCallback(() => {
    const g = parseFloat(gross); if (!g || g <= 0) return;
    const c = COUNTRIES[country]; const p = PLATFORMS[platform];
    const fee = g * p.fee; const after = g - fee;
    const td = c.calc(after);
    const net = after - td.total;
    const r = { gross:g, net, taxes:td.total, platformFee:fee, effectiveRate:td.total/g, monthly:net/12, weekly:net/52, daily:net/260, flag:c.flag, country:c.name, symbol:c.symbol, platform:p.name };
    setResults(r); setRain(true); setTimeout(()=>setRain(false), 3000);
    setHistory(prev => [{...r, date:new Date().toLocaleDateString(), id:Date.now()}, ...prev].slice(0, 20));
  }, [gross, country, platform]);

  const calcRate = useCallback(() => {
    const desired = parseFloat(desiredNet); if (!desired) return;
    const c = COUNTRIES[rateCountry];
    let lo = desired, hi = desired * 5;
    for (let i = 0; i < 60; i++) { const mid = (lo+hi)/2; if (mid - c.calc(mid).total < desired) lo = mid; else hi = mid; }
    const needed = (lo+hi)/2;
    setRateResult({ gross:needed, hourly:needed/2080, monthly:needed/12, symbol:c.symbol });
  }, [desiredNet, rateCountry]);

  const calcGrowth = useCallback(() => {
    const s = parseFloat(growthStart), g = parseFloat(growthGoal);
    if (!s || !g || g <= s) return;
    const years = Math.log(g/s) / Math.log(1 + growthRate/100);
    const data = [];
    for (let y = 0; y <= Math.ceil(years); y++) data.push({ year:y, income:Math.round(s * Math.pow(1+growthRate/100, y)) });
    setGrowthData({ years:years.toFixed(1), data });
  }, [growthStart, growthGoal, growthRate]);

  const calcCompare = useCallback(() => {
    const g = parseFloat(compareGross); if (!g) return;
    setCompareResults(compareCountries.map(ck => {
      const c = COUNTRIES[ck]; const td = c.calc(g);
      return { key:ck, name:c.name, flag:c.flag, symbol:c.symbol, gross:g, taxes:td.total, net:g-td.total, rate:td.total/g };
    }));
  }, [compareGross, compareCountries]);

  const rainDrops = rain ? Array.from({length:15}, (_,i) => (
    <div key={i} style={{position:"fixed",top:-30,left:`${Math.random()*100}%`,fontSize:"1.4rem",animation:`moneyFall 2.5s ${Math.random()*1.5}s ease-in forwards`,pointerEvents:"none",zIndex:9999}}>💰</div>
  )) : null;

  const tabs = [
    {id:"calc",   icon:"🧮", label:t.calculate},
    {id:"rate",   icon:"🎯", label:t.rateFinder},
    {id:"growth", icon:"📈", label:t.growth},
    {id:"compare",icon:"🌍", label:t.compare},
    {id:"history",icon:"📋", label:t.history},
  ];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a2e0a 0%,#0f3d0f 40%,#0a1f0a 100%)",color:"#e2e8f0",fontFamily:"'DM Sans','Segoe UI',sans-serif",position:"relative"}}>
      {rainDrops}

      {/* ХЕДЕР */}
      <header style={{padding:"20px 20px 0",display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:10}}>
        <div>
          <h1 style={{margin:0,fontSize:"1.6rem",fontWeight:900,background:"linear-gradient(135deg,#a78bfa,#60a5fa,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
            ⚡ TakeHome Pro
          </h1>
          <p style={{margin:"2px 0 0",fontSize:"0.8rem",color:"rgba(255,255,255,0.4)"}}>{t.gross}</p>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <button onClick={()=>setShowLang(!showLang)} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"6px 10px",color:"#fff",fontSize:"0.85rem",cursor:"pointer"}}>
              {LANGS[lang].flag}
            </button>
            {showLang && (
              <div style={{position:"absolute",top:"110%",right:0,background:"#1e1b3a",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:6,zIndex:100,display:"flex",flexWrap:"wrap",gap:4,width:190}}>
                {Object.entries(LANGS).map(([k,v]) => (
                  <button key={k} onClick={()=>{setLang(k);setShowLang(false);}}
                    style={{background:lang===k?"rgba(139,92,246,0.3)":"transparent",border:"none",borderRadius:8,padding:"5px 8px",color:"#fff",fontSize:"0.8rem",cursor:"pointer",flex:"1 0 45%"}}>
                    {v.flag} {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={()=>setShowPremium(true)} style={{background:"linear-gradient(135deg,#7c3aed,#2563eb)",border:"none",borderRadius:10,padding:"6px 14px",color:"#fff",fontSize:"0.78rem",fontWeight:700,cursor:"pointer"}}>
            ⚡ {t.premium}
          </button>
        </div>
      </header>

      {/* ТАБЫ */}
      <nav style={{display:"flex",gap:4,padding:"16px 20px 0",overflowX:"auto",position:"relative",zIndex:10}}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={()=>setTab(tb.id)}
            style={{background:tab===tb.id?"rgba(139,92,246,0.25)":"rgba(255,255,255,0.04)",border:tab===tb.id?"1px solid rgba(139,92,246,0.5)":"1px solid rgba(255,255,255,0.06)",borderRadius:10,padding:"8px 12px",color:tab===tb.id?"#c4b5fd":"rgba(255,255,255,0.5)",fontSize:"0.75rem",fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {tb.icon} {tb.label}
          </button>
        ))}
      </nav>

      {/* КОНТЕНТ */}
      <main style={{padding:"16px 20px 100px",maxWidth:600,margin:"0 auto",position:"relative",zIndex:10}}>

        {/* КАЛЬКУЛЯТОР */}
        {tab==="calc" && <div>
          <div style={S.card}>
            <label style={S.label}>{t.country}</label>
            <select value={country} onChange={e=>setCountry(e.target.value)} style={S.input}>
              {Object.entries(COUNTRIES).map(([k,v]) => <option key={k} value={k}>{v.flag} {v.name}</option>)}
            </select>
            <label style={S.label}>{t.gross}</label>
            <input type="number" value={gross} onChange={e=>setGross(e.target.value)} placeholder="50000" style={S.input}/>
            <label style={S.label}>{t.platform}</label>
            <select value={platform} onChange={e=>setPlatform(e.target.value)} style={S.input}>
              {Object.entries(PLATFORMS).map(([k,v]) => <option key={k} value={k}>{v.name}{v.fee?` (${v.fee*100}%)`:"  ✓"}</option>)}
            </select>
            <button onClick={calculate} style={S.btn}>{t.calculate} 🚀</button>
          </div>

          {results && <div style={S.card}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",marginBottom:4}}>{results.flag} {results.country} • {results.platform}</div>
              <div style={{fontSize:"2.2rem",fontWeight:900,background:"linear-gradient(135deg,#34d399,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                {fmt(results.net, results.symbol)}
              </div>
              <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)"}}>{t.net}</div>
            </div>

            {/* Визуальная полоса net / taxes / fee */}
            <div style={{borderRadius:8,height:28,overflow:"hidden",marginBottom:12,display:"flex"}}>
              <div style={{width:`${(results.net/results.gross)*100}%`,background:"linear-gradient(90deg,#34d399,#60a5fa)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",fontWeight:700,color:"#0a0a1a"}}>
                {pct(results.net/results.gross)}
              </div>
              <div style={{width:`${(results.taxes/results.gross)*100}%`,background:"rgba(239,68,68,0.6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",fontWeight:700}}>
                {pct(results.taxes/results.gross)}
              </div>
              {results.platformFee>0 && <div style={{flex:1,background:"rgba(245,158,11,0.5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",fontWeight:700}}>
                {pct(results.platformFee/results.gross)}
              </div>}
            </div>
            <div style={{display:"flex",gap:12,fontSize:"0.7rem",color:"rgba(255,255,255,0.5)",marginBottom:16}}>
              <span>🟢 {t.net}</span><span>🔴 {t.taxes}</span>{results.platformFee>0&&<span>🟡 {t.platformFee}</span>}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[[t.taxes,fmt(results.taxes,results.symbol),"#ef4444"],[t.platformFee,fmt(results.platformFee,results.symbol),"#f59e0b"],[t.monthly,fmt(results.monthly,results.symbol),"#60a5fa"],[t.weekly,fmt(results.weekly,results.symbol),"#a78bfa"],[t.daily,fmt(results.daily,results.symbol),"#34d399"],[t.effectiveRate,pct(results.effectiveRate),"#f472b6"]].map(([lbl,val,clr],i)=>(
                <div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px",border:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)",marginBottom:2}}>{lbl}</div>
                  <div style={{fontSize:"1rem",fontWeight:700,color:clr}}>{val}</div>
                </div>
              ))}
            </div>
          </div>}
        </div>}

        {/* ПОДБОР СТАВКИ */}
        {tab==="rate" && <div>
          <div style={S.card}>
            <label style={S.label}>{t.rateQ}</label>
            <input type="number" value={desiredNet} onChange={e=>setDesiredNet(e.target.value)} placeholder="40000" style={S.input}/>
            <label style={S.label}>{t.country}</label>
            <select value={rateCountry} onChange={e=>setRateCountry(e.target.value)} style={S.input}>
              {Object.entries(COUNTRIES).map(([k,v]) => <option key={k} value={k}>{v.flag} {v.name}</option>)}
            </select>
            <button onClick={calcRate} style={S.btn}>🎯 {t.calculate}</button>
          </div>
          {rateResult && <div style={S.card}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>{t.rateA}</div>
              <div style={{fontSize:"2rem",fontWeight:900,color:"#f59e0b",margin:"8px 0"}}>{fmt(rateResult.gross,rateResult.symbol)}/yr</div>
              <div style={{display:"flex",justifyContent:"center",gap:24,marginTop:12}}>
                <div>
                  <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)"}}>{t.perHour}</div>
                  <div style={{fontSize:"1.2rem",fontWeight:700,color:"#60a5fa"}}>{fmt(rateResult.hourly,rateResult.symbol)}</div>
                </div>
                <div>
                  <div style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.4)"}}>{t.perMonth}</div>
                  <div style={{fontSize:"1.2rem",fontWeight:700,color:"#a78bfa"}}>{fmt(rateResult.monthly,rateResult.symbol)}</div>
                </div>
              </div>
            </div>
          </div>}
        </div>}

        {/* РОСТ ДОХОДА */}
        {tab==="growth" && <div>
          <div style={S.card}>
            <label style={S.label}>{t.growthStart}</label>
            <input type="number" value={growthStart} onChange={e=>setGrowthStart(e.target.value)} placeholder="30000" style={S.input}/>
            <label style={S.label}>{t.growthGoal}</label>
            <input type="number" value={growthGoal} onChange={e=>setGrowthGoal(e.target.value)} placeholder="100000" style={S.input}/>
            <label style={S.label}>📈 {growthRate}% / год</label>
            <input type="range" min={5} max={50} value={growthRate} onChange={e=>setGrowthRate(+e.target.value)} style={{width:"100%",accentColor:"#7c3aed",marginTop:6}}/>
            <button onClick={calcGrowth} style={S.btn}>📈 {t.calculate}</button>
          </div>
          {growthData && <div style={S.card}>
            <div style={{textAlign:"center",marginBottom:16}}>
              <div style={{fontSize:"2rem",fontWeight:900,color:"#34d399"}}>{growthData.years}</div>
              <div style={{fontSize:"0.8rem",color:"rgba(255,255,255,0.4)"}}>{t.years}</div>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",gap:3,height:100}}>
              {growthData.data.map((d,i)=>{
                const maxI = growthData.data[growthData.data.length-1].income;
                return <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:"100%",height:`${(d.income/maxI)*100}%`,background:"linear-gradient(180deg,#7c3aed,#2563eb)",borderRadius:"4px 4px 0 0",minHeight:4}}/>
                  <div style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.3)",marginTop:2}}>Y{d.year}</div>
                </div>;
              })}
            </div>
          </div>}
        </div>}

        {/* СРАВНЕНИЕ СТРАН */}
        {tab==="compare" && <div>
          <div style={S.card}>
            <label style={S.label}>{t.gross}</label>
            <input type="number" value={compareGross} onChange={e=>setCompareGross(e.target.value)} placeholder="60000" style={S.input}/>
            <label style={S.label}>{t.compare3}</label>
            {compareCountries.map((ck,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:8}}>
                <select value={ck} onChange={e=>{const n=[...compareCountries];n[i]=e.target.value;setCompareCountries(n);}} style={{...S.input,marginBottom:0,flex:1}}>
                  {Object.entries(COUNTRIES).map(([k,v])=><option key={k} value={k}>{v.flag} {v.name}</option>)}
                </select>
                {compareCountries.length>2 && <button onClick={()=>setCompareCountries(compareCountries.filter((_,j)=>j!==i))} style={{background:"rgba(239,68,68,0.2)",border:"none",borderRadius:8,padding:"0 10px",color:"#ef4444",cursor:"pointer"}}>✕</button>}
              </div>
            ))}
            {compareCountries.length<3 && <button onClick={()=>setCompareCountries([...compareCountries,"uk"])} style={{...S.btn,background:"rgba(255,255,255,0.06)",color:"#a78bfa",marginBottom:8,marginTop:8,border:"1px solid rgba(139,92,246,0.3)"}}>+ {t.addCountry}</button>}
            <button onClick={calcCompare} style={S.btn}>🌍 {t.compare}</button>
          </div>
          {compareResults && compareResults.map((r,i)=>(
            <div key={i} style={{...S.card,border:`1px solid ${i===0?"rgba(52,211,153,0.4)":"rgba(255,255,255,0.07)"}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:"1rem",fontWeight:700}}>{r.flag} {r.name}</span>
                <span style={{fontSize:"0.75rem",color:"rgba(255,255,255,0.4)"}}>{t.effectiveRate}: {pct(r.rate)}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:10}}>
                <div>
                  <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)"}}>{t.net}</div>
                  <div style={{fontSize:"1.3rem",fontWeight:800,color:"#34d399"}}>{fmt(r.net,r.symbol)}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"0.65rem",color:"rgba(255,255,255,0.4)"}}>{t.taxes}</div>
                  <div style={{fontSize:"1.1rem",fontWeight:700,color:"#ef4444"}}>{fmt(r.taxes,r.symbol)}</div>
                </div>
              </div>
              <div style={{background:"rgba(255,255,255,0.05)",borderRadius:6,height:8,marginTop:10,overflow:"hidden"}}>
                <div style={{width:`${(r.net/r.gross)*100}%`,height:"100%",background:"linear-gradient(90deg,#34d399,#60a5fa)",borderRadius:6}}/>
              </div>
            </div>
          ))}
        </div>}

        {/* ИСТОРИЯ */}
        {tab==="history" && <div>
          {history.length===0
            ? <div style={{...S.card,textAlign:"center",color:"rgba(255,255,255,0.3)",padding:40}}><div style={{fontSize:"2rem",marginBottom:8}}>📋</div>{t.noHistory}</div>
            : <>
              <button onClick={()=>setHistory([])} style={{...S.btn,background:"rgba(239,68,68,0.15)",color:"#ef4444",border:"1px solid rgba(239,68,68,0.2)"}}>🗑 {t.clearHistory}</button>
              {history.map((h)=>(
                <div key={h.id} style={S.card}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.75rem",color:"rgba(255,255,255,0.4)",marginBottom:6}}>
                    <span>{h.flag} {h.country} • {h.platform}</span><span>{h.date}</span>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                    <span style={{color:"rgba(255,255,255,0.5)",fontSize:"0.85rem"}}>{fmt(h.gross,h.symbol)}</span>
                    <span style={{fontSize:"0.7rem",color:"rgba(255,255,255,0.3)"}}>→</span>
                    <span style={{fontSize:"1.2rem",fontWeight:800,color:"#34d399"}}>{fmt(h.net,h.symbol)}</span>
                  </div>
                </div>
              ))}
            </>
          }
        </div>}

      </main>

      {/* PREMIUM МОДАЛ */}
      {showPremium && (
        <div onClick={()=>setShowPremium(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(8px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"linear-gradient(135deg,#1e1b3a,#0f1729)",borderRadius:20,padding:28,maxWidth:400,width:"100%",border:"1px solid rgba(139,92,246,0.3)"}}>
            <div style={{textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:"2.5rem"}}>⚡</div>
              <h2 style={{margin:"8px 0 0",fontSize:"1.4rem",fontWeight:900,background:"linear-gradient(135deg,#a78bfa,#60a5fa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.premiumTitle}</h2>
              <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.85rem",margin:"4px 0 0"}}>{t.premiumSub}</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:"0.7rem",fontWeight:700,color:"rgba(255,255,255,0.4)",marginBottom:6,textTransform:"uppercase"}}>{t.freeLabel}</div>
                <div style={{fontSize:"1.2rem",fontWeight:900,marginBottom:12}}>$0</div>
                {["✅ "+t.calculate,"✅ "+t.rateFinder,"✅ 12 "+t.country,"❌ "+t.premiumF1,"❌ "+t.premiumF2,"❌ "+t.premiumF5].map((f,i)=>(
                  <div key={i} style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.5)",marginBottom:5}}>{f}</div>
                ))}
              </div>
              <div style={{background:"linear-gradient(135deg,rgba(139,92,246,0.2),rgba(59,130,246,0.15))",borderRadius:14,padding:16,border:"1px solid rgba(139,92,246,0.4)",position:"relative"}}>
                <div style={{position:"absolute",top:-8,right:10,background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",fontSize:"0.6rem",fontWeight:900,padding:"2px 8px",borderRadius:20}}>BEST</div>
                <div style={{fontSize:"0.7rem",fontWeight:700,color:"rgba(255,255,255,0.4)",marginBottom:6,textTransform:"uppercase"}}>{t.proLabel}</div>
                <div style={{fontSize:"1.2rem",fontWeight:900,marginBottom:12}}>$4.99/mo</div>
                {[t.premiumF1,t.premiumF2,t.premiumF3,t.premiumF4,t.premiumF5].map((f,i)=>(
                  <div key={i} style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.7)",marginBottom:5}}>✅ {f}</div>
                ))}
              </div>
            </div>
            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{display:"block",width:"100%",padding:14,background:"linear-gradient(135deg,#7c3aed,#2563eb)",borderRadius:12,color:"#fff",fontSize:"1rem",fontWeight:800,textAlign:"center",textDecoration:"none",boxSizing:"border-box"}}>
              {t.premiumCta}
            </a>
            <p style={{textAlign:"center",fontSize:"0.7rem",color:"rgba(255,255,255,0.25)",marginTop:10}}>🔒 {t.secure}</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes moneyFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(360deg)}}
        *{box-sizing:border-box}
        input[type=number]{-moz-appearance:textfield}
        input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.3);border-radius:4px}
      `}</style>
    </div>
  );
}
