import Logo from "../ui/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <hr className="text-black" />
      <div className="mt-4 flex justify-between">
        <div className="font-title flex text-[16px]/[100%]">
          © 
          <Logo />
          , 2026
        </div>

        <div className="flex gap-6">
          <Link className="text-16" href="/updates">
            Обновления
          </Link>
          <p className="text-16">
            <span className="hidden md:inline">Created by </span>
            <a
              className="decoration-red underline"
              href="https://sibvan.dev/"
              target="_blank"
            >
              sibvan.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
