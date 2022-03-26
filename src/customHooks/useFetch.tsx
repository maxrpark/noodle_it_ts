import { useState, useEffect } from 'react';
import simplereview from 'simplereview';
import simpleSlider from '@maxcoding/simpleslider';
import axios from 'axios';

export const useFetch = (url: string) => {
  const [noodles, setNoodles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = axios(url);
      const data = await response;
      if (data.status === 200) {
        setNoodles(data.data);
        setIsLoading(false);
        simplereview();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

  return { noodles, isLoading, simpleSlider };
};
