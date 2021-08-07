const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
  
    return (
      <label className="label huge">
        {(isDeposit!=null) && 
        <div>
          <h3> {choice[Number(!isDeposit)]}</h3>
          <input id="number-input" type="number" width="200" onChange={onChange}></input>
          <input className="submit" type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
        </div>}
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [changingState, setChangingState] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [atmMode, setAtmMode] = React.useState("");
    const [isDeposit, setIsDeposit] = React.useState(null);
    const [validTransaction, setValidTransaction] = React.useState(false);

    const animate = (newTotal, previousTotal) => {
        if(newTotal == previousTotal){
          setChangingState(newTotal);
          return;
        }
        if(newTotal > previousTotal){
          setChangingState(previousTotal++);
        }
        else{
          setChangingState(previousTotal--);
        }
        
        setTimeout(()=>{
          animate(newTotal, previousTotal);
        },50);
    }

    React.useEffect(() => {
        setTimeout(()=>{animate(totalState, changingState);},50);
    },[totalState]);

    let status = `Account Balance $ ${changingState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      console.log(`handleChange ${event.target.value}`);
      if(event.target.value <= 0){
        setValidTransaction(false);
        return;
      }
      if(atmMode == "Cash Back" && event.target.value > totalState){
        setValidTransaction(false);
      }
      else{
        setValidTransaction(true);
      }
      setDeposit(Number(event.target.value));
    };
  
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      //setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      console.log(`handleModeSelect ${event.target.value}`);
      setAtmMode(event.target.value);
      
      switch(event.target.value){
        case "Deposit":
          setIsDeposit(true);
          break;
        case "Cash Back":
          setIsDeposit(false);
          break;
        default:
          console.log("Nothing to do");
      }
    
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));