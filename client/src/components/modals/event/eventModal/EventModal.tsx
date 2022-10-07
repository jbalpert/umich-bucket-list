import { UseGlobalState } from "../../../../contexts/GlobalStateContext";
import Modal from "../../Modal";
import { userApi } from "../../../../api/user";
import { useEffect, useState } from "react";
import { IUser, IUserBubble } from "../../../../types";
import UserBubbleList from "./userBubble/UserBubbleList";
import { UseUser } from "../../../../contexts/UserContext";

const EventModal: React.FC = () => {
  const { setIsEventOpen, isEventOpen, unrsvpHandler, rsvpHandler, events, eventModalId } =
    UseGlobalState();
  // Get all the users based on event rsvps
  const [user] = UseUser();
  const { start_date, end_date, description, title, location, image_url, joined, _id, rsvps } =
    events[eventModalId];
  const [userBubbles, setUserBubbles] = useState<IUserBubble[]>([]);
  const [rsvpLoading, setRsvpLoading] = useState<boolean>(false);
  const unrvspAndChangeBubble = async () => {
    setRsvpLoading(true);
    await unrsvpHandler(_id);
    if (user) {
      setUserBubbles(userBubbles.filter((userProfile) => userProfile._id !== user._id));
    }
    setRsvpLoading(false);
  };

  const rvspAndChangeBubble = async () => {
    setRsvpLoading(true);
    await rsvpHandler(_id);
    if (user) {
      setUserBubbles([...userBubbles, user]);
    }
    setRsvpLoading(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      // if there are no rsvps, then don't make the api call
      if (rsvps.length === 0) return;
      // if the bubble length is the rsvp length then don't make the api call
      if (userBubbles.length === rsvps.length) return;
      if (localStorage.getItem(`userBubbles-${_id}`)) {
        const bubbles: IUser[] = JSON.parse(localStorage.getItem(`userBubbles-${_id}`) || "[]");
        if (bubbles.length === rsvps.length) {
          setUserBubbles(bubbles);
          return;
        }
      }
      // cache the users in local storage
      const res = await userApi.getUsersByEventId(_id);
      // turn res.data into User

      setUserBubbles(res.data);
      localStorage.setItem(
        `userBubbles-${_id}`,
        JSON.stringify(
          (res.data as IUser[]).map((user) => {
            return {
              _id: user._id,
              username: user.username,
              profile_picture: user.profile_picture,
              is_public: user.is_public,
            };
          })
        )
      );
    };
    getUsers();
  }, [_id, rsvps, userBubbles.length]);

  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: `${window.location.href}?event=${_id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported");
    }
  };

  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const startTime = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const endTime = endDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Modal isOpen={isEventOpen} setIsOpen={setIsEventOpen}>
      <div className="">
        <div className="flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="flex items-center w-full">
            <div className="w-full">
              <div className="flex flex-col px-2 py-3 mx-3">
                <h1 className="text-center font-bold text-2xl text-gray-700">{title}</h1>
              </div>
              <div className="border-b border-gray-100"></div>
              <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2 flex justify-center items-center">
                <img className="rounded max-h-80 shadow-lg" alt={title} src={image_url} />
              </div>
              <div className="flex flex-col justify-between mx-3 px-2 mb-4">
                <div className="flex flex-row items-center">
                  <h3 className="text-sm font-semibold text-blue-700">{location}</h3>
                </div>
                <div className="flex flex-row ">
                  <h3 className="text-sm font-semibold text-gray-600">{startTime}</h3>
                  <h3 className="text-sm font-semibold text-gray-600 ml-2">-</h3>
                  <h3 className="text-sm font-semibold text-gray-600 ml-2">{endTime}</h3>
                </div>
              </div>
              <div className="text-gray-500 font-thin text-sm mb-6 mx-3 px-2">{description}</div>
              <div className="flex justify-start mb-4 border-t border-gray-100">
                <div className="flex w-full mt-1 pt-2 pl-5">
                  <span
                    onClick={shareHandler}
                    className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="14px"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </span>
                  <UserBubbleList users={userBubbles} />
                </div>
                <div className="flex justify-end w-full mt-1 pt-2 lg:pr-5 pr-3">
                  <button
                    disabled={rsvpLoading}
                    onClick={joined ? () => unrvspAndChangeBubble() : () => rvspAndChangeBubble()}
                    className={`flex flex-row items-center justify-center w-18 h-7.5 md:w-24 md:h-10 px-4 py-2 text-xs md:text-sm font-medium leading-5 text-white transition-colors duration-150 cursor-pointer uppercase ${
                      joined
                        ? "bg-red-500 hover:bg-red-600 active:bg-red-600"
                        : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600"
                    } border border-transparent rounded-lg focus:outline-none focus:shadow-outline-yellow`}>
                    <span className="mr-2">{joined ? "-" : "+"}</span>
                    <span>{joined ? "leave" : "join"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
