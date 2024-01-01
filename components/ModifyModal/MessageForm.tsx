import { postboxActions, usePostboxState } from "@/lib/state/postbox";
import {
  postboxPageActions,
  usePostboxPageState,
} from "@/lib/state/postbox-page";
import { Backdrop, CircularProgress } from "@mui/material";
import { Block, BlockTitle, Button, List, ListInput } from "konsta/react";

export const MessageForm = () => {
  const postboxState = usePostboxState();
  const postboxPageState = usePostboxPageState();
  return (
    <>
      <Backdrop open={postboxPageState.isCreatingAIMessage} className="z-20">
        <div className="flex flex-col items-center space-y-4">
          <CircularProgress className="text-white" size={64} />
          <p className="text-white">메세지를 자동으로 작성하는 중입니다.</p>
        </div>
      </Backdrop>

      <BlockTitle className="text-black">신년카드 메세지</BlockTitle>
      <List strongIos insetIos>
        <ListInput
          outline
          label="받는 분 (필수)"
          type="text"
          placeholder="당신에게"
          onChange={(event) => {
            if (event.target.value.length > 20) {
              event.target.value = event.target.value.slice(0, 20);
              postboxActions.setTo(event.target.value);
              return;
            }
            postboxActions.setTo(event.target.value);
          }}
          info={`현재 ${postboxState.to.length}자 / 20자`}
        />
        <ListInput
          outline
          id="new-year-message"
          type="textarea"
          label="신년인사 메세지 (필수)"
          placeholder="여기에 메세지를 작성해주세요."
          inputClassName="!h-36 resize-none"
          info={`현재 ${postboxState.message.length}자 / 80자`}
          onChange={(event) => {
            // * 메세지 길이 80자로 제한
            if (event.target.value.length > 80) {
              event.target.value = event.target.value.slice(0, 80);
              return;
            }

            // * 메세지가 5줄이 넘어가면 6번째줄 부터 메세지 삭제
            if (event.target.value.split("\n").length > 5) {
              event.target.value = event.target.value
                .split("\n")
                .slice(0, 6)
                .join("\n");
              postboxActions.setMessage(event.target.value);
              return;
            }

            // * 한 줄에 19자가 넘어가는 줄이 있으면 그 줄 19자까지만 입력
            if (
              event.target.value
                .split("\n")
                .some((line: string) => line.length > 19)
            ) {
              event.target.value = event.target.value
                .split("\n")
                .map((line: string) => line.slice(0, 19))
                .join("\n");
              postboxActions.setMessage(event.target.value);
              return;
            }
            postboxActions.setMessage(event.target.value);
          }}
        />
      </List>

      <Block strong insetIos className="space-y-2" outline>
        <p className="text-gray-600 text-xs">
          신년인사 메세지는 한줄에 19자만 입력가능하며, 최대 5줄까지만 입력이
          가능해요. 입력 후 수정이 불가하니 신중하게 작성해주세요.
        </p>
      </Block>

      <Block strong insetIos outline className="space-y-2">
        <Button
          large
          className="w-full"
          onClick={async () => {
            const message = await postboxPageActions.generateAIMessage();
            const element = document.querySelector(
              "#new-year-message > * > * > * > textarea"
            ) as HTMLTextAreaElement;
            if (element) element.value = message;
          }}
        >
          A.I로 신년인사 메세지 생성하기
        </Button>
      </Block>
    </>
  );
};
