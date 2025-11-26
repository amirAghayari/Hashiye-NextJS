import React from "react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { Article } from "@/types/article";
import { Provider as ReduxProvider } from "react-redux";

interface GradesState {
  selectedArticle: Article | null;
}

const gradesSlice = createSlice({
  name: "grades",
  initialState: {
    selectedArticle: null,
  } as GradesState,
  reducers: {
    setSelectedArticle: (state, action: PayloadAction<Article | null>) => {
      state.selectedArticle = action.payload;
    },
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
});

export const { setSelectedArticle, clearSelectedArticle } = gradesSlice.actions;

export const store = configureStore({
  reducer: {
    grades: gradesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function GradesProvider({ children }: { children: React.ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export const useGrades = () => {
  const dispatch = useAppDispatch();
  const selectedArticle = useAppSelector(
    (state) => state.grades.selectedArticle
  );

  return {
    selectedArticle,
    setSelectedArticle: (article: Article | null) =>
      dispatch(setSelectedArticle(article)),
    clearSelectedArticle: () => dispatch(clearSelectedArticle()),
  };
};
