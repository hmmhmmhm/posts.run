import { postboxPageActions } from "@/lib/state/postbox-page";
import Spline, { SplineEvent } from "@splinetool/react-spline";
import { Application as SplineApplication } from "@splinetool/runtime";

export interface PostboxSplineProps {
  splineRef: React.MutableRefObject<SplineApplication | null>;
}

export const PostboxSpline = (props: PostboxSplineProps) => {
  const { splineRef } = props;
  return (
    <Spline
      scene="https://prod.spline.design/49K5A8xapEdTSHlv/scene.splinecode"
      className="absolute"
      onLoad={(spline: SplineApplication) => {
        if (spline) splineRef.current = spline;
      }}
      onMouseUp={(event: SplineEvent) => {
        if (event.target.name === "Door wrap") {
          postboxPageActions.setIsSplineLoaded(true);
          postboxPageActions.setIsLetterPressed(true);
        }
        if (
          event.target.name === "User Message" ||
          event.target.name === "To Ment"
        ) {
          postboxPageActions.setIsModifyModalOpen(true);
        }
        if (event.target.name === "Share OK Text") {
          console.log("공유 기능 동작");
          // TODO 공유 native 기능 동작
        }
      }}
      onMouseMove={() => {
        postboxPageActions.setIsSplineLoaded(true);
      }}
    />
  );
};
