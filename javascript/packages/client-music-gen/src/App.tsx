import { Button } from "@musicbot/shared";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import Regions from "wavesurfer.js/plugins/regions";
import Timeline from "wavesurfer.js/plugins/timeline";

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
  const regionsPlugin = options.plugins?.[1] as Regions;

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

    // allow creation of regions
    regionsPlugin.enableDragSelection({});

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),

      // region can be removed by clicking on it
      regionsPlugin.on("region-clicked", (region) => {
        region.remove();
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, regionsPlugin]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="min-h-[120px] bg-gray-100 border rounded-md"
      />
      <br />
      <div className="flex flex-col items-start gap-4">
        <p>Seconds played: {currentTime}</p>
        <div className="flex flex-wrap gap-4">
          <Button onClick={onPlayClick}>{isPlaying ? "Pause" : "Play"}</Button>
          <Button onClick={() => regionsPlugin.clearRegions()}>
            Clear all regions
          </Button>
        </div>
      </div>
    </div>
  );
};

// Another React component that will render two wavesurfers
const App = () => {
  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <div className="container flex flex-col items-start gap-8 p-8 mx-auto">
      <h1 className="text-2xl font-bold">Musicbot</h1>
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
