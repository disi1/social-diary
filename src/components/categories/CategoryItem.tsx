import { Category } from "../../lib/category";
import Link from "next/link";
import { ROUTE_CATEGORIES } from "../../config";

interface CategoryItemProps {
  category: Category;
  onRemove: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onRemove }) => {
  return (
    <div className="card items-stretch p-5 gap-5 card-compact bg-gray-100 rounded-lg dark:bg-gray-800 dark:highlight-white/5 shadow dark:shadow-white/20">
      <h3 className="card-title self-center text-lg text-gray-900 dark:text-gray-200">
        {category.name}
      </h3>

      <div className="flex justify-around gap-3">
        <button
          className="btn btn-sm btn-ghost flex-1 max-w-[100px] capitalize text-sm px-4 py-2 leading-none border rounded text-slate-400 border-slate-400 hover:border-transparent hover:text-white hover:bg-slate-600"
          onClick={onRemove}
        >
          Remove
        </button>
        <Link href={`${ROUTE_CATEGORIES}/${category.id}/edit`}>
          <button className="btn btn-sm btn-ghost flex-1 max-w-[100px] capitalize text-sm px-4 py-2 leading-none border rounded text-sky-400 border-sky-400 hover:border-transparent hover:text-white hover:bg-sky-600">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};
