import { useState } from 'react';

export function useFormFields<T>(
  initialValues: T
): [T, (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, () => void] {
  const [values, setValues] = useState<T>(initialValues);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    event.persist();
    const { target } = event;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  const resetForm = () => setValues(initialValues);
  return [values, handleChange, resetForm];
}
