import React, { Component } from 'react';

import './map.scss';

class Map extends Component {
  componentDidMount() {
    this.map = this.createMap();
    this.props.markers.forEach((element, key) => this.createMarker(element, key));
    if (this.props.markerContact) {
      this.setMarker();
    }
  }

  style = () => ({
    height: this.props.contacts ? 366 : 350,
    width: '100%',
  });

  shouldComponentUpdate() {
    return false;
  }

  setMarker = () => {
    const { position, title } = this.props.markerContact;
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      draggable: false,
      title,
    });
  };

  createMap() {
    const mapOptions = {
      disableDefaultUI: true,
      zoomControl: true,
      zoom: this.props.zoom,
      query: 'Zubustik',
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: this.mapCenter(),
    };
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  mapCenter() {
    return new google.maps.LatLng(this.props.initialCenter.lat, this.props.initialCenter.lng);
  }

  createMarker(position, key) {
    return new google.maps.Marker({
      position,
      map: this.map,
      draggable: false,
      label: `${key + 1}`,
    });
  }

  render() {
    const styled = this.style();
    return (
      <div>
        {this.props.contacts ? (
          <div className="map-container">
            <div className="placeDiv">
              <div className="placecard__container">
                <div className="placecard__left">
                  <p className="placecard__business-name">Зубастик</p>
                  <p className="placecard__info">ул. Шолуденко, 1б, Киев, 01032</p>
                  <a
                    rel="noopener noreferrer"
                    className="placecard__view-large"
                    target="_blank"
                    href="https://www.google.com.ua/maps/place/%D0%97%D1%83%D0%B1%D0%B0%D1%81%D1%82%D0%B8%D0%BA+-+%D0%B1%D0%B8%D0%BB%D0%B5%D1%82%D1%8B+%D0%BD%D0%B0+%D0%B0%D0%B2%D1%82%D0%BE%D0%B1%D1%83%D1%81+%D0%BF%D0%BE+%D1%87%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D0%B9+%D1%86%D0%B5%D0%BD%D0%B5/@50.4519659,30.4753413,17.25z/data=!4m5!3m4!1s0x40d4cef3101898c3:0x6c517aa841e95016!8m2!3d50.452025!4d30.4771732"
                    id="A_41"
                  >
                    Увеличить карту
                  </a>
                </div>
                <div className="placecard__right">
                  <a
                    rel="noopener noreferrer"
                    className="placecard__direction-link"
                    target="_blank"
                    href="https://www.google.com/maps/dir//%D1%83%D0%BB.+%D0%A8%D0%BE%D0%BB%D1%83%D0%B4%D0%B5%D0%BD%D0%BA%D0%BE,+1%D0%91,+%D0%9A%D0%B8%D0%B5%D0%B2/@50.4515131,30.475864,17.25z/data=!4m8!4m7!1m0!1m5!1m1!1s0x40d4ce8650d8309f:0x3938b08f34ecaaae!2m2!1d30.4771731!2d50.452025?hl=ru"
                    id="A_9"
                  >
                    <div className="placecard__direction-icon" />
                    Направление
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div classID="map" style={styled} ref="mapCanvas" />
      </div>
    );
  }
}

export default Map;
