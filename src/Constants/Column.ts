export interface ColumnData {
  id: number;
  tableId: number;
  data: {
    name: string;
    type: string;
  };
  isDelete?: boolean;
}
