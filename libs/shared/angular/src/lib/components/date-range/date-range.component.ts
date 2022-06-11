import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input, NgZone,
    OnInit, Output,
    ViewChild, EventEmitter, forwardRef, ElementRef, HostListener
} from "@angular/core";
import {DomController, IonContent, ModalController, NavParams} from "@ionic/angular";
import {ControlValueAccessor, UntypedFormBuilder, UntypedFormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Subject, Subscription} from "rxjs";
import {distinctUntilChanged, filter, tap} from "rxjs/operators";
// @ts-ignore
import moment from "moment";

import {IDateRange} from "@smartsoft001/domain-core";

import {CalendarService, month} from "../../services/calendar/calendar.service";
import {UIService} from "../../services/ui/ui.service";
import {StyleService} from "../../services/style/style.service";

@Component({
    selector: "smart-date-range",
    templateUrl: "./date-range.component.html",
    styleUrls: ["./date-range.component.scss"],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateRangeComponent), multi: true }
    ]
})
export class DateRangeComponent implements ControlValueAccessor {
    value : any;

    propagateChange = val => {};
    propagateTouched = () => {};

    @Input() set ngModel(val: IDateRange) {
        this.value = val;
    }
    @Output() ngModelChange = new EventEmitter<IDateRange>();

    calendarData: CalendarState = {
        dateFrom: null,
        dateTo: null,
        scrollPosition: 0,
        selectedButtonName: FilterBtnConstants.empthyString
    };

    constructor(
        private modalCtrl: ModalController,
        private cd: ChangeDetectorRef,
    ) { }

    async onClick(): Promise<void> {
        if (this.ngModel?.start) this.calendarData.dateFrom = moment(this.ngModel.start);
        if (this.ngModel?.end) this.calendarData.dateTo = moment(this.ngModel.end);

        this.propagateTouched();

        const modal = await this.modalCtrl.create({
            backdropDismiss: true,
            component: DateRangeModalComponent,
            componentProps: {
                previousState: this.calendarData
            }
        });

        modal.onDidDismiss().then((data: any) => {
            if (!data.data) {
                return;
            }
            this.calendarData = data.data['calendarData'];
            if (this.calendarData.dateFrom) {
                const value = {
                    start: this.calendarData.dateFrom.format('YYYY-MM-DD'),
                    end: this.calendarData.dateTo.format('YYYY-MM-DD')
                }

                this.writeValue(value);
                this.ngModelChange.emit(this.value);
                this.propagateChange(this.value);
            }
        });

        await modal.present();
    }

    writeValue(value): void {
        this.value = value;
        this.cd.detectChanges();
    }

    registerOnChange(fn) : void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn) : void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean) : void {}

    onClear(): void {
        this.calendarData.dateFrom = null;
        this.calendarData.dateTo = null;

        this.value = null;

        this.ngModelChange.emit(this.value);
        this.propagateChange(this.value);
        this.propagateTouched();
    }
}

export enum FilterBtnConstants {
    empthyString = '',
    today = 'Today',
    yesterday = 'Yesterday',
    lastSevenDays = 'LastSevenDays',
    lastThirtyDays = 'LastThirtyDays',
    thisMonth = 'ThisMonth',
    lastMonth = 'LastMonth',
}

interface SubjectType {
    date: moment.Moment;
    event: any;
}

export interface CalendarState {
    dateFrom: moment.Moment;
    dateTo: moment.Moment;
    scrollPosition: number;
    selectedButtonName: FilterBtnConstants;
}

@Component({
    selector: "smart-date-range-modal",
    styleUrls: ['./date-range-modal.component.scss'],
    templateUrl: './date-range-modal.component.html',
    providers: [CalendarService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateRangeModalComponent implements OnInit, AfterContentInit {
    @Input() showFilterBtns = false;
    @Input() restrictSelectionTo: number;
    @ViewChild('scrollMe', { static: true }) scrollMe: IonContent;
    public currentDate = moment().clone();
    public dateForm: UntypedFormGroup;
    calendar: month[] = [{ dates: null, monthName: null, year: null, number: null }];
    selectedButtonName = FilterBtnConstants.empthyString;
    scrollPositionValue = 0;
    valueTop = 6400;  //calculated value of the scrollHeight
    previousState: CalendarState = {
        dateFrom: null,
        dateTo: null,
        scrollPosition: 0,
        selectedButtonName: FilterBtnConstants.empthyString
    };
    subject$ = new Subject<SubjectType>();
    subjectSubscription: Subscription;


    constructor(private fb: UntypedFormBuilder,
                private modalController: ModalController,
                private navParams: NavParams,
                private uiService: UIService,
                private changeDetectionRef: ChangeDetectorRef,
                private domController: DomController,
                private calendarService: CalendarService,
                private zone: NgZone,
                private styleService: StyleService,
                private elementRef: ElementRef
    ) {
        this.initDateRangeForm();
        this.previousState = this.navParams.get('previousState');
    }

    private initDateRangeForm(): void {
        this.dateForm = this.fb.group({
            dateFrom: [null, Validators.required],
            dateTo: [null, Validators.required],
            datesRefGroup: this.fb.group({
                startDateRef: [null, Validators.required],
                endDateRef: [null, Validators.required],
            })
        });
    }

    get datesRefGroup(): UntypedFormGroup {
        return this.dateForm.get('datesRefGroup') as UntypedFormGroup;
    }

    ngOnInit() {
        this.calendar = this.calendarService.getCalendar();
        if (this.previousState.dateFrom) {
            this.setPreviousStateData();
        } else {
            this.selectToday();
            this.scrollMe.scrollToPoint(0, this.valueTop, 300);
        }
    }

    ngAfterContentInit() {
        this.subjectSubscription = this.subject$.pipe(
            filter(({ date }) => !!date),
            distinctUntilChanged((prev, curr) => prev.date.isSame(curr.date, 'day')),
            tap(({ event }) => {
                this.selectedButtonName = FilterBtnConstants.empthyString;
                this.domController.read(() => {
                    const distanceFromTop = event.target.offsetTop;
                    this.scrollPositionValue = distanceFromTop;
                });
            }),
        ).subscribe(({ date }) => {
            const formattedDate = date.format('YYYY-MM-DD');
            const areBothDatesSelected = this.datesRefGroup.valid;
            this.when(areBothDatesSelected, this.resetDates);
            const { startDateRef } = this.datesRefGroup.value;
            this.when(!startDateRef, this.setStartDate.bind(null, date, formattedDate));
            const isFutureDate = date.isAfter(startDateRef);
            this.when(isFutureDate, this.setEndDate.bind(null, date, formattedDate));
            this.when(!isFutureDate, this.setStartDate.bind(null, date, formattedDate));
            this.when(this.canSelectionBeRestricted(), this.showRestrictSelectionAlertAndResetDates);
        });

        this.styleService.init(this.elementRef);
    }

    private setPreviousStateData(): void {
        const { dateFrom, dateTo, scrollPosition, selectedButtonName } = this.previousState;
        this.dateForm.patchValue({
            dateFrom: this.formatDate(dateFrom),
            dateTo: this.formatDate(dateTo)
        });
        this.datesRefGroup.patchValue({
            startDateRef: dateFrom,
            endDateRef: dateTo
        });
        this.scrollPositionValue = scrollPosition;
        this.selectedButtonName = selectedButtonName;
        // tslint:disable-next-line:no-unused-expression
        this.scrollPositionValue ? this.scrollMe && this.scrollMe.scrollToPoint(0, (this.scrollPositionValue - 300), 300)
            : this.scrollMe && this.scrollMe.scrollToPoint(0, this.valueTop, 300);
    }

    noop = () => ({});

    when = (cond: boolean, fn: Function): void => cond ? fn() : this.noop();

    setStartDate = (date: moment.Moment, formattedDate: string): void => {
        this.dateForm.patchValue({ dateFrom: formattedDate, dateTo: formattedDate });
        this.datesRefGroup.patchValue({ startDateRef: date });
    };

    setEndDate = (date: moment.Moment, formattedDate: string): void => {
        this.dateForm.patchValue({ dateTo: formattedDate });
        this.datesRefGroup.patchValue({ endDateRef: date });
    };

    resetDates = (): void => this.datesRefGroup.reset();

    canSelectionBeRestricted = (): boolean => this.restrictSelectionTo && this.datesRefGroup.value.endDateRef && !this.isSelectionInRestrictedRange();

    showRestrictSelectionAlertAndResetDates = (): void => {
        const { startDateRef } = this.datesRefGroup.value;
        this.uiService.showAlertWithDismissCallback('Alert', `Please select ${this.restrictSelectionTo} days`, 'Ok', () => {
            this.datesRefGroup.patchValue({ endDateRef: startDateRef });
            this.setStartDate(startDateRef, this.dateForm.value.dateFrom);
            this.changeDetectionRef.markForCheck();
        });
    }

    public isSelectionInRestrictedRange(): boolean {
        const { endDateRef, startDateRef } = this.datesRefGroup.value;
        const diff = endDateRef && endDateRef.diff(startDateRef, 'days') + 1;
        // tslint:disable-next-line:triple-equals
        return diff && diff == this.restrictSelectionTo;
    }

    private formatDate(date: moment.Moment): string {
        return date.format('YYYY-MM-DD');
    }

    public isInRange(day: moment.Moment): boolean {
        if (!day) {
            return false;
        }
        const { endDateRef, startDateRef } = this.datesRefGroup.value;
        return day.isBetween(startDateRef, endDateRef, 'day');
    }

    public isSelectionStart(day: moment.Moment): boolean {
        if (!day) {
            return false;
        }
        return day.isSame(this.datesRefGroup.value.startDateRef, 'day');
    }

    public isSelectionEnd(day: moment.Moment): boolean {
        if (!day) {
            return false;
        }
        const { endDateRef, startDateRef } = this.datesRefGroup.value;
        return day.isSame(endDateRef, 'day') && endDateRef.isAfter(startDateRef, 'day');
    }

    public isStartAndEndDateSame(): boolean {
        // tslint:disable-next-line:triple-equals
        return this.dateForm.value.dateFrom == this.dateForm.value.dateTo;
    }

    public selectThisMonth(): void {
        this.selectedButtonName = FilterBtnConstants.thisMonth;
        this.scrollPositionValue = this.valueTop;
        this.scrollToBottom();
        const firstDay = moment().clone().startOf("month");
        const lastDay = moment().clone();
        this.setStartDate(firstDay, this.formatDate(firstDay));
        this.setEndDate(lastDay, this.formatDate(lastDay));
    }

    public selectLastMonth(): void {
        this.scrollToBottom();
        this.selectedButtonName = FilterBtnConstants.lastMonth;
        this.scrollPositionValue = this.valueTop;
        const lastMonth = moment().clone().subtract(1, "month");
        const firstDay = lastMonth.clone().startOf("month");
        const lastDay = lastMonth.clone().endOf("month");
        this.setStartDate(firstDay, this.formatDate(firstDay));
        this.setEndDate(lastDay, this.formatDate(lastDay));
    }

    public selectLastThirtyDays(): void {
        this.selectedButtonName = FilterBtnConstants.lastThirtyDays;
        this.scrollPositionValue = this.valueTop;
        this.scrollToBottom();
        this.filterSelectionByDaysAgo(29);
    }

    public selectLastSevenDays(): void {
        this.selectedButtonName = FilterBtnConstants.lastSevenDays;
        this.scrollPositionValue = this.valueTop;
        this.scrollToBottom();
        this.filterSelectionByDaysAgo(6);
    }

    private filterSelectionByDaysAgo(daysAgo: number): void {
        const endDate = moment().clone();
        const startDate = endDate.clone().subtract(daysAgo, "days");
        this.setStartDate(startDate, this.formatDate(startDate));
        this.setEndDate(endDate, this.formatDate(endDate));
    }

    public selectYesterday(): void {
        this.selectedButtonName = FilterBtnConstants.yesterday;
        this.scrollPositionValue = this.valueTop;
        this.scrollToBottom();
        const yesterday = moment().clone().subtract(1, "days");
        this.setStartDate(yesterday, this.formatDate(yesterday));
        this.setEndDate(yesterday, this.formatDate(yesterday));
    }

    public selectToday(): void {
        this.selectedButtonName = FilterBtnConstants.today;
        this.scrollPositionValue = this.valueTop;
        this.scrollToBottom();
        const today = moment().clone();
        this.setStartDate(today, this.formatDate(today));
        this.setEndDate(today, this.formatDate(today));
    }

    private scrollToBottom(): void {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                // tslint:disable-next-line:no-unused-expression
                this.scrollMe && this.scrollMe.scrollToBottom(300);
            });
        });
    }

    public dismissPage(): void {
        this.unsubscribe();
        this.modalController.dismiss();
    }

    private unsubscribe(): void {
        this.subjectSubscription.unsubscribe();
    }

    public applyDates(): void {
        const { endDateRef, startDateRef } = this.datesRefGroup.value;
        const endDate = endDateRef;
        const data: CalendarState = {
            dateFrom: startDateRef,
            dateTo: endDate ? endDate : startDateRef,
            scrollPosition: this.scrollPositionValue,
            selectedButtonName: this.selectedButtonName
        };
        this.unsubscribe();
        this.modalController.dismiss({
            calendarData: data
        });
    }

    loadDataNext(event) {
        this.calendarService.generateNextMonths();
        this.calendar = this.calendarService.state.calendar;
        this.changeDetectionRef.detectChanges();

        event.target.complete();
    }

    loadDataPrev(event: any) {
        this.calendarService.generatePrevMonths() ;
        this.calendar = this.calendarService.state.calendar;
        this.changeDetectionRef.detectChanges();

        event.target.complete();
    }
}