
import React, { useState, useRef } from 'react';
import { Upload, Wand2, Loader2, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { editImageWithPrompt } from '../services/geminiService';

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];
      const result = await editImageWithPrompt(base64Data, prompt, mimeType);
      
      if (result) {
        setEditedImage(result);
      } else {
        setError("Could not edit image. Try another prompt.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while processing.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
  };

  return (
    <div className="space-y-4">
      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/30 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
        >
          <Upload className="w-10 h-10 mb-2 opacity-70" />
          <p className="text-sm font-medium">Upload photo to start magic</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Original</p>
            <div className="aspect-video bg-black/20 rounded-xl overflow-hidden">
              <img src={image} alt="Original" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">AI Transformation</p>
            <div className="aspect-video bg-black/20 rounded-xl overflow-hidden flex items-center justify-center relative">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-xs">Applying magic...</span>
                </div>
              ) : editedImage ? (
                <img src={editedImage} alt="Edited" className="w-full h-full object-cover animate-in fade-in duration-700" />
              ) : (
                <div className="text-center p-4">
                  <Wand2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <span className="text-xs opacity-50">Result will appear here</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: 'Add a vintage filter', 'Remove background'..."
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-blue-100"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isProcessing}
              />
              <button 
                onClick={handleEdit}
                disabled={isProcessing || !prompt}
                className="absolute right-2 top-1.5 p-1.5 bg-yellow-400 text-blue-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Wand2 className="w-5 h-5" />
              </button>
            </div>
            
            {error && <p className="text-red-300 text-xs text-center">{error}</p>}
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={reset}
                className="text-xs font-semibold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <RefreshCcw className="w-3 h-3" /> Reset
              </button>
              {editedImage && (
                <button className="text-xs font-semibold flex items-center gap-1 text-green-300">
                  <CheckCircle2 className="w-3 h-3" /> Perfect!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
