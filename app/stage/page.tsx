"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, LogOut, MapPin, User, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useGetVenueList } from "@/api/generated/services/venue-controller/venue-controller"
import { VenueResponse } from "@/api/generated/models"
import { useRouter } from "next/router"

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
  const [user, setUser] = useState(undefined);
  const {data, isLoading} = useGetVenueList();

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(undefined)
  }


  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Stage Calendar</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage your venue events</p>
            </div>
            {user?.isLoggedIn ? 
              <>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.email}</span>
                </div>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="border-border text-foreground hover:bg-accent bg-transparent"
                  >
                    <LogOut className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </Link>
              </> 
              :
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Select a Venue</h2>
          <p className="text-muted-foreground">Browse and manage events across all venues</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((venue: VenueResponse) => (
            <Link href={`/stage/${venue.venueId}`} key={venue.venueId}>
              <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer">
                {/* Venue Image */}
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={"/placeholder.svg"}
                    alt={`${venue.venueName} venue interior showing stage and seating area`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {venue.venueName}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
