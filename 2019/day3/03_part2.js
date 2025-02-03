import { coordinatesUpdate, update } from "./03_part1.js";
import { wire1, wire2 } from "./input_part2.js";

export const merge = (object1, object2) => {
  const mergedObject = { ...object1 };
  for (const [key, value] of Object.entries(object2)) {
    const isKeyPresent = key in mergedObject;
    mergedObject[key] = !isKeyPresent ? value : mergedObject[key] + value;
  }

  return mergedObject;
};

export const wirePath = (directions) => {
  const everyInstance = new Map();
  let coordinates = { x: 0, y: 0 };
  let tsteps = 0;
  for (const i of directions) {
    const steps = +i.slice(1);
    const operation = coordinatesUpdate[i[0]];
    for (let stepcount = 0; stepcount < steps; stepcount++) {
      const ins = update(coordinates);
      coordinates = ins[operation]();
      const key = `${coordinates.x},${coordinates.y}`;
      tsteps += 1;

      if (!everyInstance.has(key)) {
        everyInstance.set(key, tsteps);
      }
    }
  }

  return everyInstance;
};

export const lowestIntersection = (wire1, wire2) => {
  const path1 = wirePath(wire1);
  const path2 = wirePath(wire2);

  const commonPoints = [...path1.keys()].filter((key) => path2.has(key));
  const steps = commonPoints.map(
    (steps) => path1.get(steps) + path2.get(steps)
  );

  return Math.min(...steps);
};

console.log(lowestIntersection(wire1, wire2));

// lowest step taken by noth wire during intersection
