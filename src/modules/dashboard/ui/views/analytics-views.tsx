import { ProductAddedOverTime } from '../components/chart1';
import { CategoryDistribution } from '../components/chart2';
import { StockValue } from '../components/chart3';

export const AnalyticsViews = () => {
	return (
		<div className="mt-3">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<ProductAddedOverTime />
				<CategoryDistribution />
			</div>

			<StockValue/>
		</div>
	);
};
