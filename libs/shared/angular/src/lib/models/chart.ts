export interface IChartOptions<T> {
    type: ChartType;
    data: IChartDataItem<T>[];
    labels: Array<string>;
    colors?: Array<IChartColor>;
}

export interface IChartDataItem<T> {
    values: Array<T>;
    label: string;
}

export interface IChartColor {
    border?: string;
    background?: string;
}

export const enum ChartType {
    line = 'line',
    bar = 'bar'
}
