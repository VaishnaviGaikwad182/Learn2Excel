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
        question: "Which type of soil is best suited for growing vegetables due to its good drainage and nutrient retention?",
        options: ["Clay Soil", "Sandy Soil", "Loamy Soil", "Peaty Soil"],
        answer: 2
    },
    {
        question: "Which soil type is ideal for crops that require good drainage but low water retention?",
        options: ["Clay Soil", "Sandy Soil", "Loamy Soil", "Silty Soil"],
        answer: 1
    },
    {
        question: "What is the best season to plant leafy greens like spinach and lettuce?",
        options: ["Summer", "Winter", "Spring", "Monsoon"],
        answer: 2
    },
    {
        question: "What type of composting involves breaking down organic matter using worms?",
        options: ["Hot Composting", "Cold Composting", "Vermicomposting", "Anaerobic Composting"],
        answer: 2
    },
    {
        question: "Which soil type becomes sticky when wet and hard when dry, making it challenging for root growth?",
        options: ["Loamy Soil", "Sandy Soil", "Clay Soil", "Peaty Soil"],
        answer: 2
    },
    {
        question: "Which type of composting requires turning the pile regularly to speed up the decomposition process?",
        options: ["Cold Composting", "Hot Composting", "Vermicomposting", "Sheet Composting"],
        answer: 1
    },
    {
        question: "What is the benefit of adding compost to garden soil?",
        options: ["Increases soil acidity", "Reduces water retention", "Improves soil structure and nutrients", "Reduces plant growth"],
        answer: 2
    },
    {
        question: "Which soil type is rich in organic matter and retains moisture well, making it suitable for root crops?",
        options: ["Sandy Soil", "Peaty Soil", "Loamy Soil", "Clay Soil"],
        answer: 1
    },
    {
        question: "What is the main purpose of mulching in gardening?",
        options: ["To attract insects", "To reduce weed growth and retain moisture", "To increase soil acidity", "To reduce composting"],
        answer: 1
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
        quiz_id: 10,
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
