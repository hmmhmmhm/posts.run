"use client";
import { proxy, useSnapshot } from "valtio";

export const postboxPageState = proxy({
  isLetterPressed: false,
  isSplineLoaded: false,
  isModifyModalOpen: false,
});

export const postboxPageActions = {
  setIsLetterPressed(isLetterPressed: boolean) {
    postboxPageState.isLetterPressed = isLetterPressed;
  },
  setIsSplineLoaded(isSplineLoaded: boolean) {
    postboxPageState.isSplineLoaded = isSplineLoaded;
  },
  setIsModifyModalOpen(isModifyModalOpen: boolean) {
    postboxPageState.isModifyModalOpen = isModifyModalOpen;
  },
};

export const usePostboxPageState = () =>
  useSnapshot(postboxPageState) as typeof postboxPageState;
