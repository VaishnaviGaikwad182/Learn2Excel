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
    question: "Which of the following is a long-term financial goal?",
    options: [
      "Saving for a weekend trip",
      "Building an emergency fund",
      "Saving for a down payment in 2 years",
      "Planning for retirement in 25 years"
    ],
    answer: 3  // 0-based index
  },
  {
    question: "What does the 'SMART' in SMART goals stand for?",
    options: [
      "Simple, Measurable, Accountable, Reliable, Time-saving",
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Secure, Maintainable, Adjustable, Realistic, Timed",
      "Special, Meaningful, Attainable, Result-oriented, Timely"
    ],
    answer: 1
  },
  {
    question: "Which of the following is considered a low-risk investment option?",
    options: [
      "Stocks",
      "Real Estate",
      "Mutual Funds",
      "Public Provident Fund (PPF)"
    ],
    answer: 3
  },
  {
    question: "Why is diversifying your investments important?",
    options: [
      "To maximize tax benefits",
      "To reduce dependency on a single income stream",
      "To eliminate the need for emergency funds",
      "To increase short-term gains"
    ],
    answer: 1
  },
  {
    question: "Ankit is 22 years old and has just started his first job. He wants to save for a trip to Europe in 2 years, buy a car in 5 years, and retire comfortably at age 60. Which of the following correctly matches his goals with their types?",
    options: [
      "Europe Trip – Long-term, Car – Medium-term, Retirement – Short-term",
      "Europe Trip – Short-term, Car – Medium-term, Retirement – Long-term",
      "Europe Trip – Medium-term, Car – Long-term, Retirement – Short-term",
      "All three are long-term goals"
    ],
    answer: 1
  },
  {
    question: "Priya earns ₹50,000 per month. She spends ₹35,000 on essentials, saves ₹5,000, and uses the remaining for entertainment. She has no emergency fund or investments. She now wants to save ₹10 lakh in 10 years to start her own business. Which financial habits should Priya adopt to reach her goal?",
    options: [
      "Continue current spending, increase savings later",
      "Take a personal loan instead of saving",
      "Increase savings, invest in mutual funds, and reduce discretionary spending",
      "Quit her job and look for a higher-paying one"
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
        quiz_id: 34,
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
