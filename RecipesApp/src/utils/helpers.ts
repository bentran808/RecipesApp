export const mappingIngredientsDetails = (
  ingredientsOfRecipe: (number | string)[][],
  ingredientsData: Ingredient[]
) => {
  const results: IngredientsDetails[] = [];
  ingredientsData.forEach((ingredient) => {
    ingredientsOfRecipe.forEach((index) => {
      if (ingredient.id === index[0]) {
        results.push([ingredient, index[1]]);
      }
    });
  });
  return results;
};

export const getRecipesByIngredient = (recipes: Recipe[], ingredientID: number) => {
  return recipes.filter(
    (recipe) => recipe.ingredients.some((item) => item[0] === ingredientID) && recipe
  );
};

export const transformCategories = (categories: Category[]) => {
  return categories.map((category) => ({
    ...category,
    recipes: category.recipes.map((recipe) => ({
      ...recipe,
      category
    }))
  }));
};
