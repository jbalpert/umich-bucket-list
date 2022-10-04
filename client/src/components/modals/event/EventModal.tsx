import { IEvent } from "../../../types";
import Modal from "../../modals/Modal";
interface Props {
  event: IEvent;
  setEventOpen: React.Dispatch<React.SetStateAction<boolean>>;
  eventOpen: boolean;
}

const EventModal: React.FC<Props> = ({ event, setEventOpen, eventOpen }: Props) => {
  return (
    <Modal isOpen={eventOpen} setIsOpen={setEventOpen}>
      <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 " role="alert">
        <p className="text-lg md:text-3xl">{event.title}</p>
      </div>
    </Modal>
  );
};

export default EventModal;
