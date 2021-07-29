## object 深度合并

```js
const obj1 = {
  a: 1,
  b: 2,
  obj: {
    x: 'x',
    y: 'y',
  },
  arr: [
    { l: 'l', m: 'm' },
    { l: 'l', m: 'm' },
    { l: 'l', m: 'm' },
  ],
}
const obj2 = {
  a: 2,
  c: 3,
  obj: {
    x: 'xA',
    z: 'z',
  },
  arr: [
    { l: 'l', n: 'n' },
    { l: 'l1', m: 'm1', n: 'n1' },
  ],
}
console.log('obj1', obj1, 'obj2', obj2)

function deepAssign(one, two) {
  const newObj = JSON.parse(JSON.stringify(one))
  Object.keys(two).forEach(key => {
    if (!newObj.hasOwnProperty(key)) {
      newObj[key] = two[key]
    } else {
      if (two[key] instanceof Object) {
        newObj[key] = deepAssign(newObj[key], two[key])
      } else if (two[key] instanceof Array) {
        two[key].forEach((item, index) => {
          if (newObj[key][index]) {
            newObj[key][index] = deepAssign(newObj[key][index], two[key][index])
          } else {
            newObj[key].push(two[key][index])
          }
        })
      } else {
        newObj[key] = two[key]
      }
    }
  })
  return newObj
}

const result = deepAssign(obj1, obj2)
console.log('result', result)

// result
// {
//   a: 2,
//   b: 2,
//   c: 3,
//   arr: [
//     {l: "l", m: "m", n: "n"},
//     {l: "l1", m: "m1", n: "n1"},
//     {l: "l", m: "m"},
//   ],
//   obj: {
//     x: "xA",
//     y: "y",
//     z: 'z'
//   }
// }

```
