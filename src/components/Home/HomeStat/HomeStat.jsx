function HomeStat(props) {
  const { title, stat, additional } = props;

  return (
    <div className="flex flex-col items-center justify-center w-[220px] h-[200px] border rounded-3xl shadow-lg">
      <h1 className="text-6xl font-bold text-green">{stat}</h1>
      <h4 className="font-medium text-xl">{title}</h4>
      <div className="flex gap-2 items-center mt-6">
        <ChartBarSquareIcon className="h-8 w-8 text-secondary" />
        <div className="w-[2px] h-full rounded-lg bg-gray" />
        <p className="text-gray-dark text-sm">+{additional} in 7 days </p>
      </div>
    </div>
  );
}

export default HomeStat;

import { ChartBarSquareIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

HomeStat.propTypes = {
  title: PropTypes.string,
  stat: PropTypes.string,
  additional: PropTypes.string,
};
