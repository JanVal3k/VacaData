import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducctionComponent } from './reproducction.component';

describe('ReproducctionComponent', () => {
  let component: ReproducctionComponent;
  let fixture: ComponentFixture<ReproducctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproducctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReproducctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
