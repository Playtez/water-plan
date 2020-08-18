import React from 'react';
import { scaleOrdinal } from 'd3-scale';
import { pie } from 'd3-shape';
import { schemeCategory10 } from 'd3';

import { donutChartData } from '../../testData';
import SliceComponent from './SliceComponent';

const donutTextStyle = {
  fontSize: '2px',
  fontFamily: 'verdana',
};

const DonutComponent = (props: any) => {
  const { x, y, onChangeGroup } = props;

  //react hooks
  const [donutTitle, setDonutTitle] = React.useState('');
  const [textFill, setTextFill] = React.useState('');
  const [selectedCount, setSelectedCount] = React.useState<string | any>('');

  //slices d3 color definition
  const colorScale = scaleOrdinal(schemeCategory10);

  //main function responding to a click on a slice

  const onClickSlice = (label: any, fill: any, value: any) => {
    setDonutTitle(label);
    setSelectedCount(value.data);
    setTextFill(fill);
    onChangeGroup(label, fill);
  };

  //wrapper function for the pie chart to
  //render slices as ReactJs components

  //creation of the pie
  let pieChart = pie().sort(null);
  //creation of the data array from test data
  const measures = donutChartData.map((item) => item.measure);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {pieChart(measures).map((measure) => {
        const index = measure.index;
        return (
          <SliceComponent
            key={index}
            index={index}
            value={measure}
            label={donutChartData[index].group}
            fill={colorScale(index.toString())}
            onClickSlice={onClickSlice}
          />
        );
      })}
      <text
        x='0'
        y='-1.5em'
        textAnchor='middle'
        style={donutTextStyle}
        fill={textFill}
      >
        {donutTitle && (
          <tspan dy='1em' x='0.3em'>
            {donutTitle}
          </tspan>
        )}
        {selectedCount && (
          <tspan dy='1.5em' x='0.3em'>
            {selectedCount * 100}%
          </tspan>
        )}
      </text>
    </g>
  );
};

export default DonutComponent;
