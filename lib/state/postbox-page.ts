"use client";
import { proxy, useSnapshot } from "valtio";

export const postboxPageState = proxy({
  isLetterPressed: false,
  isSplineLoaded: false,
  isModifyModalOpen: false,
  publishedUrl: "https://posts.run/",
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
  shareToSNS() {
    navigator
      .share({
        title: "새해인사 우체통",
        text: "열어서 새해인사 카드를 확인해보세요!",
        url: postboxPageState.publishedUrl,
        hashtags: "새해인사,신년인사,새해,신년",
      })
      .catch((error) => {
        alert(
          "공유하기를 지원하지 않는 브라우저입니다. 주소창의 URL을 직접 복사해서 공유해주세요."
        );
        console.log(error);
      });
  },
};

export const usePostboxPageState = () =>
  useSnapshot(postboxPageState) as typeof postboxPageState;
