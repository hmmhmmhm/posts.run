"use client";
import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import Spline, { SplineEvent } from "@splinetool/react-spline";
import { Application as SplineApplication } from "@splinetool/runtime";

export default function App() {
  const splineRef = useRef<SplineApplication | null>(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  const onLoad = (spline: SplineApplication) => {
    if (spline) splineRef.current = spline;
  };

  const onMouseUp = (event: SplineEvent) => {
    console.log({ targetName: event.target.name, id: event.target.id });
    if (event.target.name === "Door wrap") {
      setIsSplineLoaded(true);
    }
    if (event.target.name === "User Message") {
      console.log("유저 메세지 수정 시도");
      splineRef.current?.setVariable("User Message", "테스트1");
    }
    if (event.target.name === "To Ment") {
      console.log("수신자 변경 시도");
      splineRef.current?.setVariable("To Ment", "테스트3");
    }
    if (event.target.name === "Share OK Text") {
      console.log("공유 기능 동작");
      // TODO 공유 native 기능 동작
    }
  };

  return (
    <main className="bg-[#E8C9A4] size-full h-screen overflow-hidden">
      <div className="absolute size-full h-screen flex justify-center items-center">
        {!isSplineLoaded && (
          <CircularProgress className="text-white" size={64} />
        )}
        {isSplineLoaded && (
          <div
            className="size-full bg-cover bg-center transition-opacity duration-1000 ease-in opacity-0 animate-[fadeIn_3s_ease_forwards]"
            style={{
              backgroundImage: "url('https://i.imgur.com/jSym2zE.jpeg')",
            }}
          />
        )}
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
