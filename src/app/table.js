import { reject } from 'ramda';
import {
  musees, restaurants, bars, hasard,
} from './Data/dataTable';
import { objBetween } from './Helpers/between';
import { choiceUser } from './Helpers/choiceHasard';

// --- corps du texte
export const myfct = function constructRoute(val1, val2, val3) {
  let flag1; let flag2; let flag3 = false; let flag4 = false;
  const choiceRoute = []; let choiceRestaurant = [];
  let rand3;
  if (choiceUser) {
    choiceRoute.push(choiceUser(val1, musees));
    flag1 = true;
  }
  if (choiceUser) {
    choiceRoute.push(choiceUser(val3, bars));
    flag2 = true;
  }
  if (flag1 && flag2) {
    const mymax1 = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).maxi;
    const mymin1 = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).mini;

    choiceRestaurant = restaurants
      .filter((el) => val2 === el.type)
      .filter((el) => el.latitude >= mymin1 && el.latitude <= mymax1);
    console.table(choiceRestaurant);
    if (choiceRestaurant.length > 0) {
      rand3 = Math.floor(Math.random() * choiceRestaurant.length);
      choiceRoute.push(choiceRestaurant[rand3]);
      flag3 = true;
    }
  }
  const themax = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).maxi;
  const themin = objBetween(choiceRoute[0].latitude, choiceRoute[1].latitude).mini;
  let bighasard = hasard.filter((el) => el.latitude <= themax
   && el.latitude >= themin);

  const mesHasards = (mymax, mymin) => {
    const toto = bighasard;
    const hasardFilter = toto.filter((el) => el.latitude >= mymin && el.latitude <= mymax);
    if (hasardFilter.length > 0) {
      const rando = Math.floor(Math.random() * hasardFilter.length);
      choiceRoute.push(hasardFilter[rando]);
      bighasard = reject((el) => el === hasardFilter[rando])(bighasard);
    } const flag = false;
    return flag;
  };
  if (flag1 && flag3) {
    const mymax = objBetween(choiceRoute[0].latitude, choiceRestaurant[rand3].latitude).maxi;
    const mymin = objBetween(choiceRoute[0].latitude, choiceRestaurant[rand3].latitude).mini;
    if (mesHasards) {
      mesHasards(mymax, mymin);
      choiceRoute[choiceRoute.length - 1].key = 'hasard1';
    }
  }
  if (flag2 && flag3) {
    const mymax = objBetween(choiceRestaurant[rand3].latitude, choiceRoute[1].latitude).maxi;
    const mymin = objBetween(choiceRestaurant[rand3].latitude, choiceRoute[1].latitude).mini;
    mesHasards(mymax, mymin);
    flag4 = true;
  }
  if (flag4) {
    const mymax = objBetween(choiceRoute[4].latitude, choiceRoute[1].latitude).maxi;
    const mymin = objBetween(choiceRoute[4].latitude, choiceRoute[1].latitude).mini;
    mesHasards(mymax, mymin);
  }

  const calc = choiceRoute[1].latitude;
  const dist1 = choiceRoute[choiceRoute.length - 1] - calc;
  const dist2 = choiceRoute[choiceRoute.length - 2] - calc;
  const abs1 = Math.abs(calc, dist1);
  const abs2 = Math.abs(calc, dist2);
  if (abs1 <= abs2) {
    choiceRoute[choiceRoute.length - 1].key = 'hasard2';
    choiceRoute[choiceRoute.length - 2].key = 'hasard3';
  } else {
    choiceRoute[choiceRoute.length - 2].key = 'hasard2';
    choiceRoute[choiceRoute.length - 1].key = 'hasard3';
  }
  console.table(choiceRoute);
  return choiceRoute;
};
