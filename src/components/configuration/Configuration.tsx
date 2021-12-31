import { Category } from "../../lib/category";
import { Log } from "../../lib/log";
import { Priority } from "../../lib/priority";
import { PriorityItem } from "../priorities/PriorityItem";
import { CategoryItem } from "../categories/CategoryItem";
import { useState } from "react";
import { Alert } from "../Alert";

interface ConfigurationProps {
  categories: Category[] | undefined;
  priorities: Priority[] | undefined;
  onRemoveCategory: (category: Category | undefined) => void;
  onRemovePriority: (priority: Priority | undefined) => void;
}

export const Configuration: React.FC<ConfigurationProps> = ({
  categories,
  priorities,
  onRemoveCategory,
  onRemovePriority,
}) => {
  return (
    <div className="h-full p-5 dark:bg-darkblue flex justify-center">
      <div className="grow grid xl:grid-cols-2 lg:grid-cols-2 auto-rows-auto max-w-screen-xl grid-cols-1 gap-5 bg-slate-100 dark:bg-darkblue ">
        <div className="bg-white dark:bg-slate-900 gap-5 p-5 overflow-scroll">
          <h2 className="pb-5 text-gray-900 dark:text-white text-center font-semibold text-xl tracking-tight mb-2">
            Categories
          </h2>
          <div className="grid grid-cols-1 gap-5 auto-rows-auto grid-rows-none lg:grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:grid-cols-2">
            {categories?.map(
              (category) =>
                category && (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    onRemove={() => onRemoveCategory(category)}
                  />
                )
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 overflow-scroll">
          <h2 className="pb-5 text-gray-900 dark:text-white text-center font-semibold text-xl tracking-tight mb-2">
            Priorities
          </h2>
          <div className="grid grid-cols-1 gap-5 auto-rows-auto grid-rows-none lg:grid-cols-[repeat(2,_minmax(200px,_1fr))] sm:grid-cols-2">
            {priorities?.map(
              (priority) =>
                priority && (
                  <PriorityItem
                    key={priority.id}
                    priority={priority}
                    onRemove={() => onRemovePriority(priority)}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
