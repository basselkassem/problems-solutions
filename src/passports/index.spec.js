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
    describe('updateTripsAvailableDaysBefore()', () => {
      it('should update trips correctly when 2 trips', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 6, 1, [1, 2, 4, 5]),
        ];
        sut.SolAlgorithm.updateTripsAvailableDaysBefore(input, 0);
        const expectedRes = [
          { toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [1, 2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [1, 2, 4, 5] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
      it('should update trips correctly when 2 trips and 1 visa is done', () => {
        const input = [
          new sut.Trip(1, 3, 1, [1, 2]),
          new sut.Trip(2, 6, 1, [1, 2, 4, 5]),
        ];
        sut.SolAlgorithm.updateTripsAvailableDaysBefore(input, 1);
        const expectedRes = [{ toCountry: 1, startDay: 3, duration: 1, availableDaysBefore: [2] },
          { toCountry: 2, startDay: 6, duration: 1, availableDaysBefore: [2, 4, 5] }];
        expect(input).to.deep.equal(expectedRes);
      });
      it('should update trips correctly when 3 trips and 2 visa is done', () => {
        const input = [
          new sut.Trip(2, 7, 3, [1, 2, 3, 4, 5, 6]),
          new sut.Trip(1, 13, 2, [1, 2, 3, 4, 5, 6, 10, 11, 12]),
          new sut.Trip(3, 19, 3, [1, 2, 3, 4, 5, 6, 10, 11, 12, 15, 16, 17, 18]),
        ];
        sut.SolAlgorithm.updateTripsAvailableDaysBefore(input, 3);
        sut.SolAlgorithm.updateTripsAvailableDaysBefore(input, 1);
        const expectedRes = [
          { toCountry: 2, startDay: 7, duration: 3, availableDaysBefore: [5, 6] },
          { toCountry: 1, startDay: 13, duration: 2, availableDaysBefore: [5, 6, 10, 11, 12] },
          { toCountry: 3, startDay: 19, duration: 3, availableDaysBefore: [5, 6, 10, 11, 12, 15, 16, 17, 18] },
        ];
        expect(input).to.deep.equal(expectedRes);
      });
    });
  });
  describe('canMakeTripsOnTime()', () => {
    describe('when tripsNum = 2; passportsNum = 1', () => {
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
    describe('when tripsNum = 3; passportsNum = 1', () => {
      describe('tripsStartDays = [13, 7, 19]; tripsLengths = [2, 3, 3]; visaIssuingDurations = [2, 1, 4]', () => {
        it('should return yes', () => {
          const tripsNum = 3; const passportsNum = 1;
          const tripsStartDays = [13, 7, 19];
          const tripsDurations = [2, 3, 3];
          const visaIssuingDurations = [2, 1, 4];
          const res = sut.canMakeTripsOnTime(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
          const expectRes = {
            howToGetVisasOnTime: [{ passport: 1, visas: [{ visa: 2, applicationDay: 1 }, { visa: 1, applicationDay: 2 }, { visa: 3, applicationDay: 4 }] }],
          };
          expect(res.canGetVisasOnTime).to.equal('yes');
          expect(res.howToGetVisasOnTime).to.deep.equal(expectRes.howToGetVisasOnTime);
        });
      });
    });

    describe('when tripsNum = 7; passportsNum = 2', () => {
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
  });
});
