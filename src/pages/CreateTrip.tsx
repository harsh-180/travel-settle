import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plane, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
];

export default function CreateTrip() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    currency: 'USD',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, submit to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Trip created successfully!",
        description: `${formData.name} is ready for expenses.`,
      });
      
      navigate('/trips');
    } catch (error) {
      toast({
        title: "Error creating trip",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/trips">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Trip</h1>
          <p className="text-muted-foreground">Set up a new trip to track shared expenses</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plane className="w-5 h-5" />
            <span>Trip Details</span>
          </CardTitle>
          <CardDescription>
            Provide basic information about your trip
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Trip Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Tokyo Adventure 2024"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your trip..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{currency.symbol}</span>
                        <span>{currency.name} ({currency.code})</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button asChild variant="outline">
                <Link to="/trips">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.name.trim()}>
                {isSubmitting ? "Creating..." : "Create Trip"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Next Steps Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>What's Next?</span>
          </CardTitle>
          <CardDescription>
            After creating your trip, you'll be able to:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span>Invite friends and family to join</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <span>Add and split expenses</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary" />
            </div>
            <span>Track balances and settle up</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}