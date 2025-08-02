const questions = [
    {
        question: "Which street food consists of hollow puris filled with spicy and tangy flavored water?",
        options: ["Bhel", "Pani Puri", "Pav Bhaji", "Dhokla"],
        answer: 1
    },
    {
        question: "What is the main ingredient in Vada Pav’s vada?",
        options: ["Paneer", "Potato", "Cauliflower", "Chickpeas"],
        answer: 1
    },
    {
        question: "Which of these snacks is made with puffed rice and a mix of chutneys for a tangy taste?",
        options: ["Bhel", "Manchurian", "Dhokla", "Samosa"],
        answer: 0
    },
    {
        question: "Which street food is an Indo-Chinese fusion made with fried cauliflower fritters?",
        options: ["Chow Mein", "Hakka Noodles", "Flower Manchurian", "Spring Rolls"],
        answer: 2
    },
    {
        question: "Which Indian snack is deep-fried and filled with a spicy potato mixture?",
        options: ["Manchurian", "Pani Puri", "Samosa", "Bhel"],
        answer: 2
    }
];

  
  const user_id = 1; // Replace this with dynamic user ID if needed
  let currentQuestionIndex = 0;
  let selectedAnswers = Array(questions.length).fill(null);
  let score = 0;
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.querySelectorAll(".option");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");
  const historyBtn = document.getElementById("history-btn");
  const resultContainer = document.getElementById("result-container");
  const historyContainer = document.getElementById("history-container");
  const historyList = document.getElementById("history-list");
  const progressContainer = document.getElementById("progress-container");
  const progressDetails = document.getElementById("progress-details");
  const quizContainer = document.querySelector(".quiz-container"); 
  
  
  // Create a "Close Results" button dynamically
  const closeResultsBtn = document.createElement("button");
  closeResultsBtn.textContent = "Close Results";
  closeResultsBtn.style.display = "none"; // Initially hidden
  closeResultsBtn.addEventListener("click", function () {
      resultContainer.style.display = "none";
      closeResultsBtn.style.display = "none"; // Hide button
  });
  document.body.appendChild(closeResultsBtn); // Add button to the document
  
  // Fetch quiz progress on page load
  window.onload = async function () {
      try {
          const response = await fetch(`http://localhost:5000/get-progress/${user_id}`);
          const data = await response.json();
  
          if (data) {
              currentQuestionIndex = data.current_question;
              selectedAnswers = data.selected_answers ? JSON.parse(data.selected_answers) : Array(questions.length).fill(null);
          }
          loadQuestion();
      } catch (error) {
          console.error("Error fetching progress:", error);
      }
  };
  document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submit-btn");
  
    if (!submitBtn) {
        console.error("❌ Submit button not found in the DOM!");
    } else {
        console.log("✅ Submit button found. Attaching event listener...");
        submitBtn.addEventListener("click", submitQuiz);
    }
  });
  
  
  function loadQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionEl.textContent = currentQuestion.question;
  
      optionsEl.forEach((option, index) => {
          option.textContent = currentQuestion.options[index];
          option.classList.remove("selected");
          if (selectedAnswers[currentQuestionIndex] === index) {
              option.classList.add("selected");
          }
      });
  
      prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
      nextBtn.style.display = currentQuestionIndex === questions.length - 1 ? "none" : "inline-block";
      submitBtn.style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
  }
  
  function selectOption(index) {
      selectedAnswers[currentQuestionIndex] = index;
      optionsEl.forEach((option, i) => {
          option.classList.toggle("selected", i === index);
      });
      saveProgress();
  }
  
  function nextQuestion() {
      if (selectedAnswers[currentQuestionIndex] === null) {
          alert("Please select an answer!");
          return;
      }
      currentQuestionIndex++;
      loadQuestion();
      saveProgress();
  }
  
  function prevQuestion() {
      currentQuestionIndex--;
      loadQuestion();
      saveProgress();
  }
  
  // Save quiz progress in the database
  async function saveProgress() {
      try {
          await fetch("http://localhost:5001/save-progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  user_id: user_id,
                  current_question: currentQuestionIndex,
                  selected_answers: selectedAnswers,
              }),
          });
      } catch (error) {
          console.error("Error saving progress:", error);
      }
  }
  
  // Fetch quiz history
  // async function fetchHistory() {
  //     historyContainer.style.display = "block";
  //     resultContainer.style.display = "none"; // Hide quiz results
  //     closeResultsBtn.style.display = "none"; 
  //     historyList.innerHTML = "";
  //     document.getElementById("close-history-btn").style.display = "block"; // Show close button
  
  
  //     try {
  //         const response = await fetch(`http://localhost:5001/get-history/${user_id}`);
  //         const history = await response.json();
  
  //         if (history.length === 0) {
  //             historyList.innerHTML = "<li>No quiz history found.</li>";
  //         } else {
  //             history.forEach((entry) => {
  //                 const listItem = document.createElement("li");
  //                 listItem.innerHTML = `<strong>Score:</strong> ${entry.score}/${entry.total_questions} <br> <strong>Date:</strong> ${new Date(entry.timestamp).toLocaleString()}`;
  //                 historyList.appendChild(listItem);
  //             });
  //         }
  //     } catch (error) {
  //         console.error("Error fetching history:", error);
  //     }
  // }
  async function fetchHistory() {
      historyContainer.style.display = "block";
      
      historyList.innerHTML = ""; // Clear previous history
      document.getElementById("close-history-btn").style.display = "block"; // Show close button
  
      try {
          const response = await fetch(`http://localhost:5001/get-history/${user_id}`);
          const history = await response.json();
  
          if (history.length === 0) {
              historyList.innerHTML = "<p>No quiz history found.</p>";
          } else {
              history.forEach((entry) => {
                  const scoreButton = document.createElement("button");
                  scoreButton.textContent = `Score: ${entry.score}/${entry.total_questions} | ${new Date(entry.timestamp).toLocaleString()}`;
                  scoreButton.classList.add("history-score-btn");
                  scoreButton.onclick = () => fetchQuizDetails(entry.id); // Fetch details when clicked
                  historyList.appendChild(scoreButton);
              });
          }
      } catch (error) {
          console.error("Error fetching history:", error);
      }
  }
  async function fetchQuizDetails(historyId) {
      progressContainer.style.display = "block";
      progressDetails.innerHTML = ""; // Clear previous details
      document.getElementById("close-progress-btn").style.display = "block"; // Show close button
  
      console.log("📢 Fetching quiz details for history ID:", historyId);
  
      try {
          const response = await fetch(`http://localhost:5001/get-history-details/${historyId}`);
          const data = await response.json();
          console.log("📩 Received progress data:", data); // Debugging log
  
          if (!data.answers || data.answers.length === 0) {
              progressDetails.innerHTML = "<p>No progress data available for this quiz.</p>";
              return;
          }
  
          data.answers.forEach((entry, index) => {
              const question = questions[index]; // Get question from predefined list
  
              if (!question) {
                  console.warn("⚠️ Question not found for index:", index);
                  return;
              }
  
              const isCorrect = entry.selected === question.answer;
  
              const detailItem = document.createElement("div");
              detailItem.classList.add("progress-item", isCorrect ? "correct" : "wrong");
              detailItem.innerHTML = `
                  <strong>Q${index + 1}:</strong> ${question.question} <br>
                  Your Answer: ${entry.selected !== null ? question.options[entry.selected] : "No Answer"}<br>
                  Correct Answer: ${question.options[question.answer]}
              `;
  
              progressDetails.appendChild(detailItem);
          });
  
      } catch (error) {
          console.error("⚠️ Error fetching quiz details:", error);
          progressDetails.innerHTML = "<p>⚠️ Error loading progress. Try again later.</p>";
      }
  }
  // Get reset button
  const resetBtn = document.getElementById("reset-btn");
  
  async function resetQuiz() {
      console.log("🔄 Resetting quiz...");
      
      // Reset variables
      currentQuestionIndex = 0;
      selectedAnswers = Array(questions.length).fill(null);
  
      // Update UI
      loadQuestion();
  
      // Clear progress from database
      try {
          await fetch("http://localhost:5001/reset-progress", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ user_id: user_id }),
          });
  
          console.log("✅ Progress reset in database.");
      } catch (error) {
          console.error("❌ Error resetting progress:", error);
      }
  }
  
  async function submitQuiz() {
      console.log("✅ Submit button clicked!");
  
      let score = 0;
      resultContainer.innerHTML = "<h3>Quiz Results:</h3>";
  
      questions.forEach((question, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === question.answer;
  
          if (isCorrect) score++;
  
          resultContainer.innerHTML += `
              <div class="result-item ${isCorrect ? "correct" : "wrong"}">
                  <strong>Q${index + 1}:</strong> ${question.question} <br>
                  Your Answer: ${userAnswer !== null ? question.options[userAnswer] : "No Answer"}<br>
                  Correct Answer: ${question.options[question.answer]}
              </div>
          `;
      });
  
      resultContainer.innerHTML += `<p><strong>Your Score:</strong> ${score}/${questions.length}</p>`;
      resultContainer.style.display = "block";
      closeResultsBtn.style.display = "block"; // Show Close Results button
  
      console.log("📤 Sending data to /save-history:", { user_id, score, total_questions: questions.length, answers: selectedAnswers });
  
      await saveHistory(score);
  }
  
  // Add event listener to the submit button
  submitBtn.addEventListener("click", submitQuiz);
  
  // Save quiz history in the database
  async function saveHistory(score) {
      try {
          const response = await fetch("http://localhost:5001/save-history", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  user_id: user_id,
                  score: score,
                  total_questions: questions.length,
                  answers: selectedAnswers
              }),
          });
  
          console.log("📩 Server response:", response);
          const result = await response.json();
          console.log("📩 Server result:", result);
  
          if (response.ok) {
              alert("✅ History saved successfully!");
          } else {
              alert("❌ Failed to save history: " + result.message);
          }
      } catch (error) {
          console.error("⚠️ Error saving history:", error);
          alert("⚠️ Error saving history. Check console for details.");
      }
  }
  //Close history
  function closeHistory() {
      historyContainer.style.display = "none";
      document.getElementById("close-history-btn").style.display = "none";
  }
  
  // Close quiz details
  function closeProgress() {
      progressContainer.style.display = "none";
      document.getElementById("close-progress-btn").style.display = "none";
  }
  function resetQuiz() {
      currentQuestionIndex = 0;
      selectedAnswers = Array(questions.length).fill(null);
      saveProgress(); // Optional: Reset progress in DB if needed
      loadQuestion();
  }
  
  
  // Initialize the first question
  loadQuestion();