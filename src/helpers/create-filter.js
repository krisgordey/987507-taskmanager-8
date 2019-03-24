export default (filter) => `<input
    type="radio"
    id="filter__${filter.name}"
    class="filter__input visually-hidden"
    name="filter"
    ${filter.name === `all` ? `checked` : ``}
    ${filter.amount === 0 ? `disabled` : ``}
  />
  <label for="filter__${filter.name}" class="filter__label">
    ${filter.name} <span class="filter__${filter.name}-count">${filter.amount}</span></label
  >`;
