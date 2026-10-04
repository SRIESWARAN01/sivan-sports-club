export type Role = 'SUPER_ADMIN' | 'MANAGER' | 'STAFF' | 'ACCOUNTS';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  profilePhoto?: string;
  membershipPlan?: string;
  membershipStatus?: 'active' | 'expired' | 'none';
  bookingCount: number;
  totalSpent: number;
  lastBookingDate?: string;
  status: 'active' | 'blocked';
  createdDate: string;
  notes?: string;
}

export interface Facility {
  id: string;
  name: string;
  subBrand: string;
  badge: string;
  category: 'badminton' | 'arena' | 'gym' | 'pool' | 'event';
  description: string;
  hourlyRate: number;
  bookingDurationMin: number;
  image: string;
  features: string[];
  coachingPrograms?: string[];
  availability: string;
  pricingNote: string;
  status: 'active' | 'inactive';
  rules?: string[];
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_paid';

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  mobile: string;
  facilityId: string;
  facilityName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  amount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  createdDate: string;
  notes?: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  durationMonths: number;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface GymMembership {
  id: string;
  customerId: string;
  customerName: string;
  customerMobile: string;
  planName: string;
  startDate: string;
  endDate: string;
  amount: number;
  paymentStatus: PaymentStatus;
  status: 'active' | 'expiring_soon' | 'expired' | 'cancelled';
  autoRenew: boolean;
}

export interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  bookingId?: string;
  facilityName: string;
  amount: number;
  paymentMethod: 'UPI' | 'Cash' | 'Card' | 'NetBanking';
  transactionId: string;
  paymentDate: string;
  status: PaymentStatus;
}

export type EnquiryStatus = 'new' | 'contacted' | 'follow_up' | 'confirmed' | 'closed' | 'cancelled';

export interface Enquiry {
  id: string;
  name: string;
  mobile: string;
  email: string;
  interestedFacility: string;
  preferredDate?: string;
  message: string;
  createdDate: string;
  assignedStaff: string;
  status: EnquiryStatus;
  notes?: string;
}

export type EventType = 'Birthday' | 'Family Function' | 'Corporate Event' | 'Private Event' | 'Other';
export type EventStatus = 'enquiry' | 'quotation' | 'confirmed' | 'completed' | 'cancelled';

export interface ClubEvent {
  id: string;
  customerName: string;
  customerMobile: string;
  eventType: EventType;
  eventDate: string;
  startTime: string;
  endTime: string;
  guestCount: number;
  requirements: string[];
  quotationAmount: number;
  advanceAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  status: EventStatus;
  notes?: string;
  createdDate: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Badminton' | 'Arena' | 'Gym' | 'Swimming Pool' | 'Events' | 'Club';
  imageUrl: string;
  isFeatured: boolean;
  active: boolean;
  order: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  applicableFacility: string;
  startDate: string;
  endDate: string;
  couponCode: string;
  status: 'draft' | 'active' | 'expired' | 'disabled';
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  facility: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
}

export interface Notification {
  id: string;
  type: 'booking' | 'enquiry' | 'payment' | 'membership' | 'event' | 'cancellation';
  title: string;
  message: string;
  time: string;
  read: boolean;
  linkTab?: string;
}

export interface WebsiteContent {
  heroHeadline: string;
  heroSupportingText: string;
  heroLocationBadge: string;
  heroImageUrl: string;
  aboutTitle: string;
  aboutContent: string;
  establishedYear: string;
  vision: string;
  mission: string;
  address: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  openingHours: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Settings {
  businessName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  bookingBufferMin: number;
  cancellationHours: number;
  currency: string;
  taxPercent: number;
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  smsNotifications: boolean;
  paymentGatewayActive: boolean;
}

export interface AuditLog {
  id: string;
  adminName: string;
  role: string;
  action: string;
  module: string;
  recordId: string;
  timestamp: string;
  details: string;
}
