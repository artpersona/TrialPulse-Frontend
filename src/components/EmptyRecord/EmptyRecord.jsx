import Empty from "src/assets/svgs/blank.svg";

function EmptyRecord(props) {
  const { handleClick, buttonLabel } = props;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img src={Empty} alt="" className="h-52 mb-2" />
      <h1 className="text-2xl font-medium mt-4">Record is Empty</h1>
      <p className="text-center text-md opacity-90">
        Unfortunately, there are no records available <br />
        at the moment.
      </p>
      <button
        className="has-transition mt-2 bg-secondary text-white w-56 py-2 rounded-sm hover:bg-secondary-dark"
        onClick={handleClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default EmptyRecord;
