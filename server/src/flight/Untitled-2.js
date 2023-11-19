const { cloneObject } = require('../utils');
var utils = require('../utils');

function filterByPrice(trip, priceRange) {
  if (!priceRange) return true;
  const tripPrice = trip.fares[0] ? trip.fares[0].price.amountUsd : 0;
  return utils.filterByRange(tripPrice, priceRange);
}

function filterByStops(trip, stops) {
  if (!stops || stops.length === 0) return true;
  return stops.some(stop => trip.stops.includes(stop.code));
}

function filterByAirlines(trip, airlines) {
  if (!airlines || airlines.length === 0) return true;
  return airlines.some(airline => trip.airlines.some(tripAirline => tripAirline.code === airline.code));
}

function filterByProviders(trip, providers) {
  if (!providers || providers.length === 0) return true;
  return providers.some(provider => trip.providers.some(tripProvider => tripProvider.code === provider.code));
}

function filterByStopoverAirports(trip, stopoverAirports) {
  if (!stopoverAirports || stopoverAirports.length === 0) return true;
  return stopoverAirports.some(stopoverAirport => trip.stopoverAirports.includes(stopoverAirport.code));
}

function filterByStopoverDurations(trip, stopoverDurations) {
  if (!stopoverDurations) return true;
  const tripStopoverDuration = trip.stopoverDurationMinutes || 0;
  return utils.filterByRange(tripStopoverDuration, stopoverDurations);
}

function filterByOriginAirports(trip, originAirports) {
  if (!originAirports || originAirports.length === 0) return true;
  return originAirports.some(originAirport => trip.originAirportCodes.includes(originAirport.code));
}

function filterByDestinationAirports(trip, destinationAirports) {
  if (!destinationAirports || destinationAirports.length === 0) return true;
  return destinationAirports.some(destinationAirport => trip.destinationAirportCodes.includes(destinationAirport.code));
}

function filterByTripDurations(trip, tripDurations) {
  if (!tripDurations) return true;
  const tripDuration = trip.durationMinutes || 0;
  return utils.filterByRange(tripDuration, tripDurations);
}

// Add similar functions for other criteria...

function filterTripCriteria(trip, filter) {
  return (
    filterByPrice(trip, filter.minPrice) &&
    filterByPrice(trip, filter.maxPrice) &&
    filterByStops(trip, filter.stops) &&
    filterByAirlines(trip, filter.airlines) &&
    filterByProviders(trip, filter.providers) &&
    filterByStopoverAirports(trip, filter.stopoverAirports) &&
    filterByStopoverDurations(trip, filter.stopoverDurations) &&
    filterByOriginAirports(trip, filter.originAirports) &&
    filterByDestinationAirports(trip, filter.destinationAirports) &&
    filterByTripDurations(trip, filter.tripDurations)
    // Add calls to other filter functions...
  );
}

// Modify the filterTrips function to use the new filterTripCriteria function
function filterTrips(trips, filter) {
  if (!filter) return trips;
  return trips.filter(trip => filterTripCriteria(trip, filter));
}

// Modify the filterSponsors function to use the new filterTripCriteria function
function filterSponsors(sponsors, trips, filter) {
  if (!filter) return sponsors;
  return sponsors.filter(sponsor => {
    let trip = trips.find(trip => trip.id === sponsor.fareView.tripId);
    if (!!trip) {
      trip = cloneObject(trip);
      trip.fares = trip.fares.filter(fare => fare.id === sponsor.fareView.id);
    }
    return filterTripCriteria(trip, filter);
  });
}

module.exports = {
  // Other functions...
  filterTrips,
  filterSponsors
};
