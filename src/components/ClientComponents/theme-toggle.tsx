"use client"

import {useState} from "react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState("dark")

const toggleTheme = () => { 
  if (currentTheme === "light") {
    setCurrentTheme("dark")
    setTheme("dark")
  } else {
    setCurrentTheme("light")
    setTheme("light")
  }
}

  return (
    <div>
        <p className="text-sm" onClick={toggleTheme}>
          {currentTheme === "light" ? "Light Mode" : "Dark Mode" }
        </p>
    </div>
  )
}
