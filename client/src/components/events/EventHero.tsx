import { useState, useEffect } from "react";
import EventsGrid from "./EventsGrid";
import CreateEventModal from "./CreateEventModal";
import eventdata from "./eventdata.json";
import { Event } from "../../types/event.interface";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
const EventHero = () => {
  const dispatch = useAppDispatch();
  dispatch({ type: "event/setEvents", payload: eventdata });
  const events = useAppSelector((state) => state.event);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-appBG flex flex-col items-center justify-center">
      <h1 className="text-center mt-12 text-xl sm:text-3xl text-slate-300 mx-8">
        It's my senior year at
        <span>
          <img className="inline w-6 h-6 sm:w-8 sm:h-8 mx-2" src="/umichlogo.png"></img>
        </span>
        so join me to complete my bucket list :)
      </h1>
      <div className="max-w-5xl my-12">
        <EventsGrid events={events} />
      </div>
    </div>
  );
};

export default EventHero;
