import { useEffect } from 'react';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    if (!title) {
      document.title = 'NOODLE IT!';
    } else {
      document.title = `Noodle it || ${title}`;
    }
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = 'scroll';
    }
  }, [title]);
};
