// Menu data for the tasting event
export interface MenuSection {
  category: string;
  items: string[];
}

export const eventMenu: MenuSection[] = [
  {
    category: "Mocktail Counter",
    items: ["Mojito", "Orange Martina", "Black Currant Shanshai", "Blue Ocean", "Cranberry", "Strawberry Margerita", "Lychee Shanshai", "Rose Tender", "Jeera Cooler", "Kiwi Martina", "Green Apple", "Khus Fantacy", "Blackberry", "Summer Cooler", "Rasberry Lemon", "Margerita", "Blueberry Margerita", "Virgin Sangria", "Cranberry Mojito"]
  },
  {
    category: "Live Starters",
    items: ["Veg. Cigar Roll with Mayo Dips", "D Volvo", "Paneer Shashlik with Green Chutney", "Cheese Paneer Ball with Mayo Dips"]
  },
  {
    category: "Hot Appetizers",
    items: ["Khau Suey Soup with Siders", "Lemon Coriander Soup", "Manchow Soup with Chop Suey", "Ministrone Soup with Maccaroni"]
  },
  {
    category: "Chaat Items",
    items: ["Tikki Based Chaat", "Dry Fruit Makhana Chaat", "Rasile Dahi Bhalle", "Palak Patta Kurkure Chaat"]
  },
  {
    category: "South Indian",
    items: ["Masala Dosa", "Maisur Masala Dosa", "Green Garlic Khakhra Dosa", "Gotala Paper Dosa", "Cheese Palak Dosa", "Jini Roll Dosa", "Schezwan Dosa"]
  },
  {
    category: "Main Course",
    items: ["Paneer Pasanda", "Veg. Banjara", "Exotic Malai Veg.", "Paneer Lababdar", "Cheese Angoori", "Dal Tadka", "Dal Makhani", "Dum Biryani", "Bundi Raita", "Greecy Rice", "Jeera Coriander Rice"]
  },
  {
    category: "Breads",
    items: ["Tandoor Roti", "Baby Naan & Garlic Naan", "Lachha Paratha", "Missi Roti", "Stuff Kulcha"]
  },
  {
    category: "Desserts",
    items: ["Rajbhog & Blue Diamond Ice Cream", "Almond Carnival, Pistachio & Belgiam Choclate Ice Cream", "Live Kulfi: Jamun, Rajbhog, Mawa Malai"]
  }
];
