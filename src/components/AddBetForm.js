import React, {useState} from 'react';
import { TextField, Button, MenuItem, Paper, Typography, Grid2 } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import axios from 'axios';

const categories = [{
    value: 'Sports',
    label: 'Sports'
    }, {
    value: 'Casino',
    label: 'Casino'
    }, {
    value: 'E-Sports',
    label: 'E-Sports'
}];

const AddBetForm = ({onBetAdded}) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(null);
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!description || !amount || !date || !category) {
            alert('Please fill out all fields');
            return;
        }
        
        const newBet = {
            description,
            amount: parseFloat(amount),
            date: date.toISOString(),
            category: "Pending"
        };
        
        try {
            const response = await axios.post('http://localhost:5000/bets', newBet);
            if(response.status=== 201){
                alert('Bet added successfully');
                // Clear the form
                setDescription('');
                setAmount('');
                setDate(null);
                setCategory('');

                // Notify parent component to refresh data
            if (onBetAdded) onBetAdded();
            }
        } catch (error) {
            console.error('There was an error adding the bet:', error);
            alert('There was an error adding the bet. Please try again.');
        }
    };

    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Add a New Bet
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              {/* Description Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid2>
    
              {/* Amount Spent Field */}
              <Grid2 item xs={12}>
                <TextField
                  label="Amount Spent ($)"
                  variant="outlined"
                  type="number"
                  inputProps={{ min: '0', step: '0.01' }}
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Grid2>
    
              {/* Date Picker */}
              <Grid2 item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Bet"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
              </Grid2>
    
              {/* Category Field */}
              <Grid2 item xs={12}>
                <TextField
                  select
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid2>
    
              {/* Submit and Reset Buttons */}
              <Grid2 item xs={12} container spacing={2} justifyContent="flex-end">
                <Grid2 item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add Bet
                  </Button>
                </Grid2>
                <Grid2 item>
                  <Button
                    type="reset"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setDescription('');
                      setAmount('');
                      setDate(null);
                      setCategory('');
                    }}
                  >
                    Reset
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </form>
        </Paper>
      );
    };
    
    export default AddBetForm;