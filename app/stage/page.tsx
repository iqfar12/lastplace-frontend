"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

const venues = [
  {
    id: "venue-1",
    name: "The Grand Theatre",
    location: "Downtown Arts District",
    capacity: 500,
    upcomingEvents: 8,
    image: "https://placehold.co/400x250?text=Grand+theatre+interior+with+red+velvet+seats+and+ornate+chandelier",
  },
  {
    id: "venue-2",
    name: "Riverside Arena",
    location: "Waterfront Plaza",
    capacity: 2000,
    upcomingEvents: 12,
    image: "https://placehold.co/400x250?text=Modern+arena+stage+with+dramatic+lighting+and+large+crowd",
  },
  {
    id: "venue-3",
    name: "Sunset Jazz Club",
    location: "Historic Quarter",
    capacity: 150,
    upcomingEvents: 5,
    image: "https://placehold.co/400x250?text=Intimate+jazz+club+with+dim+lighting+and+piano+on+stage",
  },
  {
    id: "venue-4",
    name: "City Convention Center",
    location: "Business District",
    capacity: 5000,
    upcomingEvents: 15,
    image: "https://placehold.co/400x250?text=Large+convention+center+hall+with+modern+architecture+and+glass+ceiling",
  },
]

export default function StageList() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Stage Calendar</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your venue events</p>
            </div>
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Select a Venue</h2>
          <p className="text-muted-foreground">Browse and manage events across all venues</p>
        </div>

        {/* Venue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Link href={`/stage/${venue.id}`} key={venue.id}>
              <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer">
                {/* Venue Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={venue.image || "/placeholder.svg"}
                    alt={`${venue.name} venue interior showing stage and seating area`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {venue.upcomingEvents}
                    </span>
                  </div>
                </div>

                {/* Venue Info */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {venue.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {venue.capacity.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {venue.upcomingEvents} upcoming {venue.upcomingEvents === 1 ? "event" : "events"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
