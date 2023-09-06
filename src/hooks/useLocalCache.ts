import { useEffect, useState } from 'react';

import { getDisease } from '@/api';

const THIRTY_SECONDS = 1000 * 60 * 0.3;

interface DiseaseData {
  data: DiseaseProps[];
  timestamp: number;
}

export const useLocalCache = (diseaseName: string) => {
  const [diseaseList, setDiseaseList] = useState<DiseaseProps[]>([]);
  const [cache, setCache] = useState<{ [key: string]: DiseaseData }>({});

  useEffect(() => {
    const getDiseaseList = async () => {
      const currentTime = new Date().getTime();
      const expireTime = THIRTY_SECONDS;

      const notExistDisease = !cache[diseaseName];
      const overExpireTime = notExistDisease || currentTime - cache[diseaseName].timestamp > expireTime;

      try {
        if (diseaseName && overExpireTime) {
          console.info('calling api');

          const res = await getDisease(diseaseName);
          const newData = res.data.slice(0, 8);
          setDiseaseList(newData);
          setCache((prev) => ({
            ...prev,
            [diseaseName]: {
              data: newData,
              timestamp: currentTime,
            },
          }));
        } else if (cache[diseaseName]) {
          setDiseaseList(cache[diseaseName].data);
        }
      } catch (err) {
        console.error('Error fetching disease data:', err);
      }
    };

    getDiseaseList();
  }, [diseaseName, cache]);

  return diseaseList;
};
