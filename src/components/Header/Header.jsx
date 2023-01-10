import React, { useEffect } from 'react';
import style from './Header.css';
import appStyle from '../../App.module.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import ConnectWallet from "../buttons/ConnectWallet";
import { useActiveWeb3React } from 'hooks'
import { useDefiwars } from "hooks/useDefiWars";
import { useDispatch, useSelector } from 'react-redux';
import { setHaveNFT, setInProcess, setIsInWar } from "state/user/actions";

const Header = () => {
  const { onMint, checkNFT } = useDefiwars();
  const isInWar = useSelector(state => state.user.isInWar);
  const ethBalance = useSelector(state => state.user.ethbalance);
  const jediLP = useSelector(state => state.user.jediLP);
  const darthLP = useSelector(state => state.user.darthLP);
  const dwarf = useSelector(state => state.user.dwarf);
  const inProcess = useSelector(state => state.user.inProcess);
  const haveNFT = useSelector(state => state.user.haveNFT);
  const dispatch = useDispatch();

  return (
    <header>
      <div className={style.logo}>
        <Link to='/'>
          <img src='/img/sword-logov2.png' alt='Home' className={appStyle.logo}/>
        </Link>
        <ConnectWallet sound />
      </div>
      {/* <button onClick={onMint}> OnMint</button>
      <br /> */}
      {/* <span style={{ color: 'white' }}>{`ethBalance: ${ethBalance}`}</span>
      <br />
      <span style={{ color: 'white' }}>{`jediBalance: ${jediLP}`}</span>
      <br />
      <span style={{ color: 'white' }}>{`darthBalance: ${darthLP}`}</span>
      <br />
      <span style={{ color: 'white' }}>{`dwarfBalance: ${dwarf}`}</span>
      <br />

      <span style={{ color: 'white' }}>{`isInWar: ${isInWar}`}</span>
      <br />

      <span style={{ color: 'white' }}>{`haveNFT: ${haveNFT}`}</span>
      <br />

      <span style={{ color: 'white' }}>{`isProcess: ${inProcess}`}</span>
      <br />
      <button onClick={checkNFT}>
        checkNFT
      </button>

      <button onClick={() => dispatch(setHaveNFT({
        haveNFT: true
      }))}>
        setHaveNFT
      </button>

      <button onClick={() => dispatch(setInProcess({ inProcess: true }))}>
        setInProcess
      </button>

      <button onClick={() => dispatch(setIsInWar({
        isInWar: true,
        inProcess: false
      }))}>
        setIsInWar
      </button> */}

      <div className={appStyle.container} style={{marginTop: "0px"}}>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
