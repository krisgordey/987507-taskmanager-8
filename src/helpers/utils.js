export default {
  getRandomBoolean: () => Math.random() >= 0.5,
  getRandomArrayElement: (myArray) => myArray[Math.floor(Math.random() * myArray.length)],
  makeShuffledArray: (arr) => {
    const newArr = [...arr];
    let j;
    let temp;
    for (let i = newArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  },
  getRandomInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  createElement: (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  },
  makeRandomCount: (max, min) => Math.floor(Math.random() * (max - min + 1)) + min,
  getRandomColorHex: () => {
    const hex = `0123456789ABCDEF`;
    let color = `#`;
    for (let i = 1; i <= 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  notifyError(errorText) {
    const template = `<div class="global-notify"><span class="global-notify__text">${errorText}</span></div>`;
    const errorNode = this.createElement(template);

    document.body.appendChild(errorNode);

    setTimeout(() => {
      document.body.removeChild(errorNode);
    }, 5000);
  }
};
