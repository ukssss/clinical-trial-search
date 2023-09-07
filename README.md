# clinical-trial-search

## 프로젝트 소개

- 목표 : 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현
- 주제 : [한국임상정보](https://clinicaltrialskorea.com/) 사이트에서 검색영역을 클론하기
- 작업 기간 : 2023.09.05 - 2023.09.08
- 팀 레포지토리 : [바로가기](https://github.com/pre-onboarding-12th-team3/pre-onboarding-12th-3-3)

## 배포 URL

<strong>"해당 프로젝트는 서버가 포함되어 있지 않으므로, 로컬 환경에서 설치 후 실행하여 프로젝트를 확인하시는 것을 권장합니다."</strong>

[배포 URL 바로가기](https://clinical-trial-search-seven.vercel.app/)

## 기술 스택

![vite](https://img.shields.io/badge/vite-4.4.5-646CFF?logo=vite) ![typescript](https://img.shields.io/badge/typescript-5.0.2-3178C6?logo=typescript) ![react](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react) ![reactrouter](https://img.shields.io/badge/react--router--dom-6.15.0-CA4245?logo=reactrouter) ![axios](https://img.shields.io/badge/axios-6.15.0-5A29E4?logo=axios) ![styled-components](https://img.shields.io/badge/styled--components-6.0.7-DB7093?logo=styledcomponents) ![vercel](https://img.shields.io/badge/vercel-000000?logo=vercel)

## 설치 및 실행

1. 저장소 복제 (Clone Repository)

```zsh
$ git clone https://github.com/ukssss/clinical-trial-search.git
```

2. 종속성 설치 (Install Dependencies)

```zsh
$ npm install
```

3. 서버 및 애플리케이션 실행 (Run Server & Application)

```zsh
$ npm run all
```

## 폴더 구조

```base
src
 ┣ api
 ┃ ┣ axios.ts
 ┃ ┗ index.ts
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ SearchBar.tsx
 ┃ ┣ SearchButton.tsx
 ┃ ┣ SearchResult.tsx
 ┃ ┣ Title.tsx
 ┃ ┗ index.ts
 ┣ constants
 ┣ customTypes
 ┃ ┣ disease.d.ts
 ┃ ┗ svg.d.ts
 ┣ hooks
 ┃ ┣ index.ts
 ┃ ┣ useDebounce.ts
 ┃ ┣ useKeyControl.ts
 ┃ ┗ useLocalCache.ts
 ┣ pages
 ┃ ┣ ErrorPage.tsx
 ┃ ┣ SearchPage.tsx
 ┃ ┗ index.ts
 ┣ routes
 ┃ ┗ router.tsx
 ┣ utils
 ┃ ┗ emphasisText.tsx
 ┣ App.css
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts
```

## 구현 내용

| Search Page                              |
| ---------------------------------------- |
| ![SearchPage](src/assets/searchpage.gif) |

#### 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

```tsx
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/sick',
});

export const getDisease = async (name: string) => {
  const res = await axiosInstance.get(`?q=${name}`);
  return res;
};
```

- axios GET 통신을 사용해서 서버에 있는 데이터를 불러올 수 있는 `getDisease()` 생성
  - 입력값으로 name 을 받아 질환명 검색시 name을 쿼리값에 넣어 API 호출을 하여 검색어 추천 기능 구현.

#### API 호출별로 로컬 캐싱 구현

```tsx
export const useLocalCache = (diseaseName: string) => {
  const [diseaseList, setDiseaseList] = useState<DiseaseProps[]>([]);
  const [cache, setCache] = useState<{ [key: string]: DiseaseData }>({});

  ...

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

  ...

  }, [diseaseName, cache]);

  return diseaseList;
};
```

- 캐싱을 상태 cache에 담아서 로컬캐싱 구현
- 캐싱이 존재할 경우 cache 상태에서 이전에 검색한 data를 뽑아 이를 출력, API 호출 X

#### 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

```tsx
if (diseaseName) {
  const debounce = setTimeout(() => {
    getDiseaseList();
  }, 500);

  return () => {
    clearTimeout(debounce);
  };
}
```

- debounce 를 사용하여 0.5초 단위로 검색하도록 구현, 즉 입력 중간에 불필요한 API 호출 요청을 방지함.

#### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

```tsx
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
```

- keyboard 입력으로 경우에 따라 인덱스 값을 변경하도록 설정 (위로 가면 인덱스 감소, 아래로 가면 인덱스 증가)
- 현재 인덱스 값과 검색어의 인덱스 값이 같을 경우 선택되도록 구현

## 커밋 컨벤션

```base

- Feat | 새로운 기능을 추가
- Fix | 버그 수정
- Design | CSS 등 사용자 UI 디자인 변경
- !BREAKING CHANGE | 커다란 API 변경의 경우
- !HOTFIX | 급하게 치명적인 버그를 고쳐야 하는 경우
- Style | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
- Refactor | 프로덕션 코드 리팩토링
- Comment | 필요한 주석 추가 및 변경
- Docs | 문서 수정
- Test | 테스트 코드, 리팩토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음
- Chore | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음
- Rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- Remove | 파일을 삭제하는 작업만 수행한 경우

```
