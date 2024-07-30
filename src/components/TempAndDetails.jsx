
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  } = {},
  units,
}) => {
  
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: feels_like ? `${feels_like.toFixed()}°` : "N/A",
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: humidity ? `${humidity.toFixed()}%` : "N/A",
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: speed ? `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}` : "N/A",
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise || "N/A",
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset || "N/A",
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: temp_max ? `${temp_max.toFixed()}°` : "N/A",
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: temp_min ? `${temp_min.toFixed()}°` : "N/A",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center py-4 text-xl text-cyan-300">
        <p>{details || "No details available"}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between py-3">
        <img src={icon || "placeholder_icon_url"} alt="weather icon" className="w-20 md:w-24 lg:w-28" />
        <p className="text-4xl md:text-5xl lg:text-6xl">{temp ? `${temp.toFixed()}°` : "N/A"}</p>

        <div className="flex flex-col space-y-3 md:space-y-4 items-start mt-4 md:mt-0">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm md:text-base items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-10 text-sm md:text-base py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={24} className="md:size-30" />
            <p className="font-light ml-1">
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
