import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDefiwars } from "hooks/useDefiWars";
import style from "./Market.css";
import appStyle from "../../App.module.css";

const Market = () => {
  // const { account, isOpened, dwarf, NFTs } = this.state;
  const userState = useSelector((state) => state.user);
  const { isOpened, dwarf, NFTs } = userState;

  const {
    buyDarthNFT,
    buyJediNFT,
    stakeDwarf,
    claimDwarf,
    checkNFT,
    checkMarket,
  } = useDefiwars();

  useEffect(() => {
    checkNFT();
    checkMarket();
  }, []);

  const renderNFT = (NFT) => {
    let goto = () => buyJediNFT(NFT.id);

    if (NFT.side === "darth") {
      goto = () => buyDarthNFT(NFT.id);
    }

    return (
      <div className={appStyle.nfblock}>
        <div className={appStyle.nfblockPower}>
          <span>Damage: {NFT.pd}</span>
          <span>Kinetics: {NFT.pk}</span>
          <span>Speed: {NFT.ps}</span>
          <span>Conversion: {NFT.pc}</span>
          <span>Healing: {NFT.ph}</span>
          <span>
            {NFT.suply}/{NFT.total}
          </span>
        </div>

        <div className={appStyle.nfblockMine}>
          <span>{NFT.amount}</span>
        </div>

        <img src={NFT.logo} alt="" />
        <p>{NFT.title}</p>
        <p className={NFT.side}>
          {NFT.price} <br />
          DWARF
        </p>

        <button onClick={goto}>Buy</button>
      </div>
    );
  };

  const renderJediNFTs = () => {
    return NFTs.filter((NFT) => {
      if (NFT.side === "jedi") {
        return true;
      }

      return false;
    }).map((NFT) => {
      return renderNFT(NFT);
    });
  };

  const renderDarthNFTs = () => {
    return NFTs.filter((NFT) => {
      if (NFT.side === "darth") {
        return true;
      }

      return false;
    }).map((NFT) => {
      return renderNFT(NFT);
    });
  };

  return (
    // <div className={style.Sword}>
    <div className={appStyle.container}>
      {(() => {
        if (isOpened) {
          return (
            <div className={appStyle.flexcol}>
              <div className={appStyle.flexrow}>
                <div className={style.text}>{renderJediNFTs(NFTs)}</div>

                <div className={style.text}>{renderDarthNFTs(NFTs)}</div>
              </div>

              <div className={style.textcenter}>
                <div className={appStyle.nfblock}>
                  <img src="img/market.png" alt="NFT Marketplace" />
                  <p>
                    {dwarf} <br />
                    DWARF
                  </p>

                  <button onClick={claimDwarf}>Close NFT Marketplace</button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className={style.textcenter}>
            <div className={appStyle.nfblock}>
              <img src="img/market.png" alt="NFT Marketplace" />
              <p>
                {dwarf} <br />
                DWARF
              </p>

              <button disabled={dwarf === 0} onClick={stakeDwarf}>
                Open NFT Marketplace
              </button>
            </div>
          </div>
        );
      })()}
    </div>
    // </div>
  );
};

export default Market;
