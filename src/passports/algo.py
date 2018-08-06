# https://codeforces.com/problemset/problem/1012/F

class Trip(object):
    def __init__(self, start, duration, visa_required_duration, to_country):
        self.to_country = to_country
        self.start = start
        self.duration = duration
        self.visa_required_duration = visa_required_duration
        self.available_days_before = []

    def get_end_day(self):
        return self.duration + self.start
    
    def reduce_available_days_before(self, removed_days):
        for day in removed_days:
            if self.available_days_before.count(day) > 0:
                self.available_days_before.remove(day)

    def increase_available_days_before(self, added_days):
        self.available_days_before.extend(added_days)
        self.available_days_before.sort(reverse = False)

class Visa(object):
    def __init__(self, issued_on, required_duration, for_country):
        self.issued_on = issued_on
        self.required_duration = required_duration
        self.for_country = for_country

class Passport(object):
    def __init__(self, id):
        self.id = id
        self.visas = []

    def has_visa_by(self, country):
        res = filter(lambda visa: visa.for_country == country, self.visas)
        if len(res) > 0:
            return True
        return False

class Algo(object):
    def __init__(self, trips_num, passport_num):
        self.trips_num = trips_num
        self.passport_num = passport_num
        self.trips = []
        self.passports = []
        for passport_id in range(0, self.passport_num):
            self.passports.append(Passport(passport_id))

    def get_last_day(self):
        return max(trip.start + trip.duration for trip in self.trips)

    def place_trip(self):
        self.trips.sort(key = lambda item: item.start, reverse = False)
        self.trips[0].available_days_before = range(1, self.trips[0].start)
        for i in range(1, len(self.trips)):
            self.trips[i].available_days_before = range(self.trips[i - 1].get_end_day(), self.trips[i].start)
            self.trips[i].available_days_before.extend(self.trips[i - 1].available_days_before)
            self.trips[i].available_days_before.sort(reverse=False)
    
    def reduce_available_days_before(self, visa):
        removed_days = range(visa.issued_on, visa.issued_on + visa.required_duration)
        for trip in self.trips:
            trip.reduce_available_days_before(removed_days)
    
    def increase_available_days_before(self, visa):
        added_day = range(visa.issued_on, visa.issued_on + visa.required_duration)
        for trip in self.trips:
            trip.increase_available_days_before(added_day)
    
    def can_make_visa_for(self, trip, visa, trips):
        if (visa.issued_on + visa.required_duration) <= (trip.start - 1):
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
                    self.increase_available_days_before(visa)

    def solve_with(self, trips, passport):
        visa = Visa(1, trips[0].visa_required_duration, trips[0].to_country)
        passport.visas.append(visa)
        self.reduce_available_days_before(visa)
        for visa_country_mask in range(0, 1 << self.trips_num):
            for trip in trips:
                if visa_country_mask & (1 << trips.index(trip)) > 0 and passport.has_visa_by(trip.to_country) == False:
                    if len(trip.available_days_before) > 0:
                        visa = Visa(trip.available_days_before[0], trip.visa_required_duration, trip.to_country)
                        if self.can_make_visa_for(trip, visa, trips) == True:
                            counter = 0
                            while self.is_visa_intersect_with_trips(visa, trips, trip) == True:
                                if counter < len(trip.available_days_before):
                                    visa = Visa(trip.available_days_before[counter], trip.visa_required_duration, trip.to_country)
                                else:
                                    break
                                counter = counter + 1
                            if counter == 0:
                                counter = 1
                            visa = Visa(trip.available_days_before[counter - 1], trip.visa_required_duration, trip.to_country)
                            if self.can_make_visa_for(trip, visa, trips) == True:
                                passport.visas.append(visa)
                                self.reduce_available_days_before(visa)
                            else:
                                if len(passport.visas) > 1:
                                    visa = passport.visas.pop(len(passport.visas) - 1)
                                    self.increase_available_days_before(visa)

    def solve(self):
        self.place_trip()
        self.solve_with(self.trips, self.passports[0])
        self.clean(self.passports[0])

        if len(self.passports) > 1:
            self.place_trip()
            trips = list(self.trips)
            self.exclude_trips(trips, self.passports[0])
            self.solve_with(trips, self.passports[1])
    
    def exclude_trips(self, trips, passport):
        countries = list(map((lambda visa: visa.for_country), passport.visas))
        for country in countries:
            trip = next((x for x in trips if x.to_country == country), None)
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
