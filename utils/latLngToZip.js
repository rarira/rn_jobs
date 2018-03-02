import axios from 'axios';
import qs from 'qs';

const GOOGLE_API_KEY = 'AIzaSyAOuFjHz_zsGiy0MHK2x-9xUt5VpPWyV4I';
const GEOCODE_ROOT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';

const buildGeocodeUrl = ({longitude, latitude}) => {
  const query = qs.stringify({ key: GOOGLE_API_KEY, latlng: `${latitude},${longitude}` });
  return `${GEOCODE_ROOT_URL}${query}`;
};

const reverseGeocode = (region) => {
  return new Promise((resolve, reject) => {
    const url = buildGeocodeUrl(region);
    axios.get(url)
    .then(({ data }) => {
      if (data.error_message) {
        return Promise.reject({ response: { data: data.error_message } });
      }
      const { results } = data;

      if (results.length === 0) {
        return Promise.reject({ response: { data: 'No results' } });
      }

      // results[0] is the result in closest
      // proximity to the provided longitude and latitude

      const { address_components } = results[0];
      const postal_code = address_components
        .find(component => component.types[0] === 'postal_code');

      if (!postal_code) {
        return Promise.reject({ response: { data: 'No results' } });
      }

      const zip = postal_code.long_name || postal_code.short_name;
      resolve(zip);
    })
    .catch(err => {
      reject(err);
    });
  });
};

export default reverseGeocode;
