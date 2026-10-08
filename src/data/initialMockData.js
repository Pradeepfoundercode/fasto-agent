export const INITIAL_AGENT = {
  name: "Rahul Sharma",
  mobile: "9876543210",
  email: "rahul.agent@fastomart.com",
  agentId: "FM-AGT-8921",
  referralCode: "FMAG12345",
  referralLink: "https://fastomart.app/join?ref=FMAG12345",
  zone: "Indiranagar, Bengaluru",
  joiningDate: "15 Sep 2026",
};

export const INITIAL_REFERRED_USERS = [
  {
    id: "usr_001",
    name: "Aarav Patel",
    phone: "+91 98234 11200",
    status: "ORDER_PLACED", // ORDER_PLACED, REGISTERED, PENDING
    statusLabel: "Order Placed",
    sharedAt: "Today, 4:15 PM",
    registeredAt: "Today, 4:32 PM",
    orderedAt: "Today, 5:02 PM",
    orderDetail: "Grocery Pack (₹480)",
    notes: "App installed via QR code at Indiranagar Metro"
  },
  {
    id: "usr_002",
    name: "Priya Singh",
    phone: "+91 97123 99812",
    status: "ORDER_PLACED",
    statusLabel: "Order Placed",
    sharedAt: "Today, 1:30 PM",
    registeredAt: "Today, 1:45 PM",
    orderedAt: "Today, 2:10 PM",
    orderDetail: "Dairy & Fruits (₹299)",
    notes: "WhatsApp link shared"
  },
  {
    id: "usr_003",
    name: "Vikas Verma",
    phone: "+91 91987 65432",
    status: "REGISTERED",
    statusLabel: "Registered",
    sharedAt: "Today, 11:20 AM",
    registeredAt: "Today, 11:45 AM",
    orderedAt: null,
    orderDetail: null,
    notes: "Registered with OTP, hasn't placed order yet"
  },
  {
    id: "usr_004",
    name: "Neha Gupta",
    phone: "+91 88765 23410",
    status: "REGISTERED",
    statusLabel: "Registered",
    sharedAt: "Yesterday, 6:40 PM",
    registeredAt: "Yesterday, 7:15 PM",
    orderedAt: null,
    orderDetail: null,
    notes: "Browse session active"
  },
  {
    id: "usr_005",
    name: "Amit Kumar",
    phone: "+91 99345 67890",
    status: "PENDING",
    statusLabel: "Pending / Not Registered",
    sharedAt: "Yesterday, 2:15 PM",
    registeredAt: null,
    orderedAt: null,
    orderDetail: null,
    notes: "SMS invite sent"
  },
  {
    id: "usr_006",
    name: "Pooja Sharma",
    phone: "+91 96543 21098",
    status: "ORDER_PLACED",
    statusLabel: "Order Placed",
    sharedAt: "05 Oct, 10:12 AM",
    registeredAt: "05 Oct, 10:40 AM",
    orderedAt: "05 Oct, 11:15 AM",
    orderDetail: "Vegetables & Snacks (₹650)",
    notes: "Direct QR scan"
  },
  {
    id: "usr_007",
    name: "Rohan Das",
    phone: "+91 93456 78901",
    status: "PENDING",
    statusLabel: "Pending / Not Registered",
    sharedAt: "04 Oct, 3:20 PM",
    registeredAt: null,
    orderedAt: null,
    orderDetail: null,
    notes: "Link clicked, registration pending"
  },
  {
    id: "usr_008",
    name: "Sneha Kulkarni",
    phone: "+91 98112 34567",
    status: "REGISTERED",
    statusLabel: "Registered",
    sharedAt: "03 Oct, 5:50 PM",
    registeredAt: "03 Oct, 6:10 PM",
    orderedAt: null,
    orderDetail: null,
    notes: "Profile created"
  },
  {
    id: "usr_009",
    name: "Deepa Nair",
    phone: "+91 97890 12345",
    status: "ORDER_PLACED",
    statusLabel: "Order Placed",
    sharedAt: "02 Oct, 8:05 PM",
    registeredAt: "02 Oct, 8:20 PM",
    orderedAt: "02 Oct, 9:00 PM",
    orderDetail: "Daily Essentials (₹340)",
    notes: "First delivery completed in 9 mins"
  },
  {
    id: "usr_010",
    name: "Manish Joshi",
    phone: "+91 91234 56780",
    status: "PENDING",
    statusLabel: "Pending / Not Registered",
    sharedAt: "01 Oct, 1:10 PM",
    registeredAt: null,
    orderedAt: null,
    orderDetail: null,
    notes: "Flyer QR code scan"
  }
];

export const ADMIN_CONTACT_INFO = {
  adminName: "Vikram Mehta (Field Operations Manager)",
  whatsappNumber: "+919800012345",
  callNumber: "+919800012345",
  email: "partner-support@fastomart.com",
  timing: "Mon - Sat: 9:00 AM - 8:00 PM",
  payoutDay: "Every Tuesday Direct Bank Transfer",
};
