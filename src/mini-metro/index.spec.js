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
    describe('updateAfterTrainPickUp', () => {
      describe('when trainCapacity = 10, trainPassengers = 2, waiting people = 6', () => {
        it('should have people = 0', () => {
          const train = new sut.Train(10);
          train.currentPassengersNum = 2;
          const station = new sut.Station(6, 4, 10);
          station.updateAfterTrainPickUp(train);
          expect(station.currentPeopleNum).to.equal(0);
        });
      });
      describe('when trainCapacity = 5, trainPassengers = 2, waiting people = 6', () => {
        it('should have people = 3', () => {
          const train = new sut.Train(5);
          train.currentPassengersNum = 2;
          const station = new sut.Station(6, 4, 10);
          station.updateAfterTrainPickUp(train);
          expect(station.currentPeopleNum).to.equal(3);
        });
      });
      describe('when trainCapacity = 10, trainPassengers = 10, waiting people = 6', () => {
        it('should have people = 6', () => {
          const train = new sut.Train(5);
          train.currentPassengersNum = 10;
          const station = new sut.Station(6, 4, 10);
          station.updateAfterTrainPickUp(train);
          expect(station.currentPeopleNum).to.equal(6);
        });
      });
    });
    describe('updateAfterHourPassed', () => {
      it('should have people = 21', () => {
        const station = new sut.Station(6, 15, 10);
        station.updateAfterHourPassed();
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
    describe('updateAfterHourPassed', () => {
      it('update its stations correctly', () => {
        const stationNum = 3;
        const ai = [2, 3, 4];
        const bi = [40, 3, 22];
        const ci = [10, 9, 8];
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        subWay.updateAfterHourPassed();
        const respectedStations = [{ comingPeopleNum: 40, stationCapacity: 10, currentPeopleNum: 42 },
          { comingPeopleNum: 3, stationCapacity: 9, currentPeopleNum: 6 },
          { comingPeopleNum: 22, stationCapacity: 8, currentPeopleNum: 26 }];
        expect(subWay.stations).to.deep.equal(respectedStations);
      });
    });
    describe('updateAfterTrainPassed', () => {
      it('updates its stations after a train pass them', () => {
        const stationNum = 3;
        const ai = [2, 6, 26];
        const bi = [40, 3, 22];
        const ci = [10, 9, 8];
        const train = new sut.Train(10);
        train.currentPassengersNum = 0;
        const subWay = new sut.SubWay(stationNum, ai, bi, ci);
        subWay.updateAfterTrainPassed(train);
        const respectedStations = [
          { comingPeopleNum: 40, stationCapacity: 10, currentPeopleNum: 0 },
          { comingPeopleNum: 3, stationCapacity: 9, currentPeopleNum: 0 },
          { comingPeopleNum: 22, stationCapacity: 8, currentPeopleNum: 24 }];
        expect(subWay.stations).to.deep.equal(respectedStations);
      });
    });
  });
  describe('Game', () => {
    describe('when stations = 3', () => {
      const stationNum = 3; const hoursNum = 3; const trainCapacity = 10;
      const ai = [2, 3, 4];
      const bi = [4, 3, 2];
      const ci = [10, 9, 8];
      const game = new sut.Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
      describe('at hour = 0', () => {
        it('at the begining of the hour people in statios [2 , 3 , 4] ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([2, 3, 4]);
        });
        it('at the end of the hour people in stations [0, 0, 0]', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPassed(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 0, 0]);
        });
      });
      describe('at hour = 1', () => {
        it('at the begining of the hour people in statios [4 , 3 , 2] ', () => {
          game.subWay.updateAfterHourPassed();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 3, 2]);
        });
        it('at the end of the hour people in stations [8, 6, 4]', () => {
          game.subWay.updateAfterHourPassed();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
      });
      describe('at hour = 2', () => {
        it('at the begining of the hour people in statios [8, 6, 4] ', () => {
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([8, 6, 4]);
        });
        it('at the end of the hour people in stations [0, 4, 4]', () => {
          const train = new sut.Train(trainCapacity);
          game.subWay.updateAfterTrainPassed(train);
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([0, 4, 4]);
        });
      });
      describe('at hour = 3', () => {
        it('at the begining of the hour people in statios [4, 7, 6] ', () => {
          game.subWay.updateAfterHourPassed();
          const res = game.subWay.stations.map(item => item.currentPeopleNum);
          expect(res).to.deep.equal([4, 7, 6]);
        });
      });
    });
    describe('when stations number = 4 & train capacity = 5', () => {
      describe('when ai = [1, 1, 0, 2], bi = [1, 0, 5, 7], ci = [1, 1, 8, 100]', () => {
        describe('when hour number = 10', () => {
          const stationNum = 4; const hoursNum = 10; const trainCapacity = 5;
          const ai = [1, 1, 0, 2];
          const bi = [1, 0, 5, 7];
          const ci = [1, 1, 8, 100];
          const game = new sut.Game(stationNum, hoursNum, trainCapacity, ai, bi, ci);
          describe('from hour = 0 to hour = 1', () => {
            it('at the begining of the hour people in statios [1, 1, 0, 2] ', () => {
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([1, 1, 0, 2]);
            });
            it('shoud allocate 1 train', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.isFull();
              expect(res).to.equal(true);
            });
            it('at the middle of the hour people in statios [0, 0, 0, 0]', () => {
              game.subWay.updateBeforeHourPassed();
              const train = new sut.Train(trainCapacity);
              game.subWay.updateAfterTrainPassed(train);
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([0, 0, 0, 0]);
            });
            it('at the end of the hour people in stations [1, 0, 5, 7]', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([1, 0, 5, 7]);
            });
          });
          describe('from hour = 1 to hour = 2', () => {
            it('shoud allocate 1 train', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.isFull();
              expect(res).to.equal(true);
            });
            it('at the middle of the hour people in statios [0, 0, 1, 7]', () => {
              game.subWay.updateBeforeHourPassed();
              const train = new sut.Train(trainCapacity);
              game.subWay.updateAfterTrainPassed(train);
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([0, 0, 1, 7]);
            });
            it('at the end of the hour people in stations [1, 0, 6, 14]', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([1, 0, 6, 14]);
            });
          });
          describe('from hour = 2 to hour = 3', () => {
            it('shoud allocate 1 train', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.isFull();
              expect(res).to.equal(true);
            });
            it('at the middle of the hour people in statios [0, 0, 2, 14]', () => {
              game.subWay.updateBeforeHourPassed();
              const train = new sut.Train(trainCapacity);
              game.subWay.updateAfterTrainPassed(train);
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([0, 0, 2, 14]);
            });
            it('at the end of the hour people in stations [1, 0, 7, 21]', () => {
              game.subWay.updateAfterHourPassed();
              const res = game.subWay.stations.map(item => item.currentPeopleNum);
              expect(res).to.deep.equal([1, 0, 7, 21]);
            });
          });
        });
      });
    });
  });
  describe.only('findMinimumTrains', () => {
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
    /*
    2 200 5
    1 1 1
    12 3 15
    Output
    200
    ////
    2 10 5
    1 1 1
    12 3 15
    Output
    10
    ///
    2 5 1
    0 5 6
    0 2 7
    Output
    22
    */
  });
});
