/**
 * Timezone utility functions for converting JST (Japan Standard Time) to local time
 */

/**
 * Parses a JST time string and converts it to the browser's local timezone
 * @param jstTimeString - Time string in JST format (e.g., "23:30", "01:00")
 * @param dateString - Optional date string in YYYY-MM-DD format. If not provided, uses today's date
 * @returns Object with local time string and JST time string
 */
export function parseJSTToLocal(
  jstTimeString: string,
  dateString?: string
): {
  localTime: string;
  jstTime: string;
  localDate: string;
  isDifferentDay: boolean;
} {
  if (!jstTimeString) {
    return {
      localTime: "",
      jstTime: "",
      localDate: "",
      isDifferentDay: false,
    };
  }

  // Parse the JST time
  const [hours, minutes] = jstTimeString.split(":").map(Number);

  // Create a date object in JST (UTC+9)
  // Use provided date or today's date
  const baseDate = dateString
    ? new Date(dateString + "T00:00:00Z")
    : new Date();

  // Create date in JST by setting UTC time and adding 9 hours offset
  const jstDate = new Date(
    Date.UTC(
      baseDate.getUTCFullYear(),
      baseDate.getUTCMonth(),
      baseDate.getUTCDate(),
      hours - 9, // Subtract 9 hours to get UTC from JST
      minutes,
      0
    )
  );

  // Get local time components
  const localHours = jstDate.getHours();
  const localMinutes = jstDate.getMinutes();

  // Format local time as HH:MM
  const localTime = `${localHours.toString().padStart(2, "0")}:${localMinutes.toString().padStart(2, "0")}`;

  // Get local date
  const localDate = jstDate.toLocaleDateString("en-CA"); // YYYY-MM-DD format

  // Check if the local date is different from the JST date
  const jstDateStr = baseDate.toLocaleDateString("en-CA");
  const isDifferentDay = localDate !== jstDateStr;

  return {
    localTime,
    jstTime: jstTimeString,
    localDate,
    isDifferentDay,
  };
}

/**
 * Formats time with timezone indicator
 * @param time - Time string in HH:MM format
 * @param showTimezone - Whether to show timezone abbreviation
 * @returns Formatted time string
 */
export function formatTime(time: string, showTimezone: boolean = false): string {
  if (!time) return "";

  if (showTimezone) {
    // Get timezone abbreviation
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzAbbr = new Date()
      .toLocaleTimeString("en-US", { timeZoneName: "short" })
      .split(" ")[2];

    return `${time} ${tzAbbr}`;
  }

  return time;
}

/**
 * Gets a human-readable time display with both local and JST times
 * @param jstTimeString - Time string in JST format
 * @param dateString - Optional date string
 * @returns Formatted string with local time and JST reference
 */
export function getTimeDisplay(
  jstTimeString: string,
  dateString?: string
): string {
  const { localTime, jstTime } = parseJSTToLocal(jstTimeString, dateString);

  if (!localTime || !jstTime) return "";

  // Check if local time is same as JST (user is in JST timezone)
  if (localTime === jstTime) {
    return `${localTime} JST`;
  }

  return `${localTime}`;
}
