import { UseUser } from "../../../contexts/UserContext";
import { userApi } from "../../../api/user";
import { useState } from "react";
import Modal from "../Modal";
import { UseGlobalState } from "../../../contexts/GlobalStateContext";

interface Settings {
  username?: string;
  phone?: string;
  is_public?: boolean;
}

const SettingsModal: React.FC = () => {
  const [user, setUser] = UseUser();
  const [saved, setSaved] = useState<boolean>(false);
  const { isSettingsOpen, setIsSettingsOpen, isFirstLogin, setIsFirstLogin } = UseGlobalState();
  const closeHandler = () => {
    setIsSettingsOpen(false);
    if (isFirstLogin) {
      setIsFirstLogin(false);
    }
  };

  const logoutAndClose = () => {
    setUser(null);
    closeHandler();
  };

  const [userSettings, setUserSettings] = useState<Settings>({
    username: user?.username,
    phone: user?.phone,
    is_public: user?.is_public,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings({ ...userSettings, [e.target.name]: e.target.value });
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings({
      ...userSettings,
      is_public: e.target.name === "is_public" ? true : false,
    });
  };

  const submitHandler = async () => {
    if (user) {
      const { data } = await userApi.updateUser(user._id, userSettings);
      setUser(data);
      setSaved(true);

      // refresh local storage on changes
      localStorage.clear();

      setTimeout(() => {
        setSaved(false);
        closeHandler();
      }, 1000);
    }
  };

  return (
    // settings buttons including public/private toggle, logout, setname, and set profile pic
    <Modal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen}>
      <div
        className="z-20 inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <div className="bg-white px-2 py-3 mx-3 rounded sm:p-6 sm:pb-4 text-navbarBG">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-2xl sm:text-3xl text-bold leading-6 font-medium"
                id="modal-headline">
                {isFirstLogin ? "Welcome to Umich Bucket List!" : "Settings"}
              </h3>
              <div className="mt-2">
                <p className="text-md sm:text-lg">
                  {isFirstLogin ? "Let's get started by setting up your profile." : ""}
                </p>
              </div>
              <div className="sm:mt-2">
                <div className="flex flex-col">
                  <div className="flex flex-col mt-4">
                    {saved && (
                      <div className="flex flex-row justify-center">
                        <div className="flex flex-col">
                          <h2 className="text-2xl text-bold bg-success px-4 py-2 rounded mb-2">
                            Successfully Updated Profile!
                          </h2>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-row justify-center">
                      <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-black">
                        <img
                          src={user?.profile_picture}
                          alt="logo"
                          className="h-16 w-16 sm:h-24 sm:w-24 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-md sm:text-lg font-bold">
                      <div className="flex sm:flex-row flex-col mt-4 sm:align-middle sm:justify-between">
                        <label
                          htmlFor="first_name"
                          className="text-left sm:text-center sm:self-center">
                          Display Name
                        </label>
                        <input
                          onChange={changeHandler}
                          value={userSettings.username}
                          type="text"
                          name="username"
                          id="display_name"
                          className="border-2 font-normal border-gray-400 p-2 rounded-md flex-1 sm:mx-4"
                        />
                      </div>
                      <div className="flex sm:flex-row flex-col mt-4 sm:align-middle sm:justify-between">
                        <label
                          htmlFor="first_name"
                          className="text-left sm:text-center sm:self-center">
                          Cell Phone
                        </label>
                        <input
                          onChange={changeHandler}
                          value={userSettings.phone}
                          type="text"
                          name="phone"
                          id="phone_number"
                          className="border-2 border-gray-400 font-normal p-2 rounded-md sm:flex-1 sm:mr-4 sm:ml-11"
                        />
                      </div>
                    </div>
                    <div className="flex items-center mt-4 font-bold">
                      <span>Publicity</span>
                      <div className="flex items-center ml-4">
                        <input
                          onChange={checkHandler}
                          checked={userSettings.is_public}
                          id="public"
                          name="is_public"
                          type="radio"
                          className="form-radio h-4 w-4 text-navbarBG focus:ring-navbarBG cursor-pointer"
                        />
                        <label
                          htmlFor="public"
                          className="ml-3 text-navbarBG font-semibold text-md">
                          Public
                        </label>
                      </div>
                      <div className="flex items-center ml-4">
                        <input
                          onChange={checkHandler}
                          checked={!userSettings.is_public}
                          id="private"
                          name="is_private"
                          type="radio"
                          className="form-radio h-4 w-4 text-navbarBG focus:ring-navbarBG cursor-pointer"
                        />
                        <label
                          htmlFor="private"
                          className="ml-3 text-navbarBG font-semibold text-md">
                          Private
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-row mt-2 sm:mt-6 justify-center">
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
        <div className="bg-accentnavbarBG rounded-b px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => submitHandler()}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-umMaize focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Save
          </button>
          <button
            onClick={() => closeHandler()}
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-umMaize focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
