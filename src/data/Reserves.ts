import { TokenAmount, Currency, Token, Pair } from "@pancakeswap-libs/sdk";
import { useMemo, useState } from "react";
import { pack, keccak256 } from "@ethersproject/solidity";
import { getCreate2Address } from "@ethersproject/address";
import { abi as IUniswapV2PairABI } from "@uniswap/v2-core/build/IUniswapV2Pair.json";
import { Interface } from "@ethersproject/abi";
import { useActiveWeb3React } from "../hooks";
import { getFactoryContract } from "utils";
import { useMultipleContractSingleData } from "../state/multicall/hooks";
import { wrappedCurrency } from "../utils/wrappedCurrency";
import { FACTORY_ADDRESS, INIT_CODE_PAIR_HASH } from "../constants";

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI);

// const factoryContract = web3 && new web3.eth.Contract(IUniswapV2PairABI, FACTORY_ADDRESS);

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

// const getPair = async (chainId: any, library: any, account: any, aAddress = "", bAddress = "") => {
//   const factoryContract = chainId && library && account && getFactoryContract(chainId, library, account);
//   if (factoryContract) {
//     const pairAddress = await factoryContract.getPair(aAddress, bAddress);
//     return pairAddress;
//   } else return "";
// };

// const getInitCodeHash = async (chainId: any, library: any, account: any) => {
//   const factoryContract = chainId && library && account && getFactoryContract(chainId, library, account);
//   if (factoryContract) {
//     const hashCode = await factoryContract.INIT_CODE_PAIR_HASH();
//     return hashCode;
//   } else return "";
// };

export function usePairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, Pair | null][] {
  const { account, chainId, library } = useActiveWeb3React();
  // const [pairAddressList, setPairAddressList] = useState<any[]>([]);
  // const [hashCode, setHashCode] = useState<any>("");

  const tokens = useMemo(
    () =>
      currencies.map(([currencyA, currencyB]) => {
        const tokenA = wrappedCurrency(currencyA, chainId);
        const tokenB = wrappedCurrency(currencyB, chainId);
        const returnTokens = tokenA && tokenB && tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
        return returnTokens;
      }),
    [chainId, currencies]
  );

  // const pairAddresses = useMemo(
  //   () =>
  //     tokens.map(([tokenA, tokenB]) => {
  //       return tokenA && tokenB && !tokenA.equals(tokenB) ? Pair.getAddress(tokenA, tokenB) : undefined;
  //     }),
  //   [tokens]
  // );

  const pairAddresses = useMemo(
    () =>
      tokens.map(([tokenA, tokenB]) => {
        return tokenA && tokenB && !tokenA.equals(tokenB)
          ? getCreate2Address(
              FACTORY_ADDRESS,
              keccak256(["bytes"], [pack(["address", "address"], tokenA.sortsBefore(tokenB) ? [tokenA.address, tokenB.address] : [tokenB.address, tokenA.address])]),
              INIT_CODE_PAIR_HASH
            )
          : undefined;
      }),
    [tokens]
  );

  // useMemo(async () => {
  //   const list: any[] = [];
  //   for (let i = 0; i < tokens.length; i++) {
  //     const pairAddr = await getPair(chainId, library, account, tokens[i][0]?.address, tokens[i][1]?.address);
  //     list.push(pairAddr);
  //   }
  //   setPairAddressList(list);
  // }, [tokens]);

  // useMemo(async () => {
  //   const initHashCode = await getInitCodeHash(chainId, library, account);
  //   setHashCode(initHashCode);
  // }, []);

  // const results = useMultipleContractSingleData(pairAddressList, PAIR_INTERFACE, "getReserves");
  const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "getReserves");

  return useMemo(() => {
    return results.map((result, i) => {
      const { result: reserves, loading } = result;
      const tokenA = tokens && tokens[i] && tokens[i][0];
      const tokenB = tokens && tokens[i] && tokens[i][1];

      if (loading) return [PairState.LOADING, null];
      if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null];
      if (!reserves) return [PairState.NOT_EXISTS, null];
      const { reserve0, reserve1 } = reserves;
      const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];
      return [
        PairState.EXISTS,
        new Pair(new TokenAmount(token0, reserve0.toString()), new TokenAmount(token1, reserve1.toString())),
      ];
    });
  }, [results, tokens]);
}

export function usePair(tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
  return usePairs([[tokenA, tokenB]])[0];
}
