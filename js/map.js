import {modifyLngLatParam} from './utility.js';
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

const allMarkers = L.layerGroup().addTo(map);

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

  let isHousinTypeValue = true;
  let isPriceTypeValue = true;
  let isRoomTypeValue = true;
  let isGuestTypeValue = true;
  let isFeatureTypeValue = true;

  /*if (item.offer.type === housingTypeField.value) {
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
  }*/

  if (item.offer.type !== housingTypeField.value && housingTypeField.value !== 'any') {
    isHousinTypeValue = false;
  }
  if (item.offer.price < 10000 && item.offer.price > 50000 && priceTypeField.value === 'middle') {
    isPriceTypeValue = false;
  }
  if (item.offer.price > 10000 && priceTypeField.value === 'low') {
    isPriceTypeValue = false;
  }
  if (item.offer.price < 50000 && priceTypeField.value === 'high') {
    isPriceTypeValue = false;
  }
  if (parseInt(item.offer.rooms, 10) === parseInt(roomsTypeField.value, 10)) {
    isRoomTypeValue = false;
  }
  if (parseInt(item.offer.guests, 10) === parseInt(guestsTypeField.value, 10)) {
    isGuestTypeValue = false;
  }
  if (parseInt(item.offer.guests, 10) === parseInt(guestsTypeField.value, 10)) {
    isGuestTypeValue = false;
  }

/*  const checkedFeatures = document.querySelectorAll('input[name="features"]:checked');*/
  const checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
console.log(checkedFeatures);
  if (checkedFeatures.length !== 0) {

    checkedFeatures.forEach((elem) => {
      console.log(item);
      if (item.offer.features) {
        if (!item.offer.features.includes(elem.value)) {
          isFeatureTypeValue = false;
        }
      } else {
        isFeatureTypeValue = false;
      }

    });
  }


  return isHousinTypeValue && isPriceTypeValue && isRoomTypeValue && isGuestTypeValue && isFeatureTypeValue;
};

const filteredObj = (data) => {
  const arr = data.filter((item) => checkFilterFields(item));
  return arr.slice(0, 10);
};


const createPins = (data) => {
  filteredObj(data).forEach((item) => {
    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon,
      });

    marker
      .addTo(allMarkers)
      .bindPopup(renderCards(item));
  });
};

const renderOffers = (data) => {
  createPins(data);
};

/*const renderOffers = (data) => {

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
};*/

export {allFormsDisable, renderOffers, mapForm, createPins, allMarkers};



