import { useEffect, useState } from "react";
import EventCard from "./eventcard/EventCard";
import { IEvent } from "../../types";

const EventsGrid = ({ events }: { events: IEvent[] }) => {
  const data = events.map((event: IEvent) => <EventCard key={event._id} event={event} />);
  return <div className="mx-8"> {data} </div>;
};

export default EventsGrid;
