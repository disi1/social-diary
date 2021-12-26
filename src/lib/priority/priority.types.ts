export interface Priority {
    id?: number,
    name: string,
    frequency: number,
}

export type PriorityUnit = 'hour' | 'day' | 'week' | 'month' | 'year'

export interface PriorityUnitOption<PriorityUnit> {
    unit: PriorityUnit;
    value: number;
}

