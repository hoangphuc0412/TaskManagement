import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetTasksAsPortableDocFormatPage } from './get-tasks-as-portable-doc-format.page';

describe('GetTasksAsPortableDocFormatPage', () => {
  let component: GetTasksAsPortableDocFormatPage;
  let fixture: ComponentFixture<GetTasksAsPortableDocFormatPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetTasksAsPortableDocFormatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
