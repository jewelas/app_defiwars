import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useMemo, useCallback } from "react";
import { useActiveWeb3React } from "hooks";

import useSound from "use-sound";
import bladeSound from "../../swap.mp3";
import Parser from "html-react-parser";
import { useWalletModal } from "@pancakeswap-libs/uikit";
import ConnectIcon from "../icons/connect";
import style from "./ConnectWallet.css";
import { useSelector } from "react-redux";

import useAuth from "../../hooks/useAuth";

import { useDefiwars } from "hooks/useDefiWars";

const ActionLink = ({ onClick, text }) => {
  return (
    <a onClick={onClick}>
      {Parser(text)}
      <div className={style.linkBorder}></div>
    </a>
  );
};
const RenderActionLink = () => {
  const { login, logout } = useAuth();
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout
  );
  const { account, chainId } = useActiveWeb3React();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { haveNFT, inProcess, isInWar, loggedIn, mainNetId, testNetId } =
    userState;

  const { REACT_APP_NETWORK } = process.env;

  const { onMint, onWar, onPeace } = useDefiwars();

  if (account && inProcess)
    return <ActionLink text="Processing..." onClick={() => {}} />;

  if (account && REACT_APP_NETWORK === "MAINNET" && chainId !== mainNetId)
    return (
      <ActionLink
        text="Connect to BSC Mainnet"
        onClick={onPresentConnectModal}
      />
    );

  if (account && REACT_APP_NETWORK === "TESTNET" && chainId !== testNetId)
    return (
      <ActionLink
        text="Connect to BSC Testnet"
        onClick={onPresentConnectModal}
      />
    );

  if (account && haveNFT && isInWar)
    return <ActionLink text="MINT my PEACE ngNFT" onClick={onPeace} />;

  if (account && haveNFT && !isInWar)
    return (
      <ActionLink
        text="Select PoLP <br />& Stake"
        onClick={async () => {
          await onWar();
          navigate("/pool", { replace: true });
        }}
      />
    );

  if (account && !isInWar && !haveNFT)
    return (
      <ActionLink
        text="MINT my WAR ngNFT"
        onClick={async () => {
          await onMint();
          navigate("/pool", { replace: true });
        }}
      />
    );

  if (account && !haveNFT && !loggedIn && isInWar) {
    return (
      <ActionLink
        text="LOGIN"
        onClick={() => {
          navigate("/login", { replace: true });
        }}
      />
    );
  }

  return <ActionLink text="Connect Wallet" onClick={onPresentConnectModal} />;
};
const ConnectWallet = ({ sound }) => {
  const [playSound] = useSound(bladeSound);
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useActiveWeb3React();
  const from = location.state?.from?.pathname || "/";
  const { checkNFT } = useDefiwars();

  useEffect(() => {
    checkNFT();
  }, [account]);
  // checkNFT();

  useEffect(() => {
    account && sound && playSound();

    if (account && from !== "/") {
      return navigate(from, { replace: true });
    }
  }, [account, sound]);

  return (
    <div className={style.connectWallet}>
      <RenderActionLink />
      {/* <ConnectIcon width={100} height={32} /> */}
    </div>
  );
};

export default ConnectWallet;
