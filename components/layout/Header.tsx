"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { usePlaylistsStore } from "@/stores/playlistsStore";

import Link from "next/link";
import Badge from "../ui/Badge";
import Logo from "../ui/Logo";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const playlists = usePlaylistsStore((state) => state.playlists);

  const onSignOutClick = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="flex items-center justify-between gap-6">
      <Link className="shrink-0 text-[24px]/[100%]" href="/">
        <Logo />
      </Link>

      <nav className="flex min-w-0 gap-6">
        <Link className="flex min-w-0 items-center gap-2" href="/playlists">
          <p className="text-16 truncate">Мои плейлисты</p>
          <Badge color="grey" text={playlists.length} />
        </Link>
        <Link className="flex min-w-0 items-center gap-2" href="/">
          <p className="text-16 truncate">Добавить новый</p>
          <Image
            className="h-6 w-6"
            width={24}
            height={24}
            src="/icons/add.svg"
            alt="icon-add"
          ></Image>
        </Link>
      </nav>

      {session ? (
        <a
          className="flex min-w-0 cursor-pointer items-center gap-2"
          onClick={onSignOutClick}
        >
          <p className="text-16 truncate">{session.user.name}</p>
          <Image
            className="h-6 w-6"
            width={24}
            height={24}
            src="/icons/sign-out.svg"
            alt="icon-add"
          ></Image>
        </a>
      ) : (
        <a className="text-16 cursor-pointer" onClick={signIn}>
          Войти
        </a>
      )}
    </header>
  );
};

export default Header;
