import { wire1, wire2 } from "./input_part1.js";

export const merge = (object1, object2) => {
  const mergedObject = { ...object1 };
  for (const [key, value] of Object.entries(object2)) {
    const isKeyPresent = key in mergedObject;
    mergedObject[key] = !isKeyPresent ? value : mergedObject[key] + value;
  }

  return mergedObject;
};

const update = function (coordinate) {
  return {
    increXAxis: () => merge(coordinate, { x: 1 }),
    increYAxis: () => merge(coordinate, { y: 1 }),
    decreXAxis: () => merge(coordinate, { x: -1 }),
    decreYAxis: () => merge(coordinate, { y: -1 }),
  };
};

const coordinatesUpdate = {
  U: "increYAxis",
  D: "decreYAxis",
  R: "increXAxis",
  L: "decreXAxis",
};

const wirePath = (directions) => {
  const everyInstance = new Set();
  let coordinates = { x: 0, y: 0 };
  for (const i of directions) {
    const steps = +i.slice(1);
    const operation = coordinatesUpdate[i[0]];
    for (let stepcount = 0; stepcount < steps; stepcount++) {
      const ins = update(coordinates);
      coordinates = ins[operation]();
      everyInstance.add(`${coordinates.x},${coordinates.y}`);
    }
  }

  return everyInstance;
};

export const intersectionPoint = (wire1, wire2) => {
  const path1 = wirePath(wire1);
  const path2 = wirePath(wire2);

  const intersections = [...path2].filter((coordinate) =>
    path1.has(coordinate)
  );

  return Math.min(
    ...intersections.map((coordinate) => {
      const [x, y] = coordinate.split(",").map(Number);
      return Math.abs(x) + Math.abs(y);
    })
  );
};

// console.log(intersectionPoint(wire1, wire2));
