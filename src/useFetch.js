// Custom Hook

import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
        const fetchData = async () => {
            await axios.get(url)
                .then((response) => {
                    setData(response.data)
                })
                .catch(() => console.log("There must be some issue. Data didn't retrieve."), [])
        }
        fetchData()
    }, [url])

  return [data];
};

export default useFetch;