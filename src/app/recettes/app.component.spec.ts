import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecettesComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RecettesComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RecettesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'recettepourtp'`, () => {
    const fixture = TestBed.createComponent(RecettesComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('recettepourtp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RecettesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('recettepourtp app is running!');
  });
});
