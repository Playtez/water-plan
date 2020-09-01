import React from 'react';
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from 'd3';

interface IProps {}

export const MyD3Component = (props: IProps) => {
  const [data, setData] = React.useState<Array<any>>([
    25,
    30,
    45,
    60,
    20,
    65,
    70,
  ]);
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale);

    svg
      .select('.x-axis-bottom')
      .style('transform', 'translateY(100%)')
      // @ts-ignore
      .call(xAxis);

    const yAxis = axisRight(yScale);

    svg
      .select('.y-axis-bottom')
      .style('transform', 'translateX(100%)')
      //@ts-ignore
      .call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      //@ts-ignore
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll('.line')
      .data([data])
      .join('path')
      .attr('class', 'line')
      .attr('class', 'h-full w-full')
      .attr('d', myLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <div>
      <svg className='overflow-visible h-full' ref={svgRef}>
        <g className='y-axis-bottom' />
        <g className='x-axis-bottom' />
      </svg>
      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        update
      </button>
      <button>filter</button>
    </div>
  );
};
