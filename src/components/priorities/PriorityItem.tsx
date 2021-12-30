import { Priority } from "../../lib/priority";
import { convertHours } from "../../lib/utils";
import Link from "next/link";
import { ROUTE_PRIORITIES } from "../../config";

interface PriorityItemProps {
  priority: Priority;
}

export const PriorityItem: React.FC<PriorityItemProps> = ({ priority }) => {
  const convertedHours = convertHours(priority.frequency);

  return (
    <div className="card items-stretch p-5 card-compact bg-gray-100 rounded-lg dark:bg-gray-800 dark:highlight-white/5 shadow dark:shadow-white/20">
      <h3 className="card-title self-center text-lg text-gray-900 dark:text-gray-200">
        {priority.name}
      </h3>
      {convertedHours && (
        <p className="self-center text-sm text-gray-900 dark:text-gray-200">
          {`${convertedHours.value} ${
            convertedHours.value > 1
              ? convertedHours.unit + "s"
              : convertedHours.unit
          }`}
        </p>
      )}
      <div className="flex justify-around gap-3 mt-5">
        <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600">
          Remove
        </button>
        <Link href={`${ROUTE_PRIORITIES}/${priority.id}/edit`}>
          <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-600">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};
