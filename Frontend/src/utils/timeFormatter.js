export const timeFormatter = (str) => {
  let result;
    if (str) {
  const date = str.split("T")[0].split("-");
  const time = str.split("T")[1].split(":");
  result = {
    year: date[0],
    month: date[1],
    day: date[2],
    hour: time[0],
    minute: time[1],
  };
    }
  const blogTime =
    // result?.year +
    // " " +
    numToStrMonth(result?.month) +
    " " +
    result?.day +
    " " +
    result?.hour +
    ":" +
    result?.minute;
  // console.log("result:", blogTime);
  return blogTime;
};

export const numToStrMonth = (monthNo) => {
  switch (monthNo) {
    case "1":
      return "Jan";
    case "2":
      return "Feb";
    case "3":
      return "Mar";
    case "4":
      return "Apr";
    case "5":
      return "May";
    case "6":
      return "Jun";
    case "7":
      return "Jul";
    case "8":
      return "Aug";
    case "9":
      return "Sep";
    case "10":
      return "Oct";
    case "11":
      return "Nov";
    case "12":
      return "Dec";

    default:
      return "";
  }
};
