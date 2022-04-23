import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import PostNotification from "../../../main/domain/notifications/Notification";
import NotificationCardContent from "./NotificationCardContent";

const CLOSING_DELAY_IN_MS = 5000;

interface Props {
  notification: PostNotification;
  onClose: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick: () => void;
}

export const NotificationCard = ({ notification, onClose, onClick }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, CLOSING_DELAY_IN_MS);
  }, [onClose]);

  return (
    <div className="fixed z-40 bottom-24 left-4">
      <div className="w-72 h-32 border bg-white shadow-lg hover:shadow-2xl pt-2 px-4 cursor-pointer" onClick={onClick}>
        <div className="flex">
          <h1 className="font-semibold text-md">New notification</h1>
          <button className="my-auto ml-auto" onClick={onClose}>
            <FiX className="text-gray-400" size={18} />
          </button>
        </div>
        <div className="flex mt-2">
          <NotificationCardContent notification={notification} />
        </div>
      </div>
    </div>
  );
};
