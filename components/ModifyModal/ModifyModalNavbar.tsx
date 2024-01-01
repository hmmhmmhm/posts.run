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
      title="신년카드"
      titleClassName="!text-2xs sm:text-xs md:text-sm"
      left={
        <NavbarBackLink
          onClick={() => {
            postboxPageActions.setIsModifyModalOpen(false);
          }}
          text="취소"
          className="text-2xs sm:text-xs md:text-sm"
        />
      }
      right={
        <Link
          navbar
          onClick={() => {
            postboxPageActions.publishPost();
          }}
          className="text-2xs sm:text-xs md:text-sm"
        >
          완료
        </Link>
      }
      subnavbar={
        <Segmented strong className="text-2xs sm:text-xs md:text-sm">
          <SegmentedButton
            strong
            active={postboxPageState.choosedModifyModalSubMenu === "message"}
            onClick={() => {
              postboxPageActions.setChoosedModifyModalSubMenu("message");
            }}
            className="!text-2xs sm:!text-xs md:!text-sm"
          >
            메세지
          </SegmentedButton>
          <SegmentedButton
            strong
            active={postboxPageState.choosedModifyModalSubMenu === "images"}
            onClick={() => {
              postboxPageActions.setChoosedModifyModalSubMenu("images");
            }}
            className="!text-2xs sm:!text-xs md:!text-sm"
          >
            이미지 추가
          </SegmentedButton>
        </Segmented>
      }
    />
  );
};
