export default function ActionsApp({
  isRunning,
  isLoading,
  handleStart,
  handleStop,
}) {
  return (
    <div className="button-wrapper style1">
      <button
        type="button"
        disabled={isLoading}
        onClick={() => {
          isRunning ? handleStop() : handleStart();
        }}
        className="background-button"
        title={isRunning ? "STOP" : "START"}
      ></button>
    </div>
  );
}
