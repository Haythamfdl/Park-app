import {Agent} from './agent';
import {Equipement} from './equipement';

export class Probleme {
  idprob: string;
  titre: string;
  probleme: string;
  datesoumission: string;
  agent: Agent;
  type: string;
  resolu: boolean;
  equipement: Equipement;
  isdeleted: boolean;
}
