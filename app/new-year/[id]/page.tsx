"use client";
import { CircularProgress } from "@mui/material";
import { Application as SplineApplication } from "@splinetool/runtime";
import { usePostboxInSpline, usePostboxState } from "@/lib/state/postbox";
import {
  usePostboxPageState,
  usePostboxServerData,
} from "@/lib/state/postbox-page";
import { useRef } from "react";
import { FullImageSlider } from "@/components/FullImageSlider";
import { PostboxSpline } from "@/components/PostboxSpline";
import { CreateMessageForm } from "@/components/ModifyModal/Modal";
import { PublishWelcomeDialog } from "@/components/PublishWelcomeDialog";

export default function NewYearPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const splineRef = useRef<SplineApplication | null>(null);
  const postboxPage = usePostboxPageState();
  const postbox = usePostboxState();

  usePostboxServerData(id);
  usePostboxInSpline({
    postbox,
    splineRef,
  });

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
      <CreateMessageForm />
      <PublishWelcomeDialog />
    </main>
  );
}
