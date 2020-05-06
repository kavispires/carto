/**
 * Shuffles list returning a new shuffled instance
 * @param {array} list
 * @returns {array}
 */
export const shuffle = (list) => {
  const res = [...list];
  res.sort(() => Math.random() - 0.5);
  return res;
};

/**
 * Get n number of items from an array
 * @param {array} list the array where items should be fetched from
 * @param {number} quantity the number of items to be returned
 * @returns {array}
 */
export const getRandomItems = (list, quantity) => {
  const shuffledList = shuffle(list);
  const res = new Array(quantity).fill(null);
  for (let i = 0; i < res.length; i++) {
    const item = shuffledList[i];
    res[i] = item;
  }
  return res;
};

/**
 * Gets random item from list of items
 * @param {array} items the list of items
 * @returns {any} a random item from list of items
 */
export const getRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
