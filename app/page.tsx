"use client";
import { CircularProgress } from "@mui/material";
import { Application as SplineApplication } from "@splinetool/runtime";
import { usePostboxInSpline, usePostboxState } from "@/lib/state/postbox";
import { usePostboxPageState } from "@/lib/state/postbox-page";
import { useRef } from "react";
import { FullImageSlider } from "@/components/FullImageSlider";
import { PostboxSpline } from "@/components/PostboxSpline";

export default function App() {
  const splineRef = useRef<SplineApplication | null>(null);
  const postboxPage = usePostboxPageState();
  const postbox = usePostboxState();

  usePostboxInSpline({
    postbox,
    splineRef,
  });

  // TODO 유저 메세지 작성 모달 구현
  // TODO (수신자 변경 모달 및 이미지 생성 또는 업로드 모달도 추가)

  return (
    <main className="bg-[#E8C9A4] size-full h-screen overflow-hidden">
      <div className="absolute size-full h-screen flex justify-center items-center">
        {!postboxPage.isSplineLoaded && (
          <CircularProgress className="text-white" size={64} />
        )}
        {postboxPage.isLetterPressed && postbox.images?.length > 0 && (
          <FullImageSlider images={postbox.images} />
        )}
      </div>

      <PostboxSpline splineRef={splineRef} />
    </main>
  );
}
