import React, { Component } from 'react';

class LocaleUser extends Component {
    myMap = () => {
        const mapProp= {
            center: new google.maps.LatLng(51.508742,-0.120850),
            zoom:5,
        };
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    componentDidMount() {
        this.myMap()
    }
    
    render() {
        return (
            <div>
                <h1>My First Google Map</h1>
                <div id="googleMap" style={{width: '400px', height: '400px'}}></div>
            </div>
        );
    }
}

export default LocaleUser;