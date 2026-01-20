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
    question: "Why is investing important even if you already save money?",
    options: [
      "To avoid paying taxes",
      "To grow your wealth and beat inflation",
      "Because banks don't accept savings anymore",
      "To show off to friends"
    ],
    answer: 1
  },
  {
    question: "Which of the following investment options is considered low-risk?",
    options: [
      "Stocks",
      "Mutual Funds",
      "Public Provident Fund (PPF)",
      "Real Estate"
    ],
    answer: 2
  },
  {
    question: "If ₹1 lakh is invested in a mutual fund with a 12% return, how much can it become in 10 years (approx)?",
    options: [
      "₹1.5 lakh",
      "₹2 lakh",
      "₹2.7 lakh",
      "₹3.1 lakh"
    ],
    answer: 3
  },
  {
    question: "What does SIP stand for?",
    options: [
      "Secure Investment Plan",
      "Systematic Investment Plan",
      "Savings and Investment Process",
      "Stock Investment Program"
    ],
    answer: 1
  },
  {
    question: "Which of these is a benefit of diversification?",
    options: [
      "Higher taxes",
      "Guaranteed returns",
      "Lower market risk impact",
      "Faster returns"
    ],
    answer: 2
  },
  {
    question: "What is the return range typically expected from stocks?",
    options: [
      "Fixed 8%",
      "5% - 7%",
      "Variable",
      "10% - 15%"
    ],
    answer: 2
  },
  {
    question: "What is the main factor that makes compounding powerful?",
    options: [
      "The investment amount",
      "Time invested",
      "Type of bank",
      "Number of investors"
    ],
    answer: 1
  },
  {
    question: "Which of these is NOT a common investment mistake?",
    options: [
      "Trying to time the market",
      "Diversifying your investments",
      "Investing without a goal",
      "Chasing high returns blindly"
    ],
    answer: 1
  },
  {
    question: "What is a good sample portfolio allocation for someone aged 20-30?",
    options: [
      "30% Equity, 50% Debt, 20% Real Estate",
      "50% Equity, 30% Debt, 20% Gold",
      "70% Equity, 20% Debt, 10% Gold",
      "60% Equity, 30% Real Estate, 10% Debt"
    ],
    answer: 2
  },
  {
    question: "Which investment is described as a 'hedge against inflation'?",
    options: [
      "Stocks",
      "Fixed Deposits",
      "Gold",
      "Real Estate"
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
        quiz_id: 29,
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
