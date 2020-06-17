const offset = 10;
const side = { 1: "right", 2: "left", 3: "top", 4: "bottom" };

function generatePosition(data) {
  let computed = [];
  let positionArray = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      computed.push({ ...data[i], x: 0, y: 0 });
    } else {
      let elemIndex = findElementForNext(computed);
      let base = computed[elemIndex];
      let position = moveToASide(base, computed);

      for (let i = 0; i < computed.length && !position; i++) {
        elemIndex = (elemIndex + 1) % computed.length;
        base = computed[elemIndex];
        position = moveToASide(base, computed);
      }

      const diagonalElement = diagonalElementPoints(position);
      positionArray.push(position);
      console.log("diagonal", diagonalElement);
      computed.push({ ...data[i], ...position });
    }
  }
  for (let i in positionArray) {
    console.log("bbb", positionArray[i].x);
  }

  console.log("computed", computed);
  return computed;
}

function diagonalElementPoints({ x, y, width, height }) {
  return { x1: x, y1: y - height, x2: x + width, y2: y };
}

function findElementForNext(computed) {
  const randEleIndex = getRandomInt(0, computed.length - 1);
  return randEleIndex;
}

function findSide() {
  const sideNumber = getRandomInt(1, 4);
  console.log("sideNumber", sideNumber);
  return sideNumber;
}

function checkCollision({ x, y, width, height }, point) {
  const dPoints = diagonalElementPoints({ x, y, width, height });
  return pointInRect(dPoints, point);
}

const pointInRect = ({ x1, y1, x2, y2 }, { x, y }) =>
  x > x1 && x < x2 && y > y1 && y < y2;

function moveToASide(base, computed) {
  let sideNumber = findSide();
  const position = { x: 0, y: 0 };
  let isCollision = false;
  const sideSize = Object.keys(side).length;
  let tryCount = 0;

  do {
    switch (side[sideNumber]) {
      case "right":
        position.x = base.x + base.width + offset;
        console.log("hh", position.x);
        break;
      case "left":
        position.x = base.x - base.width - offset;
        break;
      case "top":
        position.y = base.y + base.height + offset;
        break;
      case "bottom":
        position.y = base.y - base.height - offset;
        break;
      default:
        throw Error(`side ${side} is not implemented`);
    }

    debugger;

    for (let item of computed) {
      isCollision = checkCollision(item, position);
      if (isCollision) break;
    }

    if (isCollision) {
      sideNumber = (sideNumber + 1) % sideSize;
      tryCount++;
    }
  } while (isCollision && tryCount < sideSize);
  console.log("position", position);
  return isCollision ? null : position;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generatePosition };
