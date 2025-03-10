import { client } from "@/api/client";
import { useQuery } from "@tanstack/react-query";

const GET_SESSION_URL = "/auth/getSession"; // GET

export type AuthSession = {
  username: string;
  log: number;
  freelog: number;
};

export function useAuthSession() {
  return useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      const res = await client
        .get<string | AuthSession>(GET_SESSION_URL, {
          withCredentials: true,
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          return null;
        });

      if (!res || res.data === "not_logged_in")
        return null;

      if (typeof res.data === "string") {
        console.error(
          "There was an error parsing the session response from the server... data:",
          res.data,
        );
        return null;
      }

      return res.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: false,
    initialData: null,
  });
}
