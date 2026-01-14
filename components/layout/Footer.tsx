import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="mb-4 h-px w-full bg-black"></div>
      <div className="flex justify-between">
        <p className="font-title text-[16px]/[100%] font-normal">
          ©
          <Logo />, 2025
        </p>
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
    </footer>
  );
};

export default Footer;
