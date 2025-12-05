"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CalendarIcon, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/calendar"
import { EventDetailPanel } from "@/components/event-detail-panel"
import { useGetEvents, useGetVenueInfo } from "@/api/generated/services/venue-controller/venue-controller"
import { CalendarEventDto } from "@/api/generated/models"

const mockEvents = [
  {
    id: "1",
    date: new Date(2025, 11, 15),
    title: "Live Jazz Night",
    time: "8:00 PM - 11:00 PM",
    poster: "https://placehold.co/800x600?text=Live+Jazz+Night+poster+with+saxophone+and+warm+stage+lighting",
    ticketLink: "https://tickets.example.com/jazz-night",
    budget: "$5,000",
    contactPerson: "John Smith",
    notes: "Setup starts at 6 PM. Need extra microphones for brass section.",
  },
  {
    id: "2",
    date: new Date(2025, 11, 22),
    title: "Comedy Open Mic",
    time: "7:30 PM - 10:00 PM",
    poster: "https://placehold.co/800x600?text=Comedy+Open+Mic+poster+with+spotlight+and+microphone+stand",
    ticketLink: "https://tickets.example.com/comedy-night",
    budget: "$2,500",
    contactPerson: "Sarah Johnson",
    notes: "Reserve front row tables for VIP guests.",
  },
  {
    id: "3",
    date: new Date(2025, 11, 28),
    title: "Acoustic Showcase",
    time: "8:00 PM - 10:30 PM",
    poster: "https://placehold.co/800x600?text=Acoustic+Showcase+poster+with+guitar+and+warm+ambient+lighting",
    ticketLink: "https://tickets.example.com/acoustic",
    budget: "$3,200",
    contactPerson: "Mike Davis",
    notes: "Check sound system for acoustic setup. Minimal lighting required.",
  },
  {
    id: "4",
    date: new Date(2025, 11, 5),
    title: "Rock Band Festival",
    time: "7:00 PM - 12:00 AM",
    poster:
      "https://placehold.co/800x600?text=Rock+Band+Festival+poster+with+electric+guitars+and+dramatic+stage+lights",
    ticketLink: "https://tickets.example.com/rock-fest",
    budget: "$8,500",
    contactPerson: "Emily Chen",
    notes: "Security needed. Full stage setup with pyrotechnics. Insurance confirmed.",
  },
]

export default function StagePage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name?: string; isLoggedIn: boolean } | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventDto | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  console.log(params.venueId);
  const {data: venue} = useGetVenueInfo(parseInt(params?.venueId)|| 0);
  const {data: event} = useGetEvents(venue?.venueId || 0, {}, {query: {
    queryKey: [venue]
  }})

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser(null);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/auth")
  }

  const handleLogin = () => {
    router.push("/auth")
  }

  const handleEventClick = (event: CalendarEventDto) => {
    setSelectedEvent(event)
  }

  const handleClosePanel = () => {
    setSelectedEvent(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Stage Calendar</h1>
              <p className="text-sm text-muted-foreground">Venue: {venue?.venueName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-border text-foreground hover:bg-accent bg-transparent"
                >
                  <LogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleLogin}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Event Calendar</h2>
          <p className="text-muted-foreground">
            {user?.isLoggedIn
              ? "View all event details including private information"
              : "View public event information. Sign in to see private details."}
          </p>
        </div>

        <Calendar
          events={event || []}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onEventClick={handleEventClick}
        />
      </main>

      {/* Event Detail Panel */}
      {selectedEvent && (
        <EventDetailPanel event={selectedEvent} isLoggedIn={user?.isLoggedIn ?? false} onClose={handleClosePanel} />
      )}
    </div>
  )
}
