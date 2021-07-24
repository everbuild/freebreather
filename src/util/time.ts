export function formatSecondsText(value, precision: 1 | 10 | 100 | 1000 = 1) {
  const sign = Math.sign(value);
  const minutes = Math.floor(value * sign / 60);
  const seconds = Math.round((value * sign % 60) * precision) / precision;
  return [
    sign < 0 && '-',
    minutes && `${minutes}m`,
    seconds && `${seconds}s`,
    !minutes && !seconds && '0',
  ].filter(Boolean).join(' ');
}

export function formatSecondsDigital(value) {
  const sign = Math.sign(value);
  const minutes = Math.floor(value * sign / 60);
  const seconds = Math.round(value * sign % 60);
  if (minutes === 0) {
    return seconds * sign;
  } else {
    return minutes * sign + ':' + `${seconds}`.padStart(2, '0');
  }
}