import {sendForm} from './forms.js';
import {modifyLngLatParam} from './utility.js';
import {createOffersArray} from './data.js';
import {renderCards} from './templates.js';



let allFormsDisable = 'ad-form--disabled';
const resetButton = sendForm.querySelector('.ad-form__reset');
const addressField = sendForm.querySelector('[name="address"]');
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
const objArr = createOffersArray(10);


const map = L.map('map-canvas')
  .on('load', () => {
    allFormsDisable = '';
    addressField.removeAttribute('disabled');
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

resetButton.addEventListener('click', () => {
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


const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


objArr.forEach((item) => {
  const marker = L.marker(
    {
      lat: item.location.lat,
      lng: item.location.lng,
    },
    {
      icon,
    });

  marker
    .addTo(map)
    .bindPopup(renderCards(item));
});


export {allFormsDisable};
