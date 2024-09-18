import {Component, Inject, OnInit} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions
} from '@angular/material/dialog';
import { PeriodicElement } from "../element-display/PeriodicElement";
import { MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'element-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.css'
})
export class ElementDialogComponent implements OnInit {
  elementForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.elementForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      weight: [this.data.weight, [Validators.required, Validators.min(0.00000001)]],
      symbol: [this.data.symbol, [Validators.required]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.elementForm.valid) {
      const updatedData = { ...this.data, ...this.elementForm.value };
      this.dialogRef.close(updatedData);
    }
  }

  getErrorMessage(field: string): string {
    const control = this.elementForm.get(field);
    if (control?.hasError('required')) {
      return `${field} is required`;
    }
    if (field === 'weight' && control?.hasError('min')) {
      return `Weight must be greater than 0`;
    }
    return '';
  }
}
