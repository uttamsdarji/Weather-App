import React from 'react';


class WeatherData extends React.Component {

  getMyLocation = () => {
    let location = null;
    let latitude = null;
    let longitude = null;
    if (window.navigator && window.navigator.geolocation) {
      location = window.navigator.geolocation
    }
    if (location){
      location.getCurrentPosition( (position) => {
        latitude = (position.coords.latitude);
        longitude = (position.coords.longitude);
        this.props.setLatLong(latitude, longitude);
        this.props.setCity(this.props.data.feature);
        // localStorage.setItem('cityName', this.props.data.name);
      });
    }  
  }  

  newData = (data) => {
    this.props.newData(data);
  }

  fetchDataByGeo = (latitude,longitude) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=9b32cf97b04c03ad2e6f0960ea7bdce3';
    fetch(url)
    .then(results => results.json())
    .then((wdata) => {
      this.newData(wdata);
    });
  }

  componentDidMount() {
    if(!this.props.latitude) {
      this.getMyLocation();
      
    }
    
  }
 

  componentDidUpdate(prevProps) {
    if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
      this.fetchDataByGeo(this.props.latitude,this.props.longitude);
    }
  }

  render() {
    return null;
  }
}

export default WeatherData;