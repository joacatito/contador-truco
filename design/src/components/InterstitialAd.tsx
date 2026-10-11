import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface InterstitialAdProps {
  onClose: () => void;
}

export default function InterstitialAd({ onClose }: InterstitialAdProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="relative bg-gray-800 rounded-xl max-w-2xl w-full aspect-video flex flex-col items-center justify-center border-2 border-gray-600">
        {/* Botão fechar (só aparece após countdown) */}
        {countdown === 0 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-800" />
          </button>
        )}

        {/* Conteúdo do anúncio */}
        <div className="text-center">
          <div className="text-6xl mb-4">📺</div>
          <p className="text-white text-2xl mb-2">Anúncio Interstitial</p>
          <p className="text-gray-400 text-lg">
            {countdown > 0 ? (
              <>Fechando em {countdown}s...</>
            ) : (
              <>Clique no X para fechar</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
