import coatImage from "../../resources/coat.png";
import hoodyImage from "../../resources/hoody.png";
import tShirtImage from "../../resources/tshirt.png";
import sunglassesImage from "../../resources/sunglasses.png";
import capImage from "../../resources/cap.png";
import umbrellaImage from "../../resources/tshirt.png";

const getClothing = (temperature: number) => {
  let clothing;

  switch (true) {
    case temperature < 10:
      clothing = "coat";
      break;
    case temperature >= 10 && temperature < 17:
      clothing = "hoody";
      break;
    default:
      clothing = "tshirt";
  }

  return clothing;
};

const clothingImageMap: Record<string, string> = {
  coat: coatImage,
  hoody: hoodyImage,
  tshirt: tShirtImage,
};

const getIcon = (percentageChance: number) => {
  if (percentageChance < 5) {
    return "sunglasses";
  } else if (percentageChance < 50) {
    return "cap";
  } else {
    return "umbrella";
  }
};

const iconImageMap: Record<string, string> = {
  sunglasses: sunglassesImage,
  cap: capImage,
  umbrella: umbrellaImage,
};

interface WeatherCondition {
  text: string;
}

interface WeatherHour {
  time: string;
  temp_c: number;
  chance_of_rain: number;
  condition: WeatherCondition;
}

interface WeatherDay {
  hour: WeatherHour[];
}

interface ForecastDay {
  date: string;
  hour: WeatherHour[];
}

interface WeatherData {
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface WeatherSummary {
  temperature: number | null;
  percentageChanceOfRain: number | null;
}

interface WeatherDataPoints {
  today9am: WeatherSummary;
  today4pm: WeatherSummary;
  tomorrow9am: WeatherSummary;
  tomorrow4pm: WeatherSummary;
}

function transformWeatherData(data: WeatherData): WeatherDataPoints {
  const today9am: WeatherSummary = {
    temperature: null,
    percentageChanceOfRain: null,
  };
  const today4pm: WeatherSummary = {
    temperature: null,
    percentageChanceOfRain: null,
  };
  const tomorrow9am: WeatherSummary = {
    temperature: null,
    percentageChanceOfRain: null,
  };
  const tomorrow4pm: WeatherSummary = {
    temperature: null,
    percentageChanceOfRain: null,
  };
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  data.forecast.forecastday.forEach((forecast) => {
    const date = new Date(forecast.date);

    if (date.getDate() === today.getDate()) {
      // Check for 9am and 4pm hours for today
      forecast.hour.forEach((hour) => {
        const hourTime = new Date(hour.time);
        if (hourTime.getHours() === 9) {
          today9am.temperature = Math.round(hour.temp_c);
          today9am.percentageChanceOfRain = hour.chance_of_rain;
        } else if (hourTime.getHours() === 16) {
          today4pm.temperature = Math.round(hour.temp_c);
          today4pm.percentageChanceOfRain = hour.chance_of_rain;
        }
      });
    } else if (date.getDate() === tomorrow.getDate()) {
      // Check for 9am and 4pm hours for tomorrow
      forecast.hour.forEach((hour) => {
        const hourTime = new Date(hour.time);
        if (hourTime.getHours() === 9) {
          tomorrow9am.temperature = Math.round(hour.temp_c);
          tomorrow9am.percentageChanceOfRain = hour.chance_of_rain;
        } else if (hourTime.getHours() === 16) {
          tomorrow4pm.temperature = Math.round(hour.temp_c);
          tomorrow4pm.percentageChanceOfRain = hour.chance_of_rain;
        }
      });
    }
  });

  return {
    today9am,
    today4pm,
    tomorrow9am,
    tomorrow4pm,
  };
}

export {
  getClothing,
  getIcon,
  clothingImageMap,
  iconImageMap,
  transformWeatherData,
};
