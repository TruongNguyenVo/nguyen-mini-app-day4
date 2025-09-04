// providers/MiniKitProvider.tsx
'use client';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import type { ReactNode } from 'react';

// Extend the props to include paymaster
type ExtendedMiniKitProviderProps = {
  apiKey?: string;
  chain: Chain;
  paymaster?: { url?: string };
  children: ReactNode;
};
import { base, baseSepolia } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';

export function MiniKitContextProvider({ children }: { children: ReactNode }) {
  const targetChain: Chain = process.env.NODE_ENV === 'production' ? base : baseSepolia;

  // Use type assertion to satisfy TypeScript
  const props: ExtendedMiniKitProviderProps = {
    apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    chain: targetChain,
    paymaster: { url: process.env.NEXT_PUBLIC_CDP_PAYMASTER_URL },
    children,
  };

  return <MiniKitProvider {...props} />;
}