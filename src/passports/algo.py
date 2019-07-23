# https://codeforces.com/problemset/problem/1012/F

class Trip(object):
    def __init__(self, start, duration, time_to_acquire_visa, to_country):
        self.to_country = to_country
        self.start = start
        self.duration = duration
        self.time_to_acquire_visa = time_to_acquire_visa
        self.days_before = []

    def get_end_day(self):
        return self.duration + self.start
    
    def reduce_days_before(self, days_to_be_removed):
        for day in days_to_be_removed:
            if self.days_before.count(day) > 0:
                self.days_before.remove(day)

    def increase_days_before(self, days_to_add):
        self.days_before.extend(days_to_add)
        self.days_before.sort(reverse = False)

class Visa(object):
    def __init__(self, issued_on, required_duration, for_country):
        self.issued_on = issued_on
        self.required_duration = required_duration
        self.for_country = for_country

class Passport(object):
    def __init__(self, id):
        self.id = id
        self.visas = []

    def has_visa_from(self, country):
        res = list(filter(lambda visa: visa.for_country == country, self.visas))
        if len(res) > 0:
            return True
        return False

class Algo(object):
    def __init__(self, trips_num, passport_num):
        self.trips_num = trips_num
        self.passport_num = passport_num
        self.trips = []
        self.passports = []
        for passport_id in list(range(0, self.passport_num)):
            self.passports.append(Passport(passport_id))

    def get_last_day(self):
        return max(trip.start + trip.duration for trip in self.trips)

    def place_trips(self):
        self.trips.sort(key = lambda item: item.start, reverse = False)
        self.trips[0].days_before = list(range(1, self.trips[0].start))
        for i in range(1, len(self.trips)):
            self.trips[i].days_before = list(range(self.trips[i - 1].get_end_day(), self.trips[i].start))
            self.trips[i].increase_days_before(self.trips[i - 1].days_before)
    
    def reduce_days_before(self, visa):
        days_to_remove = list(range(visa.issued_on, visa.issued_on + visa.required_duration))
        for trip in self.trips:
            trip.reduce_days_before(days_to_remove)
    
    def increase_days_before(self, visa):
        days_to_add = list(range(visa.issued_on, visa.issued_on + visa.required_duration))
        for trip in self.trips:
            trip.increase_days_before(days_to_add)
    
    def can_make_visa_for(self, trip, visa, trips):
        if (visa.issued_on + visa.required_duration) <= trip.start:
            return True
        return False
    
    def is_visa_intersect_with_trips(self, visa, trips, curr_trip):
        for i in range(0, trips.index(curr_trip)):
            v_end = visa.issued_on + visa.required_duration
            t_end = trips[i].start + trips[i].duration
            cond1 = v_end >= trips[i].start and v_end <= t_end
            cond2 = visa.issued_on < trips[i].start and v_end >= t_end
            if cond1 or cond2:
                return True
        return False
    
    def clean(self, passport):
        for trip in self.trips:
            for visa in passport.visas:
                if self.is_visa_intersect_with_trips(visa, self.trips, trip) == True:
                    passport.visas.remove(visa)
                    self.increase_days_before(visa)

    def solve_with(self, trips, passport):
        visa = Visa(1, trips[0].time_to_acquire_visa, trips[0].to_country)
        passport.visas.append(visa)
        self.reduce_days_before(visa)
        for visa_country_mask in range(0, 1 << self.trips_num):
            for trip in trips:
                if visa_country_mask & (1 << trips.index(trip)) > 0 and passport.has_visa_from(trip.to_country) == False:
                    if len(trip.days_before) > 0:
                        visa = Visa(trip.days_before[0], trip.time_to_acquire_visa, trip.to_country)
                        if self.can_make_visa_for(trip, visa, trips) == True:
                            counter = 0
                            while self.is_visa_intersect_with_trips(visa, trips, trip) == True:
                                if counter < len(trip.days_before):
                                    visa = Visa(trip.days_before[counter], trip.time_to_acquire_visa, trip.to_country)
                                else:
                                    break
                                counter = counter + 1
                            if counter == 0:
                                counter = 1
                            visa = Visa(trip.days_before[counter - 1], trip.time_to_acquire_visa, trip.to_country)
                            if self.can_make_visa_for(trip, visa, trips) == True:
                                passport.visas.append(visa)
                                self.reduce_days_before(visa)
                            else:
                                if len(passport.visas) > 1:
                                    visa = passport.visas.pop(len(passport.visas) - 1)
                                    self.increase_days_before(visa)

    def solve(self):
        self.place_trips()
        self.solve_with(self.trips, self.passports[0])
        self.clean(self.passports[0])

        if len(self.passports) > 1:
            self.place_trips()
            trips = list(self.trips)
            self.exclude_trips(trips, self.passports[0])
            self.solve_with(trips, self.passports[1])
    
    def exclude_trips(self, trips, passport):
        countries = list(map((lambda visa: visa.for_country), passport.visas))
        for country in countries:
            trip = next((trip for trip in trips if trip.to_country == country), None)
            if trip != None:
                trips.remove(trip)
    
def read_input(file_name):
    file = open(file_name, "r")
    line = file.readline().split(" ")
    algo = Algo(int(line[0]), int(line[1]))
    for index in range(0, algo.trips_num):
        linearr = file.readline().split(" ")
        trip = Trip(int(linearr[0]), int(linearr[1]), int(linearr[2]), index)
        algo.trips.append(trip)
    return algo
