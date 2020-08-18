import React from 'react';
import { scaleLinear, max } from 'd3';
import { barChartData } from '../../testData';
import { Bar } from './Bar';

export const BarChart = ({
  positionX,
  positionY,
  height,
  selectedGroup,
  barColor,
}: any) => {
  const margin = { top: 20, right: 20, bottom: 30, left: 45 };
  const barChartHeight = height - margin.top - margin.bottom;

  const selectedData = barChartData.filter(
    (datum) => datum.group === selectedGroup
  );

  const barTextStyle = {
    fontSize: '1px',
  };

  const y = scaleLinear()
    //@ts-ignore
    .domain([0, max(selectedData, (d) => d.measure)])
    .range([barChartHeight, 0]);

  return (
    <g transform={`translate(${positionX}, ${positionY}) scale(1, -1)`}>
      <text
        x={12}
        y={-34}
        textAnchor='start'
        transform={`scale(1, -1)`}
        style={barTextStyle}
      >
        {selectedData[0].group}
      </text>
      {selectedData.map((datum, index) => {
        return (
          <Bar
            key={index}
            x={index * 8}
            y={0}
            width={7.8}
            height={(barChartHeight - y(datum.measure)) / 2}
            color={barColor}
            count={datum.measure}
          />
        );
      })}
      {selectedData.map((datum, index) => {
        return (
          <text
            key={index}
            x={index * 8 + 3.9}
            y={-3.5}
            textAnchor='middle'
            transform={`scale(1, -1)`}
            style={barTextStyle}
          >
            {datum.category}
          </text>
        );
      })}
    </g>
  );
};
