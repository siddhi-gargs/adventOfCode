const generateRange = (from, to, step) => {
  const range = [];
  for (let start = from; start !== to; start = start + step) {
    range.push(start);
  }

  range.push(to);
  return range;
};

const hasAdjacentDuplicate = (args) => {
  for (let i = 0; i < args.length - 1; i++) {
    const isAdjacentpairEqual = args[i] === args[i + 1];
    if (isAdjacentpairEqual) return true;
  }

  return false;
};

const isNonDecreasing = (args) => {
  for (let i = 0; i < args.length - 1; i++) {
    const isEqual = args[i] === args[i + 1];
    const isIncreasing = args[i] < args[i + 1];
    if (!isEqual && !isIncreasing) return false;
  }

  return true;
};

const meetsAllCriteria = (number) => {
  const splitDigit = number.toString().split("");
  if (splitDigit.length !== 6) return false;

  return isNonDecreasing(splitDigit) && hasAdjacentDuplicate(splitDigit);
};

const countValidNumInRange = (from, to) => {
  const series = generateRange(from, to, 1);
  const filtered = series.filter(meetsAllCriteria);
  return filtered.length;
};

console.log(countValidNumInRange(372037, 905157));
