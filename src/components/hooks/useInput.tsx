import { useEffect, useState } from "react";

const useInput = (validate: (value: string) => boolean) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTouched) {
      timer = setTimeout(() => {
        setIsValid(validate(value));
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, validate, isTouched]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTouched) setIsTouched(true);
    setValue(e.target.value);
  };

  const handleBlur = () => {
    validate(value);
    setIsValid(validate(value));
  };

  return {
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    isValid,
  };
};

export default useInput;
