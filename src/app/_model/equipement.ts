import {Agent} from './agent';

export class Equipement {
  idequip: string;
  numero: string;
  designation: string;
  fabriquant: string;
  dateaquisition: string;
  dateservice: string;
  valeuraquisition: number;
  dureegarantie: number;
  poids: string;
  taille: string;
  agent: Agent;
  dateaffectation: string;
  isdeleted: boolean;
}
