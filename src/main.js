'use strict';
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(15)
  .carrotCount(20)
  .bugCount(15)
  .build();

// 생성자에 인자가 3개 이상 넘어가는 경우에는 이런식의 코딩은 실수할 가능성도 있고 좋지 않다.
// const game = new Game(20, 20, 20);

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = '다시하기 ❓';
      sound.playAlert();
      break;
    case Reason.win:
      message = '이겼어요! 🏆';
      sound.playWin();
      break;
    case Reason.lose:
      message = '졌어요 🙈';
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
