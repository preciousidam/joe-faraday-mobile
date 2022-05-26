import { Payment } from "../payment/types";
import { ClientData } from "../client/types";
import { PropertyData } from "../property/types";
import { UnitData } from "../unit/types";

interface UpcomingPayment extends Payment {
  unit_info: {
    address: string;
    name: string;
  };
}

export interface DashBoardData {
  properties: PropertyData[];
  clients: ClientData[];
  stats: object;
  units: UnitData[];
  payments: {
    over_due: UpcomingPayment[];
    next_payments: UpcomingPayment[];
  };
}
