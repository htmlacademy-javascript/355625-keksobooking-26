import {switchForm, setValidateAndFormSubmit} from './forms.js';
import {allFormsDisable, renderOffersFromServer} from './map.js';
import {renderSuccessMessage} from './templates.js';
import {getData} from './api.js';


switchForm(allFormsDisable, 'disabled');

getData(renderOffersFromServer);

setValidateAndFormSubmit(renderSuccessMessage);
