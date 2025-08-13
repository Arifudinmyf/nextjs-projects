"use client";

import { FC } from "react";
import Lottie from "lottie-react";

interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  className?: string;
}

const LottieAnimation: FC<LottieAnimationProps> = ({ animationData, loop = true, className }) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      className={className || "w-64 h-64"}
    />
  );
};

export default LottieAnimation;