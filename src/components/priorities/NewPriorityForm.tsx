import { useFormFields } from "../../lib/utils";
import { Priority, PriorityUnit, PriorityUnitOption } from "../../lib/priority";

interface NewPriorityFormProps {
  onSubmit: (category: Priority) => void;
  onCancel: () => void;
}

// define the shape of the NewPriority form's fields
type NewPriorityFieldProps = {
  name: string;
  frequency: number;
  unit: PriorityUnit;
};

// the value we'd like to initialize the NewPriority form with
const FORM_VALUES: NewPriorityFieldProps = {
  name: "",
  frequency: 1,
  unit: 'hour',
};

export const NewPriorityForm: React.FC<NewPriorityFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const frequencyUnitOptions: PriorityUnitOption<PriorityUnit>[] = [
    {
      unit: "hour",
      value: 1,
    },
    {
      unit: "day",
      value: 24,
    },
    {
      unit: "week",
      value: 168,
    },
    {
      unit: "month",
      value: 730,
    },
    {
      unit: "year",
      value: 8760,
    },
  ];

  const [values, handleChange, resetFormFields] =
    useFormFields<NewPriorityFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const priority = {
      name: values.name,
      frequency: values.frequency * (frequencyUnitOptions.find(unitOption => unitOption.unit === values.unit)?.value ?? 1)
    } as Priority

    onSubmit(priority);

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
              Name
            </label>
            <input
              id="name"
              className="h-12 px-4 py-2 text-gray-700 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
              name="name"
              type="text"
              maxLength={80}
              placeholder="Enter the priority name"
              required
              pattern="\S(.*\S)?"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="frequency"
                className="block font-semibold text-gray-500 mb-2"
              >
                Frequency
              </label>
              <input
                id="frequency"
                className="h-12 px-4 py-2 text-gray-700 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
                name="frequency"
                type="number"
                max={10000}
                min={1}
                placeholder="Enter the frequency"
                required
                value={values.frequency}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                htmlFor="unit"
                className="block font-semibold text-gray-500 mb-2"
              >
                Unit
              </label>

              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 hover:border-gray-400"
                  id="unit"
                  onChange={handleChange}
                  name="unit"
                >
                  {frequencyUnitOptions.map(({unit, value}) => (
                    <option
                      key={unit}
                      value={value}
                      label={unit}
                    />
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/*  New Priority form: Actions */}

          <div className="flex pt-4 gap-2 items-center">
            <button
              type="submit"
              className="flex-1 text-sm px-4 py-2 bg-gray-500 hover:bg-gray-600 border border-gray-500 hover:border-transparent text-white font-bold py-3 rounded w-full text-center shadow"
            >
              Save Priority
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
