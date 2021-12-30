import { CustomAlert } from "../types/alert";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AlertProps {
  type: CustomAlert;
  text: string;
  onClose: (alertMessage: undefined) => void
}

export const Alert: React.FC<AlertProps> = ({ type, text, onClose }) => (
  <div className="bg-white w-fit ml-auto">
    {type === "success" ? (
      <div
        className="relative border-l-4 border-teal-500 text-teal-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Success</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-teal-700 cursor-pointer" onClick={() => onClose(undefined)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "information" ? (
      <div
        className="relative border-l-4 border-sky-500 text-sky-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Informational message</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-sky-700 cursor-pointer" onClick={() => onClose(undefined)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "warning" ? (
      <div
        className="relative border-l-4 border-amber-500 text-amber-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Warning</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-amber-700 cursor-pointer" onClick={() => onClose(undefined)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : (
      <div
        className="relative border-l-4 border-rose-500 text-rose-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Error</strong>
        <p>{text}</p>
        <div className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-red-700 cursor-pointer" onClick={() => onClose(undefined)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    )}
  </div>
);
