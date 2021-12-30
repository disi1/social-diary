import { Category } from "../../lib/category";
import Link from "next/link";
import { ROUTE_CATEGORIES, ROUTE_PRIORITIES } from "../../config";

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return (
    <div className="card items-stretch p-5 gap-5 card-compact cursor-pointer bg-gray-100 rounded-lg dark:bg-gray-800 dark:highlight-white/5 shadow dark:shadow-white/20 hover:drop-shadow-md dark:hover:shadow-white/20 dark:hover:shadow-md">
      <h3 className="card-title self-center text-lg text-gray-900 dark:text-gray-200">
        {category.name}
      </h3>

      <div className="flex justify-around gap-3">
        <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600">
          Remove
        </button>
        <Link href={`${ROUTE_CATEGORIES}/${category.id}/edit`}>
          <button className="btn btn-sm btn-ghost capitalize text-sm px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-600">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};
