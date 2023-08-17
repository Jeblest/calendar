import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear)
export const getMonth = (month = dayjs().month(),year=dayjs().year()) => {
  const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 1 - firstDayOfMonth;
  const daysMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(0).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
};

export const getWeek = (weekNumber=dayjs().week() ) => {
  const year = dayjs().year();
  const firstDayOfYear = dayjs(new Date(year, 0, 1));
  const firstDayOfWeek = firstDayOfYear.add(weekNumber - 1, "week");
  if (firstDayOfWeek.day() === 0) {
    firstDayOfWeek.add(1, "day");
  }
  const month = firstDayOfWeek.month();
  const week = firstDayOfWeek.date();
  let currentMonthCount = week;

  const daysOfWeek = new Array(7).fill(0).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, month, currentMonthCount));

  });
  return daysOfWeek;
};
