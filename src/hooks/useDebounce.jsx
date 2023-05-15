import { useEffect, useState } from "react";

function useDebounce(props) {
  const { value, delay } = props;

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

import PropTypes from "prop-types";

useDebounce.propTypes = {
  value: PropTypes.string,
  delay: PropTypes.number,
};
