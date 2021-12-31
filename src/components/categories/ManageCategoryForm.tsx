import { useFormFields } from "../../lib/utils";
import { Category, CategoryOption, useCategory } from "../../lib/category";
import { useAuth } from "../../lib/auth";

interface NewCategoryFormProps {
  category?: Category;
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

export const ManageCategoryForm: React.FC<NewCategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
}) => {
  // the value we'd like to initialize the NewCategory form with
  const FORM_VALUES: NewCategoryFieldProps = {
    name: category ? category.name : "",
  };

  const { categories } = useCategory();
  const { user } = useAuth();

  const [values, handleChange, resetFormFields, manuallyHandleChange] =
    useFormFields<NewCategoryFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (user) {
      const category = {
        name: values.name,
        user_id: user?.id,
      };

      onSubmit(category);

      resetFormFields();
    }
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white dark:bg-slate-100 mb-6 rounded-lg shadow-lg">
          <div>
            <label
              htmlFor="name"
              className="block font-semibold text-slate-500 mb-6"
            >
              Choose one of the following
            </label>

            <div className="flex justify-around">
              {categoryOptions.map((option) => {
                const exists = categories?.some(
                  (category) => category.name === option.name
                );

                return (
                  <div
                    className={exists ? "tooltip" : ""}
                    {...(exists && {
                      "data-tip": "This category already exists.",
                    })}
                  >
                    <button
                      key={option.name}
                      className="btn btn-outline btn-accent btn-circle btn-lg text-sm normal-case disabled:text-slate-400"
                      type="button"
                      name="name"
                      onClick={() => manuallyHandleChange("name", option.name)}
                      disabled={exists}
                    >
                      {option.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6 mt-12">
            <label
              htmlFor="name"
              className="block font-semibold text-slate-500 mb-2"
            >
              Or create your own
            </label>
            <input
              id="name"
              className="input text-base text-slate-700 bg-white rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
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

          <div className="flex pt-6 justify-around">
            <button
              className="btn btn-ghost uppercase text-base px-4 py-2 leading-none rounded text-slate-400 hover:text-slate-600 hover:bg-transparent"
              type="button"
              onClick={resetFormFields}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn capitalize btn-ghost capitalize text-base px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-400 shadow"
            >
              {category ? "Edit Category" : "Save Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
