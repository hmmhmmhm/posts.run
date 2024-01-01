import { Block, BlockTitle, Button, List, ListInput } from "konsta/react";
import { ImageUpload } from "../ImageUpload";
import {
  postboxPageActions,
  usePostboxPageState,
} from "@/lib/state/postbox-page";
import { modifyColors, modifyStyles } from "./constants";
import { usePostboxState } from "@/lib/state/postbox";
import { Fragment } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const ImageForm = () => {
  const postboxState = usePostboxState();
  const postboxPageState = usePostboxPageState();
  return (
    <>
      <Backdrop open={postboxPageState.isUploadingImages} className="z-20">
        <div className="flex flex-col items-center space-y-4">
          <CircularProgress className="text-white" size={64} />
          <p className="text-white text-2xs sm:text-sm">
            이미지를 추가하는 중입니다.
          </p>
        </div>
      </Backdrop>

      <BlockTitle className="text-black !text-xs !sm:text-sm">
        이미지 업로드
      </BlockTitle>
      {postboxState.images.map((imageUrl, index) => (
        <Fragment key={index}>
          <Block strong insetIos className="space-y-2" outline key={index}>
            <ImageUpload
              imageUrl={imageUrl}
              onDelete={() => {
                postboxPageActions.deleteImage(imageUrl);
              }}
            />
          </Block>
        </Fragment>
      ))}

      {postboxState.images.length < 4 && (
        <Block strong insetIos className="space-y-2" outline>
          <ImageUpload
            onChange={(event) => {
              if (!event.target.files) return;

              if (event.target.files[0].size > 5 * 1024 * 1024) {
                alert("이미지는 개당 최대 5MB 까지만 업로드 가능합니다.");
                return;
              }

              if (postboxState.images.length >= 4) {
                alert("이미지는 최대 4개까지 업로드 가능합니다.");
                return;
              }

              postboxPageActions.uploadImage(event.target.files[0]);
            }}
          />
        </Block>
      )}

      <Block strong insetIos className="space-y-2" outline>
        <p className="text-gray-600 text-2xs sm:text-sm leading-relaxed">
          이미지는 최대 4장까지 추가가 가능하며, 생성된 이미지는 차례대로
          슬라이드되어 표시될거에요. (A.I 이미지도 4개까지만 추가 가능해요.)
        </p>
      </Block>

      <Block strong insetIos outline className="space-y-2">
        <Button
          large
          className="w-full text-2xs sm:text-sm"
          onClick={() => {
            postboxPageActions.generateAIImage();
          }}
          disabled={postboxState.images.length >= 4}
        >
          A.I로 이미지 생성하기 (최대 15초 소요)
        </Button>
      </Block>

      <BlockTitle className="text-black !text-xs sm:!text-sm">
        A.I 이미지 배경색 설정
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {modifyColors.map(({ name, value, bgRgba }) => (
            <Button
              large
              key={value}
              onClick={() =>
                postboxPageActions.setChoosedModifyModalColor(value)
              }
              className={`${
                postboxPageState.choosedModifyModalColor === value
                  ? "border border-primary"
                  : ""
              } bg-white !text-black shadow-md flex gap-2 text-2xs sm:text-sm`}
            >
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: bgRgba,
                }}
              />
              <span>{name}</span>
            </Button>
          ))}
        </div>
      </Block>

      <BlockTitle className="text-black !text-xs sm:!text-sm">
        A.I 이미지 스타일 설정
      </BlockTitle>
      <Block strong insetIos outline className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {modifyStyles.map(({ name, value }) => (
            <Button
              large
              key={value}
              onClick={() =>
                postboxPageActions.setChoosedModifyModalStyle(value)
              }
              className={`${
                postboxPageState.choosedModifyModalStyle === value
                  ? "border border-primary"
                  : ""
              } bg-white !text-black shadow-md text-2xs sm:text-sm break-keep`}
            >
              {name}
            </Button>
          ))}
        </div>
      </Block>

      <BlockTitle className="text-black !text-xs sm:!text-sm">
        A.I 이미지 프롬프트 설정
      </BlockTitle>
      <List strongIos insetIos>
        <ListInput
          outline
          type="textarea"
          label="이미지 설명"
          placeholder="여기에 생성할 이미지 설명을 자유롭게 작성해주세요."
          inputClassName="!h-36 resize-none !text-2xs sm:!text-sm leading-relaxed"
          info={`현재 ${postboxPageState.choosedModifyModalAIDescription.length}자 / 200자`}
          onChange={(event) => {
            // * 메세지 길이 200자로 제한
            if (event.target.value.length > 200) {
              event.target.value = event.target.value.slice(0, 200);
              return;
            }
            postboxPageActions.setChoosedModifyModalAIDescription(
              event.target.value
            );
          }}
        />
      </List>
    </>
  );
};
