import not1 from './../../assets/audios/notification/notification-6175.mp3';
import not2 from './../../assets/audios/notification/notification-sound-7062.mp3';
import not3 from './../../assets/audios/notification/announcement-sound-3-21463.mp3';
import not4 from './../../assets/audios/notification/achive-sound-132273.mp3';
import not5 from './../../assets/audios/notification/announcement-sound-5-21465.mp3';
import not6 from './../../assets/audios/notification/announcement-sound-4-21464.mp3';
import not7 from './../../assets/audios/notification/announcement-sound-21466.mp3';
import not8 from './../../assets/audios/notification/bell-172780.mp3';
import not10 from './../../assets/audios/notification/bike-bell-173588.mp3';
import not11 from './../../assets/audios/notification/dogru-128492.mp3';
import not12 from './../../assets/audios/notification/friend-request-14878.mp3';
import not13 from './../../assets/audios/notification/harp-motif2-36586.mp3';
import not14 from './../../assets/audios/notification/llv-132676.mp3';
import not15 from './../../assets/audios/notification/livechat-129007.mp3';
import not16 from './../../assets/audios/notification/message-13716.mp3';
import not17 from './../../assets/audios/notification/music-box-98027.mp3';
import not18 from './../../assets/audios/notification/shooting-sound-fx-159024.mp3';
import not19 from './../../assets/audios/notification/short-success-sound-glockenspiel-treasure-video-game-6346.mp3';
import not20 from './../../assets/audios/notification/start-13691.mp3';
import not21 from './../../assets/audios/notification/subtle-95660.mp3';
import not22 from './../../assets/audios/notification/triangle_open_01-102876.mp3';
import not23 from './../../assets/audios/notification/water-droplet-6-165636.mp3';
import {useCallback} from "react";

export const useNotification = () => {
  const notifications = [
    not1, not2, not3, not4, not5, not6, not7, not8, not10, not11, not22,
    not12, not13, not14, not15, not16, not17, not18, not19, not20, not21, not23
  ];

  const getRandomNotification = () => {
    const index = Math.floor(Math.random() * notifications.length);
    return notifications[index];
  }

  const generateNotification = () => {
    const notification = new Audio(getRandomNotification());
    notification.play();
  }

  return useCallback(generateNotification, []);
}