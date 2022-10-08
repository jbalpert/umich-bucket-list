import React from "react";
const Footer: React.FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-navbarBG px-6 py-3 ">
      <a
        href="https://jonathanalpert.netlify.app/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center flex-shrink-0 text-umMaize mr-2 sm:mr-14 hover:opacity-70">
        <img src="/alpcode.png" alt="logo" className="h-8 w-8 mr-2" />
      </a>
      <div className="hidden md:flex items-center text-white text-sm md:text-base sm:font-bold">
        <span className="text-umMaize font-semibold md:block">
          © umichbucketlist {new Date().getFullYear()}
        </span>
      </div>
      <div className="flex items-center text-white text-sm md:text-base sm:font-bold">
        <a
          href="https://github.com/jbalpert/umich-bucket-list"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-300 mx-2 hover:opacity-70 rounded-full">
          <img src="/github.png" alt="github" className="h-8 w-8" />
        </a>
        <a
          href="mailto:jbalpert@umich.edu"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-300 mx-2 hover:opacity-70 rounded-full">
          <img src="/email.png" alt="email" className="h-8 w-8" />
        </a>
      </div>
    </nav>
  );
};

export default Footer;
