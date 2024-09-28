

async function getProduct() {
    try {
        const data = await fetch('https://dummyjson.com/recipes');
        const res = await data.json();

        // Check the structure of the response
        console.log(res);

        // Adjust this line based on the actual structure
        const recipes = res.recipes || res;

        for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i]);

            const products = document.getElementById('products');
            if (products) {
                products.innerHTML += `
                <div class="card" style="width: 19rem;">
                    <img src="${recipes[i].image}" class="card-img-top" style="height: 300px;">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="height: 40px;">${recipes[i].name}</h5>
                        <p class="card-text text-center my-4" style="height: 20px;">${recipes[i].cuisine} </p>
                        <a href="#" class="btn btn-secondary" style="height: 40px;">Get Recipe</a>
                    </div>
                </div>`;
            } else {
                console.error('Element with id "products" not found');
            }
        }
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

getProduct();

function searchRecipes() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredRecipes = allRecipes.filter(menu => 
      menu.name.toLowerCase().includes(query) || 
      menu.cuisine.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes); // Display filtered recipes
  }
  // Search functionality on button click
  document.getElementById("searchButton").addEventListener("click", searchRecipes);
  // on enter key
  document.getElementById("searchInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchRecipes(); // Call the search function on Enter key press
      event.preventDefault(); // Prevent form submission (if inside a form)
    }
  });
  
  // Function to open new tab for recipe details
  function newTab(url, ingredients, instructions, mealType) {
    let tab = window.open(url, url, 'width=420,height=380,left=450,top=200');
    
    tab.document.write(`
        <html>
          <head>
            <title>${url.replace('-', ' ')}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              .ingredients, .instructions, .meal-type { margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h1>${url.replace('-', ' ')}</h1>
            <div class="ingredients">
              <h2>Ingredients</h2>
              <p>${ingredients}</p>
            </div>
            <div class="instructions">
              <h2>Instructions</h2>
              <p>${instructions}</p>
            </div>
            <div class="meal-type">
              <h2>Meal Type</h2>
              <p>${mealType}</p>
            </div>
          </body>
        </html>
    `);
    
    tab.document.close();
  }