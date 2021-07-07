export function formatSecondsText(value) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.round((value % 60) * 10) / 10;
  return [
    minutes && `${minutes}m`,
    (seconds || !minutes) && `${seconds}s`,
  ].filter(Boolean).join(' ');
}

export function formatSecondsDigital(value) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.round(value % 60);
  if (minutes === 0) {
    return seconds;
  } else {
    return minutes + ':' + `${seconds}`.padStart(2, '0');
  }
}