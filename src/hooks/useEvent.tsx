import { createContext, useContext, useState } from 'react'

const EventContext = createContext<
  | {
      publish: (eventName: string, data: any) => void
      subscribe: (eventName: string, callback: any) => void
      unsubscribe: (eventName: string, callback: any) => void
    }
  | undefined
>(undefined)

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState({})

  const subscribe = (eventName, callback) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: [...(prevEvents[eventName] || []), callback],
    }))
  }

  const unsubscribe = (eventName, callback) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: (prevEvents[eventName] || []).filter(
        (cb) => cb !== callback
      ),
    }))
  }

  const publish = (eventName, data) => {
    const arr = events?.[eventName] ?? []
    arr.forEach((callback) => callback(data))
  }

  return (
    <EventContext.Provider value={{ subscribe, unsubscribe, publish }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvent = () => useContext(EventContext)
