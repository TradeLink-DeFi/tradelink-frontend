export const convertTZ = (date: Date, tzString = "Asia/Bangkok") => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
};

export const diffDateMin = (date: Date) => {
  const now = new Date();
  const diff = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diff / (1000 * 60));
  return diffDays;
};

export const formattedDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long", // Display the full weekday name
    day: "numeric", // Display the day of the month
    month: "short", // Display the abbreviated month name
    year: "numeric", // Display the full year
  });

export const formattedTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Set to false if you want 24-hour format
  });
