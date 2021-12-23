import { CustomAlert } from "../types/contact";
import {
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AlertProps {
  type: CustomAlert;
  text: string;
}

export const Alert: React.FC<AlertProps> = ({ type, text }) => (
  <div className="m-6">
    {type === "success" ? (
      <div
        className="border-l-4 border-teal-500 text-teal-700 p-4 shadow-md"
        role="alert"
      >
        <p className="font-bold">Success</p>
        <p>{text}</p>
      </div>
    ) : type === "information" ? (
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 shadow-md"
        role="alert"
      >
        <p className="font-bold">Informational message</p>
        <p>{text}</p>
      </div>
    ) : type === "warning" ? (
      <div
        className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 shadow-md"
        role="alert"
      >
        <p className="font-bold">Warning</p>
        <p>{text}</p>
      </div>
    ) : (
      <div
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md"
        role="alert"
      >
        <p className="font-bold">Success</p>
        <p>{text}</p>
      </div>
    )}
  </div>
);
