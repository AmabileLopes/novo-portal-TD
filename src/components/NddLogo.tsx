import React from 'react';

interface NddLogoProps {
  className?: string;
  height?: number | string;
  showTag?: boolean;
  textColor?: string;
}

export const NddLogo: React.FC<NddLogoProps> = ({
  className = 'h-8 sm:h-9 w-auto',
  height = 36,
  showTag = false,
  textColor = '#000000'
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 350 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto max-h-9 overflow-visible"
        aria-label="Logo NDD"
      >
        {/* ==========================================
            NDD EMBLEM (4 GEOMETRIC SHAPES)
            ========================================== */}
        {/* 1. Top-Left: Cyan / Turquoise Rounded Square */}
        <rect
          x="0"
          y="50"
          width="32"
          height="37"
          rx="4"
          fill="#00D0B8"
        />

        {/* 2. Top-Right: Blue-Violet Leaf (Curved top-left & bottom-right) */}
        <path
          d="M 37 68.5 C 37 58.28 45.28 50 55.5 50 L 69 50 L 69 68.5 C 69 78.72 60.72 87 50.5 87 L 37 87 Z"
          fill="#5900F5"
        />

        {/* 3. Bottom-Left: Blue-Violet Leaf (Curved top-left & bottom-right) */}
        <path
          d="M 0 109.5 C 0 99.28 8.28 91 18.5 91 L 32 91 L 32 109.5 C 32 119.72 23.72 128 13.5 128 L 0 128 Z"
          fill="#5900F5"
        />

        {/* 4. Bottom-Right: Vibrant Magenta / Pink Circle */}
        <circle
          cx="53"
          cy="109.5"
          r="17"
          fill="#E5007D"
        />

        {/* ==========================================
            WORDMARK "ndd" (GEOMETRIC SANS BOLD)
            ========================================== */}
        {/* Letter 'n' */}
        <path
          d="M 86 50 L 108 50 L 108 61.5 C 114.2 52.8 124.5 48 136.5 48 C 153.5 48 163 58.5 163 76.5 L 163 128 L 141 128 L 141 80 C 141 70.5 135.5 66 126 66 C 116 66 108 73 108 84.5 L 108 128 L 86 128 Z"
          fill={textColor}
        />

        {/* Letter 'd' (First) */}
        <path
          d="M 226 12 L 248 12 L 248 128 L 226 128 L 226 117 C 220 125 210.5 129 198 129 C 175.5 129 159 111.5 159 89 C 159 66.5 175.5 49 198 49 C 210.5 49 220 53 226 61 Z M 203.5 70 C 192.5 70 182.5 78.5 182.5 89 C 182.5 99.5 192.5 108 203.5 108 C 214.5 108 226 99.5 226 89 C 226 78.5 214.5 70 203.5 70 Z"
          fill={textColor}
        />

        {/* Letter 'd' (Second) */}
        <path
          d="M 314 12 L 336 12 L 336 128 L 314 128 L 314 117 C 308 125 298.5 129 286 129 C 263.5 129 247 111.5 247 89 C 247 66.5 263.5 49 286 49 C 298.5 49 308 53 314 61 Z M 291.5 70 C 280.5 70 270.5 78.5 270.5 89 C 270.5 99.5 280.5 108 291.5 108 C 302.5 108 314 99.5 314 89 C 314 78.5 302.5 70 291.5 70 Z"
          fill={textColor}
        />
      </svg>

      {showTag && (
        <span className="hidden sm:inline-flex items-center text-xs font-bold text-[#8C3B4B] uppercase tracking-wider pl-2 border-l border-[#EADCCF]">
          T&amp;D
        </span>
      )}
    </div>
  );
};
