import { Contact } from '../../../@types';

export interface IProps {
  visible: boolean;
  close(): void;
  data: Contact;
  loadingData: number;
}
