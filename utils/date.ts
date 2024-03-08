import dayjs from "dayjs";

export function formatUnixTimestamp(
  unix: number,
  format: string = "HH:mm, DD [tháng] M"
) {
  return dayjs(unix).format(format);
}

export const formatMinutesToTimeString = (minutes: number) => {
  const numOfHours = Math.floor(minutes / 60);
  const numOfMinutes = minutes % 60;

  if (numOfHours) {
    return `${numOfHours}h${numOfMinutes}p`;
  } else {
    return `${numOfMinutes} phút`;
  }
};
