import { config } from '../config.js';

let movieId = 0;
const API_KEY = config.TMDBKEY;
const urlParams = new URLSearchParams(window.location.search); // 현재 URL에서 쿼리 스트링을 가져옴

// 'id' 쿼리 스트링 값 가져오기
movieId = urlParams.get('id');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMDM0YmQ0YjdiMTY0MDI4MmIzYTMwNWQ2ZTk4ZjhkMyIsIm5iZiI6MTcyMjQ0MDIyNC41NzY2ODksInN1YiI6IjY2YTYzZWM3N2NlMWExNjM4YTYwMzUzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wdE1bG5kax-2Td5QIXuRxmhOYqOFiyh7ALtxec2tm5U'
  }
};

export const createDetail = () => {
  return fetchData();
};

// fetch data
async function fetchData() {
  try {
    const SEARCH_DETAIL_URL = 'https://api.themoviedb.org/3/movie/' + movieId + `?api_key=${API_KEY}&language=ko-KR`;
    console.log(SEARCH_DETAIL_URL);
    const res = await fetch(SEARCH_DETAIL_URL, options);
    const data = await res.json();
    return createDetailSetcion(data);
  } catch (err) {
    console.error(err, '중지');
    alert(err);
  }
}

// detail
const createDetailSetcion = (data) => {
  const title = data.title;
  const description = data.overview;
  const app = document.getElementById('app');
  const detail = document.createElement('section');
  const detailImgHeader = document.createElement('div');
  const search = document.querySelector('#search');

  // detail-info 요소 생성 및 콘텐츠 추가
  const detailInfo = document.createElement('div');
  detailInfo.id = 'detail-info';
  const detailTitle = document.createElement('h1');
  detailTitle.textContent = title;
  const detailDescription = document.createElement('p');
  detailDescription.textContent = description;
  search.style = 'display:none';

  //디테일 페이지 추가
  detail.id = 'detail';
  detailImgHeader.id = 'detail-image-block';
  // 스타일 설정을 통해 백그라운드 이미지 추가
  detailImgHeader.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${data.poster_path}.jpg')`;

  // 추가적인 스타일 설정
  detailImgHeader.style.backgroundSize = 'cover';
  detailImgHeader.style.backgroundPosition = 'center';
  detailImgHeader.style.width = '240px'; // 예시 너비
  detailImgHeader.style.height = '350px'; // 예시 높이

  //append
  app.appendChild(detail);
  detailInfo.appendChild(detailTitle);
  detailInfo.appendChild(detailDescription);
  detail.appendChild(detailImgHeader);
  detail.appendChild(detailInfo);
};

//포스터 이미지, 예시 이미지 경로
const poster_path = '/your-image-path.jpg';
function setBackgroundImage(poster_path) {
  document.documentElement.style.setProperty('--poster-path', `url('https://image.tmdb.org/t/p/w500${poster_path}')`);
}
setBackgroundImage(poster_path);
