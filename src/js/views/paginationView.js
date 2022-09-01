import icons from 'url:../../img/icons.svg';
import View from './View.js';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage = 1;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (this._curPage === 1 && numPages > 1)
      return this._generateMarkupBtnNext();
    // Last page
    if (this._curPage === numPages && numPages > 1)
      return this._generateMarkupBtnPrev();
    // Other page
    if (this._curPage > 1 && this._curPage < numPages)
      return this._generateMarkupBtnPrev() + this._generateMarkupBtnNext();
    // Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupBtnPrev() {
    return `
      <button data-goto="${
        this._curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._curPage - 1}</span>
      </button>`;
  }
  _generateMarkupBtnNext() {
    return `
      <button data-goto="${
        this._curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
