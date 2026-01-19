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
      question: "Which of the following is an essential step in soil preparation for farming?",
      options: ["Watering the soil", "Clearing the land", "Planting seeds", "Adding fertilizers"],
      answer: 1
    },
    {
      question: "What is the main purpose of soil testing in farming?",
      options: ["Determine soil pH and nutrient content", "Choose the right seeds", "Plan irrigation", "Add organic matter"],
      answer: 0
    },
    {
      question: "Which method is best for planting crops like maize, melons, and pumpkins?",
      options: ["Drilling Method", "Hill Sowing Method", "Broadcasting Method", "Check Row Planting"],
      answer: 1
    },
    {
      question: "Which sowing method is considered the most labor-intensive?",
      options: ["Drilling Method", "Dibbling Method", "Broadcasting Method", "Transplanting Method"],
      answer: 3
    },
    {
      question: "Which of the following is a benefit of mulching in farming?",
      options: ["Prevents soil erosion", "Improves irrigation", "Regulates soil temperature", "All of the above"],
      answer: 3
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
      ← Back to Farming Module
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
        quiz_id: 12,
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
  window.location.href = "/frontend/pages/courses/farming.html";
}
