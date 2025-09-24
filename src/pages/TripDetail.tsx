import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Users,
  Receipt,
  DollarSign,
  Calendar,
  MessageSquare,
  Settings,
  Send,
  Paperclip,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getTripById,
  getTransactionsByTripId,
  getSettlementsByTripId,
  getMessagesByTripId,
  formatCurrency,
  mockTripSummary,
  currentUser,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const [messageText, setMessageText] = useState('');
  
  if (!id) return <div>Trip not found</div>;
  
  const trip = getTripById(id);
  const transactions = getTransactionsByTripId(id);
  const settlements = getSettlementsByTripId(id);
  const messages = getMessagesByTripId(id);
  
  if (!trip) return <div>Trip not found</div>;

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, send message via API
      setMessageText('');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/trips">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{trip.name}</h1>
              <p className="text-muted-foreground">{trip.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button variant="gradient" size="sm">
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(mockTripSummary.totalExpensesMinorUnits, trip.currency)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockTripSummary.totalTransactions} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
            <AlertTriangle className={cn(
              "h-4 w-4",
              trip.myBalance > 0 ? "text-success" : trip.myBalance < 0 ? "text-expense" : "text-muted-foreground"
            )} />
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              trip.myBalance > 0 ? "text-success" : trip.myBalance < 0 ? "text-expense" : "text-muted-foreground"
            )}>
              {trip.myBalance === 0 
                ? "Settled"
                : `${trip.myBalance > 0 ? '+' : '-'}${formatCurrency(Math.abs(trip.myBalance), trip.currency)}`
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {trip.myBalance > 0 ? "Owed to you" : trip.myBalance < 0 ? "You owe" : "All settled up"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trip.members.length}</div>
            <div className="flex -space-x-1 mt-1">
              {trip.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                  <AvatarImage src={member.user.avatar} />
                  <AvatarFallback className="text-xs">{member.user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {trip.members.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs">+{trip.members.length - 3}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h ago</div>
            <p className="text-xs text-muted-foreground">
              Expense added by {transactions[0]?.payer.name.split(' ')[0]}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Balances */}
            <Card>
              <CardHeader>
                <CardTitle>Member Balances</CardTitle>
                <CardDescription>Current balance for each member</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTripSummary.balances.map((balance) => (
                  <div key={balance.userId} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={balance.user.avatar} />
                        <AvatarFallback>{balance.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{balance.user.name}</span>
                    </div>
                    <div className={cn(
                      "font-medium",
                      balance.netBalanceMinorUnits > 0 ? "text-success" : 
                      balance.netBalanceMinorUnits < 0 ? "text-expense" : "text-muted-foreground"
                    )}>
                      {balance.netBalanceMinorUnits === 0 
                        ? "Settled"
                        : `${balance.netBalanceMinorUnits > 0 ? '+' : ''}${formatCurrency(balance.netBalanceMinorUnits, balance.currency)}`
                      }
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Settlement Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Settlements</CardTitle>
                <CardDescription>Optimal payments to settle all balances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTripSummary.settlementSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={suggestion.fromMember.avatar} />
                        <AvatarFallback>{suggestion.fromMember.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{suggestion.fromMember.name} → {suggestion.toMember.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(suggestion.amountMinorUnits, suggestion.currency)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="success">
                      <CheckCircle className="w-4 h-4" />
                      Settle
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Expenses</h3>
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
          </div>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Paid By</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        {transaction.notes && (
                          <div className="text-sm text-muted-foreground">{transaction.notes}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={transaction.payer.avatar} />
                          <AvatarFallback className="text-xs">{transaction.payer.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{transaction.payer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(transaction.amountMinorUnits, transaction.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Trip Members</h3>
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              Invite Member
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {trip.members.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.user.avatar} />
                      <AvatarFallback>{member.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{member.user.name}</div>
                      <div className="text-sm text-muted-foreground">{member.user.email}</div>
                      <Badge variant="outline" className="mt-1">
                        {member.role}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settlements" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Settlement History</h3>
            <Button variant="gradient">
              <CheckCircle className="w-4 h-4" />
              New Settlement
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {settlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={settlement.fromMember.avatar} />
                          <AvatarFallback className="text-xs">{settlement.fromMember.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{settlement.fromMember.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={settlement.toMember.avatar} />
                          <AvatarFallback className="text-xs">{settlement.toMember.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{settlement.toMember.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(settlement.amountMinorUnits, settlement.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={settlement.status === 'paid' ? 'default' : 'secondary'}>
                        {settlement.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {settlement.settledAt 
                        ? new Date(settlement.settledAt).toLocaleDateString()
                        : new Date(settlement.createdAt).toLocaleDateString()
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trip Chat</CardTitle>
              <CardDescription>Discuss expenses and coordinate with your group</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.author.avatar} />
                      <AvatarFallback>{message.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-sm">{message.author.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{message.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 min-h-[60px]"
                />
                <div className="flex flex-col space-y-2">
                  <Button size="icon" variant="outline">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}