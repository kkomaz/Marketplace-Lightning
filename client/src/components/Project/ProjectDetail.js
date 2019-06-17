import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ProjectDetail() {
  const [contributions, setContributions] = useState([])

  useEffect(() => {
    fetchContributions()
  }, [])

  const fetchContributions = async () => {
    const result = await axios.get('/api/contributions')
    setContributions(result.data)
  }

  console.log(contributions)

  return (
    <div>
      Hello World
    </div>
  )
}

export default ProjectDetail
