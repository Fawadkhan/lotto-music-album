import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select [ngModel]="value" (selectionChange)="onSelectionChange($event.value)">
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() value: any;
  @Input() options: { value: any, label: string }[] = [];
  
  @Output() valueChange = new EventEmitter<any>();

  onSelectionChange(newValue: any) {
    this.valueChange.emit(newValue);
  }
}