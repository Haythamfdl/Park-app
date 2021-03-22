import {Agent} from './agent';

export class Equipement {
  idequip: string;
  numero: string;
  designation: string;
  fabriquant: string;
  dateaquisition: string;
  dateservice: string;
  valeur_aquisition: number;
  dureegarantie: number;
  poids: string;
  taille: string;
  agent: Agent;
  date_affectation: string;
  isdeleted: boolean;
}
