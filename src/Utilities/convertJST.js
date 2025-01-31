import { DateTime } from 'luxon'




const convertJSTtoUserDay = (broadcastInfo) => {

    const getWeekdayNumber = (dayString) => {
        const daysMap = {
            "Sundays": 7,
            "Mondays": 1,
            "Tuesdays": 2,
            "Wednesdays": 3,
            "Thursdays": 4,
            "Fridays": 5,
            "Saturdays": 6
        };
        return daysMap[dayString] || 7; // Default to Sunday if unknown
    };

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const dayString = broadcastInfo?.day || 
      (broadcastInfo?.string?.match(/(\w+days?)/)?.[1]) || "";
    
    const timeString = broadcastInfo?.string?.match(/at (\d{2}:\d{2})/)?.[1] || "00:00";
    
    const [hours, minutes] = timeString.split(':').map(Number);
    
    const jstDateTime = DateTime.local().setZone('Asia/Tokyo')
      .set({ 
        weekday: getWeekdayNumber(dayString),
        hour: hours, 
        minute: minutes,
        second: 0, 
        millisecond: 0 
      });
    
    const userDateTime = jstDateTime.setZone(userTimeZone);
    
    // Different return for each use case
    return {
      fullDisplay: `${userDateTime.toFormat("EEEE")} at ${userDateTime.toFormat("HH:mm")} (${userTimeZone})`,
      dayOnly: userDateTime.toFormat("EEEE").toLowerCase() + 's'
    };
  };

  export default convertJSTtoUserDay;