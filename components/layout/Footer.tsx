import Logo from "../ui/Logo";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <hr className="text-black" />
      <div className="mt-4 flex justify-between">
        <div className="font-title flex text-[16px]/[100%]">
          © <Logo />, 2025
        </div>

        <p className="text-16">
          Created by 
          <a
            className="decoration-red underline"
            href="https://sibvan.dev/"
            target="_blank"
          >
            sibvan.dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
