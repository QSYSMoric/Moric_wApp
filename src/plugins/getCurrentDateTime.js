function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds
    };
}
  
let nowDay = {
    getMonthDayHoursMinutesSeconds() {
        const datetime = getCurrentDateTime();
        return `${datetime.month}-${datetime.day} ${datetime.hours}:${datetime.minutes}`;
    },
    getHoursMinutesSeconds() {
        const datetime = getCurrentDateTime();
        return `${datetime.hours}:${datetime.minutes}`;
    } 
}
  
export default {
    getCurrentDateTime,
    nowDay
}