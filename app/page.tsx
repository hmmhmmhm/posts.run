"use client";
import { useRef } from "react";
import { CircularProgress } from "@mui/material";
import Spline, { SplineEvent } from "@splinetool/react-spline";
import { Application as SplineApplication } from "@splinetool/runtime";

export default function App() {
  const splineRef = useRef<SplineApplication | null>(null);
  const onLoad = (spline: SplineApplication) => {
    if (spline) splineRef.current = spline;
  };

  const onMouseUp = (event: SplineEvent) => {
    console.log({ targetName: event.target.name, id: event.target.id });
    if (event.target.name === "Door wrap") {
      console.log("문 클릭 시도");
      // TODO 이미지 표시 활성화
    }
    if (event.target.name === "User Message") {
      console.log("유저 메세지 수정 시도");
      splineRef.current?.setVariable("User Message", "테스트1");
    }
    if (event.target.name === "User A.I Message") {
      console.log("유저 A.I 메세지 수정 시도");
      splineRef.current?.setVariable("AI Message Guide", "테스트2");
    }
    if (event.target.name === "Share OK Text") {
      console.log("공유 기능 동작");
      // TODO 공유 native 기능 동작
    }
    if (event.target.name === "To Ment") {
      console.log("수신자 변경 시도");
      splineRef.current?.setVariable("To Ment", "테스트3");
    }
  };

  return (
    <main className="bg-[#E8C9A4] size-full h-screen">
      <div className="absolute size-full h-screen flex justify-center items-center">
        <CircularProgress className="text-white" size={64} />
      </div>

      <Spline
        scene="https://prod.spline.design/49K5A8xapEdTSHlv/scene.splinecode"
        className="absolute"
        onLoad={onLoad}
        onMouseUp={onMouseUp}
      />
    </main>
  );
}
