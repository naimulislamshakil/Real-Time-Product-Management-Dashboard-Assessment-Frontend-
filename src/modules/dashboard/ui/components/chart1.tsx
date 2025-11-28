'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Line,
	LineChart,
	Tooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';
import { useGetChart1Query } from '../../api/product-slice';

export const ProductAddedOverTime = () => {
	const { data } = useGetChart1Query();
	
	return (
		<Card className="rounded">
			<CardHeader>
				<CardTitle className="text-lg font-manrope">
					Products Added Over Time
				</CardTitle>
			</CardHeader>

			<CardContent className="h-72">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data?.chartData}>
						<XAxis dataKey="day" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="total"
							stroke="#6366F1"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
