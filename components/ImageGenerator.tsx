import React, { useState } from 'react';
import { ImageIcon, X, Loader2, Download, AlertTriangle } from 'lucide-react';
import { generateStudyImage } from '../services/geminiService';
import { ImageSize } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultPrompt?: string;
}

const ImageGenerator: React.FC<Props> = ({ isOpen, onClose, defaultPrompt = '' }) => {
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [size, setSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageData = await generateStudyImage(prompt, size);
      if (imageData) {
        setGeneratedImage(imageData);
      } else {
        setError("画像の生成に失敗しました。");
      }
    } catch (err: any) {
        if(err.message?.includes('Requested entity was not found')) {
             setError("APIキーが選択されていないか、無効です。再度試してください。");
        } else {
             setError("エラーが発生しました。");
        }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2 text-purple-600">
            <ImageIcon className="w-6 h-6" />
            <h2 className="text-xl font-bold">学習補助画像生成 (Nano Banana Pro)</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">プロンプト (どのような画像を生成しますか？)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例: Reactのコンポーネントツリーを表す図解..."
              className="w-full h-24 border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">サイズ選択</label>
            <div className="flex gap-4">
              {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    size === s
                      ? 'bg-purple-100 border-purple-500 text-purple-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
           {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}

          {generatedImage && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">生成された画像</p>
              <div className="relative group rounded-xl overflow-hidden border border-slate-200">
                <img src={generatedImage} alt="Generated" className="w-full h-auto object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={generatedImage} download={`study-aid-${Date.now()}.png`} className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-transform">
                        <Download className="w-4 h-4"/> 保存する
                    </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">
            閉じる
          </button>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-lg font-medium flex items-center gap-2 transition-all"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            {isLoading ? '生成中...' : '画像を生成'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;