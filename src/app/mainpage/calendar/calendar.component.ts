import { FamilyEvent } from './../../models/event.model';
import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { FamilyService } from '../family.service';
import { AuthService } from 'src/app/authentication/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  title: string = '';
  startTime: Date;
  endTime: Date;
  startHour: String = '';
  endHour: String = '';
  themeSystem = 'bootstrap';
  trueValue = true;
  event: any;
  calendarPlugins = [
    dayGridPlugin,
    timeGrigPlugin,
    interactionPlugin,
    listPlugin,
    bootstrapPlugin,
  ];
  calendarEvents: EventInput[] = [];

  constructor(
    public dialog: MatDialog,
    private familyService: FamilyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.familyService.getEvents(this.authService.familyId).subscribe((res) => {
      this.calendarEvents = res.data.events;
    });
  }

  handleDateClick(arg) {
    this.startTime = arg.date;
    if (!arg.allDay) {
      this.endTime = this.startTime;
    }
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: '600px',
      data: {
        title: this.title,
        startTime: this.startTime,
        endTime: this.endTime,
        startHour: this.startHour,
        endHour: this.endHour,
        allday: arg.allDay,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.endTime = null;
        return;
      }
      this.startTime = result.startTime;
      this.endTime = result.endTime;
      if (!result.allday) {
        this.startTime = new Date(
          this.setTime(this.startTime, result.startHour)
        );
        this.endTime = new Date(this.setTime(this.endTime, result.endHour));
      }
      this.event = {
        allDay: arg.allDay,
        start: this.startTime,
        title: result.title,
        end: this.endTime,
        family: this.authService.familyId,
        id: null,
      };
      this.familyService.createEvent(this.event).subscribe((res) => {
        this.event.id = res.data.event.id;
        this.calendarEvents = this.calendarEvents.concat(this.event);
      });

      this.endTime = null;
      this.startTime = null;
    });
  }

  handleEventDrop(arg) {
    console.log(arg);
  }

  setTime(time, resultHours) {
    let hours = resultHours.split(' ');
    let hour = hours[0].split(':');
    const startHour = hour[0] * 1;
    hours[1] === 'AM'
      ? time.setHours(startHour)
      : time.setHours(startHour + 12);
    time.setMinutes(hour[1]);
    return time;
  }

  handleEventClick(event) {
    const id = event.event.id;
    const ev = this.calendarEvents.find((ev) => ev.id === id);
    const ind = this.calendarEvents.indexOf(ev);
    let array = this.calendarEvents;
    array.splice(ind, 1);
    this.calendarEvents = array;
    event.event.remove();
    this.familyService.deleteEvent(id).subscribe();
    ;
  }
}
