// 디바이스체크
const ua = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

class AsyncArray /*extends Array*/ {
  constructor(arr) {
    this.data = arr; // In place of Array subclassing
  }

  filterAsync(predicate) {
    // Take a copy of the array, it might mutate by the time we've finished
    const data = Array.from(this.data);
    // Transform all the elements into an array of promises using the predicate
    // as the promise
    return (
      Promise.all(data.map((element, index) => predicate(element, index, data)))
        // Use the result of the promises to call the underlying sync filter function
        .then((result) => {
          return data.filter((element, index) => {
            return result[index];
          });
        })
    );
  }
}
const easeInOutQuad = (
  currentTime: number,
  start: number,
  change: number,
  duration: number
): number => {
  let newCurrentTime = currentTime;
  newCurrentTime /= duration / 2;

  if (newCurrentTime < 1) {
    return (change / 2) * newCurrentTime * newCurrentTime + start;
  }

  newCurrentTime -= 1;
  return (-change / 2) * (newCurrentTime * (newCurrentTime - 2) - 1) + start;
};

const smoothScroll = (duration, element, to, property = "scrollTop") => {
  const start = element[property];
  const change = to - start;
  const startDate = new Date().getTime();

  const animateScroll = () => {
    const currentDate = new Date().getTime();
    const currentTime = currentDate - startDate;

    element[property] = easeInOutQuad(currentTime, start, change, duration);

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element[property] = to;
    }
  };
  animateScroll();
};

export { ua, AsyncArray, smoothScroll };
