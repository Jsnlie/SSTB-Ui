"use client";

import { useReducer } from "react";
import {
  CategoryResponse,
  MediaResponse,
  MediaType,
  selectMediaByCategoryId,
  selectMediaByType,
} from "./admin-media";

export interface MediaCmsState {
  categories: CategoryResponse[];
  activeCategoryId: number | null;
  medias: MediaResponse[];
  activeMediaId: number | null;
  loading: boolean;
  error: string;
}

type MediaCmsAction =
  | { type: "set-loading"; payload: boolean }
  | { type: "set-error"; payload: string }
  | { type: "set-categories"; payload: CategoryResponse[] }
  | { type: "upsert-category"; payload: CategoryResponse }
  | { type: "remove-category"; payload: number }
  | { type: "set-active-category"; payload: number | null }
  | { type: "set-medias"; payload: MediaResponse[] }
  | { type: "upsert-media"; payload: MediaResponse }
  | { type: "remove-media"; payload: number }
  | { type: "set-active-media"; payload: number | null };

function upsertById<T extends { id: number }>(items: T[], nextItem: T) {
  const index = items.findIndex((item) => item.id === nextItem.id);
  if (index < 0) return [nextItem, ...items];

  const cloned = [...items];
  cloned[index] = nextItem;
  return cloned;
}

function mediaCmsReducer(state: MediaCmsState, action: MediaCmsAction): MediaCmsState {
  switch (action.type) {
    case "set-loading":
      return { ...state, loading: action.payload };
    case "set-error":
      return { ...state, error: action.payload };
    case "set-categories":
      return { ...state, categories: action.payload };
    case "upsert-category":
      return { ...state, categories: upsertById(state.categories, action.payload) };
    case "remove-category":
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload),
        activeCategoryId:
          state.activeCategoryId === action.payload ? null : state.activeCategoryId,
      };
    case "set-active-category":
      return { ...state, activeCategoryId: action.payload };
    case "set-medias":
      return { ...state, medias: action.payload };
    case "upsert-media":
      return { ...state, medias: upsertById(state.medias, action.payload) };
    case "remove-media":
      return {
        ...state,
        medias: state.medias.filter((media) => media.id !== action.payload),
        activeMediaId: state.activeMediaId === action.payload ? null : state.activeMediaId,
      };
    case "set-active-media":
      return { ...state, activeMediaId: action.payload };
    default:
      return state;
  }
}

const initialState: MediaCmsState = {
  categories: [],
  activeCategoryId: null,
  medias: [],
  activeMediaId: null,
  loading: false,
  error: "",
};

export function useMediaCmsStore() {
  const [state, dispatch] = useReducer(mediaCmsReducer, initialState);

  return {
    state,
    setLoading: (value: boolean) => dispatch({ type: "set-loading", payload: value }),
    setError: (message: string) => dispatch({ type: "set-error", payload: message }),
    setCategories: (categories: CategoryResponse[]) =>
      dispatch({ type: "set-categories", payload: categories }),
    upsertCategory: (category: CategoryResponse) =>
      dispatch({ type: "upsert-category", payload: category }),
    removeCategory: (categoryId: number) =>
      dispatch({ type: "remove-category", payload: categoryId }),
    setActiveCategory: (categoryId: number | null) =>
      dispatch({ type: "set-active-category", payload: categoryId }),
    setMedias: (medias: MediaResponse[]) => dispatch({ type: "set-medias", payload: medias }),
    upsertMedia: (media: MediaResponse) => dispatch({ type: "upsert-media", payload: media }),
    removeMedia: (mediaId: number) => dispatch({ type: "remove-media", payload: mediaId }),
    setActiveMedia: (mediaId: number | null) =>
      dispatch({ type: "set-active-media", payload: mediaId }),
  };
}

export function selectActiveCategory(state: MediaCmsState) {
  if (state.activeCategoryId === null) return null;
  return state.categories.find((category) => category.id === state.activeCategoryId) ?? null;
}

export function selectActiveMedia(state: MediaCmsState) {
  if (state.activeMediaId === null) return null;
  return state.medias.find((media) => media.id === state.activeMediaId) ?? null;
}

export function selectMediasByCategoryId(state: MediaCmsState, categoryId: number) {
  return selectMediaByCategoryId(state.medias, categoryId);
}

export function selectMediasByType(state: MediaCmsState, type: MediaType) {
  return selectMediaByType(state.medias, type);
}
