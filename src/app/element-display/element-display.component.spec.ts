import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementDisplayComponent } from './element-display.component';

describe('ElementDisplayComponent', () => {
  let component: ElementDisplayComponent;
  let fixture: ComponentFixture<ElementDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
