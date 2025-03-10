import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const URL_API = "https://api.legacyofgame.io";
const VERIFY_EMAIL_URL = URL_API + "/auth/confirmEmailVerification";

type VerificationParams = {
  username?: string;
  token?: string;
};

export const Route = createFileRoute("/verification")({
  component: VerificateAccount,
  validateSearch: (search: Record<string, unknown>): VerificationParams => {
    // validate and parse the search params into a typed state
    return {
      username: (search.username as string) || undefined,
      token: (search.token as string) || undefined,
    };
  },
});

function VerificateAccount() {
  const { username, token } = Route.useSearch();

  const verifyEmail = useQuery({
    queryKey: ["verify-account-email"],
    retry: false,
    queryFn: async () => {
      if (!username || !token) return false;

      const url = new URL(VERIFY_EMAIL_URL);
      url.searchParams.append("username", username);
      url.searchParams.append("token", token);
      const res = await fetch(url);
      const text = await res.text();
      const ok = text === "true" ? true : false;
      return ok;
    },
  });

  if (verifyEmail.isLoading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );

  if (verifyEmail.data === false)
    return (
      <div className="w-full mx-auto min-h-[40vh] flex flex-col items-center justify-center text-white px-8 max-w-screen-2xl text-center gap-8">
        <h2 className="text-3xl">Account Verification</h2>
        <p className="text-xl">
          The verification link is invalid, maybe you have already verified this
          account. Try opening it again.{" "}
        </p>
      </div>
    );

  return (
    <div className="w-full mx-auto min-h-[40vh] flex flex-col items-center justify-center text-white px-8 max-w-screen-2xl text-center gap-8">
      <h2 className="text-3xl">Account Verification</h2>
      <p className="text-xl text-green-400">
        Your email has been verified successfully.
        <br />
        You can close this window or navigate to another page.
      </p>
      <Link to="/">
        <Button type="submit">Go to Homepage</Button>
      </Link>
    </div>
  );
}
