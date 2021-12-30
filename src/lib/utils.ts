import { useState } from "react";
import { PriorityUnit, PriorityUnitOption } from "./priority";

export function useFormFields<T>(
  initialValues: T
): [
  T,
  (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void,
  () => void,
  (name: string, value: string) => void
] {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    event.persist();
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => setValues(initialValues);

  const manuallyHandleChange = (name: string, value: string) =>
    setValues({ ...values, [name]: value });

  return [values, handleChange, resetForm, manuallyHandleChange];
}

export const getNoOfHoursSinceDate = (date: Date) => {
  return (new Date().valueOf() - new Date(date).valueOf()) / 1000 / 60 / 60;
};

export const frequencyUnitOptions: PriorityUnitOption<PriorityUnit>[] = [
  {
    unit: "year",
    value: 8760,
  },
  {
    unit: "month",
    value: 730,
  },
  {
    unit: "week",
    value: 168,
  },
  {
    unit: "day",
    value: 24,
  },
  {
    unit: "hour",
    value: 1,
  },
];

export const convertHours = (
  hours: number
): PriorityUnitOption<PriorityUnit> | undefined => {
  const exactOption = frequencyUnitOptions.find(
    (option) => hours % option.value === 0
  );

  if (exactOption) {
    return {
      unit: exactOption.unit,
      value: hours / exactOption.value,
    } as PriorityUnitOption<PriorityUnit>;
  }

  return undefined;
};

export const getUpdatedItems = (oldItems: any[], newItem: any) => {
  const exists = oldItems.find((item: any) => item.id === newItem.id);

  let newItems;

  if (exists) {
    const oldContactIndex = oldItems.findIndex(
      (item: any) => item.id === newItem.id
    );
    oldItems[oldContactIndex] = newItem;
    newItems = oldItems;
  } else {
    newItems = oldItems ? [...oldItems, newItem] : [newItem];
  }

  return newItems;
};
