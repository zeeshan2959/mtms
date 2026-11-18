const r = 32;
const f = 24;
const W = 1000;
const H = 500;
const stepX = 505;
const stepY = 112;

const path = `M ${r} 0 L ${stepX - r} 0 A ${r} ${r} 0 0 1 ${stepX} ${r} L ${stepX} ${stepY - f} A ${f} ${f} 0 0 0 ${stepX + f} ${stepY} L ${W - r} ${stepY} A ${r} ${r} 0 0 1 ${W} ${stepY + r} L ${W} ${H - r} A ${r} ${r} 0 0 1 ${W - r} ${H} L ${r} ${H} A ${r} ${r} 0 0 1 0 ${H - r} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;

console.log('Path string:');
console.log(path);
