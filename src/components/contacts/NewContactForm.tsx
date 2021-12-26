import { useFormFields } from "../../lib/utils";

// define the shape of the NewCategory form's fields
type NewContactFieldProps = {
  name: string;
};

// the value we'd like to initialize the NewContact form with
const FORM_VALUES: NewContactFieldProps = {
  name: "",
};

export const NewContactForm = () => {
  const [values, handleChange, resetFormFields] =
    useFormFields<NewContactFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    resetFormFields();
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block font-semibold text-gray-500 mb-2"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Full name"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="relationship"
              className="block font-semibold text-gray-500 mb-2"
            >
              Relationship to person
            </label>
            <input
              id="relationship"
              name="relationship"
              type="name"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Your relationship with this person"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="location"
              className="block font-semibold text-gray-500 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="name"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              placeholder="Location"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>

            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        htmlFor="category"
                        className="block font-semibold text-gray-500 mb-2"
                    >
                        Category
                    </label>

                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 hover:border-gray-400"
                            id="category">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        htmlFor="priority"
                        className="block font-semibold text-gray-500 mb-2"
                    >
                        Priority
                    </label>

                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 hover:border-gray-400"
                            id="priority">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

          {/*  New Category form: Actions */}

          <div className="flex pt-4 gap-2 items-center">
            <button
              type="submit"
              className="flex-1 text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 rounded w-full text-center shadow"
            >
              Save Contact
            </button>

            <div className="flex-1 text-right">
              <button
                className="flex-shrink-0 border-transparent border-4 text-gray-500 hover:text-gray-800 text-sm font-bold py-1 px-2 rounded"
                type="button"
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
