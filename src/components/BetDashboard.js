// src/components/BetDashboard.js

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid2
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AddBetForm from './AddBetForm';
import axios from 'axios';
const COLORS = ['#00C49F', '#FF0000'];

const BetDashboard = () => {
  const [recentBets, setRecentBets] = useState([]);
  const [balanceSummary, setBalanceSummary] = useState({
    totalBet: 0,
    totalWinnings: 0,
    netProfit: 0,
  });
  const [betData, setBetData] = useState([]);

  const fetchBets = async () => {
    try {
      // Replace with your backend API endpoint
      const response = await axios.get('/api/bets');
      if (response.status === 200) {
        const bets = response.data;
        setRecentBets(bets.slice(-5)); // Get the last 5 bets

        // Calculate summary
        const totalBet = bets.reduce((acc, bet) => acc + bet.amount, 0);
        const totalWinnings = bets
          .filter((bet) => bet.result === 'Won')
          .reduce((acc, bet) => acc + (bet.amount * parseFloat(bet.odds)), 0);
        const totalLosses = bets
          .filter((bet) => bet.result === 'Lost')
          .reduce((acc, bet) => acc + bet.amount, 0);
        const netProfit = totalWinnings - totalLosses;

        setBalanceSummary({
          totalBet,
          totalWinnings,
          netProfit,
        });

        // Prepare data for PieChart
        setBetData([
          { name: 'Won', value: totalWinnings },
          { name: 'Lost', value: totalLosses },
        ]);
      }
    } catch (error) {
      console.error('Error fetching bets:', error);
    }
  };

  useEffect(() => {
    fetchBets();
  }, []);

  return (
    <Grid2 container spacing={3}>
      {/* Profit/Loss Overview */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Profit & Loss Overview</Typography>
          <Typography>Total Bets: ${balanceSummary.totalBet.toFixed(2)}</Typography>
          <Typography>Total Winnings: ${balanceSummary.totalWinnings.toFixed(2)}</Typography>
          <Typography>Net Profit: ${balanceSummary.netProfit.toFixed(2)}</Typography>
        </Paper>
      </Grid2>

      {/* Quick Actions */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Quick Actions</Typography>
          <AddBetForm onBetAdded={fetchBets} />
        </Paper>
      </Grid2>

      {/* Bet Breakdown */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Betting Breakdown</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={betData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {betData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid2>

      {/* Recent Bets */}
      <Grid2 xs={12}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Recent Bets</Typography>
          <List>
            {recentBets.map((bet, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${bet.description} - $${bet.amount.toFixed(2)} @ ${bet.odds}x`}
                  secondary={`Result: ${bet.result} on ${bet.date}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid2>

      {/* Placeholder for Future Graphs */}
      <Grid2 xs={12}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Betting Trends (Graph Placeholder)</Typography>
          <Typography>
            Here you could add a line chart to show trends in betting over time.
          </Typography>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default BetDashboard;
