import { Priority } from "../../lib/priority";
import {frequencyUnitOptions, hoursToString} from "../../lib/utils";

interface PriorityItemProps {
  priority: Priority;
}

export const PriorityItem: React.FC<PriorityItemProps> = ({ priority }) => {
  return (
    <div className="card items-stretch p-5 card-compact cursor-pointer bg-gray-100 rounded-lg dark:bg-gray-800 dark:highlight-white/5 shadow dark:shadow-white/20 hover:drop-shadow-md dark:hover:shadow-white/20 dark:hover:shadow-md">
      <h3 className="card-title self-center text-lg text-gray-900 dark:text-gray-200">
        {priority.name}
      </h3>
      <p className="self-center text-sm text-gray-900 dark:text-gray-200">
        {hoursToString(priority.frequency)}
      </p>

      <div className="flex justify-around gap-3 mt-5">
        <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600">
          Remove
        </button>
        <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-600">
          Edit
        </button>
      </div>
    </div>
  );
};
