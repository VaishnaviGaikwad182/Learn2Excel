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
      question: "What is the primary purpose of budgeting?",
      options: [
        "To spend all your income on wants",
        "To create confusion about expenses",
        "To manage income and expenses wisely",
        "To avoid saving money"
      ],
      answer: 2  // C is correct (index 2)
    },
    {
      question: "In budgeting, what does the 50/30/20 rule represent?",
      options: [
        "50% Savings, 30% Entertainment, 20% Rent",
        "50% Needs, 30% Wants, 20% Savings/Debt",
        "50% Shopping, 30% Travel, 20% Education",
        "50% Investments, 30% Fun, 20% Bills"
      ],
      answer: 1  // B is correct (index 1)
    },
    {
      question: "What is the main idea behind the 'Pay Yourself First' technique?",
      options: [
        "Spend all your money before saving",
        "Pay your bills first, then save what's left",
        "Save a fixed amount before any spending",
        "Borrow money and save later"
      ],
      answer: 2  // C is correct (index 2)
    },
    {
      question: "Which budgeting technique involves assigning every rupee a job so that income minus expenses equals zero?",
      options: [
        "Envelope System",
        "Zero-Based Budgeting",
        "Value-Based Budgeting",
        "Pay Yourself First"
      ],
      answer: 1  // B is correct (index 1)
    },
    {
      question: "How can the Envelope System help manage your spending?",
      options: [
        "By encouraging credit card usage",
        "By keeping all money in one account",
        "By dividing cash into specific categories",
        "By spending without tracking"
      ],
      answer: 2  // C is correct (index 2)
    },
    {
      question: "Why is saving important in your financial journey?",
      options: [
        "It reduces your monthly income",
        "It limits your freedom",
        "It prepares you for emergencies and future goals",
        "It's only useful for the rich"
      ],
      answer: 2  // C is correct (index 2)
    },
    {
      question: "What does Value-Based Budgeting encourage you to focus on?",
      options: [
        "Random spending",
        "Social media trends",
        "Expenses that align with your personal values and goals",
        "Buying luxury items"
      ],
      answer: 2  // C is correct (index 2)
    },
    {
      question: "What is one smart way to automate your savings?",
      options: [
        "Save only if there's leftover money",
        "Set automatic transfers to your savings account",
        "Wait till the end of the year",
        "Withdraw savings as soon as possible"
      ],
      answer: 1  // B is correct (index 1)
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
        quiz_id: 28,
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
