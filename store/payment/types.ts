export interface Payment {
  id?: number;
  unit_id: number;
  amount: number;
  due_date: Date | null;
  status_value?: "not paid" | "over due" | "paid";
  created?: string;
  updated?: string;
  reason_for_delete?: string;
  deleted?: boolean;
}

export interface DeleteRecord {
  id: number;
  reason: string;
}
