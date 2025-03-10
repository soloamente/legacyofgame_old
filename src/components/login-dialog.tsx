import { client } from "@/api/client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const REGISTER_URL = "/auth/registerUser"; // POST
const LOGIN_URL = "/auth/loginUser"; // POST
const PWD_RECOVERY_URL = "/auth/requestRecovery"; // GET
const LOGOUT_URL = "/auth/logout"; // GET

const VIEW = {
  Login: "LOGIN",
  Register: "REGISTER",
  ResetPassword: "RESET_PWD",
} as const;

type View = (typeof VIEW)[keyof typeof VIEW];

export function LoginDialog({className}: {className?: string}) {
  const session = useAuthSession();
  const [view, setView] = useState<View>(VIEW.Login);
  const [open, setOpen] = useState<boolean>(false);
  const qc = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await client.get(LOGOUT_URL, { withCredentials: true });
      qc.invalidateQueries({ queryKey: ["auth-session"] });
      toast.success("Logged out successfully.");
    },
  });

  function handleOpenChange(v: boolean): void {
    setOpen(v);
    if (v === false)
      setTimeout(() => {
        setView(VIEW.Login);
      }, 100);
  }

  function closeDialog(): void {
    handleOpenChange(false);
  }

  function logout(): void {
    logoutMutation.mutate();
  }

  if (session.isLoading) return <></>;

  return session.data ? (
    <Button className={className} onClick={logout}>Logout</Button>
  ) : (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className={className}>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {view === VIEW.Login && (
          <LoginView setView={setView} closeDialog={closeDialog} />
        )}
        {view === VIEW.Register && (
          <RegisterView setView={setView} closeDialog={closeDialog} />
        )}
        {view === VIEW.ResetPassword && (
          <ResetPwdView setView={setView} closeDialog={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
}

type ViewProps = {
  setView: React.Dispatch<React.SetStateAction<View>>;
  closeDialog: () => void;
};

function RegisterView({ setView, closeDialog }: ViewProps) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const registerMutation = useMutation({
    mutationFn: async (body: string) => {
      const res = await client.post<string>(REGISTER_URL, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      });

      switch (res.data) {
        case "successful_registration":
          toast.success(
            "Account registered. Verify it from your email address!",
          );
          resetForm();
          closeDialog();
          return true;

        case "invalid_username_or_email":
          toast.error("Invalid username or email address already registered!");
          break;

        case "username_already_exists":
          toast.error("Username already registered!");
          break;

        default:
          toast.error("There was an unexpected error, try again.");
          console.error(res.data);
          break;
      }

      return false;
    },
  });

  function resetForm(): void {
    setEmail("");
    setConfirmPassword("");
    setPassword("");
    setUsername("");
    setTermsAccepted(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const usp = new URLSearchParams();
    if (!termsAccepted) {
      toast.error("You must accept Terms & Conditions and Privacy Policy");
      return;
    }
    usp.append("username", username);
    usp.append("email_address", email);
    usp.append("password", password);
    registerMutation.mutate(usp.toString());
  }

  const formOk =
    termsAccepted &&
    username !== "" &&
    email !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword;

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-3xl text-white">
          Sign Up
        </DialogTitle>
      </DialogHeader>
      <div className="flex-col flex gap-8 py-8">
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="username">
            Username:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="email">
            Email:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="password">
            Password:
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
        <div className="flex items-start justify-start">
          <input
            id="terms-checkbox"
            type="checkbox"
            defaultChecked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
            className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label
            htmlFor="terms-checkbox"
            className="-mt-[3px] ms-4 text-lg font-medium select-none"
          >
            By checking this box, I agree to the{" "}
            <a
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
              target="_blank"
              href="/privacy-policy.pdf"
            >
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
              target="_blank"
              href="/terms-and-conditions.pdf"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p>
            Already registered?{" "}
            <button
              onClick={() => setView(VIEW.Login)}
              type="button"
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
      <DialogFooter className="sm:justify-center">
        <Button type="submit" disabled={!formOk}>
          Sign Up
        </Button>
      </DialogFooter>
    </form>
  );
}

function ResetPwdView({ setView, closeDialog }: ViewProps) {
  const [username, setUsername] = useState<string>("");

  const resetMutation = useMutation({
    mutationFn: async () => {
      const url = new URL(PWD_RECOVERY_URL);
      url.searchParams.append("username", username);
      const res = await client.get<string>(url.toString());

      switch (res.data) {
        case "successful_recovery_request":
          toast.success(
            "Instructions to recover your account have been sent to your email inbox!",
          );
          resetForm();
          closeDialog();
          return true;

        case "try_again_later":
          toast.error("Email already sent! Try again later...");
          break;

        case "email_not_verified":
          toast.error("You must verify you email first, check your inbox.");
          break;

        case "account_not_exists":
          toast.error("Account not found, check your username.");
          break;

        default:
          toast.error("Invalid username or email address!");
          break;
      }

      return false;
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    resetMutation.mutate();
  }

  function resetForm(): void {
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-3xl text-white">
          Reset Password
        </DialogTitle>
      </DialogHeader>
      <div className="flex-col flex gap-8 py-8">
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="username">
            Username:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p>
            New to Legacy Of Game?{" "}
            <button
              onClick={() => setView(VIEW.Register)}
              type="button"
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign Up
            </button>
          </p>
          <button
            onClick={() => setView(VIEW.Login)}
            type="button"
            className="underline text-blue-300 hover:text-blue-200 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
      <DialogFooter className="sm:justify-center">
        <Button type="submit">Request</Button>
      </DialogFooter>
    </form>
  );
}

function LoginView({ setView, closeDialog }: ViewProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const qc = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: async (body: string) => {
      const res = await client.post<string>(LOGIN_URL, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      switch (res.data) {
        case "successful_login":
          toast.success("Login successful.");
          resetForm();
          closeDialog();
          qc.invalidateQueries({ queryKey: ["auth-session"] });
          return true;

        case "email_not_verified":
          toast.error("You must verify you email first, check your inbox.");
          break;

        case "account_not_exists":
          toast.error("Account not found, check your username.");
          break;

        case "failed_login":
          toast.error("Login failed, check your credentials.");
          break;

        default:
          toast.error("There was an unexpected error, try again.");
          console.error(res.data);
          break;
      }

      return false;
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const usp = new URLSearchParams();
    usp.append("username", username);
    usp.append("password", password);
    loginMutation.mutate(usp.toString());
  }

  function resetForm(): void {
    setPassword("");
    setUsername("");
  }

  const formOk = username !== "" && password !== "";

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle className="text-3xl text-white">Login</DialogTitle>
      </DialogHeader>
      <div className="flex-col flex gap-8 py-8">
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="username">
            Username:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="text"
            name="username"
            autoComplete="username"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <label className="block text-xl pl-1" htmlFor="password">
            Password:
          </label>
          <input
            className="px-4 py-2 bg-[#160B1E] border rounded-xl outline-none text-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
            type="password"
            name="password"
            autoComplete="current-password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <p>
            New to Legacy Of Game?{" "}
            <button
              onClick={() => setView(VIEW.Register)}
              type="button"
              className="underline text-blue-300 hover:text-blue-200 transition-colors"
            >
              Sign Up
            </button>
          </p>
          <button
            onClick={() => setView(VIEW.ResetPassword)}
            type="button"
            className="underline text-blue-300 hover:text-blue-200 transition-colors"
          >
            Click here to recover your password
          </button>
        </div>
      </div>
      <DialogFooter className="sm:justify-center">
        <Button type="submit" disabled={!formOk}>
          Login
        </Button>
      </DialogFooter>
    </form>
  );
}
