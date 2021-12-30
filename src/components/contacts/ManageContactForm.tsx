import { useFormFields } from "../../lib/utils";
import { Category } from "../../lib/category";
import { Priority } from "../../lib/priority";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contact } from "../../lib/contact";

interface NewContactFormProps {
  onSubmit: (contact: Contact) => void;
  onCancel: () => void;
  contact?: Contact;
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

export const ManageContactForm: React.FC<NewContactFormProps> = ({
  onSubmit,
  onCancel,
  contact,
  categories,
  priorities,
}) => {
  // the values we'd like to initialize the NewContact form with
  const FORM_VALUES: NewContactFieldProps = {
    name: contact ? contact.name : "",
    relationship: contact ? contact.relationship : "",
    location: contact ? contact.location : "",
    category:
      categories && categories.length > 0
        ? contact
          ? contact.category_id
          : categories[0].id ?? 1
        : 1,
    priority:
      priorities && priorities.length > 0
        ? contact
          ? contact.priority_id
          : priorities[0].id ?? 1
        : 1,
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
    <div className="h-full bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white dark:bg-slate-100 mb-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block font-semibold text-slate-500 mb-2"
            >
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="input text-base bg-white text-slate-700 rounded shadow-inner border-slate-300 w-full border  hover:border-slate-400"
              placeholder="Full name"
              required
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="relationship"
              className="block font-semibold text-slate-500 mb-2"
            >
              Relationship to person
            </label>
            <input
              id="relationship"
              name="relationship"
              type="text"
              className="input text-base bg-white text-slate-700 rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
              placeholder="Your relationship with this person"
              required
              value={values.relationship}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="location"
              className="block font-semibold text-slate-500 mb-2"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              className="input text-base bg-white text-slate-700 rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                htmlFor="category"
                className="block font-semibold text-slate-500 mb-2"
              >
                Category
              </label>

              <div className="relative">
                <select
                  className="select text-base font-normal w-full max-w-xs bg-white border border-slate-300 text-slate-700 rounded focus:bg-white hover:border-slate-400"
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
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="priority"
                className="block font-semibold text-slate-500 mb-2"
              >
                Priority
              </label>

              <div className="relative">
                <select
                  className="select text-base font-normal w-full max-w-xs bg-white border border-slate-300 text-slate-700 rounded focus:bg-white hover:border-slate-400"
                  id="priority"
                  onChange={handleChange}
                  name="priority"
                  required
                  value={values.priority}
                >
                  {priorities?.map(({ id, name, frequency }) => (
                    <option key={id} value={id} label={name} />
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/*  Manage Contact form: Actions */}

          <div className="flex pt-6 justify-around">
            <button
              className="btn btn-ghost text-base uppercase px-4 py-2 leading-none rounded text-slate-400 hover:text-slate-600 hover:bg-transparent"
              type="button"
              onClick={resetFormFields}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn capitalize btn-ghost capitalize text-base px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-400 shadow"
            >
              {contact ? "Edit Contact" : "Save Contact"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
