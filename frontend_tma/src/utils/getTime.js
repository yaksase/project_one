export default function getTime(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getUTCHours() === 0 ? '' : `${date.getUTCHours()} hours `;
  const minutes = date.getUTCMinutes() === 0 ? '' : `${date.getUTCMinutes()} minutes `;
  const seconds = date.getUTCSeconds() === 0? '' : `${date.getUTCSeconds()} seconds `;
  return hours + minutes + seconds;
}