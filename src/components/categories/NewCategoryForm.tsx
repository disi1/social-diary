import { useFormFields } from "../../lib/utils";
import { useRef } from "react";
import { Category, CategoryOption, useCategory } from "../../lib/category";
import { event } from "next/dist/build/output/log";

interface NewCategoryFormProps {
  onSubmit: (category: Category) => void;
  onCancel: () => void;
}

const categoryOptions: Record<string, CategoryOption>[] = [
  { name: "Family" },
  { name: "Friends" },
  { name: "Work" },
];

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
  const { categories } = useCategory();

  const [values, handleChange, resetFormFields, manuallyHandleChange] =
    useFormFields<NewCategoryFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const category = {
      name: values.name,
    };

    onSubmit(category);

    resetFormFields();
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-gray-500 mb-6"
            >
              Choose one of the following
            </label>

            <div className="flex justify-around">
              {categoryOptions.map((option) => (
                <button
                  key={option.name}
                  className="btn btn-outline btn-accent btn-circle btn-lg text-sm normal-case disabled:text-gray-400"
                  type="button"
                  name="name"
                  onClick={() => manuallyHandleChange("name", option.name)}
                  disabled={categories?.some(
                    (category) => category.name === option.name
                  )}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 mt-12">
            <label
              htmlFor="name"
              className="block font-semibold text-gray-500 mb-2"
            >
              Or create your own
            </label>
            <input
              id="name"
              className="input text-base text-gray-700 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              name="name"
              type="text"
              maxLength={80}
              placeholder="Enter the category name"
              required
              pattern="\S(.*\S)?"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          {/*  New Category form: Actions */}

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
              Save Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
