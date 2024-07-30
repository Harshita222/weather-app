import React from "react";

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-center my-4 md:my-6">
        <p className="text-lg md:text-xl lg:text-2xl font-extralight">
          {formattedLocalTime}
        </p>
      </div>

      <div className="flex items-center justify-center my-2 md:my-4">
        <p className="text-xl md:text-3xl lg:text-4xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
