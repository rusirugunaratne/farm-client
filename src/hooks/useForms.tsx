import { useState } from "react";

export default function useForm(getFreshModelObject: any) {
  type Error = {
    name?: string;
    image?: string;
    latitude?: string;
    longitude?: string;
  };

  const [values, setValues] = useState(getFreshModelObject());
  const [errors, setErrors] = useState<Error>({});

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}
