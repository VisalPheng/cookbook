import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import counter from "redux/slices/counter";
import settings from "redux/slices/setting";
import recipeSlice from "redux/slices/recipe";

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["settings", "recipeSlice"],
};

export const rootReducer = combineReducers({ counter, settings, recipeSlice });

export type RootState = ReturnType<typeof rootReducer>;
