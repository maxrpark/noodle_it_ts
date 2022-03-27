import { useState, useEffect } from 'react';
import simplereview from 'simplereview';
import simpleSlider from '@maxcoding/simpleslider';
import axios from 'axios';

export const useFetch = (url: string) => {
  const [noodles, setNoodles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getData = async () => {
    setIsLoading(true);
    const response = axios(url);
    const data = await response;
    if (data && !data.data.error) {
      setNoodles(data.data);
      setIsLoading(false);
      simplereview();
    } else {
      setError(data.data.error);
      throw new Error(`${data.data.error} found!`);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);

  return { noodles, isLoading, simpleSlider, error };
};
