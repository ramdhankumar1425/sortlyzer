import { memo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useProvider } from "../context";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {},
};

function Chart() {
    const { arr, styleArr, isOn } = useProvider();

    const data = {
        labels: arr.map((_, idx) => idx),
        datasets: [
            {
                label: "Value",
                data: arr,
                backgroundColor: styleArr,
            },
        ],
    };

    return (
        <div
            style={{ height: window.innerHeight - 61 }}
            className="p-1 w-full bg-gray-900"
        >
            <Bar
                options={{
                    ...options,
                    animation: { duration: isOn ? 0 : 1000 },
                }}
                data={data}
            />
        </div>
    );
}

export default memo(Chart);
