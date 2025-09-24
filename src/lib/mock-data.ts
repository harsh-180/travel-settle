// Mock data for SettleMate development
import { User, Trip, Transaction, Settlement, Balance, TripSummary, Message } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'alice@example.com',
    name: 'Alice Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    isVerified: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    email: 'bob@example.com', 
    name: 'Bob Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    isVerified: true,
    createdAt: '2024-01-16T11:30:00Z',
  },
  {
    id: '3',
    email: 'charlie@example.com',
    name: 'Charlie Brown',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    isVerified: true,
    createdAt: '2024-01-17T09:15:00Z',
  },
  {
    id: '4',
    email: 'diana@example.com',
    name: 'Diana Prince',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    isVerified: true,
    createdAt: '2024-01-18T14:45:00Z',
  }
];

export const currentUser = mockUsers[0]; // Alice is the current user

export const mockTrips: Trip[] = [
  {
    id: '1',
    name: 'Tokyo Adventure 2024',
    description: 'Amazing trip to Japan with friends',
    currency: 'USD',
    ownerId: '1',
    owner: mockUsers[0],
    isArchived: false,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-15T16:30:00Z',
    members: [
      {
        id: '1',
        userId: '1',
        user: mockUsers[0],
        tripId: '1',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-02-01T10:00:00Z',
      },
      {
        id: '2', 
        userId: '2',
        user: mockUsers[1],
        tripId: '1',
        role: 'member',
        status: 'active',
        joinedAt: '2024-02-02T14:20:00Z',
      },
      {
        id: '3',
        userId: '3', 
        user: mockUsers[2],
        tripId: '1',
        role: 'member',
        status: 'active',
        joinedAt: '2024-02-03T09:10:00Z',
      },
    ],
    totalExpenses: 285043,
    myBalance: -4521,
  },
  {
    id: '2',
    name: 'Weekend in Paris',
    description: 'Romantic getaway',
    currency: 'EUR',
    ownerId: '1',
    owner: mockUsers[0],
    isArchived: false,
    createdAt: '2024-03-01T15:00:00Z',
    updatedAt: '2024-03-05T20:15:00Z',
    members: [
      {
        id: '4',
        userId: '1',
        user: mockUsers[0],
        tripId: '2',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-03-01T15:00:00Z',
      },
      {
        id: '5',
        userId: '4',
        user: mockUsers[3],
        tripId: '2',
        role: 'member',
        status: 'active',
        joinedAt: '2024-03-01T15:30:00Z',
      },
    ],
    totalExpenses: 89750,
    myBalance: 2280,
  },
  {
    id: '3',
    name: 'Ski Trip Whistler',
    description: 'Winter sports adventure',
    currency: 'CAD',
    ownerId: '2',
    owner: mockUsers[1],
    isArchived: false,
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-01-28T18:45:00Z',
    members: [
      {
        id: '6',
        userId: '2',
        user: mockUsers[1],
        tripId: '3',
        role: 'owner',
        status: 'active',
        joinedAt: '2024-01-20T12:00:00Z',
      },
      {
        id: '7',
        userId: '1',
        user: mockUsers[0],
        tripId: '3',
        role: 'member',
        status: 'active',
        joinedAt: '2024-01-21T10:15:00Z',
      },
      {
        id: '8',
        userId: '3',
        user: mockUsers[2],
        tripId: '3',
        role: 'member',
        status: 'active',
        joinedAt: '2024-01-21T11:30:00Z',
      },
    ],
    totalExpenses: 156420,
    myBalance: -1890,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    tripId: '1',
    payerId: '2',
    payer: mockUsers[1],
    description: 'Hotel in Shibuya - 3 nights',
    category: 'Accommodation',
    amountMinorUnits: 45000,
    currency: 'USD',
    date: '2024-02-10T00:00:00Z',
    notes: 'Booked through Booking.com',
    splits: [
      {
        id: '1',
        transactionId: '1',
        memberId: '1',
        member: mockUsers[0],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 15000,
      },
      {
        id: '2',
        transactionId: '1',
        memberId: '2',
        member: mockUsers[1],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 15000,
      },
      {
        id: '3',
        transactionId: '1',
        memberId: '3',
        member: mockUsers[2],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 15000,
      },
    ],
    attachments: [],
    createdAt: '2024-02-10T15:30:00Z',
    updatedAt: '2024-02-10T15:30:00Z',
  },
  {
    id: '2',
    tripId: '1',
    payerId: '1',
    payer: mockUsers[0],
    description: 'Dinner at Sukiyabashi Jiro',
    category: 'Food',
    amountMinorUnits: 18500,
    currency: 'USD',
    date: '2024-02-11T00:00:00Z',
    notes: 'Amazing omakase experience!',
    splits: [
      {
        id: '4',
        transactionId: '2',
        memberId: '1',
        member: mockUsers[0],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 6167,
      },
      {
        id: '5',
        transactionId: '2',
        memberId: '2',
        member: mockUsers[1],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 6167,
      },
      {
        id: '6',
        transactionId: '2',
        memberId: '3',
        member: mockUsers[2],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 6166,
      },
    ],
    attachments: [
      {
        id: '1',
        transactionId: '2',
        fileUrl: '/api/files/receipt-jiro.jpg',
        fileKey: 'receipts/jiro-20240211.jpg',
        contentType: 'image/jpeg',
        size: 245760,
        fileName: 'jiro-receipt.jpg',
        createdAt: '2024-02-11T20:45:00Z',
      },
    ],
    createdAt: '2024-02-11T20:30:00Z',
    updatedAt: '2024-02-11T20:45:00Z',
  },
  {
    id: '3',
    tripId: '1',
    payerId: '3',
    payer: mockUsers[2],
    description: 'JR Pass - 7 days',
    category: 'Transportation',
    amountMinorUnits: 29700,
    currency: 'USD',
    date: '2024-02-09T00:00:00Z',
    splits: [
      {
        id: '7',
        transactionId: '3',
        memberId: '1',
        member: mockUsers[0],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 9900,
      },
      {
        id: '8',
        transactionId: '3',
        memberId: '2',
        member: mockUsers[1],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 9900,
      },
      {
        id: '9',
        transactionId: '3',
        memberId: '3',
        member: mockUsers[2],
        shareType: 'equal',
        value: 1,
        computedShareMinorUnits: 9900,
      },
    ],
    attachments: [],
    createdAt: '2024-02-09T12:15:00Z',
    updatedAt: '2024-02-09T12:15:00Z',
  },
];

export const mockSettlements: Settlement[] = [
  {
    id: '1',
    tripId: '1',
    fromMemberId: '1',
    fromMember: mockUsers[0],
    toMemberId: '2',
    toMember: mockUsers[1],
    amountMinorUnits: 15000,
    currency: 'USD',
    status: 'paid',
    settledAt: '2024-02-15T10:30:00Z',
    createdAt: '2024-02-15T09:00:00Z',
  },
  {
    id: '2',
    tripId: '1',
    fromMemberId: '1',
    fromMember: mockUsers[0],
    toMemberId: '3',
    toMember: mockUsers[2],
    amountMinorUnits: 9900,
    currency: 'USD',
    status: 'pending',
    createdAt: '2024-02-15T11:00:00Z',
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    tripId: '1',
    authorId: '2',
    author: mockUsers[1],
    body: 'Just booked our hotel in Shibuya! Can\'t wait for this trip! 🏨',
    mentions: [],
    createdAt: '2024-02-10T15:35:00Z',
  },
  {
    id: '2',
    tripId: '1',
    authorId: '1',
    author: mockUsers[0],
    body: 'Awesome! The sushi dinner was incredible @Bob @Charlie',
    mentions: ['2', '3'],
    createdAt: '2024-02-11T21:00:00Z',
  },
  {
    id: '3',
    tripId: '1',
    authorId: '3',
    author: mockUsers[2],
    body: 'Got everyone\'s JR passes sorted. We\'re all set for transportation! 🚅',
    mentions: [],
    createdAt: '2024-02-09T12:20:00Z',
  },
];

export const mockTripSummary: TripSummary = {
  totalExpensesMinorUnits: 285043,
  totalTransactions: 8,
  memberCount: 3,
  balances: [
    {
      userId: '1',
      user: mockUsers[0],
      netBalanceMinorUnits: -4521,
      currency: 'USD',
    },
    {
      userId: '2',
      user: mockUsers[1],
      netBalanceMinorUnits: 12890,
      currency: 'USD',
    },
    {
      userId: '3',
      user: mockUsers[2],
      netBalanceMinorUnits: -8369,
      currency: 'USD',
    },
  ],
  settlementSuggestions: [
    {
      fromMemberId: '1',
      fromMember: mockUsers[0],
      toMemberId: '2',
      toMember: mockUsers[1],
      amountMinorUnits: 4521,
      currency: 'USD',
    },
    {
      fromMemberId: '3',
      fromMember: mockUsers[2],
      toMemberId: '2',
      toMember: mockUsers[1],
      amountMinorUnits: 8369,
      currency: 'USD',
    },
  ],
};

// Utility functions for working with mock data
export const formatCurrency = (amountMinorUnits: number, currency = 'USD'): string => {
  const amount = amountMinorUnits / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const getTripById = (tripId: string): Trip | undefined => {
  return mockTrips.find(trip => trip.id === tripId);
};

export const getTransactionsByTripId = (tripId: string): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.tripId === tripId);
};

export const getSettlementsByTripId = (tripId: string): Settlement[] => {
  return mockSettlements.filter(settlement => settlement.tripId === tripId);
};

export const getMessagesByTripId = (tripId: string): Message[] => {
  return mockMessages.filter(message => message.tripId === tripId);
};