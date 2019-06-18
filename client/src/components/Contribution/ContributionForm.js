import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Button,
  Form,
} from 'react-bootstrap'

function ContributionForm(props) {
  const { projectId, onComplete } = props

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      formName,
      formAmount,
    } = e.currentTarget

    const params = {
      name: formName.value,
      amount: formAmount.value,
      project_id: projectId
    }

    try {
      const result = await axios.post('/api/contributions', params)
      const charge = result.data

      window.open(`https://dev-checkout.opennode.co/${charge.id}`)

      formName.value = ''
      formAmount.value = ''
      onComplete()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter full name"
        />
      <Form.Control.Feedback type="invalid">Please enter a name</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formAmount">
        <Form.Label>Contribution Amount</Form.Label>
        <Form.Control
          required
          type="number"
          placeholder="Enter Contribution"
          step="0.01"
        />
      <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

ContributionForm.propTypes = {
  projectId: PropTypes.string.isRequired,
}

export default ContributionForm
