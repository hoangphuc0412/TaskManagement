import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GanttPage } from './gantt.page';

describe('GanttPage', () => {
  let component: GanttPage;
  let fixture: ComponentFixture<GanttPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GanttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
