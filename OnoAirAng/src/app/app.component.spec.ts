import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

// Mock Header Component
@Component({
  selector: 'app-header',
  template: '<div>Mock Header</div>',
})
class MockHeaderComponent {}

// Mock Footer Component
@Component({
  selector: 'app-footer',
  template: '<div>Mock Footer</div>',
})
class MockFooterComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Enables routing in tests
      declarations: [AppComponent, MockHeaderComponent, MockFooterComponent], // Include mocks
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
