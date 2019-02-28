export default {
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
};
