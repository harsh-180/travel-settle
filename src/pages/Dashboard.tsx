import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Plane,
  Receipt,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTrips, mockTransactions, formatCurrency, currentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const recentTrips = mockTrips.slice(0, 3);
  const recentTransactions = mockTransactions.slice(0, 4);
  
  // Calculate stats
  const totalOwed = mockTrips.reduce((sum, trip) => sum + (trip.myBalance < 0 ? Math.abs(trip.myBalance) : 0), 0);
  const totalOwedToMe = mockTrips.reduce((sum, trip) => sum + (trip.myBalance > 0 ? trip.myBalance : 0), 0);
  const activeTrips = mockTrips.filter(trip => !trip.isArchived).length;
  const pendingSettlements = 2; // Mock data

  const stats = [
    {
      title: 'Active Trips',
      value: activeTrips.toString(),
      icon: Plane,
      description: 'Currently active',
      trend: '+2 this month',
      trendUp: true,
    },
    {
      title: 'You Owe',
      value: formatCurrency(totalOwed),
      icon: TrendingDown,
      description: 'Total amount you owe',
      trend: '-$45.21 from last month',
      trendUp: false,
      color: 'expense',
    },
    {
      title: 'Owed to You',
      value: formatCurrency(totalOwedToMe),
      icon: TrendingUp,
      description: 'Total amount owed to you',
      trend: '+$128.90 from last month',
      trendUp: true,
      color: 'success',
    },
    {
      title: 'Pending Settlements',
      value: pendingSettlements.toString(),
      icon: Clock,
      description: 'Awaiting payment',
      trend: '2 need attention',
      trendUp: false,
      color: 'warning',
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your trips and expenses.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/expenses/new">
              <Receipt className="w-4 h-4" />
              Add Expense
            </Link>
          </Button>
          <Button asChild variant="gradient">
            <Link to="/trips/new">
              <Plus className="w-4 h-4" />
              New Trip
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={cn(
                "h-4 w-4",
                stat.color === 'success' && "text-success",
                stat.color === 'expense' && "text-expense",
                stat.color === 'warning' && "text-warning",
                !stat.color && "text-muted-foreground"
              )} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={cn(
                "flex items-center text-xs mt-1",
                stat.trendUp ? "text-success" : "text-muted-foreground"
              )}>
                {stat.trendUp ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Trips */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Trips</CardTitle>
              <CardDescription>Your latest travel adventures</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/trips">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTrips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trips/${trip.id}`}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center shadow-card">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{trip.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{trip.members.length} members</span>
                    <span>•</span>
                    <span>{formatCurrency(trip.totalExpenses, trip.currency)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-sm font-medium",
                    trip.myBalance > 0 ? "text-success" : trip.myBalance < 0 ? "text-expense" : "text-muted-foreground"
                  )}>
                    {trip.myBalance > 0 
                      ? `+${formatCurrency(trip.myBalance, trip.currency)}`
                      : trip.myBalance < 0
                      ? `-${formatCurrency(Math.abs(trip.myBalance), trip.currency)}`
                      : "Settled"
                    }
                  </div>
                  <Badge variant={trip.myBalance === 0 ? "default" : "secondary"} className="text-xs">
                    {trip.myBalance === 0 ? "Settled" : trip.myBalance > 0 ? "Owed to you" : "You owe"}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest expenses and transactions</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/expenses">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="w-10 h-10 bg-gradient-card rounded-full flex items-center justify-center shadow-card">
                  <Receipt className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{transaction.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={transaction.payer.avatar} />
                      <AvatarFallback className="text-xs">{transaction.payer.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>Paid by {transaction.payer.name}</span>
                    <span>•</span>
                    <span>{transaction.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {formatCurrency(transaction.amountMinorUnits, transaction.currency)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get things done faster</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Link to="/trips/new">
              <Plane className="w-8 h-8" />
              <span>Create New Trip</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Link to="/expenses/new">
              <Receipt className="w-8 h-8" />
              <span>Add Expense</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Link to="/settlements">
              <CheckCircle className="w-8 h-8" />
              <span>Settle Up</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Link to="/trips">
              <AlertTriangle className="w-8 h-8" />
              <span>Review Balances</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}