import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type Recipe = {
  id: number;
  title: string;
};

type RecipeInitialState = {
  recipes: Recipe[];
  selectedRecipe: null | Recipe;
  currentEdit: null | Recipe;
  isAddingRecipe: boolean;
};

const initialState: RecipeInitialState = {
  recipes: [],
  selectedRecipe: null,
  currentEdit: null,
  isAddingRecipe: false,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes = [...state.recipes, action.payload];
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
    editRecipe: (state, action) => {
      const existedRecipe = state.recipes.find(
        (recipe) => recipe.id === action.payload
      );
      if (existedRecipe) {
        state.currentEdit = existedRecipe;
      }
    },
    updateRecipe: (state, action) => {
      const editIndex = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (editIndex >= 0) {
        state.recipes[editIndex] = action.payload;
      }
    },
    selectRecipe: (state, action) => {
      const selectedRecipe = state.recipes.find(
        (recipe) => recipe.id === action.payload
      );
      if (selectedRecipe) {
        state.selectedRecipe = selectedRecipe;
      }
    },
    setIsAddingRecipe: (state, action) => {
      state.isAddingRecipe = action.payload;
    },
    setCurrentEdit: (state, action) => {
      state.currentEdit = action.payload;
    },
    setIsSelectedRecipe: (state, action) => {
      state.selectedRecipe = action.payload;
    },
  },
});

export const recipeSliceActions = recipeSlice.actions;
export const recipeSliceSelector = (): RecipeInitialState => {
  return useSelector((state: any) => state.recipeSlice);
};

export default recipeSlice.reducer;
