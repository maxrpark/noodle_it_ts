import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import axios from 'axios';
// import simpleSlider from '@maxcoding/simpleslider';
import simplereview from 'simplereview';

interface Brand {
  name: string;
  slug: string;
}

export interface NoodleDetails {
  id: number;
  name: string;
  images: string[];
  rating: number;
  slug: string;
  brand: Brand;
  category: string;
  price_per_package: string;
  price_per_unite: string;
  amount_per_package: number;
  description: string;
  ingredients: string[];
  tags: string[];
  instructions: string;
  spicy_level: string;
}

interface UseContextInterface {
  noodles: NoodleDetails[];
  isLoading: boolean;
  // getData: () => void;
  relatedByBrand: (noodle: NoodleDetails) => NoodleDetails[];
  relatedByCategory: (noodle: NoodleDetails) => NoodleDetails[];
}

const AppContext = React.createContext({} as UseContextInterface);
// variables
const baseUrl = 'https://noodleapi.herokuapp.com/api/v1/noodles/';

const AppProvider: React.FC = ({ children }) => {
  const [noodles, setNoodles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = axios(baseUrl);
      const data = await response;
      if (data.status === 200) {
        setNoodles(data.data);
        console.log(data.data);
        simplereview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const relatedByBrand = (noodle: NoodleDetails) =>
    noodles.filter(
      (item: NoodleDetails) => item.brand.name === noodle.brand.name
    );
  const relatedByCategory = (noodle: NoodleDetails) =>
    noodles.filter((item: NoodleDetails) => item.category === noodle.category);

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider
      value={{ noodles, isLoading, relatedByCategory, relatedByBrand }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
