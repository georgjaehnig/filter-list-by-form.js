class FilterListByForm {

  static initForm() {
    window.addEventListener('hashchange', FilterListByForm.updateFormAndEntries)
    const formNode = document.querySelector('form.form-list-filter-js');
    Array.from(formNode.elements).forEach((elementNode) => {
      elementNode.addEventListener('change', FilterListByForm.updateUrlAndEntries);
    });
    FilterListByForm.updateFormAndEntries();
    formNode.scrollIntoView({ behavior: "smooth" });
  }

  static updateFormAndEntries() {
    FilterListByForm.updateFormFromUrl();
    FilterListByForm.updateEntries();
  };
  static updateUrlAndEntries() {
    FilterListByForm.updateUrlFromForm();
    FilterListByForm.updateEntries();
  };

  static updateFormFromUrl() {
    const url = new URL(document.URL);
    const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));

    const formNode = document.querySelector('form.form-list-filter-js');
    Array.from(formNode.elements).forEach((elementNode) => {
      if (!urlSearchParams.has(elementNode.name)) {
        return;
      }
      switch (elementNode.type) {
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

  static updateUrlFromForm() {
    const formNode = document.querySelector('form.form-list-filter-js');
    const urlSearchParams = new URLSearchParams();
    Array.from(formNode.elements).forEach((elementNode) => {
      switch (elementNode.type) {
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

  static updateEntries() {
    FilterListByForm.displayAllLi();
    const url = new URL(document.URL);
    const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));
    urlSearchParams.forEach((value, key) => {
      if (value == '1') {
        FilterListByForm.hideAllLiWithoutClass(key);
      } else {
        FilterListByForm.hideAllLiWithoutClass(key + '-' + value);
      }
    });
  }

  static displayAllLi() {
    const liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    liNodes.forEach((liNode) => {
      liNode.style.display = 'list-item';
    });
  }

  static hideAllLiWithoutClass(className) {
    const liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    liNodes.forEach((liNode) => {
      if (!liNode.classList.contains(className)) {
        liNode.style.display = 'none';
      }
    });
  }
}