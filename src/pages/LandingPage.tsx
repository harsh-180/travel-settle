import { Link } from 'react-router-dom';
import {
  Receipt,
  Users,
  DollarSign,
  Smartphone,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Receipt,
    title: 'Easy Expense Tracking',
    description: 'Add expenses in seconds with smart categorization and receipt uploads.',
  },
  {
    icon: Users,
    title: 'Group Management',
    description: 'Invite friends, manage members, and handle complex group dynamics.',
  },
  {
    icon: DollarSign, 
    title: 'Smart Splitting',
    description: 'Split expenses equally, by percentage, or custom shares with automatic calculations.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Beautiful, responsive design that works perfectly on all your devices.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level security with end-to-end encryption for your financial data.',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'See changes instantly as your group adds expenses and makes payments.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Frequent Traveler',
    content: 'SettleMate made our group trip to Japan so much easier. No more awkward money conversations!',
    rating: 5,
  },
  {
    name: 'Mike Rodriguez',
    role: 'Event Organizer',
    content: 'Perfect for organizing group events. The real-time updates keep everyone in the loop.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'College Student',
    content: 'Finally, a way to split dinner bills that doesn\'t end in arguments. Love the simplicity!',
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SettleMate</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild variant="gradient">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="outline" className="px-4 py-2">
              🎉 New: Real-time collaboration features
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
                Split expenses with{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  friends
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The easiest way to track group expenses, split bills, and settle up with friends. 
                Perfect for trips, dinners, and shared activities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gradient">
                <Link to="/register">
                  Start Splitting
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link to="/demo">
                  Try Demo
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$2M+</div>
                <div className="text-sm text-muted-foreground">Expenses Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">App Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything you need to manage group expenses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From simple dinner splits to complex travel budgets, SettleMate has you covered.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="shadow-card hover:shadow-primary transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Simple, fast, and transparent
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and never worry about group expenses again.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-primary">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">1. Create a Trip</h3>
              <p className="text-muted-foreground">
                Set up your group and invite friends via email or shareable link.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-primary">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">2. Track Expenses</h3>
              <p className="text-muted-foreground">
                Add expenses with photos, categorize them, and choose how to split.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto shadow-success">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">3. Settle Up</h3>
              <p className="text-muted-foreground">
                See who owes what and settle balances with integrated payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Loved by groups everywhere
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say about SettleMate.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to simplify group expenses?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of groups who trust SettleMate to handle their shared expenses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="gradient">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Free forever for personal use. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SettleMate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The easiest way to split expenses with friends and family.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-foreground">Security</Link></li>
                <li><Link to="/api" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
                <li><Link to="/status" className="hover:text-foreground">Status</Link></li>
                <li><Link to="/changelog" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
                <li><Link to="/cookies" className="hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 SettleMate. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/twitter" className="text-muted-foreground hover:text-foreground">
                Twitter
              </Link>
              <Link to="/github" className="text-muted-foreground hover:text-foreground">
                GitHub
              </Link>
              <Link to="/discord" className="text-muted-foreground hover:text-foreground">
                Discord
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}