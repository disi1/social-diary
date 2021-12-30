import {
  convertHours,
  frequencyUnitOptions,
  useFormFields,
} from "../../lib/utils";
import { Priority, PriorityUnit } from "../../lib/priority";

interface NewPriorityFormProps {
  onSubmit: (category: Priority) => void;
  onCancel: () => void;
  priority?: Priority;
}

// define the shape of the NewPriority form's fields
type NewPriorityFieldProps = {
  name: string;
  frequency: number;
  unit: PriorityUnit;
};

export const ManagePriorityForm: React.FC<NewPriorityFormProps> = ({
  priority,
  onSubmit,
  onCancel,
}) => {
  // the value we'd like to initialize the NewPriority form with
  const FORM_VALUES: NewPriorityFieldProps = {
    name: priority ? priority.name : "",
    frequency: priority ? convertHours(priority.frequency)?.value ?? 1 : 1,
    unit: priority ? convertHours(priority.frequency)?.unit ?? "hour" : "hour",
  };

  const [values, handleChange, resetFormFields] =
    useFormFields<NewPriorityFieldProps>(FORM_VALUES);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const unitHoursCorrespondent =
      frequencyUnitOptions.find((unitOption) => unitOption.unit === values.unit)
        ?.value ?? 1;

    const priority = {
      name: values.name,
      frequency: values.frequency * unitHoursCorrespondent,
    } as Priority;

    onSubmit(priority);

    resetFormFields();
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col justify-center items-center relative">
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSubmit}>
        <div className="border-teal p-8 border-t-12 bg-white dark:bg-slate-100 mb-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block font-semibold text-slate-500 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              className="input text-base text-slate-700 bg-white rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
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
                className="block font-semibold text-slate-500 mb-2"
              >
                Frequency
              </label>
              <input
                id="frequency"
                className="input text-base text-slate-700 bg-white rounded shadow-inner border-slate-300 w-full border hover:border-slate-400"
                name="frequency"
                type="number"
                max={1000}
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
                className="block font-semibold text-slate-500 mb-2"
              >
                Unit
              </label>

              <div className="relative">
                <select
                  className="select text-base font-normal w-full bg-white border border-slate-300 text-slate-700 rounded focus:bg-white hover:border-slate-400"
                  id="unit"
                  onChange={handleChange}
                  name="unit"
                  required
                  value={values.unit}
                >
                  {frequencyUnitOptions.map(({ unit, value }) => (
                    <option key={unit} value={unit} label={unit} />
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/*  New Priority form: Actions */}

          <div className="flex pt-6 gap-2 justify-around">
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
              {priority ? "Edit Priority" : "Save Priority"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
