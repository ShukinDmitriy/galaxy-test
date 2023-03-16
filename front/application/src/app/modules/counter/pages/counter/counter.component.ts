import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CounterService } from "../../services/counter.service";
import {
  BehaviorSubject,
  exhaustMap,
  filter,
  fromEvent,
  mergeMap,
  Subject,
  take,
  takeUntil,
  timer
} from "rxjs";
import { GetParamsResponse } from "../../interfaces/get-params-response.interface";
import { ProcessService } from "../../services/process.service";
import { ModifiedProcessResponse } from "../../interfaces/modified-process-response.interface";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit, OnDestroy {

  @ViewChild('formElement', {static: true}) formElement: ElementRef;

  form = new FormGroup({
    count: new FormControl(null, [Validators.required, Validators.pattern('^\\d+$')]),
    delay: new FormControl(null, [Validators.required, Validators.pattern('^\\d+$')]),
  });

  private _responses$: BehaviorSubject<ModifiedProcessResponse[]> = new BehaviorSubject([]);
  responses$ = this._responses$.asObservable();

  displayedColumns: string[] = ['startAt', 'status'];

  private submit = false;
  private unsubscribe$: Subject<void> = new Subject();
  constructor(
    private counterService: CounterService,
    private processService: ProcessService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.initSubmitListener();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Получить данные для формы
   * @private
   */
  private initForm(): void {
    this.counterService.getParams()
      .pipe(
        filter(res => !!res),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(res => {
        this.form.patchValue(res as GetParamsResponse);
        this.cdr.markForCheck();
      });
  }

  /**
   * Подписка на отправку формы
   * @private
   */
  private initSubmitListener(): void {
    fromEvent(this.formElement.nativeElement, 'submit')
      .pipe(
        exhaustMap(_ => timer(0, this.form.controls.delay.value)
          .pipe(
            take(this.form.controls.count.value),
            mergeMap(_ => this.processService.modifiedProcess()),
            filter(res => !!res),
          )),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(res => {
        this._responses$.next([...this._responses$.value, res]);
      });
  }
}
