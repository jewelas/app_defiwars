import style from "./Sword.module.css";

import { useActiveWeb3React } from 'hooks'

import React from "react";

const MobileSword = () => {

  const { account: accountAddress } = useActiveWeb3React()

  return (
    <div className={style.mobileSword}>
      <div className={style.mobileSwordWrapper}>
        <img
          src="img/blade-mobile.png"
          className={
            accountAddress
              ? style.mobileSwordBladeActive
              : style.mobileSwordBlade
          }
          alt="Light Saber"
        />
        <img
          src="img/handle-mobile.png"
          className={style.mobileSwordHandle}
          alt="Light Saber Handle"
        />
      </div>
    </div>
  )
};

export default MobileSword;
