const ProgressBar = ({ step }) => {

const width = (step / 4) * 100;

return (

<div className="progress-bar">

  <div
    className="progress"
    style={{ width: `${width}%` }}
  >
  </div>

</div>


);
};

export default ProgressBar;
