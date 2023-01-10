import { createAction } from '@reduxjs/toolkit'
import { NFT } from './reducer';

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair = createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>(
  'user/removeSerializedPair'
)
export const muteAudio = createAction<void>('user/muteAudio')
export const unmuteAudio = createAction<void>('user/unmuteAudio')

export const setAccountAddress = createAction<{ accounAddress: string }>(
  'user/setAccountAddress'
);

export const setNetId = createAction<{ netId: number | null }>(
  'user/setNetId'
);

export const setHaveNFT = createAction<{ haveNFT: boolean }>(
  'user/setHaveNFT'
);

export const setIsInWar = createAction<{ isInWar: boolean, inProcess: boolean }>(
  'user/setIsInWar'
);

export const setIsReady = createAction<{ isReady: boolean }>(
  'user/setIsReady'
);

export const setJediLPBalance = createAction<{ jediLP: number }>(
  'user/setJediLPBalance'
);

export const setDarthLPBalance = createAction<{ darthLP: number }>(
  'user/setDarthLPBalance'
);
export const setDwarfBalance = createAction<{ dwarf: number }>(
  'user/setDwarfBalance'
);

export const setEthBalance = createAction<{ ethbalance: number }>(
  'user/setEthBalance'
);

export const setNFTs = createAction<{ NFTs: NFT[] }>(
  'user/setNFTs'
);

export const setInProcess = createAction<{ inProcess: boolean }>(
  'user/setInProcess'
);

export const setAuctionSuccess = createAction<{ auctionSuccess: boolean }>(
  'user/setAuctionSuccess'
);

export const setIsOpened = createAction<{ isOpened: boolean }>(
  'user/setIsOpened'
);

export const setIsStaked = createAction<{
  isStaked: boolean,
  stakedJedi: number | null,
  stakedDarth: number | null
}>(
  'user/setIsStaked'
);

export const setCanClaim = createAction<{ canClaim: boolean }>(
  'user/setCanClaim'
);
