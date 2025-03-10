export type LTokenInfo = {
  img: string;
  count: number;
  usdt: number;
};

type LTokenCardProps = {
  token: LTokenInfo;
  disabled?: boolean;
  onButtonClick?: (tokenInfo: LTokenInfo) => void;
};

export function LTokenCard({ token, onButtonClick, disabled }: LTokenCardProps) {
  const { img, count, usdt } = token;
  return (
    <div>
      <div className="relative h-[20rem] w-[17rem] rounded-[30px] border-2 pb-[20px] px-[40px] flex flex-col pt-[170px]">
        <img src={img} className="absolute -top-20 left-1/2 -translate-x-1/2" />
        <div className="flex-1 flex justify-center items-center">
          <p className="text-2xl font-orbitron font-bold text-white">
            {count} L
          </p>
        </div>
        <button onClick={() => onButtonClick?.(token)} disabled={disabled} className="py-2 text-center bg-[#ffffff0d] text-white border-2 border-white/20 rounded-[15px] text-lg font-orbitron font-black disabled:opacity-50 disabled:cursor-not-allowed">
          <p>{usdt.toFixed(2)} USDT</p>
        </button>

        <LTokenCardBg className="absolute top-0 left-0 w-full h-full object-contain -z-10 rounded-[30px]" />
      </div>
    </div>
  );
}

function LTokenCardBg({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="url(#paint0_radial_246_40)" />
      <defs>
        <radialGradient
          id="paint0_radial_246_40"
          cx="100%"
          cy="100%"
          r="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9000FF" />
          <stop offset="1" stopColor="#0A0111" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
