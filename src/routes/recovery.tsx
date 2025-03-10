import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const URL_API = "https://api.legacyofgame.io";
// auth
const VERIFY_TOKEN_URL = URL_API + "/auth/verifyToken"; // GET
const RESET_URL = URL_API + "/auth/confirmRecovery"; // POST

type RecoveryParams = {
  username?: string;
  token?: string;
};

export const Route = createFileRoute("/recovery")({
  component: Recovery,
  validateSearch: (search: Record<string, unknown>): RecoveryParams => {
    // validate and parse the search params into a typed state
    return {
      username: (search.username as string) || undefined,
      token: (search.token as string) || undefined,
    };
  },
});

function Recovery() {
  const { username, token } = Route.useSearch();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const verifyToken = useQuery({
    queryKey: ["verify-recovery-token"],
    retry: false,
    queryFn: async () => {
      if (!username || !token) return false;

      const url = new URL(VERIFY_TOKEN_URL);
      url.searchParams.append("username", username);
      url.searchParams.append("token", token);
      const res = await fetch(url);
      const text = await res.text();
      const ok = text === "true" ? true : false;
      return ok;
    },
  });

  const resetMutation = useMutation({
    mutationFn: async (body: string) => {
      const res = await fetch(RESET_URL, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await res.text();
      switch (result) {
        case "false":
          toast.error("This token is invalid.");
          break;

        case "true":
          toast.success("Password changed successfully.");
          setSuccess(true);
          break;

        default:
          toast.error(
            "Bad request, check if your new password matches the criteria.",
          );
          break;
      }

      return result;
    },
  });

  if (verifyToken.isLoading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );

  if (verifyToken.data === false)
    return (
      <div className="w-full mx-auto min-h-[40vh] flex flex-col items-center justify-center text-white px-8 max-w-screen-2xl text-center gap-8">
        <h2 className="text-3xl">Reset Password</h2>
        <p className="text-xl">
          The recovery link was expired or malformed. Try opening it again or
          request a new reset link.
        </p>
      </div>
    );

  if (success)
    return (
      <div className="w-full mx-auto min-h-[40vh] flex flex-col items-center justify-center text-white px-8 max-w-screen-2xl text-center gap-8">
        <h2 className="text-3xl">Reset Password</h2>
        <p className="text-xl text-green-400">
          Your password has been updated successfully.
          <br />
          You can close this window or navigate to another page.
        </p>
        <Link to="/">
          <button
            className="px-14 py-3 text-xl rounded-xl font-orbitron bg-[#9000FF] font-black text-white"
            type="submit"
          >
            Go to Homepage
          </button>
        </Link>
      </div>
    );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!verifyToken.data || !username || !password || !token) return;
    const usp = new URLSearchParams();
    usp.append("username", username);
    usp.append("password", password);
    usp.append("token", token);
    resetMutation.mutate(usp.toString());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center py-10"
    >
      <h2 className="text-3xl text-white">Reset Password</h2>
      <div className="flex-col flex gap-8 py-8 max-w-xl">
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="password">
            New Password:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="password"
            name="password"
            autoComplete="new-password"
            id="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
            title="Password must contain uppercase and lowercase letters and at least one number and one special character [@$!%*#?&] - Length: 8-24"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            id="confirm-password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
            title="Password must contain uppercase and lowercase letters and at least one number and one special character [@$!%*#?&] - Length: 8-24"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className="text-center">
          Password must contain uppercase and lowercase letters and at least one
          number and one special character [@$!%*#?&] - Length: 8-24
        </p>
      </div>
      <Button type="submit">Confirm</Button>
      <hr className="h-20" />
    </form>
  );
}
