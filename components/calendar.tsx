"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CalendarEventDto } from "@/api/generated/models"

interface CalendarProps {
  events: CalendarEventDto[]
  currentMonth: Date
  onMonthChange: (date: Date) => void
  onEventClick: (event: CalendarEventDto) => void
}

export function Calendar({ events, currentMonth, onMonthChange, onEventClick }: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek }
  }

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startTime || '')
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth.getMonth() &&
        eventDate.getFullYear() === currentMonth.getFullYear()
      )
    })
  }

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="p-4 border-border bg-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">{monthName}</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
            className="border-border text-foreground hover:bg-accent bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="border-border text-foreground hover:bg-accent bg-transparent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const dayEvents = getEventsForDay(day)
          const today = new Date()
          const isToday =
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear()

          return (
            <div
              key={day}
              className={cn(
                "aspect-square border border-border rounded-lg p-2 hover:bg-accent/50 transition-colors",
                isToday && "border-primary border-2",
              )}
            >
              <div className="flex flex-col h-full">
                <span className={cn("text-sm font-medium mb-1", isToday ? "text-primary" : "text-foreground")}>
                  {day}
                </span>
                <div className="flex-1 space-y-1 overflow-y-auto">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="w-full text-left text-xs p-1 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors truncate"
                    >
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
