import React from 'react';
import { Grid2, Paper, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const recentBets = [
  { description: "Bet on Soccer Game", amount: "$100", odds: "2.5x", result: "Pending", date: "2024-09-15" },
  { description: "Bet on Basketball", amount: "$50", odds: "1.8x", result: "Won", date: "2024-09-10" },
  { description: "Bet on Horse Race", amount: "$200", odds: "5x", result: "Lost", date: "2024-09-01" },
];

const balanceSummary = {
  totalBet: "$350",
  totalWinnings: "$90",
  netProfit: "-$260"
};

const betData = [
  { name: "Won", value: 90 },
  { name: "Lost", value: 260 },
];

// Colors for the pie chart sections
const COLORS = ['#00C49F', '#FF0000'];

const Dashboard = () => {

  return (
    <Grid2 container spacing={3}>
      
      {/* Summary Stats */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Betting Overview</Typography>
          <Typography>Total Bets: {balanceSummary.totalBet}</Typography>
          <Typography>Total Winnings: {balanceSummary.totalWinnings}</Typography>
          <Typography>Net Profit: {balanceSummary.netProfit}</Typography>
        </Paper>
      </Grid2>

      {/* Quick Actions */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Quick Actions</Typography>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px', marginRight:'10px' }}>Add Bet</Button>
          <Button variant="contained" color="secondary" style={{ marginBottom: '10px' }}>Settle Bet</Button>
          <Button variant="contained" color="primary" style={{ marginBottom: '10px', marginLeft:'10px' }}>Add Event</Button>
        </Paper>
      </Grid2>

      {/* Bet Breakdown */}
      <Grid2 xs={12} sm={4}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Betting Breakdown</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={betData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
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
                  primary={`${bet.description} - ${bet.amount} - ${bet.odds}`}
                  secondary={`Result: ${bet.result} on ${bet.date}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid2>
      
      {/* Future Widgets for Graphs or Detailed Breakdown */}
      <Grid2 xs={12}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Betting Trends (Graph Placeholder)</Typography>
          <Typography>Here you could add a line chart to show trends in betting over time.</Typography>
        </Paper>
      </Grid2>

    </Grid2>
  );
};

export default Dashboard;
