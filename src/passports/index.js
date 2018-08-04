// https://codeforces.com/problemset/problem/1012/F

const fillArray = (start, end) => Array(end - start).fill().map((item, index) => start + index);
const NOT_VISA_APPLICTION_DAY = 1000;

class Trip {
  constructor(toCountry, startDay, duration, availableDaysBefore = []) {
    this.toCountry = toCountry;
    this.startDay = startDay;
    this.duration = duration;
    this.availableDaysBefore = availableDaysBefore;
  }

  getEndDay() {
    return this.startDay + this.duration - 1;
  }

  reduceAvailableDaysBefore(days) {
    this.availableDaysBefore.splice(0, days);
  }

  increaseAvailableDaysBefore(startDay, endDay) {
    this.availableDaysBefore = this.availableDaysBefore.concat(fillArray(startDay, endDay + 1));
    this.availableDaysBefore = [...new Set(this.availableDaysBefore)];
    this.availableDaysBefore.sort((a, b) => a - b);
  }

  copy() {
    const tripCopy = new Trip(this.toCountry, this.startDay, this.duration);
    tripCopy.availableDaysBefore = this.availableDaysBefore.map(item => item);
    return tripCopy;
  }
}
class Consulate {
  constructor(country, VisaIssuingDuration) {
    this.country = country;
    this.VisaIssuingDuration = VisaIssuingDuration;
  }

  issue(visa, startIssuingDay) {
    visa.forCountry = this.country;
    visa.startIssuingDay = startIssuingDay;
    visa.endIssuingDay = visa.startIssuingDay + this.VisaIssuingDuration;
  }
}
class Visa {
  constructor(forCountry) {
    this.forCountry = forCountry;
    this.startIssuingDay = 0;
    this.endIssuingDay = 0;
  }

  getIssuingDuration() {
    return this.endIssuingDay - this.startIssuingDay;
  }
}
class Passport {
  constructor(passportId, visas) {
    this.passportId = passportId;
    this.visas = visas;
    this.isAvailable = true;
  }

  addVisa(visa) {
    this.visas.push(visa);
  }

  removeLastVisa() {
    return this.visas.pop();
  }

  hasVisaFor(country) {
    for (let i = 0; i < this.visas.length; i++) {
      if (this.visas[i].forCountry === country) {
        return true;
      }
    }
    return false;
  }
}

class SolAlgorithm {
  constructor(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations) {
    this.initTrips(tripsNum, tripsStartDays, tripsDurations);
    this.initPassports(passportsNum);
    this.initConsulates(tripsNum, visaIssuingDurations);
  }

  initConsulates(tripsNum, visaIssuingDurations) {
    this.consulates = [];
    for (let index = 0; index < tripsNum; index++) {
      const consulate = new Consulate(2 ** index, visaIssuingDurations[index]);
      this.consulates.push(consulate);
    }
  }

  initTrips(tripsNum, tripsStartDays, tripsDurations) {
    this.trips = [];
    for (let index = 0; index < tripsNum; index++) {
      const trip = new Trip(2 ** index, tripsStartDays[index], tripsDurations[index]);
      this.trips.push(trip);
    }
  }

  initPassports(passportsNum) {
    this.passports = [];
    for (let index = 0; index < passportsNum; index++) {
      const passport = new Passport(index, []);
      this.passports.push(passport);
    }
  }

  placeTrips() {
    this.sortTrips();
    this.trips[0].availableDaysBefore = fillArray(1, this.trips[0].startDay);
    for (let index = 1; index < this.trips.length; index++) {
      this.trips[index].availableDaysBefore = fillArray(this.trips[index - 1].getEndDay() + 1, this.trips[index].startDay);
    }
    for (let index = 1; index < this.trips.length; index++) {
      this.trips[index].availableDaysBefore = this.trips[index].availableDaysBefore.concat(this.trips[index - 1].availableDaysBefore);
      this.trips[index].availableDaysBefore = this.trips[index].availableDaysBefore.filter((item, pos, arr) => arr.indexOf(item) === pos);
      this.trips[index].availableDaysBefore.sort((a, b) => a - b);
    }
  }

  findConsulate(country) {
    return this.consulates.find(item => item.country === country);
  }

  sortTrips() {
    this.trips.sort((tripA, tripB) => {
      if (tripA.startDay > tripB.startDay) {
        return 1;
      }
      if (tripA.startDay < tripB.startDay) {
        return -1;
      }
      return 0;
    });
  }

  static reduceTripsAvailableDaysBefore(trips, visa) {
    trips.forEach((trip) => {
      trip.reduceAvailableDaysBefore(visa.getIssuingDuration());
    });
  }

  static increaseTripsAvailableDaysBefore(trips, visa) {
    trips.forEach((trip) => {
      trip.increaseAvailableDaysBefore(visa.startIssuingDay, visa.endIssuingDay);
    });
  }

  static isVisaIssuingIntersectWithPreviousTrips(trips, visa) {
    for (let i = 0; i < trips.length; i++) {
      if (visa.startIssuingDay < trips[i].startDay && visa.endIssuingDay >= trips[i].startDay) {
        return true;
      }
    }
    return false;
  }

  static canMakeVisaFor(trip, visa, trips) {
    if (visa.endIssuingDay < trip.startDay && !SolAlgorithm.isVisaIssuingIntersectWithPreviousTrips(trips, visa)) {
      return true;
    }
    return false;
  }

  static addAvailableDaysBeforeToTrips(trips, excludedTrip) {
    trips.forEach((trip) => {
      if (excludedTrip.getEndDay() < trip.startDay) {
        const array = Array(excludedTrip.getEndDay() + 1 - excludedTrip.startDay).fill(NOT_VISA_APPLICTION_DAY);
        trip.availableDaysBefore = trip.availableDaysBefore.concat(array);
        trip.availableDaysBefore.sort((a, b) => a - b);
      }
    });
  }

  static excludeTrips(allTrips, trips, passport) {
    const countries = passport.visas.map(visa => visa.forCountry);
    countries.forEach((country) => {
      trips = trips.filter((trip, pos, arr) => arr.map(item => item.toCountry).indexOf(country) !== pos);
      const excludedTrip = allTrips.find(trip => trip.toCountry === country);
      SolAlgorithm.addAvailableDaysBeforeToTrips(trips, excludedTrip);
    });
    return trips;
  }

  solveUsingPassport(trips, passport) {
    for (let visaMask = 1; visaMask < (1 << this.trips.length); visaMask++) {
      trips = this.copyTrips();
      for (let i = 0; i < trips.length; i++) {
        const country = visaMask & (1 << i);
        if (country !== 0) {
          if (!passport.hasVisaFor(country)) {
            const consulate = this.findConsulate(country);
            const visa = new Visa(country);
            if (trips[i].availableDaysBefore.length > 0) {
              const startIssuingDay = trips[i].availableDaysBefore[0];
              consulate.issue(visa, startIssuingDay);
              if (SolAlgorithm.canMakeVisaFor(trips[i], visa, trips)) {
                passport.addVisa(visa);
                SolAlgorithm.reduceTripsAvailableDaysBefore(trips, visa);
              } else if (SolAlgorithm.canMakeVisaFor(trips[i], visa, trips)) {
                passport.addVisa(visa);
                SolAlgorithm.reduceTripsAvailableDaysBefore(trips, visa);
              } else {
                while (passport.visas.length > 1) {
                  const previousVisa = passport.removeLastVisa(visa);
                  SolAlgorithm.increaseTripsAvailableDaysBefore(trips, previousVisa);
                }
                passport.addVisa(visa);
                SolAlgorithm.reduceTripsAvailableDaysBefore(trips, visa);
              }
            }
          }
        }
      }
    }
  }

  solve() {
    this.placeTrips();
    const tripsCopy = this.copyTrips();
    let tripsCopy2 = this.copyTrips();
    this.solveUsingPassport(tripsCopy, this.passports[0]);
    if (this.passports.length > 1) {
      tripsCopy2 = SolAlgorithm.excludeTrips(this.trips, tripsCopy2, this.passports[0]);
      this.solveUsingPassport(tripsCopy2, this.passports[1]);
    }
    const solution = this.mapSolution();
    return solution;
  }

  copyTrips() {
    const tripsCopies = this.trips.map(trip => trip.copy());
    return tripsCopies;
  }

  flatrenPassportVisas() {
    let visas = this.passports.map(item => item.visas);
    visas = visas.reduce((item, acc) => acc.concat(item));
    return visas;
  }

  mapSolution() {
    const res = {};
    const visas = this.flatrenPassportVisas();
    if (visas.length === this.trips.length) {
      res.canGetVisasOnTime = 'yes';
      res.howToGetVisasOnTime = this.passports.map(item => ({ passport: item.passportId + 1, visas: item.visas.map(elem => ({ visa: elem.forCountry, applicationDay: elem.startIssuingDay })) }));
    } else {
      res.canGetVisasOnTime = 'no';
    }
    return res;
  }
}

const canMakeTripsOnTime = (tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations) => {
  const solAlgo = new SolAlgorithm(tripsNum, passportsNum, tripsStartDays, tripsDurations, visaIssuingDurations);
  return solAlgo.solve();
};
module.exports = {
  Trip,
  Visa,
  SolAlgorithm,
  canMakeTripsOnTime,
};
