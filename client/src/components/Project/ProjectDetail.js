import React, { useState, useEffect } from 'react'
import { Table, ProgressBar } from 'react-bootstrap'
import _ from 'lodash'
import PropTypes from 'prop-types'
import axios from 'axios'

function ProjectDetail(props) {
  const { project } = props
  const [contributions, setContributions] = useState([])
  const [total, setTotal] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetchContributions()
  }, [])

  const calculateContributions = (contributions) => {
    const result = _.map(contributions, 'amount')
    const total = _.sum(result)
    const progress = (total / project.goal * 100)
    setTotal(total)
    setProgress(progress)
  }

  const fetchContributions = async () => {
    const result = await axios.get('/api/contributions', {
      params: {
        paid: true,
        project_id: project._id,
      }
    })
    setContributions(result.data)
    calculateContributions(result.data)
  }

  return (
    <div>
      <p><span style={{ fontWeight: '800'}}>${total.toFixed(2)} raised</span> of ${project.goal}</p>

      <ProgressBar now={progress} />

      <p style={{ margin: '10px 0' }}>
        {project.description}
      </p>

      <div style={{ marginTop: '10px' }}>
        <h5>
          Contributors
        </h5>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contribution Amount</th>
            </tr>
          </thead>
          <tbody>
            {
              contributions.map(contributor => (
                <tr key={contributor._id}>
                  <td>{contributor.name}</td>
                  <td>${contributor.amount.toFixed(2)}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

ProjectDetail.propTypes ={
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goal: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired
}

export default ProjectDetail
