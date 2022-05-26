import { ClientData } from "../client/types";

export interface Document {
  id?: number;
  name: string;
  link: string;
  unit_id?: number;
}

export interface AgentData {
  id?: number;
  fullname?: string;
  email?: string;
  phone?: string;
  properties?: any[];
}

export interface Payment {
  amount: number;
  due_date: Date;
  unit_id: number;
  status_value: "not paid" | "over due" | "paid";
  id?: number;
  deleted?: boolean;
  reason_for_delete?: string;
}

export interface Summary {
  outstanding: number;
  total_deposit: number;
  total_unpaid: number;
  balanced: boolean;
  more_or_less: "more" | "less";
  percentage_paid: number;
  percentage_unpaid: number;
  installment_amount: number;
  total_sch: number;
  installment_diff: number;
}

export interface GraphData {
  labels: string[];
  data: number[];
}

export interface UnitData {
  id?: number;
  name: string;
  amount: number;
  discount?: string;
  documents?: Document[];
  comments?: string;
  purchase_date?: Date | null;
  initial_payment: number;
  type?: string;
  payment_plan: boolean;
  client_id: number;
  payments: Payment[];
  installment: number;
  agent_id?: number;
  property_id: number;
  sales_rep: number;
  salesRep: AgentData;
  property_name?: string;
  payment_summary?: Summary;
  graph_data?: GraphData;
  client?: ClientData;
  agent?: AgentData;
  warranty_period?: number;
  handover_date?: string;
  warranty?: {
    isValid: boolean;
    expire_at: string;
  };
  created?: string;
  updated?: string;
}

export type IHandover = {
  handover_date: Date | null;
  warranty_period?: number;
};
