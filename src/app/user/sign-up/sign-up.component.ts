import { Component, OnInit } from '@angular/core';
import { User } from '../../service/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    user:User;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    roles:any[];
   

  constructor(private userService: UserService,
    private toastr:ToastrService,
    private router:Router) { }

    ngOnInit() {
        this.resetForm();
        this.userService.getAllRoles().subscribe(
          (data : any)=>{
            data.forEach(obj => obj.selected = false);
            this.roles = data;
          }
        );
      }
  
  resetForm(form?: NgForm){
    if(form !=null)
    form.reset();
    this.user={
        
        UserName:"",
        FullName:"",
        Email:"",
        Password:"",
        Phone:"",
       
    }
    if(this.roles){
        this.roles.map(x=> x.selected=false);
    }
}
OnSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Name);
    this.userService.registerUser(form.value,x)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful');
          this.router.navigate(['/home']);

        }
        else
          this.toastr.error(data.Errors[0]);
      });
  }

  updateSelectedRoles(index) {
    this.roles[index].selected = !this.roles[index].selected;
  }

}
