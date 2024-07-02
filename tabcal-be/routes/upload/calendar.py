import base64
from datetime import datetime
from icalendar import Calendar, Event
import csv
import uuid

weekdays = {1: "mo",
            2: "tu",
            3: "we",
            4: "th",
            5: "fr",
            6: "sa",
            7: "su"}

class Parser:
    def __init__(self, tsv:str, repeat_mode:str, end_repeat_date = None):
        self.events = []
        self.calendar = Calendar()
        self.calendar.add('PRODID', '-//Google Inc//Google Calendar 70.9054//EN')
        self.calendar.add('VERSION','2.0')
        self.calendar.add('CALSCALE','GREGORIAN')
        self.calendar.add('X-WR-CALNAME','tab2cal_generated_calendar')
        reader = csv.reader(tsv.splitlines(),delimiter="\t",quotechar='"')
        next(reader,None)
        for event in reader: 
            # print(event)
            self.events.append(EventJSON(event[0], event[1], event[2], event[3], repeat_mode, end_repeat_date).to_json())
            self.calendar.add_component(self.generate_event(event[0], event[1], event[2], event[3], repeat_mode, end_repeat_date))

    def generate_event(self, name, start, end, loc, repeat_mode, end_repeat_date):
        event = Event()
        event.add('SUMMARY',name)
        event.add('DTSTART', datetime.fromisoformat(start))
        event.add('DTEND', datetime.fromisoformat(end))
        event.add('UID',uuid.uuid4()) 
        event.add('DTSTAMP', datetime.now())
        event.add('LOCATION',loc)
        if repeat_mode == "weekly":
            event.add('RRULE',{'freq':'weekly'})
        elif repeat_mode == "weekly until":
            event.add('RRULE',{'freq':'weekly','until':datetime.fromisoformat(end_repeat_date)})
        return event

    def to_json(self):
        return self.events

    def to_ics(self):
        return self.calendar.to_ical()

    def response(self):
        # print(self.to_json())
        return {
            "json": self.to_json(), # array of json objects
            "ics": base64.b64encode(self.to_ics()).decode('ascii') # base64 encoded ics file
        }

class EventJSON:
    def __init__(self, name, start, end, loc, repeat_mode, end_repeat_date):
        self.name = name
        self.start = start
        self.end = end
        self.loc = loc
        self.repeat_mode = repeat_mode
        if end_repeat_date:
            self.end_repeat_date = end_repeat_date
        
    
    def to_json(self):
        # print(self.start) # example: 20240701T1400
        startTime = self.start.split("T")[1]
        endTime = self.end.split("T")[1]
        if self.repeat_mode == "weekly" :
            return {
                "title": f"{self.name} ({self.loc})",
                "startTime": startTime[:2] + ":" + startTime[2:],
                "endTime": endTime[:2] + ":" + endTime[2:],
                "startRecur": self.start,
                "loc": self.loc,
                "daysOfWeek": [datetime.fromisoformat(self.start).isoweekday()]
            }
        elif self.repeat_mode == "weekly until" :
            return {
                "title": f"{self.name} ({self.loc})",
                "startTime": startTime[:2] + ":" + startTime[2:],
                "endTime": endTime[:2] + ":" + endTime[2:],
                "loc": self.loc,
                "startRecur": self.start,
                "endRecur": self.end_repeat_date,
                "daysOfWeek": [datetime.fromisoformat(self.start).isoweekday()],
            }
        else :
            return {
                "title": f"{self.name} ({self.loc})",
                "start": datetime.fromisoformat(self.start).strftime("%Y-%m-%dT%H:%M") + ":00",
                "end": datetime.fromisoformat(self.end).strftime("%Y-%m-%dT%H:%M") + ":00",
                "loc": self.loc,
            }
