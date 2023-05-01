import './StartWork.scss';

const StartWork = ({ setShowForms }) => {
    return (
        <div className="start">
            <button onClick={() => setShowForms(true)}>
                Create Task
            </button>

            <div className='start_filters'>
                <span>
                    <a href="#">All tasks</a>
                </span>
                <span>
                    <a href="#">Completed</a>
                </span>
                <span>
                    <a href="#">Process</a>
                </span>
            </div>
        </div>
    )
}

export default StartWork;