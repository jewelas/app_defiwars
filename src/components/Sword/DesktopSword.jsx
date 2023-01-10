import style from "./Sword.module.css";

import { useActiveWeb3React } from 'hooks'

import React from "react";

const DesktopSword = () => {

  const { account: accountAddress } = useActiveWeb3React()

  return (
    <div className={style.mainSword}>
      <img
        className={style.handle}
        src="img/handle.png"
        alt="Light Saber Handle" />
      <img
        className={accountAddress ? style.activeSword : style.blade}
        src="img/blade.png"
        alt="Light Saber" />
    </div>
  )
};

export default DesktopSword;
