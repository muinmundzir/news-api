export interface FilterInterface {
    changeCountry: (value: string) => {},
    changeQuery: (value: string) => {},
    isQuerying: boolean,
}