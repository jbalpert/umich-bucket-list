import { useEffect, useState } from "react";
import EventCard from "./eventcard/EventCard";
import { IEvent } from "../../types";
import { UseUser } from "../../contexts/UserContext";

interface Props {
  events: IEvent[];
  googleLogin: () => void;
}

const EventsGrid = ({ events, googleLogin }: Props) => {
  const data = events.map((event: IEvent) => (
    <EventCard key={event._id} event={event} googleLogin={googleLogin} />
  ));
  return <div className="mx-8"> {data} </div>;
};

export default EventsGrid;
