class FilterListByForm {

  constructor() {
    window.addEventListener('hashchange', this.updateFormAndEntries)
    this.initForm();
  }

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
    const liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    liNodes.forEach((liNode) => {
      liNode.style.display = 'list-item';
    });
  }

  hideAllLiWithoutClass(className) {
    const liNodes = document.querySelectorAll('ul.form-list-filter-js li');
    liNodes.forEach((liNode) => {
      if (!liNode.classList.contains(className)) {
        liNode.style.display = 'none';
      }
    });
  }

  updateFormAndEntries() {
    this.updateFormFromUrl();
    this.updateEntries();
  };
  updateUrlAndEntries() {
    this.updateUrlFromForm();
    this.updateEntries();
  };

  initForm() {
    const formNode = document.querySelector('form.form-list-filter-js');
    Array.from(formNode.elements).forEach((elementNode) => {
      //elementNode.addEventListener('change', this.updateUrlFromForm);
      //elementNode.addEventListener('change', this.updateUrlAndEntries);
      elementNode.addEventListener('change', this.updateEntries);
    });
    this.updateFormAndEntries();
    formNode.scrollIntoView({ behavior: "smooth" });
  }
}
