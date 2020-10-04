import axios from 'axios';
import { IBGECityResponse } from '../../@types';

export default async (selectedUf: string) => {
  const response = 
    await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
  
  const citiesNames = response.data.map(city => city.nome);

  return citiesNames;
}
