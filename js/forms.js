

const disableForm = (clasContainer, classAdd, toggleName) => {
  const container = document.querySelector(clasContainer);
  const formElement = container.querySelector('form');
  const fieldsetElements = container.querySelectorAll('fieldset');
  const selectElements = container.querySelectorAll('select');
  if (classAdd) {
    formElement.classList.add(classAdd);
  }
  if (toggleName) {
    for (let elem of fieldsetElements) {
      elem.setAttribute(toggleName, '');
    }
    for (let elem of selectElements) {
      elem.setAttribute(toggleName, '');
    }
  }
  return container;
};

export {disableForm};
