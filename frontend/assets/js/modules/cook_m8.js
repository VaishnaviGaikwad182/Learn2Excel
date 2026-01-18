document.addEventListener("DOMContentLoaded", function () {
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
    
        if (!hamburger || !navLinks) {
            console.error("Navbar elements not found!");
            return;
        }
    
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
});

let lastOpened = null;

// Meal Data categorized into Breakfast, Lunch, and Dinner
const meals = {
    "Monday": {
        "Breakfast": ["Poha", "Masala Chai"],
        "Lunch": ["Dal Tadka", "Jeera Rice", "Mixed Veg Salad"],
        "Dinner": ["Roti", "Paneer Bhurji"]
    },
    "Tuesday": {
        "Breakfast": ["Idli", "Coconut Chutney", "Sambar"],
        "Lunch": ["Masala Paneer", "Naan", "Papad"],
        "Dinner": ["Vegetable Khichdi", "Curd"]
    },
    "Wednesday": {
        "Breakfast": ["Upma", "Chutney"],
        "Lunch": ["Vegetable Pulao", "Raita", "Fry Papad"],
        "Dinner": ["Bhindi Sabzi", "Phulka"]
    },
    "Thursday": {
        "Breakfast": ["Aloo Paratha", "Curd"],
        "Lunch": ["Chole", "Bhature", "Lassi"],
        "Dinner": ["Mix Veg Curry", "Jeera Rice", "Roti"]
    },
    "Friday": {
        "Breakfast": ["Masala Dosa", "Coconut Chutney", "Sambar"],
        "Lunch": ["Rajma Chawal", "Onion Salad"],
        "Dinner": ["Baingan Bharta", "Phulka"]
    },
    "Saturday": {
        "Breakfast": ["Dhokla", "Green Chutney", "Tea"],
        "Lunch": ["Veg Biryani", "Raita", "Papad"],
        "Dinner": ["Matar Paneer", "Paratha"]
    },
    "Sunday": {
        "Breakfast": ["Paneer Sandwich", "Milkshake"],
        "Lunch": ["Hyderabadi Biryani", "Raita"],
        "Dinner": ["Dal Makhani", "Naan", "Sweet Lassi"]
    }
};

function toggleMeal(card, day) {
    // Remove existing meal list if another card is clicked
    if (lastOpened && lastOpened !== card) {
        restoreCard(lastOpened);
    }

    // Check if meal list already exists
    let existingMealList = card.querySelector(".meal-list");
    if (existingMealList) {
        restoreCard(card);
        lastOpened = null;
        return;
    }

    // Hide the image and heading
    const img = card.querySelector("img");
    const heading = card.querySelector("h2");
    
    if (img) img.style.display = "none";
    if (heading) heading.style.display = "none";

    // Create meal list container
    const mealList = document.createElement("div");
    mealList.classList.add("meal-list");

    // Populate meal categories
    for (const [mealType, mealItems] of Object.entries(meals[day])) {
        const mealHeading = document.createElement("h3");
        mealHeading.textContent = mealType;
        mealList.appendChild(mealHeading);

        const mealUl = document.createElement("ul");
        mealItems.forEach(meal => {
            const listItem = document.createElement("li");
            listItem.textContent = meal;
            mealUl.appendChild(listItem);
        });

        mealList.appendChild(mealUl);
    }

    // Append the meal list to the card
    card.appendChild(mealList);

    // Store reference to last opened card
    lastOpened = card;
}

function restoreCard(card) {
    // Remove meal list
    const mealList = card.querySelector(".meal-list");
    if (mealList) mealList.remove();

    // Show image and heading again
    const img = card.querySelector("img");
    const heading = card.querySelector("h2");

    if (img) img.style.display = "block";
    if (heading) heading.style.display = "block";
}
