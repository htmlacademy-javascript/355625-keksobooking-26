import {modifyLngLatParam} from './utility.js';
import {dataOffers} from './api.js';
import {renderCards} from './templates.js';


let allFormsDisable = 'ad-form--disabled';
const resetButton = document.querySelector('.ad-form__reset');
const addressField = document.querySelector('[name="address"]');
const mapForm = document.querySelector('.map__filters');
const housingTypeField = mapForm.querySelector('#housing-type');
const priceTypeField = mapForm.querySelector('#housing-price');
const roomsTypeField = mapForm.querySelector('#housing-rooms');
const guestsTypeField = mapForm.querySelector('#housing-guests');
const featuresTypeField = mapForm.querySelector('#housing-features');
const checkedFeatures = mapForm.querySelectorAll('input[name="features"]:checked');

// map initialization
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinMarker = L.marker(
  {
    lat: 35.68278178393928,
    lng: 139.7533464431763,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
const map = L.map('map-canvas')
  .on('load', () => {
    allFormsDisable = '';
    addressField.setAttribute('readonly', '');
    addressField.value = modifyLngLatParam(pinMarker.getLatLng().lat, pinMarker.getLatLng().lng, 5);
  })
  .setView({
    lat: 35.67974904826333,
    lng: 139.77694988250735,
  }, 14);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
pinMarker.addTo(map);
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let allMarkers = L.layerGroup();

resetButton.addEventListener('click', () => {
  map.removeLayer(allMarkers);
  pinMarker.setLatLng({
    lat: 35.68278178393928,
    lng: 139.7533464431763,
  });

  map.setView({
    lat: 35.67974904826333,
    lng: 139.77694988250735,
  }, 14);

});
pinMarker.on('moveend', (evt) => {
  addressField.value = modifyLngLatParam(evt.target.getLatLng().lat, evt.target.getLatLng().lng, 5);
});


const checkFilterFields = (item) => {

  let isHousinTypeValue = false;
  let isPriceTypeValue = false;
  let isRoomTypeValue = false;
  let isGuestTypeValue = false;

  if (item.offer.type === housingTypeField.value) {
    isHousinTypeValue = true;
  }
  if (item.offer.price > 10000 && item.offer.price < 50000 && priceTypeField.value === 'middle') {
    isPriceTypeValue = true;
  }
  if (item.offer.price < 10000 && priceTypeField.value === 'low') {
    isPriceTypeValue = true;
  }
  if (item.offer.price > 50000 && priceTypeField.value === 'high') {
    isPriceTypeValue = true;
  }
  if (parseInt(item.offer.rooms) === parseInt(roomsTypeField.value)) {
    isRoomTypeValue = true;
  }
  if (parseInt(item.offer.guests) === parseInt(guestsTypeField.value)) {
    isGuestTypeValue = true;
  }


  return isHousinTypeValue && isPriceTypeValue && isRoomTypeValue && isGuestTypeValue;
};

const filteredObj = (data) => {
  return data.filter((item) => checkFilterFields(item));
};


const renderOffers = (data) => {

  mapForm.addEventListener('change', () => {

    filteredObj(data).forEach((item) => {
      console.log(filteredObj(data));
      let marker = L.marker(
        {
          lat: item.location.lat,
          lng: item.location.lng,
        },
        {
          icon,
        });

      marker
        .bindPopup(renderCards(item));

      allMarkers.addLayer(marker).addTo(map);
    });
  });
};

export {allFormsDisable, renderOffers};



