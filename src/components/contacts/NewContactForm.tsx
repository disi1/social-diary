import { useFormFields } from "../../lib/utils";
import { Category } from "../../lib/category";
import { Priority } from "../../lib/priority";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contact } from "../../lib/contact";

interface NewContactFormProps {
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
  categories: Category[] | undefined;
  priorities: Priority[] | undefined;
}

// define the shape of the NewContact form's fields
type NewContactFieldProps = {
  name: string;
  relationship: string;
  location: string;
  category: number;
  priority: number;
};

export const NewContactForm: React.FC<NewContactFormProps> = ({
  onSubmit,
  onCancel,
  categories,
  priorities,
}) => {
  // the values we'd like to initialize the NewContact form with
  const FORM_VALUES: NewContactFieldProps = {
    name: "",
    relationship: "",
    location: "",
    category: categories ? categories[0].id ?? 1 : 1,
    priority: priorities ? priorities[0].id ?? 1 : 1,
  };

  const [values, handleChange, resetFormFields] =
    useFormFields<NewContactFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const contact = {
      name: values.name,
      relationship: values.relationship,
      location: values.location,
      category_id: values.category,
      priority_id: values.priority,
    } as Contact;

    onSubmit(contact);

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
              type="text"
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
              type="text"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
              placeholder="Your relationship with this person"
              required
              value={values.relationship}
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
              type="text"
              className="h-12 px-4 py-2 bg-white text-gray-700 rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                htmlFor="category"
                className="block font-semibold text-gray-500 mb-2"
              >
                Category
              </label>

              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 hover:border-gray-400"
                  id="category"
                  name="category"
                  onChange={handleChange}
                  required
                  value={values.category}
                >
                  {categories?.map(({ id, name }) => (
                    <option key={id} value={id} label={name} />
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FontAwesomeIcon icon={faCaretDown} />
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
                  id="priority"
                  onChange={handleChange}
                  name={"priority"}
                  required
                  value={values.priority}
                >
                  {priorities?.map(({ id, name, frequency }) => (
                    <option key={id} value={id} label={name} />
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FontAwesomeIcon icon={faCaretDown} />
                </div>
              </div>
            </div>
          </div>

          {/*  New Contact form: Actions */}

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
