declare module "react-open-weather" {
  const ReactOpenWeather: any;
  export default ReactOpenWeather;

  // Declare the useOpenWeather function
  export function useOpenWeather(options: {
    key: string;
    lat: string;
    lon: string;
    lang: string;
    unit: string;
  }): {
    data: any;
    isLoading: boolean;
    errorMessage: string | null;
  };
}
