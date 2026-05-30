"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Upload, RotateCw, RefreshCw, ZoomIn, ZoomOut, Check, AlertCircle } from "lucide-react";

interface TryOnProps {
  productName: string;
  imageSrc: string;
  category: string;
}

export function VirtualTryOn({ productName, imageSrc, category }: TryOnProps) {
  const [mode, setMode] = useState<"camera" | "upload" | "model">("model");
  const [modelImage, setModelImage] = useState("/jewelry/bhagat/bridal-set.jpg"); // default model placeholder
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Interactive transformations
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Camera settings
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Model catalog
  const MODELS = [
    { name: "Bridal Portrait", path: "/jewelry/bhagat/bridal-set.jpg" },
    { name: "Festive Portrait", path: "/jewelry/bhagat/earrings.jpg" },
    { name: "Casual Profile", path: "/jewelry/bhagat/diamond-ring-2.jpg" },
  ];

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Start camera stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setMode("camera");
    } catch {
      setCameraError("Webcam access denied. Please upload a photo or use a demo model.");
      setMode("model");
    }
  };

  // Cleanup camera stream
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setMode("upload");
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Dragging Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers for Mobile support
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.current.x,
      y: e.touches[0].clientY - dragStart.current.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const resetAdjustments = () => {
    setScale(1);
    setRotate(0);
    setPosition({ x: 0, y: 0 });
  };

  // Determine jewelry size & position styles
  const isNecklace = category.toLowerCase().includes("necklace") || category.toLowerCase().includes("bridal") || productName.toLowerCase().includes("choker") || productName.toLowerCase().includes("set");
  const isEarring = category.toLowerCase().includes("earring") || productName.toLowerCase().includes("jhumka") || productName.toLowerCase().includes("stud");

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-6 shadow-xl dark:bg-bg-elevated">
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-2xl text-text uppercase tracking-wide">Bespoke Virtual Mirror</h3>
          <p className="text-xs text-text-muted">Overlay jewelry pieces on your camera, photo, or model</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={startCamera}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
              mode === "camera" && cameraActive
                ? "bg-gold text-bg"
                : "border border-border text-text hover:border-gold/60"
            }`}
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Webcam</span>
          </button>
          
          <label className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
            mode === "upload"
              ? "bg-gold text-bg"
              : "border border-border text-text hover:border-gold/60"
          }`}>
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Photo</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>

          <button
            onClick={() => {
              setMode("model");
              stopCamera();
            }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all ${
              mode === "model"
                ? "bg-gold text-bg"
                : "border border-border text-text hover:border-gold/60"
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Model Demo</span>
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-xs text-red-500 dark:bg-red-500/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Main Mirror Area */}
      <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-black">
        {/* Webcam stream */}
        {mode === "camera" && cameraActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover scale-x-[-1]"
          />
        )}

        {/* Uploaded picture */}
        {mode === "upload" && uploadedImage && (
          <div className="relative h-full w-full">
            <Image src={uploadedImage} alt="User Upload" fill className="object-cover" />
          </div>
        )}

        {/* Standard Model picture */}
        {mode === "model" && (
          <div className="relative h-full w-full">
            <Image src={modelImage} alt="Model portrait" fill className="object-cover" />
            
            {/* Model Selector Overlay */}
            <div className="absolute right-3 bottom-3 z-20 flex flex-col gap-1.5 rounded-lg bg-bg/85 p-2 shadow-md backdrop-blur-sm dark:bg-bg-elevated/90">
              <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider">Models</span>
              {MODELS.map((model) => (
                <button
                  key={model.name}
                  onClick={() => setModelImage(model.path)}
                  className={`rounded px-2 py-1 text-[9px] font-medium text-left transition-colors ${
                    modelImage === model.path ? "bg-gold text-bg font-semibold" : "text-text hover:bg-gold/10"
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Resizable Jewelry Piece */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg)`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          className={`absolute z-30 transition-transform duration-75 select-none origin-center ${
            isNecklace
              ? "left-[calc(50%-100px)] top-[55%] w-[200px]"
              : isEarring
              ? "left-[calc(50%-75px)] top-[40%] w-[150px]"
              : "left-[calc(50%-60px)] top-[45%] w-[120px]"
          }`}
        >
          {/* Overlay Image of the product */}
          <div className="relative aspect-square w-full pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
            <Image
              src={imageSrc}
              alt={productName}
              fill
              className="object-contain"
              draggable="false"
              sizes="200px"
            />
          </div>
        </div>

        {/* Watermark/BIS badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded bg-gold/80 px-2 py-0.5 text-[8px] font-semibold text-bg backdrop-blur-sm uppercase tracking-widest">
          <Check className="h-2.5 w-2.5" />
          <span>Bhagat Ji Virtual Try-On</span>
        </div>
      </div>

      {/* Adjustment Tool Controls */}
      <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale((s) => Math.max(0.4, s - 0.08))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text hover:border-gold hover:text-gold transition-colors"
            title="Zoom Out Jewelry"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setScale((s) => Math.min(2.5, s + 0.08))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text hover:border-gold hover:text-gold transition-colors"
            title="Zoom In Jewelry"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRotate((r) => r - 15)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text hover:border-gold hover:text-gold transition-colors"
            title="Rotate Left"
          >
            <RotateCw className="h-4 w-4 scale-x-[-1]" />
          </button>
          <button
            onClick={() => setRotate((r) => r + 15)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text hover:border-gold hover:text-gold transition-colors"
            title="Rotate Right"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            onClick={resetAdjustments}
            className="rounded-lg border border-border px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted hover:border-gold hover:text-gold transition-colors"
          >
            Reset Set
          </button>
        </div>

        <p className="text-[10px] text-text-muted italic">
          💡 Drag or swipe the jewellery piece directly over your photo/feed to position it correctly.
        </p>
      </div>
    </div>
  );
}
