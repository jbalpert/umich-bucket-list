import { IEvent } from "../../../types";
import { UseUser } from "../../../contexts/UserContext";
import { eventApi } from "../../../api/event";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseGlobalState } from "../../../contexts/GlobalStateContext";
interface Props {
  event: IEvent;
}

const EventCard = ({ event }: Props) => {
  const [user, setUser] = UseUser();
  const [joined, setJoined] = useState(false);
  const { googleLogin } = UseGlobalState();
  useEffect(() => {
    if (user && user.events) {
      const joined = user.events.includes(event._id);
      console.log(joined, event._id);
      setJoined(joined ? true : false);
    }
  }, [user, event]);

  useEffect(() => {
    if (!user) {
      setJoined(false);
    }
  }, [user]);

  const rsvpHandler = async () => {
    if (!user) {
      googleLogin();
    } else {
      await eventApi.rsvpEvent(event._id, user._id);
      setUser({ ...user, events: [...user.events, event._id] });
    }
  };

  const unRsvpHandler = async () => {
    console.log("unrsvp");
    if (!user) {
      googleLogin();
    } else {
      await eventApi.unrsvpEvent(event._id, user._id);
      setUser({ ...user, events: user.events.filter((e) => e !== event._id) });
    }
  };

  const startDate = new Date(event.start_date);
  const month = startDate.toLocaleString("default", { month: "short" });
  const day = startDate.getDate();
  const time = startDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  // if joined event, change button to "joined" and disable button
  return (
    <div className="flex flex-col w-full hover:shadow-2xl hover:scale-105 hover:ease-in duration-100 bg-slate-100 rounded shadow-lg my-8">
      <div className="flex flex-col w-full lg:flex-row">
        <Link to={`event/${event._id}`} className="flex flex-col w-full lg:flex-row">
          <div className="flex flex-row justify-around p-4 font-bold leading-none text-yellow-500 bg-navbarBG uppercase  rounded-l lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
            <div className="md:text-xl lg:text-2xl">{month}</div>
            <div className="md:text-xl lg:text-5xl">{day}</div>
            <div className="md:text-xl lg:text-xl text-center">{time}</div>
          </div>
          <div className="p-4 font-normal text-gray-800 lg:w-3/4 flex flex-col">
            <h1 className="mb-4 text-3xl text-center lg:text-left lg:text-4xl font-bold leading-none tracking-tight text-gray-800">
              {event.title}
            </h1>
            <p className="leading-normal text-sm ">{event.description}</p>
            <div className="flex flex-row items-center mt-1 text-gray-700 font-bold">
              {event.location}
            </div>
          </div>
        </Link>
        <div className="flex flex-row lg:pb-0 pb-4 justify-around font-bold leading-none text-gray-800 uppercase rounded lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
          <div
            onClick={joined ? unRsvpHandler : rsvpHandler}
            className={`flex flex-row items-center justify-center w-24 h-10 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 cursor-pointer ${
              joined
                ? "bg-red-500 hover:bg-red-600 active:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600"
            } border border-transparent rounded-lg focus:outline-none focus:shadow-outline-yellow`}>
            <span className="mr-2">{joined ? "-" : "+"}</span>
            <span>{joined ? "leave" : "join"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
