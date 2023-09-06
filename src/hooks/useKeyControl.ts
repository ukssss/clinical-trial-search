import { useEffect } from 'react';

interface UseKeyControlProps {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  diseaseList: DiseaseProps[];
}

export const useKeyControl = ({ setSelectedIndex, diseaseList }: UseKeyControlProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prevIndex) => (prevIndex < diseaseList.length - 1 ? prevIndex + 1 : prevIndex));
          break;
        case 'Enter':
          alert('test');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [diseaseList, setSelectedIndex]);
};
