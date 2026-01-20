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
    question: "What is the primary purpose of insurance?",
    options: [
      "To increase monthly expenses",
      "To provide tax benefits only",
      "To protect against financial risks",
      "To avoid bank transactions"
    ],
    answer: 2
  },
  {
    question: "Which of the following is a feature of health insurance?",
    options: [
      "Pays for home repairs",
      "Covers vehicle damage",
      "Covers medical expenses",
      "Provides travel discounts"
    ],
    answer: 2
  },
  {
    question: "What does the claim settlement ratio indicate?",
    options: [
      "The number of customers an insurer has",
      "The number of rejected policies",
      "The percentage of claims an insurer successfully settles",
      "The tax rate on insurance premiums"
    ],
    answer: 2
  },
  {
    question: "Which of the following is a risk management strategy?",
    options: [
      "Taking more loans",
      "Investing all money in one stock",
      "Skipping insurance to save money",
      "Building an emergency fund"
    ],
    answer: 3
  },
  {
    question: "Which type of life insurance provides coverage for a limited period?",
    options: [
      "Whole Life Insurance",
      "Term Insurance",
      "Endowment Plan",
      "Critical Illness Insurance"
    ],
    answer: 1
  },
  {
    question: "Why is diversifying investments recommended?",
    options: [
      "To increase taxes",
      "To make quick profits",
      "To reduce overall financial risk",
      "To avoid creating a budget"
    ],
    answer: 2
  },
  {
    question: "Which type of insurance is mandatory for vehicle owners in India?",
    options: [
      "Comprehensive Insurance",
      "Health Insurance",
      "Travel Insurance",
      "Third-Party Insurance"
    ],
    answer: 3
  },
  {
    question: "What does a rider in an insurance policy mean?",
    options: [
      "The main coverage amount",
      "An additional benefit or feature added to a policy",
      "The person who collects premiums",
      "The customer care representative"
    ],
    answer: 1
  },
  {
    question: "Which of the following is NOT typically covered by travel insurance?",
    options: [
      "Trip cancellations",
      "Medical emergencies abroad",
      "Home repairs",
      "Baggage loss"
    ],
    answer: 2
  },
  {
    question: "How does the insurance system work?",
    options: [
      "Insurers invest all your money",
      "Policyholders get guaranteed returns",
      "Insurers collect premiums and use pooled funds to pay claims",
      "The government pays the insurance benefits"
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
        quiz_id: 32,
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
