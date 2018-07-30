// https://codeforces.com/problemset/problem/1007/E
class Train {
  constructor(maxCapacity) {
    this.maxCapacity = maxCapacity;
    this.currentPassengersNum = 0;
  }

  canPickUpPassengers() {
    if (this.currentPassengersNum <= this.maxCapacity) {
      return true;
    }
    return false;
  }

  pickUpPassengers(station) {
    if (this.maxCapacity > this.currentPassengersNum + station.currentPeopleNum) {
      this.currentPassengersNum = this.currentPassengersNum + station.currentPeopleNum;
      station.currentPeopleNum = 0;
    } else {
      const exccesPeopleNum = this.maxCapacity - this.currentPassengersNum;
      station.currentPeopleNum -= exccesPeopleNum;
      this.currentPassengersNum = this.maxCapacity;
    }
  }
}

class Station {
  constructor(initPeopleNum, comingPeopleNum, stationCapacity) {
    this.comingPeopleNum = comingPeopleNum;
    this.stationCapacity = stationCapacity;
    this.currentPeopleNum = initPeopleNum;
  }

  copy() {
    return Object.assign(Object.create(this), this);
  }

  updateOneHour() {
    this.currentPeopleNum = this.currentPeopleNum + this.comingPeopleNum;
  }

  updateBeforeOneHour() {
    this.currentPeopleNum = this.currentPeopleNum - this.comingPeopleNum;
  }

  updateAfterTrainPickUp(train) {
    if (train.canPickUpPassengers()) {
      train.pickUpPassengers(this);
    }
  }

  isFull() {
    if (this.currentPeopleNum <= this.stationCapacity) {
      return false;
    }
    return true;
  }
}

class SubWay {
  constructor(stationNum, ai, bi, ci) {
    this.stations = [];
    for (let stationIndex = 0; stationIndex < stationNum; stationIndex++) {
      const station = new Station(ai[stationIndex], bi[stationIndex], ci[stationIndex]);
      this.stations.push(station);
    }
  }

  copy() {
    const copySubway = new SubWay();
    copySubway.stations = this.stations.map(station => station.copy());
    return copySubway;
  }

  isFull() {
    for (let stationIndex = 0; stationIndex < this.stations.length; stationIndex++) {
      if (this.stations[stationIndex].isFull()) {
        return true;
      }
    }
    return false;
  }

  updateOneHour() {
    this.stations.forEach((station) => {
      station.updateOneHour();
    });
  }

  updateBeforeOneHour() {
    this.stations.forEach((station) => {
      station.updateBeforeOneHour();
    });
  }

  updateAfterTrainPassed(train) {
    this.stations.forEach((station) => {
      station.updateAfterTrainPickUp(train);
    });
  }

  getNeededTrainsNum(trainCapacity) {
    let trainCounter = 0;
    const copySubWay = this.copy();
    while (copySubWay.isFull()) {
      const train = new Train(trainCapacity);
      copySubWay.updateAfterTrainPassed(train);
      trainCounter++;
    }
    return trainCounter;
  }
}

class Game {
  constructor(stationNum, hoursNum, trainCapacity, ai, bi, ci) {
    this.hoursNum = hoursNum;
    this.subWay = new SubWay(stationNum, ai, bi, ci);
    this.trainCapacity = trainCapacity;
  }

  getNeededTrains(hour1, hour2, alreadyPassedTrainsNum) {
    const copySubway = this.subWay.copy();
    const needTrains = new Array(this.hoursNum);
    for (let i = hour1; i < hour2; i++) {
      copySubway.updateOneHour();
      const neededTrainsNum = copySubway.getNeededTrainsNum(this.trainCapacity);
      needTrains[i] = neededTrainsNum;
      copySubway.updateBeforeOneHour();
      let counter = neededTrainsNum;
      while (counter > 0) {
        const train = new Train(this.trainCapacity);
        copySubway.updateAfterTrainPassed(train);
        counter--;
      }
      copySubway.updateOneHour();
    }
    return needTrains.reduce((item, acc) => acc + item) + alreadyPassedTrainsNum;
  }

  solve() {
    const tarinsNeededToCompleteGame = new Array(this.hoursNum);
    for (let i = 0; i < this.hoursNum; i++) {
      const train = new Train(this.trainCapacity);
      this.subWay.updateAfterTrainPassed(train);
      const alreadyPassedTrainsNum = i + 1;
      tarinsNeededToCompleteGame[i] = this.getNeededTrains(i, this.hoursNum, alreadyPassedTrainsNum);
      this.subWay.updateOneHour();
    }
    return Math.min(...tarinsNeededToCompleteGame);
  }
}
const findMinimumTrains = (stationNum, hoursNum, trainCapacity, ai, bi, ci) => {
  const game = new Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
  return game.solve();
};
module.exports = {
  Train,
  Station,
  SubWay,
  Game,
  findMinimumTrains,
};
