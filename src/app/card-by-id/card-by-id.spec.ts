import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardById } from './card-by-id';

describe('CardById', () => {
  let component: CardById;
  let fixture: ComponentFixture<CardById>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardById]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardById);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
