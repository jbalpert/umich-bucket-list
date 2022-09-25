import { useState, useEffect } from "react";
import EventsGrid from "./EventsGrid";
import CreateEventModal from "./CreateEventModal";
import eventdata from "./eventdata.json";
import { Event } from "../../types/event.interface";
const EventHero = () => {
  const [events, setEvents] = useState<Event[]>(eventdata);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-appBG flex justify-center">
      <div className="max-w-5xl my-12">
        <EventsGrid events={events} />
      </div>
    </div>
  );
};

export default EventHero;
