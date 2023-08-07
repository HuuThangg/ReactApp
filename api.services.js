
/**
 * Api service
 */
class ApiService {

  buildHeaders() {
    const headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
      };
    return headers;
  }
  /**
   * Api get with abort support
   * @param {string} url
   * @param {object} params
   * @param {mixed} tag
   */
  async get(url,) {
    const headers = this.buildHeaders();
    return new Promise((resolve, reject) => {
      fetch(url, { headers})
        // throw if response status is not 200
        .then(resp => {
          if (!resp.ok) {
            throw resp;
          }
          return resp;
        })     
        // parse json
        .then(response => response.json())
        // verify api call success
        .then(jsonResp => {
          console.log(jsonResp);
          return resolve(jsonResp)
        })
        //catch all errors
        .catch(err => {
          console.log(err);
          if (err.status && err.status == 401) {
          }
          return reject(err);
        })
    });
  }
}

export default new ApiService();
