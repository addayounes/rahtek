export enum EquipmentsStatus {
  AVAILABLE = "AVAILABLE",
  TAKEN = "TAKEN",
}

export interface IWilaya {
  id: string;
  code: string;
  name: string;
  ar_name: string;
  longitude: string;
  latitude: string;
}

export interface ITown {
  id: string;
  post_code: string;
  name: string;
  ar_name: string;
  wilaya_id: string;
  longitude: string;
  latitude: string;
}
