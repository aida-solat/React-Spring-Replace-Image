import React, { Suspense, useReducer, useEffect } from "react";
import { tw, setup } from "twind";
import { a, useSpring } from "@react-spring/web";
import { useImage } from "react-image";

setup();

function Image({ seed }) {
  const { src } = useImage({
    srcList: `https://picsum.photos/seed/${seed}/500/500`,
  });
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: true,
  });
  return (
    <a.div style={style}>
      <img
        width={500}
        height={500}
        src={src}
        alt="random"
        className={tw`transform transition-transform hover:scale-105`}
      />
    </a.div>
  );
}

function ImageBox(props) {
  const [seed, refresh] = useReducer(() => Math.random(), Math.random());
  return (
    <div onClick={refresh} class={tw`bg-gray-200 overflow-hidden`}>
      <Suspense fallback={null}>
        <Image seed={seed} />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <div class={tw`max-w-2xl mx-auto py-12 px-4 pb-32 font-serif`}>
      <h1 class={tw`my-8 text(6xl center) uppercase`}>~Picsum~</h1>
      <hr />
      <h2 class={tw`text(lg center) m-8`}>Click to replace an image.</h2>
      <div class={tw`grid grid-cols-2 gap-4`}>
        {[...Array(10)].map(() => (
          <ImageBox />
        ))}
      </div>
    </div>
  );
}
