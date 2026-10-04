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
    name: 'Rayan Sports Academy Badminton',
    subBrand: 'Rayan Sports Academy',
    badge: '🏸 Academy Courts',
    category: 'badminton',
    description: 'Dedicated badminton facility featuring international synthetic flooring, shadowless LED lights, professional coaching academies, and district tournament hosting.',
    hourlyRate: 350,
    bookingDurationMin: 60,
    image: '/images/rayan_badminton_board.jpg',
    features: [
      'BWF standard high-cushion synthetic mats',
      'Anti-glare shadowless lighting systems',
      'High ceiling clearance for overhead smashes',
      'Specialized junior & adult coaching batches',
      'Changing rooms, lockers & spectator viewing'
    ],
    coachingPrograms: [
      'Junior Grassroots (Ages 6 - 14)',
      'Advanced Tournament High Performance',
      'Adult Evening Fitness & Match Play',
      'Weekend Squad Practice Sessions'
    ],
    availability: '05:30 AM - 10:30 PM',
    pricingNote: 'Hourly court booking rates. Monthly & quarterly coaching packages available.',
    status: 'active',
    rules: ['Non-marking badminton shoes strictly mandatory', 'Warm-up in designated zone only', 'Maintain time slot discipline']
  },
  {
    id: 'fac_pool',
    name: 'Silver Wave',
    subBrand: 'Silver Wave Aquatics',
    badge: '🏊 Aquatics Club',
    category: 'pool',
    description: 'Premier 5-lane swimming and aquatic training center with crystal-clean ozone-filtered water, certified lifeguards, and structured learn-to-swim programs. Official venue for Theni District championships.',
    hourlyRate: 200,
    bookingDurationMin: 60,
    image: '/images/silver_wave_pool_real.jpg',
    features: [
      '5-lane semi-covered competition pool',
      'Multi-stage ozone & chlorine balanced water',
      'Dedicated shallow kids splash and beginner pool',
      'Certified swimming coaches & on-duty lifeguards',
      'Pre-swim freshwater heated shower stations',
      'Sun loungers, poolside seating & spectator area'
    ],
    coachingPrograms: [
      'Learn-To-Swim Beginner (All Ages)',
      'Stroke Technique & Stamina Development',
      'Competitive Junior Swim Squad',
      'Family Weekend Leisure Swim Passes'
    ],
    availability: '06:00 AM - 11:00 AM & 03:30 PM - 07:30 PM',
    pricingNote: 'Hourly swim slots, monthly passes, and family weekend packages.',
    status: 'active',
    rules: ['Proper nylon/spandex swimwear mandatory', 'Shower prior to pool entry', 'Children must be accompanied by adults']
  },
  {
    id: 'fac_gym',
    name: 'Iron Empire',
    subBrand: 'Iron Empire Fitness Studio',
    badge: '🏋️ Modern Gym',
    category: 'gym',
    description: 'High-energy strength and conditioning arena equipped with commercial-grade resistance machines, olympic free weights, and functional cross-training bays.',
    hourlyRate: 150,
    bookingDurationMin: 90,
    image: '/images/iron_empire_gym_board.jpg',
    features: [
      'Commercial biomechanical strength machines',
      'Heavy dumbbell racks & Olympic barbell platforms',
      'Incline treadmills, ellipticals & spin bikes',
      'Dedicated cross-training, kettlebells & battle ropes',
      'Certified personal trainers & nutritional guidance'
    ],
    coachingPrograms: [
      'Strength & Hypertrophy Foundation',
      'Fat Loss & Metabolic Conditioning',
      '1-on-1 Personal Training Coaching',
      'General Posture & Mobility Routine'
    ],
    availability: '05:30 AM - 12:00 PM & 04:30 PM - 09:30 PM',
    pricingNote: 'Monthly, quarterly, and annual subscription packages.',
    status: 'active',
    rules: ['Carry personal sweat towel', 'Re-rack all weights and dumbbells after use']
  },
  {
    id: 'fac_event',
    name: 'Party & Celebration',
    subBrand: 'Sivan Celebrations',
    badge: '🎉 Banquet & Events',
    category: 'event',
    description: 'Versatile air-conditioned banquet and party venue designed for memorable birthdays, family celebrations, corporate meetings, and intimate gatherings.',
    hourlyRate: 2500,
    bookingDurationMin: 240,
    image: '/images/swimming_championship_banner.jpg',
    features: [
      'Fully centralized air-conditioned banquet hall',
      'Modern sound system, wireless mics & stage setup',
      'Dedicated dining hall & buffet catering service area',
      'Customizable celebration seating arrangements',
      'Spacious vehicle parking area near Thambis Theatre'
    ],
    coachingPrograms: [
      'Birthday Celebrations with Theme Setup',
      'Family Gatherings & Anniversary Dinners',
      'Corporate General Body Meets & Seminars',
      'Small Ceremonies & Private Social Events'
    ],
    availability: '08:00 AM - 11:00 PM',
    pricingNote: 'Custom session & full-day rental quotations with advance booking.',
    status: 'active',
    rules: ['Prior advance deposit required to confirm slot', 'Music volume subject to municipal regulations']
  },
  {
    id: 'fac_arena',
    name: 'Sports Arena',
    subBrand: 'Multi-Sport Arena',
    badge: '🏟️ Multi-Sport Arena',
    category: 'arena',
    description: 'Expansive indoor sports court built for box cricket, indoor futsal, volleyball, and squad tournament events with spectator seating.',
    hourlyRate: 600,
    bookingDurationMin: 60,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Polyurethane multi-sport court with shock absorption',
      'Safety netting for high-intensity box cricket & futsal',
      'Adjustable volleyball and basketball court lines',
      'Elevated spectator viewing gallery',
      'First aid safety station & sports equipment rental'
    ],
    coachingPrograms: [
      'Box Cricket League Weekend Tournaments',
      'Youth Indoor Futsal Drills',
      'Volleyball Practice & Team Matches',
      'Athletic Speed & Coordination Camps'
    ],
    availability: '06:00 AM - 10:00 PM',
    pricingNote: 'Hourly squad booking rates. Tournament packages available.',
    status: 'active',
    rules: ['Proper athletic sports shoes mandatory', 'Team slots should be booked 24h prior']
  }
];

export const INITIAL_MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan_1m',
    name: 'Iron Empire Monthly Fitness',
    durationMonths: 1,
    price: 1500,
    features: ['Full gym & cardio floor access', 'Locker & shower facilities', 'Free fitness assessment', 'Standard court discount 10%'],
  },
  {
    id: 'plan_3m',
    name: 'Iron Empire Quarterly Wellness',
    durationMonths: 3,
    price: 3800,
    popular: true,
    features: ['Full gym & cardio floor access', 'Silver Wave pool weekend access', 'Personalized workout roadmap', 'Court booking priority discount 15%'],
  },
  {
    id: 'plan_12m',
    name: 'Sivan Club Annual Elite Pass',
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
    membershipPlan: 'Iron Empire Quarterly Wellness',
    membershipStatus: 'active',
    bookingCount: 14,
    totalSpent: 6200,
    lastBookingDate: '2026-10-02',
    status: 'active',
    createdDate: '2026-06-15',
    notes: 'Regular morning player at Rayan Badminton Court'
  },
  {
    id: 'cust_02',
    name: 'Priya Dharshini',
    mobile: '9789200202',
    email: 'priya.d@example.com',
    address: 'Bazaar Street, Cumbum',
    membershipPlan: 'Iron Empire Monthly Fitness',
    membershipStatus: 'active',
    bookingCount: 8,
    totalSpent: 3400,
    lastBookingDate: '2026-10-03',
    status: 'active',
    createdDate: '2026-07-10',
    notes: 'Iron Empire Gym evening batch'
  },
  {
    id: 'cust_03',
    name: 'Senthil Nathan',
    mobile: '9443300303',
    email: 'senthil.n@example.com',
    address: 'Theni Main Road, Cumbum',
    membershipPlan: 'Sivan Club Annual Elite Pass',
    membershipStatus: 'active',
    bookingCount: 26,
    totalSpent: 16500,
    lastBookingDate: '2026-10-01',
    status: 'active',
    createdDate: '2026-01-20',
    notes: 'Elite member; interested in Rayan Academy tournaments'
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
    membershipPlan: 'Iron Empire Monthly Fitness',
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
    notes: 'Sports Arena box cricket enthusiast'
  },
  {
    id: 'cust_07',
    name: 'Meena Sundaram',
    mobile: '9787700707',
    email: 'meena.s@example.com',
    address: 'K.K. Nagar, Cumbum',
    membershipPlan: 'Iron Empire Quarterly Wellness',
    membershipStatus: 'active',
    bookingCount: 11,
    totalSpent: 5300,
    lastBookingDate: '2026-10-02',
    status: 'active',
    createdDate: '2026-07-22',
    notes: 'Regular swimmer at Silver Wave'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_101',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    mobile: '9842100101',
    facilityId: 'fac_badminton',
    facilityName: 'Rayan Sports Academy Badminton',
    date: '2026-10-03',
    startTime: '06:00',
    endTime: '07:00',
    amount: 350,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdDate: '2026-10-02',
    notes: 'Rayan Academy Court 1'
  },
  {
    id: 'bk_102',
    customerId: 'cust_06',
    customerName: 'Dinesh Karthik',
    mobile: '9842600606',
    facilityId: 'fac_arena',
    facilityName: 'Sports Arena',
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
    facilityName: 'Iron Empire',
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
    customerId: 'cust_07',
    customerName: 'Meena Sundaram',
    mobile: '9787700707',
    facilityId: 'fac_pool',
    facilityName: 'Silver Wave',
    date: '2026-10-03',
    startTime: '09:00',
    endTime: '10:00',
    amount: 200,
    paymentStatus: 'paid',
    bookingStatus: 'completed',
    createdDate: '2026-10-03'
  }
];

export const INITIAL_GYM_MEMBERSHIPS: GymMembership[] = [
  {
    id: 'mem_01',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    customerMobile: '9842100101',
    planName: 'Iron Empire Quarterly Wellness',
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
    planName: 'Iron Empire Monthly Fitness',
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
    planName: 'Sivan Club Annual Elite Pass',
    startDate: '2026-01-20',
    endDate: '2027-01-20',
    amount: 12000,
    paymentStatus: 'paid',
    status: 'active',
    autoRenew: true
  }
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay_901',
    customerId: 'cust_01',
    customerName: 'Arun Kumar',
    bookingId: 'bk_101',
    facilityName: 'Rayan Sports Academy Badminton',
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
    facilityName: 'Sports Arena',
    amount: 900,
    paymentMethod: 'UPI',
    transactionId: 'UPI/261003/77234',
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
    interestedFacility: 'Rayan Sports Academy Badminton',
    preferredDate: '2026-10-08',
    message: 'Interested in regular 6am court slot booking and academy coaching for our children.',
    createdDate: '2026-10-03',
    assignedStaff: 'R. Vignesh',
    status: 'new'
  },
  {
    id: 'enq_502',
    name: 'Dr. S. Mohan',
    mobile: '9443666222',
    email: 'dr.mohan@example.com',
    interestedFacility: 'Party & Celebration',
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
    interestedFacility: 'Iron Empire',
    preferredDate: '2026-10-05',
    message: 'Looking for 3-month gym membership and personal training guidance.',
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
    interestedFacility: 'Sports Arena',
    preferredDate: '2026-11-15',
    message: 'Enquiry for full weekend arena booking for regional youth badminton and futsal cup.',
    createdDate: '2026-10-01',
    assignedStaff: 'K. Sivan (Director)',
    status: 'confirmed',
    notes: 'Dates blocked pending final schedule'
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
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  {
    id: 'gal_01',
    title: 'Rayan Sports Academy Badminton Official Signboard',
    category: 'Badminton',
    imageUrl: '/images/rayan_badminton_board.jpg',
    isFeatured: true,
    active: true,
    order: 1
  },
  {
    id: 'gal_02',
    title: 'Silver Wave 5-Lane Aquatic Swimming Pool',
    category: 'Swimming Pool',
    imageUrl: '/images/silver_wave_pool_real.jpg',
    isFeatured: true,
    active: true,
    order: 2
  },
  {
    id: 'gal_03',
    title: 'Iron Empire Fitness Studio Exterior Signage',
    category: 'Gym',
    imageUrl: '/images/iron_empire_gym_board.jpg',
    isFeatured: true,
    active: true,
    order: 3
  },
  {
    id: 'gal_04',
    title: 'Sivan Sportz Club Reception & Administrative Block',
    category: 'Club',
    imageUrl: '/images/sivan_sports_entrance.jpg',
    isFeatured: true,
    active: true,
    order: 4
  },
  {
    id: 'gal_05',
    title: 'Theni Revenue District Swimming Competition-2026',
    category: 'Events',
    imageUrl: '/images/swimming_championship_banner.jpg',
    isFeatured: true,
    active: true,
    order: 5
  },
  {
    id: 'gal_06',
    title: 'Sports Arena Box Cricket & Futsal',
    category: 'Arena',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    isFeatured: true,
    active: true,
    order: 6
  },
  {
    id: 'gal_07',
    title: 'Sivan Party Hall Elegant Banquet Setup',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    isFeatured: false,
    active: true,
    order: 7
  }
];

export const INITIAL_PROMOTIONS: Promotion[] = [
  {
    id: 'prm_01',
    name: 'Rayan Academy Morning Early Bird',
    description: '15% discount on Badminton court bookings between 5:30 AM to 7:30 AM on weekdays.',
    discountType: 'percentage',
    discountValue: 15,
    applicableFacility: 'Rayan Sports Academy Badminton',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
    couponCode: 'RAYANBIRD15',
    status: 'active'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_01',
    customerName: 'K. Balakrishnan',
    rating: 5,
    review: 'Rayan Sports Academy has the finest badminton courts in Theni district! The synthetic flooring and shadowless lights are Olympic-grade. Great coaching staff.',
    facility: 'Rayan Sports Academy Badminton',
    date: '2026-09-28',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev_02',
    customerName: 'M. Sowmya',
    rating: 5,
    review: 'We hosted our family function here. Very neat air conditioning, clean dining area, and plenty of parking space near Thambis theatre in Cumbum.',
    facility: 'Party & Celebration',
    date: '2026-09-22',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev_03',
    customerName: 'S. Ramachandran',
    rating: 5,
    review: 'Silver Wave pool water is crystal clear and odorless. Lifeguards are very vigilant and kid coaching is patient and encouraging.',
    facility: 'Silver Wave',
    date: '2026-10-01',
    status: 'approved',
    featured: true
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_01',
    type: 'enquiry',
    title: 'New Rayan Academy Enquiry',
    message: 'V. Jayaprakash requested badminton squad training.',
    time: '15 mins ago',
    read: false,
    linkTab: 'enquiries'
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  heroHeadline: 'Where Sport Meets Energy.',
  heroSupportingText: 'Rayan Badminton Academy, Silver Wave Pool, Iron Empire Gym, Sports Arena and Grand Celebrations — all under one roof in Cumbum.',
  heroLocationBadge: 'Cumbum • Theni District',
  heroImageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1920&q=80',
  aboutTitle: 'About Sivan Sportz Club (சிவன் ஸ்போர்ட்ஸ் கிளப்)',
  aboutContent: 'Established in 2018, Sivan Sportz Club (சிவன் ஸ்போர்ட்ஸ் கிளப்) was founded with a pioneering vision to bring metropolitan-grade sports training, aquatic wellness, and celebration venues to Cumbum and the greater Theni District. Over the past 8 years, our integrated 5-in-1 campus has trained hundreds of young athletes, proudly hosted the Theni Revenue District Swimming Competition-2026, and served as the premier active lifestyle destination for health-conscious families.',
  establishedYear: '2018',
  vision: 'To empower every individual in Cumbum and Theni District through world-class sports coaching, active physical fitness, and memorable family celebrations.',
  mission: 'To provide high-standard synthetic courts, certified professional trainers, hygienic aquatic facilities, and hospitable event banquet spaces under one united roof.',
  address: 'Kalaivanar Street, Near Thambis Theatre',
  landmark: 'Near Thambis Theatre',
  city: 'Cumbum',
  district: 'Theni District',
  state: 'Tamil Nadu',
  pincode: '625516',
  phone: '+91 88707 90079',
  email: 'rayansportsacademy@gmail.com',
  whatsapp: '+91 88707 90079',
  instagram: 'https://instagram.com/sivansportsclub',
  facebook: 'https://facebook.com/sivansportsclub',
  openingHours: 'Monday – Sunday: 05:30 AM – 10:30 PM',
  seoTitle: 'Sivan Sportz Club Cumbum | Rayan Badminton, Silver Wave Pool, Iron Empire Gym',
  seoDescription: 'Sivan Sportz Club (சிவன் ஸ்போர்ட்ஸ் கிளப்) in Cumbum, Theni District — Rayan Sports Academy Badminton, Silver Wave Swimming Pool, Iron Empire Gym, Sports Arena, and Party Venue.'
};

export const INITIAL_SETTINGS: Settings = {
  businessName: 'Sivan Sportz Club',
  tagline: 'Play. Train. Celebrate. Live Better.',
  address: 'Kalaivanar Street, Near Thambis Theatre, Cumbum, Theni District, Tamil Nadu – 625516',
  phone: '+91 88707 90079',
  email: 'rayansportsacademy@gmail.com',
  website: 'https://sivansportsclub.com',
  whatsapp: '+91 88707 90079',
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
    details: 'Configured Rayan Sports Academy Badminton with BWF synthetic flooring.'
  }
];
