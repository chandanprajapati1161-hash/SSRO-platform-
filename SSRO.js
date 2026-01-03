// LocalStorage keys
const USER_KEY = "ssro_user";
const LOGGED_IN_KEY = "ssro_logged_in";
const SAVED_CONTENT_KEY = "ssro_saved_content";
const DOWNLOADED_CONTENT_KEY = "ssro_downloaded_content";

// Elements
const authModal = document.getElementById("authModal");
const authOverlay = document.getElementById("authOverlay");
const authCloseBtn = document.getElementById("authCloseBtn");

const openAuthBtn = document.getElementById("openAuthBtn");
const openAuthBtnMobile = document.getElementById("openAuthBtnMobile");

const registerTabBtn = document.getElementById("registerTabBtn");
const loginTabBtn = document.getElementById("loginTabBtn");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const authStatus = document.getElementById("authStatus");

const switchToLogin = document.getElementById("switchToLogin");
const switchToRegister = document.getElementById("switchToRegister");

const googleLoginBtn = document.getElementById("googleLoginBtn");

// Profile
const profileModal = document.getElementById("profileModal");
const profileOverlay = document.getElementById("profileOverlay");
const profileCloseBtn = document.getElementById("profileCloseBtn");
const profileInfo = document.getElementById("profileInfo");
const profileViewBtn = document.getElementById("profileViewBtn");

// Search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchIconMobile = document.getElementById("searchIconMobile");

// Feedback
const feedbackForm = document.getElementById("feedbackForm");
const feedbackText = document.getElementById("feedbackText");
const feedbackStatus = document.getElementById("feedbackStatus");

const footerFeedbackBtnDesktop = document.getElementById("footerFeedbackBtnDesktop");
const footerFeedbackBtnMobile = document.getElementById("footerFeedbackBtnMobile");

// Content
const contentCards = document.querySelectorAll(".content-card");
const saveButtons = document.querySelectorAll(".save-btn");
const downloadButtons = document.querySelectorAll(".download-btn");
const savedList = document.getElementById("savedList");
const downloadedList = document.getElementById("downloadedList");

// Dropdown nav
const navItems = document.querySelectorAll(".nav-item.dropdown");

/* Utility */

function isLoggedIn() {
    return localStorage.getItem(LOGGED_IN_KEY) === "true";
}

function getUser() {
    const data = localStorage.getItem(USER_KEY);
    if (!data) return null;
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}

function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function openModal(showLogin = false) {
    authModal.classList.add("show");
    document.body.style.overflow = "hidden";

    if (showLogin) {
        setLoginActive();
    } else {
        setRegisterActive();
    }
}

function closeModal() {
    authModal.classList.remove("show");
    document.body.style.overflow = "";
    authStatus.textContent = "";
}

function setRegisterActive() {
    registerTabBtn.classList.add("active");
    loginTabBtn.classList.remove("active");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
}

function setLoginActive() {
    loginTabBtn.classList.add("active");
    registerTabBtn.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
}

function ensureLoggedIn(actionCallback) {
    if (isLoggedIn()) {
        actionCallback();
    } else {
        openModal(false);
        authStatus.textContent = "Please create account or login to use this feature.";
        authStatus.style.color = "#f97373";
    }
}

/* Profile modal helpers */

function openProfileModal() {
    const user = getUser();
    profileModal.classList.add("show");
    document.body.style.overflow = "hidden";

    if (!user) {
        profileInfo.innerHTML = "<p>No profile found. Please register or login first.</p>";
        return;
    }

    profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Qualification:</strong> ${user.qualification}</p>
    `;
}

function closeProfileModal() {
    profileModal.classList.remove("show");
    document.body.style.overflow = "";
}

/* Saved/Downloaded helpers */

function getSavedContent() {
    const data = localStorage.getItem(SAVED_CONTENT_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function setSavedContent(list) {
    localStorage.setItem(SAVED_CONTENT_KEY, JSON.stringify(list));
}

function getDownloadedContent() {
    const data = localStorage.getItem(DOWNLOADED_CONTENT_KEY);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function setDownloadedContent(list) {
    localStorage.setItem(DOWNLOADED_CONTENT_KEY, JSON.stringify(list));
}

function getContentMeta(contentId) {
    const card = document.querySelector(
        `.content-card .save-btn[data-content-id="${contentId}"]`
    )?.closest(".content-card") ||
        document.querySelector(
            `.content-card .download-btn[data-content-id="${contentId}"]`
        )?.closest(".content-card");

    if (!card) return null;

    const title = card.querySelector(".content-title")?.textContent.trim() || contentId;
    const desc = card.querySelector(".content-body p")?.textContent.trim() || "";
    return { id: contentId, title, desc };
}

function renderSavedAndDownloaded() {
    const saved = getSavedContent();
    const downloaded = getDownloadedContent();

    if (savedList) {
        savedList.innerHTML = "";
        if (saved.length === 0) {
            savedList.innerHTML = "<li>No saved content yet.</li>";
        } else {
            saved.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.title || item.id;
                savedList.appendChild(li);
            });
        }
    }

    if (downloadedList) {
        downloadedList.innerHTML = "";
        if (downloaded.length === 0) {
            downloadedList.innerHTML = "<li>No downloaded content yet.</li>";
        } else {
            downloaded.forEach((item) => {
                const li = document.createElement("li");
                li.textContent = item.title || item.id;
                downloadedList.appendChild(li);
            });
        }
    }
}

/* Auth events */

// Open modal
if (openAuthBtn) {
    openAuthBtn.addEventListener("click", () => openModal(false));
}

if (openAuthBtnMobile) {
    openAuthBtnMobile.addEventListener("click", () => openModal(false));
}

// Close modal
if (authOverlay) {
    authOverlay.addEventListener("click", closeModal);
}
if (authCloseBtn) {
    authCloseBtn.addEventListener("click", closeModal);
}

// Tabs switch
if (registerTabBtn && loginTabBtn) {
    registerTabBtn.addEventListener("click", () => {
        setRegisterActive();
        authStatus.textContent = "";
    });

    loginTabBtn.addEventListener("click", () => {
        setLoginActive();
        authStatus.textContent = "";
    });
}

if (switchToLogin) {
    switchToLogin.addEventListener("click", () => {
        setLoginActive();
        authStatus.textContent = "";
    });
}

if (switchToRegister) {
    switchToRegister.addEventListener("click", () => {
        setRegisterActive();
        authStatus.textContent = "";
    });
}

// Register submit
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const qualification = document.getElementById("regQualification").value.trim();

        if (!name || !email || !password || !qualification) {
            authStatus.textContent = "All fields are required.";
            authStatus.style.color = "#f97373";
            return;
        }

        const user = { name, email, password, qualification };
        saveUser(user);
        localStorage.setItem(LOGGED_IN_KEY, "true");

        authStatus.textContent = "Account created and logged in successfully.";
        authStatus.style.color = "#4ade80";

        setTimeout(() => {
            closeModal();
        }, 900);
    });
}

// Login submit
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        const saved = getUser();

        if (!saved || email !== saved.email || password !== saved.password) {
            authStatus.textContent = "Wrong email or password.";
            authStatus.style.color = "#f97373";
            return;
        }

        localStorage.setItem(LOGGED_IN_KEY, "true");
        authStatus.textContent = "Login successful.";
        authStatus.style.color = "#4ade80";

        setTimeout(() => {
            closeModal();
        }, 900);
    });
}

// Google login (front-end only: just auto-login demo)
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
        let user = getUser();
        if (!user) {
            user = {
                name: "Google User",
                email: "googleuser@example.com",
                password: "",
                qualification: "Student"
            };
            saveUser(user);
        }
        localStorage.setItem(LOGGED_IN_KEY, "true");
        authStatus.textContent = "Logged in with Google (demo).";
        authStatus.style.color = "#4ade80";

        setTimeout(() => {
            closeModal();
        }, 900);
    });
}

/* Profile modal events */

if (profileViewBtn) {
    profileViewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProfileModal();
    });
}

if (profileOverlay) {
    profileOverlay.addEventListener("click", closeProfileModal);
}
if (profileCloseBtn) {
    profileCloseBtn.addEventListener("click", closeProfileModal);
}

/* Navbar dropdown open/close */

navItems.forEach((item) => {
    const btn = item.querySelector(".nav-link");

    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("open");

        navItems.forEach((it) => it.classList.remove("open"));

        if (!isOpen) {
            item.classList.add("open");
        }
    });
});

// Close dropdowns on document click
document.addEventListener("click", () => {
    navItems.forEach((it) => it.classList.remove("open"));
});

/* Navbar dropdown content filter */

document.querySelectorAll(".dropdown-link").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const section = btn.getAttribute("data-section");
        if (!section) return;

        // Profile view handled separately
        if (section === "profile-view") {
            openProfileModal();
            return;
        }

        contentCards.forEach((card) => {
            const sec = card.getAttribute("data-section");
            if (!sec) return;
            card.style.display = sec === section ? "flex" : "none";
        });
    });
});

/* Search */

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase().trim();
        filterContentBySearch(query);
    });

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const query = searchInput.value.toLowerCase().trim();
            filterContentBySearch(query);
        }
    });
}

// Mobile search icon: prompt based simple search
if (searchIconMobile) {
    searchIconMobile.addEventListener("click", () => {
        const q = prompt("Search content:");
        if (q !== null) {
            filterContentBySearch(q.toLowerCase().trim());
        }
    });
}

function filterContentBySearch(query) {
    if (!query) {
        contentCards.forEach((card) => (card.style.display = "flex"));
        return;
    }

    contentCards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? "flex" : "none";
    });
}

/* Save & Download (require login) */

// Save buttons
saveButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const contentId = btn.getAttribute("data-content-id");
        if (!contentId) return;

        ensureLoggedIn(() => {
            const meta = getContentMeta(contentId);
            if (!meta) {
                alert("Content not found.");
                return;
            }

            let list = getSavedContent();
            if (!list.find((it) => it.id === meta.id)) {
                list.push(meta);
                setSavedContent(list);
                renderSavedAndDownloaded();
            }
            alert("Content saved to your account.");
        });
    });
});

// Download buttons
downloadButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const contentId = btn.getAttribute("data-content-id");
        if (!contentId) return;

        ensureLoggedIn(() => {
            const meta = getContentMeta(contentId);
            if (!meta) {
                alert("Content not found.");
                return;
            }

            // Add to downloaded list
            let list = getDownloadedContent();
            if (!list.find((it) => it.id === meta.id)) {
                list.push(meta);
                setDownloadedContent(list);
                renderSavedAndDownloaded();
            }

            const text = `Title: ${meta.title}

${meta.desc}

Downloaded from SSRO Student Portal.`;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${meta.title.replace(/s+/g, "_")}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    });
});

/* Feedback */

if (footerFeedbackBtnDesktop) {
    footerFeedbackBtnDesktop.addEventListener("click", () => {
        feedbackText.scrollIntoView({ behavior: "smooth", block: "center" });
        feedbackText.focus();
    });
}

if (footerFeedbackBtnMobile) {
    footerFeedbackBtnMobile.addEventListener("click", () => {
        feedbackText.scrollIntoView({ behavior: "smooth", block: "center" });
        feedbackText.focus();
    });
}

if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = feedbackText.value.trim();
        if (!text) {
            feedbackStatus.textContent = "Please write some feedback.";
            feedbackStatus.style.color = "#f97373";
            return;
        }
        feedbackStatus.textContent = "Thank you for your feedback!";
        feedbackStatus.style.color = "#4ade80";
        feedbackText.value = "";
    });
}

/* Initial render of saved/downloaded on page load */

renderSavedAndDownloaded();
