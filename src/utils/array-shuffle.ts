export function array_shuffle(array: any[]) {
  let randomIndex = 0
  for (let i = 0, n = array.length; i < n; i++) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    [array[randomIndex], array[i]] = [array[i], array[randomIndex]]
  }
  return array
}