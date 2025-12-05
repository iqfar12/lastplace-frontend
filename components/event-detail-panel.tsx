"use client"

import { X, Clock, Ticket, DollarSign, User, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEventDto } from "@/api/generated/models"


interface EventDetailPanelProps {
  event: CalendarEventDto
  isLoggedIn: boolean
  onClose: () => void
}

export function EventDetailPanel({ event, isLoggedIn, onClose }: EventDetailPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-in slide-in-from-bottom">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
        <div className="container mx-auto px-4 py-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
                {isLoggedIn && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                    Full Access
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">
                {new Date(event.startTime || '').toLocaleDateString("default", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Poster */}
            <div>
              <Card className="overflow-hidden border-border">
                <img
                  src={event.posterUrl || "/placeholder.svg"}
                  alt={`Event poster for ${event.title}`}
                  className="w-full h-auto object-cover"
                />
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4">
              {/* Public Information */}
              <Card className="p-4 border-border bg-card">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-primary" />
                  Event Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Time</p>
                      <p className="text-sm text-muted-foreground">{event.startTime}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <a
                      href={event.ticketLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Ticket className="h-4 w-4" />
                      Get Tickets
                    </a>
                  </div>
                </div>
              </Card>

              {/* Private Information - Only shown when logged in */}
              {isLoggedIn && (
                <Card className="p-4 border-primary/50 bg-primary/5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Private Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Contact Person</p>
                        <p className="text-sm text-muted-foreground">{event.contractUrl}</p>
                      </div>
                    </div>
                    {event.description && (
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Notes</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Login prompt for non-logged-in users */}
              {!isLoggedIn && (
                <Card className="p-4 border-border bg-muted/50">
                  <p className="text-sm text-muted-foreground text-center">
                    <a href="/auth" className="text-primary hover:underline font-medium">
                      Sign in
                    </a>{" "}
                    to view budget, contact details, and private notes
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
