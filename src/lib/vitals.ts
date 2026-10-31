import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';
import { trackEvent } from './analytics';

export function observeVitals() {
  const report = ({ name, value, rating, id }: Metric) => trackEvent('web_vital', {
    metric_name: name, metric_value: Math.round(value * 1000) / 1000, metric_rating: rating, metric_id: id,
  });
  onCLS(report);
  onINP(report);
  onLCP(report);
}
