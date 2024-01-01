import { Backdrop, CircularProgress } from "@mui/material";
import { App, Page } from "konsta/react";
import { ModifyModalNavbar } from "./ModifyModalNavbar";
import { MessageForm } from "./MessageForm";
import { ImageForm } from "./ImageForm";
import { usePostboxPageState } from "@/lib/state/postbox-page";

export const CreateMessageForm = () => {
  const postboxPageState = usePostboxPageState();

  return (
    <Backdrop open={postboxPageState.isModifyModalOpen}>
      <div className="w-full select-none max-w-[400px] p-8">
        <App theme="ios" dark={false}>
          <Backdrop open={postboxPageState.isPublishing} className="z-30">
            <div className="flex flex-col items-center space-y-4">
              <CircularProgress className="text-white" size={64} />
              <p className="text-white">신년카드를 업로드하는 중입니다.</p>
            </div>
          </Backdrop>

          <Page className="no-scrollbar rounded-2xl">
            <ModifyModalNavbar />

            <div className="w-full h-full overflow-scroll no-scrollbar pb-4">
              {postboxPageState.choosedModifyModalSubMenu === "images" && (
                <ImageForm />
              )}

              {postboxPageState.choosedModifyModalSubMenu === "message" && (
                <MessageForm />
              )}
            </div>
          </Page>
        </App>
      </div>
    </Backdrop>
  );
};
