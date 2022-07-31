import {switchForm, setValidateAndFormSubmit} from './forms.js';
import {allFormsDisable, renderOffers} from './map.js';
import {renderSuccessMessage} from './templates.js';
import {getData} from './api.js';


switchForm(allFormsDisable, 'readonly');

getData((offers) => {
  renderOffers(offers);
});

setValidateAndFormSubmit(renderSuccessMessage);
