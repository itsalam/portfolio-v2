import React from "react";
import { useAspect } from "@react-three/drei";
import { useEffect, useState } from "react";
import videoURL from "../../assets/2.mp4";

export default function Background() {
    const size = useAspect(1800, 1000);
    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = videoURL;
      vid.crossOrigin = "Anonymous";
      vid.muted = true;
      vid.loop = true;
      vid.autoplay = true;
      vid.play();
      return vid;
    });

    return (
      <mesh scale={size}>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
    );
  }