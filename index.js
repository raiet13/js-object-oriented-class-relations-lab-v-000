let driverId = 0;
let passengerId = 0;
let tripId = 0;

const store = {drivers: [], passengers: [], trips: []};

class Driver {
    constructor(name) {
        this.name = name;
        this.id = ++driverId;
        store.drivers.push(this)
    }
    
    trips() {
        return store.trips.filter(trip => {
          return trip.driverId === this.id
        });
    }
    
    passengers() {
        const dTrips = this.trips();
        // console.log('Driver trips : ', dTrips);
        // NOTE : Not sure why reduce wasn't working...
        // const dPassengers = dTrips.reduce(function(agg, el, i, dTrips) {
        //     console.log(el.passenger());
        //     return el.passenger();
        // }, []);
        // return dPassengers;
        const newTrips = [];
 
        dTrips.forEach(function (trip) {
          newTrips.push(trip.passenger());
        });
     
        return newTrips;
    }
}

class Passenger {
    constructor(name) {
        this.name = name;
        this.id = ++passengerId;
        store.passengers.push(this)
    }

    trips() {
        return store.trips.filter(trip => {
          return trip.passengerId === this.id
        });
    }
    
    drivers() {
        const pTrips = this.trips();
        // console.log('Passenger trips : ', pTrips);
        const pDrivers = pTrips.reduce(function(agg, el, i, pTrips) {
            // console.log(el.driver());
            return el.driver();
        }, []);
        return pDrivers;
    }
}

class Trip {
    constructor(driver, passenger) {
        this.driverId = driver.id;
        this.passengerId = passenger.id;
        this.id = ++tripId;
        store.trips.push(this)
    }
    
    driver() {
        return store.drivers.find(driver => {
          return driver.id === this.driverId
        });
    }
    
    passenger() {
        return store.passengers.find(passenger => {
          return passenger.id === this.passengerId
        });
    }

}