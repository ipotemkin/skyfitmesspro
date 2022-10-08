const baseUrl = 'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/';

export const api = {
  getCourses () {
      fetch(baseUrl + 'courses/2.json')
        .then(resp => console.log(resp.json()))
        .catch(err => console.log('error -->', err));
  }
}
