<template>
  <q-page class="q-pa-md bg-grey-4">
    <q-card class="calendar-card">
      <q-card-section>
        <!-- Navigation and view controls -->
        <div class="row justify-between items-center q-mb-md">
          <!-- Left side -->
          <div>
            <q-btn-group class="q-mr-sm">
              <q-btn class="custom-blue" icon="chevron_left" @click="onPrev" />
              <q-btn class="custom-blue" icon="chevron_right" @click="onNext" />
            </q-btn-group>
            <q-btn
              flat
              label="Today"
              class="custom-blue"
              @click="goToToday"
            />
          </div>

          <!-- Center -->
          <div class="text-h6">{{ formattedDate }}</div>

          <!-- Right side -->
          <div>
            <q-btn-group>
              <q-btn label="Month" :class="view === 'month' ? 'custom-blue' : 'bg-grey'" @click="view = 'month'" />
              <q-btn label="Week" :class="view === 'week' ? 'custom-blue' : 'bg-grey'" @click="view = 'week'" />
              <q-btn label="Day" :class="view === 'day' ? 'custom-blue' : 'bg-grey'" @click="view = 'day'" />
              <q-btn label="List" :class="view === 'list' ? 'custom-blue' : 'bg-grey'" @click="view = 'list'" />
            </q-btn-group>
          </div>
        </div>

        <!-- Calendar Views -->
        <template v-if="view === 'month'">
          <q-calendar-month
            ref="calendar"
            v-model="selectedDate"
            animated
            bordered
            focusable
            hoverable
            no-active-date
            :day-min-height="120"
            :day-height="8"
            class="calendar-container"
            @change="onChange"
            @moved="onMoved"
          >
            <template #day="{ scope: { timestamp } }">
              <!-- Date number with today indicator -->
              <div class="date-indicator" :class="{ 'is-today': isToday(timestamp.date) }">
                {{ new Date(timestamp.date).getDate() }}
              </div>

              <!-- Events container -->
              <div class="events-container">
                <template v-for="(event, index) in eventsMap[timestamp.date]" :key="event.id">
                  <div
                    class="month-event"
                    :style="{
                      backgroundColor: event.bgcolor,
                      boxShadow: `inset 0 0 0 1px ${event.bgcolor}40`
                    }"
                  >
                    <!-- Event content -->
                    <div class="event-content">
                      <div class="event-time" v-if="event.time">
                        <q-icon name="schedule" size="xs" class="q-mr-xs" />
                        {{ event.time }}
                      </div>
                      <div class="event-title">
                        {{ event.title }}
                      </div>
                    </div>

                    <!-- Hover card with full details -->
                    <div class="event-hover-card" :style="{ borderTop: `3px solid ${event.bgcolor}` }">
                      <div class="hover-time" v-if="event.time">
                        <q-icon name="schedule" size="xs" class="q-mr-xs" />
                        {{ event.time }}
                        <span v-if="event.duration" class="duration">
                          ({{ event.duration }}min)
                        </span>
                      </div>
                      <div class="hover-title">{{ event.title }}</div>
                      <div class="hover-details">{{ event.details }}</div>
                    </div>
                  </div>
                </template>

                <!-- More events indicator -->
                <div v-if="eventsMap[timestamp.date]?.length > 5" class="more-events">
                  +{{ eventsMap[timestamp.date].length - 5 }} more
                </div>
              </div>
            </template>
          </q-calendar-month>
        </template>

        <template v-else-if="view === 'week'">
          <q-calendar-agenda
            ref="calendar"
            v-model="selectedDate"
            view="week"
            animated
            bordered
            focusable
            hoverable
            :interval-minutes="30"
            :interval-height="40"
            class="week-calendar"
            style="height: 700px;"
            @change="onChange"
            @moved="onMoved"
          >
            <!-- Header Slot -->
            <template #head>
              <div class="week-header">
                <div v-for="day in weekDays" :key="day.date"
                     class="week-day-header"
                     :class="{ 'is-today': isToday(day.date) }">
                  <div class="day-name">{{ day.weekday }}</div>
                  <div class="day-number">{{ day.dayNumber }}</div>
                </div>
              </div>
            </template>

            <!-- Day Content Slot -->
            <template #day="{ scope: { timestamp } }">
              <template v-for="event in eventsMap[timestamp.date]" :key="event.id">
                <div
                  class="week-event"
                  :style="{
                    backgroundColor: event.bgcolor,
                    borderLeft: `3px solid ${adjustColor(event.bgcolor, -20)}`
                  }"
                >
                  <div class="event-content">
                    <div class="event-time">
                      {{ event.time }}
                    </div>
                    <div class="event-details">
                      <div class="event-title">{{ event.title }}</div>
                      <div class="event-description">{{ event.details }}</div>
                    </div>
                    <div class="event-duration" v-if="event.duration">
                      <q-chip
                        dense
                        size="sm"
                        class="duration-chip"
                      >
                        {{ event.duration }}min
                      </q-chip>
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <!-- Time Label Slot -->
            <template #interval-label="{ scope: { timestamp } }">
              <div class="time-label">
                {{ formatTime(timestamp.time) }}
              </div>
            </template>
          </q-calendar-agenda>
        </template>

        <template v-else-if="view === 'day'">
          <q-calendar-agenda
            ref="calendar"
            v-model="selectedDate"
            view="day"
            animated
            bordered
            focusable
            hoverable
            :interval-minutes="30"
            :interval-height="50"
            class="day-calendar"
            style="height: 700px;"
            @change="onChange"
            @moved="onMoved"
          >
            <!-- Header -->
            <template #head>
              <div class="day-header">
                <div class="date-info">
                  <div class="current-date">{{ formatDayHeader(selectedDate) }}</div>
                  <div class="date-meta">
                    <span class="total-events">{{ getDayEventCount() }} Events</span>
                    <span class="schedule-time">{{ getDaySchedule() }}</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- Day Events -->
            <template #day="{ scope: { timestamp } }">
              <template v-for="event in getDayEvents(timestamp.date)" :key="event.id">
                <div
                  class="day-event"
                  :style="{
                    backgroundColor: `${event.bgcolor}10`,
                    borderLeft: `4px solid ${event.bgcolor}`
                  }"
                >
                  <div class="event-content">
                    <!-- Time Column -->
                    <div class="time-column">
                      <div class="event-time">
                        <q-icon name="schedule" size="xs" class="q-mr-xs" />
                        {{ event.time }}
                      </div>
                      <q-chip
                        v-if="event.duration"
                        dense
                        size="sm"
                        :style="{
                          backgroundColor: event.bgcolor,
                          color: 'white'
                        }"
                        class="duration-chip"
                      >
                        {{ event.duration }}min
                      </q-chip>
                    </div>

                    <!-- Details Column -->
                    <div class="details-column">
                      <div class="event-title" :style="{ color: event.bgcolor }">
                        {{ event.title }}
                      </div>
                      <div class="event-description">
                        {{ event.details }}
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="action-column">
                      <q-btn flat round dense size="sm" icon="more_vert" :style="{ color: event.bgcolor }" />
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <!-- Time Label -->
            <template #interval-label="{ scope: { timestamp } }">
              <div class="time-label">
                {{ formatTime(timestamp.time) }}
              </div>
            </template>
          </q-calendar-agenda>
        </template>

        <template v-else-if="view === 'list'">
          <q-list padding separator>
            <q-item v-for="event in sortedEvents"
                    :key="event.id"
                    class="q-my-sm list-item"
                    bordered
            >
              <!-- Color strip on the left -->
              <div class="color-strip" :style="{ backgroundColor: event.bgcolor }"></div>

              <!-- Main content -->
              <q-item-section>
                <div class="row items-center">
                  <!-- Date column -->
                  <div class="col-3">
                    <div class="text-subtitle1 text-weight-medium">
                      {{ formatEventDateShort(event.date) }}
                    </div>
                    <div class="text-caption text-grey-7">
                      {{ event.time || 'All day' }}
                    </div>
                  </div>

                  <!-- Event details column -->
                  <div class="col-9">
                    <q-item-label class="text-h6 text-weight-medium">
                      {{ event.title }}
                    </q-item-label>
                    <q-item-label caption class="text-grey-8">
                      {{ event.details }}
                    </q-item-label>

                    <!-- Duration badge -->
                    <div class="q-mt-sm">
                      <q-badge
                        :style="{ backgroundColor: event.bgcolor }"
                        class="q-px-sm q-py-xs"
                      >
                        {{ event.duration ? event.duration + ' minutes' : 'All day' }}
                      </q-badge>
                    </div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>import {
  QCalendarMonth,
  QCalendarAgenda,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'
import {defineComponent} from 'vue'
// The function below is used to set up our demo data
const CURRENT_DAY = new Date()

function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export default defineComponent({
  name: 'Calendar',
  components: {
    QCalendarMonth,
    QCalendarAgenda
  },
  data() {
    return {
      selectedDate: today(),
      view: 'month',
      events: [
        {
          id: 1,
          title: 'Kickoff Meeting',
          details: 'Introduction to the mentorship program and overview of toy design principles.',
          date: getCurrentDay(1),
          bgcolor: 'orange'
        },
        {
          id: 2,
          title: 'Brainstorming Session',
          details: 'Discuss and sketch toy ideas. Get feedback from peers and mentors.',
          date: getCurrentDay(4),
          bgcolor: 'green',
          icon: 'fas fa-lightbulb'
        },
        {
          id: 3,
          title: 'Prototype Development',
          details: 'Start building your toy prototype. Gather materials and tools needed.',
          date: getCurrentDay(10),
          time: '10:00',
          duration: 120,
          bgcolor: 'red',
          icon: 'fas fa-cogs'
        },
        {
          id: 4,
          title: 'Mid-Project Review',
          details: 'Present your prototype progress and receive constructive feedback.',
          date: getCurrentDay(10),
          time: '11:30',
          duration: 90,
          bgcolor: 'teal',
          icon: 'fas fa-comments'
        },
        {
          id: 5,
          title: 'Design Refinement',
          details: 'Incorporate feedback and make improvements to your toy design.',
          date: getCurrentDay(20),
          time: '17:00',
          duration: 90,
          bgcolor: 'grey',
          icon: 'fas fa-pencil-alt'
        },
        {
          id: 6,
          title: 'Final Presentation Preparation',
          details: 'Prepare your final presentation showcasing your toy and its features.',
          date: getCurrentDay(22),
          time: '08:00',
          duration: 540,
          bgcolor: 'blue',
          icon: 'fas fa-clipboard-list'
        },
        {
          id: 7,
          title: 'Final Presentation Day',
          details: 'Present your completed toy design to the mentorship panel and peers.',
          date: getCurrentDay(22),
          time: '19:00',
          duration: 180,
          bgcolor: 'teal',
          icon: 'fas fa-presentation'
        },
        {
          id: 8,
          title: 'Networking Event',
          details: 'Meet industry professionals and explore opportunities in toy design.',
          date: getCurrentDay(27),
          bgcolor: 'purple',
          icon: 'fas fa-users',
          days: 2
        },
        {
          id: 9,
          title: 'Feedback and Reflection',
          details: 'Reflect on the mentorship experience and gather feedback for improvement.',
          date: getCurrentDay(27),
          bgcolor: 'purple',
          icon: 'fas fa-comments',
          days: 2
        },
        {
          id: 10,
          title: 'Celebration Event',
          details: 'Celebrate the completion of the mentorship program and all the toy designs!',
          date: getCurrentDay(29),
          bgcolor: 'purple',
          icon: 'fas fa-party-horn',
          days: 5
        }
      ]

    }
  },
  computed: {
    eventsMap() {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[event.date] = (map[event.date] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, {day: 1})
              if (!map[timestamp.date]) {
                map[timestamp.date] = []
              }
              map[timestamp.date].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log(map)
      return map
    },
    formattedDate() {
      const date = new Date(this.selectedDate)
      return date.toLocaleString('default', { month: 'long', year: 'numeric' })
    },
    sortedEvents() {
      return [...this.events].sort((a, b) => {
        const dateA = new Date(a.date + (a.time || ''));
        const dateB = new Date(b.date + (b.time || ''));
        return dateA - dateB;
      });
    }
  },
  methods: {
    badgeClasses(event, type) {
      return {
        [`text-white bg-${event.bgcolor}`]: true,
        'rounded-border': true
      }
    },
    badgeStyles(day, event) {
      const s = {}
      // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
      // s.top = 0
      // s.bottom = 0
      // s.width = (event.days * this.parsedCellWidth) + '%'
      return s
    },
    onToday() {
      this.$refs.calendar.moveToToday()
    },
    onPrev() {
      this.$refs.calendar.prev()
    },
    onNext() {
      this.$refs.calendar.next()
    },
    onMoved(data) {
      console.log('onMoved', data)
    },
    onChange(data) {
      console.log('onChange', data)
    },
    onClickDate(data) {
      console.log('onClickDate', data)
    },
    onClickDay(data) {
      console.log('onClickDay', data)
    },
    onClickWorkweek(data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek(data) {
      console.log('onClickHeadWorkweek', data)
    },
    formatEventDate(date) {
      return new Date(date).toLocaleDateString('default', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatEventDateShort(date) {
      return new Date(date).toLocaleDateString('default', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
    },
    formatDayHeader(date) {
      return new Date(date).toLocaleDateString('default', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    },
    getDaySchedule() {
      const events = this.sortedEvents.filter(
        event => event.date === this.selectedDate
      );
      if (events.length === 0) return 'No events scheduled';
      return `${events.length} event${events.length > 1 ? 's' : ''} scheduled`;
    },
    isToday(date) {
      const today = new Date();
      const compareDate = new Date(date);
      return today.toDateString() === compareDate.toDateString();
    },
    adjustColor(color, amount) {
      return color; // Implement color darkening logic if needed
    },
    formatTime(time) {
      return new Date(`2000/01/01 ${time}`).toLocaleTimeString('default', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    },
    formatDayHeader(date) {
      return new Date(date).toLocaleDateString('default', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    },
    getDayEventCount() {
      const events = this.eventsMap[this.selectedDate] || [];
      return events.length;
    },
    getDaySchedule() {
      const events = this.eventsMap[this.selectedDate] || [];
      if (events.length === 0) return 'No events';

      const times = events
        .filter(e => e.time)
        .map(e => e.time.split(':')[0]);

      if (times.length === 0) return 'All day';

      const start = Math.min(...times);
      const end = Math.max(...times);
      return `${start}:00 - ${end}:00`;
    },
    goToToday() {
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0]

      // Update selected date to today
      this.selectedDate = today

      // Switch view to day
      this.view = 'day'

      // Optional: Scroll to current time
      this.$nextTick(() => {
        if (this.$refs.calendar) {
          this.$refs.calendar.scrollToTime('08:00') // or any default time
        }
      })
    },

    // Optional: Method to scroll to current time
    scrollToCurrentTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const currentTime = `${hours}:${minutes}`

      if (this.$refs.calendar) {
        this.$refs.calendar.scrollToTime(currentTime)
      }
    },
    getDayEvents(date) {
      // Normalize both dates to YYYY-MM-DD format for comparison
      const normalizedDate = new Date(date).toISOString().split('T')[0];
      return this.events.filter(event => {
        const normalizedEventDate = new Date(event.date).toISOString().split('T')[0];
        return normalizedEventDate === normalizedDate;
      });
    }
  }
})
</script>

<style>
.my-event {
  position: relative;
  font-size: 12px;
  width: 100%;
  margin: 2px 0;
  padding: 4px 8px;
  justify-content: center;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.my-event:hover {
  transform: scale(1.02);
}

.title {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.text-white {
  color: white
}

.bg-blue {
  background: #4285f4
}

.bg-green {
  background: #34a853
}

.bg-orange {
  background: #fbbc05
}

.bg-red {
  background: #ea4335
}

.bg-teal {
  background: #009688
}

.bg-grey {
  background: #607d8b
}

.bg-purple {
  background: #673ab7
}

.rounded-border {
  border-radius: 4px
}

abbr.tooltip {
  text-decoration: none;
  cursor: help;
}

:deep(.q-calendar-month__head-workweek),
:deep(.q-calendar-month__head-day) {
  font-weight: 600;
  color: #333;
}

:deep(.q-calendar-month__day--current) {
  background-color: #f8f9fa;
}

.calendar-card {
  border-radius: 8px;
}

.calendar-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
}

:deep(.q-calendar-month__head-workweek),
:deep(.q-calendar-month__head-day) {
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 8px 0;
  background-color: #f8fafc;
  border-bottom: 1px solid #edf2f7;
}

:deep(.q-calendar-month__day) {
  border-color: #edf2f7;
  transition: all 0.3s ease;
  padding: 22px 2px 2px 2px !important;
}

.date-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.date-indicator.is-today {
  background-color: #080893;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(8,8,147,0.2);
}

.month-event {
  position: relative;
  margin: 2px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  color: white;
  min-height: 28px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.month-event:hover {
  transform: translateX(2px) scale(1.01);
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  z-index: 1;
}

.event-time-badge {
  margin-bottom: 2px;
}

.time-badge {
  font-size: 0.65rem;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 500;
}

.event-title {
  line-height: 1.2;
  font-size: 0.75rem;
  color: white;
  margin-bottom: 2px;
  white-space: normal;
  word-break: break-word;
}

.duration-chip {
  height: 16px;
  font-weight: 500;
  font-size: 0.6rem !important;
  padding: 0 4px;
}

/* Weekend styling */
:deep(.q-calendar-month__day--weekend) {
  background-color: #fafbff;
}

/* Current month vs other months */
:deep(.q-calendar-month__day--different-month) {
  opacity: 0.4;
  background-color: #f8f9fa;
}

/* Scrollbar styling */
:deep(.q-calendar-month__day) {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;
  overflow-y: auto;
  max-height: 100%;
}

:deep(.q-calendar-month__day::-webkit-scrollbar) {
  width: 3px;
}

:deep(.q-calendar-month__day::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.q-calendar-month__day::-webkit-scrollbar-thumb) {
  background-color: #cbd5e0;
  border-radius: 2px;
}

/* New glass effect for events */
.month-event::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255,255,255,0.08),
    rgba(255,255,255,0.03)
  );
  border-radius: 4px;
}

/* Hover animation */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.month-event:hover {
  animation: pulse 1s infinite;
}

/* Additional styles for better visibility */
:deep(.q-calendar-month__day) {
  background: white;
  position: relative;
}

:deep(.q-calendar-month__day:hover) {
  background-color: #f8fafc;
}

.custom-blue {
  background: #080893 !important;
  color: white !important;
}

.rounded-borders {
  border-radius: 4px;
}

.list-item {
  position: relative;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
  overflow: hidden;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.color-strip {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
}

.q-badge {
  font-size: 0.8em;
  border-radius: 4px;
  font-weight: 500;
}

/* Add these styles for the day view */
.day-view {
  background: white;
  border-radius: 8px;
}

.day-header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
}

.day-event {
  margin: 4px 8px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.day-event:hover {
  transform: translateX(4px);
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
}

.event-time {
  font-size: 0.9em;
  margin-bottom: 4px;
}

.event-title {
  font-size: 1.1em;
  line-height: 1.2;
  margin-bottom: 4px;
}

.event-details {
  font-size: 0.9em;
  line-height: 1.3;
}

.event-duration .q-chip {
  font-size: 0.75em;
}

/* Update existing calendar styles */
:deep(.q-calendar-agenda__body) {
  border-radius: 0 0 8px 8px;
}

:deep(.q-calendar-agenda__time) {
  font-weight: 500;
  color: #666;
}

:deep(.q-calendar-agenda__interval-text) {
  font-size: 0.8em;
  color: #888;
}

.month-event {
  position: relative;
  margin: 2px 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.month-event:hover {
  transform: translateX(4px);
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
}

.event-time {
  font-size: 0.7rem;
  opacity: 0.8;
}

.event-title {
  line-height: 1.2;
}

.event-duration {
  margin-top: 2px;
}

.today-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #080893;
}

:deep(.q-calendar-month__day) {
  border-color: #e0e0e0;
}

:deep(.q-calendar-month__head) {
  border-bottom: 2px solid #e0e0e0;
}

/* Base calendar styles */
.calendar-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
}

/* Day cell styling */
:deep(.q-calendar-month__day) {
  border-color: #edf2f7;
  padding: 20px 2px 2px 2px !important;
  position: relative;
  overflow: visible !important;  /* Allow hover cards to overflow */
}

/* Date indicator */
.date-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #64748b;
}

.date-indicator.is-today {
  background-color: #080893;
  color: white;
  font-weight: 600;
}

/* Events container */
.events-container {
  max-height: calc(100% - 24px);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 0 2px;
}

/* Event card */
.month-event {
  position: relative;
  margin: 2px 0;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  color: white;
  min-height: 22px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.event-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.time-badge {
  font-size: 0.65rem;
  padding: 0 4px;
  border-radius: 2px;
}

.event-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Hover card */
.event-hover-card {
  position: absolute;
  display: none;
  left: 100%;
  top: 0;
  width: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  padding: 12px;
  z-index: 1000;
  color: #333;
  animation: fadeIn 0.2s ease;
}

.month-event:hover .event-hover-card {
  display: block;
}

.event-hover-time {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4px;
}

.event-hover-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 4px;
}

.event-hover-details {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 8px;
}

.hover-duration-chip {
  background: #f1f5f9;
  color: #475569;
}

/* More events indicator */
.more-events {
  font-size: 0.7rem;
  color: #64748b;
  padding: 2px 6px;
  text-align: center;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Header styling */
:deep(.q-calendar-month__head-workweek),
:deep(.q-calendar-month__head-day) {
  font-weight: 600;
  color: #2c3e50;
  text-transform: uppercase;
  font-size: 0.7rem;
  padding: 6px 0;
  background-color: #f8fafc;
  border-bottom: 1px solid #edf2f7;
}

/* Scrollbar styling */
.events-container::-webkit-scrollbar {
  width: 3px;
}

.events-container::-webkit-scrollbar-track {
  background: transparent;
}

.events-container::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 2px;
}

/* Weekend styling */
:deep(.q-calendar-month__day--weekend) {
  background-color: #fafbff;
}

/* Different month styling */
:deep(.q-calendar-month__day--different-month) {
  background-color: #f8f9fa;
  opacity: 0.4;
}

/* Base calendar styles */
.calendar-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

/* Day cell styling */
:deep(.q-calendar-month__day) {
  border-color: #edf2f7;
  padding: 24px 4px 4px 4px !important;
  position: relative;
  overflow: visible !important;
}

/* Date indicator */
.date-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #64748b;
}

.date-indicator.is-today {
  background-color: #080893;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(8,8,147,0.2);
}

/* Events container */
.events-container {
  max-height: calc(100% - 24px);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 0 2px;
}

/* Event card */
.month-event {
  position: relative;
  margin: 3px 0;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}

.month-event:hover {
  transform: translateX(4px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.08);
}

/* Event content layout */
.event-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-time {
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.9;
  min-width: 45px;
}

.event-title {
  font-weight: 500;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Hover card */
.event-hover-card {
  display: none;
  position: absolute;
  left: calc(100% + 8px);
  top: -4px;
  width: 240px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 12px;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.month-event:hover .event-hover-card {
  display: block;
}

.hover-time {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
}

.hover-time .duration {
  margin-left: 6px;
  opacity: 0.8;
}

.hover-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1e293b;
  margin-bottom: 8px;
}

.hover-details {
  font-size: 0.8rem;
  color: #64748b;
  line-height: 1.4;
}

/* More events indicator with glass effect */
.more-events {
  font-size: 0.75rem;
  color: #64748b;
  padding: 4px 8px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 4px;
  margin-top: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

/* Enhanced animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

/* Adjusted styles for smaller day boxes */
:deep(.q-calendar-month__day) {
  border-color: #edf2f7;
  padding: 22px 4px 4px 4px !important;
  position: relative;
  overflow: visible !important;
}

/* Smaller date indicator */
.date-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 18px;
  height: 18px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #64748b;
}

/* Compact event cards */
.month-event {
  position: relative;
  margin: 2px 0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  min-height: 24px;
}

/* Compact event content */
.event-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-time {
  font-size: 0.65rem;
  font-weight: 500;
  opacity: 0.95;
  min-width: 40px;
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 4px;
  border-radius: 3px;
  display: flex;
  align-items: center;
}

.event-title {
  font-weight: 500;
  line-height: 1.1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Adjusted more events indicator */
.more-events {
  font-size: 0.65rem;
  color: #64748b;
  padding: 2px 6px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 3px;
  margin-top: 2px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* Calendar header adjustments */
:deep(.q-calendar-month__head-workweek),
:deep(.q-calendar-month__head-day) {
  font-weight: 600;
  color: #1e293b;
  text-transform: uppercase;
  font-size: 0.7rem;
  padding: 8px 0;
  background-color: #f8fafc;
  border-bottom: 1px solid #f1f5f9;
}

/* Hover card adjustments */
.event-hover-card {
  padding: 12px;
  border-radius: 6px;
  width: 220px;
}

.hover-time {
  font-size: 0.7rem;
}

.hover-title {
  font-size: 0.85rem;
  margin: 6px 0;
}

.hover-details {
  font-size: 0.75rem;
  line-height: 1.3;
}

/* Adjusted scrollbar */
.events-container::-webkit-scrollbar {
  width: 2px;
}

/* Container adjustments */
.events-container {
  max-height: calc(100% - 26px);
  padding: 0 2px;
}

/* Week Calendar Container */
.week-calendar {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  background: white;
}

/* Week Header */
.week-header {
  display: flex;
  border-bottom: 1px solid #edf2f7;
  background: #f8fafc;
}

.week-day-header {
  flex: 1;
  padding: 12px;
  text-align: center;
  border-right: 1px solid #edf2f7;
  transition: all 0.3s ease;
}

.week-day-header:hover {
  background: #f1f5f9;
}

.week-day-header.is-today {
  background: #e8f2ff;
  position: relative;
}

.week-day-header.is-today::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #2563eb;
}

.day-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.day-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

/* Time Labels */
.time-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  padding-right: 12px;
}

/* Week Events */
.week-event {
  margin: 2px 4px;
  padding: 8px 12px;
  border-radius: 8px;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
}

.week-event:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.event-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.event-time {
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(255,255,255,0.2);
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
}

.event-details {
  flex: 1;
}

.event-title {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2px;
}

.event-description {
  font-size: 0.75rem;
  opacity: 0.9;
}

.duration-chip {
  background: rgba(255,255,255,0.2) !important;
  color: white !important;
  font-weight: 500 !important;
  height: 20px;
}

/* Glass effect for events */
.week-event::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255,255,255,0.15),
    rgba(255,255,255,0.05)
  );
  border-radius: 8px;
  pointer-events: none;
}

/* Grid styling */
:deep(.q-calendar-agenda__body) {
  border-color: #edf2f7;
}

:deep(.q-calendar-agenda__time) {
  border-color: #edf2f7;
  background: #f8fafc;
}

/* Current time indicator */
:deep(.q-calendar-agenda__current) {
  height: 2px;
  background: #2563eb;
  opacity: 0.7;
}

/* Hover effects for time slots */
:deep(.q-calendar-agenda__interval:hover) {
  background: #f8fafc;
}

/* Weekend styling */
:deep(.q-calendar-agenda__day--weekend) {
  background: #fafbff;
}

/* Scrollbar styling */
.week-calendar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.week-calendar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.week-calendar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.week-calendar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Day Calendar Container */
.day-calendar {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  background: white;
}

/* Header Styling */
.day-header {
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #edf2f7;
}

.date-info {
  text-align: center;
}

.current-date {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.date-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
  color: #64748b;
  font-size: 0.9rem;
}

.total-events {
  display: flex;
  align-items: center;
  gap: 4px;
}

.total-events::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #2563eb;
  border-radius: 50%;
}

/* Event Styling */
.day-event {
  margin: 8px 12px;
  padding: 12px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.day-event:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.event-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

/* Time Column */
.time-column {
  min-width: 100px;
  text-align: center;
}

.event-time {
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.duration-chip {
  font-weight: 500 !important;
  height: 20px;
}

/* Details Column */
.details-column {
  flex: 1;
}

.event-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.event-description {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
}

/* Action Buttons */
.action-column {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.day-event:hover .action-column {
  opacity: 1;
}

/* Time Label */
.time-label {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
  padding-right: 16px;
}

/* Grid Styling */
:deep(.q-calendar-agenda__body) {
  border-color: #edf2f7;
}

:deep(.q-calendar-agenda__time) {
  border-color: #edf2f7;
  background: #f8fafc;
  width: 100px;
}

/* Current Time Indicator */
:deep(.q-calendar-agenda__current) {
  height: 2px;
  background: #2563eb;
  box-shadow: 0 0 4px rgba(37,99,235,0.4);
}

/* Time Intervals */
:deep(.q-calendar-agenda__interval) {
  border-color: #f1f5f9;
}

:deep(.q-calendar-agenda__interval:hover) {
  background: #f8fafc;
}

/* Scrollbar */
.day-calendar::-webkit-scrollbar {
  width: 8px;
}

.day-calendar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.day-calendar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 4px;
}

.day-calendar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Common styles for all views */
.calendar-container,
.week-calendar,
.day-calendar {
  border-radius: 0;  /* Removed corner radius */
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

/* Month View Adjustments */
.date-indicator {
  font-size: 0.75rem;  /* Reduced from 0.8rem */
  width: 16px;         /* Reduced from 18px */
  height: 16px;        /* Reduced from 18px */
}

.month-event {
  font-size: 0.65rem;  /* Reduced from 0.7rem */
  padding: 3px 6px;    /* Reduced padding */
}

.event-time {
  font-size: 0.6rem;   /* Reduced from 0.65rem */
  min-width: 35px;     /* Reduced from 40px */
}

/* Week View Adjustments */
.week-day-header .day-name {
  font-size: 0.7rem;   /* Reduced from 0.85rem */
}

.week-day-header .day-number {
  font-size: 1.2rem;   /* Reduced from 1.5rem */
}

.week-event {
  padding: 6px 10px;   /* Reduced from 8px 12px */
}

.week-event .event-time {
  font-size: 0.7rem;   /* Reduced from 0.8rem */
}

.week-event .event-title {
  font-size: 0.75rem;  /* Reduced from 0.9rem */
}

.week-event .event-description {
  font-size: 0.65rem;  /* Reduced from 0.75rem */
}

/* Day View Adjustments */
.day-header .current-date {
  font-size: 1.4rem;   /* Reduced from 1.8rem */
  font-weight: 600;    /* Reduced from 700 */
}

.date-meta {
  font-size: 0.75rem;  /* Reduced from 0.9rem */
}

.day-event {
  padding: 8px 10px;   /* Reduced from 12px */
}

.day-event .event-time {
  font-size: 0.75rem;  /* Reduced from 0.9rem */
}

.day-event .event-title {
  font-size: 0.85rem;  /* Reduced from 1rem */
}

.day-event .event-description {
  font-size: 0.75rem;  /* Reduced from 0.85rem */
}

/* Time Labels */
.time-label {
  font-size: 0.7rem;   /* Reduced from 0.8rem */
}

/* Header Adjustments */
:deep(.q-calendar-month__head-workweek),
:deep(.q-calendar-month__head-day) {
  font-size: 0.65rem;  /* Reduced from 0.7rem */
  padding: 6px 0;      /* Reduced from 8px */
}

/* Chips and Badges */
.duration-chip {
  font-size: 0.65rem !important;
  height: 16px !important;  /* Reduced from 20px */
}

/* Event Hover Cards */
.event-hover-card {
  font-size: 0.75rem;
  padding: 10px;       /* Reduced from 12px */
}

.hover-time {
  font-size: 0.65rem;  /* Reduced from 0.7rem */
}

.hover-title {
  font-size: 0.8rem;   /* Reduced from 0.85rem */
}

.hover-details {
  font-size: 0.7rem;   /* Reduced from 0.75rem */
}

/* More Events Indicator */
.more-events {
  font-size: 0.65rem;  /* Reduced from 0.75rem */
  padding: 2px 6px;    /* Reduced padding */
}

/* Grid Lines */
:deep(.q-calendar-agenda__body) {
  border-color: #edf2f7;
}

:deep(.q-calendar-agenda__time) {
  width: 80px;         /* Reduced from 100px */
}

/* Spacing Adjustments */
.day-header,
.week-header {
  padding: 12px 16px;  /* Reduced from 20px 24px */
}

.event-content {
  gap: 8px;           /* Reduced from 12px/16px */
}

/* Time Column */
.time-column {
  min-width: 80px;    /* Reduced from 100px */
}

/* Scrollbar */
:deep(.q-calendar-month__day::-webkit-scrollbar),
.week-calendar::-webkit-scrollbar,
.day-calendar::-webkit-scrollbar {
  width: 6px;         /* Reduced from 8px */
}

/* Additional Adjustments */
.event-hover-card {
  width: 200px;       /* Reduced from 220px */
}

/* Maintain clean borders */
:deep(.q-calendar-month__day),
:deep(.q-calendar-agenda__time),
:deep(.q-calendar-agenda__interval) {
  border-color: #edf2f7;
}

/* Current time indicator */
:deep(.q-calendar-agenda__current) {
  height: 1px;        /* Reduced from 2px */
}

.today-btn {
  font-weight: 500;
  color: #2563eb;
}

.today-btn:hover {
  background: #eff6ff;
}
</style>
