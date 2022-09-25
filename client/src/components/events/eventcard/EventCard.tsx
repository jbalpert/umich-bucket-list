import { Link } from "react-router-dom";
import { Event } from "../../../types/event.interface";

// simple card component that displays title on top, image in middle, description on bottom, join button on bottom right, and location on bottom left
const EventCard = ({ event }: { event: Event }) => {
  const hasJoined = false;
  // if joined event, change button to "joined" and disable button
  return (
    <div className="flex flex-col w-full hover:shadow-2xl hover:scale-105 hover:ease-in duration-100 bg-slate-100 rounded shadow-lg my-8">
      <div className="flex flex-col w-full lg:flex-row">
        <div className="flex flex-row justify-around p-4 font-bold leading-none text-yellow-500 bg-navbarBG uppercase  rounded-l lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
          <div className="md:text-xl lg:text-2xl">Jan</div>
          <div className="md:text-xl lg:text-5xl">5</div>
          <div className="md:text-xl lg:text-xl text-center">6:00PM</div>
        </div>
        <div className="p-4 font-normal text-gray-800 lg:w-3/4">
          <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-800">
            {event.title}
          </h1>
          <p className="leading-normal text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis tenetur eveniet dolorum a
            amet exercitationem? Tempore officiis nam animi. Fugiat asdf asdf asd fasd fsadf sa
            fasfas f suscipit, maxime qui nisi aliquam velit. Numquam asf dasfd as fasasd sdf asf
            asf sa hic possimus labore!
          </p>
          <div className="flex flex-row items-center mt-1 text-gray-700 font-bold">
            {event.location}
          </div>
        </div>
        <div className="flex flex-row lg:pb-0 pb-4 justify-around font-bold leading-none text-gray-800 uppercase rounded lg:flex-col lg:items-center lg:justify-center lg:w-1/4">
          <Link
            to={hasJoined ? `/events/${event.id}/unrsvp` : `/events/${event.id}/rsvp`}
            className={`flex flex-row items-center justify-center w-24 h-10 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 ${
              hasJoined
                ? "bg-red-500 hover:bg-red-600 active:bg-red-600"
                : "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600"
            } border border-transparent rounded-lg focus:outline-none focus:shadow-outline-yellow`}>
            <span className="mr-2">{hasJoined ? "-" : "+"}</span>
            <span>{hasJoined ? "leave" : "join"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
