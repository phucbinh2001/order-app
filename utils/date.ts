import dayjs from "dayjs";

export function formatUnixTimestamp(unix: number) {
  return dayjs(unix).format("HH:mm, DD [tháng] M");
}
