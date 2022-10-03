import { useState, useEffect } from "react";
import EventsGrid from "./EventsGrid";
import { eventApi } from "../../api/event";

interface Props {
  googleLogin: () => void;
}

const EventHero: React.FC<Props> = ({ googleLogin }: Props) => {
  // set events with axios call
  const [events, setEvents] = useState([]);
  useEffect(() => {
    eventApi
      .getCurrentEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        <EventsGrid googleLogin={googleLogin} events={events} />
      </div>
    </div>
  );
};

export default EventHero;
