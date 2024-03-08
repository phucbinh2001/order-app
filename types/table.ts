export interface Table {
  title: string;
  _id: string;
  sessionKey: string;
}

export interface TableSummary {
  _id: string;
  totalMoney: number;
  sessionKey: string;
  startAt: number;
  title: string;
}
