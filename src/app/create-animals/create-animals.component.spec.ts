import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalsComponent } from './create-animals.component';

describe('CreateAnimalsComponent', () => {
  let component: CreateAnimalsComponent;
  let fixture: ComponentFixture<CreateAnimalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnimalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
