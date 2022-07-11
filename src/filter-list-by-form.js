class FilterListByForm {

  constructor() {
    this.formNode = document.querySelector('form.form-list-filter-js');
    this.liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    this.addEventListeners();
    this.updateFormAndEntries();
  }

  addEventListeners() {
    window.addEventListener('hashchange', this.updateFormAndEntries);
    Array.from(this.formNode.elements).forEach((elementNode) => {
      elementNode.addEventListener('change', this.updateUrlAndEntries.bind(this));
    });
  }

  updateFormAndEntries() {
    this.formNode.scrollIntoView({ behavior: "smooth" });
    this.updateFormFromUrl();
    this.updateEntries();
  };

  updateUrlAndEntries() {
    this.updateUrlFromForm();
    this.updateEntries();
  };

  updateFormFromUrl() {
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
        default:
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
        this.hideAllLiWithoutClass(key + '-' + value);
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