// TODO LOGIN AUTHENTICATION + SIGNUP / LOGIN MODAL

import { UseUser } from "../../../contexts/UserContext";
import { UseGlobalState } from "../../../contexts/GlobalStateContext";

const Navbar: React.FC = () => {
  // send request to backend to get user info
  const [user, setUser] = UseUser();
  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  const { setIsSettingsOpen, googleLogin } = UseGlobalState();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-navbarBG p-6">
      <a href="/" className="flex items-center flex-shrink-0 text-umMaize mr-2 sm:mr-6">
        <img src="/umichbucketlogo.png" alt="logo" className="h-8 w-8 sm:h-12 sm:w-12 mr-2" />
        <span className="font-semibold text-xl sm:text-3xl tracking-tight">Umich Bucket List</span>
      </a>
      <div>
        {user ? (
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full mr-4 bg-black">
                <img
                  onClick={() => setIsSettingsOpen(true)}
                  src={user.profile_picture}
                  alt="avatar"
                  className="h-10 w-10 rounded-full cursor-pointer hover:opacity-80"
                />
              </div>
              <span className="text-white font-semibold hidden md:block">{user.first_name}</span>
            </div>
            <button
              onClick={() => logoutHandler()}
              className="bg-secondary hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full ml-4 hidden md:block">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center text-white text-sm md:text-base sm:font-bold">
            <button
              onClick={() => googleLogin()}
              className="bg-secondary hover:bg-gray-500 rounded-full py-2 px-2 sm:px-4 ">
              Login
            </button>
          </div>
        )}
      </div>
      {/* on click of profile display profile name a logout */}
    </nav>
  );
};

export default Navbar;
