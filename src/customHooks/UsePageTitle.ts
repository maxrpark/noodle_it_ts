import { useEffect } from 'react';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (!title) {
      document.title = 'NOODLE IT!';
    } else {
      document.title = `Noodle it || ${title}`;
    }
  }, []);
};
