import { useFormFields } from "../../lib/utils";
import { useRef } from "react";
import { Category } from "../../types/contact";

interface NewCategoryFormProps {
  onSubmit: (category: Category) => void;
  onCancel: () => void;
}

// define the shape of the NewCategory form's fields
type NewCategoryFieldProps = {
  name: string;
};

// the value we'd like to initialize the NewCategory form with
const FORM_VALUES: NewCategoryFieldProps = {
  name: "",
};

export const NewCategoryForm: React.FC<NewCategoryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [values, handleChange, resetFormFields] =
    useFormFields<NewCategoryFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const category: Category = {
      name: nameInputRef.current?.value ?? "",
    };

    onSubmit(category);

    resetFormFields();
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-semibold text-gray-500 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              className="h-12 px-4 py-2 text-gray-700 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              name="name"
              type="text"
              maxLength={80}
              placeholder="Enter the category name"
              required
              pattern="\S(.*\S)?"
              value={values.name}
              onChange={handleChange}
              ref={nameInputRef}
            />
          </div>

          {/*  New Category form: Actions */}

          <div className="flex pt-4 gap-2 items-center">
            <button
              type="submit"
              className="flex-1 text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 rounded w-full text-center shadow"
            >
              Save Category
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
