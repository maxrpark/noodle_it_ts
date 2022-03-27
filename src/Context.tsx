import React from 'react';
import { useContext, useState } from 'react';
import { useFetch } from './customHooks/useFetch';

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
  isModalOpen: boolean;
  selectedImg: string;
  openImg: (e: React.MouseEvent<HTMLImageElement>) => void;
  closeModal: () => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  relatedByBrand: (noodle: NoodleDetails) => NoodleDetails[];
  relatedByCategory: (noodle: NoodleDetails) => NoodleDetails[];
}

const AppContext = React.createContext({} as UseContextInterface);

// variables
const baseUrl = 'https://noodles-api.herokuapp.com/api/v1/noodles/';

const AppProvider: React.FC = ({ children }) => {
  const fetchUrl = `${baseUrl}`;
  const { isLoading, noodles } = useFetch(fetchUrl);
  const [selectedImg, setSelectedImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const relatedByBrand = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.brand.name === noodle.brand.name)
      .slice(0, 3);
  const relatedByCategory = (noodle: NoodleDetails) =>
    noodles
      .filter((item: NoodleDetails) => item.category === noodle.category)
      .slice(0, 3);

  const openImg = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setSelectedImg(img.src);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'scroll';
  };
  return (
    <AppContext.Provider
      value={{
        noodles,
        isLoading,
        isModalOpen,
        selectedImg,
        relatedByCategory,
        relatedByBrand,
        closeModal,
        openImg,
        setIsModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
