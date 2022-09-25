import { useEffect, useState } from "react";
import EventCard from "./eventcard/EventCard";
import { Event } from "../../types/event.interface";

const EventsGrid = ({ events }: { events: Event[] }) => {
  const data = events.map((event: Event) => <EventCard key={event.id} event={event} />);
  return <div className="mx-8"> {data} </div>;
};

export default EventsGrid;
