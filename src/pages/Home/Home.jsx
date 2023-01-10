import React from "react";
import style from "./Home.css";

const Home = () => (
  <div className={style.container}>
    <div className={style.title}>What is DeFiWars Finance?</div>
    <div className={style.content}>
      <div className={style.contentText}>
        <div>
          DeFiWars Finance is an NFT-based GameFi ecosystem, where artists, collectors, degens, and newbies engage in
          several Scheduled Warfare events to accrue the highest APYs (Annualized Percentage Yields) over selected
          periods, within one or more PoLPs (Polarized Liquidity Pools).
        </div>
        <div>
          At its core, it is the combination of several smart contracts which behave in response to the aggregated
          decisions of each and every user.
        </div>
        <div>
          At the surface, it is a warfare platform where opposing sides take stands against each other on a timely
          manner. The deciding factor for each warfare is dependent on the decisions made by the members of each side
          (PoLP).
        </div>
        <div>
          See it as a DeFi platform with deflationary tokenomics, where you can earn fixed and dynamic APYs; and, also,
          a game of collectible NFT (Non-Fungible Token) cards which can be traded in secondary markets., mixed
          altogether.
        </div>
      </div>
      <img src="/img/planetWar.png" alt="planetWar" style={{width: "384px"}}/>
    </div>
  </div>
);

export default Home;
