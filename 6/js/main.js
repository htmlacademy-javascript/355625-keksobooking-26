import {createOffersArray} from './data.js';
import {renderCards} from './templates.js';
import {disableForm} from './forms.js';

disableForm('.map__filters-container', 'ad-form--disabled', 'disabled');
disableForm('.notice', 'ad-form--disabled', 'disabled');

const mapCanvas = document.querySelector('#map-canvas');
const objArr = createOffersArray(10);
const templateFull = renderCards(objArr[0]);
mapCanvas.append(templateFull);





