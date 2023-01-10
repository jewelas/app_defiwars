import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { slide as MenuMobile } from 'react-burger-menu';
import style from './Menu.module.css';
import classNames from "classnames";
import { useSelector } from 'react-redux';

let styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "36px",
    top: "60px",
  },

  bmBurgerBars: {
    background: "#fff",
    height: "3px",
  },
  bmBurgerBarsLastChild: {
    display: "none",
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    top: 0,
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
    position: "relative",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    display: "flex",
    flexDirection: "column",
  },
  bmItem: {
    display: "inline-block",
    color: "#fff",
    fontSize: "24px",
    fontFamily: "Roboto",
    padding: "5px 0",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    top: 0,
  },
};

const Menu = () => {
  const isInWar = useSelector(state => state.user.isInWar);

  const [state, setState] = useState({
    showDefi: false,
    width: window.innerWidth,
  });

  const showHideDefi = (value) => {
    setState({ ...state, showDefi: value });
  };

  const onResize = () => setState({
    ...state,
    width: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return (() => {
      window.removeEventListener("resize", onResize);
    });
  }, [])

  return ( isInWar ?
    <>
      {state.width < 768 ? (
        <MenuMobile styles={styles} right pageWrapId="root">
          <Link to="/What_is_DWARF">
              DWARF
          </Link>

          <a
            onClick={() => showHideDefi(!state.showDefi)}
          >
            Services
          </a>

          <Collapse isOpened={state.showDefi}>
            <div
              onMouseLeave={() => showHideDefi(false)}
              className={classNames(
                style.submenuMobile, { [style.submenuActive]: state.showDefi })
              }
            >
              <Link to="/pool">Polarized Liquidity Pools</Link>
              <Link to="/swap">DWARFSwap</Link>
              <Link to="/NFA_Market">NFT Marketplace</Link>
              <Link to="/The_Army">My NFTs</Link>
              <Link to="/NFA_Collections">Collections</Link>
            </div>
          </Collapse>

          <Link exact to="/About_the_Team">Team</Link>

          <Link exact to="/Make_Contact">Contact</Link>
        </MenuMobile>
      ) : null
      }
      <div className={style.Menu}>
        <ul className={style.mainMenu}>
          <li>
            <Link exact to="/What_is_DWARF"><div className={style.menuItem}>DWARF</div></Link>
          </li>
          <li onMouseEnter={() => showHideDefi(true)}
            onMouseLeave={() => showHideDefi(false)}>
            <a href="#!"><div className={style.menuItem}>Services</div></a>
            <Collapse isOpened={state.showDefi}>
              <div
                className={classNames(style.submenu, { [style.submenuActive]: state.showDefi })} >
                <Link to="/pool">Polarized Liquidity Pools</Link>
                <Link to="/swap">DWARFSwap</Link>
                <Link to="/NFA_Market">NFT Marketplace</Link>
                <Link to="/The_Army">My NFTs</Link>
                <Link to="/NFA_Collections">Collections</Link>
              </div>
            </Collapse>
          </li>
          <li>
            <Link exact to="/About_the_Team"><div className={style.menuItem}>Team</div></Link>
          </li>
          <li>
            <Link exact to="/Make_Contact"><div className={style.menuItem}>Contact</div></Link>
          </li>
        </ul>
      </div>
    </> : null
  );
};

export default Menu;
