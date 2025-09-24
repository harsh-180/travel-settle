import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Users,
  DollarSign,
  Calendar,
  Archive,
  MoreHorizontal,
  Plane,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTrips, formatCurrency, currentUser } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Trip } from '@/types';

export default function Trips() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('active');

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch = trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'active' ? !trip.isArchived : trip.isArchived;
    return matchesSearch && matchesTab;
  });

  const TripCard = ({ trip }: { trip: Trip }) => (
    <Card className="group hover:shadow-card transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">{trip.name}</CardTitle>
              <CardDescription className="line-clamp-1">{trip.description}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/trips/${trip.id}/edit`}>Edit Trip</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/trips/${trip.id}/invite`}>Invite Members</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {trip.isArchived ? 'Unarchive' : 'Archive'} Trip
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trip Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{trip.members.length}</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {formatCurrency(trip.totalExpenses, trip.currency)}
            </div>
            <div className="text-xs text-muted-foreground">Total Spent</div>
          </div>
          <div>
            <div className={cn(
              "text-2xl font-bold",
              trip.myBalance > 0 ? "text-success" : trip.myBalance < 0 ? "text-expense" : "text-muted-foreground"
            )}>
              {trip.myBalance === 0 
                ? "Settled"
                : formatCurrency(Math.abs(trip.myBalance), trip.currency)
              }
            </div>
            <div className="text-xs text-muted-foreground">
              {trip.myBalance > 0 ? "Owed to you" : trip.myBalance < 0 ? "You owe" : "Your balance"}
            </div>
          </div>
        </div>

        {/* Members Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {trip.members.slice(0, 5).map((member) => (
              <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                <AvatarImage src={member.user.avatar} />
                <AvatarFallback className="text-xs">{member.user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
            {trip.members.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium">+{trip.members.length - 5}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={trip.myBalance === 0 ? "default" : "secondary"}>
              {trip.currency}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {new Date(trip.createdAt).toLocaleDateString()}
            </Badge>
          </div>
        </div>

        {/* Action Button */}
        <Button asChild className="w-full">
          <Link to={`/trips/${trip.id}`}>View Trip Details</Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
          <p className="text-muted-foreground">Manage your travel expenses and settlements</p>
        </div>
        <Button asChild variant="gradient" size="lg">
          <Link to="/trips/new">
            <Plus className="w-4 h-4" />
            Create New Trip
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search trips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="active">Active Trips</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {filteredTrips.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No active trips found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? "Try adjusting your search terms" : "Create your first trip to get started"}
                </p>
                <Button asChild variant="gradient">
                  <Link to="/trips/new">
                    <Plus className="w-4 h-4" />
                    Create Your First Trip
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          {filteredTrips.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Archive className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No archived trips</h3>
                <p className="text-muted-foreground">
                  Completed trips will appear here once archived
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}