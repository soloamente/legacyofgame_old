import pawnGameChessWebp from "@/assets/webp/pawn-game-chess.webp";
import pawnGamePoolWebp from "@/assets/webp/pawn-game-pool.webp";
import pawnGameFpsWebp from "@/assets/webp/pawn-game-fps.webp";
import pawnGameRacingWebp from "@/assets/webp/pawn-game-racing.webp";
import pawnGameSoccerWebp from "@/assets/webp/pawn-game-soccer.webp";
import { type Slide as TSlide } from "@/components/game-slides";

import tokenLWebp from "@/assets/webp/token-l.webp";
import tokenLxWebp from "@/assets/webp/token-lx.webp";
import tokenFlWebp from "@/assets/webp/token-fl.webp";
import { type Token as TToken } from "@/components/token-tabs";

import teamGiovanniRPng from "@/assets/png/team-giovanni-r.png";
import teamJacopoCPng from "@/assets/png/team-jacopo-c.png";
import teamUnknownPng from "@/assets/png/team-unknown.png";
import teamMatteoAPng from "@/assets/png/team-matteo-a.png";
import teamGianlucaDAPng from "@/assets/png/team-gianluca-d-a.png";
import {
  type TeamPerson as TTeamPerson,
} from "@/components/team-slides";

export const GAME_SLIDES: TSlide[] = [
  {
    name: "Chess",
    desc: "Descrizione molto breve",
    color: "rgba(144, 0, 255, 0.7)",
    img: pawnGameChessWebp,
    opacity: 1,
    href: "/games/chess/"
  },
  {
    name: "Pool",
    desc: "Descrizione molto breve",
    color: "rgba(255, 77, 22, 0.7)",
    img: pawnGamePoolWebp,
    opacity: 0.4,
  },
  {
    name: "FPS",
    desc: "Descrizione molto breve",
    color: "rgba(251, 16, 47, 0.7)",
    img: pawnGameFpsWebp,
    opacity: 0.4,
  },
  {
    name: "Racing",
    desc: "Descrizione molto breve",
    color: "rgba(255, 233, 64, 0.7)",
    img: pawnGameRacingWebp,
    opacity: 0.4,
  },
  {
    name: "Soccer",
    desc: "Descrizione molto breve",
    color: "rgba(64, 255, 194, 0.7)",
    img: pawnGameSoccerWebp,
    opacity: 0.4,
  },
];

export const TOKEN_TABS: TToken[] = [
  {
    id: "token-l",
    name: "Token L",
    subtitle: "Power Up with our L Coin!",
    desc: "Power Up with our L Coin! Descrizione di prova da sistemare.",
    img: tokenLWebp,
    link: {
      label: "Buy now",
      to: "/ltoken",
    },
    longDesc: "The L token will be our algorithmic stablecoin, packages with a value of 100 LOGs will be available on our platform: 1 $. These tokens can be used to access game rooms. The tokens won or lost will be kept in a transaction log on our instant Blockchain. The LOG token can also be earned by watching video sponsors that can be unlocked and viewed in the FreeGame section.All generated LOGs will increase the MarketCap of our LOGX Token!",
    price: 0.01,
    circSupply: 0,
    totEmission: 0
  },
  {
    id: "token-lx",
    name: "Token LX",
    subtitle: "The crypto currency of gaming",
    desc: "Power Up with our L Coin! Descrizione di prova da sistemare.",
    img: tokenLxWebp,
    link: {
      label: "Buy now",
      to: "/swap"
    },
    longDesc: "LOGX (LX) is not just a digital currency; it is the pivot around which the entire Legacy Of Game ecosystem revolves. With a total circulation of 8,8 bn tokens, LOGX is designed for growth and value appreciation through a unique and sustainable economic model. Its strategic distribution includes: Private Sale (10%), I.D.O. (10%) on selected platforms, a Team share (10%), and Public Sale (25%), engaging our global community.",
    price: 0.0036,
    circSupply: 0,
    totEmission: 0
  },
  {
    id: "token-fl",
    name: "Token FL",
    subtitle: "Play as much as you can with FL!",
    desc: "Power Up with our L Coin! Descrizione di prova da sistemare.",
    img: tokenFlWebp,
    longDesc: "Every day the server will distribute FreeLOG as a gift.These coins can be used for betting in various games, accumulating towards rewards. Among these rewards are exclusive Skin NFTs for your account and the coveted LOG token. The FreeCoin project drives revenue through video sponsors, integrated exclusively into FREE. These videos are accessible only with FL, and the revenue generated is disbursed as Token L into the accounts of users who view them, enriching their gaming experience.",
    price: 0.00,
    circSupply: 0,
    totEmission: 0
  },
];

export const TEAM_SLIDES: TTeamPerson[] = [
  {
    name: "Matteo A",
    role: "CEO",
    color: "rgba(144, 0, 255)",
    img: teamMatteoAPng,
  },
  {
    name: "Unknown",
    role: "UNK",
    color: "rgba(255, 77, 22)",
    img: teamUnknownPng,
  },
  {
    name: "Gianluca D.A.",
    role: "Relationship Manager",
    color: "rgba(251, 16, 47)",
    img: teamGianlucaDAPng,
  },
  {
    name: "Jacopo C.",
    role: "Content Creator",
    color: "rgba(255, 233, 64)",
    img: teamJacopoCPng,
  },
  {
    name: "Giovanni R.",
    role: "Social Media Manager",
    color: "rgba(64, 255, 194)",
    img: teamGiovanniRPng,
  },
];
