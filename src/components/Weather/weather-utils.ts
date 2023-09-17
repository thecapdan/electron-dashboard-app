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

export { getClothing, getIcon, clothingImageMap, iconImageMap };
