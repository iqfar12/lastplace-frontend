"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [venueName, setVenueName] = useState("")
  const [loginId, setLoginId] = useState("")
  const [calendarId, setCalendarId] = useState("")
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple mock authentication
    if (isLogin) {
      // Store user session
      localStorage.setItem("user", JSON.stringify({ email, isLoggedIn: true }))
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          name,
          venueName,
          loginId,
          calendarId,
          isLoggedIn: true,
        }),
      )
    }

    // Redirect to stage page (demo venue)
    router.push("/stage/venue-1")
  }

  const handleContinueAsGuest = () => {
    // Clear any existing session
    localStorage.removeItem("user")
    router.push("/stage/venue-1")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Stage Calendar</h1>
          </div>
          <CardTitle className="text-foreground">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {isLogin
              ? "Sign in to manage and view private event details"
              : "Sign up to register your venue and sync with Google Calendar"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="venueName" className="text-foreground">
                    Venue Name
                  </Label>
                  <Input
                    id="venueName"
                    type="text"
                    placeholder="Blue Note Jazz Club"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    required={!isLogin}
                    className="bg-secondary border-border text-foreground"
                  />
                </div>

              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-secondary border-border text-foreground"
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="calendarId" className="text-foreground">
                    Google Calendar ID
                  </Label>
                  <Input
                    id="calendarId"
                    type="text"
                    placeholder="your-calendar@group.calendar.google.com"
                    value={calendarId}
                    onChange={(e) => setCalendarId(e.target.value)}
                    required={!isLogin}
                    className="bg-secondary border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-foreground">
                    API Key / Access Token
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Read-only access token"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required={!isLogin}
                    className="bg-secondary border-border text-foreground"
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 space-y-3">
            <Button
              variant="outline"
              className="w-full border-border text-foreground hover:bg-accent bg-transparent"
              onClick={handleContinueAsGuest}
            >
              Continue as Guest
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
