/***********************
 🔐 LOGIN PROTECTION
***********************/
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login to access this quiz");
  window.location.href = "../../pages/auth/login.html";
}

/***********************
 📘 QUIZ DATA – COOK Q8
***********************/
const questions = [
  {
    question: "Which of the following is important when planning a balanced meal?",
    options: ["Eating only protein", "Including all food groups", "Avoiding vegetables", "Skipping carbohydrates"],
    answer: 1,
  },
  {
    question: "Which nutrient is essential for muscle growth and repair?",
    options: ["Carbohydrates", "Fats", "Proteins", "Sugars"],
    answer: 2,
  },
  {
    question: "Which of these is a healthy meal planning tip?",
    options: [
      "Eating junk food every day",
      "Skipping breakfast",
      "Including a variety of fruits and vegetables",
      "Drinking only soft drinks"
    ],
    answer: 2,
  },
  {
    question: "How can meal planning help reduce food waste?",
    options: ["By buying only what is needed", "By purchasing food randomly", "By cooking excessive portions", "By throwing away leftovers"],
    answer: 0,
  },
  {
    question: "How often should meal plans be adjusted?",
    options: ["Never", "Only once a year", "Every single day", "As needed based on dietary goals and lifestyle"],
    answer: 3,
  },
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
      selectedAnswers[currentQuestionIndex] === i
    );
  });

  prevBtn.style.display =
    currentQuestionIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display =
    currentQuestionIndex === questions.length - 1
      ? "none"
      : "inline-block";
  submitBtn.style.display =
    currentQuestionIndex === questions.length - 1
      ? "inline-block"
      : "none";
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
 🔁 RESET QUIZ
***********************/
function resetQuiz() {
  currentQuestionIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);

  document.getElementById("question-container").style.display = "block";
  document.querySelector(".controls").style.display = "flex";
  resultContainer.style.display = "none";

  loadQuestion();
}

/***********************
 📤 SUBMIT QUIZ + SAVE RESULT
***********************/
submitBtn.addEventListener("click", submitQuiz);

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
      ← Back to Cooking Module
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
        quiz_id: 8, // Cooking Module 8
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

function goBackToModule() {
  window.location.href = "../../pages/courses/cooking.html";
}

