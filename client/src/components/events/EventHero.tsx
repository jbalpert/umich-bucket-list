import EventsGrid from "./EventsGrid";
import { UseUser } from "../../contexts/UserContext";
const EventHero: React.FC = () => {
  const [user] = UseUser();
  return (
    <div className="bg-appBG flex flex-col items-center justify-center">
      <h1 className="text-center mt-12 text-2xl sm:text-3xl text-slate-300 mx-8">
        It's my senior year at
        <span>
          <img className="inline w-6 h-6 sm:w-8 sm:h-8 mx-2" src="/umichlogo.png"></img>
        </span>
        so join me to complete my bucket list :)
      </h1>
      {user && (
        <a
          href="https://groupme.com/join_group/89877802/oEWi4pRB"
          target="_blank"
          className="text-center mt-8 text-lg sm:text-xl rounded bg-slate-300 px-4 py-2 mx-8 hover:bg-umMaize">
          Join the GroupMe!
        </a>
      )}
      <div className="max-w-5xl my-8">
        <EventsGrid />
      </div>
    </div>
  );
};

export default EventHero;
