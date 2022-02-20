import dayjs, { Dayjs } from "dayjs";
import Timestamp from "../domain/Timestamp";

const formatTimestamp = (timestamp: Timestamp) => {
  const now = dayjs();
  const date = dayjs(timestamp.datetime);
  if (isDateWithinLastDay(now, date)) {
    return `${now.diff(date, "hours")} hours ago`;
  }
  if (isDateMoreThanOneYearAgo(now, date)) {
    return date.format("MMM DD YYYY");
  }
  return date.format("MMM DD");
};

const isDateWithinLastDay = (now: Dayjs, date: Dayjs): boolean => {
  return date.isAfter(now.subtract(1, "day"));
};

const isDateMoreThanOneYearAgo = (now: Dayjs, date: Dayjs): boolean => {
  return date.isBefore(now.subtract(1, "year"));
};

export default formatTimestamp;
