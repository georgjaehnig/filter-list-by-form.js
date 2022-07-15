class FilterListByForm {

  constructor() {
    this.formNode = document.querySelector('form.form-list-filter-js');
    this.liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    this.addEventListeners();
    this.updateFromUrl();
  }

  addEventListeners() {
    window.addEventListener('hashchange', this.updateFromUrl);
    Array.from(this.formNode.elements).forEach((elementNode) => {
      elementNode.addEventListener('change', this.updateFromForm.bind(this));
    });
  }

  updateFromUrl() {
    //this.formNode.scrollIntoView({ behavior: "smooth" });
    this.updateFormFromUrl();
    this.updateEntries();
    this.updateFormClasses();
  };

  updateFromForm() {
    this.updateUrlFromForm();
    this.updateEntries();
    this.updateFormClasses();
  };

  updateFormFromUrl() {
    const url = new URL(document.URL);
    const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));

    Array.from(this.formNode.elements).forEach((elementNode) => {
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

  updateUrlFromForm() {
    const urlSearchParams = new URLSearchParams();
    Array.from(this.formNode.elements).forEach((elementNode) => {
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
      }
    });
    const url = new URL(document.URL);
    url.hash = urlSearchParams.toString();
    window.history.replaceState(null, null, url.href);

  }

  updateEntries() {
    this.displayAllLi();
    const url = new URL(document.URL);
    const urlSearchParams = new URLSearchParams(url.hash.slice(1, 200));
    urlSearchParams.forEach((value, key) => {
      if (value == '1') {
        this.hideAllLiWithoutClass(key);
      } else {
        this.hideAllLiWithoutClass(key + '_' + value);
      }
    });
  }

  updateFormClasses() {
    Array.from(this.formNode.elements).forEach((elementNode) => {
      const label = document.querySelector('label[for="' + elementNode.name + '"');
      elementNode.classList.remove('used');
      label && label.classList.remove('used');
      switch (elementNode.type) {
        case 'checkbox':
          if (elementNode.checked) {
            elementNode.classList.add('used');
            label && label.classList.add('used');
          }
          break;
        case 'select-one':
          if (elementNode.value != '') {
            elementNode.classList.add('used');
            label && label.classList.add('used');
          }
          break;
      }
    });
  }

  displayAllLi() {
    this.liNodes.forEach((liNode) => {
      liNode.style.display = 'list-item';
    });
  }

  hideAllLiWithoutClass(className) {
    this.liNodes.forEach((liNode) => {
      if (!liNode.classList.contains(className)) {
        liNode.style.display = 'none';
      }
    });
  }
}