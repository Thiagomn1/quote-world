import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's name. */
      name: string;
      email: string;
      picture: string;
      image: string;
      id: string;
    };
  }

  interface Profile {
    /** The user's name. */
    name: string;
    email: string;
    picture: string;
    id: string;
  }
}
