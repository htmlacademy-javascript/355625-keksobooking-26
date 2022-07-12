import {createOffersArray} from './data.js';
import {assembleAllDataForTemplate, cardTemplate, cardFeaturesChildren} from './templates.js';

let objArr = createOffersArray(10);
let templateFull = assembleAllDataForTemplate(objArr, cardTemplate, cardFeaturesChildren);




