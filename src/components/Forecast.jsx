
import React from "react";

const Forecast = ({ title, data, isHourly }) => {
  return (
    <div className="my-6">
      <div className="flex items-center justify-start mb-4">
        <p className="font-medium uppercase text-lg text-white">{title}</p>
      </div>
      <hr className="my-2" />
      <div
        className={`flex ${isHourly ? "overflow-x-scroll whitespace-nowrap space-x-4" : "flex-col space-y-4"} max-w-full`}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex ${isHourly ? "flex-col items-center" : "flex-row items-center justify-between"} p-4 bg-white bg-opacity-10 rounded-md shadow-md`}
            style={{ minWidth: isHourly ? "100px" : "auto" }}
          >
            {isHourly ? (
              <div className="flex flex-col items-center">
                <p className="text-sm font-light text-white">{item.title}</p>
                <img src={item.icon} alt="weather icon" className="w-12 h-12 my-1" />
                <p className="font-medium text-white">{`${item.temp.toFixed()}°`}</p>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full text-white text-sm">
                <span>{item.date}</span>
                <img src={item.icon} alt="weather icon" className="w-8 h-8 mx-2" />
                <span>{`${item.temp.toFixed()}°`}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
