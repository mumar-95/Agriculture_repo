(() => {
  "use strict";

  const LANGS = ["en", "hi", "te"];

  const UI = {
    en: {
      title: "GreenHarvest Assistant",
      subtitle: "Ask about our products",
      placeholder: "Ask about irrigation, seeds, organic…",
      send: "Send",
      open: "Chat with us",
      close: "Close chat",
      langLabel: "Language",
      welcome:
        "Namaste! I can briefly explain GreenHarvest products in English, Hindi, or Telugu. Try a suggestion below or type your question.",
      fallback:
        "I can help with Organic Farming, Seeds & Fertilizers, Smart Irrigation, Agricultural Consultancy, Smart Farming, Water Management, or Soil Health. Ask about one of these, or visit the Products / Solutions pages.",
      chips: ["Organic", "Seeds", "Irrigation", "Consultancy", "Water", "Contact"],
    },
    hi: {
      title: "ग्रीनहार्वेस्ट सहायक",
      subtitle: "हमारे उत्पादों के बारे में पूछें",
      placeholder: "सिंचाई, बीज, जैविक खेती के बारे में पूछें…",
      send: "भेजें",
      open: "हमसे बात करें",
      close: "चैट बंद करें",
      langLabel: "भाषा",
      welcome:
        "नमस्ते! मैं अंग्रेज़ी, हिंदी या तेलुगु में GreenHarvest उत्पादों की संक्षिप्त जानकारी दे सकता/सकती हूँ। नीचे सुझाव चुनें या प्रश्न लिखें।",
      fallback:
        "मैं जैविक खेती, बीज व उर्वरक, स्मार्ट सिंचाई, कृषि परामर्श, स्मार्ट फार्मिंग, जल प्रबंधन या मिट्टी स्वास्थ्य में मदद कर सकता/सकती हूँ। इनमें से किसी के बारे में पूछें।",
      chips: ["जैविक", "बीज", "सिंचाई", "परामर्श", "जल", "संपर्क"],
    },
    te: {
      title: "గ్రీన్‌హార్వెస్ట్ సహాయకుడు",
      subtitle: "మా ఉత్పత్తుల గురించి అడగండి",
      placeholder: "నీటిపారుదల, విత్తనాలు, సేంద్రీయ… గురించి అడగండి",
      send: "పంపండి",
      open: "మాతో మాట్లాడండి",
      close: "చాట్ మూసివేయి",
      langLabel: "భాష",
      welcome:
        "నమస్కారం! నేను ఇంగ్లీష్, హిందీ లేదా తెలుగులో GreenHarvest ఉత్పత్తుల గురించి సంక్షిప్తంగా చెప్పగలను. క్రింది సూచనలు ఎంచుకోండి లేదా ప్రశ్న రాయండి.",
      fallback:
        "నేను సేంద్రీయ వ్యవసాయం, విత్తనాలు & ఎరువులు, స్మార్ట్ నీటిపారుదల, వ్యవసాయ సలహా, స్మార్ట్ ఫార్మింగ్, నీటి నిర్వహణ లేదా నేల ఆరోగ్యం గురించి సహాయం చేయగలను.",
      chips: ["సేంద్రీయ", "విత్తనాలు", "నీటిపారుదల", "సలహా", "నీరు", "సంప్రదించండి"],
    },
  };

  const ANSWERS = {
    organic: {
      en: "Organic Farming Solutions: chemical-free growing systems, composting guidance, and regenerative practices that restore soil life and crop quality. Includes soil biology assessment, natural pest playbooks, and certification-ready documentation. Open Products → Organic for details.",
      hi: "जैविक खेती समाधान: रसायन-मुक्त खेती, खाद/कंपोस्ट मार्गदर्शन और मिट्टी की सेहत सुधारने वाली पद्धतियाँ। मिट्टी जीवविज्ञान जाँच, प्राकृतिक कीट नियंत्रण और प्रमाणन दस्तावेज़ सहायता शामिल है। विवरण के लिए Products → Organic देखें।",
      te: "సేంద్రీయ వ్యవసాయ పరిష్కారాలు: రసాయన రహిత పంటలు, కంపోస్ట్ మార్గదర్శకత్వం, నేల జీవావరణాన్ని పునరుద్ధరించే పద్ధతులు. నేల జీవశాస్త్ర అంచనా, సహజ పురుగుల నివారణ, సర్టిఫికేషన్ డాక్యుమెంటేషన్ ఉన్నాయి. వివరాలకు Products → Organic చూడండి.",
    },
    seeds: {
      en: "Seeds & Fertilizers: high-germination seed varieties and nutrient programs matched to local climate and soil. We help with climate-matched catalogs, balanced NPK plans, and seasonal ordering guidance.",
      hi: "बीज व उर्वरक: उच्च अंकुरण वाले बीज और स्थानीय जलवायु/मिट्टी के अनुसार पोषक तत्व योजनाएँ। जलवायु-अनुकूल कैटलॉग, संतुलित NPK योजना और मौसमी ऑर्डर मार्गदर्शन मिलता है।",
      te: "విత్తనాలు & ఎరువులు: అధిక మొలకెత్తే విత్తనాలు మరియు స్థానిక వాతావరణం/నేలకు సరిపోయే పోషకాల ప్రణాళికలు. క్యాటలాగ్, సమతుల్య NPK ప్రణాళికలు, సీజనల్ ఆర్డరింగ్ మార్గదర్శకత్వం అందుబాటులో ఉన్నాయి.",
    },
    irrigation: {
      en: "Smart Irrigation Systems: precision watering guided by soil moisture and weather data—so every drop works harder. Includes sensor kits, weather-linked schedules, and zone mapping for uneven fields. Also see Solutions → Water Management.",
      hi: "स्मार्ट सिंचाई: मिट्टी की नमी और मौसम डेटा से सटीक पानी देना—हर बूँद का बेहतर उपयोग। सेंसर किट, मौसम-आधारित शेड्यूल और असमान खेतों के लिए जोन मैपिंग शामिल है। Solutions → Water Management भी देखें।",
      te: "స్మార్ట్ నీటిపారుదల: నేల తేమ మరియు వాతావరణ డేటాతో ఖచ్చితమైన నీరు—ప్రతి చుక్క ఉపయోగపడేలా. సెన్సార్ కిట్లు, వాతావరణ షెడ్యూల్స్, అసమాన పొలాలకు జోన్ మ్యాపింగ్ ఉన్నాయి. Solutions → Water Management కూడా చూడండి.",
    },
    consultancy: {
      en: "Agricultural Consultancy: one-on-one agronomist guidance on crop planning, pest management, yield optimization, and market readiness—on-farm or remote sessions.",
      hi: "कृषि परामर्श: फसल योजना, कीट प्रबंधन, उपज सुधार और बाज़ार तैयारी पर कृषि विशेषज्ञों से व्यक्तिगत मार्गदर्शन—खेत पर या ऑनलाइन।",
      te: "వ్యవసాయ సలహా: పంట ప్రణాళిక, పురుగుల నిర్వహణ, దిగుబడి మెరుగుదల, మార్కెట్ సిద్ధతపై వ్యవసాయ నిపుణుల వ్యక్తిగత మార్గదర్శకత్వం—పొలంలో లేదా రిమోట్‌గా.",
    },
    smart: {
      en: "Smart Farming: sensors, drones, and field analytics for real-time crop health visibility—faster decisions on planting, fertilizing, and harvesting.",
      hi: "स्मार्ट फार्मिंग: सेंसर, ड्रोन और फील्ड एनालिटिक्स से फसल स्वास्थ्य की रियल-टाइम जानकारी—बुवाई, खाद और कटाई के बेहतर निर्णय।",
      te: "స్మార్ట్ ఫార్మింగ్: సెన్సార్లు, డ్రోన్లు, ఫీల్డ్ అనలిటిక్స్‌తో పంట ఆరోగ్యం రియల్-టైమ్‌లో—నాటడం, ఎరువులు, కోతలో వేగవంతమైన నిర్ణయాలు.",
    },
    water: {
      en: "Water Management: intelligent scheduling and moisture tracking so crops get water when and where they need it—lower cost, better resilience in dry spells. Pair with Smart Irrigation products.",
      hi: "जल प्रबंधन: स्मार्ट शेड्यूल और नमी ट्रैकिंग से सही समय पर सही जगह पानी—खर्च कम, सूखे में बेहतर सहनशीलता। Smart Irrigation उत्पादों के साथ जोड़ें।",
      te: "నీటి నిర్వహణ: తెలివైన షెడ్యూలింగ్ మరియు తేమ ట్రాకింగ్‌తో అవసరమైనప్పుడు నీరు—ఖర్చు తగ్గి, కరువులో మెరుగైన స్థిరత్వం. Smart Irrigation ఉత్పత్తులతో కలపండి.",
    },
    soil: {
      en: "Soil Health Monitoring: continuous insights into nutrients, pH, and organic matter to feed the soil that feeds your crops—less chemical overuse, long-term fertility.",
      hi: "मिट्टी स्वास्थ्य निगरानी: पोषक तत्व, pH और कार्बनिक पदार्थ की निरंतर जानकारी—मिट्टी को स्वस्थ रखकर फसल मजबूत, रसायनों का कम उपयोग।",
      te: "నేల ఆరోగ్య పర్యవేక్షణ: పోషకాలు, pH, సేంద్రీయ పదార్థాల అంతర్దృష్టి—నేలను పోషించి పంటను బలోపేతం చేయడం, రసాయనాల అతి వినియోగం తగ్గడం.",
    },
    contact: {
      en: "Contact GreenHarvest in Hyderabad (TG 500034). Phone +91 (970) 586-4681 · Email umar@greenharvest.ag · Hours Mon–Fri 8:00 AM–6:00 PM. Open the Contact page to send a message.",
      hi: "संपर्क: हैदराबाद (TG 500034)। फोन +91 (970) 586-4681 · ईमेल umar@greenharvest.ag · समय सोम–शुक्र 8:00 AM–6:00 PM। संदेश के लिए Contact पेज खोलें।",
      te: "సంప్రదించండి: హైదరాబాద్ (TG 500034). ఫోన్ +91 (970) 586-4681 · ఇమెయిల్ umar@greenharvest.ag · సమయం సోమ–శుక్ర 8:00 AM–6:00 PM. సందేశం కోసం Contact పేజీ తెరవండి.",
    },
    products: {
      en: "Our main offerings: 1) Organic Farming Solutions 2) Seeds & Fertilizers 3) Smart Irrigation Systems 4) Agricultural Consultancy—plus Solutions for Smart Farming, Water Management, and Soil Health.",
      hi: "मुख्य उत्पाद/सेवाएँ: 1) जैविक खेती 2) बीज व उर्वरक 3) स्मार्ट सिंचाई 4) कृषि परामर्श—साथ में स्मार्ट फार्मिंग, जल प्रबंधन और मिट्टी स्वास्थ्य समाधान।",
      te: "ముఖ్య ఉత్పత్తులు/సేవలు: 1) సేంద్రీయ వ్యవసాయం 2) విత్తనాలు & ఎరువులు 3) స్మార్ట్ నీటిపారుదల 4) వ్యవసాయ సలహా—అలాగే స్మార్ట్ ఫార్మింగ్, నీటి నిర్వహణ, నేల ఆరోగ్య పరిష్కారాలు.",
    },
    hello: {
      en: "Hello! Ask me about any GreenHarvest product or solution. You can switch language anytime using the buttons above.",
      hi: "नमस्ते! किसी भी GreenHarvest उत्पाद या समाधान के बारे में पूछें। ऊपर दिए भाषा बटन से भाषा बदल सकते हैं।",
      te: "నమస్కారం! ఏ GreenHarvest ఉత్పత్తి లేదా పరిష్కారం గురించైనా అడగండి. పైన ఉన్న భాష బటన్లతో ఎప్పుడైనా మార్చవచ్చు.",
    },
    videos: {
      en: "Watch harvesting videos on our Videos page—combine harvesting, field demos, and related farming footage to see modern harvest practices.",
      hi: "हमारे Videos पेज पर कटाई के वीडियो देखें—कंबाइन हार्वेस्टिंग और खेत डेमो से आधुनिक कटाई समझें।",
      te: "మా Videos పేజీలో కోత వీడియోలు చూడండి—కంబైన్ హార్వెస్టింగ్ మరియు ఫీల్డ్ డెమోలతో ఆధునిక కోత పద్ధతులు తెలుసుకోండి.",
    },
  };

  const TOPIC_RULES = [
    { key: "hello", patterns: [/^(hi|hello|hey|namaste|namaskar|నమస్కార|नमस्ते)\b/i] },
    { key: "organic", patterns: [/organic|जैविक|సేంద్రీయ|compost|regen/i] },
    { key: "seeds", patterns: [/seed|fertiliz|बीज|उर्वर|విత్తన|ఎరువు|npk/i] },
    { key: "irrigation", patterns: [/irrigat|सिंचाई|నీటిపారుదల|drip|sensor kit/i] },
    { key: "consultancy", patterns: [/consult|advisor|परामर्श|సలహా|agronom/i] },
    { key: "smart", patterns: [/smart farm|drone|sensor|स्मार्ट फार्म|స్మార్ట్ ఫార్మ/i] },
    { key: "water", patterns: [/water|जल|నీరు|moisture|सूखा|కరువు/i] },
    { key: "soil", patterns: [/soil|मिट्टी|నేల|ph|nutrient/i] },
    { key: "contact", patterns: [/contact|phone|email|संपर्क|సంప్రద|call|hyderabad/i] },
    { key: "videos", patterns: [/video|harvest|कटाई|కోత|combine/i] },
    { key: "products", patterns: [/product|service|offer|उत्पाद|ఉత్పత్తి|what do you|services/i] },
  ];

  const CHIP_MAP = {
    en: { Organic: "organic", Seeds: "seeds", Irrigation: "irrigation", Consultancy: "consultancy", Water: "water", Contact: "contact" },
    hi: { जैविक: "organic", बीज: "seeds", सिंचाई: "irrigation", परामर्श: "consultancy", जल: "water", संपर्क: "contact" },
    te: { సేంద్రీయ: "organic", విత్తనాలు: "seeds", నీటిపారుదల: "irrigation", సలహా: "consultancy", నీరు: "water", సంప్రదించండి: "contact" },
  };

  let lang = localStorage.getItem("gh-chat-lang") || "en";
  if (!LANGS.includes(lang)) lang = "en";

  const root = document.createElement("div");
  root.className = "gh-chat";
  root.innerHTML = `
    <button type="button" class="gh-chat__launcher" aria-expanded="false" aria-controls="gh-chat-panel">
      <span class="gh-chat__launcher-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5H5l-3 3V12A8.5 8.5 0 1 1 21 12z"/></svg>
      </span>
      <span class="gh-chat__launcher-text"></span>
    </button>
    <section class="gh-chat__panel" id="gh-chat-panel" hidden role="dialog" aria-label="Product assistant">
      <header class="gh-chat__header">
        <div>
          <p class="gh-chat__title"></p>
          <p class="gh-chat__subtitle"></p>
        </div>
        <button type="button" class="gh-chat__close" aria-label="Close">&times;</button>
      </header>
      <div class="gh-chat__langs" role="group"></div>
      <div class="gh-chat__messages" aria-live="polite"></div>
      <div class="gh-chat__chips"></div>
      <form class="gh-chat__form">
        <label class="visually-hidden" for="gh-chat-input">Message</label>
        <input id="gh-chat-input" type="text" autocomplete="off" />
        <button type="submit" class="gh-chat__send"></button>
      </form>
    </section>
  `;
  document.body.appendChild(root);

  const launcher = root.querySelector(".gh-chat__launcher");
  const panel = root.querySelector(".gh-chat__panel");
  const closeBtn = root.querySelector(".gh-chat__close");
  const messages = root.querySelector(".gh-chat__messages");
  const chipsEl = root.querySelector(".gh-chat__chips");
  const langsEl = root.querySelector(".gh-chat__langs");
  const form = root.querySelector(".gh-chat__form");
  const input = root.querySelector("#gh-chat-input");
  const sendBtn = root.querySelector(".gh-chat__send");
  const titleEl = root.querySelector(".gh-chat__title");
  const subtitleEl = root.querySelector(".gh-chat__subtitle");
  const launcherText = root.querySelector(".gh-chat__launcher-text");

  const addBubble = (text, who) => {
    const div = document.createElement("div");
    div.className = `gh-chat__bubble gh-chat__bubble--${who}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };

  const replyFor = (raw) => {
    const text = String(raw || "").trim();
    if (!text) return UI[lang].fallback;

    const chipKey = CHIP_MAP[lang][text];
    if (chipKey && ANSWERS[chipKey]) return ANSWERS[chipKey][lang];

    for (const rule of TOPIC_RULES) {
      if (rule.patterns.some((re) => re.test(text))) {
        return ANSWERS[rule.key][lang];
      }
    }
    return UI[lang].fallback;
  };

  const renderChips = () => {
    chipsEl.innerHTML = "";
    UI[lang].chips.forEach((label) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gh-chat__chip";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        addBubble(label, "user");
        window.setTimeout(() => addBubble(replyFor(label), "bot"), 180);
      });
      chipsEl.appendChild(btn);
    });
  };

  const renderLangs = () => {
    langsEl.innerHTML = "";
    const label = document.createElement("span");
    label.className = "gh-chat__langs-label";
    label.textContent = UI[lang].langLabel;
    langsEl.appendChild(label);

    [
      { id: "en", name: "English" },
      { id: "hi", name: "हिंदी" },
      { id: "te", name: "తెలుగు" },
    ].forEach(({ id, name }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gh-chat__lang" + (id === lang ? " is-active" : "");
      btn.textContent = name;
      btn.setAttribute("aria-pressed", id === lang ? "true" : "false");
      btn.addEventListener("click", () => setLang(id));
      langsEl.appendChild(btn);
    });
  };

  const applyUI = () => {
    const t = UI[lang];
    titleEl.textContent = t.title;
    subtitleEl.textContent = t.subtitle;
    input.placeholder = t.placeholder;
    sendBtn.textContent = t.send;
    launcherText.textContent = t.open;
    launcher.setAttribute("aria-label", t.open);
    closeBtn.setAttribute("aria-label", t.close);
    renderLangs();
    renderChips();
  };

  const setLang = (next) => {
    lang = next;
    localStorage.setItem("gh-chat-lang", lang);
    applyUI();
    if (!panel.hidden) {
      messages.innerHTML = "";
      addBubble(UI[lang].welcome, "bot");
    }
  };

  const openPanel = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    root.classList.add("is-open");
    messages.innerHTML = "";
    addBubble(UI[lang].welcome, "bot");
    input.focus();
  };

  const closePanel = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    root.classList.remove("is-open");
    messages.innerHTML = "";
  };

  launcher.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });
  closeBtn.addEventListener("click", closePanel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    addBubble(value, "user");
    input.value = "";
    window.setTimeout(() => addBubble(replyFor(value), "bot"), 220);
  });

  applyUI();
})();
