const input = [];

const merge = (object1, object2) => {
  const mergedObject = { ...object1 };
  for (const [key, value] of Object.entries(object2)) {
    const isKeyPresent = key in mergedObject;
    mergedObject[key] = !isKeyPresent ? value : mergedObject[key] + value;
  }

  return mergedObject;
};

const increYAxis = (ysteps) => ({ y: +ysteps.slice(1) });
const decreYAxis = (ysteps) => ({ y: -ysteps.slice(1) });
const increXAxis = (ysteps) => ({ x: +ysteps.slice(1) });
const decreXAxis = (ysteps) => ({ x: -ysteps.slice(1) });

const currentPosition = (coordinatesUpdate, axisUpdateObject, func) => {
  const anotherObject = func(axisUpdateObject);
  return merge(coordinatesUpdate, anotherObject);
};

const coordinatesUpdate = {
  U: increYAxis,
  D: decreYAxis,
  R: increXAxis,
  L: decreXAxis,
};

const wirePath = (directions) => {
  const everyInstance = [];
  let coordinates = { x: 0, y: 0 };
  for (const i of directions) {
    coordinates = currentPosition(coordinates, i, coordinatesUpdate[i[0]]);
    everyInstance.push(coordinates);
  }

  return everyInstance;
};

// console.log(intersectionPoint(["U7", "D4", "R6", "L4"]));

const wire1 = ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"];
const wire2 = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

const intersection = (wire1, wire2) => {
  const intersections = [];
  const path1 = wirePath(wire1);
  const path2 = wirePath(wire2);
  console.log(path1, path2);
};

console.log(intersection(wire1, wire2));
