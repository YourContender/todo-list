import './StartWork.scss';

const StartWork = ({ setShowForms }) => {
    return (
        <div className="start">
            <button onClick={() => setShowForms(true)}>
                Create Task
            </button>

            <button>
                Filters
            </button>
        </div>
    )
}

export default StartWork;