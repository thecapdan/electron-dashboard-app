function getDayByDate(dateString: string): string {
  if (!dateString) {
    return "";
  }
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  if (inputDate.toDateString() === currentDate.toDateString()) {
    return "TODAY";
  } else if (inputDate.toDateString() === tomorrowDate.toDateString()) {
    return "TOMORROW";
  } else {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeekIndex = inputDate.getDay();
    return daysOfWeek[dayOfWeekIndex].toUpperCase();
  }
}

type Fixture = {
  fixture: {
    id: number;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: null | any; // You can replace 'any' with a more specific type if needed
      second: null | any; // You can replace 'any' with a more specific type if needed
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
  };
  league: {
    name: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: null | any; // You can replace 'any' with a more specific type if needed
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: null | any; // You can replace 'any' with a more specific type if needed
    };
  };
};

export { getDayByDate };
export type { Fixture };
