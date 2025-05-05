export interface Sede {
  id: number;
  nombreSede: string;
  estado: boolean;
}

export interface SedeCreate {
  nombreSede: string;
  estado: boolean;
}

export interface SedeFilter {
  nombreSede?: string;
  estado?: boolean;
}
