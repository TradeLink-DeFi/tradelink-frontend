export const convertTZ = (date: Date, tzString = "Asia/Bangkok") => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: tzString,
    })
  );
}

export const diffDateMin = (date: Date) => {
  const now = new Date();
  const diff = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diff / (1000 * 60));
  return diffDays;
}