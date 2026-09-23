import type { YearMonth } from '../data/types';

const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatYearMonth(value: YearMonth): string {
  const [year, month] = value.split('-').map(Number);
  return monthYear.format(new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, 1)));
}

export function formatDateRange(start: YearMonth, end?: YearMonth): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : 'Present'}`;
}
