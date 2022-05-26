import { useTheme } from "@react-navigation/native";
import React from "react";
import {BarChart} from 'react-native-chart-kit';
import { hexToRGB } from "../../util/colorCoverter";
import { NAIRA } from "../../util/naira";
import {heightPixel, widthPixel} from '../../util/pxToDpConvert';
import { Body, Card, SectionHeader } from "./components";

type IProp = {
    info?: object;
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

const formatData = (values: number[]) => {
	const data = values.map((value, index) => value/1000000);
	return data;
}

const getLabel = (values: string[]) => {
	const data = values.map((value, index) => value.split(' ')[0]);
	return data;
}

export const SummaryChart: React.FC<IProp> = ({info = {}}) => {
	const {colors} = useTheme();
	const data = {
		labels: getLabel(Object.keys(info ?? {})),
		datasets: [
			{
				data: formatData(Object.values(info ?? {})),
			}
		]
	}

	return (
		<Card>
			<SectionHeader>Payment summary</SectionHeader>
			<Body>Values (Million - {NAIRA})</Body>
			<BarChart
				data={data}
				height={heightPixel(300)}
				width={widthPixel(450)}
				chartConfig={chartConfig(colors.primary)}
				verticalLabelRotation={20}
				yAxisLabel={NAIRA}
				yAxisSuffix="M"
				withInnerLines={false}
				withHorizontalLabels={false}
				showBarTops={false}
				showValuesOnTopOfBars
				style={{
					left: -widthPixel(60),
					marginTop: heightPixel(15)
				}}
			/>
		</Card>
	)
}