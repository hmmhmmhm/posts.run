import {
  postboxPageActions,
  usePostboxPageState,
} from "@/lib/state/postbox-page";
import { Dialog, DialogButton } from "konsta/react";

export const PublishWelcomeDialog = () => {
  const postboxPageState = usePostboxPageState();
  return (
    <Dialog
      opened={postboxPageState.isNeedToShowPublishedDialog}
      onBackdropClick={() => postboxPageActions.closePublishedDialog()}
      title="새해인사 우체통"
      content="신년카드가 성공적으로 생성되었어요! 공유하기 버튼을 눌러서 상대방에게 공유해보세요!"
      buttons={
        <DialogButton onClick={() => postboxPageActions.closePublishedDialog()}>
          확인
        </DialogButton>
      }
    />
  );
};
