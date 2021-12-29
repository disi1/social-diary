import { useState } from "react";

export function useFormFields<T>(
  initialValues: T
): [
  T,
  (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  () => void,
  (name: string, value: string) => void
] {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => setValues(initialValues);

  const manuallyHandleChange = (name: string, value: string) => setValues({ ...values, [name]: value });

  return [values, handleChange, resetForm, manuallyHandleChange];
}

export const getNoOfHoursSinceDate = (date: Date) => {
  return (new Date().valueOf() - new Date(date).valueOf()) / 1000 / 60 / 60;
};
