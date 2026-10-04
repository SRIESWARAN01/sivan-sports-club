import type { 
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
  AdminUser 
} from '../types/database';

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr_admin_1',
    name: 'K. Sivan (Director)',
    email: 'demo.admin@sivansportsclub.com',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    lastLogin: 'Just now',
    status: 'active'
  },
  {
    id: 'usr_mgr_1',
    name: 'M. Anand (Operations)',
    email: 'demo.manager@sivansportsclub.com',
    role: 'MANAGER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    lastLogin: '2 hours ago',
    status: 'active'
  },
  {
    id: 'usr_stf_1',
    name: 'R. Vignesh (Court Supervisor)',
    email: 'demo.staff@sivansportsclub.com',
    role: 'STAFF',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    lastLogin: 'Today, 08:30 AM',
    status: 'active'
  },
  {
    id: 'usr_acc_1',
    name: 'S. Lakshmi (Accounts Lead)',
    email: 'demo.accounts@sivansportsclub.com',
    role: 'ACCOUNTS',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    lastLogin: 'Yesterday, 05:45 PM',
    status: 'active'
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fac_badminton',
    name: 'Indoor Badminton Court',
    category: 'badminton',
    description: 'Play, practice and enjoy badminton in a dedicated indoor environment designed for an active sporting experience.',
    hourlyRate: 350,
    bookingDurationMin: 60,
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    features: ['High-cushion synthetic flooring', 'Shadowless glare-free LED lighting', 'High ceiling clearances', 'Yonex approved dimensions', 'Changing rooms & locker facility'],
    availability: '05:30 AM - 10:30 PM',
    pricingNote: 'Hourly court booking rates. Monthly passes available.',
    status: 'active',
    rules: ['Non-marking shoes strictly mandatory', 'Warm-up in designated zone only', 'Maintain time slot discipline']
  },
  {
    id: 'fac_arena',
    name: 'Multi-Sport Arena',
    category: 'arena',
    description: 'A flexible sports environment for training, recreation and multi-sport activities.',
    hourlyRate: 600,
    bookingDurationMin: 60,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    features: ['Multi-purpose polyurethane sports court', 'Box cricket & futsal compatible', 'Volleyball & basketball markings', 'Spectator gallery', 'First aid safety station'],
    availability: '06:00 AM - 10:00 PM',
    pricingNote: 'Hourly squad booking rates. Tournament packages available.',
    status: 'active',
    rules: ['Proper athletic gear mandatory', 'Team slots should be booked 24h prior']
  },
  {
    id: 'fac_gym',
    name: 'Gym & Fitness Center',
    category: 'gym',
    description: 'A dedicated fitness environment for strength, conditioning and everyday wellness.',
    hourlyRate: 150,
    bookingDurationMin: 90,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    features: ['Commercial grade strength & cardio machines', 'Free weights & kettlebell section', 'Dedicated functional cross-training bay', 'Certified fitness coaches available', 'Steam shower & lockers'],
    availability: '05:30 AM - 12:00 PM & 04:30 PM - 09:30 PM',
    pricingNote: 'Monthly, quarterly, and annual subscription packages.',
    status: 'active',
    rules: ['Carry personal towel', 'Re-rack all weights after use']
  },
  {
    id: 'fac_pool',
    name: 'Swimming Pool',
    category: 'pool',
    description: 'Enjoy swimming, training and refreshing pool time in a modern environment.',
    hourlyRate: 200,
    bookingDurationMin: 60,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    features: ['Crystal clean ozone-filtered chlorinated pool', 'Separate shallow kids splash zone', 'Trained safety lifeguard on duty', 'Heated fresh water showers', 'Sun loungers & relaxation zone'],
    availability: '06:00 AM - 11:00 AM & 03:30 PM - 07:30 PM',
    pricingNote: 'Hourly swim slots and family weekend passes.',
    status: 'active',
    rules: ['Proper nylon/spandex swimwear mandatory', 'Shower prior to pool entry']
  },
  {
    id: 'fac_event',
    name: 'Party Hall & Event Space',
    category: 'event',
    description: 'A versatile venue for celebrations, private gatherings and special occasions.',
    hourlyRate: 2500,
    bookingDurationMin: 240,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    features: ['Fully air-conditioned luxury hall', 'Modern audio-visual & projection setup', 'Dedicated dining & catering service area', 'Customizable celebration seating arrangements', 'Generous vehicle parking area'],
    availability: '08:00 AM - 11:00 PM',
    pricingNote: 'Custom session & full-day rental quotations.',
    status: 'active',
    rules: ['Prior advance payment required', 'Music volume subject to local regulations']
  }
];

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan_1m',
    name: 'Monthly Fitness Pass',
    durationMonths: 1,
    price: 1500,
    features: ['Full gym & cardio floor access', 'Locker & shower facilities', 'Free fitness assessment', 'Standard court discount 10%'],
  },
  {
    id: 'plan_3m',
    name: 'Quarterly Wellness Plan',
    durationMonths: 3,
    price: 3800,
    popular: true,
    features: ['Full gym & cardio floor access', 'Swimming pool weekend access', 'Personalized workout roadmap', 'Court booking priority discount 15%'],
  },
  {
    id: 'plan_12m',
    name: 'Annual Elite Club Pass',
    durationMonths: 12,
    price: 12000,
    features: ['All-inclusive Gym & Pool access', 'Free badminton court passes (2 hrs/mo)', 'Guest passes for family', 'Discounts on event space rental 20%'],
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Arun Kumar',
    mobile: '9842100101',
    email: 'arun.k@example.com',
    address: 'Kalaivanar St, Cumbum',
    membershipPlan: 'Quarterly Wellness Plan',
    membershipStatus: 'active',
    bookingCount: 14,
    totalSpent: 6200,
    lastBookingDate: '2026-10-02',
    status: 'active',
    createdDate: '2026-06-15',
    notes: 'Regular morning badminton player (Court 1)'
  },
  {
    id: 'cust_02',
    name: 'Priya Dharshini',
    mobile: '9789200202',
    email: 'priya.d@example.com',
    address: 'Bazaar Street, Cumbum',
    membershipPlan: 'Monthly Fitness Pass',
    membershipStatus: 'active',
    bookingCount: 8,
    totalSpent: 3400,
    lastBookingDate: '2026-10-03',
    status: 'active',
    createdDate: '2026-07-10',
    notes: 'Gym evening batch'
  },
  {
    id: 'cust_03',
    name: 'Senthil Nathan',
    mobile: '9443300303',
    email: 'senthil.n@example.com',
    address: 'Theni Main Road, Cumbum',
    membershipPlan: 'Annual Elite Club Pass',
    membershipStatus: 'active',
    bookingCount: 26,
    totalSpent: 16500,
    lastBookingDate: '2026-10-01',
    status: 'active',
    createdDate: '2026-01-20',
    notes: 'Elite member; interested in annual club tournaments'
  },
  {
    id: 'cust_04',
    name: 'Kavitha Murugan',
    mobile: '9840400404',
    email: 'kavitha.m@example.com',
    address: 'Surulipatty, Cumbum',
    membershipStatus: 'none',
    bookingCount: 3,
    totalSpent: 9000,
    lastBookingDate: '2026-09-28',
    status: 'active',
    createdDate: '2026-08-05',
    notes: 'Booked Party Hall for birthday celebration'
  },
  {
    id: 'cust_05',
    name: 'Vigneshwaran R.',
    mobile: '9629500505',
    email: 'vignesh.r@example.com',
    address: 'Near Thambis Theatre, Cumbum',
    membershipPlan: 'Monthly Fitness Pass',
    membershipStatus: 'expired',
    bookingCount: 9,
    totalSpent: 4200,
    lastBookingDate: '2026-09-15',
    status: 'active',
    createdDate: '2026-05-18',
    notes: 'Membership renewal due'
  },
  {
    id: 'cust_06',
    name: 'Dinesh Karthik',
    mobile: '9842600606',
    email: 'dinesh.k@example.com',
    address: 'Chellampatti, Cumbum',
    membershipStatus: 'none',
    bookingCount: 5,
    totalSpent: 1800,
    lastBookingDate: '2026-10-03',
    status: 'active',
    createdDate: '2026-09-02',
    notes: 'Multi-sport arena box cricket enthusiast'
  },
  {
    id: 'cust_07',
    name: 'Meena Sundaram',
    mobile: '9787700707',
    email: 'meena.s@example.com',
    address: 'K.K. Nagar, Cumbum',
    membershipPlan: 'Quarterly Wellness Plan',
    membershipStatus: 'active',
    bookingCount: 11,
    totalSpent: 5300,
    lastBookingDate: '2026-10-02',
    status: 'active',
    createdDate: '2026-07-22'
  },
  {
    id: 'cust_08',
    name: 'Rajesh Kannan',
    mobile: '9442800808',
    email: 'rajesh.kannan@example.com',
    address: 'GH Road, Cumbum',
    membershipStatus: 'none',
    bookingCount: 2,
    totalSpent: 700,
    lastBookingDate: '2026-09-20',
    status: 'active',
    createdDate: '2026-08-14'
  },
  {
    id: 'cust_09',
    name: 'Deepa Ramesh',
    mobile: '9843900909',
    email: 'deepa.r@example.com',
    address: 'Kalaivanar Street, Cumbum',
    membershipPlan: 'Annual Elite Club Pass',
    membershipStatus: 'active',
    bookingCount: 19,
    totalSpent: 14200,
    lastBookingDate: '2026-10-03',
    status: 'active',
    createdDate: '2026-02-11'
  },
  {
    id: 'cust_10',
    name: 'Saravanan Perumal',
    mobile: '9791001010',
    email: 'saravanan.p@example.com',
    address: 'Uthamapalayam Road, Cumbum',
    membershipStatus: 'none',
    bookingCount: 4,
    totalSpent: 1400,
    lastBookingDate: '2026-09-29',
    status: 'active',
    createdDate: '2026-08-25'
  },
  {
    id: 'cust_11',
    name: 'Karthik Raja',
    mobile: '9842111111',
    email: 'karthik.raja@example.com',
    address: 'Thambis Theatre Road, Cumbum',
    membershipStatus: 'none',
    bookingCount: 6,
    totalSpent: 2100,
    lastBookingDate: '2026-10-01',
    status: 'active',
    createdDate: '2026-07-15'
  },
  {
    id: 'cust_12',
    name: 'Anitha Balaji',
    mobile: '9443222222',
    email: 'anitha.b@example.com',
    address: 'Bypass Road, Cumbum',
    membershipPlan: 'Monthly Fitness Pass',
    membershipStatus: 'active',
    bookingCount: 7,
    totalSpent: 3100,
    lastBookingDate: '2026-10-02',
    status: 'active',
    createdDate: '2026-08-01'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_101',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    mobile: '9842100101',
    facilityId: 'fac_badminton',
    facilityName: 'Indoor Badminton Court',
    date: '2026-10-03',
    startTime: '06:00',
    endTime: '07:00',
    amount: 350,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-02',
    notes: 'Court 1 slot confirmed'
  },
  {
    id: 'bk_102',
    customerId: 'cust_06',
    customerName: 'Dinesh Karthik',
    mobile: '9842600606',
    facilityId: 'fac_arena',
    facilityName: 'Multi-Sport Arena',
    date: '2026-10-03',
    startTime: '18:00',
    endTime: '19:30',
    amount: 900,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-02',
    notes: 'Box cricket friendly game'
  },
  {
    id: 'bk_103',
    customerId: 'cust_02',
    customerName: 'Priya Dharshini',
    mobile: '9789200202',
    facilityId: 'fac_gym',
    facilityName: 'Gym & Fitness Center',
    date: '2026-10-03',
    startTime: '07:00',
    endTime: '08:30',
    amount: 150,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdDate: '2026-10-03'
  },
  {
    id: 'bk_104',
    customerId: 'cust_09',
    customerName: 'Deepa Ramesh',
    mobile: '9843900909',
    facilityId: 'fac_pool',
    facilityName: 'Swimming Pool',
    date: '2026-10-03',
    startTime: '09:00',
    endTime: '10:00',
    amount: 200,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdDate: '2026-10-03'
  },
  {
    id: 'bk_105',
    customerId: 'cust_11',
    customerName: 'Karthik Raja',
    mobile: '9842111111',
    facilityId: 'fac_badminton',
    facilityName: 'Indoor Badminton Court',
    date: '2026-10-04',
    startTime: '06:30',
    endTime: '07:30',
    amount: 350,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-03'
  },
  {
    id: 'bk_106',
    customerId: 'cust_03',
    customerName: 'Senthil Nathan',
    mobile: '9443300303',
    facilityId: 'fac_badminton',
    facilityName: 'Indoor Badminton Court',
    date: '2026-10-04',
    startTime: '19:00',
    endTime: '20:00',
    amount: 350,
    paymentStatus: 'pending',
    bookingStatus: 'pending',
    createdDate: '2026-10-03',
    notes: 'Awaiting cash on arrival'
  },
  {
    id: 'bk_107',
    customerId: 'cust_07',
    customerName: 'Meena Sundaram',
    mobile: '9787700707',
    facilityId: 'fac_pool',
    facilityName: 'Swimming Pool',
    date: '2026-10-04',
    startTime: '16:00',
    endTime: '17:00',
    amount: 200,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-03'
  },
  {
    id: 'bk_108',
    customerId: 'cust_08',
    customerName: 'Rajesh Kannan',
    mobile: '9442800808',
    facilityId: 'fac_arena',
    facilityName: 'Multi-Sport Arena',
    date: '2026-10-05',
    startTime: '17:00',
    endTime: '18:30',
    amount: 900,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-02'
  },
  {
    id: 'bk_109',
    customerId: 'cust_10',
    customerName: 'Saravanan Perumal',
    mobile: '9791001010',
    facilityId: 'fac_badminton',
    facilityName: 'Indoor Badminton Court',
    date: '2026-10-02',
    startTime: '06:00',
    endTime: '07:00',
    amount: 350,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdDate: '2026-10-01'
  },
  {
    id: 'bk_110',
    customerId: 'cust_12',
    customerName: 'Anitha Balaji',
    mobile: '9443222222',
    facilityId: 'fac_gym',
    facilityName: 'Gym & Fitness Center',
    date: '2026-10-02',
    startTime: '06:00',
    endTime: '07:30',
    amount: 150,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdDate: '2026-10-01'
  }
];

export const INITIAL_GYM_MEMBERSHIPS: GymMembership[] = [
  {
    id: 'mem_01',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    customerMobile: '9842100101',
    planName: 'Quarterly Wellness Plan',
    startDate: '2026-08-01',
    endDate: '2026-11-01',
    amount: 3800,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: true
  },
  {
    id: 'mem_02',
    customerId: 'cust_02',
    customerName: 'Priya Dharshini',
    customerMobile: '9789200202',
    planName: 'Monthly Fitness Pass',
    startDate: '2026-09-15',
    endDate: '2026-10-15',
    amount: 1500,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: false
  },
  {
    id: 'mem_03',
    customerId: 'cust_03',
    customerName: 'Senthil Nathan',
    customerMobile: '9443300303',
    planName: 'Annual Elite Club Pass',
    startDate: '2026-01-20',
    endDate: '2027-01-20',
    amount: 12000,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: true
  },
  {
    id: 'mem_04',
    customerId: 'cust_05',
    customerName: 'Vigneshwaran R.',
    customerMobile: '9629500505',
    planName: 'Monthly Fitness Pass',
    startDate: '2026-08-15',
    endDate: '2026-09-15',
    amount: 1500,
    paymentStatus: 'paid',
    status: 'expired',
    autoRenew: false
  },
  {
    id: 'mem_05',
    customerId: 'cust_07',
    customerName: 'Meena Sundaram',
    customerMobile: '9787700707',
    planName: 'Quarterly Wellness Plan',
    startDate: '2026-07-22',
    endDate: '2026-10-22',
    amount: 3800,
    paymentStatus: 'paid',
    status: 'expiring_soon',
    autoRenew: true
  },
  {
    id: 'mem_06',
    customerId: 'cust_09',
    customerName: 'Deepa Ramesh',
    customerMobile: '9843900909',
    planName: 'Annual Elite Club Pass',
    startDate: '2026-02-11',
    endDate: '2027-02-11',
    amount: 12000,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: true
  },
  {
    id: 'mem_07',
    customerId: 'cust_12',
    customerName: 'Anitha Balaji',
    customerMobile: '9443222222',
    planName: 'Monthly Fitness Pass',
    startDate: '2026-09-25',
    endDate: '2026-10-25',
    amount: 1500,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: false
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay_901',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    bookingId: 'bk_101',
    facilityName: 'Indoor Badminton Court',
    amount: 350,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/99120',
    paymentDate: '2026-10-03',
    status: 'paid'
  },
  {
    id: 'pay_902',
    customerId: 'cust_06',
    customerName: 'Dinesh Karthik',
    bookingId: 'bk_102',
    facilityName: 'Multi-Sport Arena',
    amount: 900,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/77234',
    paymentDate: '2026-10-03',
    status: 'paid'
  },
  {
    id: 'pay_903',
    customerId: 'cust_02',
    customerName: 'Priya Dharshini',
    bookingId: 'bk_103',
    facilityName: 'Gym & Fitness Center',
    amount: 150,
    paymentMethod: 'Cash',
    transactionId: 'CSH/REC/2610-03',
    paymentDate: '2026-10-03',
    status: 'paid'
  },
  {
    id: 'pay_904',
    customerId: 'cust_09',
    customerName: 'Deepa Ramesh',
    bookingId: 'bk_104',
    facilityName: 'Swimming Pool',
    amount: 200,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/11492',
    paymentDate: '2026-10-03',
    status: 'paid'
  },
  {
    id: 'pay_905',
    customerId: 'cust_04',
    customerName: 'Kavitha Murugan',
    facilityName: 'Party Hall & Event Space',
    amount: 5000,
    paymentMethod: 'NetBanking',
    transactionId: 'NEFT/261002/88219',
    paymentDate: '2026-10-02',
    status: 'paid'
  },
  {
    id: 'pay_906',
    customerId: 'cust_11',
    customerName: 'Karthik Raja',
    bookingId: 'bk_105',
    facilityName: 'Indoor Badminton Court',
    amount: 350,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/44019',
    paymentDate: '2026-10-03',
    status: 'paid'
  },
  {
    id: 'pay_907',
    customerId: 'cust_07',
    customerName: 'Meena Sundaram',
    bookingId: 'bk_107',
    facilityName: 'Swimming Pool',
    amount: 200,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/33918',
    paymentDate: '2026-10-03',
    status: 'paid'
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq_501',
    name: 'V. Jayaprakash',
    mobile: '9842555111',
    email: 'jprakash@example.com',
    interestedFacility: 'Indoor Badminton Court',
    preferredDate: '2026-10-08',
    message: 'Interested in regular 6am court slot booking for our 4-member badminton squad.',
    createdDate: '2026-10-03',
    assignedStaff: 'R. Vignesh',
    status: 'new'
  },
  {
    id: 'enq_502',
    name: 'Dr. S. Mohan',
    mobile: '9443666222',
    email: 'dr.mohan@example.com',
    interestedFacility: 'Party Hall & Event Space',
    preferredDate: '2026-10-24',
    message: 'Planning daughter birthday celebration with ~80 guests. Please share hall package details.',
    createdDate: '2026-10-03',
    assignedStaff: 'M. Anand',
    status: 'contacted',
    notes: 'Quotation sent via WhatsApp'
  },
  {
    id: 'enq_503',
    name: 'Muruganandam T.',
    mobile: '9789777333',
    email: 't.murugan@example.com',
    interestedFacility: 'Gym & Fitness Center',
    preferredDate: '2026-10-05',
    message: 'Looking for 3-month gym membership and personal coaching guidance.',
    createdDate: '2026-10-02',
    assignedStaff: 'R. Vignesh',
    status: 'follow_up',
    notes: 'Demo session scheduled for Monday'
  },
  {
    id: 'enq_504',
    name: 'Theni District Sports Assn',
    mobile: '9840888444',
    email: 'thenisports@example.com',
    interestedFacility: 'Multi-Sport Arena',
    preferredDate: '2026-11-15',
    message: 'Enquiry for full weekend arena booking for regional youth badminton and futsal cup.',
    createdDate: '2026-10-01',
    assignedStaff: 'K. Sivan (Director)',
    status: 'confirmed',
    notes: 'Dates blocked pending final schedule'
  },
  {
    id: 'enq_505',
    name: 'Radha Krishnan',
    mobile: '9629999555',
    email: 'radha.k@example.com',
    interestedFacility: 'Swimming Pool',
    preferredDate: '2026-10-10',
    message: 'Weekend family swim timings and pool cleanliness inquiry.',
    createdDate: '2026-10-01',
    assignedStaff: 'R. Vignesh',
    status: 'closed',
    notes: 'Customer visited and joined monthly package'
  }
];

export const INITIAL_EVENTS: ClubEvent[] = [
  {
    id: 'evt_301',
    customerName: 'Kavitha Murugan',
    customerMobile: '9840400404',
    eventType: 'Birthday',
    eventDate: '2026-10-18',
    startTime: '17:00',
    endTime: '22:00',
    guestCount: 90,
    requirements: ['Stage balloon decor', 'Audio & wireless mic system', 'Dining buffet setup', 'Car parking assistance'],
    quotationAmount: 18000,
    advanceAmount: 5000,
    balanceAmount: 13000,
    paymentStatus: 'partially_paid',
    status: 'confirmed',
    notes: 'Advance received via NetBanking. Cake table on main stage.',
    createdDate: '2026-09-28'
  },
  {
    id: 'evt_302',
    customerName: 'Dr. S. Mohan',
    customerMobile: '9443666222',
    eventType: 'Family Function',
    eventDate: '2026-10-24',
    startTime: '10:00',
    endTime: '15:00',
    guestCount: 110,
    requirements: ['Traditional seating arrangement', 'Dining hall setup', 'PA system', 'Power backup generator'],
    quotationAmount: 22000,
    advanceAmount: 0,
    balanceAmount: 22000,
    paymentStatus: 'pending',
    status: 'quotation',
    notes: 'Sent formal quotation; customer visiting on Sunday',
    createdDate: '2026-10-03'
  },
  {
    id: 'evt_303',
    customerName: 'Cumbum Traders Association',
    customerMobile: '9842100888',
    eventType: 'Corporate Event',
    eventDate: '2026-11-05',
    startTime: '18:00',
    endTime: '21:30',
    guestCount: 65,
    requirements: ['Projector & screen', 'Podium mic', 'High tea arrangements'],
    quotationAmount: 14000,
    advanceAmount: 14000,
    balanceAmount: 0,
    paymentStatus: 'paid',
    status: 'confirmed',
    notes: 'Annual general body meeting',
    createdDate: '2026-09-30'
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 'gal_01',
    title: 'Indoor Badminton Court Action',
    category: 'Badminton',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 1
  },
  {
    id: 'gal_02',
    title: 'Professional High Ceiling Courts',
    category: 'Badminton',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 2
  },
  {
    id: 'gal_03',
    title: 'Double Match Training',
    category: 'Badminton',
    imageUrl: 'https://images.unsplash.com/photo-1613918431703-aa6321c834a3?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 3
  },
  {
    id: 'gal_04',
    title: 'Multi-Sport Indoor Arena',
    category: 'Arena',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 4
  },
  {
    id: 'gal_05',
    title: 'Youth Sports Conditioning',
    category: 'Arena',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 5
  },
  {
    id: 'gal_06',
    title: 'Strength Training & Dumbbells',
    category: 'Gym',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 6
  },
  {
    id: 'gal_07',
    title: 'Cardio & Treadmill Suite',
    category: 'Gym',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 7
  },
  {
    id: 'gal_08',
    title: 'Ozone-Clean Swimming Pool',
    category: 'Swimming Pool',
    imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 8
  },
  {
    id: 'gal_09',
    title: 'Evening Swimming Session',
    category: 'Swimming Pool',
    imageUrl: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 9
  },
  {
    id: 'gal_10',
    title: 'Elegantly Decorated Party Hall',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 10
  },
  {
    id: 'gal_11',
    title: 'Modern Sports Club Exterior & Lobby',
    category: 'Club',
    imageUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 11
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'prm_01',
    name: 'Morning Court Early Bird',
    description: '15% discount on Badminton court bookings between 5:30 AM to 7:30 AM on weekdays.',
    discountType: 'percentage',
    discountValue: 15,
    applicableFacility: 'Indoor Badminton Court',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    couponCode: 'SIVANBIRD15',
    status: 'active'
  },
  {
    id: 'prm_02',
    name: 'Annual Gym Membership Inaugural',
    description: 'Flat Rs. 2,000 off on 12-month Elite fitness packages.',
    discountType: 'fixed',
    discountValue: 2000,
    applicableFacility: 'Gym & Fitness Center',
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    couponCode: 'FITCLUB2000',
    status: 'active'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    customerName: 'K. Balakrishnan',
    rating: 5,
    review: 'Best sports facility in Cumbum! The badminton courts have proper synthetic flooring and high ceilings. You don’t feel cramped like older venues.',
    facility: 'Indoor Badminton Court',
    date: '2026-09-28',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev_02',
    customerName: 'M. Sowmya',
    rating: 5,
    review: 'We hosted my brother’s 25th birthday celebration here in the party hall. Very neat air conditioning, clean dining area, and plenty of parking space near Thambis theatre.',
    facility: 'Party Hall & Event Space',
    date: '2026-09-22',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev_03',
    customerName: 'S. Ramachandran',
    rating: 5,
    review: 'The swimming pool water is remarkably clean and well maintained with proper chlorine balance. Great place for family and kids swimming in Theni district.',
    facility: 'Swimming Pool',
    date: '2026-10-01',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev_04',
    customerName: 'V. Prakash',
    rating: 5,
    review: 'State of the art gym equipment. Trainer Vignesh explains form and safety very well. Monthly passes are very economical for daily workouts.',
    facility: 'Gym & Fitness Center',
    date: '2026-09-18',
    status: 'approved',
    featured: true
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_01',
    type: 'enquiry',
    title: 'New Website Enquiry',
    message: 'V. Jayaprakash requested badminton court squad slots.',
    time: '15 mins ago',
    read: false,
    linkTab: 'enquiries'
  },
  {
    id: 'notif_02',
    type: 'payment',
    title: 'Payment Received',
    message: 'Rs. 350 received via UPI for Badminton Court (Arun Kumar).',
    time: '1 hour ago',
    read: false,
    linkTab: 'payments'
  },
  {
    id: 'notif_03',
    type: 'membership',
    title: 'Membership Expiring Soon',
    message: 'Meena Sundaram quarterly membership expires in 19 days.',
    time: '3 hours ago',
    read: true,
    linkTab: 'memberships'
  },
  {
    id: 'notif_04',
    type: 'event',
    title: 'Event Booking Confirmed',
    message: 'Birthday celebration for Kavitha Murugan on 18 Oct 2026.',
    time: 'Yesterday',
    read: true,
    linkTab: 'events'
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  heroHeadline: 'Where Sport Meets Energy.',
  heroSupportingText: 'Badminton, fitness, swimming, multi-sport activities and celebrations — all under one roof in Cumbum.',
  heroLocationBadge: 'Cumbum • Theni District',
  heroImageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1920&q=80',
  aboutTitle: 'More Than a Sports Club.',
  aboutContent: 'Sivan Sports Club brings sport, fitness, recreation and celebrations together in one destination at the heart of Cumbum. Built with a passion for healthy living and community energy, our multi-sport campus offers dedicated indoor courts, modern fitness facilities, crystal clean aquatic zones, and versatile celebration spaces for families and athletes across Theni District.',
  address: 'Kalaivanar Street, Near Thambis Theatre',
  landmark: 'Near Thambis Theatre',
  city: 'Cumbum',
  district: 'Theni District',
  state: 'Tamil Nadu',
  pincode: '625516',
  phone: '+91 94430 00000',
  email: 'contact@sivansportsclub.com',
  whatsapp: '+91 94430 00000',
  instagram: 'https://instagram.com/sivansportsclub',
  facebook: 'https://facebook.com/sivansportsclub',
  seoTitle: 'Sivan Sports Club Cumbum | Badminton, Gym, Swimming & Events',
  seoDescription: 'Sivan Sports Club in Cumbum, Theni District — indoor badminton, multi-sport arena, gym and fitness center, swimming pool and party & event space.'
};

export const INITIAL_SETTINGS: Settings = {
  businessName: 'Sivan Sports Club',
  tagline: 'Play. Train. Celebrate. Live Better.',
  address: 'Kalaivanar Street, Near Thambis Theatre, Cumbum, Theni District, Tamil Nadu – 625516',
  phone: '+91 94430 00000',
  email: 'contact@sivansportsclub.com',
  website: 'https://sivansportsclub.com',
  whatsapp: '+91 94430 00000',
  instagram: 'https://instagram.com/sivansportsclub',
  facebook: 'https://facebook.com/sivansportsclub',
  bookingBufferMin: 15,
  cancellationHours: 12,
  currency: 'INR',
  taxPercent: 0,
  emailNotifications: true,
  whatsappNotifications: true,
  smsNotifications: false,
  paymentGatewayActive: true
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    adminName: 'K. Sivan (Director)',
    role: 'SUPER_ADMIN',
    action: 'Facility Created',
    module: 'Facilities',
    recordId: 'fac_badminton',
    timestamp: '2026-10-01 10:00:00',
    details: 'Configured Indoor Badminton Court with synthetic flooring and 60 min slots.'
  },
  {
    id: 'log_02',
    adminName: 'M. Anand (Operations)',
    role: 'MANAGER',
    action: 'Booking Confirmed',
    module: 'Bookings',
    recordId: 'bk_101',
    timestamp: '2026-10-02 18:30:00',
    details: 'Confirmed Court 1 slot for Arun Kumar.'
  },
  {
    id: 'log_03',
    adminName: 'S. Lakshmi (Accounts Lead)',
    role: 'ACCOUNTS',
    action: 'Payment Recorded',
    module: 'Payments',
    recordId: 'pay_905',
    timestamp: '2026-10-02 19:15:00',
    details: 'Recorded Advance Rs. 5000 from Kavitha Murugan for Birthday party booking.'
  }
];
