import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
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
        const localProperties = JSON.parse(localStorage.getItem('newProp')||'{}');

      if (localProperties) {
        for (const id in localProperties) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
            propertiesArray.push(localProperties[id]);
          }
        }
      }
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
  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property,
                  ...JSON.parse((localStorage.getItem('newProp')|| '{}'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  
  }
  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+(localStorage.getItem('PID')||'{}') + 1));
      return +(localStorage.getItem('PID')||'{}');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }

}
