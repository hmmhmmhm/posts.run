import { postboxActions, usePostboxState } from "@/lib/state/postbox";
import {
  postboxPageActions,
  usePostboxPageState,
} from "@/lib/state/postbox-page";
import { Backdrop } from "@mui/material";
import {
  App,
  Page,
  Navbar,
  Link,
  Segmented,
  SegmentedButton,
  ListInput,
  List,
} from "konsta/react";

export const CreateMessageForm = () => {
  const postboxPageState = usePostboxPageState();
  const postboxState = usePostboxState();

  return (
    <Backdrop open={postboxPageState.isModifyModalOpen}>
      <div className="size-full overflow-scroll select-none rounded-xl max-w-[500px] max-h-[600px]">
        <App theme="ios" dark={false}>
          <Page>
            <Navbar
              title="내 신년카드 작성하기"
              right={
                <Link
                  navbar
                  onClick={() => {
                    postboxPageActions.setIsModifyModalOpen(false);
                  }}
                >
                  완료
                </Link>
              }
              subnavbar={
                <Segmented strong>
                  <SegmentedButton
                    strong
                    active={
                      postboxPageState.choosedModifyModalSubMenu === "message"
                    }
                    onClick={() => {
                      postboxPageActions.setChoosedModifyModalSubMenu(
                        "message"
                      );
                    }}
                  >
                    메세지
                  </SegmentedButton>
                  <SegmentedButton
                    strong
                    active={
                      postboxPageState.choosedModifyModalSubMenu === "images"
                    }
                    onClick={() => {
                      postboxPageActions.setChoosedModifyModalSubMenu("images");
                    }}
                  >
                    이미지
                  </SegmentedButton>
                </Segmented>
              }
            />

            {postboxPageState.choosedModifyModalSubMenu === "message" && (
              <>
                <List strongIos insetIos>
                  <ListInput
                    outline
                    label="받는 분"
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
                    type="textarea"
                    label="신년인사 메세지"
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
              </>
            )}
          </Page>
        </App>
      </div>
    </Backdrop>
  );
};
