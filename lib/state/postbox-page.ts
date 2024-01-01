"use client";
import {
  SelectableColor,
  SelectableStyle,
} from "@/components/ModifyModal/constants";
import { proxy, useSnapshot } from "valtio";
import { postboxState } from "./postbox";

export const postboxPageState = proxy({
  isLetterPressed: false,
  isSplineLoaded: false,
  isModifyModalOpen: false,
  isCreatingAIMessage: false,
  isUploadingImages: false,
  isPublishing: false,
  isNeedToShowPublishedDialog: false,
  choosedModifyModalSubMenu: "message" as "message" | "images",
  /**
   * @description
   * AI 이미지를 생성할 때, 참조될 색상입니다.
   * 기본값은 "yellow"입니다.
   */
  choosedModifyModalColor: "yellow" as SelectableColor,
  /**
   * @description
   * AI 이미지를 생성할 때, 참조될 스타일입니다.
   * 기본값은 "Van Gogh"입니다.
   */
  choosedModifyModalStyle: "Van Gogh" as SelectableStyle,
  /**
   * @description
   * AI 이미지를 생성할 때, 참조될 추가적인 프롬프트입니다.
   */
  choosedModifyModalAIDescription: "",
  /**
   * @description
   * 신년카드가 업로드 되면 고유한 URL이 생성되고, 이 URL을 통해 공유가 가능합니다.
   * 그 전에는 공유하기 시 사이트 주소만 공유됩니다.
   */
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
  setChoosedModifyModalSubMenu(
    choosedModifyModalSubMenu: "message" | "images"
  ) {
    postboxPageState.choosedModifyModalSubMenu = choosedModifyModalSubMenu;
  },
  setChoosedModifyModalColor(choosedModifyModalColor: SelectableColor) {
    postboxPageState.choosedModifyModalColor = choosedModifyModalColor;
  },
  setChoosedModifyModalAIDescription(choosedModifyModalAIDescription: string) {
    postboxPageState.choosedModifyModalAIDescription =
      choosedModifyModalAIDescription;
  },
  setChoosedModifyModalStyle(choosedModifyModalStyle: SelectableStyle) {
    postboxPageState.choosedModifyModalStyle = choosedModifyModalStyle;
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
          "공유하기를 지원하지 않는 브라우저에요. 주소창의 URL을 직접 복사해서 공유해주세요."
        );
        console.log(error);
      });
  },
  async generateAIMessage() {
    let aiMessage = "새해 복 많이 받으세요!";
    postboxPageState.isCreatingAIMessage = true;

    try {
      const response = await fetch("/api/new-year/create-message", {
        method: "POST",
      });

      const { generatedMessage } = await response.json();
      if (generatedMessage) aiMessage = generatedMessage;
    } catch (e) {}

    postboxPageState.isCreatingAIMessage = false;
    postboxState.message = aiMessage;

    return aiMessage;
  },
  async generateAIImage() {
    let uploadedImageUrl = "https://placehold.co/600x400";

    postboxPageState.isUploadingImages = true;

    // TODO 목업 제거
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // TODO 실제 A.I 이미지 생성 코드 작성
    } catch (e) {}

    postboxPageState.isUploadingImages = false;
    postboxState.images.push(uploadedImageUrl);
  },
  async uploadImage(file: File) {
    let uploadedImageUrl = "https://placehold.co/600x400";

    postboxPageState.isUploadingImages = true;

    // TODO 목업 제거
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // TODO 실제 업로드 코드 작성
    } catch (e) {}

    postboxPageState.isUploadingImages = false;
    postboxState.images.push(uploadedImageUrl);
  },
  deleteImage(imageUrl: string) {
    postboxState.images = postboxState.images.filter(
      (image) => image !== imageUrl
    );
  },
  async publishPost() {
    // * 검증
    if (postboxState.message.length < 20) {
      alert("메시지는 최소 20자 이상 입력해주세요.");
      postboxPageState.isPublishing = false;
      return;
    }
    if (postboxState.to.length === 0) {
      alert("받는 사람을 입력해주세요.");
      postboxPageState.isPublishing = false;
      return;
    }
    if (postboxState.images.length > 4) {
      alert("이미지는 최대 4장까지 업로드 가능합니다.");
      postboxPageState.isPublishing = false;
      return;
    }

    postboxPageState.isPublishing = true;

    // TODO 목업 제거
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // TODO 실제 업로드 코드 작성
      postboxPageState.publishedUrl = "https://posts.run/1234";
    } catch (e) {}

    postboxPageState.isPublishing = false;
    postboxPageState.isModifyModalOpen = false;
    postboxPageState.isNeedToShowPublishedDialog = true;
  },
  closePublishedDialog() {
    postboxPageState.isNeedToShowPublishedDialog = false;
  },
  openModifyModal() {
    if (
      postboxPageState.publishedUrl &&
      postboxPageState.publishedUrl.length !== 0 &&
      postboxPageState.publishedUrl !== "https://posts.run/"
    ) {
      return;
    }
    postboxPageActions.setIsModifyModalOpen(true);
  },
};

export const usePostboxPageState = () =>
  useSnapshot(postboxPageState) as typeof postboxPageState;
