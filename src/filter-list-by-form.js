const main = function () {
  window.addEventListener('hashchange', updateFormAndEntries)
  initForm();
}

const initForm = function () {
  formNode = document.querySelector('form.form-list-filter-js');
  Array.from(formNode.elements).forEach((elementNode) => {
    elementNode.addEventListener('change', updateUrlAndEntries);
  });
  updateFormAndEntries();
  formNode.scrollIntoView({ behavior: "smooth" });
}

const updateFormAndEntries = function () {
  updateFormFromUrl();
  updateEntries();
};
const updateUrlAndEntries = function () {
  updateUrlFromForm();
  updateEntries();
};

const updateFormFromUrl = function () {
  const url = new URL(document.URL);
  const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));

  const formNode = document.querySelector('form.form-list-filter-js');
  Array.from(formNode.elements).forEach((elementNode) => {
    if (!urlSearchParams.has(elementNode.name)) {
      return;
    }
    switch(elementNode.type) {
      case 'checkbox':
        elementNode.checked = JSON.parse(urlSearchParams.get(elementNode.name));
        break;
      case 'select-one':
        elementNode.value = urlSearchParams.get(elementNode.name);
        break;
      default:
    }
  });
}

const updateUrlFromForm = function () {
  const formNode = document.querySelector('form.form-list-filter-js');
  const urlSearchParams = new URLSearchParams();
  Array.from(formNode.elements).forEach((elementNode) => {
    switch(elementNode.type) {
      case 'checkbox':
        if (elementNode.checked) {
          urlSearchParams.set(elementNode.name, 1);
        } 
        break;
      case 'select-one':
        if (elementNode.value != '') {
          urlSearchParams.set(elementNode.name, elementNode.value);
        }
        break;
      default:
    }
  });
  const url = new URL(document.URL);
  url.hash = urlSearchParams.toString();
  window.history.replaceState(null, null, url.href);

}

const updateEntries = function () {
  displayAllLi();
  const url = new URL(document.URL);
  const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));
  urlSearchParams.forEach((value, key) => {
    if (value == '1') {
    console.log(value);
      hideAllLiWithoutClass(key);
    } else {
      hideAllLiWithoutClass(key + '-' + value);
    }
  });
}

function displayAllLi() {
  liNodes = document.querySelectorAll('ul.form-list-filter-js li');
  liNodes.forEach((liNode) => {
    liNode.style.display = 'list-item';
  });
}

function hideAllLiWithoutClass(className) {
  liNodes = document.querySelectorAll('ul.form-list-filter-js li');
  liNodes.forEach((liNode) => {
    if (!liNode.classList.contains(className)) {
      liNode.style.display = 'none';
    }
  });
}

main();
