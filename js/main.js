import {createOffersArray} from './data.js';
import {renderCards} from './templates.js';


const mapCanvas = document.querySelector('#map-canvas');
const objArr = createOffersArray(10);
const templateFull = renderCards(objArr[0]);
mapCanvas.append(templateFull);



