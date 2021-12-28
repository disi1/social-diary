import { Contact } from "../../lib/contact";
import { Log } from "../../lib/log";
import { useFormFields } from "../../lib/utils";

interface NewLogModalProps {
  contact: Contact;
  onSubmit: (log: Log) => void;
  onCancel: (displayModal: null) => void;
}

// define the shape of the NewPriority form's fields
type NewLogFieldProps = {
  note: string;
  timestamp: string;
};

// the value we'd like to initialize the NewPriority form with
const FORM_VALUES: NewLogFieldProps = {
  note: "",
  timestamp: ((new Date()).toISOString()),
};

export const NewLogForm: React.FC<NewLogModalProps> = ({
  contact,
  onSubmit,
  onCancel,
}) => {
  const [values, handleChange, resetFormFields] =
    useFormFields<NewLogFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const log = {
      timestamp: values.timestamp,
      note: values.note,
      contact_id: contact.id,
      user_id: contact.user_id,
    } as Log;

    onSubmit(log);

    resetFormFields();
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="block text-xl font-semibold text-gray-700 mb-5">
            {`Log chat with ${contact.name}`}
          </div>

          <div>
            <div className="mb-6">
              <label
                  htmlFor="timestamp"
                  className="block font-semibold text-gray-500 mb-2"
              >
                When did you chat?
              </label>
              <input
                  id="timestamp"
                  name="timestamp"
                  type="datetime-local"
                  className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
                  required
                  value={values.timestamp}
                  onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="note"
              className="block font-semibold text-gray-500 mb-2"
            >
              Any notes on your chat?
            </label>
            <input
              id="note"
              name="note"
              type="text"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Start typing a note... "
              required
              value={values.note}
              onChange={handleChange}
            />
          </div>

          {/*  New Contact form: Actions */}

          <div className="flex pt-4 gap-2 items-center">
            <button
              type="submit"
              className="flex-1 text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 rounded w-full text-center shadow"
            >
              Save Log
            </button>

            <div className="flex-1 text-right">
              <button
                className="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-gray-800 text-sm font-bold py-1 px-2 rounded"
                type="button"
                onClick={resetFormFields}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
