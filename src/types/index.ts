// SettleMate TypeScript definitions

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Trip {
  id: string;
  name: string;
  description?: string;
  currency: string;
  ownerId: string;
  owner: User;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  members: Membership[];
  totalExpenses: number;
  myBalance: number;
}

export type MembershipRole = 'owner' | 'admin' | 'member';
export type MembershipStatus = 'active' | 'invited' | 'left';

export interface Membership {
  id: string;
  userId: string;
  user: User;
  tripId: string;
  role: MembershipRole;
  status: MembershipStatus;
  joinedAt: string;
}

export type SplitType = 'equal' | 'percent' | 'shares';

export interface Transaction {
  id: string;
  tripId: string;
  payerId: string;
  payer: User;
  description: string;
  category: string;
  amountMinorUnits: number;
  currency: string;
  date: string;
  notes?: string;
  splits: Split[];
  attachments: FileAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface Split {
  id: string;
  transactionId: string;
  memberId: string;
  member: User;
  shareType: SplitType;
  value: number; // percentage, shares, or 1 for equal
  computedShareMinorUnits: number;
}

export type SettlementStatus = 'pending' | 'paid';

export interface Settlement {
  id: string;
  tripId: string;
  fromMemberId: string;
  fromMember: User;
  toMemberId: string;
  toMember: User;
  amountMinorUnits: number;
  currency: string;
  status: SettlementStatus;
  settledAt?: string;
  createdAt: string;
}

export type InviteStatus = 'pending' | 'accepted' | 'declined' | 'expired';

export interface Invite {
  id: string;
  tripId: string;
  trip: Trip;
  email?: string;
  token?: string;
  invitedById: string;
  invitedBy: User;
  acceptedById?: string;
  acceptedBy?: User;
  status: InviteStatus;
  expiresAt: string;
  createdAt: string;
}

export interface Message {
  id: string;
  tripId: string;
  authorId: string;
  author: User;
  body: string;
  mentions: string[];
  createdAt: string;
}

export interface FileAttachment {
  id: string;
  transactionId: string;
  fileUrl: string;
  fileKey: string;
  contentType: string;
  size: number;
  fileName: string;
  createdAt: string;
}

export interface Balance {
  userId: string;
  user: User;
  netBalanceMinorUnits: number; // positive = owed to them, negative = they owe
  currency: string;
}

export interface SettlementSuggestion {
  fromMemberId: string;
  fromMember: User;
  toMemberId: string;
  toMember: User;
  amountMinorUnits: number;
  currency: string;
}

export interface TripSummary {
  totalExpensesMinorUnits: number;
  totalTransactions: number;
  memberCount: number;
  balances: Balance[];
  settlementSuggestions: SettlementSuggestion[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateTripForm {
  name: string;
  description?: string;
  currency: string;
}

export interface CreateTransactionForm {
  description: string;
  category: string;
  amount: number;
  date: string;
  notes?: string;
  payerId: string;
  splitType: SplitType;
  splits: {
    memberId: string;
    value: number;
  }[];
}

export interface InviteMemberForm {
  email: string;
}

// UI State types
export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  timestamp: string;
}