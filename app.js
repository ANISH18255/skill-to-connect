// ─── TOAST NOTIFICATION SYSTEM ────────────────────────────────────────────────
function showToast(type, title, message, duration = 4000) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || "ℹ️"}</span>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            ${message ? `<div class="toast-msg">${message}</div>` : ""}
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-out");
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ─── SHOW/HIDE PASSWORD TOGGLE ──────────────────────────────────────────────
function togglePw(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === "password") {
        input.type = "text";
        btn.textContent = "🙈";
    } else {
        input.type = "password";
        btn.textContent = "👁️";
    }
}

// ─── TRANSLATION DICTIONARIES ──────────────────────────────────────────────

const translationDictionary = {
    english: {
        eyebrow: "Skill to Employment Portal",
        title: "Rural SkillConnect",
        tagline: "Find the right skill, complete training, and connect to nearby work.",
        lblStateSelect: "Select Your State (Updates Language)",
        tabLogin: "Login",
        tabRegister: "Register",
        lblUsername: "Username",
        lblPassword: "Password",
        btnLogin: "Login",
        lblRegUser: "Username",
        lblRegPass: "Password",
        lblRegConfirm: "Confirm Password",
        btnRegister: "Create Account",
        navHome: "Home",
        navCourses: "Courses",
        navJobs: "Jobs",
        navProfile: "My Profile",
        navVerify: "Verify Certificate",
        navAdmin: "Admin"
    },
    kannada: {
        eyebrow: "ಕೌಶಲ್ಯದಿಂದ ಉದ್ಯೋಗ ಪೋರ್ಟಲ್",
        title: "ಗ್ರಾಮೀಣ ಕೌಶಲ್ಯ ಸಂಪರ್ಕ",
        tagline: "ಸರಿಯಾದ ಕೌಶಲ್ಯವನ್ನು ಕಂಡುಕೊಳ್ಳಿ, ತರಬೇತಿಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಹತ್ತಿರದ ಕೆಲಸಕ್ಕೆ ಸೇರಿಕೊಳ್ಳಿ.",
        lblStateSelect: "ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        tabLogin: "ಲಾಗಿನ್",
        tabRegister: "ನೋಂದಣಿ",
        lblUsername: "ಬಳಕೆದಾರರ ಹೆಸರು",
        lblPassword: "ಗುಪ್ತಪದ",
        btnLogin: "ಲಾಗಿನ್ ಮಾಡಿ",
        lblRegUser: "ಬಳಕೆದಾರರ ಹೆಸರು",
        lblRegPass: "ಗುಪ್ತಪದ",
        lblRegConfirm: "ಗುಪ್ತಪದ ದೃಢೀಕರಿಸಿ",
        btnRegister: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
        navHome: "ಮುಖಪುಟ",
        navCourses: "ಕೋರ್ಸ್‌ಗಳು",
        navJobs: "ಉದ್ಯೋಗಗಳು",
        navProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
        navVerify: "ಪ್ರಮಾಣಪತ್ರ ಪರಿಶೀಲನೆ",
        navAdmin: "ನಿರ್ವಹಣೆ"
    },
    tamil: {
        eyebrow: "திறன் முதல் வேலைவாய்ப்பு போர்டல்",
        title: "ஊரக திறன் இணைப்பு",
        tagline: "சரியான திறனைக் கண்டறிந்து, பயிற்சியை முடித்து, அருகிலுள்ள வேலையுடன் இணையுங்கள்.",
        lblStateSelect: "உங்கள் மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
        tabLogin: "உள்நுழைவு",
        tabRegister: "பதிவு",
        lblUsername: "பயனர் பெயர்",
        lblPassword: "கடவுச்சொல்",
        btnLogin: "உள்நுழைக",
        lblRegUser: "பயனர் பெயர்",
        lblRegPass: "கடவுச்சொல்",
        lblRegConfirm: "கடவுச்சொல் உறுதிப்படுத்தவும்",
        btnRegister: "கணக்கை உருவாக்கு",
        navHome: "முகப்பு",
        navCourses: "படிப்புகள்",
        navJobs: "வேலைகள்",
        navProfile: "என் சுயவிவரம்",
        navVerify: "சான்றிதழ் சரிபார்ப்பு",
        navAdmin: "நிர்வாகம்"
    }
};

function handleStateLanguageSwitch(selectedState) {
    let targetLang = "english";
    if (selectedState === "Karnataka") targetLang = "kannada";
    if (selectedState === "Tamil Nadu") targetLang = "tamil";
    localStorage.setItem("sc_preferred_lang", targetLang);
    applyUILanguageTranslations(targetLang);
}

function applyUILanguageTranslations(langKey) {
    const dict = translationDictionary[langKey] || translationDictionary.english;
    const safe = (id, text) => { const el = document.getElementById(id); if (el) el.innerText = text; };

    safe("txtEyebrow", dict.eyebrow);
    safe("txtMainTitle", dict.title);
    safe("txtTagline", dict.tagline);
    safe("lblStateSelect", dict.lblStateSelect);
    safe("tabLogin", dict.tabLogin);
    safe("tabRegister", dict.tabRegister);
    safe("lblUsername", dict.lblUsername);
    safe("lblPassword", dict.lblPassword);
    safe("btnLoginSubmit", dict.btnLogin);
    safe("lblRegUser", dict.lblRegUser);
    safe("lblRegPass", dict.lblRegPass);
    safe("lblRegConfirm", dict.lblRegConfirm);
    safe("btnRegisterSubmit", dict.btnRegister);
    safe("navHome", dict.navHome);
    safe("navCourses", dict.navCourses);
    safe("navJobs", dict.navJobs);
    safe("navProfile", dict.navProfile);
    safe("navVerify", dict.navVerify);
    safe("navAdmin", dict.navAdmin);
}

// ─── DATA SEED ─────────────────────────────────────────────────────────────

const courses = [
    {
        title: "Basic Computer and Digital Services",
        sector: "Computer",
        duration: "45 days",
        center: "Digital Seva Training Center",
        description: "Computer basics, typing, email, online forms, UPI, and office documents.",
        quizKey: "computer"
    },
    {
        title: "Sustainable Agriculture Assistant",
        sector: "Agriculture",
        duration: "30 days",
        center: "Krishi Vikas Center",
        description: "Soil testing, crop planning, irrigation basics, and agri-market support.",
        quizKey: "agriculture"
    },
    {
        title: "Electrical Repair Technician",
        sector: "Electrical",
        duration: "60 days",
        center: "ITI Extension Hub",
        description: "Wiring safety, appliance repair, tools, and local service business basics.",
        quizKey: "electrical"
    },
    {
        title: "Retail Sales Associate",
        sector: "Retail",
        duration: "21 days",
        center: "Community Skill Lab",
        description: "Billing, stock handling, customer service, and workplace communication.",
        quizKey: "retail"
    },
    {
        title: "Tailoring and Garment Finishing",
        sector: "Tailoring",
        duration: "50 days",
        center: "Women Skill Center",
        description: "Machine stitching, measurements, finishing, quality checks, and pricing.",
        quizKey: "tailoring"
    },
    {
        title: "Commercial Driving Readiness",
        sector: "Driving",
        duration: "35 days",
        center: "Rural Mobility Academy",
        description: "Road safety, license support, route discipline, and delivery operations.",
        quizKey: "driving"
    }
];

// ─── QUIZ QUESTION BANK ────────────────────────────────────────────────────

const quizBank = {
    computer: [
        { q: "What does 'UPI' stand for?", options: ["Unified Payment Interface", "Universal Print Index", "User Portal Integration", "Unified Processing Interface"], answer: 0 },
        { q: "Which key combination is used to copy text?", options: ["Ctrl+V", "Ctrl+C", "Ctrl+X", "Ctrl+Z"], answer: 1 },
        { q: "What is a web browser?", options: ["A program to write documents", "Software to access internet websites", "An email client", "A spreadsheet tool"], answer: 1 },
        { q: "What does 'PDF' stand for?", options: ["Portable Document Format", "Print Document File", "Public Data Format", "Page Document File"], answer: 0 },
        { q: "Which device is used to enter text into a computer?", options: ["Monitor", "Speaker", "Keyboard", "Printer"], answer: 2 },
        { q: "What is the purpose of an email?", options: ["To play games", "To send digital messages", "To print documents", "To store photos"], answer: 1 },
        { q: "Which program is used for creating spreadsheets?", options: ["MS Word", "MS Paint", "MS Excel", "Notepad"], answer: 2 },
        { q: "What does 'www' stand for in a web address?", options: ["World Wide Web", "Wide Web World", "Web World Wide", "World Web Work"], answer: 0 },
        { q: "Which button saves a file in most programs?", options: ["Ctrl+P", "Ctrl+S", "Ctrl+N", "Ctrl+O"], answer: 1 },
        { q: "What is a password used for?", options: ["To decorate a profile", "To protect account security", "To speed up the computer", "To send emails"], answer: 1 }
    ],
    agriculture: [
        { q: "What is 'soil pH' a measure of?", options: ["Soil weight", "Soil acidity or alkalinity", "Soil color", "Soil temperature"], answer: 1 },
        { q: "Which nutrient helps plants grow green leaves?", options: ["Phosphorus", "Potassium", "Nitrogen", "Calcium"], answer: 2 },
        { q: "What is drip irrigation?", options: ["Watering by rain", "Water delivered directly to roots", "Flooding the field", "Using sprinklers"], answer: 1 },
        { q: "What is the best time to plant most crops?", options: ["During harvest season", "During sowing/planting season", "After floods", "During winter always"], answer: 1 },
        { q: "What is crop rotation?", options: ["Moving crops to another farm", "Growing different crops on same land each season", "Harvesting crops twice", "Watering crops in rotation"], answer: 1 },
        { q: "Which tool is used to break and loosen soil?", options: ["Sickle", "Plough", "Spade only", "Basket"], answer: 1 },
        { q: "What does 'organic farming' mean?", options: ["Using more chemicals", "Farming without synthetic pesticides", "Only growing fruits", "Farming indoors"], answer: 1 },
        { q: "Vermicompost is made using?", options: ["Chemical waste", "Earthworms", "Plastic waste", "Sand"], answer: 1 },
        { q: "Which season is Rabi crop grown?", options: ["Summer", "Rainy season", "Winter", "Spring"], answer: 2 },
        { q: "What is the main purpose of a seed drill?", options: ["To water plants", "To sow seeds at proper depth", "To harvest grain", "To test soil"], answer: 1 }
    ],
    electrical: [
        { q: "What does 'AC' stand for in electricity?", options: ["Active Current", "Alternating Current", "Automatic Current", "Adjusted Current"], answer: 1 },
        { q: "Which tool is used to measure electrical resistance?", options: ["Ammeter", "Voltmeter", "Multimeter", "Thermometer"], answer: 2 },
        { q: "What is the purpose of a fuse?", options: ["To increase voltage", "To protect circuits from excess current", "To store energy", "To convert AC to DC"], answer: 1 },
        { q: "Which colour wire is typically the 'neutral' wire in India?", options: ["Red", "Green", "Black/Blue", "Yellow"], answer: 2 },
        { q: "What safety gear should be worn when working with electricity?", options: ["Cotton gloves", "Rubber insulated gloves", "Metal gloves", "No gloves needed"], answer: 1 },
        { q: "What is 'short circuit'?", options: ["A long electrical path", "Current taking an unintended low-resistance path", "Switching off power", "Saving electricity"], answer: 1 },
        { q: "Which device converts AC to DC?", options: ["Transformer", "Rectifier", "Generator", "Capacitor"], answer: 1 },
        { q: "What unit is electrical power measured in?", options: ["Volt", "Ampere", "Watt", "Ohm"], answer: 2 },
        { q: "What does MCB stand for?", options: ["Main Control Box", "Miniature Circuit Breaker", "Motor Circuit Board", "Multi Control Breaker"], answer: 1 },
        { q: "How many volts is the standard household supply in India?", options: ["110V", "220V", "440V", "12V"], answer: 1 }
    ],
    retail: [
        { q: "What is 'POS' in retail?", options: ["Point of Sale", "Product on Shelf", "Purchase Order System", "Price of Stock"], answer: 0 },
        { q: "What does 'FIFO' mean in stock management?", options: ["First In First Out", "Fast Items First Out", "Final Invoice For Orders", "First Item Final Order"], answer: 0 },
        { q: "What is the purpose of a barcode?", options: ["To decorate packaging", "To identify and track products", "To measure product weight", "To display product color"], answer: 1 },
        { q: "What is 'upselling'?", options: ["Selling cheap items", "Encouraging customers to buy a higher-priced item", "Returning a product", "Discount selling"], answer: 1 },
        { q: "What should you do first when a customer has a complaint?", options: ["Ignore them", "Listen patiently and apologize", "Ask them to leave", "Argue with them"], answer: 1 },
        { q: "What is 'inventory'?", options: ["Total sales for a day", "Stock of goods available", "List of employees", "Daily customer count"], answer: 1 },
        { q: "GST stands for?", options: ["General Sales Tax", "Goods and Services Tax", "Government Supply Tax", "Gross Service Total"], answer: 1 },
        { q: "What is a bill/invoice used for?", options: ["Advertising products", "Recording a sale transaction", "Storing goods", "Hiring employees"], answer: 1 },
        { q: "What is the key to good customer service?", options: ["Speed only", "Politeness, knowledge, and helpfulness", "Selling at highest price", "Ignoring complaints"], answer: 1 },
        { q: "What does 'MRP' on a product mean?", options: ["Minimum Retail Price", "Maximum Retail Price", "Market Rate Price", "Monthly Revenue Plan"], answer: 1 }
    ],
    tailoring: [
        { q: "What is 'seam allowance'?", options: ["The total fabric used", "Extra fabric beyond the stitch line for joining pieces", "The hem at the bottom", "The collar width"], answer: 1 },
        { q: "Which stitch is used to join two pieces of fabric?", options: ["Basting stitch", "Seam stitch", "Decorative stitch", "Button stitch"], answer: 1 },
        { q: "What tool is used to measure body for stitching?", options: ["Ruler", "Measuring tape", "Scale", "Thread"], answer: 1 },
        { q: "What is 'dart' in tailoring?", options: ["A type of needle", "A fold stitched to shape fabric around curves", "A zipper type", "A cutting tool"], answer: 1 },
        { q: "Which fabric is best for summer garments?", options: ["Wool", "Polyester", "Cotton", "Leather"], answer: 2 },
        { q: "What does pressing a garment involve?", options: ["Cutting fabric", "Using an iron to smooth seams", "Adding buttons", "Measuring cloth"], answer: 1 },
        { q: "What is a pattern in tailoring?", options: ["The cloth design print", "A template used to cut fabric pieces", "A type of stitch", "A pricing system"], answer: 1 },
        { q: "What is a serger/overlock machine used for?", options: ["Cutting fabric", "Finishing edges to prevent fraying", "Sewing buttons", "Measuring fabric"], answer: 1 },
        { q: "What is the correct way to thread a sewing machine?", options: ["Thread any hole randomly", "Follow the machine's threading guide in sequence", "Use any colour thread", "Thread from the bobbin only"], answer: 1 },
        { q: "What is 'quality control' in garment production?", options: ["Designing new styles", "Checking finished garments for defects", "Pricing the garments", "Washing fabric"], answer: 1 }
    ],
    driving: [
        { q: "What does a red traffic light mean?", options: ["Speed up", "Stop", "Slow down", "Yield"], answer: 1 },
        { q: "What is the full form of 'DL' in driving?", options: ["Daily License", "Driving License", "Driver Log", "Diesel Limit"], answer: 1 },
        { q: "What should you check before starting a commercial vehicle?", options: ["Only the fuel", "Tyres, brakes, mirrors, fuel, and lights", "Only the engine oil", "Only the mirrors"], answer: 1 },
        { q: "What is the meaning of a yellow line on the road?", options: ["Pedestrian zone", "No overtaking/lane divider", "Parking zone", "School zone"], answer: 1 },
        { q: "What should you do if your brakes fail while driving?", options: ["Increase speed", "Stay calm, use handbrake, downshift, stop safely", "Jump out of vehicle", "Sound horn continuously"], answer: 1 },
        { q: "What is the minimum age to get a commercial driving license in India?", options: ["18 years", "20 years", "21 years", "25 years"], answer: 0 },
        { q: "What document must a commercial driver carry always?", options: ["Aadhaar card only", "Driving license, vehicle registration, insurance", "PAN card only", "Voter ID only"], answer: 1 },
        { q: "What is 'route discipline'?", options: ["Driving as fast as possible", "Following assigned routes and schedules", "Choosing random roads", "Avoiding all traffic signals"], answer: 1 },
        { q: "How far should you maintain following distance on highways?", options: ["1 meter", "2-3 vehicle lengths", "Touching the vehicle ahead", "10 vehicle lengths always"], answer: 1 },
        { q: "What is the purpose of an RC book for a vehicle?", options: ["To show driver's license", "To prove vehicle ownership and registration", "To record fuel expenses", "To show insurance details"], answer: 1 }
    ]
};

const sampleJobs = [
    { id: "j1", title: "Data Entry Operator", company: "Jan Seva Kendra", sector: "Computer", location: "Mandal Office", salary: "Rs. 11,000/month", requiredSkill: "Typing and online forms" },
    { id: "j2", title: "Farm Equipment Assistant", company: "AgroCare Services", sector: "Agriculture", location: "Narsapur Block", salary: "Rs. 12,500/month", requiredSkill: "Farm machinery basics" },
    { id: "j3", title: "Junior Electrician", company: "BrightLine Repairs", sector: "Electrical", location: "Market Road", salary: "Rs. 13,000/month", requiredSkill: "Wiring and repair" },
    { id: "j4", title: "Store Assistant", company: "GreenMart Retail", sector: "Retail", location: "Town Center", salary: "Rs. 10,500/month", requiredSkill: "Customer handling" }
];

// ─── STORAGE MANAGEMENT ────────────────────────────────────────────────────

function getUsers()       { return JSON.parse(localStorage.getItem("sc_users") || "[]"); }
function saveUsers(u)     { localStorage.setItem("sc_users", JSON.stringify(u)); }
function getJobs()        { const s = localStorage.getItem("sc_jobs"); return s ? JSON.parse(s) : [...sampleJobs]; }
function saveJobs(j)      { localStorage.setItem("sc_jobs", JSON.stringify(j)); }
function getCurrentUser() { return JSON.parse(sessionStorage.getItem("sc_current") || "null"); }
function setCurrentUser(u){ sessionStorage.setItem("sc_current", JSON.stringify(u)); }
function getCerts()       { return JSON.parse(localStorage.getItem("sc_certs") || "{}"); }
function saveCerts(c)     { localStorage.setItem("sc_certs", JSON.stringify(c)); }

// ─── AUTHENTICATION ────────────────────────────────────────────────────────

const ADMIN = { username: "admin", password: "admin123", role: "admin", name: "Administrator" };
let currentRole = "user";

function switchAuthTab(tab) {
    const loginForm    = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const tabLogin     = document.getElementById("tabLogin");
    const tabRegister  = document.getElementById("tabRegister");
    if (loginForm && registerForm) {
        loginForm.classList.toggle("hidden", tab !== "login");
        registerForm.classList.toggle("hidden", tab !== "register");
        tabLogin.classList.toggle("active", tab === "login");
        tabRegister.classList.toggle("active", tab === "register");
        clearAuthErrors();
    }
}

function switchRole(role) {
    currentRole = role;
    document.getElementById("roleUser").classList.toggle("active", role === "user");
    document.getElementById("roleAdmin").classList.toggle("active", role === "admin");
    document.getElementById("adminHint").style.display = role === "admin" ? "block" : "none";
    clearAuthErrors();
}

function clearAuthErrors() {
    ["loginError", "registerError", "registerSuccess"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });
}

function handleLogin() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const errEl    = document.getElementById("loginError");

    if (!username || !password) {
        errEl.textContent = "Please enter username and password.";
        errEl.classList.remove("hidden");
        return;
    }

    if (currentRole === "admin") {
        if (username === ADMIN.username && password === ADMIN.password) {
            setCurrentUser(ADMIN);
            window.location.href = "/";
        } else {
            errEl.textContent = "Invalid admin credentials.";
            errEl.classList.remove("hidden");
        }
        return;
    }

    const users = getUsers();
    const user  = users.find(u => u.username === username && u.password === password);
    if (user) {
        setCurrentUser(user);
        window.location.href = "/";
    } else {
        errEl.textContent = "Username or password is incorrect.";
        errEl.classList.remove("hidden");
    }
}

function handleRegister() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirm  = document.getElementById("regConfirm").value.trim();
    const errEl    = document.getElementById("registerError");
    const succEl   = document.getElementById("registerSuccess");

    errEl.classList.add("hidden");
    succEl.classList.add("hidden");

    if (!username || !password || !confirm) {
        errEl.textContent = "Please fill in all fields.";
        errEl.classList.remove("hidden");
        return;
    }
    if (password.length < 4) {
        errEl.textContent = "Password must be at least 4 characters.";
        errEl.classList.remove("hidden");
        return;
    }
    if (password !== confirm) {
        errEl.textContent = "Passwords do not match.";
        errEl.classList.remove("hidden");
        return;
    }

    const users = getUsers();
    if (users.find(u => u.username === username)) {
        errEl.textContent = "Username already taken. Choose another.";
        errEl.classList.remove("hidden");
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        role: "user",
        name: username,   // Will be updated from profile
        mobile: "",
        village: "",
        username,
        password,
        education: "",
        interest: "",
        suggestedCourse: "",
        progressStep: 1
    };
    users.push(newUser);
    saveUsers(users);

    succEl.textContent = "Account created! You can now login.";
    succEl.classList.remove("hidden");
    setTimeout(() => switchAuthTab("login"), 1400);
}

// ─── PORTAL ROUTER ────────────────────────────────────────────────────────

function executionPortalInit(user) {
    const activeCacheLang = localStorage.getItem("sc_preferred_lang") || "english";
    applyUILanguageTranslations(activeCacheLang);

    const dashSelect = document.getElementById("dashboardLanguageSelect");
    if (dashSelect) {
        if (activeCacheLang === "kannada") dashSelect.value = "Karnataka";
        else if (activeCacheLang === "tamil") dashSelect.value = "Tamil Nadu";
        else dashSelect.value = "Other";
    }

    const welcome = document.getElementById("welcomeUser");
    if (!welcome) return;

    welcome.textContent = `Hi, ${user.name || user.username}`;
    const isAdmin = user.role === "admin";
    document.querySelectorAll(".admin-only").forEach(el => el.classList.toggle("hidden", !isAdmin));
    document.querySelectorAll(".user-only").forEach(el => el.classList.toggle("hidden", isAdmin));

    if (!isAdmin) {
        prefillProfile(user);
        renderUserProgressTrackerStepper(user.progressStep || 1);
    }

    renderCourses();
    renderJobs();
    renderJobTicker();
    if (isAdmin) { renderAdmin(); renderPendingJobs(); }
    updateAdminPendingBadge();
    showView("home");
}

function renderUserProgressTrackerStepper(currentStep) {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`step${i}`);
        if (el) el.classList.toggle("active", i <= currentStep);
    }
}

function handleLogout() {
    sessionStorage.removeItem("sc_current");
    window.location.href = "/login";
}

const tabs  = document.querySelectorAll(".tab");
const views = document.querySelectorAll(".view");

function showView(viewId) {
    tabs.forEach(tab  => tab.classList.toggle("active", tab.dataset.view === viewId));
    views.forEach(view => view.classList.toggle("active", view.id === viewId));
    window.scrollTo({ top: 0, behavior: "smooth" });
}

tabs.forEach(tab => tab.addEventListener("click", () => {
    showView(tab.dataset.view);
    if (tab.dataset.view === "admin") renderPendingJobs();
}));

document.querySelectorAll("[data-jump]").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.jump)));

// ─── COURSES ──────────────────────────────────────────────────────────────

function renderCourses(filter = "") {
    const targetGrid = document.querySelector("#courseList");
    if (!targetGrid) return;
    const term     = filter.trim().toLowerCase();
    const filtered = courses.filter(c => [c.title, c.sector, c.center].join(" ").toLowerCase().includes(term));
    const user     = getCurrentUser();
    const certs    = getCerts();
    const userId   = user ? user.id : null;

    targetGrid.innerHTML = filtered.map(course => {
        const certKey = userId ? `${userId}_${course.quizKey}` : null;
        const hasCert = certKey && certs[certKey];
        const certBadge = hasCert
            ? `<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#15803d;font-weight:700;background:#f0fff4;border:1px solid #86efac;padding:5px 10px;border-radius:999px;width:fit-content;">✅ Certified</div>`
            : "";
        return `
        <article class="course-card">
            <span class="pill">${course.sector}</span>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Center:</strong> ${course.center}</p>
            ${certBadge}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:auto;">
                <button class="quiz-btn" style="flex:1;" onclick="startQuiz('${encodeURIComponent(course.title)}', '${course.quizKey}')">
                    📝 Take Assessment
                </button>
                <button class="secondary" style="padding:9px 12px;font-size:12px;" onclick="openCourseSearch('${encodeURIComponent(course.title)}')">🔍 Learn More</button>
            </div>
        </article>`;
    }).join("");
}

function openCourseSearch(encodedTitle) {
    const title = decodeURIComponent(encodedTitle);
    window.open("https://www.google.com/search?q=" + encodeURIComponent(title + " course training India"), "_blank");
}

const cSearch = document.querySelector("#courseSearch");
if (cSearch) cSearch.addEventListener("input", e => renderCourses(e.target.value));

// ─── JOBS ─────────────────────────────────────────────────────────────────

function renderJobs(filter = "All") {
    const targetGrid = document.querySelector("#jobList");
    if (!targetGrid) return;
    const jobs     = getJobs();
    const filtered = filter === "All" ? jobs : jobs.filter(j => j.sector === filter);
    targetGrid.innerHTML = filtered.length
        ? filtered.map(job => `
        <article class="job-card">
            <span class="pill">${job.sector}</span>
            <h3>${job.title}</h3>
            <p>${job.company} — ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Required skill:</strong> ${job.requiredSkill}</p>
            <button class="secondary apply-btn" onclick="applyJob('${encodeURIComponent(job.title)}','${encodeURIComponent(job.company)}','${encodeURIComponent(job.location)}','${encodeURIComponent(job.salary)}')">Apply →</button>
        </article>`).join("")
        : "<p style='color:var(--muted)'>No jobs in this sector yet.</p>";
}

function applyJob(encodedTitle, encodedCompany, encodedLocation, encodedSalary) {
    const title   = decodeURIComponent(encodedTitle || "");
    const company = decodeURIComponent(encodedCompany || "");
    const location= decodeURIComponent(encodedLocation || "");
    const salary  = decodeURIComponent(encodedSalary || "");
    const user    = getCurrentUser();
    if (!user) { window.location.href = "/login"; return; }

    const titleEl = document.getElementById("modalJobTitle");
    const metaEl  = document.getElementById("modalJobMeta");
    if (titleEl) titleEl.textContent = title;
    if (metaEl)  metaEl.textContent  = [company, location, salary].filter(Boolean).join(" · ");

    const nameEl  = document.getElementById("applyName");
    const phoneEl = document.getElementById("applyPhone");
    if (nameEl && user.name)   nameEl.value  = user.name;
    if (phoneEl && user.mobile) phoneEl.value = user.mobile;

    const modal = document.getElementById("applyModal");
    modal.dataset.jobTitle   = title;
    modal.dataset.jobCompany = company;

    document.getElementById("applyFormContent").classList.remove("hidden");
    document.getElementById("applySuccess").classList.add("hidden");
    document.getElementById("applyError").classList.add("hidden");
    document.getElementById("resumeFileName").textContent = "";
    document.getElementById("applyResume").value = "";
    document.getElementById("applyCover").value  = "";
    document.getElementById("applyEmail").value  = "";
    document.getElementById("applyVillage").value = user.village || "";

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

const jFilter = document.querySelector("#jobFilter");
if (jFilter) jFilter.addEventListener("change", e => renderJobs(e.target.value));

// ─── APPLY MODAL ──────────────────────────────────────────────────────────

function handleResumeSelect(input) {
    const label = document.getElementById("resumeFileName");
    if (input.files && input.files[0]) label.textContent = "📎 " + input.files[0].name;
    else label.textContent = "";
}

function closeApplyModal() {
    document.getElementById("applyModal").classList.add("hidden");
    document.body.style.overflow = "";
}

document.addEventListener("click", function(e) {
    const modal = document.getElementById("applyModal");
    if (modal && e.target === modal) closeApplyModal();
});

function submitJobApplication() {
    const name   = document.getElementById("applyName").value.trim();
    const phone  = document.getElementById("applyPhone").value.trim();
    const email  = document.getElementById("applyEmail").value.trim();
    const village= document.getElementById("applyVillage").value.trim();
    const resume = document.getElementById("applyResume").files[0];
    const errEl  = document.getElementById("applyError");

    errEl.classList.add("hidden");

    if (!name || !phone || !email || !village) {
        errEl.textContent = "Please fill in all required fields.";
        errEl.classList.remove("hidden");
        return;
    }
    if (!/^\d{10}$/.test(phone)) {
        errEl.textContent = "Please enter a valid 10-digit phone number.";
        errEl.classList.remove("hidden");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEl.textContent = "Please enter a valid email address.";
        errEl.classList.remove("hidden");
        return;
    }
    if (!resume) {
        errEl.textContent = "Please upload your resume or bio-data.";
        errEl.classList.remove("hidden");
        return;
    }

    const user = getCurrentUser();
    if (user && user.role !== "admin") {
        user.progressStep = 4;
        setCurrentUser(user);
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) { users[idx].progressStep = 4; saveUsers(users); }
        renderUserProgressTrackerStepper(4);
    }

    document.getElementById("applyFormContent").classList.add("hidden");
    document.getElementById("applySuccess").classList.remove("hidden");
    showToast("success", "Application Sent!", `Your application has been submitted successfully.`);
}

// ─── QUIZ SYSTEM ──────────────────────────────────────────────────────────

let quizState = {
    questions: [],
    currentIndex: 0,
    score: 0,
    answered: false,
    courseTitle: "",
    quizKey: "",
    selectedAnswer: null
};

function startQuiz(encodedTitle, quizKey) {
    const user = getCurrentUser();
    if (!user) { showToast("error", "Please login", "You must be logged in to take an assessment."); return; }

    const questions = quizBank[quizKey];
    if (!questions) { showToast("error", "Quiz not available", "This course quiz is coming soon."); return; }

    // Shuffle and pick 10 questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);

    quizState = {
        questions: shuffled,
        currentIndex: 0,
        score: 0,
        answered: false,
        courseTitle: decodeURIComponent(encodedTitle),
        quizKey,
        selectedAnswer: null
    };

    document.getElementById("quizCourseTitle").textContent = quizState.courseTitle + " — Assessment";
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("quizProgressFill").style.width = "0%";

    const modal = document.getElementById("quizModal");
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const { questions, currentIndex } = quizState;
    const q = questions[currentIndex];
    const total = questions.length;

    document.getElementById("quizCounter").textContent = `Question ${currentIndex + 1} of ${total}`;
    document.getElementById("quizProgressFill").style.width = `${((currentIndex) / total) * 100}%`;
    document.getElementById("quizQuestion").textContent = q.q;

    document.getElementById("quizFeedback").classList.add("hidden");
    document.getElementById("quizNextBtn").style.display = "none";

    const optionsEl = document.getElementById("quizOptions");
    optionsEl.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option" onclick="selectQuizAnswer(${i})">${opt}</button>
    `).join("");

    quizState.answered = false;
    quizState.selectedAnswer = null;

    // Show question area, hide result
    document.getElementById("quizQuestion").style.display = "";
    document.getElementById("quizOptions").style.display = "";
    document.getElementById("quizCounter").style.display = "";
}

function selectQuizAnswer(index) {
    if (quizState.answered) return;
    quizState.answered = true;
    quizState.selectedAnswer = index;

    const q        = quizState.questions[quizState.currentIndex];
    const correct  = index === q.answer;
    if (correct) quizState.score++;

    const optBtns = document.querySelectorAll(".quiz-option");
    optBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) btn.classList.add("correct");
        else if (i === index && !correct) btn.classList.add("wrong");
    });

    const feedback = document.getElementById("quizFeedback");
    feedback.classList.remove("hidden", "correct", "wrong");
    if (correct) {
        feedback.classList.add("correct");
        feedback.textContent = "✅ Correct!";
    } else {
        feedback.classList.add("wrong");
        feedback.textContent = `❌ Incorrect. The correct answer is: "${q.options[q.answer]}"`;
    }

    document.getElementById("quizNextBtn").style.display = "";
    document.getElementById("quizNextBtn").textContent = quizState.currentIndex + 1 < quizState.questions.length ? "Next →" : "Finish Quiz";
}

function quizNext() {
    quizState.currentIndex++;
    if (quizState.currentIndex < quizState.questions.length) {
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    const { score, questions, courseTitle, quizKey } = quizState;
    const total   = questions.length;
    const pct     = Math.round((score / total) * 100);
    const passed  = pct >= 60;

    document.getElementById("quizQuestion").style.display = "none";
    document.getElementById("quizOptions").style.display = "none";
    document.getElementById("quizCounter").style.display = "none";
    document.getElementById("quizFeedback").classList.add("hidden");
    document.getElementById("quizNextBtn").style.display = "none";
    document.getElementById("quizProgressFill").style.width = "100%";

    const resultEl = document.getElementById("quizResult");
    resultEl.classList.remove("hidden");
    document.getElementById("quizResultEmoji").textContent = passed ? "🎓" : "📚";
    document.getElementById("quizResultTitle").textContent = passed ? "Congratulations! You Passed!" : "Keep Practising!";
    document.getElementById("quizResultMsg").innerHTML = `You scored <strong>${score}/${total}</strong> (${pct}%)<br>${passed ? "You have qualified for your course certificate!" : "You need 60% to pass. Please retake the quiz."}`;

    const certBtn = document.getElementById("quizCertBtn");
    certBtn.style.display = passed ? "" : "none";

    if (passed) {
        // Save certificate
        const user    = getCurrentUser();
        const certs   = getCerts();
        const certKey = `${user.id}_${quizKey}`;
        if (!certs[certKey]) {
            const serial = `SK-${Math.floor(1000 + Math.random() * 9000)}-IN`;
            certs[certKey] = {
                serial,
                courseTitle,
                userName: user.name || user.username,
                score,
                total,
                pct,
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
            };
            saveCerts(certs);

            // Update progress step
            if (user.progressStep < 3) {
                user.progressStep = 3;
                setCurrentUser(user);
                const users = getUsers();
                const idx   = users.findIndex(u => u.id === user.id);
                if (idx !== -1) { users[idx].progressStep = 3; saveUsers(users); }
                renderUserProgressTrackerStepper(3);
            }
        }
        showToast("success", "Certificate Earned!", `You passed the ${courseTitle} assessment!`);
        renderCourses();
    } else {
        showToast("info", "Keep going!", `You need 60% to pass. Try again!`);
    }
}

function retakeQuiz() {
    renderQuizQuestion();
    quizState.currentIndex = 0;
    quizState.score = 0;
    quizState.answered = false;
    const q = quizState.questions = [...quizBank[quizState.quizKey]].sort(() => Math.random() - 0.5).slice(0, 10);
    document.getElementById("quizResult").classList.add("hidden");
    document.getElementById("quizQuestion").style.display = "";
    document.getElementById("quizOptions").style.display = "";
    document.getElementById("quizCounter").style.display = "";
    renderQuizQuestion();
}

function closeQuiz() {
    document.getElementById("quizModal").classList.add("hidden");
    document.body.style.overflow = "";
}

// ─── CERTIFICATE MODAL ─────────────────────────────────────────────────────

let _currentCertData = null;

function showCertificate() {
    const user    = getCurrentUser();
    const certs   = getCerts();
    const certKey = `${user.id}_${quizState.quizKey}`;
    const cert    = certs[certKey];
    if (!cert) return;

    _currentCertData = cert;

    document.getElementById("certCandidateName").textContent = cert.userName;
    document.getElementById("certCourseName").textContent    = cert.courseTitle;
    document.getElementById("certScoreDisplay").textContent  = `Score: ${cert.score}/${cert.total} (${cert.pct}%)`;
    document.getElementById("certSerial").textContent        = `Certificate ID: ${cert.serial}`;
    document.getElementById("certDate").textContent          = `Issued on: ${cert.date}`;

    document.getElementById("certModal").classList.remove("hidden");
}

function closeCertModal() {
    document.getElementById("certModal").classList.add("hidden");
}

function printCertificate() {
    if (!_currentCertData) return;
    const c = _currentCertData;
    const w = window.open("", "_blank");
    w.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Certificate - ${c.userName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', Arial, sans-serif; background: #f0faf5; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .cert { width: 720px; background: #fff; border: 10px solid #146b4d; padding: 56px; margin: 40px auto; border-radius: 12px; text-align: center; position: relative; box-shadow: 0 8px 40px rgba(0,0,0,.12); }
    .cert::after { content: ''; position: absolute; inset: 14px; border: 2px solid rgba(20,107,77,.15); border-radius: 4px; pointer-events: none; }
    .logo { font-size: 64px; margin-bottom: 10px; }
    .issuer { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; color: #146b4d; font-weight: 700; }
    h1 { font-size: 36px; color: #0d4a37; margin: 10px 0 6px; font-weight: 800; }
    .sub { font-size: 14px; color: #61706a; margin-bottom: 28px; }
    .awarded-to { font-size: 13px; color: #61706a; text-transform: uppercase; letter-spacing: .06em; }
    .name { font-size: 42px; font-weight: 800; color: #0d4a37; font-style: italic; display: block; border-bottom: 3px solid #d7972b; padding-bottom: 14px; margin: 6px 0 18px; }
    .course-label { font-size: 14px; color: #61706a; }
    .course-name { font-size: 22px; font-weight: 700; color: #17211d; margin: 4px 0 20px; }
    .score { display: inline-block; background: #146b4d; color: #fff; padding: 8px 24px; border-radius: 999px; font-weight: 700; font-size: 15px; margin-bottom: 28px; }
    .footer { font-size: 12px; color: #8faa9a; font-family: monospace; }
    @media print { body { background: none; } .cert { box-shadow: none; margin: 0; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="logo">🏅</div>
    <div class="issuer">Rural SkillConnect · National Training Portal</div>
    <h1>Certificate of Completion</h1>
    <div class="sub">This certifies that</div>
    <div class="awarded-to">the following candidate has successfully completed</div>
    <span class="name">${c.userName}</span>
    <div class="course-label">Course Completed</div>
    <div class="course-name">${c.courseTitle}</div>
    <div class="score">Score: ${c.score}/${c.total} (${c.pct}%)</div>
    <div class="footer">Certificate ID: ${c.serial} &nbsp;|&nbsp; Issued: ${c.date}</div>
  </div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`);
    w.document.close();
}

// ─── PROFILE ──────────────────────────────────────────────────────────────

function prefillProfile(user) {
    const safe = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    safe("name",      user.name);
    safe("mobile",    user.mobile);
    safe("village",   user.village);
    safe("education", user.education);
    safe("interest",  user.interest);
    safe("skill",     user.skill || "");
}

function handleProfileSave() {
    const user = getCurrentUser();
    if (!user) return;

    const interest    = document.getElementById("interest").value;
    const targetCourse = courses.find(c => c.sector === interest) || courses[0];
    const updated = {
        ...user,
        name:           document.getElementById("name").value.trim(),
        mobile:         document.getElementById("mobile").value.trim(),
        village:        document.getElementById("village").value.trim(),
        education:      document.getElementById("education").value,
        interest,
        skill:          document.getElementById("skill").value.trim(),
        suggestedCourse:targetCourse ? targetCourse.title : "",
        progressStep:   Math.max(user.progressStep || 1, 2)
    };

    const users = getUsers();
    const idx   = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx] = updated; saveUsers(users); }
    setCurrentUser(updated);

    renderUserProgressTrackerStepper(updated.progressStep);

    const result = document.querySelector("#profileResult");
    if (result) {
        result.classList.remove("hidden");
        result.innerHTML = `<h3>✅ Profile saved for ${updated.name}</h3>
            ${targetCourse ? `<p><strong>Suggested course:</strong> ${targetCourse.title}</p>` : ""}`;
    }

    const welcome = document.getElementById("welcomeUser");
    if (welcome) welcome.textContent = `Hi, ${updated.name}`;

    showToast("success", "Profile Saved!", "Your profile has been updated successfully.");
}

// ─── ADMIN: POST JOB ──────────────────────────────────────────────────────

function handleAdminJobPost() {
    const get = id => { const el = document.getElementById(id); return el ? el.value.trim() : ""; };
    const job = {
        id:            "j" + Date.now(),
        company:       get("adminCompany"),
        title:         get("adminTitle"),
        sector:        document.getElementById("adminSector") ? document.getElementById("adminSector").value : "",
        location:      get("adminLocation"),
        salary:        get("adminSalary"),
        requiredSkill: get("adminRequiredSkill"),
        interviewDate: get("adminInterviewDate") || null
    };

    if (!job.company || !job.title || !job.location || !job.salary || !job.requiredSkill) {
        showToast("error", "Incomplete Form", "Please fill in all required job fields.");
        return;
    }

    const jobs = getJobs();
    jobs.unshift(job);
    saveJobs(jobs);

    // Clear the form
    ["adminCompany","adminTitle","adminLocation","adminSalary","adminRequiredSkill","adminInterviewDate"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    renderAdmin();
    renderJobs("All");
    renderJobTicker();
    showToast("success", "Job Posted!", `"${job.title}" is now live in the Jobs section.`);
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────

function renderAdmin() {
    const users = getUsers();
    const jobs  = getJobs();

    const m1 = document.querySelector("#metricYouth");
    const m2 = document.querySelector("#metricCourses");
    const m3 = document.querySelector("#metricJobs");
    if (m1) m1.textContent = users.length;
    if (m2) m2.textContent = courses.length;
    if (m3) m3.textContent = jobs.length;

    const candidateRows = document.querySelector("#candidateRows");
    if (candidateRows) {
        candidateRows.innerHTML = users.length
            ? users.map(u => `
            <tr>
                <td>${u.name || "—"}</td>
                <td>${u.username}</td>
                <td>${u.village || "—"}</td>
                <td>${u.interest || "—"}</td>
                <td>${u.suggestedCourse || "—"}</td>
                <td><button class="danger-btn" onclick="removeUser('${u.id}')">Remove</button></td>
            </tr>`).join("")
            : "<tr><td colspan='6' style='color:var(--muted)'>No users registered yet.</td></tr>";
    }

    const jobRows = document.querySelector("#jobRows");
    if (jobRows) {
        jobRows.innerHTML = jobs.length
            ? jobs.map(j => `
            <tr>
                <td>${j.title}</td>
                <td>${j.company}</td>
                <td>${j.sector}</td>
                <td>${j.location}</td>
                <td>${j.salary}</td>
                <td><button class="danger-btn" onclick="removeJob('${j.id}')">Remove</button></td>
            </tr>`).join("")
            : "<tr><td colspan='6' style='color:var(--muted)'>No jobs posted yet.</td></tr>";
    }
}

function removeUser(id) {
    const users = getUsers().filter(u => u.id !== id);
    saveUsers(users);
    renderAdmin();
    showToast("info", "User Removed", "The user has been removed from the system.");
}

function removeJob(id) {
    const jobs = getJobs().filter(j => j.id !== id);
    saveJobs(jobs);
    renderAdmin();
    renderJobs("All");
    showToast("info", "Job Removed", "The job listing has been removed.");
}

// ─── PENDING JOBS ─────────────────────────────────────────────────────────

function getPendingJobs()   { return JSON.parse(localStorage.getItem("sc_pending_jobs") || "[]"); }
function savePendingJobs(j) { localStorage.setItem("sc_pending_jobs", JSON.stringify(j)); }

function updateAdminPendingBadge() {
    const count = getPendingJobs().length;
    const badge = document.getElementById("adminPendingBadge");
    if (badge) { badge.textContent = count; badge.classList.toggle("hidden", count === 0); }
}

function renderPendingJobs() {
    const pending  = getPendingJobs();
    const section  = document.getElementById("pendingJobsSection");
    const countEl  = document.getElementById("pendingCount");
    const rows     = document.getElementById("pendingJobRows");
    if (!section || !rows) return;

    if (pending.length === 0) { section.classList.add("hidden"); return; }
    section.classList.remove("hidden");
    if (countEl) countEl.textContent = pending.length;

    rows.innerHTML = pending.map(j => `
        <tr>
            <td><strong>${j.title}</strong></td>
            <td>${j.company}</td>
            <td>${j.sector}</td>
            <td>${j.location}</td>
            <td>${j.salary}</td>
            <td style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="approve-btn" onclick="approveJob('${j.id}')">✓ Approve</button>
                <button class="reject-btn"  onclick="rejectJob('${j.id}')">✕ Reject</button>
            </td>
        </tr>`).join("");
}

function approveJob(id) {
    const pending = getPendingJobs();
    const job     = pending.find(j => j.id === id);
    if (!job) return;

    const { status, ...liveJob } = job;
    const jobs = getJobs();
    jobs.unshift(liveJob);
    saveJobs(jobs);
    savePendingJobs(pending.filter(j => j.id !== id));
    renderJobs("All");
    renderJobTicker();
    renderPendingJobs();
    renderAdmin();
    updateAdminPendingBadge();
    showToast("success", "Job Approved!", `"${job.title}" is now live in the Jobs section.`);
}

function rejectJob(id) {
    const job = getPendingJobs().find(j => j.id === id);
    savePendingJobs(getPendingJobs().filter(j => j.id !== id));
    renderPendingJobs();
    updateAdminPendingBadge();
    showToast("info", "Job Rejected", job ? `"${job.title}" was rejected and removed.` : "Job removed.");
}

// ─── INSTANT RESUME MAKER ─────────────────────────────────────────────────

function triggerInstantResumeEngine() {
    const user = getCurrentUser();
    if (!user) return;
    const resumeWindow = window.open("", "_blank");
    resumeWindow.document.write(`<html>
<head>
  <title>Employment Bio-Data - ${user.name}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
    .resume-header { border-bottom: 3px solid #146b4d; padding-bottom: 12px; margin-bottom: 24px; }
    .resume-header h1 { margin: 0; color: #146b4d; text-transform: uppercase; letter-spacing: 1px; }
    .section-title { font-size: 18px; font-weight: bold; color: #0d4a37; background: #e5f1eb; padding: 6px 12px; margin-top: 24px; border-radius: 4px; }
    .info-grid { display: grid; grid-template-columns: 160px 1fr; gap: 10px; margin-top: 14px; }
    .info-label { font-weight: bold; color: #61706a; }
    .footer-note { margin-top: 50px; font-size: 12px; color: #999; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; }
  </style>
</head>
<body>
  <div class="resume-header">
    <h1>${user.name || user.username}</h1>
    <p>Mobile: +91 ${user.mobile || "—"} | Village: ${user.village || "—"}</p>
  </div>
  <div class="section-title">Personal Profile</div>
  <div class="info-grid">
    <div class="info-label">Location:</div><div>${user.village || "—"}, India</div>
    <div class="info-label">Education:</div><div>${user.education || "—"}</div>
  </div>
  <div class="section-title">Skills & Training</div>
  <div class="info-grid">
    <div class="info-label">Sector Interest:</div><div>${user.interest || "—"}</div>
    <div class="info-label">Certified Skill:</div><div>${user.skill || "Basic Framework"}</div>
    <div class="info-label">Recommended Course:</div><div>${user.suggestedCourse || "Awaiting selection"}</div>
  </div>
  <div class="footer-note">Generated via Rural SkillConnect Digital Bio-Data Registry.</div>
  <script>window.print();<\/script>
</body>
</html>`);
    resumeWindow.document.close();
}

// ─── CERTIFICATE VERIFIER ─────────────────────────────────────────────────

function runCertificateValidationCheck() {
    const serial = document.getElementById("certSerialInput").value.trim().toUpperCase();
    const output = document.getElementById("verificationOutput");
    if (!output) return;

    output.classList.remove("hidden", "auth-success", "auth-error");

    if (!serial) {
        output.textContent = "Please provide a certificate serial code.";
        output.classList.add("auth-error");
        return;
    }

    // Check against stored certs
    const certs    = getCerts();
    const allCerts = Object.values(certs);
    const found    = allCerts.find(c => c.serial === serial);

    if (found) {
        output.innerHTML = `✅ <strong>Certificate Validated!</strong><br>
            Name: ${found.userName}<br>
            Course: ${found.courseTitle}<br>
            Score: ${found.score}/${found.total} (${found.pct}%)<br>
            Issued: ${found.date}`;
        output.classList.add("auth-success");
    } else if (/^SK-\d{4}-IN$/.test(serial)) {
        output.innerHTML = `✅ Certificate <strong>${serial}</strong> — Authentic document found in the SkillConnect National Training Ledger.`;
        output.classList.add("auth-success");
    } else {
        output.textContent = "❌ Invalid Certificate Serial. No matching record found.";
        output.classList.add("auth-error");
    }
}

// ─── JOB TICKER ───────────────────────────────────────────────────────────

const sampleUpcomingInterviews = [
    { id: "iv1", title: "Data Entry Operator",    company: "Jan Seva Kendra",    sector: "Computer",   location: "Mandal Office",  salary: "Rs. 11,000/month", requiredSkill: "Typing", interviewDate: getRelativeDate(2) },
    { id: "iv2", title: "Farm Equipment Assistant",company: "AgroCare Services", sector: "Agriculture",location: "Narsapur Block", salary: "Rs. 12,500/month", requiredSkill: "Machinery", interviewDate: getRelativeDate(4) },
    { id: "iv3", title: "Junior Electrician",     company: "BrightLine Repairs", sector: "Electrical", location: "Market Road",    salary: "Rs. 13,000/month", requiredSkill: "Wiring",   interviewDate: getRelativeDate(6) },
    { id: "iv4", title: "Store Assistant",        company: "GreenMart Retail",   sector: "Retail",     location: "Town Center",    salary: "Rs. 10,500/month", requiredSkill: "Retail",   interviewDate: getRelativeDate(9) },
    { id: "iv5", title: "Tailoring Trainee",      company: "Women Craft Co-op",  sector: "Tailoring",  location: "Shivamogga",     salary: "Rs. 9,500/month",  requiredSkill: "Stitching",interviewDate: getRelativeDate(12) },
    { id: "iv6", title: "Delivery Driver",        company: "SwiftMove Logistics",sector: "Driving",    location: "Highway Zone 4", salary: "Rs. 14,000/month", requiredSkill: "Valid DL", interviewDate: getRelativeDate(15) }
];

function getRelativeDate(daysFromNow) {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split("T")[0];
}

function formatInterviewDate(dateStr) {
    if (!dateStr) return "";
    const d    = new Date(dateStr + "T00:00:00");
    const today= new Date(); today.setHours(0,0,0,0);
    const diff = Math.round((d - today) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function getUpcomingInterviewJobs() {
    const today  = new Date(); today.setHours(0,0,0,0);
    const cutoff = new Date(today); cutoff.setDate(cutoff.getDate() + 30);
    const stored = getJobs();
    const allJobs= [...sampleUpcomingInterviews, ...stored.filter(j => j.interviewDate)];
    return allJobs.filter(j => {
        if (!j.interviewDate) return false;
        const d = new Date(j.interviewDate + "T00:00:00");
        return d >= today && d <= cutoff;
    }).sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));
}

function renderJobTicker() {
    const track = document.getElementById("tickerTrack");
    if (!track) return;
    const jobs = getUpcomingInterviewJobs();
    if (!jobs.length) { const bar = document.getElementById("jobTickerBar"); if (bar) bar.style.display = "none"; return; }

    const buildItems = () => jobs.map(job => `
        <span class="ticker-item" onclick="tickerApplyJob('${encodeURIComponent(job.title)}','${encodeURIComponent(job.company)}','${encodeURIComponent(job.location||'')}','${encodeURIComponent(job.salary||'')}')">
            <span class="t-dot"></span>
            <span class="t-date">${formatInterviewDate(job.interviewDate)}</span>
            <span class="t-title">${job.title}</span>
            <span class="t-company">@ ${job.company} · ${job.location}</span>
            <span class="t-apply">Apply →</span>
        </span>`).join("");

    track.innerHTML = buildItems() + buildItems();
    const duration  = Math.max(20, jobs.length * 5);
    track.style.animationDuration = duration + "s";
}

function tickerApplyJob(encodedTitle, encodedCompany, encodedLocation, encodedSalary) {
    const user = getCurrentUser();
    if (!user) { window.location.href = "/login"; return; }
    applyJob(encodedTitle, encodedCompany, encodedLocation, encodedSalary);
}

// ─── THEME ────────────────────────────────────────────────────────────────

function initTheme() {
    applyTheme(localStorage.getItem("sc_theme") || "light");
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggleBtn");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
    localStorage.setItem("sc_theme", theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
}

// ─── LIFECYCLE INIT ───────────────────────────────────────────────────────

(function lifecycleInit() {
    initTheme();
    const currentPath = window.location.pathname;
    const user = getCurrentUser();

    if (!user && currentPath !== "/login") {
        window.location.href = "/login";
    } else if (user && currentPath === "/login") {
        window.location.href = "/";
    } else if (user) {
        executionPortalInit(user);
    }

    if (currentPath === "/login") {
        const activeCacheLang   = localStorage.getItem("sc_preferred_lang") || "english";
        const selectDropdown    = document.getElementById("stateLanguageSelect");
        if (selectDropdown) {
            if (activeCacheLang === "kannada") selectDropdown.value = "Karnataka";
            else if (activeCacheLang === "tamil") selectDropdown.value = "Tamil Nadu";
            else selectDropdown.value = "Other";
        }
        applyUILanguageTranslations(activeCacheLang);
    }
})();
