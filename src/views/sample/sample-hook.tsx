import { useState } from "react"

export const useTextController = () => {
  const [text, setText] = useState("")
  const handleChange = (value: string) => setText(value)

  return {
    text,
    handleChange,
  }
}
