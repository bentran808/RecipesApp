type RootStackParamList = {
  Home: undefined;
  Recipe: {
    item: Recipe;
  };
  RecipesList: {
    category: Category;
  };
  IngredientsDetails: {
    title: string;
    ingredients: (number | string)[][]
  };
  Ingredient: {
    ingredient: Ingredient
  };
};

type Recipe = {
  id: number;
  categoryId: number;
  title: string;
  photo_url: string;
  photosArray: string[];
  time: string;
  ingredients: (number | string)[][];
  description: string;
  category: Category;
};

type Category = {
  id: number;
  name: string;
  photo_url: string;
  recipes: Recipe[];
};

type Ingredient = {
  id: number;
  name: string;
  photo_url: string;
};

type IngredientsDetails = [Ingredient, number | string];
