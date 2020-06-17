const offset = 10;

function generatePosition(data) {
  let computed = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      computed.push({ ...data[i], x: 0, y: 0 });
    } else {
      const base = findElementForNext(computed);
      const position = moveToASide(base);
      computed.push({ ...data[i], ...position });
    }
  }
  console.log('computed',computed);
  return computed;
}

function findElementForNext(computed) {
  const randEleIndex = getRandomInt(0, computed.length - 1);
  return computed[randEleIndex];
}

function findSide() {
  const side = { 1: "right", 2: "left", 3: "top", 4: "bottom" };
  const sideNumber = getRandomInt(1, 4);
  console.log('sideNumber',sideNumber);
  return side[sideNumber];
}

function moveToASide(base) {
  const side = findSide();
  const position = { x: 0, y: 0 };
  switch (side) {
    case "right":
      position.x = base.x + base.width + offset; break;
    case 'left':
      position.x = base.x - base.width - offset; break;
    case 'top':
      position.y = base.y + base.height + offset; break;
    case 'bottom':
      position.y = base.y - base.height - offset; break;
    default: throw Error(`side ${side} is not implemented`);

  }
  return position;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generatePosition };
