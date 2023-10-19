import { RefObject, useCallback, useEffect, useRef, useState } from "react";

// Import WaveSurfer
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import Timeline from "wavesurfer.js/plugins/timeline";
import Regions from "wavesurfer.js/plugins/regions";

// WaveSurfer hook
const useWavesurfer = (
  containerRef: RefObject<HTMLDivElement>,
  options: Partial<WaveSurferOptions>
) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

interface WaveSurferPlayerProps {
  options: Partial<WaveSurferOptions>;
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props: WaveSurferPlayerProps) => {
  const { options } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, options);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer?.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="min-h-[120px] bg-gray-100 border rounded-md"
      />
      <button onClick={onPlayClick} style={{ marginTop: "1em" }}>
        {isPlaying ? "Pause" : "Play"}
      </button>
      <p>Seconds played: {currentTime}</p>
    </div>
  );
};

// Another React component that will render two wavesurfers
const App = () => {
  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <div className="container mx-auto p-8 flex flex-col gap-8 items-start">
      <h1 className="font-bold text-2xl">Musicbot</h1>

      <WaveSurferPlayer
        options={{
          height: 100,
          waveColor: "rgb(200, 0, 200)",
          progressColor: "rgb(100, 0, 100)",
          url: "/audio/one.mp3",
          plugins: [Timeline.create(), Regions.create()],
        }}
      />
    </div>
  );
};

export default App;
