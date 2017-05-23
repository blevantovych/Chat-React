import React, { Component } from 'react';

class LocaleUser extends Component {
    myMap = () => {
        const mapProp= {
            center: new google.maps.LatLng(this.props.lat, this.props.lng),
            zoom: 17,
        };
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        const marker = new google.maps.Marker({position:mapProp.center});
        marker.setMap(map);
    }
    componentDidMount() {
        this.myMap()
    }
    
    render() {
        return (
            <div class="map">
                <div id="googleMap" style={{width: '400px', height: '400px'}}></div>
            </div>
        );
    }
}

export default LocaleUser;