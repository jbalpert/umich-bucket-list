import { UseUser } from "../../../contexts/UserContext";

export interface Props {
  isFirstLogin: boolean;
  setIsFirstLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsModal = ({ isFirstLogin, setSettingsOpen, setIsFirstLogin }: Props) => {
  const [user, setUser] = UseUser();
  const closeHandler = () => {
    setSettingsOpen(false);
    if (isFirstLogin) {
      setIsFirstLogin(false);
    }
  };

  const logoutAndClose = () => {
    setUser(null);
    closeHandler();
  };

  return (
    // settings buttons including public/private toggle, logout, setname, and set profile pic
    <div
      className="z-20 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-navbarBG">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-3xl text-bold leading-6 font-medium" id="modal-headline">
              {isFirstLogin ? "Welcome to Umich Bucket List!" : "Settings"}
            </h3>
            <div className="mt-2">
              <p className="text-lg">
                {isFirstLogin ? "Let's get started by setting up your profile." : ""}
              </p>
            </div>
            <div className="mt-2">
              <div className="flex flex-col">
                <div className="flex flex-col mt-4">
                  <div className="flex flex-row justify-center">
                    <div className="h-24 w-24 rounded-full bg-black">
                      <img
                        src={user?.profile_picture}
                        alt="logo"
                        className="h-24 w-24 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row mt-4 align-middle justify-between">
                      <label
                        htmlFor="first_name"
                        className="text-lg font-bold text-center self-center">
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="display_name"
                        id="display_name"
                        className="border-2 border-gray-400 p-2 rounded-md flex-1 mx-4"
                        defaultValue={user?.first_name + " " + user?.last_name}
                      />
                    </div>
                    <div className="flex flex-row mt-4 align-middle justify-between">
                      <label
                        htmlFor="first_name"
                        className="text-lg font-bold text-center self-center">
                        Cell Phone
                      </label>
                      <input
                        type="text"
                        name="display_name"
                        id="display_name"
                        className="border-2 border-gray-400 p-2 rounded-md flex-1 mr-4 ml-11"
                        defaultValue={"(123) 456-7890"}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-lg font-bold ">Publicity</span>
                    <div className="flex items-center ml-4">
                      <input
                        id="public"
                        name="publicity"
                        type="radio"
                        className="form-radio h-4 w-4 text-navbarBG focus:ring-navbarBG cursor-pointer"
                      />
                      <label htmlFor="public" className="ml-3 text-navbarBG font-semibold text-md">
                        Public
                      </label>
                    </div>
                    <div className="flex items-center ml-4">
                      <input
                        id="private"
                        name="publicity"
                        type="radio"
                        className="form-radio h-4 w-4 text-navbarBG focus:ring-navbarBG cursor-pointer"
                      />
                      <label htmlFor="private" className="ml-3 text-navbarBG font-semibold text-md">
                        Private
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-row mt-6 justify-center">
                    <button
                      onClick={logoutAndClose}
                      className="bg-accentnavbarBG text-white font-bold py-2 px-4 rounded hover:bg-navbarBG">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-accentnavbarBG px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-umMaize focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Save
        </button>
        <button
          onClick={() => closeHandler()}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-umMaize focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
