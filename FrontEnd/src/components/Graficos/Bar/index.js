import React from "react";
import { Chart } from "react-google-charts";

export default function Graph() {
  const data = [    ["Month", "Curso A", "Curso B"],
  ["JAN", 1000, 400],
  ["FEB", 1170, 460],
  ["MAR", 660, 1120],
  ["APR", 1030, 540],
  ["MAY", 1200, 200],
  ["JUN", 1000, 400],
  ["JUL", 1170, 460],
  ["AUG", 660, 1120],
  ["SEP", 1030, 540]
]

  const options = {
    chart: {
      title: "Inscritos",
      titleTextStyle: {
        fontSize: 18,
        color: "#0e3256",
        fontWeight: "bold",
        paddingLeft: 10
      }
    },
    legend: {
      textStyle: {
        color: "#0e3256",
        fontWeight: "bold"
      }
    },
    colors: ["#fb9815", "#0e3256"],
    bar: { groupWidth: "100%" },
    isStacked: true,
    hAxis: {
      textStyle: {
        color: "#0e3256",
        fontWeight: "bold"
      }
    }
  };

  return (
    <div className="content-graph">
      <Chart
        chartType="Bar"
        width="690px"
        height="270px"
        data={data}
        options={options}
      />
    </div>
  );
}
