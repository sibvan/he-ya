"use client";

import { authClient, signIn } from "@/lib/auth-client";

const Header = () => {
  const { data: session } = authClient.useSession();

  return (
    <header>
      {session ? (
        <p onClick={() => authClient.signOut()}>{session.user.name}</p>
      ) : (
        <p onClick={signIn}>Войти</p>
      )}
    </header>
  );
};

export default Header;
