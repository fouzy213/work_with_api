import { TestBed } from '@angular/core/testing';

import { HttpApiHomePage } from './http-api-homePage';

describe('HttpApi', () => {
  let service: HttpApiHomePage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpApiHomePage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
