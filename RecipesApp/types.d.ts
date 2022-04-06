type Recipe = {
    id: number,
    categoryId: number,
    title: string,
    photo_url: string,
    photosArray: string[],
    time: string,
    ingredients: (number | string)[][],
    description: string,
    category: Category
};

type Category = {
    id: number,
    name: string,
    photo_url: string
};