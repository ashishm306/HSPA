import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  getAllProperties(SellRent:number):Observable<IPropertyBase[]>{
    return this.http.get('assets/data/properties.json').pipe(
      map(data=>{
        // const propertiesArray: Array<IProperty>=[];
        
        // for(const id in data){
        //   if(data.hasOwnProperty(id) && data[id as keyof object].SellRent===SellRent){
        //     propertiesArray.push(data[id as keyof object])
        //   }
        // }
        const propertiesArray : Array<IPropertyBase> =[];
        const jsonData = JSON.stringify(data)
        const tmp: Array<IPropertyBase> = JSON.parse(jsonData);
        for(const id in tmp){
          if(tmp[id].SellRent == SellRent)
          propertiesArray.push(tmp[id])
        }
        return propertiesArray
      })
    );
  }
}
