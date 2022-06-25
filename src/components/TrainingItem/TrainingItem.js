import React from 'react'
import PropTypes from 'prop-types'

function TrainingItem({training, deleteTraining}) {
    // const {training, delete: handlerDelete } = props;
  return (
    <>
        <tr>
            <td>
                {training.date}
            </td>
            <td>
                {training.range}
            </td>
            <td>
                <div onClick={() => deleteTraining(training.date)}>X</div>
            </td>
        </tr>
    </>
  )
}

TrainingItem.propTypes = {}

export default TrainingItem
