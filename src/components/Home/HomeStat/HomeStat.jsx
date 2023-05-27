import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartBarSquareIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

ChartJS.register(...registerables);
function HomeStat(props) {
	const { title, stat, additional, options, data, days } = props;

	return (
		<article key={title} className="flex flex-col space-y-2 items-center">
			<h3 className="text-[20px]">{title}</h3>
			<h1 className="text-[#00bd4f] font-bold text-[36px]">{stat}</h1>
			<Bar className="w-[100px]" options={options} data={data} />
			<figure className="border-[5px] rounded-full border-[#6b6b6b] bg-gray-primary w-full" />
			<p>
				{additional} in {days} days
			</p>
		</article>
	);
}

export default HomeStat;

HomeStat.propTypes = {
	title: PropTypes.string,
	stat: PropTypes.string,
	additional: PropTypes.string,
	options: PropTypes.object,
	data: PropTypes.object,
	days: PropTypes.number,
};
