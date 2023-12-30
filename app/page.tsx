"use client";
import { useEffect, useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import Spline, { SplineEvent } from "@splinetool/react-spline";
import { Application as SplineApplication } from "@splinetool/runtime";

export default function App() {
  const splineRef = useRef<SplineApplication | null>(null);
  const [isLetterPressed, setIsLetterPressed] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const imageList: string[] = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % imageList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const onLoad = (spline: SplineApplication) => {
    if (spline) splineRef.current = spline;
  };

  const onMouseUp = (event: SplineEvent) => {
    if (event.target.name === "Door wrap") {
      setIsSplineLoaded(true);
      setIsLetterPressed(true);
    }
    if (event.target.name === "User Message") {
      console.log("유저 메세지 수정 시도");
      splineRef.current?.setVariable("User Message", "테스트1");
      setIsModifyModalOpen(true);
    }
    if (event.target.name === "To Ment") {
      console.log("수신자 변경 시도");
      splineRef.current?.setVariable("To Ment", "테스트3");
      setIsModifyModalOpen(true);
    }
    if (event.target.name === "Share OK Text") {
      console.log("공유 기능 동작");
      // TODO 공유 native 기능 동작
    }
  };

  // TODO 유저 메세지 작성 모달 구현
  // TODO (수신자 변경 모달 및 이미지 생성 또는 업로드 모달도 추가)

  return (
    <main className="bg-[#E8C9A4] size-full h-screen overflow-hidden">
      <div className="absolute size-full h-screen flex justify-center items-center">
        {!isSplineLoaded && (
          <CircularProgress className="text-white" size={64} />
        )}
        {isLetterPressed && imageList?.length > 0 && (
          <div className="relative w-full h-full">
            {imageList.map((image, index) => (
              <div
                key={image}
                className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in ${
                  index !== currentImage ? "opacity-0" : "opacity-100"
                }`}
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
          </div>
        )}
      </div>

      <Spline
        scene="https://prod.spline.design/49K5A8xapEdTSHlv/scene.splinecode"
        className="absolute"
        onLoad={onLoad}
        onMouseUp={onMouseUp}
        onMouseMove={() => {
          setIsSplineLoaded(true);
        }}
      />
    </main>
  );
}
