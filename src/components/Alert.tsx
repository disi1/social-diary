import { CustomAlert } from "../types/alert";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AlertProps {
  type: CustomAlert;
  text: string;
  onClose: (action: undefined) => void;
  onConfirm?: (confirmState: boolean) => void;
  onCancel?: (action: undefined) => void;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  text,
  onClose,
  onConfirm,
  onCancel,
}) => (
  <div className="bg-white w-fit ml-auto mt-5 mr-5">
    {type === "success" ? (
      <div
        className="relative border-l-4 border-teal-500 text-teal-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Success</strong>
        <p>{text}</p>
        <div
          className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-teal-700 cursor-pointer"
          onClick={() => onClose(undefined)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "information" ? (
      <div
        className="relative border-l-4 border-sky-500 text-sky-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Info message</strong>
        <p>{text}</p>
        <div
          className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-sky-700 cursor-pointer"
          onClick={() => onClose(undefined)}
        >
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
        <div
          className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-amber-700 cursor-pointer"
          onClick={() => onClose(undefined)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    ) : type === "confirm" ? (
      <div
        className="relative border-l-4 border-rose-500 text-rose-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Confirm</strong>
        <p className="my-5">{text}</p>
        <div
          className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-red-700 cursor-pointer"
          onClick={() => onClose(undefined)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {onCancel && onConfirm && (
          <div className="flex justify-around gap-3">
            <button
              className="btn btn-sm btn-ghost bg-transparent capitalize text-rose:500 hover:text-rose-700"
              onClick={() => onCancel(undefined)}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-ghost bg-transparent capitalize text-rose:500 hover:text-rose-700"
              onClick={() => onConfirm(true)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    ) : (
      <div
        className="relative border-l-4 border-rose-500 text-rose-700 p-4 shadow-md"
        role="alert"
      >
        <strong className="font-bold">Error</strong>
        <p>{text}</p>
        <div
          className="absolute top-0 right-0 px-4 py-3 text-slate-300 hover:text-red-700 cursor-pointer"
          onClick={() => onClose(undefined)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
    )}
  </div>
);
