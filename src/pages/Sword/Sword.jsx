import React, { useMemo } from "react";
import style from "./Sword.module.css";
import appStyle from "../../App.module.css";
import Parser from 'html-react-parser';
import ConnectIcon from "../../components/icons/connect";
import SwordIcon from "../../components/icons/sword";
import MobileSword from "../../components/Sword/MobileSword";
import DesktopSword from "../../components/Sword/DesktopSword";
import { useDispatch, useSelector  } from "react-redux";
import { setAccountAddress } from "../../state/user/actions";
import { useActiveWeb3React } from 'hooks'

const Sword = () => {
  const dispatch = useDispatch();
  const { account: accountAddress } = useActiveWeb3React()
  const connect = () => {}

  let connectButton = "Connect<br /> Wallet";

  var address = "";
  if (accountAddress) {
    address = accountAddress.substring(0, 6) + '...' + accountAddress.substring(accountAddress.length - 4, accountAddress.length)
  }
  if (accountAddress) {
    connectButton = "<br />" + address;
  }

  return (
    <>
    <MobileSword />
    <DesktopSword />

      <div className={appStyle.container}>
        <div className={style.mainConnectWallet}>
          <div>
            <div className={style.connectWallet}>
              <a
                onClick={connect}
              >
                {Parser(connectButton)}
              </a>
              <ConnectIcon width={260} height={91}/>
            </div>
          </div>
          <div>
            <div className={style.info}>
              <p>
                  Every PoLP official NFT can be staked within DeFiWars Finance
                  ecosystem, traded in any open NFT market, and acquired by other
                  users and digital art collectors. Genesis Edition is inspired
                  by a cult movie saga from 1970s; there will be 4 lead characters
                  (YoDWARF, ObiDWARF, DWARF Vader and DWARF Sith), and 3 general
                  tiers: MIAMI, CLASSIC, and COMMON; COMMON category includes 5
                  different classes (for example: GOLDEN, PINK, RED, GREEN, BLUE).
              </p>
              <p>
                  May the $DWARF be with you.
              </p>
              <SwordIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sword;
