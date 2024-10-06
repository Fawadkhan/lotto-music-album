import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input matInput [ngModel]="value" (ngModelChange)="onInputChange($event)" [placeholder]="placeholder">
    </mat-form-field>
  `,
})
export class InputComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  onInputChange(event: string) {
    this.valueChange.emit(event);
  }
}