"use client";
import {
  SelectableColor,
  SelectableStyle,
} from "@/components/ModifyModal/constants";
import { proxy, useSnapshot } from "valtio";
import { postboxState } from "./postbox";
import { useEffectOnce } from "usehooks-ts";

export const postboxPageState = proxy({
  isServerDataQueried: false,
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
      .catch((e) => {
        console.log(e);
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

    try {
      const response = await fetch("/api/new-year/create-image", {
        method: "POST",
        body: JSON.stringify({
          color: postboxPageState.choosedModifyModalColor,
          style: postboxPageState.choosedModifyModalStyle,
          additionalPrompt: postboxPageState.choosedModifyModalAIDescription,
        }),
      });

      const { generatedImageUrl } = await response.json();
      if (generatedImageUrl) uploadedImageUrl = generatedImageUrl;
    } catch (e) {}

    postboxPageState.isUploadingImages = false;
    postboxState.images.push(uploadedImageUrl);
  },
  async uploadImage(file: File) {
    let uploadedImageUrl = "https://placehold.co/600x400";

    postboxPageState.isUploadingImages = true;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/new-year/upload-image", {
        method: "POST",
        body: formData,
      });

      const { uploadedImageUrl: _uploadedImageUrl } = await response.json();
      if (_uploadedImageUrl) uploadedImageUrl = _uploadedImageUrl;
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

    try {
      const response = await fetch("/api/new-year/publish-card", {
        method: "POST",
        body: JSON.stringify({
          message: postboxState.message,
          to: postboxState.to,
          images: postboxState.images,
        }),
      });

      const { publishUrl } = await response.json();
      if (publishUrl) {
        postboxPageState.publishedUrl = publishUrl;
      } else {
        alert(
          "네트워크 문제로 업로드에 실패했습니다. 나중에 다시 시도 부탁드립니다."
        );
      }
    } catch (e) {}

    postboxPageState.isPublishing = false;
    postboxPageState.isModifyModalOpen = false;
    postboxPageState.isNeedToShowPublishedDialog = true;

    if (
      postboxPageState.publishedUrl &&
      postboxPageState.publishedUrl.length !== 0 &&
      postboxPageState.publishedUrl !== "https://posts.run/"
    )
      postboxPageActions.shareToSNS();
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
  loadServerData(id: string) {
    if (!id) {
      postboxPageState.isServerDataQueried = true;
      return;
    }

    try {
      fetch(`/api/new-year/card`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
        cache: "force-cache",
      }).then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          console.log("no data");
          return;
        }
        postboxState.message = data.message ?? "";
        postboxState.to = data.to ?? "";
        postboxState.images = data.images ?? [];
        postboxPageState.publishedUrl = `https://posts.run/new-year/${id}`;
        console.log("loaded??", data);
      });
    } catch (e) {}
    postboxPageState.isServerDataQueried = true;
  },
};

export const usePostboxPageState = () =>
  useSnapshot(postboxPageState) as typeof postboxPageState;

export const usePostboxServerData = (id: string) => {
  useEffectOnce(() => {
    postboxPageActions.loadServerData(id);
  });
};
