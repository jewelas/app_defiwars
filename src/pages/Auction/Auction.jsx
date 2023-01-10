import React from "react";
import style from "./Auction.css";
import appStyle from "../../App.module.css";
import Store from "../../store/store";
import { getCurrentTime } from "../../utils/dateFunctions";

const store = Store.store;
const emitter = Store.emitter

class Auction extends React.Component {
  constructor(props) {
    super(props);
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    const auctionAddress = store.getStore("auctionAddress");

    var timeNow = getCurrentTime(new Date());
    var dateEnd = new Date();
    dateEnd.setHours(dateEnd.getHours() + 24)
    var timeEnd = getCurrentTime(dateEnd);

    this.state = {
      accountAddress: accountAddress,
      totalCap: 2000 * 10 ** 18,
      haveNFT: haveNFT,
      isInWar: isInWar,
      dwarf: dwarf,
      auctionAddress: auctionAddress,
      depositeth: "1",
      timeEnd: timeEnd,
      timeNow: timeNow,
      currentAuctionPrice: 0,
      currentDeposit: 0,
      currentCAP: 0,
      capprocent: 0,
      totalDwarf: 0,
    };
    this.balances = this.balances.bind(this);
    this.checkAuction = this.checkAuction.bind(this);
    this.checkTotal = this.checkTotal.bind(this);
    //this.checkAuction();
  }

  async balances() {
    const accountAddress = store.getStore("accountAddress");
    const haveNFT = store.getStore("haveNFT");
    const isInWar = store.getStore("isInWar");
    const dwarf = store.getStore("dwarf");
    await this.setState({
      accountAddress: accountAddress,
      haveNFT: haveNFT,
      isInWar: isInWar,
      dwarf: dwarf,
    })
    this.checkAuction();

  }

  async checkAuction() {
    const { totalCap } = this.state;
    const accountAddress = store.getStore("accountAddress");
    const auctionAddress = store.getStore("auctionAddress");
    const web3 = store.getStore("web3");

    const auctionABI = store.getStore("auctionABI");
    const auctionContract = new web3.eth.Contract(JSON.parse(auctionABI), auctionAddress);
    console.log("first");
    var currentDeposit = await auctionContract.methods.totalDeposited().call({ from: accountAddress, });
    console.log(currentDeposit);
    currentDeposit = parseFloat(currentDeposit) / 10 ** 18;
    console.log(currentDeposit);

    var currentAuctionPrice = await auctionContract.methods.getCurrentAuctionPrice().call({ from: accountAddress, });
    currentAuctionPrice = parseFloat(currentAuctionPrice) / 10 ** 18;
    console.log(currentAuctionPrice);
    var currentCAP = await auctionContract.methods.getCurrentCap().call({ from: accountAddress, });
    currentCAP = parseFloat(currentCAP) / 10 ** 18;
    console.log(currentCAP);

    var capprocent = Math.round(parseFloat(currentCAP) / totalCap * 100)
    await this.setState({
      currentAuctionPrice: currentAuctionPrice,
      currentDeposit: currentDeposit,
      currentCAP: currentCAP,
      capprocent: capprocent,
    });

    const dwarf20Address = store.getStore("dwarf20Address");
    const erc20ABI = store.getStore("erc20ABI");
    let dwarfContract = new web3.eth.Contract(erc20ABI, dwarf20Address)
    var totalDwarf = await dwarfContract.methods.balanceOf(auctionAddress).call({ from: accountAddress, });
    totalDwarf = parseFloat(totalDwarf) / 10 ** 18;
    await this.setState({ totalDwarf: totalDwarf });
    console.log(totalDwarf);
  }

  async checkTotal() {
    const { totalCap } = this.state;
    const accountAddress = store.getStore("accountAddress");
    const auctionAddress = store.getStore("auctionAddress");
    const web3 = store.getStore("web3");
    console.log("second");

    const dwarf20Address = store.getStore("dwarf20Address");
    const erc20ABI = store.getStore("erc20ABI");
    let dwarfContract = new web3.eth.Contract(erc20ABI, dwarf20Address)
    var totalDwarf = await dwarfContract.methods.balanceOf(auctionAddress).call({ from: accountAddress, });
    console.log("second done");
    totalDwarf = parseFloat(totalDwarf) / 10 ** 18;
    await this.setState({ totalDwarf: totalDwarf });
    console.log(totalDwarf);

  }

  componentWillMount() {
    emitter.on('balances', this.balances);
    emitter.on('nbalances', this.balances);
    emitter.on('auction', this.checkAuction);
  }

  componentWillUnmount() {
    emitter.on('balances', this.balances);
    emitter.on('nbalances', this.balances);
    emitter.on('auction', this.checkAuction);
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  render() {
    const {
      accountAddress,
      timeNow,
      timeEnd,
      capprocent,
      currentAuctionPrice,
      currentCAP,
      currentDeposit,
      totalDwarf
    } = this.state;

    return (
        <div className={appStyle.container}>
          <div className={style.text}>
            <h3>
              Liquidity Auction
            </h3>
            <p>
              Join $DWARF price discovery!
            </p>
          </div>
          <div className={appStyle.flexrow}>
            <div className={appStyle.nfblock} style={{ width: '400px' }}>
              <p>Auction Status</p>
              <table><thead></thead>
                <tr><td>Auction Start</td><td>{timeNow}</td></tr>
                <tr><td>Projected End</td><td>{timeEnd}</td></tr>
                <tr><td>Hard CAP Reached</td><td>{capprocent}%</td></tr>
              </table>

            </div>
            <div className={appStyle.nfblock} style={{ width: '400px' }}>
              <p>Market Status</p>
              <table><thead></thead>
                <tr><td>$DWARF Price</td><td>{currentAuctionPrice}BNB</td></tr>
                <tr><td>BNB Deposited</td><td>{currentDeposit}BNB</td></tr>
                <tr><td>Projected MarketCap</td><td>{currentCAP}BNB</td></tr>
              </table>

            </div>

          </div>

          <div className={appStyle.nfblock} style={{ margin: 'auto' }}>

            <input
              name="depositeth"
              id={'depositeth'}
              placeholder="BNB Value"
              value={this.state.depositeth}
              onChange={this.onChange}
            ></input>
            <button type="submit" onClick={() => store.deposit(this.state.depositeth)}>Deposit BNB</button>
          </div>
          <p className={appStyle.pblock}>$DWARF allocated for the Liquidity Auction <b>{totalDwarf}</b></p>
        </div>
    );
  }
}

export default Auction;
