'use client';

import { useState } from 'react';

const addresses = [
  { label: 'BTC', address: 'bc1qkqrp0v0av6ch6ekm2e2scav93a0d83mawcjcd3' },
  { label: 'ETH', address: '0x846a124b1438f5dc657309e686c57b03647888f2' },
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
        {addresses.map(({ label, address }) => (
          <button
            key={label}
            type="button"
            onClick={() => handleCopy(address)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 transition-colors text-xs cursor-pointer"
          >
            <span className="text-zinc-400 font-medium">{label}</span>
            <code className="text-zinc-500 truncate max-w-[180px] sm:max-w-[280px]">{address}</code>
            <span className="text-zinc-400 shrink-0">
              {copied === address ? (
                <svg
                  className="w-3.5 h-3.5 text-green-400"
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
                <svg
                  className="w-3.5 h-3.5"
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
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
