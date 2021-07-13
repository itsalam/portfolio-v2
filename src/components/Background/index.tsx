import React from "react";
import { useAspect } from "@react-three/drei";
import { useEffect, useState } from "react";
import videoURL from "../../assets/2-1.mp4";

export default function Background() {
    const size = useAspect(640, 360);
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
        <planeBufferGeometry args={[1.0, 1.2]} />
        <meshBasicMaterial opacity={.10} transparent>
          <videoTexture attach="map" args={[video]} />
        </meshBasicMaterial>
      </mesh>
    );
  }