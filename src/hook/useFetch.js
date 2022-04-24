import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((errror) => {
        setLoading(false);
        setError(errror.message);
      });
  }, [url]);

  return { loading, error, data };
};

export default useFetch;
