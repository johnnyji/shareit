import geopoint from 'geopoint';

export default {

  /**
   * Returns a MongoDB query param object for anything within the
   * specified radius of the given lat/lon
   *
   * @param {Number} numOfMiles - The specified radius to include
   * @param {Number} lat - The search latitude
   * @param {Number} lon - The search longitude
   * @returns {Object} - The MongoDB search query object for any document within the radius
   */
  miles(numOfMiles, lat, lon) {
    const point = new geopoint(lat, lon);
    const [lowBounds, highBounds] = point.boundingCoordinates(numOfMiles);
    
    return {
      'location.lat': {
        $gte: lowBounds.latitude(),
        $lte: highBounds.latitude()
      },
      'location.lon': {
        $gte: lowBounds.longitude(),
        $lte: highBounds.longitude()
      }
    };
  }

};
