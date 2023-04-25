import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTaskToDatabase } from '../../redux/actions/actions';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Forms.scss';

const Forms = ({ setShowForms }) => {
    const [titleTask, setTitleTask] = useState('');
    const [descrTask, setDescrTask] = useState('');

    const dispatch = useDispatch();
    const tasks = useSelector(elem => elem.tasks.data); 

    // add task
    const createTaskToDatabase = () => {
        const uid = uuidv4();

        let task = {
            titleTask,
            descrTask,
            id: uid,
            stateTask: false
        }

        const added = [task, ...Object.values(tasks)];

        dispatch(addNewTaskToDatabase(task, added, uid))

        setTitleTask('');
        setDescrTask('');
    }

    const enterTextInTitle = (e) => {
        setTitleTask(e.target.value);
    }

    const enterTextInDescr = (e) => {
        setDescrTask(e.target.value);
    }

    return (
        <div className="forms">
            <button 
                className="forms_close"
                onClick={() => setShowForms(false)}    
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <div className="forms_input_box">
                <input 
                    type="text" 
                    required='required' 
                    value={titleTask}
                    onChange={enterTextInTitle}
                />
                <span>Enter title task</span>
            </div>

            <div className="forms_input_box">
                <input 
                    type="text" 
                    required='required' 
                    value={descrTask}
                    onChange={enterTextInDescr}
                />
                <span>Enter description task</span>
            </div>

            <button 
                className='forms_btn'
                onClick={createTaskToDatabase}
            >
                Submit
            </button>
        </div>
    )
}

export default Forms;