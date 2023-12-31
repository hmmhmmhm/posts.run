import { useEffect, useState } from "react";

export interface FullImageSliderProps {
  images: string[];
}

export const FullImageSlider = (props: FullImageSliderProps) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (currentImage) => (currentImage + 1) % images?.length ?? 0
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      {images?.map((image, index) => (
        <div
          key={image}
          className={`absolute w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in ${
            index !== currentImage ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url('${image}')` }}
        />
      ))}
    </div>
  );
};
