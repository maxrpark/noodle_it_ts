import { useState, useEffect } from 'react';
import axios from 'axios';
import simplereview from 'simplereview';
import simpleSlider from '@maxcoding/simpleslider';
import { URL_NOODLES } from '../utils/variables';

export const useFetch = (url: string) => {
  const [noodles, setNoodles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getData = async () => {
    setIsLoading(true);
    const response = axios(URL_NOODLES + url);
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
