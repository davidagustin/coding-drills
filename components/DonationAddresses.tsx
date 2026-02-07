'use client';

import { useState } from 'react';

function BitcoinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.24 10.56c-.31 1.24-2.24.73-2.88.58l.55-2.18c.64.16 2.67.47 2.33 1.6zm-1.13 4.51c-.36 1.46-2.76.67-3.53.5l.63-2.5c.78.2 3.3.58 2.9 2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.05 9.47c-.18 1.16-.92 1.72-1.82 1.98.98.38 1.55 1.15 1.32 2.53-.3 1.8-1.73 2.27-3.76 1.96l-.36 1.44-1.04-.26.35-1.42c-.27-.07-.55-.14-.84-.23l-.36 1.43-1.04-.26.36-1.44c-.25-.07-.5-.13-.77-.2l-1.36-.34.45-1.16s.77.2.76.19c.42.1.5-.17.53-.3l.55-2.18.1.03-.1-.03.78-3.11c.02-.24-.06-.54-.53-.66.02-.02-.76-.19-.76-.19l.23-1.1 1.44.36-.01.02c.2.05.42.1.64.15l.36-1.42 1.04.26-.35 1.39c.28.06.56.13.83.2l.35-1.38 1.04.26-.36 1.42c1.63.45 2.77 1.07 2.57 2.49z" />
    </svg>
  );
}

function EthereumIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.75l-6.25 10.5L12 16l6.25-3.75L12 1.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25 5.75 13.5z" />
    </svg>
  );
}

const addresses = [
  {
    label: 'BTC',
    address: 'bc1qkqrp0v0av6ch6ekm2e2scav93a0d83mawcjcd3',
    icon: BitcoinIcon,
    color: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/50',
    bg: 'hover:bg-orange-500/5',
  },
  {
    label: 'ETH',
    address: '0x846a124b1438f5dc657309e686c57b03647888f2',
    icon: EthereumIcon,
    color: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/50',
    bg: 'hover:bg-blue-500/5',
  },
];

export function DonationAddresses() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-800/30 text-center">
      <p className="text-gray-500 text-xs mb-3">Support this project</p>
      <div className="flex items-center justify-center gap-3">
        {addresses.map(({ label, address, icon: Icon, color, hoverBorder, bg }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleCopy(address)}
            title={`Copy ${label} address`}
            className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700/50 bg-zinc-800/50 ${hoverBorder} ${bg} transition-all duration-200 cursor-pointer group`}
          >
            {copied === address ? (
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
