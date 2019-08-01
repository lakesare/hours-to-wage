import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function App() {
  const [formValues, setFormValues] = React.useState({
    hourlyWage: 35,
    amountOfHours: '00:00:00'
  });

  const [dollarsEarned, setDollarsEarned] = React.useState('');

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const calculate = () => {
    const timeArray = formValues.amountOfHours.split(':');
    const hours   = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    const seconds = parseInt(timeArray[2], 10);

    const hourlyWage = formValues.hourlyWage;

    // Which means I get 35/60/60 dollars per second.
    const wagePerSecond = hourlyWage / 60.0 / 60.0;
    // I worked for (65 * 60 * 60 + 15 * 60 + 0) seconds.
    const amountOfSecondsWorked = hours * 60 * 60 + minutes * 60 + seconds;

    const newDollarsEarned = wagePerSecond * amountOfSecondsWorked;
    setDollarsEarned(String('$' + newDollarsEarned.toFixed(2)));
  }

  return (
    <main>
      <TextField
        label="Hourly wage"
        placeholder="25"
        helperText="Input your hourly wage in dollars (e.g. 25)"
        margin="normal"
        variant="outlined"
        type="number"

        value={formValues.hourlyWage}
        onChange={handleChange('hourlyWage')}
      />

      <TextField
        label="Amount of hours"
        helperText="Amount of hours you worked"
        margin="normal"
        variant="outlined"
        type="text"

        value={formValues.amountOfHours}
        onChange={handleChange('amountOfHours')}
      />

      <Button
        variant="outlined"
        color="primary"
        onClick={calculate}
      >
        Calculate
      </Button>

      <hr/>
      <div className="result">
        {dollarsEarned}
      </div>
    </main>
  );
}

export default App;
