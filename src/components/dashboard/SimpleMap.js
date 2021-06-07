import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

class SimpleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: props.longitude,
            latitude: props.latitude,
            center: {
                lat: props.latitude,
                lng: props.longitude
            }
        }
    }

    render() {
        return (
        // Important! Always set the container height explicitly
        <div style={{ height: '91%', width: '140%' }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyA7d4zFhHL5TVGMtzxxxMi07b06mF5QgQM' }}
            defaultCenter={this.state.center}
            defaultZoom={16}
            >
            <Marker text={"Marker"} lat={this.state.latitude} lng={this.state.longitude} />
            <div lat={this.state.latitude} lng={this.state.longitude} style={{fontWeight:"bold", height: "15px", width: "100px", fontSize: "15px", marginTop: "5px", borderRadius: "10px"}}>Vị trí nạn nhân</div>
            </GoogleMapReact>
        </div>
        );
    }
}
 
export default SimpleMap;