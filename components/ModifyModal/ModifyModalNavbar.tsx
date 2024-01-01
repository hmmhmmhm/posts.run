import {
  postboxPageActions,
  usePostboxPageState,
} from "@/lib/state/postbox-page";
import {
  Link,
  Navbar,
  NavbarBackLink,
  Segmented,
  SegmentedButton,
} from "konsta/react";

export const ModifyModalNavbar = () => {
  const postboxPageState = usePostboxPageState();
  return (
    <Navbar
      title="내 신년카드 작성하기"
      left={
        <NavbarBackLink
          onClick={() => {
            postboxPageActions.setIsModifyModalOpen(false);
          }}
          text="취소"
        />
      }
      right={
        <Link
          navbar
          onClick={() => {
            postboxPageActions.publishPost();
          }}
        >
          완료
        </Link>
      }
      subnavbar={
        <Segmented strong>
          <SegmentedButton
            strong
            active={postboxPageState.choosedModifyModalSubMenu === "message"}
            onClick={() => {
              postboxPageActions.setChoosedModifyModalSubMenu("message");
            }}
          >
            메세지
          </SegmentedButton>
          <SegmentedButton
            strong
            active={postboxPageState.choosedModifyModalSubMenu === "images"}
            onClick={() => {
              postboxPageActions.setChoosedModifyModalSubMenu("images");
            }}
          >
            이미지 추가
          </SegmentedButton>
        </Segmented>
      }
    />
  );
};
