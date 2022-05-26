import { useTheme } from "@react-navigation/native";
import React from "react";
import {PieChart} from 'react-native-chart-kit';
import { hexToRGB } from "../../util/colorCoverter";
import { NAIRA } from "../../util/naira";
import {heightPixel, widthPixel} from '../../util/pxToDpConvert';
import { Body, Card, Indicator, IndicatorText, LegendWrapper, SectionHeader } from "./components";
import { useUnitLogic } from "./logic";

type IProp = {
    unit_id?: number;
}
const chartConfig = (color: string) => ({
  backgroundColor: 'rgba(255, 255, 255,1)',
  backgroundGradientFrom: "rgba(255, 255, 255,1)",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "rgba(255, 255, 255,1)",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => color,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
});

const Legend = ({label, value}: {label: 'Paid' | 'Unpaid', value: number | string}) => {
  return (<LegendWrapper>
    <Indicator color={label == 'Paid' ? '#B4F17E' : '#FFA981'} />
    <IndicatorText>{`${value} ${label}`}</IndicatorText>
  </LegendWrapper>)
}

export const SummaryChart: React.FC<IProp> = ({unit_id}) => {
	const {colors} = useTheme();
	const {detail: unit} = useUnitLogic(unit_id);
	const summary = unit?.graph_data?.data ?? [];
	const name = unit?.graph_data?.labels ?? [];
	const data = summary.map((data, index) => ({
		name: name[index],
		percentage: data,
		color: index === 0 ? '#B4F17E' : '#FFA981',
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
	}))

	return (
		<Card>
			<SectionHeader>Payment summary chart</SectionHeader>
			<PieChart
				data={data}
				height={heightPixel(300)}
				width={widthPixel(600)}
				chartConfig={chartConfig(colors.primary)}
				accessor="percentage"
				backgroundColor="transparent"
				paddingLeft={String(widthPixel(10))}
        hasLegend={false}
			/>
      <Legend label="Paid" value={`${unit?.graph_data?.data[0]?.toFixed(2)}%`} />
      <Legend label="Unpaid" value={`${unit?.graph_data?.data[1]?.toFixed(2)}%`} />
		</Card>
	)
}