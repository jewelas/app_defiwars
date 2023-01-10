export const pad = (number: number) => {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

export const getCurrentTime = (dt: Date) => {
  return dt.getUTCFullYear() +
    '-' + pad(dt.getUTCMonth() + 1) +
    '-' + pad(dt.getUTCDate()) +
    ' ' + pad(dt.getUTCHours()) +
    ':' + pad(dt.getUTCMinutes()) +
    ':' + pad(dt.getUTCSeconds());
}

export const getRemainingTime = (epoch: number) => {
  const now = Date.now() / 1000;
  let diff = epoch - now;
  if (now >= epoch) diff = 0;
  const day = Math.floor(diff / (60 * 60 * 24));
  diff %= (60 * 60 * 24);
  const hour = Math.floor(diff / (60 * 60));
  diff %= (60 * 60);
  const minute = Math.floor(diff / 60);
  diff %= 60;
  const second = Math.floor(diff);
  return (pad(day) + 'd ') +
    (pad(hour) + 'h ') +
    (pad(minute) + 'm ') +
    (pad(second) + 's');
}

export const formatAmount = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
