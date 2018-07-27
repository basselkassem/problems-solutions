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
      if (this.currentPassengersNum < this.maxCapacity) {
        const x = this.maxCapacity - this.currentPassengersNum;
        station.currentPeopleNum -= x;
      }
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

  updateAfterEachHourPassing() {
    this.currentPeopleNum = this.currentPeopleNum + this.comingPeopleNum;
  }

  updateToBeforeEachHourPassing() {
    this.currentPeopleNum = this.currentPeopleNum - this.comingPeopleNum;
  }

  updateAfterTrainPickUp(pickedUpPeople) {
    this.currentPeopleNum = this.currentPeopleNum - pickedUpPeople;
  }

  passTrain(train) {
    if (train.canPickUpPassengers()) {
      train.pickUpPassengers(this);
    }
  }

  isFull() {
    if (this.currentPeopleNum < this.stationCapacity) {
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

  isFull() {
    for (let stationIndex = 0; stationIndex < this.stations.length; stationIndex++) {
      if (this.stations[stationIndex].isFull()) {
        return true;
      }
    }
    return false;
  }


  updateAfterEachHourPassing() {
    this.stations.forEach((station) => {
      station.updateAfterEachHourPassing();
    });
  }

  updateToBeforeEachHourPassing() {
    this.stations.forEach((station) => {
      station.updateToBeforeEachHourPassing();
    });
  }

  updateAfterTrainPass(train) {
    this.stations.forEach((station) => {
      station.passTrain(train);
    });
  }

  shouldTrainPickUpPeople() {
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
    for (let hour = 0; hour <= this.hoursNum; hour++) {
      const train = new Train(this.trainCapacity);
      if (hour === 0) {
        this.addTrain(train);
        this.subWay.updateAfterTrainPass(train);
        this.subWay.updateAfterEachHourPassing();
      } else {
        this.subWay.updateAfterEachHourPassing();
        if (this.subWay.isFull()) {
          this.subWay.updateToBeforeEachHourPassing();
          this.addTrain(train);
          this.subWay.updateAfterTrainPass(train);
        }
      }
    }
  }
}
const findMinimumTrains = (stationNum, hoursNum, trainCapacity, ai, bi, ci) => {
  const game = new Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
  game.solve();

  return game.trains.length;
};
module.exports = {
  Train,
  Station,
  SubWay,
  Game,
  findMinimumTrains,
};
