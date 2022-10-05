import EventCard from "./eventcard/EventCard";
import { IEvent } from "../../types";
import { UseGlobalState } from "../../contexts/GlobalStateContext";

const EventsGrid = () => {
  const { events } = UseGlobalState();
  const data = events.map((event: IEvent, index: number) => (
    <EventCard key={event._id} event={event} eventIndex={index} />
  ));
  return <div className="mx-8"> {data} </div>;
};

export default EventsGrid;
