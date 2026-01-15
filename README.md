# Learn2Excel
**Learn2Excel – Online Skill Development Platform** Built a responsive UI with HTML, CSS, and JavaScript. Developed interactive pages like Login, Signup, and Quiz Dashboard with real-time feedback and form validation. Integrated a simple game into the platform to improve user engagement and learning experience. 

<img width="1911" height="731" alt="Screenshot 2026-01-04 134956" src="https://github.com/user-attachments/assets/3662ddae-21fd-405a-8b50-7b3f5cef6b55" />
<img width="1919" height="652" alt="Screenshot 2026-01-04 135017" src="https://github.com/user-attachments/assets/817b4a53-11dd-4feb-9447-3191011fb8f4" />
<img width="1901" height="803" alt="Screenshot 2026-01-04 135112" src="https://github.com/user-attachments/assets/99deb4a6-e6a4-4f24-873e-16a4f744a9fa" />
<img width="1907" height="770" alt="Screenshot 2026-01-04 135136" src="https://github.com/user-attachments/assets/b3a04701-58de-4ec6-b070-94f6074978d8" />
<img width="1903" height="915" alt="Screenshot 2026-01-04 135215" src="https://github.com/user-attachments/assets/68226321-42ce-4444-bb6c-cab2be9e8e9c" />
<img width="1894" height="912" alt="Screenshot 2026-01-04 135237" src="https://github.com/user-attachments/assets/5c2052d2-8a87-484a-91b0-16d4821592e6" />
<img width="1897" height="540" alt="Screenshot 2026-01-04 135324" src="https://github.com/user-attachments/assets/19e9b500-3d6d-4429-84e9-d668b3f65c1e" />
<img width="1894" height="780" alt="Screenshot 2026-01-04 135347" src="https://github.com/user-attachments/assets/85560eb9-9117-448e-9ded-00d22eb60fd9" />
<img width="1897" height="907" alt="Screenshot 2026-01-04 135410" src="https://github.com/user-attachments/assets/3cd70ce0-1bdd-4c67-b5b5-a70c8b491165" />
<img width="1902" height="893" alt="Screenshot 2026-01-04 135431" src="https://github.com/user-attachments/assets/8143e35d-06ed-44fa-8d1e-77c20e4b84f7" />
<img width="1890" height="906" alt="Screenshot 2026-01-04 135527" src="https://github.com/user-attachments/assets/c3d51e8f-b6ce-44e4-9eab-c0ad0e8a11b1" />
<img width="1904" height="903" alt="Screenshot 2026-01-04 135558" src="https://github.com/user-attachments/assets/160a1ecb-8fd5-4cb9-845a-aaf946ef8577" />
<img width="1915" height="908" alt="Screenshot 2026-01-04 135617" src="https://github.com/user-attachments/assets/7164d5e0-a847-4709-9304-a8e427ff2a28" />
<img width="1898" height="911" alt="Screenshot 2026-01-04 135703" src="https://github.com/user-attachments/assets/c02c5089-cb98-49cc-990a-51e6693b01c9" />
<img width="1911" height="891" alt="Screenshot 2026-01-04 135836" src="https://github.com/user-attachments/assets/796bc412-182a-4294-b46c-ec3f1e5075e6" />
<img width="1911" height="890" alt="Screenshot 2026-01-04 135927" src="https://github.com/user-attachments/assets/53dbf9d3-1ac8-41e7-8365-ff9587d41ff8" />


## Project Structure

```
learn2excel-project/
├── index.html                  # Main landing page
├── README.md                   # Project documentation
├── assets/                     # Static assets
│   ├── images/                 # All images (organized by category)
│   │   ├── logos/              # logo.png
│   │   ├── cooking/            # cooking.png, rice.png, dal.png, etc.
│   │   ├── farming/            # farming.jpg
│   │   ├── self-defense/       # selfdefence.png
│   │   ├── finance/            # finance.png
│   │   └── ui/                 # hero.png, c_hero.png, etc.
│   ├── css/                    # All CSS files
│   │   ├── main/               # style.css, Navbar.css, cooking.css
│   │   ├── modules/            # cook_m1.css, cook_m2.css, etc.
│   │   ├── quizzes/            # cook_q1.css, etc.
│   │   └── auth/               # Login/signup styles if separate
│   └── js/                     # All JavaScript files
│       ├── main/               # script.js
│       ├── modules/            # cook_m1.js, cook_m2.js, etc.
│       ├── quizzes/            # cook_q1.js, cook_q2.js, etc.
│       └── auth/               # Authentication scripts if any
├── pages/                      # Main application pages
│   ├── auth/                   # Authentication pages
│   │   ├── login.html
│   │   └── signup.html
│   ├── courses/                # Course landing pages
│   │   ├── cooking.html
│   │   ├── farming.html        # (when implemented)
│   │   ├── self-defense.html   # (when implemented)
│   │   └── finance.html        # (when implemented)
│   ├── planner.html            # Meal planner
│   └── quiz.html               # General quiz page
├── modules/                    # Course modules
│   └── cooking/                # Cooking course modules
│       ├── basics/             # Module 1
│       │   └── index.html      # cook_m1.html
│       ├── staples/            # Module 2
│       │   ├── index.html      # cook_m2.html
│       │   ├── rice.html       # cook_m2Rice.html
│       │   ├── dal.html        # cook_m2Daal.html
│       │   ├── roti.html       # cook_m2Roti.html
│       │   └── paratha.html    # cook_m2Paratha.html
│       ├── sides/              # Module 3 (Pickles, Chutneys, Raitas)
│       │   ├── index.html      # cook_m3.html
│       │   ├── chutneys.html   # cook_m3Chutneys.html
│       │   ├── pickles.html    # cook_m3Pickles.html
│       │   └── raitas.html     # cook_m3Raitas.html
│       ├── regional/           # Module 4
│       │   ├── index.html      # cook_m4.html
│       │   ├── north.html      # cook_m4North.html
│       │   ├── south.html      # cook_m4South.html
│       │   ├── east.html       # cook_m4East.html
│       │   └── west.html       # cook_m4West.html
│       ├── street-food/        # Module 5
│       │   ├── index.html      # cook_m5.html
│       │   ├── pani-puri.html  # cook_m5paniPuri.html
│       │   ├── pav-bhaji.html  # cook_m5pavbhaji.html
│       │   ├── bhel.html       # cook_m5bhel.html
│       │   ├── dhokla.html     # cook_m5dhokla.html
│       │   ├── manchurian.html # cook_m5manchurian.html
│       │   └── vada-pav.html   # cook_m5vmosa.html (assuming this is vada pav)
│       ├── festive/            # Module 6
│       │   ├── index.html      # cook_m6.html
│       │   ├── ladoo.html      # cook_m6ladoo.html
│       │   ├── jamun.html      # cook_m6jamun.html
│       │   ├── modak.html      # cook_m6modak.html
│       │   └── puran-poli.html # cook_m6puranPoli.html
│       ├── healthy/            # Module 7
│       │   ├── index.html      # cook_m7.html
│       │   ├── salad.html      # cook_m7Salad.html
│       │   ├── upma.html       # cook_m7upma.html
│       │   ├── milkshake.html  # cook_m7milkshake.html
│       │   └── millet.html     # cook_m7millet.html
│       └── planning/           # Module 8
│           └── index.html      # cook_m8.html
├── quizzes/                    # Quiz pages
│   └── cooking/                # Cooking quizzes
│       ├── quiz1.html          # cook_q1.html
│       ├── quiz2.html          # cook_q2.html
│       ├── quiz3.html          # cook_q3.html
│       ├── quiz4.html          # cook_q4.html
│       ├── quiz5.html          # cook_q5.html
│       ├── quiz6.html          # cook_q6.html
│       ├── quiz7.html          # cook_q7.html
│       └── quiz8.html          # cook_q8.html
├── games/                      # Interactive games
│   ├── time-management.html    # Cook_Game1.html
│   └── memory-game.html        # Cook_Game2.html
└── shared/                     # Shared components
    ├── components/             # Reusable HTML components
    └── utils/                  # Utility scripts
```

