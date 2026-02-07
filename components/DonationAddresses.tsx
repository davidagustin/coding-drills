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

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const addresses = [
  {
    label: 'BTC',
    address: 'bc1qkqrp0v0av6ch6ekm2e2scav93a0d83mawcjcd3',
    icon: BitcoinIcon,
    color: 'text-orange-400',
    hoverBorder: 'hover:border-orange-500/40',
    bg: 'hover:bg-orange-500/5',
  },
  {
    label: 'ETH',
    address: '0x846a124b1438f5dc657309e686c57b03647888f2',
    icon: EthereumIcon,
    color: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/40',
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        {addresses.map(({ label, address, icon: Icon, color, hoverBorder, bg }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleCopy(address)}
            title={`Copy ${label} address: ${address}`}
            className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-zinc-700/50 bg-zinc-800/50 ${hoverBorder} ${bg} transition-all duration-200 cursor-pointer group`}
          >
            <Icon className={`w-4.5 h-4.5 ${color} shrink-0`} />
            <code className="text-zinc-500 text-xs">{truncateAddress(address)}</code>
            {copied === address ? (
              <CheckIcon className="w-3.5 h-3.5 text-green-400 shrink-0" />
            ) : (
              <CopyIcon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 shrink-0 transition-colors" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
