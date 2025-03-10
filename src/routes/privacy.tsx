import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: Privacy
})

export default function Privacy() {
  return <h1>privacy</h1>;
}
