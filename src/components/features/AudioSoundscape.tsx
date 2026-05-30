"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.12); // Default low volume
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const timeoutIdsRef = useRef<number[]>([]);
  const seedRef = useRef(12345);
  
  // Use a ref to store the recursive schedule function to avoid linter warnings
  const scheduleNextFluteNoteRef = useRef<() => void>(() => {});
  const scheduleNextChimeRef = useRef<() => void>(() => {});

  // Pure LCG random generator to satisfy react-hooks/purity rules
  const getNextRandom = useCallback(() => {
    seedRef.current = (seedRef.current * 1664525 + 1013904223) % 4294967296;
    return seedRef.current / 4294967296;
  }, []);

  // Base notes for Tanpura drone in C# (Sa - Pa - Sa)
  const DRONE_FREQS = useRef([138.6, 207.65, 277.2]).current; // C#3, G#3, C#4
  const CHIME_FREQS = useRef([554.37, 622.25, 739.99, 830.61, 1108.73]).current;

  // Raga Bhairavi scale notes for random flute melodies
  const BHAIRAVI_FREQS = useRef([
    277.18, // C#4 (Sa)
    293.66, // D4 (Re Komal)
    311.13, // D#4 (Re Shuddh)
    329.63, // E4 (Ga)
    369.99, // F#4 (Ma)
    415.30, // G#4 (Pa)
    440.00, // A4 (Dha Komal)
    493.88, // B4 (Ni)
    554.37, // C#5 (Sa)
  ]).current;

  // Initialize Audio Context & Nodes
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
      gainNode.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gainNode;
    }
  }, [volume]);

  // Clean up all notes and drone oscillators (without changing isPlaying state directly)
  const stopSoundscape = useCallback(() => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // dynamic cleanup
      }
    });
    oscillatorsRef.current = [];
    
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];
  }, []);

  // Start a warm showroom pad, similar to distant strings rather than a song.
  const startDrone = useCallback(() => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    
    // Create base drone oscillators (simulating string vibrations)
    DRONE_FREQS.forEach((freq, idx) => {
      const osc = audioCtxRef.current!.createOscillator();
      const oscGain = audioCtxRef.current!.createGain();
      
      osc.type = idx === 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current!.currentTime);
      osc.detune.setValueAtTime((idx - 1) * 6, audioCtxRef.current!.currentTime);
      oscGain.gain.setValueAtTime(0.045, audioCtxRef.current!.currentTime);
      
      osc.connect(oscGain);
      oscGain.connect(gainNodeRef.current!);
      osc.start();
      
      oscillatorsRef.current.push(osc);
      
      const lfo = audioCtxRef.current!.createOscillator();
      const lfoGain = audioCtxRef.current!.createGain();
      lfo.frequency.setValueAtTime(0.12 + idx * 0.05, audioCtxRef.current!.currentTime);
      lfoGain.gain.setValueAtTime(0.018, audioCtxRef.current!.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();
      
      oscillatorsRef.current.push(lfo);
    });
  }, [DRONE_FREQS]);

  // Play sparse soft flute-like notes that feel ambient, not melodic playback.
  const scheduleNextFluteNote = useCallback(() => {
    if (!isPlaying || !audioCtxRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    
    const freq = BHAIRAVI_FREQS[Math.floor(getNextRandom() * BHAIRAVI_FREQS.length)];
    const duration = 3.5 + getNextRandom() * 4.5;
    const delay = 3.0 + getNextRandom() * 5.0;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5 + getNextRandom() * 2, now);
    vibratoGain.gain.setValueAtTime(2.5, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.035, now + 1.4);
    noteGain.gain.setValueAtTime(0.035, now + duration - 1.8);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(noteGain);
    noteGain.connect(gainNodeRef.current!);
    
    try {
      osc.start(now);
      vibrato.start(now);
      osc.stop(now + duration);
      vibrato.stop(now + duration);
    } catch {
      osc.disconnect();
      vibrato.disconnect();
      noteGain.disconnect();
      vibratoGain.disconnect();
      return;
    }

    oscillatorsRef.current.push(osc, vibrato);
    osc.onended = () => {
      osc.disconnect();
      vibrato.disconnect();
      noteGain.disconnect();
      vibratoGain.disconnect();
      oscillatorsRef.current = oscillatorsRef.current.filter((node) => node !== osc && node !== vibrato);
    };

    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
      scheduleNextFluteNoteRef.current();
    }, (duration + delay) * 1000);
    
    timeoutIdsRef.current.push(timeoutId);
  }, [isPlaying, getNextRandom, BHAIRAVI_FREQS]);

  const scheduleNextChime = useCallback(() => {
    if (!isPlaying || !audioCtxRef.current || !gainNodeRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const freq = CHIME_FREQS[Math.floor(getNextRandom() * CHIME_FREQS.length)];
    const duration = 2.8 + getNextRandom() * 1.8;
    const delay = 7 + getNextRandom() * 9;

    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    const overtoneGain = ctx.createGain();

    osc.type = "sine";
    overtone.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    overtone.frequency.setValueAtTime(freq * 2.01, now);

    chimeGain.gain.setValueAtTime(0.0001, now);
    chimeGain.gain.exponentialRampToValueAtTime(0.026, now + 0.08);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.012, now + 0.05);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.55);

    osc.connect(chimeGain);
    overtone.connect(overtoneGain);
    chimeGain.connect(gainNodeRef.current!);
    overtoneGain.connect(gainNodeRef.current!);

    try {
      osc.start(now);
      overtone.start(now);
      osc.stop(now + duration);
      overtone.stop(now + duration * 0.6);
    } catch {
      osc.disconnect();
      overtone.disconnect();
      chimeGain.disconnect();
      overtoneGain.disconnect();
      return;
    }

    oscillatorsRef.current.push(osc, overtone);
    osc.onended = () => {
      osc.disconnect();
      overtone.disconnect();
      chimeGain.disconnect();
      overtoneGain.disconnect();
      oscillatorsRef.current = oscillatorsRef.current.filter((node) => node !== osc && node !== overtone);
    };

    const timeoutId = window.setTimeout(() => {
      timeoutIdsRef.current = timeoutIdsRef.current.filter((id) => id !== timeoutId);
      scheduleNextChimeRef.current();
    }, (duration + delay) * 1000);

    timeoutIdsRef.current.push(timeoutId);
  }, [isPlaying, getNextRandom, CHIME_FREQS]);

  // Synchronize ref with callback
  useEffect(() => {
    scheduleNextFluteNoteRef.current = scheduleNextFluteNote;
  }, [scheduleNextFluteNote]);

  useEffect(() => {
    scheduleNextChimeRef.current = scheduleNextChime;
  }, [scheduleNextChime]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      initAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startDrone();
      scheduleNextFluteNote();
      scheduleNextChime();
    } else {
      stopSoundscape();
    }
  }, [isPlaying, startDrone, scheduleNextFluteNote, scheduleNextChime, stopSoundscape]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSoundscape();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {
          // The context can already be closing during hot reload or fast navigation.
        });
      }
    };
  }, [stopSoundscape]);

  return (
    <div className="flex shrink-0 items-center gap-2 rounded-full border-none bg-transparent p-0 shadow-none backdrop-blur-none sm:border sm:border-border sm:bg-bg-elevated/80 sm:px-3 sm:py-2 sm:shadow-sm sm:backdrop-blur-md dark:bg-transparent dark:sm:bg-bg-elevated/90">
      <button
        onClick={handleTogglePlay}
        className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all ${
          isPlaying ? "bg-gold text-bg animate-pulse" : "bg-gold/10 text-gold hover:bg-gold/25"
        }`}
        title="Toggle ambient jewellery store soundscape"
        aria-label="Toggle ambient store soundscape"
      >
        <Volume2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isPlaying ? "block" : "hidden"}`} />
        <VolumeX className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isPlaying ? "hidden" : "block"}`} />
      </button>

      <div className="hidden 2xl:flex flex-col">
        <span className="text-[8px] font-bold tracking-widest text-text uppercase">Store Soundscape</span>
        <span className="text-[7px] text-text-muted font-medium uppercase tracking-wider">
          {isPlaying ? "Soft chimes & warm strings" : "Ambient sound muted"}
        </span>
      </div>

      {isPlaying && (
        <div className="hidden 2xl:flex items-end gap-0.5 h-3.5 px-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-gold rounded-full"
              style={{
                height: "100%",
                animation: `bounce-bar 1.2s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
          <style jsx>{`
            @keyframes bounce-bar {
              0% { height: 25%; }
              100% { height: 100%; }
            }
          `}</style>
        </div>
      )}

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="0.4"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="hidden 2xl:block w-14 accent-gold h-1"
          title="Adjust volume"
        />
      )}
    </div>
  );
}
