import { IEvent } from "../../../types";
import { UseUser } from "../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { UseGlobalState } from "../../../contexts/GlobalStateContext";
interface Props {
  event: IEvent;
  eventIndex: number;
}

const EventCard = ({ event, eventIndex }: Props) => {
  const [user] = UseUser();
  const { setEventModalId, setIsEventOpen, rsvpHandler, unrsvpHandler, setEvents } =
    UseGlobalState();

  const [rsvpLoading, setRsvpLoading] = useState<boolean>(false);
  const rsvpHandlerWrapper = async () => {
    setRsvpLoading(true);
    await rsvpHandler(event._id);
    setRsvpLoading(false);
  };

  const unrsvpHandlerWrapper = async () => {
    setRsvpLoading(true);
    await unrsvpHandler(event._id);
    setRsvpLoading(false);
  };

  useEffect(() => {
    if (!user) {
      // set joined to false if user is not logged in for event in setEvents
      setEvents((events) => {
        const newEvents = events.map((event) => {
          return { ...event, joined: false };
        });
        return newEvents;
      });
    } else {
      // set joined to true if user is logged in for event in setEvents
      setEvents((events) => {
        const newEvents = events.map((event) => {
          if (user.events.includes(event._id)) {
            return { ...event, joined: true };
          }
          return { ...event, joined: false };
        });
        return newEvents;
      });
    }
  }, [user, setEvents]);
  const eventModalOpenHandler = () => {
    setEventModalId(eventIndex);
    setIsEventOpen(true);
  };
  const { title, description, location, joined } = event;
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
        <div
          onClick={eventModalOpenHandler}
          className="flex flex-col w-full lg:flex-row cursor-pointer">
          <div className="flex flex-row justify-around p-4 font-bold leading-none text-yellow-500 bg-navbarBG uppercase  rounded-l lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
            <div className="md:text-xl lg:text-2xl">{month}</div>
            <div className="md:text-xl lg:text-5xl">{day}</div>
            <div className="md:text-xl lg:text-xl text-center">{time}</div>
          </div>
          <div className="p-4 font-normal text-gray-800 lg:w-3/4 flex flex-col">
            <h1 className="mb-4 text-3xl text-center lg:text-left lg:text-4xl font-bold leading-none tracking-tight text-gray-800">
              {title}
            </h1>
            <p className="leading-normal text-sm ">{description}</p>
            <div className="flex flex-row items-center mt-1 text-gray-700 font-bold">
              {location}
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:pb-0 pb-4 justify-around font-bold leading-none text-gray-800 rounded lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
          <button
            disabled={rsvpLoading}
            onClick={joined ? () => unrsvpHandlerWrapper() : () => rsvpHandlerWrapper()}
            className={`flex flex-row items-center justify-center w-24 h-10 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 cursor-pointer disabled:opacity-40 uppercase ${
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
  );
};

export default EventCard;
