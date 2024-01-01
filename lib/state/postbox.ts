"use client";
import { proxy, useSnapshot } from "valtio";
import { MutableRefObject, useEffect } from "react";
import { Application as SplineApplication } from "@splinetool/runtime";

export const postboxState = proxy({
  message: "",
  to: "",
  images: [] as string[],
});

export const postboxActions = {
  setMessage(message: string) {
    postboxState.message = message;
  },
  setTo(to: string) {
    postboxState.to = to;
  },
  setImages(images: string[]) {
    postboxState.images = images;
  },
};

export const usePostboxState = () =>
  useSnapshot(postboxState) as typeof postboxState;

export const usePostboxInSpline = ({
  postbox,
  splineRef,
}: {
  postbox: typeof postboxState;
  splineRef: MutableRefObject<SplineApplication | null>;
}) => {
  useEffect(() => {
    if (postbox.message?.length > 0)
      splineRef.current?.setVariable("User Message", postbox.message);
  }, [postbox?.message, splineRef.current]);
  useEffect(() => {
    if (postbox.to?.length > 0)
      splineRef.current?.setVariable("To Ment", postbox.to);
  }, [postbox?.to, splineRef.current]);
};
