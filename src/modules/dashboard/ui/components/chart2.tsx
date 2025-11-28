'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetChart2Query } from '../../api/product-slice';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export const CategoryDistribution = () => {
	const { data } = useGetChart2Query();
	const colors = [
		'#6366F1',
		'#10B981',
		'#F59E0B',
		'#EF4444',
		'#3B82F6',
		'#8B5CF6',
	];
	return (
		<Card className="rounded">
			<CardHeader>
				<CardTitle>Category Distribution</CardTitle>
			</CardHeader>
			<CardContent className="h-72 flex items-center justify-center">
				<ResponsiveContainer height="100%" width="100%">
					<PieChart>
						<Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
						<Pie
							data={data?.chartData}
							dataKey="count"
							nameKey="category"
							innerRadius={50}
							outerRadius={90}
							label
						>
							{data?.chartData.map((_, index) => (
								<Cell key={index} fill={colors[index % colors.length]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};
