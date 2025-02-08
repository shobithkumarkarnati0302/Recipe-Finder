const ingredientButton = document.getElementById("ingredientButton");
const recipesContainer = document.getElementById("recipes");
const ingredientInput = document.getElementById("ingredientInput");

function showLoading() {
    recipesContainer.innerHTML = '<div class="loading">Loading recipes...</div>';
}

async function fetchRecipes() {
    const ingredient = ingredientInput.value.trim();
    if (!ingredient) {
        recipesContainer.innerHTML = "<p>Please enter a meal name!</p>";
        return;
    }
    showLoading();
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
        const data = await response.json();
        
        if (data.meals) {
            recipesContainer.innerHTML = data.meals.map(meal => `
                <div class="recipe-card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h4>${meal.strMeal}</h4>
                    <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
                </div>
            `).join("");
        } else {
            recipesContainer.innerHTML = "<p>No recipes found!</p>";
        }
    } catch (error) {
        recipesContainer.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
    }
}

ingredientButton.addEventListener("click", fetchRecipes);

const style = document.createElement("style");
style.innerHTML = `
    .loading {
        font-size: 18px;
        font-weight: bold;
        color: #A94A4A;
        animation: blink 1s infinite;
    }
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);
