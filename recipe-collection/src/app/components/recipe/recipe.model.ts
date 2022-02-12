import { Ingridient } from '../../shared/models/ingridient.model';

export class Recipe {
  public id?: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingridients: Ingridient[];

  constructor(name: string, desc: string, imagePath: string, ingridients: Ingridient[], id?: number) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingridients = ingridients;
  }
}
