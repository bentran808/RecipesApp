import { months } from 'constants/Data';
import { CategoryModel } from 'store/CategoriesStore';
import { RecipeModel } from 'store/RecipesStore';

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

export const getRecipesByIngredient = (recipes: RecipeModel[], ingredientID: number) => {
  return recipes.filter(
    (recipe) => recipe.ingredients.some((item) => item[0] === ingredientID) && recipe
  );
};

export const transformCategories = (categories: CategoryModel[]) => {
  return categories.map((category) => ({
    ...category,
    recipes: (category.recipes || []).map((recipe) => ({
      ...recipe,
      category
    }))
  }));
};

let timeoutId: ReturnType<typeof setTimeout>;
export const debounce = (func: (text: string) => void, delay: number) => {
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const formatDatetime = (date: Date) => {
  let dates: number | string = date.getDate();
  let hours: number | string = date.getHours() - 1;
  let minutes: number | string = date.getMinutes();
  hours = hours % 12;
  hours = hours || 12;
  hours = hours < 10 ? '0' + hours : hours;
  dates = dates < 10 ? '0' + dates : dates;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const time = hours + ':' + minutes;
  return `${dates} ${months[date.getMonth()]} ${date.getFullYear()}, ${time}`;
};
