const create = (x, y) => {
  return { x, y };
};

const add = (v1, v2) => {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
};

const subtract = (v1, v2) => {
  return {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
  };
};

const angle = (v) => {
  const angle = Math.atan2(v.y, v.x);
  return (angle + 2 * Math.PI) % (2 * Math.PI);
};

const scale = (v, scalar) => {
  return {
    x: v.x * scalar,
    y: v.y * scalar,
  };
};

const dotProduct = (v1, v2) => {
  return v1.x * v2.x + v1.y * v2.y;
};

const length = (v) => {
  return Math.sqrt(v.x * v.x + v.y * v.y);
};

const normalize = (v) => {
  const len = length(v);
  return {
    x: v.x / len,
    y: v.y / len,
  };
};

const angleBetween = (v1, v2) => {
  const dot = dotProduct(v1, v2);
  const len1 = length(v1);
  const len2 = length(v2);
  const cosTheta = dot / (len1 * len2);
  return Math.acos(cosTheta);
};

const fromAngle = function (angleRads, magnitude) {
  return {
    x: Number((Math.cos(angleRads) * magnitude).toFixed(2)),
    y: Number((Math.sin(angleRads) * magnitude).toFixed(2)),
  };
};

const rotate = (v, angleRads) => {
  const cosTheta = Math.cos(angleRads);
  const sinTheta = Math.sin(angleRads);

  return {
    x: v.x * cosTheta - v.y * sinTheta,
    y: v.x * sinTheta + v.y * cosTheta,
  };
};

module.exports = {
  create,
  add,
  subtract,
  angle,
  scale,
  dotProduct,
  length,
  normalize,
  angleBetween,
  fromAngle,
  rotate,
};
