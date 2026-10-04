import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  AdminUser,
  Customer,
  Facility,
  Booking,
  GymMembership,
  MembershipPlan,
  Payment,
  Enquiry,
  ClubEvent,
  GalleryImage,
  Promotion,
  Review,
  Notification,
  WebsiteContent,
  Settings,
  AuditLog,
  BookingStatus,
  PaymentStatus,
  EnquiryStatus,
  EventStatus
} from '../types/database';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_FACILITIES,
  INITIAL_CUSTOMERS,
  INITIAL_BOOKINGS,
  INITIAL_MEMBERSHIP_PLANS,
  INITIAL_GYM_MEMBERSHIPS,
  INITIAL_PAYMENTS,
  INITIAL_ENQUIRIES,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_PROMOTIONS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_SETTINGS,
  INITIAL_AUDIT_LOGS
} from '../data/demoData';

interface DatabaseContextType {
  // Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  loadDemoData: () => void;
  resetDemoData: () => void;

  // Auth / Current User
  currentAdminUser: AdminUser | null;
  loginAs: (role: AdminUser['role']) => boolean;
  logout: () => void;

  // Entities
  adminUsers: AdminUser[];
  facilities: Facility[];
  customers: Customer[];
  bookings: Booking[];
  membershipPlans: MembershipPlan[];
  gymMemberships: GymMembership[];
  payments: Payment[];
  enquiries: Enquiry[];
  events: ClubEvent[];
  gallery: GalleryImage[];
  promotions: Promotion[];
  reviews: Review[];
  notifications: Notification[];
  websiteContent: WebsiteContent;
  settings: Settings;
  auditLogs: AuditLog[];

  // Actions
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdDate' | 'status' | 'assignedStaff'>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => void;
  deleteEnquiry: (id: string) => void;

  addBooking: (booking: Omit<Booking, 'id' | 'createdDate'>) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBookingPayment: (id: string, status: PaymentStatus) => void;
  deleteBooking: (id: string) => void;

  updateFacility: (facility: Facility) => void;
  toggleFacilityStatus: (id: string) => void;

  addCustomer: (customer: Omit<Customer, 'id' | 'createdDate' | 'bookingCount' | 'totalSpent'>) => void;
  updateCustomer: (customer: Customer) => void;
  toggleBlockCustomer: (id: string) => void;

  addGymMembership: (membership: Omit<GymMembership, 'id'>) => void;
  renewGymMembership: (id: string, monthsToAdd: number) => void;
  updateGymMembershipStatus: (id: string, status: GymMembership['status']) => void;

  addPayment: (payment: Omit<Payment, 'id'>) => void;

  addEvent: (event: Omit<ClubEvent, 'id' | 'createdDate'>) => void;
  updateEventStatus: (id: string, status: EventStatus) => void;
  updateEventPayment: (id: string, advance: number, status: PaymentStatus) => void;

  addGalleryImage: (image: Omit<GalleryImage, 'id' | 'order'>) => void;
  deleteGalleryImage: (id: string) => void;
  toggleFeaturedImage: (id: string) => void;

  updateWebsiteContent: (content: Partial<WebsiteContent>) => void;

  addPromotion: (promo: Omit<Promotion, 'id'>) => void;
  togglePromotionStatus: (id: string) => void;
  deletePromotion: (id: string) => void;

  updateReviewStatus: (id: string, status: Review['status']) => void;
  toggleFeatureReview: (id: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  updateSettings: (settings: Partial<Settings>) => void;

  // Computed Stats
  stats: {
    totalEnquiries: number;
    todayBookings: number;
    upcomingBookings: number;
    activeGymMembers: number;
    badmintonBookings: number;
    swimmingBookings: number;
    arenaBookings: number;
    eventBookings: number;
    todayRevenue: number;
    monthlyRevenue: number;
  };
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

const STORAGE_PREFIX = 'sivan_sports_club_';

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Initialize state from local storage or demo data
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser | null>(() => {
    return INITIAL_ADMIN_USERS[0]; // Default logged in as Super Admin
  });

  const [adminUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);

  const [facilities, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [membershipPlans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIP_PLANS);

  const [gymMemberships, setGymMemberships] = useState<GymMembership[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'gym_memberships');
    return saved ? JSON.parse(saved) : INITIAL_GYM_MEMBERSHIPS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'enquiries');
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [gallery, setGallery] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [promotions, setPromotions] = useState<Promotion[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'promotions');
    return saved ? JSON.parse(saved) : INITIAL_PROMOTIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'website_content');
    return saved ? JSON.parse(saved) : INITIAL_WEBSITE_CONTENT;
  });

  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'facilities', JSON.stringify(facilities));
  }, [facilities]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'gym_memberships', JSON.stringify(gymMemberships));
  }, [gymMemberships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'promotions', JSON.stringify(promotions));
  }, [promotions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'website_content', JSON.stringify(websiteContent));
  }, [websiteContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Audit Log Helper
  const logAudit = (action: string, module: string, recordId: string, details: string) => {
    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      adminName: currentAdminUser?.name || 'System',
      role: currentAdminUser?.role || 'SYSTEM',
      action,
      module,
      recordId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Auth
  const loginAs = (role: AdminUser['role']) => {
    const user = adminUsers.find(u => u.role === role);
    if (user) {
      setCurrentAdminUser(user);
      logAudit('Admin Login', 'Auth', user.id, `Logged in as ${user.name} (${role})`);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentAdminUser) {
      logAudit('Admin Logout', 'Auth', currentAdminUser.id, `Logged out`);
    }
    setCurrentAdminUser(null);
  };

  // Demo Data Controls
  const loadDemoData = () => {
    setFacilities(INITIAL_FACILITIES);
    setCustomers(INITIAL_CUSTOMERS);
    setBookings(INITIAL_BOOKINGS);
    setGymMemberships(INITIAL_GYM_MEMBERSHIPS);
    setPayments(INITIAL_PAYMENTS);
    setEnquiries(INITIAL_ENQUIRIES);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    setPromotions(INITIAL_PROMOTIONS);
    setReviews(INITIAL_REVIEWS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setWebsiteContent(INITIAL_WEBSITE_CONTENT);
    setSettings(INITIAL_SETTINGS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    logAudit('Demo Data Loaded', 'Settings', 'demo_seed', 'Loaded complete realistic sports club demo dataset');
  };

  const resetDemoData = () => {
    setBookings([]);
    setEnquiries([]);
    setGymMemberships([]);
    setPayments([]);
    setEvents([]);
    setNotifications([]);
    logAudit('Demo Data Reset', 'Settings', 'demo_reset', 'Reset all demo transactional records');
  };

  // Enquiries
  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdDate' | 'status' | 'assignedStaff'>) => {
    const newId = 'enq_' + Date.now().toString().slice(-4);
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0],
      assignedStaff: 'R. Vignesh',
      status: 'new'
    };

    setEnquiries(prev => [newEnquiry, ...prev]);

    // Push Notification
    const notif: Notification = {
      id: 'notif_' + Date.now(),
      type: 'enquiry',
      title: 'New Website Enquiry Received',
      message: `${enquiryData.name} enquired for ${enquiryData.interestedFacility}`,
      time: 'Just now',
      read: false,
      linkTab: 'enquiries'
    };
    setNotifications(prev => [notif, ...prev]);

    logAudit('New Enquiry Created', 'Enquiries', newId, `Public enquiry from ${enquiryData.name} (${enquiryData.mobile})`);
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string) => {
    setEnquiries(prev =>
      prev.map(enq => (enq.id === id ? { ...enq, status, ...(notes ? { notes } : {}) } : enq))
    );
    logAudit('Enquiry Status Updated', 'Enquiries', id, `Status updated to ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(enq => enq.id !== id));
    logAudit('Enquiry Deleted', 'Enquiries', id, `Deleted enquiry record`);
  };

  // Bookings
  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdDate'>) => {
    const newId = 'bk_' + Date.now().toString().slice(-4);
    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setBookings(prev => [newBooking, ...prev]);

    if (bookingData.paymentStatus === 'paid') {
      const newPay: Payment = {
        id: 'pay_' + Date.now().toString().slice(-4),
        customerId: bookingData.customerId,
        customerName: bookingData.customerName,
        bookingId: newId,
        facilityName: bookingData.facilityName,
        amount: bookingData.amount,
        paymentMethod: 'UPI',
        transactionId: 'TXN/' + Math.floor(100000 + Math.random() * 900000),
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'paid'
      };
      setPayments(prev => [newPay, ...prev]);
    }

    // Push notification
    const notif: Notification = {
      id: 'notif_' + Date.now(),
      type: 'booking',
      title: 'New Booking Created',
      message: `${bookingData.customerName} booked ${bookingData.facilityName} for ${bookingData.date} at ${bookingData.startTime}`,
      time: 'Just now',
      read: false,
      linkTab: 'bookings'
    };
    setNotifications(prev => [notif, ...prev]);

    logAudit('Booking Created', 'Bookings', newId, `Booking for ${bookingData.facilityName} by ${bookingData.customerName}`);
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(bk => (bk.id === id ? { ...bk, bookingStatus: status } : bk)));
    logAudit('Booking Status Updated', 'Bookings', id, `Booking marked as ${status}`);
  };

  const updateBookingPayment = (id: string, status: PaymentStatus) => {
    setBookings(prev => prev.map(bk => (bk.id === id ? { ...bk, paymentStatus: status } : bk)));
    logAudit('Booking Payment Updated', 'Bookings', id, `Payment status set to ${status}`);
  };

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(bk => bk.id !== id));
    logAudit('Booking Cancelled/Deleted', 'Bookings', id, `Booking deleted`);
  };

  // Facility
  const updateFacility = (updated: Facility) => {
    setFacilities(prev => prev.map(f => (f.id === updated.id ? updated : f)));
    logAudit('Facility Modified', 'Facilities', updated.id, `Updated ${updated.name} details`);
  };

  const toggleFacilityStatus = (id: string) => {
    setFacilities(prev =>
      prev.map(f =>
        f.id === id ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f
      )
    );
    logAudit('Facility Status Toggled', 'Facilities', id, `Toggled active/inactive status`);
  };

  // Customer
  const addCustomer = (custData: Omit<Customer, 'id' | 'createdDate' | 'bookingCount' | 'totalSpent'>) => {
    const newId = 'cust_' + Date.now().toString().slice(-4);
    const newCust: Customer = {
      ...custData,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0],
      bookingCount: 0,
      totalSpent: 0
    };
    setCustomers(prev => [newCust, ...prev]);
    logAudit('Customer Added', 'Customers', newId, `Added customer ${custData.name}`);
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    logAudit('Customer Updated', 'Customers', updated.id, `Updated details for ${updated.name}`);
  };

  const toggleBlockCustomer = (id: string) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c
      )
    );
    logAudit('Customer Status Changed', 'Customers', id, `Toggled customer blocked/active`);
  };

  // Gym Memberships
  const addGymMembership = (memData: Omit<GymMembership, 'id'>) => {
    const newId = 'mem_' + Date.now().toString().slice(-4);
    const newMem: GymMembership = { ...memData, id: newId };
    setGymMemberships(prev => [newMem, ...prev]);
    logAudit('Gym Membership Added', 'Memberships', newId, `Added membership for ${memData.customerName}`);
  };

  const renewGymMembership = (id: string, monthsToAdd: number) => {
    setGymMemberships(prev =>
      prev.map(mem => {
        if (mem.id === id) {
          const currentEnd = new Date(mem.endDate);
          currentEnd.setMonth(currentEnd.getMonth() + monthsToAdd);
          return {
            ...mem,
            endDate: currentEnd.toISOString().split('T')[0],
            status: 'active',
            paymentStatus: 'paid'
          };
        }
        return mem;
      })
    );
    logAudit('Membership Renewed', 'Memberships', id, `Renewed for ${monthsToAdd} months`);
  };

  const updateGymMembershipStatus = (id: string, status: GymMembership['status']) => {
    setGymMemberships(prev => prev.map(m => (m.id === id ? { ...m, status } : m)));
    logAudit('Membership Status Updated', 'Memberships', id, `Status updated to ${status}`);
  };

  // Payments
  const addPayment = (payData: Omit<Payment, 'id'>) => {
    const newId = 'pay_' + Date.now().toString().slice(-4);
    const newPay: Payment = { ...payData, id: newId };
    setPayments(prev => [newPay, ...prev]);
    logAudit('Payment Recorded', 'Payments', newId, `Rs. ${payData.amount} received from ${payData.customerName}`);
  };

  // Events
  const addEvent = (eventData: Omit<ClubEvent, 'id' | 'createdDate'>) => {
    const newId = 'evt_' + Date.now().toString().slice(-4);
    const newEvt: ClubEvent = {
      ...eventData,
      id: newId,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setEvents(prev => [newEvt, ...prev]);
    logAudit('Event Scheduled', 'Events', newId, `Scheduled ${eventData.eventType} for ${eventData.customerName}`);
  };

  const updateEventStatus = (id: string, status: EventStatus) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
    logAudit('Event Status Updated', 'Events', id, `Status updated to ${status}`);
  };

  const updateEventPayment = (id: string, advance: number, status: PaymentStatus) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === id) {
          const newBal = Math.max(0, e.quotationAmount - advance);
          return { ...e, advanceAmount: advance, balanceAmount: newBal, paymentStatus: status };
        }
        return e;
      })
    );
    logAudit('Event Payment Updated', 'Events', id, `Advance adjusted to Rs. ${advance}`);
  };

  // Gallery
  const addGalleryImage = (imgData: Omit<GalleryImage, 'id' | 'order'>) => {
    const newId = 'gal_' + Date.now().toString().slice(-4);
    const newImg: GalleryImage = { ...imgData, id: newId, order: gallery.length + 1 };
    setGallery(prev => [newImg, ...prev]);
    logAudit('Gallery Image Added', 'Gallery', newId, `Added photo to ${imgData.category}`);
  };

  const deleteGalleryImage = (id: string) => {
    setGallery(prev => prev.filter(img => img.id !== id));
    logAudit('Gallery Image Removed', 'Gallery', id, `Deleted gallery photo`);
  };

  const toggleFeaturedImage = (id: string) => {
    setGallery(prev =>
      prev.map(img => (img.id === id ? { ...img, isFeatured: !img.isFeatured } : img))
    );
    logAudit('Featured Image Toggled', 'Gallery', id, `Toggled featured status`);
  };

  // CMS
  const updateWebsiteContent = (content: Partial<WebsiteContent>) => {
    setWebsiteContent(prev => ({ ...prev, ...content }));
    logAudit('Website CMS Content Updated', 'CMS', 'cms_content', 'Public website text/branding updated');
  };

  // Promotions
  const addPromotion = (promoData: Omit<Promotion, 'id'>) => {
    const newId = 'prm_' + Date.now().toString().slice(-4);
    setPromotions(prev => [{ ...promoData, id: newId }, ...prev]);
    logAudit('Promotion Created', 'Promotions', newId, `Created coupon ${promoData.couponCode}`);
  };

  const togglePromotionStatus = (id: string) => {
    setPromotions(prev =>
      prev.map(p => (p.id === id ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p))
    );
    logAudit('Promotion Status Toggled', 'Promotions', id, `Toggled promo active state`);
  };

  const deletePromotion = (id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
    logAudit('Promotion Removed', 'Promotions', id, `Deleted promotion`);
  };

  // Reviews
  const updateReviewStatus = (id: string, status: Review['status']) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, status } : r)));
    logAudit('Review Moderated', 'Reviews', id, `Set status to ${status}`);
  };

  const toggleFeatureReview = (id: string) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, featured: !r.featured } : r)));
    logAudit('Review Feature Toggled', 'Reviews', id, `Toggled feature flag`);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Settings
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logAudit('Business Settings Updated', 'Settings', 'global_settings', 'Updated club contact & booking rules');
  };

  // Computed Real Dynamic Statistics
  const todayStr = new Date().toISOString().split('T')[0];

  const totalEnquiries = enquiries.length;
  const todayBookings = bookings.filter(b => b.date === todayStr && b.bookingStatus !== 'cancelled').length;
  const upcomingBookings = bookings.filter(b => b.date >= todayStr && b.bookingStatus !== 'cancelled').length;
  const activeGymMembers = gymMemberships.filter(m => m.status === 'active' || m.status === 'expiring_soon').length;
  const badmintonBookings = bookings.filter(b => b.facilityId === 'fac_badminton' && b.bookingStatus !== 'cancelled').length;
  const swimmingBookings = bookings.filter(b => b.facilityId === 'fac_pool' && b.bookingStatus !== 'cancelled').length;
  const arenaBookings = bookings.filter(b => b.facilityId === 'fac_arena' && b.bookingStatus !== 'cancelled').length;
  const eventBookings = events.filter(e => e.status !== 'cancelled').length;

  const todayRevenue = payments
    .filter(p => p.paymentDate === todayStr && p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const monthlyRevenue = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <DatabaseContext.Provider
      value={{
        isDemoMode,
        setIsDemoMode,
        loadDemoData,
        resetDemoData,

        currentAdminUser,
        loginAs,
        logout,

        adminUsers,
        facilities,
        customers,
        bookings,
        membershipPlans,
        gymMemberships,
        payments,
        enquiries,
        events,
        gallery,
        promotions,
        reviews,
        notifications,
        websiteContent,
        settings,
        auditLogs,

        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,

        addBooking,
        updateBookingStatus,
        updateBookingPayment,
        deleteBooking,

        updateFacility,
        toggleFacilityStatus,

        addCustomer,
        updateCustomer,
        toggleBlockCustomer,

        addGymMembership,
        renewGymMembership,
        updateGymMembershipStatus,

        addPayment,

        addEvent,
        updateEventStatus,
        updateEventPayment,

        addGalleryImage,
        deleteGalleryImage,
        toggleFeaturedImage,

        updateWebsiteContent,

        addPromotion,
        togglePromotionStatus,
        deletePromotion,

        updateReviewStatus,
        toggleFeatureReview,

        markNotificationRead,
        markAllNotificationsRead,

        updateSettings,

        stats: {
          totalEnquiries,
          todayBookings,
          upcomingBookings,
          activeGymMembers,
          badmintonBookings,
          swimmingBookings,
          arenaBookings,
          eventBookings,
          todayRevenue,
          monthlyRevenue
        }
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
