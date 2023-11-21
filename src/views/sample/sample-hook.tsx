
import { useState } from "react"

export const useTextController = () => {
  const [text, setText] = useState("")
  const handleOnChange = (value: string) => setText(value)

  return {
    text,
    handleOnChange,
  }
}

