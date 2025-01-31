import { DateTime } from 'luxon'




const convertJSTtoUserDay = (broadcastInfo) => {
  const daysMap = {
      "Sundays": 7, "Mondays": 1, "Tuesdays": 2, "Wednesdays": 3,
      "Thursdays": 4, "Fridays": 5, "Saturdays": 6
  };

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Extract day from broadcastInfo
  const dayString = broadcastInfo?.day || (broadcastInfo?.string?.match(/\b(\w+days?)\b/)?.[1]) || "";
  const weekday = daysMap[dayString] || null;

  // Extract time from broadcastInfo
  const timeString = broadcastInfo?.time || (broadcastInfo?.string?.match(/\b\d{2}:\d{2}\b/)?.[0]) || "00:00";
  const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10) || 0);

  // Create JST DateTime (Assume broadcast is in JST)
  let jstDateTime = DateTime.now().setZone('Asia/Tokyo').startOf('week');  // Start from beginning of the week
  if (weekday) jstDateTime = jstDateTime.set({ weekday });  // Apply weekday if found
  jstDateTime = jstDateTime.set({ hour: hours, minute: minutes }); // Apply time

  // Convert to user's timezone
  const userDateTime = jstDateTime.setZone(userTimeZone);

  return { 
      userDateTimeString: userDateTime.isValid ? userDateTime.toLocaleString(DateTime.DATETIME_MED) : "Invalid DateTime",
      userTime: userDateTime.isValid ? userDateTime.toFormat('hh:mm a') : "Invalid Time",
      userWeekday: userDateTime.isValid ? userDateTime.toFormat('EEEE') : "Invalid Weekday"
  };
};
   

  export default convertJSTtoUserDay;