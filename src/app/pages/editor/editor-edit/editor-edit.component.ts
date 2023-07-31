import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.css']
})
export class EditorEditComponent implements OnInit {

  editor: User;
  editorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = null;
  title: string;
  public formSumitted = false;
  errors:any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private location: Location,
  ) {
    this.editorForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: [ '', [Validators.required] ],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['EDITOR'],
    });
   }

  ngOnInit(): void {
  }




crearEditor(){
  this.formSumitted = true;
  if(this.editorForm.invalid){
    return;
  }

  this.usuarioService.crearEditor(this.editorForm.value).subscribe(
    resp =>{
      Swal.fire('Registrado!', `Editor Creado`, 'success');
      this.router.navigateByUrl(`/dashboard/users`);
      this.ngOnInit();
    },(error) => {
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
  );

}


goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
