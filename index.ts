const robotWalk = (travelPath: number[]): [number, number] => {

    if (!travelPath) {
        throw new Error("Parameter 'travelPath' must be an array of positive intergers");
    }

    if (travelPath.length === 0) {
        return [0, 0];
    }

    // up, right, down, left
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let directionIndex = 0;

    let x = 0;
    let y = 0;

    // track path traveled history, start at [0, 0]
    const history = new Set([`${x},${y}`]);

    // chose for loop over for..of due to performance
    for (let pathIndex = 0; pathIndex <= travelPath.length; pathIndex++) {

        if (travelPath[pathIndex] < 0) {
            throw new Error("path array must not contain negative values");
        }

        for (let coordinate = 0; coordinate < travelPath[pathIndex]; coordinate++) {
            x += directions[directionIndex][0];
            y += directions[directionIndex][1];

            if (history.has(`${x},${y}`)) {
                return [x, y];
            }

            history.add(`${x},${y}`);
        }

        // Bump to next direction on list
        directionIndex = (directionIndex + 1) % 4;
    }

    return [x, y];
}

const example1 = [1, 2, 4];
const example2 = [1, 2, 4, 1, 5];
const example3 = [1, 2, 4, 2, 5];
const example4 = [0, 0, 0, 2]; // TODO: ask if the robot doesn't move on an iteration, should that be considered a collision?
const example5 = [1, 2, 4, 5, 5];
const example6 = [1, 0, 0, 2];
const example7 = [0, -1];

console.log("Expected: [2, -3]", "Actual: ", robotWalk(example1));
console.log("Expected: [1, 1]", "Actual: ", robotWalk(example2));
console.log("Expected: [0, 0]", "Actual: ", robotWalk(example3));
console.log("Expected: [-2, 0]", "Actual: ", robotWalk(example4));
console.log("Expected: [-3, 2]", "Actual: ", robotWalk(example5));
console.log("Expected: [-2, 1]", "Actual: ", robotWalk(example6));
console.log("Should throw error", robotWalk(example7));
