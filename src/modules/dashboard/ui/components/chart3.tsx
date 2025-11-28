'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetChart3Query } from '../../api/product-slice';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

export const StockValue = () => {
	const { data } = useGetChart3Query();

	return (
		<Card className="rounded mt-5">
			<CardHeader>
				<CardTitle className="text-lg font-manrope">
					Stock Value by Product
				</CardTitle>
			</CardHeader>

			<CardContent className="h-72">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={data?.chartData}>
						<XAxis dataKey="productName" tick={false} />
						<YAxis />
						<Tooltip />
						<Bar dataKey="stockValue" fill="#10B981" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
