import VimeoPlayer from '@vimeo/player';

import throttle from 'lodash.throttle';

// zmienna za pomocą której dostajemy się do id <iframe></iframe>
const iframePlayer = document.querySelector('#vimeo-player');

// zmienna za pomocą której tworzony jest nowy obiekt odtwarzacza video Vimeo
const player = new VimeoPlayer(iframePlayer);

//definiuje funkcję updateTime, która będzie wywoływana co najwyżej raz na sekundę (dzięki throttle). Funkcja ta zapisuje aktualny czas odtwarzania wideo do local storage.
const updateTime = throttle(event => {
  localStorage.setItem('videoplayer-current-time', event.seconds);
}, 1000);

//rejestrowaniem tzw. "event listenera" na obiekcie player. Pozwala to naszemu kodowi nasłuchiwać na określone zdarzenia, które mogą wystąpić w odtwarzaczu wideo Vimeo, kiedy odtwarzacz Vimeo emituje zdarzenie timeupdate (czyli gdy aktualizuje się czas odtwarzania wideo), to ma zostać wywołana funkcja updateTime.
player.on('timeupdate', updateTime);

const rightTime = localStorage.getItem('videoplayer-current-time'); //pobiera z local storage poprzednio zapisany czas odtwarzania wideo, funkcja getItem('videoplayer-current-time') pobiera wartość przypisaną do klucza 'videoplayer-current-time' i zapisuje ją w zmiennej rightTime.

//ten warunek sprawdza, czy zmienna rightTime zawiera jakąś wartość. Jeśli tak, to oznacza, że czas odtwarzania wideo był wcześniej zapisany w local storage.
if (rightTime) {
  player.setCurrentTime(parseFloat(rightTime));
}
//jeśli warunek jest spełniony (czyli poprzedni czas odtwarzania wideo istnieje), ta linia kodu ustawia aktualny czas odtwarzania wideo na zapisany czas. Funkcja parseFloat() konwertuje zapisany czas (który jest przechowywany jako ciąg znaków) na liczbę zmiennoprzecinkową, a następnie ustawia ten czas za pomocą metody setCurrentTime() odtwarzacza wideo player.
