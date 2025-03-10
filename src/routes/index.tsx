import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/hero";

import { GameSlides } from "@/components/game-slides";
import { TokenTabs } from "@/components/token-tabs";

import { TeamSlides } from "@/components/team-slides";

import gempadPng from "@/assets/png/gempad.png";
import { ProjectDesc } from "@/components/project-desc";
import { GAME_SLIDES, TEAM_SLIDES, TOKEN_TABS } from "@/data";
import { Wrapper } from "@/components/wrapper";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Homepage,
});

export default function Homepage() {
  return (
    <Wrapper id="home">
      <Hero
        title={
          <>
            Unleash your
            <br /> Competitive Edge
          </>
        }
        subtitle="Discover a world of exclusive games and rise to the top."
      >
        <Link to="/" hash="game-slides">
          <Button size={"big"} className="rounded-2xl">
            Play now
          </Button>
        </Link>
      </Hero>

      <hr className="h-10" id="game-slides" />

      <GameSlides slides={GAME_SLIDES} showEllipse />

      <hr className="h-80" />

      <ProjectDesc file={{ label: "Learn More", href: "/green-paper.pdf" }} />

      <hr className="h-80" id="tokens" />

      <TokenTabs tokens={TOKEN_TABS} />

      <hr className="h-80" id="team" />

      <TeamSlides team={TEAM_SLIDES} />

      <hr className="h-80" />

      <img src={gempadPng} className="w-60 sm:w-80 h-auto" />
    </Wrapper>
  );
}
