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

export const hoursToString = (hours: number) => {
  const result: string[] = [];

  frequencyUnitOptions.forEach((unit) => {
    var p = Math.floor(hours / unit.value);
    if (p == 1) result.push(" " + p + " " + unit.unit);
    if (p >= 2) result.push(" " + p + " " + unit.unit + "s");
    hours %= unit.value;
  });

  return result.join();
}
