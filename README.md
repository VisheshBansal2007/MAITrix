**MAITrix** | Academic Exchange & Review Portal
---

**"Where student effort meets faculty guidance"**<br>
A lightweight, community-driven academic platform engineered for engineering students and department faculty to share, verify, and review semester study materials.

---

**Built for MAITron 2026 Hackathon**

- [Working MVP/Prototype](https://visheshbansal2007.github.io/MAITrix/)<br>
- [Video Demo](https://drive.google.com/file/d/1eooFGMePLjYkxTGjlAFxGFIAzunJkSvU/view?usp=sharing)<br>

---

**HACKATHON DETAILS (MAITRON 2026)**

- **Track**:Software<br>
- **Selected Themes**:Open Spectrum<br>
&nbsp;&nbsp; **SDG 4**: Quality Education<br>
&nbsp;&nbsp; **SDG 10**: Reduced Inequalities<br>
- **Team Name**: codeAgrasen<br>
- **Team Leader**: Vishesh Bansal<br>
- **Team Members**: Rakshit, Kanak Aggarwal, Shreya Sharma

---

**THE CORE PROBLEM - ACADEMIC CHAOS**

- Messy Drive Links & WhatsApp Groups<br>
- The "Blind Trust" Trap<br>
- Faculty Disconnection<br>
- Artificial Intelligence hallucination

---

**THE PROPOSED SOLUTION - MAITrix**

- **Student Dashboard** : Frictionless access to browse, search, and download curriculum-mapped materials across all 8 semesters.<br>
- **Faculty/Expert Marking**: faculty portal to remove, mark expert, or flag uploads with specific correction guidance.<br>
- **Peer Community & Karma Mentorship**: A cashless merit ecosystem rewarding top-contributing students with peer-to-peer mentorship opportunities.

---

**STUDENT DASHBOARD FEATURES**

- Search Bar<br>
- Semester & Branch Filtering<br>
- Upload & View<br>
- Top Contributors<br>
- Subject-Wise Communities<br>
- Comments on Every Upload<br>
- Public Guest View<br>

---

**FACULTY DASHBOARD FEATURES**

- Verified Email Gateway<br>
- Smart subject feed<br>
- Quick Tabs<br>
- Search Bar<br>
- Mark as Expert<br>
- Highlight Error<br>
- Remove Upload<br>
- Full Reversibility

---

**Tech Stack**

- **Frontend**:HTML,CSS,JavaScript<br>
- **Responsive Layer**: Mobile-first sliding drawer navigation with custom CSS<br>
- **Database & Persistence**: Google Sheets managed via SheetDB REST API<br>
- **Hosting**: GitHub Pages

---

**PLATFORM VISION AND FUTURE EXPANSION**

- Karma points as Campus Credit<br>
- Visual Learning & Direct DMs<br>
- Next-Gen AI Academic Assistant<br>
- Institutional Scalability

---

**Database Architecture (Google Sheets via SheetDB)**-The platform manages its database across four dedicated sheets:

| Sheet Name | Purpose | Key Attributes |
| :--- | :--- | :--- |
| `resources` | Study material uploads and review states | `id`, `title`, `subject`, `teacher`,    `uploader_id`,`uploader_name`, `link`, `status`, `teacher_note`,`upvotes`,`verified_by` |
| `users` | Role accounts and subject assignments | `id`, `name`, `role`, `password`, `subject` |
| `comments` | Threaded discussions under uploads | `id`, `resource_id`, `user_name`, `text`, `subject` |
| `config` | Administrative security and passkeys | `key`, `value` |

---

**Local Setup & Installation**-Running MAITrix locally requires no complex runtime configurations, databases, or npm dependencies.

**Prerequisites**<br>
- Any modern web browser (Chrome, Edge, Firefox, Safari)<br>
- Code editor like VS Code (with the Live Server extension recommended)<br>
- Git installed on your computer

**STEPS**

1.**Clone the repository:**

```
Bash

git clone https://github.com/VisheshBansal2007/MAITrix.git
cd MAITrix
```

2.**Open the project folder:**

```
Bash
code .
```

3.**Launch the application**:Right-click index.html inside the VS Code Explorer and click Open with Live Server.

4.**Verify Database Connection**:The app will automatically connect to your configured SheetDB backend upon launch.
Open the browser console (F12) to verify successful resource fetches from Google Sheets.

5.**Deploy via GitHub Pages** after pushing your latest code changes to your repository's main branch.

---

**Contributing & Forking**

Because the default SheetDB backend is origin-locked strictly to the production deployment (`https://visheshbansal2007.github.io`), local clones will encounter CORS restrictions by design.

To run or test changes locally with an active database:<br>
1.Create a free account at [SheetDB.io](https://sheetdb.io).<br>
2.Connect your own Google Sheet using the schema outlined in the Database Architecture section.<br>
3.Replace the SHEETDB_URL constant in app.js with your personal endpoint.

---

**Authors & Acknowledgments**

Developed by **Team codeAgrasen**<br>
Lead Architect & Developer - **Vishesh Bansal**<br>
for **MAITron 2026**. Special thanks to the faculty mentors and student peers who provided feedback during testing.
<br>

---

