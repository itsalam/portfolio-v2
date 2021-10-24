import React from "react";
import { useAspect } from "@react-three/drei";
import { useEffect, useState } from "react";
import fragmentShader from "../../assets/shaders/fragment.glsl";
import vertexShader from "../../assets/shaders/vertex.glsl";
import videoURL from "../../assets/2-1.mp4";
import { VideoTexture } from "three";
import { useBlock } from "../../store/slices/slides";

export default function Background() {
  const { canvasWidth, canvasHeight, mobile } = useBlock();
  const aspect = (canvasWidth / canvasHeight) * (mobile? 1.4: 0.7)
  const size = useAspect(aspect, 1, 1);
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
  const videoTexture = new VideoTexture(video);

  const customShader = (
    <shaderMaterial
      attach="material"
      args={[
        {
          uniforms: {
            videoTexture: { value: videoTexture },
          },
          fragmentShader,
          vertexShader,
        },
      ]}
    />
  );

  const regularShader = (
    <meshBasicMaterial opacity={0.1} transparent>
      <videoTexture attach="map" args={[video]} />
    </meshBasicMaterial>
  );

  return (
    <mesh scale={size}>
      <planeBufferGeometry args={[1.0, mobile? 1.1: 1.4]} />
      {customShader}
    </mesh>
  );
}
