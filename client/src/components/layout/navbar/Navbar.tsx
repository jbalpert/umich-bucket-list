// TODO LOGIN AUTHENTICATION + SIGNUP / LOGIN MODAL
const Navbar: React.FC = () => {
  const isLoggedin = false;
  const profile = {
    name: "John Doe",
    email: "jondoe@gmail.com",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-navbarBG p-6">
      <div className="flex items-center flex-shrink-0 text-umMaize mr-2 sm:mr-6">
        <img src="/umichbucketlogo.png" alt="logo" className="h-8 w-8 sm:h-12 sm:w-12 mr-2" />
        <span className="font-semibold text-xl sm:text-3xl tracking-tight">Umich Bucket List</span>
      </div>
      <div>
        {isLoggedin ? (
          <div className="flex items-center">
            <div className="flex items-center">
              <img src={profile.avatar} alt="avatar" className="h-10 w-10 rounded-full mr-2" />
              <span className="text-white font-semibold hidden md:block">{profile.name}</span>
            </div>
            <button className="bg-secondary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4 hidden md:block">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center text-white text-2xs sm:text-base sm:font-bold">
            <button className="bg-secondary hover:bg-gray-500 rounded-full py-2 px-2 sm:px-4 ">
              Login
            </button>
            <button className="bg-secondary hover:bg-gray-500 rounded-full hidden sm:block sm:py-2 sm:px-4 sm:ml-4">
              Sign Up
            </button>
          </div>
        )}
      </div>
      {/* on click of profile display profile name a logout */}
    </nav>
  );
};

export default Navbar;
