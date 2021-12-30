import { Category } from "../../lib/category";
import { Log } from "../../lib/log";
import { Priority } from "../../lib/priority";
import { PriorityItem } from "../priorities/PriorityItem";
import { CategoryItem } from "../categories/CategoryItem";

interface ConfigurationProps {
  categories: Category[] | undefined;
  priorities: Priority[] | undefined;
}

export const Configuration: React.FC<ConfigurationProps> = ({
  categories,
  priorities,
}) => {
  return (
    <div className="h-full p-5 dark:bg-darkblue">
      <div className="flex justify-center">
        <div className="p-5 grow grid xl:grid-cols-2 lg:grid-cols-2 auto-rows-auto max-w-screen-xl grid-cols-1 gap-10 h-screen bg-slate-100 dark:bg-darkblue ">
          <div className="bg-white dark:bg-slate-900 gap-5 p-5">
            <h2 className="pb-5 text-gray-900 dark:text-white text-center font-semibold text-xl tracking-tight mb-2">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-5 auto-rows-auto grid-rows-none sm:grid-cols-[repeat(2,_minmax(200px,_1fr))] grid-cols-1">
              {categories?.map(
                (category) =>
                  category && (
                    <CategoryItem key={category.id} category={category} />
                  )
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5">
            <h2 className="pb-5 text-gray-900 dark:text-white text-center font-semibold text-xl tracking-tight mb-2">
              Priorities
            </h2>
            <div className="grid grid-cols-2 gap-5 auto-rows-auto grid-rows-none lg:grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:grid-cols-1 xs:grid-cols-1">
              {priorities?.map(
                (priority) =>
                  priority && (
                    <PriorityItem key={priority.id} priority={priority} />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};