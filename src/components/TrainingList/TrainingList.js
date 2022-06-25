import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TrainingModel from '../../models/TrainingModel'
import TrainingItem from '../TrainingItem/TrainingItem';
import {nanoid} from 'nanoid';

function TrainingList(props) {
    const [trainings, setTrainings ] = useState([]);
    const [form, setForm] = useState({
        date: '',
        range: '',
    });

    const handleChange = ({target}) => {
        const {name, value} = target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };
    
    const handleSubmit = evt => {
        evt.preventDefault();
        const training = new TrainingModel(nanoid() , form.date , form.range);
        const index = trainings.findIndex(t => t.date === form.date);
        if (index !== -1 ){
            const dateUpdate = {
                date: form.date,
                range: Number(trainings[index].range) + Number(form.range)

            };
            const tmp = trainings;
            tmp.splice(index, 1, dateUpdate);
            setTrainings([]);
            setTrainings([...tmp]);
            return;
        } else {
            setTrainings(prevTrainigs => [ ...prevTrainigs, training] );
        }
        setForm({
            date: '',
            range: ''
        });
        
    };
    const handlerDelete = (date) => {
        const index = trainings((training) => training.date === date);
        const tmp = trainings;   
        tmp.splice(index,1);
        setTrainings([]);
        setTrainings([...tmp]);
        return;
    };


  return (
    <>
    <form onSubmit={handleSubmit}>
        <span>
        <label htmlFor="date">Дата (дд.мм.гг)</label>
        <input id="date" name="date" value={form.date} onChange={handleChange} />
        </span>
        <span>
        <label htmlFor="range">Пройдено км</label>
        <input id="range" name="range" value={form.range} onChange={handleChange}/>
        </span>
        <span>
        <button type='submit'>Добавить</button>
        </span>
    </form>
    <table>
        <thead>
        <tr>
            <th>Дата</th>
            <th>Расстояние</th>
            <th>Действия</th>
         </tr>
         </thead>
         <tbody>
            {trainings.map(o => <TrainingItem key={o.id} training={o}  deleteTraining={handlerDelete}/> )}
        </tbody>
    </table>
    </>
  )
}

TrainingList.propTypes = {
}

export default TrainingList
