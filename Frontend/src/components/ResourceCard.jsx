// src/components/ResourceCard.jsx
import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

class ResourceCard extends Component {
  state = {
    showRounds: false,
    selectedRole: this.props.companyData.roles[0]?.role || "",
  };

  toggleRounds = () => {
    this.setState((prevState) => ({ showRounds: !prevState.showRounds }));
  };

  handleRoleChange = (e) => {
    this.setState({ selectedRole: e.target.value });
  };

  getTopicCounts(rounds, category) {
    const counts = {};
    rounds.forEach((round) => {
      round.topics.forEach((topic) => {
        if (typeof topic === "string") {
          if (topic.toLowerCase().includes(category.toLowerCase())) {
            counts[topic] = (counts[topic] || 0) + 1;
          }
        } else {
          Object.entries(topic).forEach(([key, value]) => {
            if (key.toLowerCase().includes(category.toLowerCase())) {
              value.forEach((t) => {
                counts[t] = (counts[t] || 0) + 1;
              });
            }
          });
        }
      });
    });
    return counts;
  }

  render() {
    const { companyData } = this.props;
    const { showRounds, selectedRole } = this.state;

    const roleObj = companyData.roles.find((r) => r.role === selectedRole);
    const rounds = roleObj?.interviewRounds || companyData.offCampus.rounds;

    const dsaCounts = this.getTopicCounts(rounds, "DSA");
    const csCounts = this.getTopicCounts(rounds, "CS_Fundamentals");

    const colorPalette = [
      "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
      "#9966FF", "#FF9F40", "#C9CBCF", "#FF6B6B",
      "#6BCB77", "#FFD93D", "#6A4C93", "#1982C4",
      "#FF595E", "#8AC926", "#FFCA3A", "#1982C4",
    ];

    const getColors = (num) => colorPalette.slice(0, num);

    const dsaChartData = {
      labels: Object.keys(dsaCounts),
      datasets: [
        {
          label: "DSA Topics Frequency",
          data: Object.values(dsaCounts),
          backgroundColor: getColors(Object.keys(dsaCounts).length),
        },
      ],
    };

    const csChartData = {
      labels: Object.keys(csCounts),
      datasets: [
        {
          label: "CS Fundamentals Topics Frequency",
          data: Object.values(csCounts),
          backgroundColor: getColors(Object.keys(csCounts).length),
        },
      ],
    };

    const chartOptions = (title) => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "right" },
        title: { display: true, text: title, font: { size: 18 } },
        datalabels: {
          color: "#fff",
          formatter: (value, context) => {
            const data = context.chart.data.datasets[0].data;
            const sum = data.reduce((a, b) => a + b, 0);
            const percentage = ((value / sum) * 100).toFixed(1) + "%";
            return percentage;
          },
          font: { weight: "bold", size: 14 },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label; // Only show topic name on hover
            },
          },
        },
      },
    });

    // Round-wise gradient colors for badges
    const gradients = [
  ["#012a4a", "#001f33"], // dark blue
  ["#145388", "#0b2b5c"], // darker blue/purple
  ["#c70039", "#8b0028"], // darker red
  ["#5f9e2a", "#3b6618"], // darker green
  ["#cc4f4f", "#8b3333"], // darker pink/red
];

    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">{companyData.company}</h2>

        <div className="mb-4">
          <label className="mr-2 font-semibold">Select Role:</label>
          <select
            value={selectedRole}
            onChange={this.handleRoleChange}
            className="p-2 border rounded"
          >
            {companyData.roles.map((r, idx) => (
              <option key={idx} value={r.role}>
                {r.role}
              </option>
            ))}
          </select>
        </div>

        <p className="text-gray-600 mb-2">
          <span className="font-semibold">CGPA Cutoff:</span>{" "}
          {roleObj?.cgpaCutoff || companyData.offCampus.cgpaCutoff}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">CTC:</span> {roleObj?.ctc || companyData.offCampus.ctc}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Eligibility:</span>{" "}
          {(roleObj?.eligibility || companyData.offCampus.eligibility).join(", ")}
        </p>

        <div className="flex gap-6 mt-6">
          <div className="flex-1 h-[400px]">
            {Object.keys(dsaCounts).length > 0 ? (
              <Pie data={dsaChartData} options={chartOptions("DSA Topics Frequency")} />
            ) : (
              <p className="text-gray-500 font-medium text-center mt-24">
                DSA topics not asked
              </p>
            )}
          </div>
          <div className="flex-1 h-[400px]">
            {Object.keys(csCounts).length > 0 ? (
              <Pie
                data={csChartData}
                options={chartOptions("CS Fundamentals Topics Frequency")}
              />
            ) : (
              <p className="text-gray-500 font-medium text-center mt-24">
                CS Fundamentals not asked
              </p>
            )}
          </div>
        </div>

        <button
          onClick={this.toggleRounds}
          className="mt-3 px-4 py-2 bg-[#034078] text-white rounded hover:bg-[#012a4a] transition-colors"
        >
          {showRounds ? "Hide Interview Rounds" : "Show Interview Rounds"}
        </button>

        {showRounds && (
          <div className="mt-6">
            {rounds.map((round, index) => {
              const [fromColor, toColor] = gradients[index % gradients.length];
              return (
                <div key={index} className="mb-6 relative pl-10">
                  {/* Vertical timeline line */}
                  <span
                    className="absolute left-4 top-0 w-1 h-full rounded"
                    style={{ background: `linear-gradient(${fromColor}, ${toColor})` }}
                  ></span>

                  {/* Round Header */}
                  <div className="flex items-center mb-3">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md"
                      style={{ background: `linear-gradient(to br, ${fromColor}, ${toColor})` }}
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-lg" style={{ color: fromColor }}>
                      {round.name}
                    </h3>
                  </div>

                  {/* Topics as badges */}
                  <div className="flex flex-wrap gap-2">
                    {round.topics.map((topic, idx) =>
                      typeof topic === "string" ? (
                        <span
                          key={idx}
                          className="text-white px-3 py-1 rounded-full text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
                          style={{ background: `linear-gradient(to right, ${fromColor}, ${toColor})` }}
                        >
                          {topic}
                        </span>
                      ) : (
                        Object.entries(topic).map(([key, value]) => (
                          <div key={key} className="w-full mt-2">
                            <p className="font-medium text-gray-700">{key}:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {value.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-white px-3 py-1 rounded-full text-sm shadow-md hover:scale-105 transition-transform cursor-pointer"
                                  style={{ background: `linear-gradient(to right, ${fromColor}, ${toColor})` }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ResourceCard;
