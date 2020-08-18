import React from 'react';
import { arc, PieArcDatum } from 'd3-shape';
import { select } from 'd3';

const animateSlice = (
  sliceRef: any,
  slice: any,
  innerRadius: any,
  outerRadius: any
) => {
  const el = select(sliceRef.current);
  const arcFinal3 = arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(slice.startAngle)
    .endAngle(slice.endAngle);
  //@ts-ignore
  el.select('path').transition().duration(600).attr('d', arcFinal3);
};

const sliceTextStyle = {
  fontSize: '1px',
  fontFamily: 'verdana',
};

type SliceComponentValue = PieArcDatum<number | { valueOf(): number }>;

export interface SliceComponentProps {
  key: number;
  index: number;
  value: SliceComponentValue;
  label: string;
  fill: string;
  onClickSlice: (label: any, fill: any, value: any) => void;
}

const SliceComponent = ({
  value,
  fill,
  label,
  onClickSlice,
}: SliceComponentProps) => {
  const sliceRef = React.createRef<any>();
  const [
    hoveredSlice,
    setHoveredSlice,
  ] = React.useState<SliceComponentValue | null>(null);
  const [
    unHoveredSlice,
    setUnHoveredSlice,
  ] = React.useState<SliceComponentValue | null>(null);

  const angle = (value: any | number) => {
    let a = ((value.startAngle + value.endAngle) * 90) / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  };

  const outerRadius = 15;
  const innerRadius = outerRadius / 2;

  const sliceArc = arc().innerRadius(innerRadius).outerRadius(outerRadius);

  React.useEffect(() => {
    if (hoveredSlice !== null) {
      const selectedInnerRadius = outerRadius * 0.4;
      animateSlice(sliceRef, hoveredSlice, selectedInnerRadius, outerRadius);
    }
    setUnHoveredSlice(null);
  }, [hoveredSlice, sliceRef]);

  React.useEffect(() => {
    if (unHoveredSlice !== null) {
      animateSlice(sliceRef, unHoveredSlice, innerRadius, outerRadius);
    }
    setHoveredSlice(null);
  }, [unHoveredSlice, sliceRef, innerRadius]);

  return (
    <g
      onClick={() => onClickSlice(label, fill, value)}
      onMouseEnter={() => setHoveredSlice(value)}
      onMouseLeave={() => setUnHoveredSlice(value)}
      ref={sliceRef}
    >
      <path
        //@ts-ignore
        d={sliceArc(value)}
        fill={fill}
      />
      <text
        //@ts-ignore
        transform={`translate(${sliceArc.centroid(value)}) rotate(${angle(
          value
        )})`}
        dy='.35em'
        textAnchor='middle'
        fill='white'
        style={sliceTextStyle}
        className='fill-current text-white-900'
      >
        {label}
      </text>
    </g>
  );
};

export default SliceComponent;
