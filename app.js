const SHEETDB_URL = "https://sheetdb.io/api/v1/4d29m8yugi9d6";

const TEACHER_DATABASE = {
  "Computational Methods": [
    "Mr. Govind Gupta",
    "Dr. Neelam Kassarwani",
    "Dr. Sunil Kumar Pandey",
    "Dr. Ashok Goyal",
    "Dr. Ashwani Goel",
    "Dr. Nishu Gupta",
    "Dr. Anita Gupta",
    "Dr. Anil Kang",
    "Mr. Brahma Prakash",
    "Dr. Himanshu Arora",
    "Dr. Vandana Bagla",
    "Dr. Akanksha Rajpal",
    "Dr. Shefali Gupta",
    "Dr. Arti Kaushik",
    "Dr. Divya Jindal",
    "Dr. Ritu Arora",
    "Mr. Sheersh Kumar Garg",
    "Dr. Satish Kaushik",
    "Dr. Satish Verma",
    "Dr. Narender Kaushik",
    "Dr. Surbhi Lata",
    "Dr. Kanchan Mudgil",
  ],
  "Data Structures": [
    "Dr. Tina Dudeja",
    "Dr. Vinay Kumar Saini",
    "Dr. Karuna",
    "Dr. Prerna",
    "Dr. Neetu",
    "Dr. Nisha",
    "Ms. Savita",
    "Dr. Garima",
    "Dr. K.C. Tripathi",
    "Dr. Meenu Garg",
    "Dr. Vandana Choudhary",
    "Mr. Vibhor Sharma",
  ],
  "Object-Oriented Programming using C++": [
    "Dr. Nitin Garg",
    "Ms. Aneesha",
    "Dr. Sandeep",
    "Dr. Ajay Tiwari",
    "Ms. Kajol",
    "Ms. Divya Mishra",
    "Dr. Deepti",
    "Mr. Priyank Saxena",
    "Dr. Vasudha Bahl",
    "Dr. Amita Goel",
    "Dr. Bhaskar Kapoor",
  ],
  "Digital Logic and Computer Design": [
    "Dr. Nitin Sharma",
    "Dr. Anubha Goel",
    "Dr. Amit Saxena",
    "Mr. Rohit",
    "Dr. Sumedha Gupta",
    "Dr. Preeti Goel",
    "Ms. Monika Bhardwaj",
    "Mr. Vaibhav",
    "Dr. Javed Ahmad",
    "Mr. Binay Kumar Singh",
    "Dr. Neeraj",
    "Ms. Abhilasha Gokhale",
    "Dr. Divya Goel",
    "Dr. Kanika Aggarwal",
    "Mr. Praveen Kumar",
    "Ms. Jyoti Gupta",
    "Ms. Ayushi Agarwal",
    "Prof. Sunil Kumar",
    "Mr. Lalit Agarwal",
  ],
  "Discrete Mathematics": [
    "Dr. Divya Jindal",
    "Dr. Nitin Garg",
    "Dr. Shefali Gupta",
    "Dr. Akanksha Rajpal",
    "Ms. Divya Arora",
    "Ms. Divya Mishra",
    "Mr. Pawan",
    "Dr. Madhukar",
    "Dr. Deepika Bansal",
    "Ms. Vaishali",
    "Dr. Vandana Choudhary",
  ],
  "Signals and Systems": [
    "Dr. Rajni",
    "Dr. Kanika Aggarwal",
    "Ms. Ayushi Agarwal",
    "Dr. Nitin Sharma",
    "Prof. Madan Lal Sharma",
    "Ms. Supriya Sharma",
  ],
  "Analog Electronics-I": [
    "Dr. Sumanta Kumar Kundu",
    "Dr. Javed Ahmad",
    "Prof. Radhey Shyam Gupta",
    "Dr. Neeraj",
    "Dr. Umesh Singh",
    "Dr. Jitender Kumar",
  ],
  "Analog Communications": [
    "Mr. Ajay Kumar Garg",
    "Prof. Madan Lal Sharma",
    "Dr. Preeti Goel",
    "Dr. Kanika Aggarwal",
    "Ms. Shalu Garg",
  ],
  "Electrical Materials": ["Mr. Ashok Goyal"],
  "Electromagnetic Field Theory": ["Dr. Sunil Kumar Pandey"],
  "Electrical Machines - I": ["Dr. Rajveer Mittal"],
  "Electrical Engineering Workshop": ["Mr. Rahul Garg"],
  "Theory of Machines": ["Dr. Vikas Acharya"],
  "Strength of Materials": ["Dr. Vaibhav Jain"],
  "Thermal Engineering-I": ["Dr. Deshdeep Gambhir"],
  "Manufacturing Science and Technology-I": ["Dr. Vipin Kumar Sharma"],
};

// Global App State
let currentUser = null;
let currentRole = "student"; // "student" or "teacher"
let currentView = "feed"; // "feed", "myUploads", "teacherQueue", "community"
let cachedResources = [];
let cachedComments = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const session = localStorage.getItem("maitrix_session");
  if (session) {
    currentUser = JSON.parse(session);
    currentRole = currentUser.role;
    showAppLayout();
  }

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderCurrentView();
    });
  }

  const subjectFilter = document.getElementById("subjectFilter");
  if (subjectFilter) {
    subjectFilter.addEventListener("change", () => {
      renderCurrentView();
    });
  }
});

function continueAsGuest() {
  currentUser = {
    id: "guest",
    name: "Guest Visitor",
    role: "guest",
    subject: "",
  };
  showAppLayout();
}

// AUTHENTICATION LOGIC
function switchAuthRole(role) {
  currentRole = role;
  document
    .getElementById("tabStudent")
    .classList.toggle("active", role === "student");
  document
    .getElementById("tabTeacher")
    .classList.toggle("active", role === "teacher");

  document.getElementById("formTitle").innerText =
    role === "student" ? "Student Login" : "Faculty Login";
  document.getElementById("signupTitle").innerText =
    role === "student" ? "Student Registration" : "Faculty Registration";
  document.getElementById("userIdLabel").innerText =
    role === "student" ? "Enrollment Number" : "Faculty ID";
  document.getElementById("regIdLabel").innerText =
    role === "student" ? "Enrollment Number" : "Faculty ID";

  const loginInput = document.getElementById("loginId");
  const regIdInput = document.getElementById("regId");
  const regNameInput = document.getElementById("regName");

  if (role === "teacher") {
    if (loginInput) loginInput.placeholder = "e.g.OOPS-00026";
    if (regIdInput) regIdInput.placeholder = "e.g.OOPS-00026";
    if (regNameInput) regNameInput.placeholder = "e.g. Dr.Nisha";
  } else {
    if (loginInput) loginInput.placeholder = "e.g. 00014802725";
    if (regIdInput) regIdInput.placeholder = "e.g. 00014802725";
    if (regNameInput) regNameInput.placeholder = "e.g. Vansh Garg";
  }

  const teacherGroup = document.getElementById("teacherSubjectGroup");
  const teacherSecurity = document.getElementById("teacherSecurityGroup");
  if (role === "teacher") {
    teacherGroup.classList.remove("hidden");
    teacherSecurity.classList.remove("hidden");
  } else {
    teacherGroup.classList.add("hidden");
    teacherSecurity.classList.add("hidden");
  }
}

function toggleAuthMode(mode) {
  document
    .getElementById("loginForm")
    .classList.toggle("hidden", mode === "signup");
  document
    .getElementById("signupForm")
    .classList.toggle("hidden", mode === "login");
}

async function handleLogin(e) {
  e.preventDefault();
  const id = document.getElementById("loginId").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  try {
    const res = await fetch(
      `${SHEETDB_URL}/search?sheet=users&id=${encodeURIComponent(id)}&role=${currentRole}`,
    );
    const data = await res.json();

    if (data.length > 0 && data[0].password === pass) {
      currentUser = data[0];
      localStorage.setItem("maitrix_session", JSON.stringify(currentUser));
      showAppLayout();
    } else {
      alert("Invalid ID or Password for the selected role.");
    }
  } catch (err) {
    alert("Connection to SheetDB failed. Check your API URL.");
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const id = document.getElementById("regId").value.trim();
  const pass = document.getElementById("regPass").value.trim();
  const subject = document.getElementById("regSubject").value;

  if (currentRole === "teacher") {
    const enteredCode = document
      .getElementById("facultySecretCode")
      .value.trim();

    if (!subject) {
      alert("Please select your assigned 3rd semester subject.");
      return;
    }

    if (!enteredCode) {
      alert("Please enter the Department Security Code.");
      return;
    }

    try {
      // Query the config sheet tab for the faculty passkey
      const configRes = await fetch(
        `${SHEETDB_URL}/search?sheet=config&key=faculty_passkey`,
      );
      const configData = await configRes.json();

      if (
        !configData ||
        configData.length === 0 ||
        configData[0].value !== enteredCode
      ) {
        alert(
          "Access Denied: Invalid Department Security Code. Check with your department coordinator.",
        );
        return;
      }
    } catch (err) {
      alert(
        "Could not verify department credentials. Please check SheetDB connection.",
      );
      return;
    }
  }

  const payload = {
    id: id,
    name: name,
    role: currentRole,
    password: pass,
    subject: currentRole === "teacher" ? subject : "",
  };

  try {
    await fetch(`${SHEETDB_URL}?sheet=users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [payload] }),
    });

    currentUser = payload;
    localStorage.setItem("maitrix_session", JSON.stringify(currentUser));
    showAppLayout();
  } catch (err) {
    alert("Registration failed. Please check your network and SheetDB setup.");
  }
}

function logout() {
  localStorage.removeItem("maitrix_session");
  currentUser = null;
  document.getElementById("appLayout").classList.add("hidden");
  document.getElementById("authSection").classList.remove("hidden");
}

function showAppLayout() {
  document.getElementById("authSection").classList.add("hidden");
  document.getElementById("appLayout").classList.remove("hidden");

  document.getElementById("userNameDisplay").innerText = currentUser.name;
  document.getElementById("userAvatar").innerText = currentUser.name
    .charAt(0)
    .toUpperCase();

  const isTeacher = currentUser.role === "teacher";
  const isGuest = currentUser.role === "guest";

  if (isGuest) {
    document.getElementById("roleTag").innerText = "Guest Mode (Read Only)";
    document.getElementById("userRoleDisplay").innerText = "Visitor • Browsing";
    document.getElementById("uploadSidePanel").style.display = "none";
    document.getElementById("navTeacherQueue").style.display = "none";
    document.getElementById("navMyUploads").style.display = "none";
  } else if (isTeacher) {
    document.getElementById("roleTag").innerText = "Faculty Mode";
    document.getElementById("userRoleDisplay").innerText =
      `Faculty • ${currentUser.subject}`;
    document.getElementById("uploadSidePanel").style.display = "none";
    document.getElementById("navTeacherQueue").style.display = "block";
    document.getElementById("navMyUploads").style.display = "none";
    if (currentUser.subject) {
      document.getElementById("subjectFilter").value = currentUser.subject;
    }
  } else {
    document.getElementById("roleTag").innerText = "Student Mode";
    document.getElementById("userRoleDisplay").innerText = "Student • 3rd Sem";
    document.getElementById("uploadSidePanel").style.display = "block";
    document.getElementById("navTeacherQueue").style.display = "none";
    document.getElementById("navMyUploads").style.display = "block";
  }

  fetchInitialData();
}

// DATA FETCHING & RENDERING
async function fetchInitialData() {
  try {
    const [resResp, comResp] = await Promise.all([
      fetch(`${SHEETDB_URL}?sheet=resources`),
      fetch(`${SHEETDB_URL}?sheet=comments`),
    ]);

    cachedResources = await resResp.json();
    cachedComments = await comResp.json();
    renderCurrentView();
  } catch (err) {
    console.error("Error pulling data from SheetDB:", err);
  }
}

function setView(view) {
  currentView = view;
  document
    .querySelectorAll(".nav-link")
    .forEach((el) => el.classList.remove("active"));

  const filterBar = document.getElementById("filterBar");
  const communityView = document.getElementById("communityView");
  const feedStream = document.getElementById("feedStream");

  if (view === "community") {
    filterBar.classList.add("hidden");
    feedStream.classList.add("hidden");
    communityView.classList.remove("hidden");
    renderCommunities();
  } else {
    filterBar.classList.remove("hidden");
    feedStream.classList.remove("hidden");
    communityView.classList.add("hidden");
    renderCurrentView();
  }
}

function resetToFeed() {
  if (!currentUser) return;

  // Reset filter dropdown and search input
  const subjectFilter = document.getElementById("subjectFilter");
  const searchInput = document.getElementById("searchInput");

  if (subjectFilter) subjectFilter.value = "all";
  if (searchInput) searchInput.value = "";

  // Switch to the academic feed
  setView("feed");
}

function renderCurrentView() {
  const container = document.getElementById("feedStream");
  const selectedSubject = document.getElementById("subjectFilter").value;
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  let filtered = [...cachedResources];

  // View-specific filtering
  if (currentView === "myUploads") {
    filtered = filtered.filter((item) => item.uploader_id === currentUser.id);
  } else if (currentView === "teacherQueue") {
    filtered = filtered.filter(
      (item) =>
        item.subject === currentUser.subject && item.status === "pending",
    );
  }

  // Dropdown filter
  if (selectedSubject !== "all") {
    filtered = filtered.filter((item) => item.subject === selectedSubject);
  }

  // Search filter: Checks title, subject, uploader, tagged faculty, AND verifying faculty
  if (searchQuery) {
    filtered = filtered.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(searchQuery)) ||
        (item.subject && item.subject.toLowerCase().includes(searchQuery)) ||
        (item.uploader_name &&
          item.uploader_name.toLowerCase().includes(searchQuery)) ||
        (item.teacher && item.teacher.toLowerCase().includes(searchQuery)) ||
        (item.verified_by &&
          item.verified_by.toLowerCase().includes(searchQuery)),
    );
  }

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px; background: white; border-radius: 8px; color: #64748b;">
        <p style="font-weight: 600;">No submissions found for this filter.</p>
      </div>`;
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    const isExpert = item.status === "expert" || item.status === "verified";
    const isFlagged = item.status === "flagged";

    card.className = `resource-card ${isExpert ? "expert-card" : isFlagged ? "flagged-card" : ""}`;

    // Status Badge showing endorsing faculty name if verified
    let statusBadge = `<span class="badge badge-tag">Community Submission</span>`;
    if (isExpert) {
      const endorserName = item.verified_by || item.teacher || "Faculty";
      statusBadge = `<span class="badge badge-verified">★ Faculty Endorsed (${endorserName})</span>`;
    }
    if (isFlagged) {
      statusBadge = `<span class="badge badge-caution">⚠️ Review Warning</span>`;
    }

    // Faculty Annotation
    let annotationHTML = "";
    if (item.teacher_note) {
      const annotator = item.verified_by || item.teacher || "Faculty Review";
      annotationHTML = `
        <div class="faculty-annotation ${isFlagged ? "caution-box" : ""}">
          <div class="annotation-badge">${annotator}</div>
          <p class="annotation-text">"${item.teacher_note}"</p>
        </div>`;
    }

    // Teacher Review Options
    let teacherControls = "";
    if (currentUser && currentUser.role === "teacher") {
      teacherControls = `
    <div class="teacher-actions">
      ${
        isExpert
          ? `<button class="btn btn-small btn-outline" onclick="revokeExpert('${item.id}')">↩ Revoke Expert</button>`
          : `<button class="btn btn-small btn-secondary" onclick="endorseNote('${item.id}')">★ Mark Expert</button>`
      }
      <button class="btn btn-small btn-warning" onclick="promptFlag('${item.id}')">Highlight Error</button>
      <button class="btn btn-small btn-danger" onclick="deleteResource('${item.id}')">Remove Post</button>
    </div>`;
    }

    // Student Delete Button (Only on their own uploads)
    let studentControls = "";
    if (currentUser.role === "student" && item.uploader_id === currentUser.id) {
      studentControls = `
        <button class="btn btn-danger btn-small" onclick="deleteResource('${item.id}')">Delete My Post</button>`;
    }

    // Comments for this card
    const cardComments = cachedComments.filter(
      (c) => c.resource_id === item.id,
    );
    const commentsListHTML = cardComments
      .map(
        (c) => `
      <div class="comment-bubble">
        <strong>${c.user_name}</strong>: ${c.text}
      </div>`,
      )
      .join("");

    card.innerHTML = `
      <div class="card-header">
        <div class="badge-row">
          ${statusBadge}
          <span class="badge badge-tag">${item.subject}</span>
        </div>
        ${studentControls}
      </div>

      <h2 class="card-title">${item.title}</h2>
      <p class="card-uploader">Uploaded by <strong>${item.uploader_name}</strong> • Tagged Faculty: <strong>${item.teacher || "Open Review"}</strong></p>

      <div class="doc-link-box">
        <span>📄 Verified Document Link</span>
        <a href="${item.link}" target="_blank" class="btn btn-outline btn-small">Open File</a>
      </div>

      ${annotationHTML}
      ${teacherControls}

      <div class="comments-section">
        <div class="comments-list" id="comm-list-${item.id}">
          ${commentsListHTML}
        </div>
        <div class="comment-entry">
          <input type="text" id="comm-input-${item.id}" placeholder="Ask a question or discuss this note...">
          <button class="btn btn-small btn-secondary" onclick="postComment('${item.id}')">Send</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// DYNAMIC TEACHER POPULATION FOR UPLOADS
function populateTeachers() {
  const subject = document.getElementById("uploadSubject").value;
  const teacherSelect = document.getElementById("uploadTeacher");
  teacherSelect.innerHTML = `<option value="">-- Choose Faculty In-Charge --</option>`;

  if (subject && TEACHER_DATABASE[subject]) {
    TEACHER_DATABASE[subject].forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.innerText = name;
      teacherSelect.appendChild(opt);
    });
  }
}

// UPLOAD HANDLING (POST TO SHEETDB)
async function handleUpload(e) {
  e.preventDefault();
  const btn = document.getElementById("btnUploadSubmit");
  btn.disabled = true;
  btn.innerText = "Publishing to SheetDB...";

  const newResource = {
    id: "res_" + Date.now(),
    title: document.getElementById("uploadTitle").value.trim(),
    subject: document.getElementById("uploadSubject").value,
    teacher: document.getElementById("uploadTeacher").value,
    uploader_id: currentUser.id,
    uploader_name: currentUser.name,
    link: document.getElementById("uploadLink").value.trim(),
    status: "pending",
    teacher_note: "",
    upvotes: "0",
  };

  try {
    await fetch(`${SHEETDB_URL}?sheet=resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [newResource] }),
    });

    cachedResources.unshift(newResource);
    document.getElementById("uploadForm").reset();
    renderCurrentView();
    alert("Resource posted successfully to Google Sheets!");
  } catch (err) {
    alert("Failed to save resource. Check SheetDB connection.");
  } finally {
    btn.disabled = false;
    btn.innerText = "Post to Feed";
  }
}

// MODERATION ACTIONS (PATCH TO SHEETDB)
async function updateStatus(id, newStatus, note = "") {
  try {
    await fetch(`${SHEETDB_URL}/id/${id}?sheet=resources`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { status: newStatus, teacher_note: note },
      }),
    });

    const item = cachedResources.find((r) => r.id === id);
    if (item) {
      item.status = newStatus;
      item.teacher_note = note;
    }
    renderCurrentView();
  } catch (err) {
    alert("Error updating status via SheetDB.");
  }
}

function promptFlag(id) {
  const note = prompt(
    "Enter specific correction guidance or caution message for students:",
  );
  if (note && note.trim()) {
    updateStatus(id, "flagged", note.trim());
  }
}

async function revokeExpert(id) {
  const item = cachedResources.find((r) => r.id === id);
  if (!item) return;

  const confirmRevoke = confirm("Revoke expert endorsement for this note?");
  if (!confirmRevoke) return;

  // 1. Optimistic Local State Update
  item.status = "pending";
  item.verified_by = "";
  item.teacher_note = "";

  renderCurrentView();

  // 2. Sync to Google Sheets via SheetDB
  try {
    await fetch(`${SHEETDB_URL}/id/${id}?sheet=resources`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          status: "pending",
          verified_by: "",
          teacher_note: "",
        },
      }),
    });
  } catch (err) {
    console.error("Failed to revoke expert status:", err);
  }
}

async function endorseNote(id) {
  const item = cachedResources.find((r) => r.id === id);
  if (!item) return;

  if (!currentUser || currentUser.role !== "teacher") {
    alert("Only verified faculty members can endorse notes.");
    return;
  }

  const feedbackText = prompt(
    "Enter an optional recommendation note (or click OK to proceed):",
    "Endorsed for 3rd Sem syllabus",
  );
  if (feedbackText === null) return; // Student/Teacher hit Cancel

  const noteMessage = feedbackText.trim() || "Endorsed for 3rd Sem syllabus";

  // 1. Optimistic Local State Update
  item.status = "verified";
  item.verified_by = currentUser.name;
  item.teacher_note = noteMessage;

  renderCurrentView();

  // 2. Sync to Google Sheets via SheetDB
  try {
    await fetch(`${SHEETDB_URL}/id/${id}?sheet=resources`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          status: "verified",
          verified_by: currentUser.name,
          teacher_note: noteMessage,
        },
      }),
    });
  } catch (err) {
    console.error("Endorsement failed:", err);
  }
}

// DELETION (DELETE FROM SHEETDB)
async function deleteResource(id) {
  if (
    !confirm(
      "Are you sure you want to permanently delete this resource from the database?",
    )
  )
    return;

  try {
    await fetch(`${SHEETDB_URL}/id/${id}?sheet=resources`, {
      method: "DELETE",
    });

    cachedResources = cachedResources.filter((r) => r.id !== id);
    renderCurrentView();
  } catch (err) {
    alert("Failed to delete record from Google Sheets.");
  }
}

// COMMENTS (POST TO SHEETDB)
async function postComment(resourceId) {
  if (currentUser.role === "guest") {
    alert("Please sign in or create an account to post comments.");
    return;
  }

  const input = document.getElementById(`comm-input-${resourceId}`);
  const text = input.value.trim();
  if (!text) return;

  const newComment = {
    id: "com_" + Date.now(),
    resource_id: resourceId,
    user_name: currentUser.name,
    text: text,
    timestamp: new Date().toLocaleDateString(),
  };

  try {
    await fetch(`${SHEETDB_URL}?sheet=comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [newComment] }),
    });

    cachedComments.push(newComment);
    input.value = "";
    renderCurrentView();
  } catch (err) {
    alert("Comment could not be sent.");
  }
}

// COMMUNITIES VIEW
function renderCommunities() {
  const grid = document.getElementById("communityGrid");
  grid.innerHTML = "";

  Object.keys(TEACHER_DATABASE).forEach((subj) => {
    const card = document.createElement("div");
    card.className = "community-card";
    const count = cachedResources.filter((r) => r.subject === subj).length;

    card.innerHTML = `
      <h4>${subj}</h4>
      <p>${count} Shared Resources</p>
      <p style="color: var(--accent-blue); margin-top: 6px; font-weight: 600;">Open Hub &rarr;</p>
    `;
    card.onclick = () => {
      document.getElementById("subjectFilter").value = subj;
      setView("feed");
    };
    grid.appendChild(card);
  });
}

function handleSearch() {
  renderCurrentView();
}
