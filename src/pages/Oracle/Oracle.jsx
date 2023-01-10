import React, { useEffect, useState } from "react";
// import { Modal } from "antd";
// import "antd/dist/antd.css";
import Modal from 'react-modal';
import style from "./Oracle.css";
import appStyle from "../../App.module.css";
import Store from "../../store/store";
import { useActiveWeb3React } from "hooks";

const store = Store.store;
const emitter = Store.emitter;

const setInitialState = (initialValues = {}) => {
  const haveNFT = store.getStore("haveNFT");
  const isInWar = store.getStore("isInWar");
  const dwarf = store.getStore("dwarf");
  const darthLP = store.getStore("darthLP");
  const jediLP = store.getStore("jediLP");
  const NFTS = store.getStore("NFTs") || [];

  return {
    ...initialValues,
    haveNFT: haveNFT,
    isInWar: isInWar,
    dwarf: dwarf,
    jediLP: jediLP,
    darthLP: darthLP,
    NFTs: NFTS,
    JediPower: {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    },
    DarthPower: {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    },
  };
};

const initialIsShowState = {
  genesis: {
    parent: "",
    isShow: false,
  },
  jedi: {
    parent: "genesis",
    isShow: false,
  },
  darth: {
    parent: "genesis",
    isShow: false,
  },
};

const Oracle = (props) => {
  const { account } = useActiveWeb3React();

  const [state, setState] = useState(setInitialState({ accountAddress: account }));

  const [isShowState, setIsShowState] = useState(initialIsShowState);

  const [character, setCharacter] = useState("dwarf_sith");

  const [nftModal, setNftModal] = useState(false);

  const [selectedNft, setSelectedNft] = useState({});

  const { haveNFT, NFTs, JediPower, jediLP, darthLP, DarthPower } = state;

  const { genesis, jedi, darth } = isShowState;

  const characterName = {
    dwarf_sith: "DWARF Sith",
    dwarf_vader: "DWARF Vader",
    obi_dwarf: "OBI-DWARF",
    yo_dwarf: "YODWARF",
  };

  const nftModalStyles = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)"
    },
    // content: {
    //   top: '50%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    // },
  }

  const toogleIsShow = (index) => {
    const tempState = { ...isShowState };
    const keys = [];

    if (isShowState[index].isShow) {
      Object.keys(isShowState).forEach((key) => {
        if (isShowState[key].parent === index) {
          keys.push(key);
        }
      });
    }
    tempState[index] = { ...tempState[index], isShow: !tempState[index].isShow };
    keys.map((key) => {
      return (tempState[key] = { ...tempState[key], isShow: false });
    });
    setIsShowState(tempState);
  };

  const calcPowers = () => {
    const { NFTs } = state;
    var tempJediPower = {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    };

    NFTs.filter((NFT) => {
      if (NFT.side === "jedi" && parseFloat(NFT.amount) > 0) {
        return true;
      } else {
        return false;
      }
    }).forEach((NFT) => {
      tempJediPower.pd = Math.floor(
        (tempJediPower.pd + parseFloat(NFT.amount) * NFT.pd) / (parseFloat(NFT.amount) + 1)
      );
      tempJediPower.pk = Math.floor(
        (tempJediPower.pk + parseFloat(NFT.amount) * NFT.pk) / (parseFloat(NFT.amount) + 1)
      );
      tempJediPower.ps = Math.floor(
        (tempJediPower.ps + parseFloat(NFT.amount) * NFT.ps) / (parseFloat(NFT.amount) + 1)
      );
      tempJediPower.pc = Math.floor(
        (tempJediPower.pc + parseFloat(NFT.amount) * NFT.pc) / (parseFloat(NFT.amount) + 1)
      );
      tempJediPower.ph = Math.floor(
        (tempJediPower.ph + parseFloat(NFT.amount) * NFT.ph) / (parseFloat(NFT.amount) + 1)
      );
    });
    var tempDarthPower = {
      pd: 0,
      pk: 0,
      ps: 0,
      pc: 0,
      ph: 0,
    };

    NFTs.filter((NFT) => {
      if (NFT.side === "darth" && parseFloat(NFT.amount) > 0) {
        return true;
      } else {
        return false;
      }
    }).forEach((NFT) => {
      console.log(NFT);
      tempDarthPower.pd = Math.floor(
        (tempDarthPower.pd + parseFloat(NFT.amount) * NFT.pd) / (parseFloat(NFT.amount) + 1)
      );
      tempDarthPower.pk = Math.floor(
        (tempDarthPower.pk + parseFloat(NFT.amount) * NFT.pk) / (parseFloat(NFT.amount) + 1)
      );
      tempDarthPower.ps = Math.floor(
        (tempDarthPower.ps + parseFloat(NFT.amount) * NFT.ps) / (parseFloat(NFT.amount) + 1)
      );
      tempDarthPower.pc = Math.floor(
        (tempDarthPower.pc + parseFloat(NFT.amount) * NFT.pc) / (parseFloat(NFT.amount) + 1)
      );
      tempDarthPower.ph = Math.floor(
        (tempDarthPower.ph + parseFloat(NFT.amount) * NFT.ph) / (parseFloat(NFT.amount) + 1)
      );
    });

    setState({ ...state, JediPower: tempJediPower, DarthPower: tempDarthPower });
  };

  const balances = () => {
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const NFTs = store.getStore("NFTs");
    const darthLP = store.getStore("darthLP");
    const jediLP = store.getStore("jediLP");
    setState({
      ...state,
      accountAddress: account,
      haveNFT: haveNFT,
      isInWar: isInWar,
      dwarf: dwarf,
      darthLP: darthLP,
      jediLP: jediLP,
      NFTs: NFTs,
    });
    calcPowers();
  };

  const renderJediNFTs = () => {
    const { NFTs = [] } = state;

    return NFTs.filter((nft) => {
      if (nft.side === "jedi") {
        // if (nft.side === 'jedi' && parseFloat(nft.amount) > 0) {
        return true;
      } else {
        return false;
      }
    }).map((nft) => <div key={NFTs.indexOf(nft)}>{renderNFT(nft)}</div>);
  };

  const renderDarthNFTs = () => {
    const { NFTs } = state;

    return NFTs.filter((nft) => {
      if (nft.side === "darth") {
        // if (nft.side === 'darth' && parseFloat(nft.amount) > 0) {
        return true;
      } else {
        return false;
      }
    }).map((nft) => <div key={NFTs.indexOf(nft)}>{renderNFT(nft)}</div>);
  };

  useEffect(() => {
    store.getNFTBalances();
    emitter.on("balances", balances);
    emitter.on("nbalances", balances);

    calcPowers();

    return () => {
      emitter.on("balances", balances);
      emitter.on("nbalances", balances);
    };
  }, []);

  const renderNFT = (nft) => {
    return (
      <div className={appStyle.nfblock} style={{background: "black"}}>
        <div className={appStyle.nfblockPower}>
          <span>Damage: {nft.pd}</span>
          <span>Kinetics: {nft.pk}</span>
          <span>Speed: {nft.ps}</span>
          <span>Conversion: {nft.pc}</span>
          <span>Healing: {nft.ph}</span>
          <span>
            {nft.suply}/{nft.total}
          </span>
        </div>
        <div className={appStyle.nfblockMine}>
          <span>{nft.amount}</span>
        </div>
        <img src={nft.logo} alt="" />
        <p>{nft.title}</p>
        <p className={nft.side}>
          {nft.price} <br />
          DWARF
        </p>
      </div>
    );
  };

  const renderNftBtn = (nft) => (
    <div
      className={style.nftBtnContainer}
      onClick={() => {
        setSelectedNft(nft);
        setNftModal(true);
      }}
    >
      <img src={nft.logo} alt="" />
    </div>
  );

  const renderMiami = () => {
    const miamiNft = NFTs.filter((nft) => nft.character === character && nft.tier === "miami");
    return (
      <div className={style.itemContainer}>
        {miamiNft[0] && renderNftBtn(miamiNft[0])}
        <div className={style.tierBtn} style={{ backgroundColor: "blue" }}>
          miami
        </div>
      </div>
    );
  };

  const renderClassic = () => {
    const classicNft = NFTs.filter((nft) => nft.character === character && nft.tier === "classic");
    return (
      <div className={style.itemContainer}>
        {classicNft[0] && renderNftBtn(classicNft[0])}
        <div className={style.tierBtn} style={{ backgroundColor: "darkgoldenrod" }}>
          classic
        </div>
      </div>
    );
  };

  const renderCommon = () => {
    const commonNft = NFTs.filter(
      (nft) => nft.character === character && nft.tier !== "classic" && nft.tier !== "miami"
    );
    return (
      <>
        <div className={style.rowContainer}>
          {commonNft[0] && renderNftBtn(commonNft[0])}
          {commonNft[1] && renderNftBtn(commonNft[1])}
          {commonNft[2] && renderNftBtn(commonNft[2])}
        </div>
        <div className={style.itemContainer}>
          <div className={style.rowContainer}>
            {commonNft[3] && renderNftBtn(commonNft[3])}
            {commonNft[4] && renderNftBtn(commonNft[4])}
          </div>
          <div className={style.tierBtn} style={{ backgroundColor: "deeppink" }}>
            common
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={appStyle.container} style={{ minHeight: "658px", marginTop: "0px" }}>
      <div className={style.characterTitle}>{characterName[character]}</div>
      <div className={style.rowContainer} style={{ padding: "0px 200px" }}>
        <div className={style.characterList}>
          {Object.keys(characterName).map((key) => {
            return (
              <div className={style.characterBtn} onClick={() => setCharacter(key)}>
                {characterName[key]}
              </div>
            );
          })}
        </div>
        {renderMiami()}
        {renderClassic()}
      </div>
      {renderCommon()}
      {/* <Modal className="nftModal" visible={nftModal} footer={null} onCancel={() => setNftModal(false)}>
        {renderNFT(selectedNft)}
      </Modal> */}
      <Modal className="nftModal" isOpen={nftModal} onRequestClose={() => setNftModal(false)} style={nftModalStyles}>
        {renderNFT(selectedNft)}
      </Modal>
      {/* <div className={appStyle.flexcol}>
        <div className={style.genesis} onClick={() => toogleIsShow("genesis")}>
          GENESIS
        </div>
      </div> */}
      {/* <div className={appStyle.flexrow}>
        <div className={appStyle.flexcol}>
          <div className={style.textcenter}>
            {genesis.isShow && (
              <div className={appStyle.nfblock} style={{ cursor: "pointer" }}>
                <img src="img/jedi.png" alt="JEDI" />
                <p>
                  {jediLP} <br /> JEDI/DWARF LP
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>Damage</td>
                      <td>{JediPower.pd}</td>
                    </tr>
                    <tr>
                      <td>Kinetics</td>
                      <td>{JediPower.pk}</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>{JediPower.ps}</td>
                    </tr>
                    <tr>
                      <td>Conversion</td>
                      <td>{JediPower.pc}</td>
                    </tr>
                    <tr>
                      <td>Healing</td>
                      <td>{JediPower.ph}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
             )}
          </div>

          {jedi.isShow && renderJediNFTs()}
          {renderJediNFTs()}
        </div>
        <div className={appStyle.flexcol}>
          <div className={style.textcenter}>
            {genesis.isShow && (
              <div className={appStyle.nfblock} style={{ cursor: "pointer" }}>
                <img src="img/dart.png" alt="DARTH" />
                <p>
                  {darthLP} <br /> DARTH/DWARF LP
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>Damage</td>
                      <td>{DarthPower.pd}</td>
                    </tr>
                    <tr>
                      <td>Kinetics</td>
                      <td>{DarthPower.pk}</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td>{DarthPower.ps}</td>
                    </tr>
                    <tr>
                      <td>Conversion</td>
                      <td>{DarthPower.pc}</td>
                    </tr>
                    <tr>
                      <td>Healing</td>
                      <td>{DarthPower.ph}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )} 
          </div>
          {renderDarthNFTs()}
          {darth.isShow && renderDarthNFTs()}
        </div>
      </div> */}
    </div>
  );
};

export default Oracle;
