export interface IChartOptions<T> {
    type: ChartType.line;
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

export enum ChartType {
    line = 'line'
}
