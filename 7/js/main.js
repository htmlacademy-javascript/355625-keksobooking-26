import {createOffersArray} from './data.js';
import {renderCards} from './templates.js';
import {switchForm,validateForm} from './forms.js';


// class = 'ad-form--disabled'
switchForm('','disabled',1);


const mapCanvas = document.querySelector('#map-canvas');
const objArr = createOffersArray(10);
const templateFull = renderCards(objArr[0]);
mapCanvas.append(templateFull);

validateForm();



