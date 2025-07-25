import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { string } from 'zod'

function TypeWriter({message} : {message : string}) {
  return (
     <Typewriter
                                words={[message]}
                                loop={1}
                                cursor
                                cursorStyle={false}
                                typeSpeed={30}
                                deleteSpeed={50}
                                delaySpeed={1000}
                              />
  )
}

export default TypeWriter