
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    const recipeCards = document.querySelectorAll('.card');

    // Function to filter recipes
    function filterRecipes() {
        const searchTerm = searchInput.value.toLowerCase(); 
        recipeCards.forEach(card => {
            const recipeName = card.querySelector('.card-title').textContent.toLowerCase(); // Get the recipe name
            if (recipeName.includes(searchTerm)) {
                card.parentElement.style.display = 'block'; // Show matching cards
            } else {
                card.parentElement.style.display = 'none'; // Hide non-matching cards
            }
        });
    }

    // Add event listener to the search button
    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        filterRecipes(); 
    });

    
    searchInput.addEventListener('input', filterRecipes);


    function showPopup() {
        alert("This recipe is not available yet. Stay tuned!");
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Get URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get("search");

        if (searchQuery) {
            const recipes = document.querySelectorAll(".card");

            recipes.forEach(recipe => {
                const title = recipe.querySelector(".card-title").textContent.toLowerCase();
                if (!title.includes(searchQuery.toLowerCase())) {
                    recipe.style.display = "none"; // Hide non-matching recipes
                }
            });
        }
    });
