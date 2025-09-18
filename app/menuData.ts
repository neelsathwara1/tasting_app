// Menu data for the tasting event with hierarchical structure
export interface MenuSubgroup {
  subgroup: string;
  items: string[];
}

export interface MenuSection {
  category: string;
  items?: string[];
  subgroups?: MenuSubgroup[];
}

export const eventMenu: MenuSection[] = [
  {
    category: "Mocktails",
    items: [
      "Mojito", "Orange Martina", "Black Currant Shanshai", "Blue Ocean", "Cranberry", 
      "Strawberry Margerita", "Lychee Shanshai", "Rose Tender", "Jeera Cooler", "Kiwi Martina", 
      "Green Apple", "Khus Fantacy", "Blackberry", "Summer Cooler", "Rasberry Lemon", 
      "Margerita", "Blueberry Margerita", "Virgin Sangria", "Cranberry Mojito", "Lychee Panch", 
      "Lemon Jeera", "Rosemary", "Strawberry Summer Cooler", "Jeera Fantacy", "Orange Summer Cooler"
    ]
  },
  {
    category: "JUICES",
    items: [
      "World Vision", "Pahadi Juice", "Cindrella Juice", "Peru Plaza", "Fantasy", 
      "Orange Besil", "Kiwi Pineapple", "Ginger 2", "All rounder"
    ]
  },
  {
    category: "FL. Starter",
    items: [
      "Veg. Cigar Roll with Mayo Dips", "D Volvo", "Paneer Shashlik with Green Chutney", 
      "Cheese Paneer Ball with Mayo Dips"
    ]
  },
  {
    category: "Hot Appetizers",
    items: [
      "Khau Suey Soup with Siders", "Lemon Coriander Soup", "Manchow Soupm with Chop Suey", 
      "Ministrone Soup with Maccaroni"
    ]
  },
  {
    category: "Chaat Items",
    items: [
      "Tikki Based Chaat", "Dry Fruit Makhana Chaat", "Rasile Dahi Bhalle", 
      "Palak Patta Kurkure Chaat"
    ]
  },
  {
    category: "SOUTH INDIAN",
    items: [
      "Masala Dosa", "Maisur Masala Dosa", "Green Garlic Khakhra Dosa", "Gotala Paper Dosa", 
      "Cheese Palak Dosa", "Khakhra Dosa", "Jini Roll Dosa", "Schezwan Dosa", 
      "Methi Khakhra Dosa", "Dilkhush Dosa", "Chocalate Paper Dosa", "Pizza Paper Dosa"
    ]
  },
  {
    category: "Italian Items",
    items: [
      "Thin Crust Pizza", "Puff Pizza", "Panini Grill"
    ]
  },
  {
    category: "Sizzlers",
    items: [
      "Italian Veg. Sizzler", "Chinese Sizzler", "Veg. Crispy"
    ]
  },
  {
    category: "SALAD BAR",
    items: [
      "Sweet Pickle", "Limbu Pickle", "Mix Pickle", "Bombay Hot salad", "Green Salad", 
      "Cream Salad", "Russian Salad", "Macaroni Salad", "Onion & Lemon", "Kimchi Salad", 
      "Spicy Guava & Strawberry", "Cheese, Cherry, Pineapple"
    ]
  },
  {
    category: "Sweet Counter",
    subgroups: [
      {
        subgroup: "Liquid Sweets",
        items: [
          "Litchi Gulla", "Kesar Mataki (Basundi in Mataki)", "Coconut Tender in Kullad", 
          "Malai Chena Roll", "Red Valvet Basundi", "Mawa Badam"
        ]
      },
      {
        subgroup: "Hot Sweet",
        items: [
          "Live Dry Fruit Halwa", "Traditional Ghevar (Plain & Malai)", "Badam Barbeque", 
          "Malai Kesar Cham Cham (Bengoli)", "Kiwi Sandwich (Bengoli)", "Badam Pizza (Malai, Rose, Fruit)"
        ]
      }
    ]
  },
  {
    category: "Main Course",
    items: [
      "Paneer Pasanda", "Veg. Banjara", "Exotic Malai Veg.", "Paneer Lababdar", "Cheese Angoori"
    ]
  },
  {
    category: "Roti",
    items: [
      "Fulka Roti", "Tandoor Roti", "Baby Naan & Garlic Naan", "Lachha Paratha", 
      "Missi Roti", "Stuff Kulcha"
    ]
  },
  {
    category: "Dal & Rice",
    items: [
      "Dal Tadka with Jeera Coriander Rice", "Dal Makhani with Greecy Rice", 
      "Dum Biryani with Raita"
    ]
  },
  {
    category: "Dessert",
    subgroups: [
      {
        subgroup: "ice creams",
        items: [
          "Rajbhog Ice Cream", "Blue Diamond Ice Cream", "Golden Pearl Ice Cream", 
          "Almond Carnival Ice Cream", "Pistachio Ice Cream", "Belgiam Choclate Ice Cream"
        ]
      },
      {
        subgroup: "Live Kulfi",
        items: [
          "Jamun Flavour", "Rajbhog", "Mawa Malai"
        ]
      },
      {
        subgroup: "Roll Cuts",
        items: [
          "Raja Rani", "Afghan Cassata", "Two in One Cassata"
        ]
      },
      {
        subgroup: "Sandwich Ice Cream",
        items: [
          "Rajbhog", "Chocalate"
        ]
      }
    ]
  },
  {
    category: "Others",
    items: [
      "Roasted papad", "Mouth Freshner", "Water Bottle"
    ]
  }
];
