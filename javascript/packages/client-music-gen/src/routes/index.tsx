import { Button, apiHooks } from "@musicbot/shared";
import cn from "clsx";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

interface Region {
  id: string;
  start: number;
  end: number;
}

interface WaveSurferPlayerProps {
  options: Partial<WaveSurferOptions>;
  onRegionCreated: (region: Region) => void;
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props: WaveSurferPlayerProps) => {
  const { options, onRegionCreated } = props;
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

      regionsPlugin.on("region-created", (region) => {
        let start = region.start;
        let end = region.end;
        if (start > end) {
          start = region.end;
          end = region.start;
        }
        onRegionCreated({
          id: region.id,
          start,
          end,
        });
      }),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer, regionsPlugin, onRegionCreated]);

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

const waveSurferOptions: Partial<WaveSurferOptions> = {
  height: 100,
  waveColor: "rgb(200, 0, 200)",
  progressColor: "rgb(100, 0, 100)",
  plugins: [Timeline.create(), Regions.create()],
};

const absoluteFilePathToPublicPath = (absolutePath: string) => {
  const substring = "public";
  const index = absolutePath.indexOf(substring);
  return absolutePath.substring(index).replace("public", "");
};

export const IndexRoute = () => {
  const { mutateAsync } = apiHooks.useMutation("post", "/musicgen");
  const [lastCreatedRegion, setLastCreatedRegion] = useState<Region>();
  const [prompt, setPrompt] = useState<string>(
    "A piano melody in the style of Bach"
  );
  const [absoluteFilePath, setAbsoluteFilePath] = useState<string>(
    "/Users/sarimabbas/Developer/fsr/musicbot/javascript/packages/client-music-gen/public/audio/blinding_lights/blinding_lights_instrumental.mp3"
  );
  const publicFilePath = absoluteFilePathToPublicPath(absoluteFilePath);
  const [generatedFilePath, setGeneratedFilePath] = useState<string>("");
  const isGenerateButtonDisabled =
    prompt.length < 1 || typeof lastCreatedRegion === "undefined";

  const options: Partial<WaveSurferOptions> = useMemo(
    () => ({ ...waveSurferOptions, url: publicFilePath }),
    [publicFilePath]
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <div className="container flex flex-col items-start gap-8 p-8 mx-auto">
      <h1 className="text-2xl font-bold">Musicbot</h1>
      <input
        type="url"
        placeholder="Absolute path to audio file (must be in public folder)"
        className="w-full px-2 py-1 border rounded-md"
        value={absoluteFilePath}
        onChange={(e) => {
          setAbsoluteFilePath(e.target.value);
        }}
      />
      <WaveSurferPlayer
        options={options}
        onRegionCreated={(region) => {
          setLastCreatedRegion(region);
        }}
      />
      {generatedFilePath && (
        <WaveSurferPlayer
          options={{
            ...options,
            url: absoluteFilePathToPublicPath(generatedFilePath),
          }}
          onRegionCreated={() => {}}
        />
      )}
      <div className="flex items-center w-full gap-4">
        <input
          type="text"
          placeholder="Enter your prompt here"
          className="w-full px-2 py-1 border rounded-md"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        />
        <Button
          disabled={isGenerateButtonDisabled}
          className={cn({
            isGenerateButtonDisabled: "cursor-not-allowed",
          })}
          onClick={async (e) => {
            e.preventDefault();
            if (lastCreatedRegion) {
              setLoading(true);
              const response = await mutateAsync({
                prompt,
                file_path: absoluteFilePath,
                end_time: lastCreatedRegion.end,
                start_time: lastCreatedRegion.start,
              });
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const filepath = (response as any).filepath;
              setGeneratedFilePath(filepath);
              setLoading(false);
            }
          }}
        >
          {loading ? "Loading" : "Generate"}
        </Button>
      </div>
    </div>
  );
};
