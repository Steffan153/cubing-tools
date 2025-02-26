const plls = [
  ['Aa', '010122331203'],
  ['Ab', '212320133001'],
  ['F', '111203032320'],
  ['Ga', '101233012320'],
  ['Gb', '131203022310'],
  ['Gc', '121203012330'],
  ['Gd', '131213002320'],
  ['Ja', '111223002330'],
  ['Jb', '000122311233'],
  ['Ra', '030112321203'],
  ['Rb', '232320103011'],
  ['T', '131223012300'],
  ['E', '210123032301'],
  ['Na', '133022311200'],
  ['Nb', '331220113002'],
  ['V', '311220103032'],
  ['Y', '301220133012'],
  ['H', '131202313020'],
  ['Ua', '121232313000'],
  ['Ub', '131212323000'],
  ['Z', '010101232323'],
];

const $ = (x) => document.querySelector(x);
const $$ = (x) => document.querySelectorAll(x);
const $_ = (x) => document.createElement(x);

const all = [];

plls.forEach(([name, pat]) => {
  const angles = [0, 3, 6, 9]
    .map((x) => (pat + pat).slice(x, x + 6))
    .map((x) => [x, [...x].map((y) => (y - x[0] + 4) % 4).join('')])
    .filter((x, i, a) => i === a.findIndex((y) => y[1] === x[1]))
    .map((x) => x[0]);

  const tr = $_('tr');

  const n = $_('td');
  n.innerText = name;

  const offset = (Math.random() * 4) | 0;

  tr.append(
    n,
    ...angles.map((angle) => {
      all.push([name, angle]);
      const td = $_('td');

      const cube = $_('div');
      cube.className = 'cube-container small-cube';

      const [a, b, c, d, e, f] = [...angle].map((x) => `<div class="${['green', 'orange', 'blue', 'red'][(+x + offset) % 4]}"></div>`);

      const y = `<div class="yellow"></div>`;

      cube.innerHTML = `
        <div class="cube">
          <div class="face top">
            ${y.repeat(9)}
          </div>
          <div class="face front">
            ${a} ${b} ${c}
          </div>
          <div class="face right">
            ${d} ${e} ${f}
          </div>
        </div>
      `;

      td.append(cube);
      return td;
    })
  );

  for (let i = 4 - angles.length; i--; ) tr.append($_('td'));

  $('.plls tbody').append(tr);
});
