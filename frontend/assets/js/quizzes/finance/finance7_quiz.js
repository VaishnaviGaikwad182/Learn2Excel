/***********************
 🔐 LOGIN PROTECTION
***********************/
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to access this quiz");
  window.location.href = "../../pages/auth/login.html";
}

/***********************
 📘 QUIZ DATA
***********************/
const questions = [
  {
    question: "What is the main goal of retirement planning?",
    options: [
      "Spending more money during working years",
      "Estimating taxes",
      "Maintaining lifestyle and financial security after retirement",
      "Purchasing luxury items"
    ],
    answer: 2
  },
  {
    question: "Why is retirement planning important?",
    options: [
      "To reduce income during working years",
      "To depend on children for support",
      "To ensure financial independence and handle medical/emergency expenses",
      "To avoid paying taxes"
    ],
    answer: 2
  },
  {
    question: "Which of the following helps estimate retirement needs?",
    options: [
      "Ignoring inflation",
      "Assuming no travel costs",
      "Calculating future monthly expenses",
      "Avoiding healthcare planning"
    ],
    answer: 2
  },
  {
    question: "Which statement about building a retirement fund is TRUE?",
    options: [
      "Start saving after retirement",
      "Delay savings to increase spending power",
      "Start saving early and regularly",
      "Avoid employer-sponsored plans"
    ],
    answer: 2
  },
  {
    question: "Which is considered a high-risk but potentially high-return investment for retirement?",
    options: [
      "Fixed Deposits",
      "Public Provident Fund",
      "Government Bonds",
      "Stocks & ETFs"
    ],
    answer: 3
  },
  {
    question: "Which of the following helps ensure a secure retirement?",
    options: [
      "Avoiding investment plans",
      "Spending all income",
      "Diversifying investments",
      "Not reassessing financial plans"
    ],
    answer: 2
  },
  {
    question: "What is the purpose of government schemes like EPF or NPS?",
    options: [
      "Provide credit cards to retirees",
      "Offer tax-free travel",
      "Support regular pension income and encourage saving",
      "Create new job opportunities"
    ],
    answer: 2
  },
  {
    question: "What is a key feature of the Atal Pension Yojana (APY)?",
    options: [
      "Luxury pension plans for the wealthy",
      "High-risk investment returns",
      "Guaranteed pension for low-income individuals",
      "No tax benefits"
    ],
    answer: 2
  },
  {
    question: "Which mistake can seriously affect your retirement savings?",
    options: [
      "Starting early",
      "Ignoring inflation",
      "Getting health insurance",
      "Diversifying investments"
    ],
    answer: 1
  },
  {
    question: "Why is estate planning important in retirement?",
    options: [
      "To increase spending",
      "To avoid saving",
      "To ensure assets are distributed as per your wishes",
      "To hide your wealth"
    ],
    answer: 2
  }
];

/***********************
 🧠 QUIZ LOGIC
***********************/
let currentQuestionIndex = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionEl = document.getElementById("question");
const optionsEl = document.querySelectorAll(".option");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultContainer = document.getElementById("result-container");

loadQuestion();

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;

  optionsEl.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.classList.toggle(
      "selected",
      selectedAnswers[currentQuestionIndex] === i,
    );
  });

  prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
  submitBtn.style.display =
    currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
}

function selectOption(index) {
  selectedAnswers[currentQuestionIndex] = index;
  loadQuestion();
}

function nextQuestion() {
  if (selectedAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer");
    return;
  }
  currentQuestionIndex++;
  loadQuestion();
}

function prevQuestion() {
  currentQuestionIndex--;
  loadQuestion();
}

/***********************
 📤 SUBMIT QUIZ + SAVE RESULT
***********************/
async function submitQuiz() {
  document.getElementById("question-container").style.display = "none";
  document.querySelector(".controls").style.display = "none";

  let score = 0;
  resultContainer.innerHTML = "<h3>Quiz Results</h3>";

  questions.forEach((q, i) => {
    const correct = selectedAnswers[i] === q.answer;
    if (correct) score++;

    resultContainer.innerHTML += `
      <div class="result-item ${correct ? "correct" : "wrong"}">
        <strong>Q${i + 1}:</strong> ${q.question}<br>
        <strong>Your Answer:</strong> ${
          selectedAnswers[i] !== null
            ? q.options[selectedAnswers[i]]
            : "No Answer"
        }<br>
        <strong>Correct Answer:</strong> ${q.options[q.answer]}
      </div>
    `;
  });

  resultContainer.innerHTML += `
    <p class="final-score">Score: ${score}/${questions.length}</p>
  `;
  resultContainer.style.display = "block";
  resultContainer.innerHTML += `
  <div style="text-align:center; margin-top:20px;">
    <button onclick="goBackToModule()" style="
      background-color:#4caf50;
      color:#fff;
      padding:10px 22px;
      border:none;
      border-radius:6px;
      font-size:1rem;
      cursor:pointer;
    ">
      ← Back to Finance Module
    </button>
  </div>
`;

  // 🔹 SEND SCORE TO BACKEND
  try {
    const res = await fetch("http://localhost:3000/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        quiz_id: 33,
        score: score,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend error:", data);
      alert("❌ Failed to save quiz result");
      return;
    }

    alert("✅ Quiz result saved successfully!");
  } catch (error) {
    console.error("Network error:", error);
    alert("❌ Server not reachable");
  }
}

/***********************
 🔁 RESET (OPTIONAL)
***********************/
function resetQuiz() {
  currentQuestionIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);

  document.getElementById("question-container").style.display = "block";
  document.querySelector(".controls").style.display = "flex";
  resultContainer.style.display = "none";

  loadQuestion();
}

function goBackToModule() {
  window.location.href = "/frontend/pages/courses/finance.html";
}
