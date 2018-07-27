const { expect } = require('chai');
const sut = require('./index');

describe.only('mini-merto solution', () => {
  describe('Train', () => {
    describe('canPickUpPassengers', () => {
      it('return true when station.', () => {
        const train = new sut.Train(10);
        expect(train.canPickUpPassengers()).to.equal(true);
      });
    });
    describe('pickUpPassengers', () => {
      describe('when capacity = 10, currentPasenger = 2, station.currentPeople = 6, ', () => {
        it('returns 8', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 2;
          const station = new sut.Station(6, 4, 10);
          train.pickUpPassengers(station);
          expect(train.currentPassengersNum).to.equal(8);
          expect(station.currentPeopleNum).to.equal(0);
        });
      });
      describe('when capacity = 10, currentPasenger = 10, station.currentPeople = 2, ', () => {
        it('returns 10', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 10;
          const station = new sut.Station(2, 4, 10);
          train.pickUpPassengers(station);
          expect(train.currentPassengersNum).to.equal(10);
          expect(station.currentPeopleNum).to.equal(2);
        });
      });
      describe('when capacity = 10, currentPasenger = 8, station.currentPeople = 4, ', () => {
        it('returns 10', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 9;
          const station = new sut.Station(4, 4, 10);
          train.pickUpPassengers(station);
          expect(train.currentPassengersNum).to.equal(10);
          expect(station.currentPeopleNum).to.equal(3);
        });
      });
      describe('when capacity = 10, currentPasenger = 2, station.currentPeople = 10, ', () => {
        it('returns 10', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 2;
          const station = new sut.Station(10, 4, 10);
          train.pickUpPassengers(station);
          expect(train.currentPassengersNum).to.equal(10);
          expect(station.currentPeopleNum).to.equal(2);
        });
      });
      describe('when capacity = 10, currentPasenger = 10, station.currentPeople = 30, ', () => {
        it('returns 10', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 10;
          const station = new sut.Station(30, 4, 10);
          train.pickUpPassengers(station);
          expect(train.currentPassengersNum).to.equal(10);
          expect(station.currentPeopleNum).to.equal(30);
        });
      });
    });
  });
  describe('Station', () => {
    describe('passTrain', () => {
      describe('when trainCapacity = 10, trainPassengers = 2, waiting people = 6', () => {
        it('should have people = 0', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 2;
          const station = new sut.Station(6, 4, 10);
          station.passTrain(train);
          expect(station.currentPeopleNum).to.equal(0);
        });
      });
      describe('when trainCapacity = 5, trainPassengers = 2, waiting people = 6', () => {
        it('should have people = 3', () => {
          const train = new sut.Train(5);
          train.currentPassengersNum = 2;
          const station = new sut.Station(6, 4, 10);
          station.passTrain(train);
          expect(station.currentPeopleNum).to.equal(3);
        });
      });
      describe('when trainCapacity = 10, trainPassengers = 10, waiting people = 6', () => {
        it('should have people = 6', () => {
          const train = new sut.Train(5);
          train.currentPassengersNum = 10;
          const station = new sut.Station(6, 4, 10);
          station.passTrain(train);
          expect(station.currentPeopleNum).to.equal(6);
        });
      });
    });
    describe('updateAfterEachHourPassing', () => {
      it('should have people = 21', () => {
        const station = new sut.Station(6, 15, 10);
        station.updateAfterEachHourPassing();
        expect(station.currentPeopleNum).to.equal(21);
      });
    });
  });
  describe('SubWay', () => {
    describe('isFull', () => {
      it('return false initialy', () => {
        const stationNum = 3;
        const ai = [2, 3, 4];
        const bi = [4, 3, 2];
        const ci = [10, 9, 8];
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        expect(subWay.isFull()).to.equal(false);
      });
      it('return true when waiting people number exceed capacity', () => {
        const stationNum = 3;
        const ai = [20, 3, 4];
        const bi = [4, 3, 2];
        const ci = [10, 9, 8];
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        expect(subWay.isFull()).to.equal(true);
      });
    });
    describe('updateAfterEachHourPassing', () => {
      it('update its stations correctly', () => {
        const stationNum = 3;
        const ai = [2, 3, 4];
        const bi = [40, 3, 22];
        const ci = [10, 9, 8];
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        subWay.updateAfterEachHourPassing();
        const respectedStations = [{ comingPeopleNum: 40, stationCapacity: 10, currentPeopleNum: 42 },
          { comingPeopleNum: 3, stationCapacity: 9, currentPeopleNum: 6 },
          { comingPeopleNum: 22, stationCapacity: 8, currentPeopleNum: 26 }];
        expect(subWay.stations).to.deep.equal(respectedStations);
      });
    });
    describe('updateAfterTrainPass', () => {
      it('updates its stations after a train pass them', () => {
        const stationNum = 3;
        const ai = [2, 6, 26];
        const bi = [40, 3, 22];
        const ci = [10, 9, 8];
        const train = new sut.Train(10);
        train.currentPassengersNum = 0;
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        subWay.updateAfterTrainPass(train);
        const respectedStations = [
          { comingPeopleNum: 40, stationCapacity: 10, currentPeopleNum: 0 },
          { comingPeopleNum: 3, stationCapacity: 9, currentPeopleNum: 0 },
          { comingPeopleNum: 22, stationCapacity: 8, currentPeopleNum: 24 }];
        expect(subWay.stations).to.deep.equal(respectedStations);
      });
    });
  });
  describe.only('Game', () => {
    describe('when stations = 3', () => {
      const stationNum = 3; const hoursNum = 3; const trainCapacity = 10;
      const ai = [2, 3, 4];
      const bi = [4, 3, 2];
      const ci = [10, 9, 8];
      const game = new sut.Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
      describe('at hour = 0', () => {
        it('retuns [2 , 3 , 4] before ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([2, 3, 4]);
        });
        it('returns [0, 0, 0] after', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPass(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 0, 0]);
        });
      });
      describe('at hour = 1', () => {
        it('retuns [4 , 3 , 2] before ', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 3, 2]);
        });
        it('returns [8, 6, 4] after', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
      });
      describe('at hour = 2', () => {
        it('retuns [8, 6, 4] before ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
        it('returns [0, 4, 4] after', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPass(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 4, 4]);
        });
      });
      describe('at hour = 3', () => {
        it('retuns [4, 7, 6] before ', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 7, 6]);
        });
      });
    });
    describe.only('when stations = 4', () => {
      const stationNum = 4; const hoursNum = 10; const trainCapacity = 5;
      const ai = [1, 1, 0, 2];
      const bi = [1, 0, 5, 7];
      const ci = [1, 1, 8, 100];
      const game = new sut.Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
      describe('at hour = 0', () => {
        it('retuns [2 , 3 , 4] before ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([2, 3, 4]);
        });
        it('returns [0, 0, 0] after', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPass(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 0, 0]);
        });
      });
      describe('at hour = 1', () => {
        it('retuns [4 , 3 , 2] before ', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 3, 2]);
        });
        it('returns [8, 6, 4] after', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
      });
      describe('at hour = 2', () => {
        it('retuns [8, 6, 4] before ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
        it('returns [0, 4, 4] after', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPass(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 4, 4]);
        });
      });
      describe('at hour = 3', () => {
        it('retuns [8, 6, 4] before ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
        it('returns [0, 4, 4] after', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPass(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 4, 4]);
        });
      });
      describe('at hour = 3', () => {
        it('retuns [4, 7, 6] before ', () => {
          game.subWay.updateAfterEachHourPassing();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 7, 6]);
        });
      });
    });
  });
  describe('findMinimumTrains', () => {
    describe('when stationNum = 3, hoursNum = 3, trainCapacity = 10', () => {
      describe('when ai = [2, 3, 4], bi = [4, 3, 2], ci= [10, 9, 8]', () => {
        it('return 2 tarins', () => {
          const stationNum = 3; const hoursNum = 3; const trainCapacity = 10;
          const ai = [2, 3, 4];
          const bi = [4, 3, 2];
          const ci = [10, 9, 8];
          const expectedRes = sut.findMinimumTrains(stationNum, hoursNum, trainCapacity, ai, bi, ci);
          expect(expectedRes).to.equal(2);
        });
      });
    });
    describe('when stationNum = 4, hoursNum = 10, trainCapacity = 5', () => {
      describe('when ai = [1, 1, 0, 2], bi = [1, 0, 5, 7], ci= [1, 1, 8, 100]', () => {
        it('return 12 tarins', () => {
          const stationNum = 4; const hoursNum = 10; const trainCapacity = 5;
          const ai = [1, 1, 0, 2];
          const bi = [1, 0, 5, 7];
          const ci = [1, 1, 8, 100];
          const expectedRes = sut.findMinimumTrains(stationNum, hoursNum, trainCapacity, ai, bi, ci);
          expect(expectedRes).to.equal(12);
        });
      });
    });
  });
});
