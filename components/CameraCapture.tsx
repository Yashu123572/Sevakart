
import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, CheckCircle2, User } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (base64Image: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  const startCamera = async () => {
    setIsStarting(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Please allow camera access for verification photo.");
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        onCapture(imageData);
        stopCamera();
      }
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center">
        {!stream && !capturedImage && (
          <div className="text-center p-6 space-y-3">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <button 
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              Take Live Photo
            </button>
          </div>
        )}

        {stream && !capturedImage && (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}

        {capturedImage && (
          <img 
            src={capturedImage} 
            alt="Selfie" 
            className="w-full h-full object-cover scale-x-[-1]" 
          />
        )}
      </div>

      <div className="mt-6 flex gap-4">
        {stream && !capturedImage && (
          <button 
            onClick={takePhoto}
            className="bg-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-90"
          >
            <div className="w-10 h-10 border-4 border-white rounded-full"></div>
          </button>
        )}

        {capturedImage && (
          <div className="flex gap-4">
            <button 
              onClick={retake}
              className="flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-200 transition-all"
            >
              <RefreshCw className="w-4 h-4" /> Retake
            </button>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-6 py-2 rounded-full text-xs font-bold border border-green-100">
              <CheckCircle2 className="w-4 h-4" /> Verified
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
