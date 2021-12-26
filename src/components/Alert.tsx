import { CustomAlert } from "../types/contact";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AlertProps {
  type: CustomAlert;
  text: string;
  onClose: (alertMessage: undefined) => void
}

export const Alert: React.FC<AlertProps> = ({ type, text, onClose }) => (
  <div className="m-6">
    {type === "success" ? (
      <div
        className="relative border-l-4 border-teal-500 text-teal-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Success</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-gray-300 hover:text-teal-700 cursor-pointer" onClick={() => onClose(undefined)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "information" ? (
      <div
        className="border-l-4 border-blue-500 text-blue-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Informational message</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-gray-300 hover:text-blue-700 cursor-pointer">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "warning" ? (
      <div
        className="border-l-4 border-orange-500 text-orange-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Warning</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-gray-300 hover:text-orange-700 cursor-pointer">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : (
      <div
        className="border-l-4 border-red-500 text-red-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Error</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-gray-300 hover:text-red-700 cursor-pointer">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    )}
  </div>
);
