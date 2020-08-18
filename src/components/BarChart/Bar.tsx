import React from 'react';
import { select } from 'd3';

const animateRect = (
  rectRef: any,
  height: any,
  color: any,
  countTextRef: any
) => {
  const rect = select(rectRef.current);
  rect
    .transition()
    .duration(650)
    .attr('height', height + 0.5)
    .attr('fill', color);
  const text = select(countTextRef.current);
  text
    .transition()
    .duration(650)
    .attr('y', (4 + height) * -1);
};

export const Bar = ({ x, y, width, height, color, count }: any) => {
  const rectRef = React.createRef<any>();
  const countTextRef = React.createRef<any>();

  React.useEffect(() => {
    animateRect(rectRef, height, color, countTextRef);
  }, [rectRef, height, color, countTextRef]);

  return (
    <g>
      <rect x={x} y={y + 5} width={width} ref={rectRef} />
      <text
        x={x + 3.9}
        transform='scale(1, -1)'
        fill='white'
        textAnchor='middle'
        className=''
        ref={countTextRef}
      >
        {Math.round(count)}
      </text>
    </g>
  );
};
