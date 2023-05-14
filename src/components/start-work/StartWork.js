import './StartWork.scss';

const StartWork = ({ setShowForms, changeFIlterTasks }) => {
    return (
        <div className="start">
            <button onClick={() => setShowForms(true)}>
                Create Task
            </button>

            <div className='start_filters'>
                <span>
                    <a 
                        href="#"
                        onClick={() => changeFIlterTasks('all')}
                    >All tasks</a>
                </span>
                <span>
                    <a 
                        href="#"
                        onClick={() => changeFIlterTasks('done')}
                    >Completed</a>
                </span>
                <span>
                    <a 
                        href="#"
                        onClick={() => changeFIlterTasks('proc')}
                    >Process</a>
                </span>
            </div>
        </div>
    )
}

export default StartWork;