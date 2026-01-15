# Learn2Excel
**Learn2Excel – Online Skill Development Platform** Built a responsive UI with HTML, CSS, and JavaScript. Developed interactive pages like Login, Signup, and Quiz Dashboard with real-time feedback and form validation. Integrated a simple game into the platform to improve user engagement and learning experience.

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

