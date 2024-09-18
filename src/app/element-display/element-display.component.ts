import {Component, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {PeriodicElement} from './PeriodicElement';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ElementDialogComponent} from "../element-dialog/element-dialog.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ChangeDetectorRef} from '@angular/core';

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'}
];

@Component({
  selector: 'element-display',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './element-display.component.html',
  styleUrls: ['./element-display.component.css']
})
export class ElementDisplayComponent implements OnInit {

  protected ELEMENT_DATA: PeriodicElement[] = [];
  protected editedData: PeriodicElement[] = [];
  protected dataSource: PeriodicElement[] = [];
  protected displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  protected filterControl: FormControl = new FormControl();

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.ELEMENT_DATA = await this.fetchData();
    this.editedData = [...this.ELEMENT_DATA];
    this.dataSource = this.editedData;

    this.filterControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe(value => this.applyFilter(value));
  }

  fetchData(): Promise<PeriodicElement[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ELEMENT_DATA);
      }, 2000);
    });
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: {...element}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateElement(result);
      }
    });
  }

  updateElement(updatedElement: PeriodicElement): void {
    this.editedData = this.editedData.map(el =>
      el.position === updatedElement.position ? updatedElement : el
    );
    this.dataSource = [...this.editedData];
    this.applyFilter(this.filterControl.value);
    this.cdr.detectChanges();
  }

  applyFilter(filterValue: string): void {
    const filter = filterValue?.trim().toLowerCase() || '';
    this.dataSource = this.editedData.filter(element =>
      element.name.toLowerCase().includes(filter) ||
      element.symbol.toLowerCase().includes(filter) ||
      element.weight.toString().includes(filter) ||
      element.position.toString().includes(filter)
    );
  }
}
