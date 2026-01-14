import Logo from "../ui/Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="mb-4 h-px w-full bg-black"></div>
      <div className="flex justify-between">
        <p className="font-title flex flex-col text-[16px]/[100%] font-normal md:flex-row">
          © 
          <Logo />
          <span className="hidden md:block">, </span>
          2025
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Link className="text-16" href="/updates">
            Обновления
          </Link>
          <p className="text-16">
            Created by 
            <a
              className="decoration-red underline"
              target="_blank"
              href="https://sibvan.dev/"
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
