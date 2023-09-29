import { environment } from "src/environments/environment";
import { Category } from './category';
const base_url = environment.apiUrlMedia;
export class Post {
  constructor(

    public name: string,
    public adicional: string,
    public description: string,
    public introhome: string,
    public categoria: string,
    public price: number,
    public slug: string,
    public status: boolean,
    public isFeatured: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string

){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}blogs/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}blogs/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}
