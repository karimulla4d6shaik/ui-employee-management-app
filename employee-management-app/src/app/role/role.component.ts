import { Component, OnInit } from '@angular/core';
import { AllRoles } from '../models/all-roles.model';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  page=0;
  size=5;
  sortBy="";  
  roles = new AllRoles();
  showArrowRoleCode:boolean=false;
  showArrowRoleName:boolean=false;
  showArrowRoleDesc:boolean=false;
  pages:any=[];
  selectBoxData:any=[5, 10, 15, 20];
  beforeNextDropdown:any=[];
  role = new Role();

  constructor(private roleService : RoleService) { }

  ngOnInit(): void {   
    this.getAllRoles(this.page, this.size, this.sortBy);
  }

  showDropdown(value:string):boolean{
    if(value === 'afterPrev'){
      if(this.page == 0 || this.page == 1){
        return false;
      }
      return true;
    }else{
      if(this.roles.currentPage >= (this.roles.totalPages -2)){
        return false;
      }
      return true;
    }
    
  }

  onSelect(){
    this.page=0;
    this.getAllRoles(this.page, this.size, this.sortBy);
  }

  roleInformation(role:Role){
    this.role = role;
  }

  deleteRole(role:Role){
    this.roleService.deleteRole(role.roleCode).subscribe(response =>{
      this.displayRoles(response, this.size);
    }, error => {});
  }

  getAllRoles(page:any, size:any, sortBy:any){
    this.pages = [];
    this.roleService.getRoles(page, size, sortBy).subscribe(response => {
      this.displayRoles(response, size);
    }, error => {});
  }

  previous(pageNumber : any){
    this.page = --pageNumber;  
    this.getAllRoles(this.page, this.size, this.sortBy);
  }

  next(pageNumber : any){ 
     this.page = ++pageNumber;      
    this.getAllRoles(this.page, this.size, this.sortBy);
  }

  nextRecords(pageNumber : any){
    this.page = pageNumber; 
    this.getAllRoles(pageNumber, this.size, this.sortBy);    
  }

  sortArray(sortBy:any){
    if(sortBy === "roleCode"){
      this.showArrowRoleCode = !this.showArrowRoleCode;
    }else if(sortBy === "roleName"){
      this.showArrowRoleName = !this.showArrowRoleName;
    }else{
      this.showArrowRoleDesc = !this.showArrowRoleDesc;
    }      
    if(this.roles.roleResponseDtos.length !== 0){
      let sortVar = [];
      for(let i=0; i < this.roles.roleResponseDtos.length; i++){
        let role = this.roles.roleResponseDtos[i];
        if("roleCode" === sortBy){
          sortVar[i] = role.roleCode;
        }else if("roleName" === sortBy){
          sortVar[i] = role.roleName;
        }else{
          sortVar[i] = role.roleDesc;
        }
      }
      sortVar.sort();
      let roles = [];
      if("roleName" === sortBy){
        for(let i=0; i<sortVar.length; i++){
          for(let j=0; j<this.roles.roleResponseDtos.length; j++){
            let role = this.roles.roleResponseDtos[j];
            if(role.roleName === sortVar[i]){
              roles.push(role);
            }
          }        
        }        
      }else if("roleDesc" === sortBy){
        for(let i=0; i<sortVar.length; i++){
          for(let j=0; j<this.roles.roleResponseDtos.length; j++){
            let role = this.roles.roleResponseDtos[j];
            if(role.roleDesc === sortVar[i]){
              roles.push(role);
            }
          }        
        }
      }else{
        for(let i=0; i<sortVar.length; i++){
          for(let j=0; j<this.roles.roleResponseDtos.length; j++){
            let role = this.roles.roleResponseDtos[j];
            if(role.roleCode === sortVar[i]){
              roles.push(role);
            }
          }        
        }
      }
      this.roles.roleResponseDtos = [];
      for(let i=0; i<roles.length; i++){
        this.roles.roleResponseDtos.push(roles[i]);
      }               
    }
  }


  displayRoles(response:any, size:any){
    this.roles.notification = response.notification;
    this.roles.roleResponseDtos = response.roleResponseDtos;
    this.roles.totalElements = response.totalElements;
    this.roles.totalPages = response.totalPages;
    this.roles.currentPage= response.currentPage;
    let selectPage = 0;
    if(this.roles.currentPage === 0){
      selectPage = this.roles.currentPage - 1;
    }else{
      selectPage = this.roles.currentPage - 2;
    }
    let k = 0;
    for(let i = 0; i < this.roles.totalPages; i++){
      if(i < 3){
        if(size != this.roles.roleResponseDtos.length){
          if(selectPage !== -1){
            this.pages[i] = selectPage;            
            this.pages[++i] = ++selectPage;
            this.pages[++i] = ++selectPage;
          }else{
            this.pages[i] = ++selectPage;
            this.pages[++i] = ++selectPage;
          }
          break;
        }
        this.pages[i] = ++selectPage; 
      } else{
          this.beforeNextDropdown[k] = ++selectPage; 
          k++;         
      }             
    }
  }
}
