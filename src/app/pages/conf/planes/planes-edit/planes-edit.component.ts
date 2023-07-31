import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Plan } from 'src/app/models/plan';
import { PlanesService } from 'src/app/services/planes.service';
import { environment } from 'src/environments/environment';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  /**
   * Editor type area wyswyg
   */
  public Editor = DecoupledEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;


  public planForm: FormGroup;

  public plan: Plan;

  public imgSelect : String | ArrayBuffer;

  title: string;

  public planSeleccionado: Plan;


  imagePath: string;
  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private planService: PlanesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }


  getplan(_id){
    if (_id !== null && _id !== undefined) {
      this.title = 'Editando plan';
      this.planService.getPlan(_id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res._id,
            name: res.name,
            price: res.price,
            color: res.color,
            tiempo: res.tiempo,
            description: res.description,
            adicional: res.adicional,
          });
          this.planSeleccionado = res;
          console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando plan';
    }
  }

  validarFormulario(){
    this.planForm = this.fb.group({
      // id: [''],
      name: ['',Validators.required],
      price: ['',Validators.required],
      color: [''],
      tiempo: [''],
      description: ['',Validators.required],
      adicional: ['',Validators.required],
    })
  }
  get name() {
    return this.planForm.get('name');
  }

  get price() {
    return this.planForm.get('price');
  }

  get color() {
    return this.planForm.get('color');
  }
  get tiempo() {
    return this.planForm.get('tiempo');
  }
  get description() {
    return this.planForm.get('description');
  }
  get adicional() {
    return this.planForm.get('adicional');
  }




  editPlan(){

    const formData = new FormData();
    formData.append('name', this.planForm.get('name').value);
    formData.append('price', this.planForm.get('price').value);
    formData.append('description', this.planForm.get('description').value);
    formData.append('adicional', this.planForm.get('adicional').value);
    formData.append('color', this.planForm.get('color').value);
    formData.append('tiempo', this.planForm.get('tiempo').value);
    // const id = this.planForm.get('id').value;
    if(this.planSeleccionado){
      //actualizar
      const data = {
        ...this.planForm.value,
        _id: this.planSeleccionado._id
      }

      this.planService.updatePlan(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/planes`);
        });

    }else{
      //crear
      const data = {
        ...this.planForm.value,
        // user_id: this.user.uid
      }
      this.planService.createPlan(data)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/planes`);
      })
    }
    return false;
  }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }






}




