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
