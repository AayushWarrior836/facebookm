export interface Person {
  name: string;
  avatar: string;
  mutualFriends?: number;
}

/** The logged-in user — always Shiva Raj Lamsal. */
export const currentUser = {
  name: "Shiva Raj Lamsal",
  firstName: "Shiva",
  details: [
    "Digital creator",
    "Lives in Kawasoti, Nawalpur",
    "Married",
    "Joined 1 year ago",
  ],
};

/** Shiva's personal friends. They never create stories or feed posts. */
export const friends: Person[] = [
  { name: "Aayush Lamsal", avatar: "", mutualFriends: 12 },
  { name: "Anusha Lamsal", avatar: "", mutualFriends: 8 },
  { name: "Amrita Lamsal", avatar: "", mutualFriends: 15 },
  { name: "Asmita Lamsal", avatar: "", mutualFriends: 6 },
  { name: "Being Santosh", avatar: "", mutualFriends: 21 },
  { name: "Govinda Lamsal", avatar: "", mutualFriends: 9 },
  { name: "Laxmi Poudel", avatar: "", mutualFriends: 4 },
  { name: "Dip Narayan", avatar: "", mutualFriends: 2 },
];

/** Community users — they create stories, posts, videos and public content. */
export const communityUsers: Person[] = [
  { name: "Ramesh Sigdel", avatar: "", mutualFriends: 7 },
  { name: "Suman Sapkota", avatar: "", mutualFriends: 3 },
  { name: "Prakash Devkota", avatar: "", mutualFriends: 5 },
  { name: "Nisha Lamsal", avatar: "", mutualFriends: 11 },
  { name: "Sabina Poudel", avatar: "", mutualFriends: 6 },
  { name: "Roshan Sigdel", avatar: "", mutualFriends: 2 },
  { name: "Aarati Sapkota", avatar: "", mutualFriends: 9 },
  { name: "Sagar Devkota", avatar: "", mutualFriends: 4 },
  { name: "Kiran Lamsal", avatar: "", mutualFriends: 13 },
  { name: "Samiksha Poudel", avatar: "", mutualFriends: 1 },
  { name: "Bibek Sapkota", avatar: "", mutualFriends: 8 },
  { name: "Sujan Devkota", avatar: "", mutualFriends: 5 },
  { name: "Alisha Lamsal", avatar: "", mutualFriends: 10 },
  { name: "Prerana Poudel", avatar: "", mutualFriends: 3 },
  { name: "Anish Sigdel", avatar: "", mutualFriends: 7 },
  { name: "Suraj Sapkota", avatar: "", mutualFriends: 2 },
  { name: "Ashmita Devkota", avatar: "", mutualFriends: 6 },
  { name: "Ritu Lamsal", avatar: "", mutualFriends: 14 },
  { name: "Kamal Poudel", avatar: "", mutualFriends: 4 },
  { name: "Saroj Sigdel", avatar: "", mutualFriends: 9 },
];

export const locations = [
  "Kawasoti",
  "Nawalpur",
  "Kathmandu",
  "Pokhara",
  "Chitwan",
  "Bharatpur",
  "Butwal",
  "Lumbini",
];
