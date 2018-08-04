const { expect } = require('chai');
const sut = require('./index');

describe.only('Passports Problem', () => {
  describe('SolAlgorithm', () => {
    describe('placeTrips()', () => {
      it('should place trips on days axe correctly  ', () => {
        const tripsNum = 2; const passportsNum = 1;
        const tripsStartDays = [3, 6];
        const tripsDurations = [1, 1];
        const visaIssuingDurations = [1, 1];
        const solAlgo = new sut.SolAlgorithm(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
        solAlgo.placeTrips();
        const expectedRes = [{ toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [1, 2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [1, 2, 4, 5] }];
        expect(solAlgo.trips).to.deep.equal(expectedRes);
      });
    });
    describe('reduceTripsAvailableDaysBefore()', () => {
      it('should reduce trips correctly when 2 trips', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 6, 1, [1, 2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 1;
        visa.endIssuingDay = 1;
        sut.SolAlgorithm.reduceTripsAvailableDaysBefore(input, visa);
        const expectedRes = [
          { toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [1, 2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [1, 2, 4, 5] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
      it('should reduce trips correctly when 2 trips and 1 visa is done', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 6, 1, [1, 2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 1;
        visa.endIssuingDay = 2;
        sut.SolAlgorithm.reduceTripsAvailableDaysBefore(input, visa);
        const expectedRes = [{ toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [2, 4, 5] }];
        expect(input).to.deep.equal(expectedRes);
      });
      it('should reduce trips correctly when 3 trips and 2 visa is done', () => {
        const input = [
          new sut.Trip(2, 7, 3, [1, 2, 3, 4, 5, 6]),
          new sut.Trip(1, 13, 2, [1, 2, 3, 4, 5, 6, 10, 11, 12]),
          new sut.Trip(3, 19, 3, [1, 2, 3, 4, 5, 6, 10, 11, 12, 15, 16, 17, 18]),
        ];
        const visa1 = new sut.Visa(1);
        visa1.startIssuingDay = 0;
        visa1.endIssuingDay = 3;
        sut.SolAlgorithm.reduceTripsAvailableDaysBefore(input, visa1);
        const visa2 = new sut.Visa(1);
        visa2.startIssuingDay = 0;
        visa2.endIssuingDay = 1;
        sut.SolAlgorithm.reduceTripsAvailableDaysBefore(input, visa2);
        const expectedRes = [
          { toCountry: 2, startDay: 7, duration: 3, availableDaysBefore: [5, 6] },
          { toCountry: 1, startDay: 13, duration: 2, availableDaysBefore: [5, 6, 10, 11, 12] },
          { toCountry: 3, startDay: 19, duration: 3, availableDaysBefore: [5, 6, 10, 11, 12, 15, 16, 17, 18] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
    });
    describe('increaseTripsAvailableDaysBefore()', () => {
      it('should increase trips correctly when 2 trips', () => {
        const input = [
          new sut.Trip(1, 3, 1, [2]),
          new sut.Trip(2, 6, 1, [2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 1;
        visa.endIssuingDay = 2;
        sut.SolAlgorithm.increaseTripsAvailableDaysBefore(input, visa);
        const expectedRes = [
          { toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [1, 2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [1, 2, 4, 5] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
      it('should reduce trips correctly when 2 trips and 1 visa is done', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 6, 1, [1, 2, 9]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 3;
        visa.endIssuingDay = 6;
        sut.SolAlgorithm.increaseTripsAvailableDaysBefore(input, visa);
        const expectedRes = [{ toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [1, 2, 3, 4, 5, 6] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [1, 2, 3, 4, 5, 6, 9] }];
        expect(input).to.deep.equal(expectedRes);
      });

      it('should reduce trips correctly when 3 trips and 2 visa is done', () => {
        const input = [
          new sut.Trip(2, 7, 3, [5, 6]),
          new sut.Trip(1, 13, 2, [5, 6, 10, 11, 12]),
          new sut.Trip(3, 19, 3, [5, 6, 10, 11, 12, 15, 16, 17, 18]),
        ];
        const visa1 = new sut.Visa(1);
        visa1.startIssuingDay = 1;
        visa1.endIssuingDay = 3;
        sut.SolAlgorithm.increaseTripsAvailableDaysBefore(input, visa1);
        const visa2 = new sut.Visa(1);
        visa2.startIssuingDay = 3;
        visa2.endIssuingDay = 4;
        sut.SolAlgorithm.increaseTripsAvailableDaysBefore(input, visa2);
        const expectedRes = [
          { toCountry: 2, startDay: 7, duration: 3, availableDaysBefore: [1, 2, 3, 4, 5, 6] },
          { toCountry: 1, startDay: 13, duration: 2, availableDaysBefore: [1, 2, 3, 4, 5, 6, 10, 11, 12] },
          { toCountry: 3, startDay: 19, duration: 3, availableDaysBefore: [1, 2, 3, 4, 5, 6, 10, 11, 12, 15, 16, 17, 18] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
    });
    describe('isVisaIssuingIntersectWithPreviousTrips()', () => {
      it('should return true', () => {
        const input = [
          new sut.Trip(1, 3, 1, [2]),
          new sut.Trip(2, 7, 1, [2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 2;
        visa.endIssuingDay = 20;
        const res = sut.SolAlgorithm.isVisaIssuingIntersectWithPreviousTrips(input, visa);
        expect(res).to.equal(true);
      });
      it('should return true', () => {
        const input = [
          new sut.Trip(1, 3, 1, [2]),
          new sut.Trip(2, 7, 1, [2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 0;
        visa.endIssuingDay = 20;
        const res = sut.SolAlgorithm.isVisaIssuingIntersectWithPreviousTrips(input, visa);
        expect(res).to.equal(true);
      });
      it('should return false', () => {
        const input = [
          new sut.Trip(1, 3, 1, [2]),
          new sut.Trip(2, 7, 1, [2, 4, 5]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 7;
        visa.endIssuingDay = 20;
        const res = sut.SolAlgorithm.isVisaIssuingIntersectWithPreviousTrips(input, visa);
        expect(res).to.equal(false);
      });
    });
    describe('canMakeVisaFor()', () => {
      it('returns true', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 7, 1, [1, 2, 5, 6]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 1;
        visa.endIssuingDay = 2;
        const res = sut.SolAlgorithm.canMakeVisaFor(input[0], visa, input);
        expect(res).to.equal(true);
      });
      it('returns false', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 7, 1, [1, 2, 5, 6]),
        ];
        const visa = new sut.Visa(1);
        visa.startIssuingDay = 7;
        visa.endIssuingDay = 9;
        const res = sut.SolAlgorithm.canMakeVisaFor(input[0], visa, input);
        expect(res).to.equal(false);
      });
    });
  });
  describe.only('canMakeTripsOnTime()', () => {
    describe.only('when tripsNum = 2; passportsNum = 1', () => {
      describe('tripsStartDays = [3, 6]; tripsLengths = [1, 1]; visaIssuingDurations = [1, 1]', () => {
        it('should return yes', () => {
          const tripsNum = 2; const passportsNum = 1;
          const tripsStartDays = [3, 6];
          const tripsDurations = [1, 1];
          const visaIssuingDurations = [1, 1];
          const res = sut.canMakeTripsOnTime(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
          const expectRes = {
            howToGetVisasOnTime: [{ passport: 1, visas: [{ visa: 1, applicationDay: 1 }, { visa: 2, applicationDay: 2 }] }],
          };
          expect(res.canGetVisasOnTime).to.equal('yes');
          expect(res.howToGetVisasOnTime).to.deep.equal(expectRes.howToGetVisasOnTime);
        });
      });
    });
    describe.only('when tripsNum = 3; passportsNum = 1', () => {
      describe('tripsStartDays = [13, 7, 19]; tripsLengths = [2, 3, 3]; visaIssuingDurations = [2, 1, 4]', () => {
        it('should return yes', () => {
          const tripsNum = 3; const passportsNum = 1;
          const tripsStartDays = [13, 7, 19];
          const tripsDurations = [2, 3, 3];
          const visaIssuingDurations = [2, 1, 4];
          const res = sut.canMakeTripsOnTime(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
          const expectRes = {
            howToGetVisasOnTime: [{ passport: 1, visas: [{ visa: 1, applicationDay: 1 }, { visa: 4, applicationDay: 4 }, { visa: 2, applicationDay: 10 }] }],
          };
          expect(res.canGetVisasOnTime).to.equal('yes');
          expect(res.howToGetVisasOnTime).to.deep.equal(expectRes.howToGetVisasOnTime);
        });
      });
    });

    describe.only('when tripsNum = 7; passportsNum = 2', () => {
      describe('tripsStartDays = [15, 14, 18, 21, 9, 22, 5]; tripsLengths = [1, 1, 1, 1, 4, 2, 4]; visaIssuingDurations = [1, 1, 1, 1, 6, 5, 3]', () => {
        it('should return yes', () => {
          const tripsNum = 7; const passportsNum = 2;
          const tripsStartDays = [15, 14, 18, 21, 9, 22, 5];
          const tripsDurations = [1, 1, 1, 1, 4, 2, 4];
          const visaIssuingDurations = [1, 1, 1, 1, 6, 5, 3];
          const res = sut.canMakeTripsOnTime(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
          const expectRes = {
            howToGetVisasOnTime: [
              {
                passport: 1,
                visas: [
                  { visa: 7, applicationDay: 1 }, { visa: 2, applicationDay: 4 },
                  { visa: 3, applicationDay: 13 }, { visa: 4, applicationDay: 16 },
                ],
              }, {
                passport: 2,
                visas: [
                  { visa: 5, applicationDay: 1 }, { visa: 1, applicationDay: 13 }, { visa: 6, applicationDay: 19 },
                ],
              },
            ],
          };
          expect(res.canGetVisasOnTime).to.equal('yes');
          expect(res.howToGetVisasOnTime).to.deep.equal(expectRes.howToGetVisasOnTime);
        });
      });
    });

    describe('when tripsNum = 3; passportsNum = 1', () => {
      describe('tripsStartDays = [7, 13, 19]; tripsLengths = [3, 2, 3]; visaIssuingDurations = [1, 3, 4]', () => {
        it('should return no', () => {
          const tripsNum = 3; const passportsNum = 1;
          const tripsStartDays = [7, 13, 19];
          const tripsDurations = [3, 2, 3];
          const visaIssuingDurations = [1, 3, 4];
          const res = sut.canMakeTripsOnTime(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
          expect(res.canGetVisasOnTime).to.equal('no');
        });
      });
    });
  });
});
