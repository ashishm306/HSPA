import { Component,OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit  {

  SellRent=1
  properties!: IPropertyBase[];
  constructor(private route:ActivatedRoute,private housingservice:HousingService){}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){ // this is condition will return empty string as buy route path is empty and based on this it is separationg for buy and rent
      this.SellRent=2
    }
    // this.housingservice.getAllProperties(this.SellRent).subscribe( data=>{
    //       this.properties=data;
    //       //console.log(data)
    //       //console.log(this.route.snapshot.url.toString());
    //     },error=>{
    //       console.log(error)
    //     })
        this.housingservice.getAllProperties(this.SellRent).subscribe({
         next: (data)=> this.properties=data,
          error: (e)=>console.log(e)
        })
    // this.http.get('assets/data/properties.json').subscribe(
    //   data=>{
    //     this.properties=data;
    //   }
    //   );
  }
}
