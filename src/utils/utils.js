export function validateDate(s) {
  s = convertDate(s, 'US');
  if (!/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/.test(s)) {
    return false;
  }
  const parts = s.split('/').map((p) => parseInt(p, 10));
  const d = new Date(parts[2], parts[0] - 1, parts[1]);

  return (
    d.getDate() === parts[1] &&
    d.getMonth() + 1 === parts[0] &&
    d.getFullYear() === parts[2]
  );
}

export function convertDate(s, fmt) {
  let s_splitted = s.split('-');
  if (fmt === 'US') {
    s = `${s_splitted[1]}/${s_splitted[2]}/${s_splitted[0]}`;
  } else {
    s = `${s_splitted[2]}/${s_splitted[1]}/${s_splitted[0]}`;
  }
  return s;
}

export function sortByKey(array, key) {
  return array.sort(function (a, b) {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
