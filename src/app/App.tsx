import React from 'react';
import DonutComponent from '../components/DonutChart/DonutComponent';
import { BarChart } from '../components/BarChart/BarChart';
// import LineChart from '../components/LineChart/LineChart';

const App = () => {
  // React hooks with common state values for all components
  const [selectedGroup, setSelectedGroup] = React.useState('All');
  const [groupColor, setGroupColor] = React.useState('lightgrey');

  //function that will hook into the state to change it

  const updateBarChart = (group: any, color: any) => {
    setSelectedGroup(group);
    setGroupColor(color);
  };

  console.log({ selectedGroup, groupColor });
  return (
    <div>
      <svg viewBox='-2 0 100 100' preserveAspectRatio='xMidYMid meet'>
        <DonutComponent x={15} y={20} onChangeGroup={updateBarChart} />
      </svg>
      <svg viewBox='0 0 100 100'>
        <BarChart
          positionX={35}
          positionY={50}
          width={80}
          height={100}
          selectedGroup={selectedGroup}
          barColor={groupColor}
        />
      </svg>
    </div>
  );
};

export default App;
