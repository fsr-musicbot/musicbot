"use client";
import Dropzone from "react-dropzone";

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

interface WhisperSegment {
  avg_logprob: number;
  compression_ration: number;
  end: number;
  id: number;
  no_speech_prob: number;
  seek: number;
  start: number;
  temperature: number;
  text: string;
  tokens: number[];
}
interface WaveSurferPlayerProps {
  lyrics: WhisperSegment[];
  options: Partial<WaveSurferOptions>;
}

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props: WaveSurferPlayerProps) => {
  console.log(props.lyrics);
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

    console.log;
    wavesurfer.on("decode", () => {
      for (let i = 0; i < props.lyrics.length; i++) {
        regionsPlugin.addRegion({
          start: props.lyrics[i].start,
          end: props.lyrics[i].end,
          content: props.lyrics[i].text,
          color: "rgb(0, 0, 0, 0.1)",
          drag: false,
          resize: false,
        });
      }
    });

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
          <button onClick={onPlayClick}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={() => regionsPlugin.clearRegions()}>
            Clear all regions
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<any>(null);
  const handleSubmitAudio = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);

    const audioUrl = URL.createObjectURL(acceptedFiles[0]);

    setAudioUrl(audioUrl);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    reader.onload = async function () {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reader.result),
      });
      console.log(response);

      if (response) {
        const output = await response.json();
        console.log(output);
        setTranscription(output.output.segments);
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Here, you can make your API request with the base64String if needed
      // For now, I'm just logging it for demonstration purposes.
    };
  };

  return (
    <section className="container">
      <Dropzone onDrop={(acceptedFiles) => handleSubmitAudio(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
      {audioUrl && (
        <WaveSurferPlayer
          lyrics={transcription}
          options={{
            height: 100,
            waveColor: "rgb(200, 0, 200)",
            progressColor: "rgb(100, 0, 100)",
            url: audioUrl,
            plugins: [Timeline.create(), Regions.create()],
          }}
        />
      )}
    </section>
  );
}
