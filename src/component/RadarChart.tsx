import React from "react";
import { Text, View } from "react-native";
import { Line, Polygon, Svg } from "react-native-svg";
import { THEME } from "../styles/GlobalStyleSheet";

const RadarChart = ({ dataA, dataB, colorA, colorB }:any) => {
  const size = 220;
  const center = size / 2;
  const radius = 80;
  const keys = ['combat', 'survival', 'support', 'tactics', 'victory'];
  const labels = ['Combat', 'Survival', 'Support', 'Tactics', 'Win %'];

  const getPoints = (data:any) => keys.map((key, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const val = (data[key] / 100) * radius;
    return `${center + val * Math.cos(angle)},${center + val * Math.sin(angle)}`;
  }).join(' ');

  const getLabelPos = (i:any) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const r = radius + 25; 
    return { left: center + r * Math.cos(angle) - 20, top: center + r * Math.sin(angle) - 10 };
  };

  return (
    <View style={{ width: size, height: size, alignSelf: 'center', marginVertical: 20 }}>
      <Svg height={size} width={size}>
        {/* Web Background */}
        {[1, 0.75, 0.5, 0.25].map(scale => (
          <Polygon key={scale} 
            points={keys.map((_, i) => {
              const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
              return `${center + radius * scale * Math.cos(angle)},${center + radius * scale * Math.sin(angle)}`;
            }).join(' ')}
            stroke="#334155" strokeWidth="1" fill="none"
          />
        ))}
        {/* Axis Lines */}
        {keys.map((_, i) => {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          return <Line key={i} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="#334155" />;
        })}
        {/* Data Polygons */}
        <Polygon points={getPoints(dataB)} fill={colorB} fillOpacity="0.4" stroke={colorB} strokeWidth="2" />
        <Polygon points={getPoints(dataA)} fill={colorA} fillOpacity="0.4" stroke={colorA} strokeWidth="2" />
      </Svg>
      {/* Labels */}
      {labels.map((l, i) => {
        const pos = getLabelPos(i);
        return <Text key={i} style={{ position: 'absolute', left: pos.left, top: pos.top, color: THEME.textDim, fontSize: 10, width: 60, textAlign: 'center' }}>{l}</Text>;
      })}
    </View>
  );
};

export default RadarChart;