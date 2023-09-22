import { Component,OnInit, ViewChild } from '@angular/core';
import { NgForm  ,FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit{
  //@ViewChild('Form') addPropertyForm!: NgForm;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  addPropertyForm!: FormGroup;

propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType:null,
    FType:null,
    BHK:null,
    BuiltArea:null,
    City:null,
    RTM:null
  };

  constructor(private fb: FormBuilder,private router:Router){}
  
ngOnInit(): void {
  this.CreateAddPropertyForm();
}
CreateAddPropertyForm() {
  this.addPropertyForm = this.fb.group({
    BasicInfo: this.fb.group({
      SellRent: [null, Validators.required],
      PType: [null, Validators.required],
      Name: [null, Validators.required]
    }),
    PriceInfo: this.fb.group({
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required]
  })
  });
}

onBack(){
  this.router.navigate(['/']);
}
onSubmit(){
console.log('SellRent='+this.addPropertyForm.value.BasicInfo.SellRent) //this basicinfo is reference for tab level
console.log(this.addPropertyForm)
}

selectTab(tabId: number) {
  this.formTabs.tabs[tabId].active = true;
}

}
