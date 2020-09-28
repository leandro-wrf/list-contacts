export interface Contact {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  uf: string;
  city: string;
}

export interface IBGEUFResponse {
  sigla: string;
}

export interface IIBGECityResponse {
  nome: string;
}

export interface ICard {
  data: Contact;
  selected(): void;
  deselect(): void;
  setEditContactVisible(): void;
}

export interface IAddContact {
  visible: boolean;
  close(): void;
}

export interface IEditContact {
  visible: boolean;
  close(): void;
  data: Contact;
  loadingData: number;
}
