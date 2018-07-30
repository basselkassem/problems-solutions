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

  updateToHour(hour) {
    let counter = hour;
    while (counter > 0) {
      this.updateOneHour();
      counter--;
    }
  }

  updateBeforeHour(hour) {
    let counter = hour;
    while (counter > 0) {
      this.updateBeforeOneHour();
      counter--;
    }
  }

  canUpdateToHour(hour) {
    this.updateToHour(hour);
    return this.isFull();
  }
}

class Game {
  constructor(stationNum, hoursNum, trainCapacity, ai, bi, ci) {
    this.hoursNum = hoursNum;
    this.subWay = new SubWay(stationNum, ai, bi, ci);
    this.trains = [];
    this.trainCapacity = trainCapacity;
  }

  addTrain(newTrain) {
    this.trains.push(newTrain);
  }

  solve() {
    const d = new Array(this.hoursNum);
    for (let i = 0; i < this.hoursNum; i++) {
      d[i] = new Array(this.hoursNum);
      for (let j = 0; j < this.hoursNum; j++) {
        d[i][j] = 0;
      }
    }
    for (let t = 1; t <= this.hoursNum; t++) {
      for (let i = 0, j = t; j <= this.hoursNum; i++, j++) {
        if (this.subWay.isFull()) {
          const neededTrainsNum = this.subWay.getNeededTrainsNum(this.trainCapacity);
          let counter = neededTrainsNum;
          while (counter > 0) {
            const train = new Train(this.trainCapacity);
            this.subWay.updateAfterTrainPassed(train);
            counter--;
          }
          d[i][j] = neededTrainsNum;
          // this.subWay.updateOneHour();
        }
        let trainsNumi;
        let trainsNumj;
        if (this.subWay.canUpdateToHour(i)) {
          this.subWay.updateToHour(i);
          trainsNumi = this.subWay.getNeededTrainsNum(this.trainCapacity);
          this.subWay.updateBeforeHour(i);
        }
        console.log(this.subWay.stations.map(item => item.currentPeopleNum));
        if (this.subWay.canUpdateToHour(j)) {
          this.subWay.updateToHour(j);
          trainsNumj = this.subWay.getNeededTrainsNum(this.trainCapacity);
          this.subWay.updateBeforeHour(j);
        }
        console.log(this.subWay.stations.map(item => item.currentPeopleNum));
        console.log(i, j, '->:', trainsNumi, trainsNumj);
        d[i][j] = Math.min(trainsNumi, trainsNumj);
      }
    }
    return d[1][this.hoursNum];
  }

  solveV1(hour1, hour2) {
    if (hour1 === hour2) {
      let neededTrain = this.subWay.getNeededTrainsNum(this.trainCapacity);
      if (this.subWay.isFull()) {
        neededTrain = this.subWay.getNeededTrainsNum(this.trainCapacity);
        const train = new Train(this.trainCapacity);
        this.subWay.updateAfterTrainPassed(train);
        return neededTrain;
      }
      return 0;
    }
    this.subWay.updateOneHour();
    return Math.min(this.solveV1(hour1, hour2 - 1), this.solveV1(hour1 + 1, hour2));
  }
}
const findMinimumTrains = (stationNum, hoursNum, trainCapacity, ai, bi, ci) => {
  const game = new Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
  return game.solve(hoursNum);
};
module.exports = {
  Train,
  Station,
  SubWay,
  Game,
  findMinimumTrains,
};
