interface AdBannerProps {
  size: '320x50' | '320x100' | '300x250' | '468x60' | '728x90';
}

export default function AdBanner({ size }: AdBannerProps) {
  const sizeMap = {
    '320x50': { width: 320, height: 50 },
    '320x100': { width: 320, height: 100 },
    '300x250': { width: 300, height: 250 },
    '468x60': { width: 468, height: 60 },
    '728x90': { width: 728, height: 90 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className="w-full flex items-center justify-center py-2 bg-[#0f3d24]">
      <div
        className="bg-gray-700 flex items-center justify-center text-gray-400 text-sm border border-gray-600"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        Espaço para Banner {size}
      </div>
    </div>
  );
}
