import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare var bootstrap: any;

@Component({
  selector: 'app-editor-edit',
  templateUrl: './editor-edit.component.html',
  styleUrls: ['./editor-edit.component.css'],
  standalone: false
})
export class EditorEditComponent implements OnInit, OnChanges {
  @Input() editorSeleccionado;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshEditorList: EventEmitter<void> = new EventEmitter<void>();

  editor: User;
  editorForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = null;
  title: string;
  public formSumitted = false;
  errors: any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
  ) {
    this.editorForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      role: ['EDITOR'],
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['editorSeleccionado'] &&
      changes['editorSeleccionado'].currentValue
    ) {
      this.title = 'Editando Editor';
      const editor = changes['editorSeleccionado'].currentValue;
      this.editorForm.patchValue({
        id: editor._id,
        username: editor.username,
        email: editor.email,
        password: editor.password,
        password2: editor.password2,
        role: editor.role,
      });
      this.editorSeleccionado = editor;
      this.title = 'Editando Proyecto';
    } else {
      this.title = 'Creando Post';
    }
  }

   onClose() {
    this.editorSeleccionado = null;
    this.editorForm.reset();
    this.title = 'Creando Editor';
    // Also reset default values if needed
    this.editorForm.patchValue({
      id: null,
      username: null,
      email: null,
      password: null,
      password2: null,
      role: null,
    });
    // Emit event to parent to reset the projectSeleccionado variable

    this.closeModal.emit();
  }



  crearEditor() {
    this.formSumitted = true;
    if (this.editorForm.invalid) {
      return;
    }

    this.usuarioService.crearEditor(this.editorForm.value).subscribe(
      resp => {
        Swal.fire('Creado', ` creado correctamente`, 'success');
        // Close modal programmatically
        const modalElement = document.getElementById('editEditor');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();

        }
        // Emit event to refresh project list
        this.refreshEditorList.emit();
        this.ngOnInit()
      }, (error) => {
        Swal.fire('Error', error.error.msg, 'error');
        this.errors = error.error;
      }
    );
  }
}
