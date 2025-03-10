// until all errors are fixed
/* eslint-disable */
// @ts-nocheck
//
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";
import { BigNumber, ethers } from "ethers";
import { config } from "@/config";
import { useState } from "react";
import { Hero } from "@/components/hero";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { Ellipse } from "@/components/ellipse";

export const Route = createFileRoute("/swap")({
  component: Swap,
});

// 1. Get projectId at https://cloud.reown.com
const projectId = "9f0339de069cf955833797020740df8c";

// 2. Create your application's metadata object
const metadata = {
  name: "Legacy Of Game",
  description: `Benvenuto in Legacy Of Game (LOG), la piattaforma Play To Earn che rivoluziona il gioco online! In LOG, uniamo le abilità dei giocatori con il potenziale di guadagno, concentrandoci su abilità, divertimento ed equa distribuzione della ricchezza. Unisciti a LOG, dove il gioco incontra l'innovazione in un ecosistema divertente e sostenibile. Scopri il futuro dei giochi con LOG!`,
  url: "https://www.legacyofgame.io/", // origin must match your domain & subdomain
  icons: ["https://ibb.co/SnykVtG"],
};

const mainnet = {
  chainId: 56,
  name: "BSC",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-dataseed1.binance.org/",
};

const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "https://bsc-dataseed1.binance.org/", // used for the Coinbase SDK
  defaultChainId: 56, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
const web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function Swap() {
  // hide this page until released 
  const router = useRouter();
  router.navigate({ to: "/", replace: true })  

  // component start
  const minimum = 0;
  const phaseCounter = 1;
  const [lx, setLx] = useState(0);
  const [code, setCode] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [started, setStarted] = useState(false);
  const [imported, setImported] = useState(false);
  const [approved, setApproved] = useState(false);
  const [conversion, setConversion] = useState(0);
  const [postCode, setPostCode] = useState("Check");
  const [selectedCard, setSelectedCard] = useState("BNB");

  const [isLoading, setIsLoading] = useState(false);

  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function handleOpenAccount() {
    await web3Modal.open({ view: "Account" });
  }

  async function connect() {
    setIsLoading(true);
    console.log("connect");
    await web3Modal.open({ view: "Connect" });

    if (started) {
      if (!walletProvider) {
        throw new Error("Missing provider");
      }
    }

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    window.ethereum.on("chainChanged", (chainId) => {
      console.log(chainId);
      if (chainId != "0x38") window.location.reload();
    });

    let tries = 0;
    const intr = setInterval(async () => {
      if (!web3Modal.getState().open) {
        setIsLoading(false);
        clearInterval(intr);
      }
      if (web3Modal.getIsConnected()) {
        setIsLoading(false);
        await web3Modal.close();
        clearInterval(intr);
      }
      if (++tries == 60) clearInterval(intr);
    }, 1000);
  }

  async function handleButtonClick() {
    if (!isConnected) {
      await connect();
      return;
    }

    console.log({ approved, postCode });

    if (!approved) {
      if (postCode === "Check") {
        await checkAllowance();
      }

      if (postCode === "Approve") {
        await approve();
      }
    } else if (approved && postCode === "Buy") {
      await buy();
    }
  }

  const checkAllowance = async () => {
    if (!address || !isConnected || !walletProvider) {
      alert("There was an error reading the wallet. Reloading the page...");
      window.location.reload();
      return;
    }
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

    setIsLoading(true);

    // The Contract object
    const contract = new ethers.Contract(
      config.usdt.address,
      config.usdt.abi,
      ethersProvider,
    );

    const check = await contract.allowance(address, config.presale.address);
    console.log(check);
    await getData();
    setStarted(true);
    handleChange(0);
    if (check == 0) {
      setPostCode("Approve");
    } else {
      setPostCode("Buy");
      setApproved(true);
    }

    setIsLoading(false);
  };

  const getData = async () => {
    await getPrice();
    await getConversion();
    setImported(true);
  };

  const setValueLX = async (mode: string, val: number) => {
    if (!imported) {
      await getData();
      setImported(true);
    }

    setLx(
      mode === "BNB"
        ? Math.floor((val * conversion) / price)
        : Math.floor((val * 10 ** 18) / price),
    );
    console.log(mode === "BNB" ? (val * conversion) / price : val / price);
  };

  const getBalance = async (coin: string) => {
    if (!address || !isConnected || !walletProvider) {
      alert("There was an error reading the wallet. Reloading the page...");
      window.location.reload();
      return;
    }
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

    if (coin === "BNB") {
      return ethersProvider.getBalance(address);
    } else {
      // The Contract object
      const contract = new ethers.Contract(
        config["usdt"]["address"],
        config["usdt"]["abi"],
        ethersProvider,
      );
      const balance = await contract.balanceOf(address);
      console.log(parseInt(balance));
      return balance;
    }
  };

  const getConversion = async () => {
    if (!address || !isConnected || !walletProvider) {
      alert("There was an error reading the wallet. Reloading the page...");
      window.location.reload();
      return;
    }
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

    // The Contract object
    const contract = new ethers.Contract(
      config.presale.address,
      config.presale.abi,
      ethersProvider,
    );
    const res: BigNumber = await contract.getConversion();
    const conv = res.toNumber() * 10 ** 10;
    setConversion(conv);
  };

  const getPrice = async () => {
    if (!address || !isConnected || !walletProvider) {
      alert("There was an error reading the wallet. Reloading the page...");
      window.location.reload();
      return;
    }
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

    // The Contract object
    const contract = new ethers.Contract(
      config.presale.address,
      config.presale.abi,
      ethersProvider,
    );
    const data = await contract.getPhaseData(phaseCounter);
    console.log(parseInt(data.price));
    setPrice(data.price);
  };

  const approve = async () => {
    setIsLoading(true);
    try {
      if (!address || !isConnected || !walletProvider) {
        alert("There was an error reading the wallet. Reloading the page...");
        window.location.reload();
        return;
      }
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);

      const signer = ethersProvider.getSigner();

      // The Contract object
      const contract = new ethers.Contract(
        config.usdt.address,
        config.usdt.abi,
        signer,
      );

      const tx = await contract.approve(
        config.presale.address,
        config.approveAmount,
      );

      const receipt = await tx.wait();
      setPostCode("Pending...");
      console.log(receipt);
      setApproved(true);
      setIsLoading(false);
      alert("Check the tx on the explorer!", config.connection.explorer + hash);
      window.location.reload();
    } catch (err: unknown) {
      setIsLoading(false);
      try {
        console.log(err.data.message);
        alert(err.data.message);
      } catch {
        console.log(err.message);
        alert(err.message);
      }
    }
  };

  const buy = async () => {
    setIsLoading(true);
    try {
      if (!address || !isConnected || !walletProvider) {
        alert("There was an error reading the wallet. Reloading the page...");
        window.location.reload();
        return;
      }
      const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
      console.log(await ethersProvider.getBalance(address));
      getBalance(selectedCard);
      const signer = ethersProvider.getSigner();
      await getPrice();

      // The Contract object
      const contract = new ethers.Contract(
        config.presale.address,
        config.presale.abi,
        signer,
      );

      const usdtAmount = amount.toString() + "000000000000000000";
      const bnbAmount = (amount * 10 ** 18).toString();

      const tx =
        selectedCard == "BNB"
          ? started
            ? await contract.buyAsRefWithBNB(code, { value: bnbAmount })
            : await contract.buyWithBNB({ value: bnbAmount })
          : started
            ? await contract.buyAsRefWithUSDT(usdtAmount, code)
            : await contract.buyWithUSDT(usdtAmount);
      setPostCode("Pending...");
      const receipt = await tx.wait();
      alert("Check the tx on the explorer!", config.connection.explorer + hash);
      setIsLoading(false);
      window.location.reload();
      console.log(receipt);
    } catch (err) {
      setIsLoading(false);
      console.log(err.data.message != undefined ? err.data.message : err);
      alert(err.data.message != undefined ? err.data.message : err);
    }
  };

  function handleSelect(selectedCard: string) {
    setSelectedCard(selectedCard);
    getBalance(selectedCard);

    setAmount(selectedCard === "BNB" ? 0 : minimum);
    setValueLX(selectedCard, selectedCard === "BNB" ? 0 : minimum);
  }

  function handleChange(value: number) {
    if (value >= 0) {
      if (selectedCard === "BNB") {
        if ((value * conversion) / 10 ** 18 >= minimum) {
          setAmount(value);
          setValueLX(selectedCard, value);
        } else {
          setAmount(0);
          setValueLX(selectedCard, 0);
        }
      } else {
        if (value >= minimum) {
          setAmount(value);
          setValueLX(selectedCard, value);
        } else {
          setAmount(minimum);
          setValueLX(selectedCard, minimum);
        }
      }
    } else {
      /*
      if(selectedCard === "BNB") {
        setAmount(0.01);
        setValueLX(selectedCard, 0.01);
      }
      */
    }
  }

  return (
    <Wrapper>
      <Hero title="Presale Page" subtitle="Pre-order your LOG(LX) now!">
        <div className="relative rounded-2xl">
          <button
            className="text-xl px-12 py-3 lg:text-2xl lg:px-16 lg:py-3 min-[1920px]:text-3xl min-[1920px]:px-20 min-[1920px]:py-5 font-orbitron bg-transparent font-black text-white"
            disabled
          >
            <span className="drop-shadow-btnText">Buy LX: 0.00336$</span>
          </button>
          <HeroBtnGradient className="absolute top-0 left-0 w-full h-full object-cover -z-20" />
        </div>
      </Hero>

      <hr className="h-10" />

      <div className="w-full flex flex-col items-center relative [&_*]:border-[#3C3045]">
        <Ellipse />

        <div className="z-10 flex flex-col justify-center items-center gap-8 pt-24 max-lg:w-full">
          <p className="text-xl text-center lg:text-2xl font-medium">
            Send USDT to this address on BSC mainnet for receiving LOGX :
          </p>
          <p className="text-lg max-lg:break-all lg:text-3xl bg-card px-5 sm:px-7 lg:px-16 py-5 rounded-3xl border-2 text-white font-orbitron font-black text-center">
            0x58C35aF36E93d59Db53bCD113B704bEAd24D5b4C
          </p>
        </div>

        <hr className="h-32" />

        <div className="flex gap-8 sm:gap-16 items-center justify-between w-full sm:w-auto lg:justify-center">
          <button
            className={cn(
              "w-full sm:w-44 py-3 text-2xl rounded-xl font-orbitron font-black text-white border-2 disabled:opacity-70 disabled:cursor-not-allowed",
              selectedCard === "BNB"
                ? "bg-[#9000FF] border-transparent"
                : "bg-[#251130]",
            )}
            onClick={() => (isConnected ? handleSelect("BNB") : "")}
            disabled={!isConnected}
          >
            BNB
          </button>
          <button
            className={cn(
              "w-full sm:w-44 py-3 text-2xl rounded-xl font-orbitron font-black text-white border-2 disabled:opacity-70 disabled:cursor-not-allowed",
              selectedCard === "USDT"
                ? "bg-[#9000FF] border-transparent"
                : "bg-[#251130]",
            )}
            onClick={() => (isConnected ? handleSelect("USDT") : "")}
            disabled={!isConnected}
          >
            USDT
          </button>
        </div>

        <hr className="h-10" />

        <div className="bg-card border-2 flex flex-col sm:grid grid-cols-2 grid-rows-[auto_auto_auto] px-8 lg:px-16 py-12 rounded-3xl gap-x-16 gap-y-8 text-xl font-medium max-w-[1000px] w-full">
          <div className="row-start-1 row-end-1 col-start-1 col-end-2 flex flex-col gap-4 justify-start items-start">
            <label className="block text-xl sm:text-2xl pl-1" htmlFor="leftInput">
              {`${selectedCard}: `}
            </label>
            <input
              className="px-8 py-4 bg-[#160B1E] border-2 rounded-2xl outline-none text-2xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
              type="number"
              id="leftInput"
              value={amount}
              onChange={(e) => handleChange(e.currentTarget.valueAsNumber)}
              disabled={!imported}
              step={selectedCard === "BNB" ? "0.01" : "1"}
            />

            <div className="flex justify-start items-center">
              <Checkbox
                id="referralCheckbox"
                onCheckedChange={(c) =>
                  setChecked(Boolean(c.valueOf()) || false)
                }
                checked={checked}
                disabled={isConnected ? false : true}
              />
              <label
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2 select-none text-lg sm:text-xl"
                htmlFor="referralCheckbox"
              >
                Check for referral buy
              </label>
            </div>
          </div>

          <div className="row-start-1 row-end-1 col-start-2 col-end-3 flex flex-col gap-4 justify-start items-start">
            <label className="block text-xl sm:text-2xl pl-1" htmlFor="rightInput">
              LX:
            </label>
            <input
              className="px-8 py-4 bg-[#160B1E] border-2 rounded-2xl outline-none text-2xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
              type="number"
              id="rightInput"
              value={lx}
              readOnly
              disabled={!imported}
            />
          </div>

          <div
            className={cn(
              "row-start-2 row-end-3 col-start-1 col-end-3 justify-center flex-col gap-4 items-start py-8",
              isConnected && checked ? "flex" : "hidden",
            )}
          >
            <label className="block text-2xl pl-1" htmlFor="referralCode">
              Referral Code:
            </label>
            <input
              placeholder="Enter the code..."
              id="referralCode"
              className="px-8 py-4 bg-[#160B1E] border-2 rounded-2xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="row-start-3 row-end-4 col-start-1 col-end-3 grid grid-cols-[200px_auto] grid-rows-[60px] justify-center items-end gap-4 pt-8 sm:pt-0">
            <Button
              onClick={handleButtonClick}
              disabled={postCode == "Pending..." || isLoading}
              className="h-full"
            >
              {isLoading ? <Spinner /> : isConnected ? postCode : "Connect"}
            </Button>
            {isConnected && (
              <button
                className="p-4 rounded-2xl bg-[#251130] text-white border-2 h-full flex justify-center items-center"
                onClick={handleOpenAccount}
              >
                <Wallet size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="h-32" />
    </Wrapper>
  );
}

function Spinner() {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 animate-spin text-border fill-white"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function HeroBtnGradient({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="500"
      height="78"
      viewBox="0 0 500 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="499" height="78" rx="20" fill="#13091A" />
      <rect
        x="0.5"
        width="499"
        height="78"
        rx="20"
        fill="url(#paint0_radial_110_193)"
      />
      <rect
        x="1.5"
        y="1"
        width="497"
        height="76"
        rx="19"
        stroke="white"
        stroke-opacity="0.1"
        stroke-width="2"
      />
      <rect
        x="1.5"
        y="1"
        width="497"
        height="76"
        rx="19"
        stroke="white"
        stroke-opacity="0.4"
        stroke-width="2"
        style={{ mixBlendMode: "overlay" }}
      />
      <defs>
        <radialGradient
          id="paint0_radial_110_193"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13.1511 75.5707) rotate(-7.75997) scale(481.922 397.188)"
        >
          <stop stop-color="#9000FF" />
          <stop offset="0.365354" stop-color="#390660" />
          <stop offset="0.607811" stop-color="#210833" />
          <stop offset="0.995667" stop-color="#13091A" />
        </radialGradient>
      </defs>
    </svg>
  );
}
