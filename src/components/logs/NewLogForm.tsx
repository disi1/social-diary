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
  timestamp: new Date().toISOString(),
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
                className="input text-base bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
                required
                value={values.timestamp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="block font-semibold text-gray-500 mb-2">
              Any notes on your chat?
            </label>
            <textarea
              id="note"
              name="note"
              className="textarea text-base bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              placeholder="Start typing a note..."
              onChange={handleChange}
              required
              value={values.note}
            />
          </div>

          {/*  New Log form: Actions */}

          <div className="flex pt-6 gap-2 items-center">
            <button
              className="flex-1 btn btn-ghost font-bold text-sm text-gray-400 hover:text-gray-600 hover:bg-transparent rounded"
              type="button"
              onClick={resetFormFields}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 btn text-sm bg-gray-200 hover:text-white hover:bg-gray-500 border border-gray-200 hover:border-transparent text-gray-600 font-bold rounded w-full"
            >
              Save Log
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
