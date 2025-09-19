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
      "Mojito", "Orange Martini", "Black Currant Shanghai", "Blue Ocean", "Cranberry", 
      "Strawberry Margarita", "Lychee Shanghai", "Rose Tender", "Jeera Cooler", "Kiwi Martini", 
      "Green Apple", "Khus Fantasy", "Blackberry", "Summer Cooler", "Raspberry Lemon", 
      "Margarita", "Blueberry Margarita", "Virgin Sangria", "Cranberry Mojito", "Lychee Punch", 
      "Lemon Jeera", "Rosemary", "Strawberry Summer Cooler", "Jeera Fantasy", "Orange Summer Cooler"
    ]
  },
  {
    category: "Juices",
    items: [
      "World Vision", "Pahadi Juice", "Cinderella Juice", "Peru Plaza", "Fantasy", 
      "Orange Basil", "Kiwi Pineapple", "Ginger Juice", "All-rounder"
    ]
  },
  {
    category: "Floating Starters",
    items: [
      "Veg. Cigar Roll with Mayo Dips", "D Volvo", "Paneer Shashlik with Green Chutney", 
      "Cheese Paneer Ball with Mayo Dips"
    ]
  },
  {
    category: "Hot Appetizers",
    items: [
      "Khau Suey Soup with Sides", "Lemon Coriander Soup", "Manchow Soup with Chop Suey", 
      "Minestrone Soup with Macaroni"
    ]
  },
  {
    category: "Chaat Items",
    items: [
      "Vrindavan tikki Chaat", "Dry Fruit Makhana Chaat", "Rassile Dahi Bhalla", 
      "Palak Patta Kurkure Chaat"
    ]
  },
  {
    category: "South Indian",
    items: [
      "Masala Dosa", "Mysore Masala Dosa", "Green Garlic Khakhra Dosa", "Ghotala Paper Dosa", 
      "Cheese Palak Dosa", "Khakhra Dosa", "Jini Roll Dosa", "Schezwan Dosa", 
      "Methi Khakhra Dosa", "Dilkhush Dosa", "Chocolate Paper Dosa", "Pizza Paper Dosa"
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
    category: "Salad Bar",
    items: [
      "Sweet Pickle", "Nimbu Pickle", "Mixed Pickle", "Bombay Hot Salad", "Green Salad", 
      "Cream Salad", "Russian Salad", "Macaroni Salad", "Onion & Lemon", "Kimchi Salad", 
      "Spicy Guava & Strawberry", "Cheese, Cherry & Pineapple", "Italian Beans Salad"
    ]
  },
  {
    category: "Sweet Counter",
    subgroups: [
      {
        subgroup: "Liquid Sweets",
        items: [
          "Litchi Gulla", "Kesar Matki", "Coconut Tender in Kullad", 
          "Malai Chena Roll", "Red Velvet Basundi", "Mawa Badam"
        ]
      },
      {
        subgroup: "Hot Sweet",
        items: [
          "Live Dry Fruit Halwa", "Traditional Ghevar (Plain & Malai)", "Badam Barbeque", 
          "Malai Kesar Cham Cham", "Kiwi Sandwich", "Badam Pizza (Malai, Rose, Fruit)"
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
      "Phulka Roti", "Tandoori Roti", "Baby Naan & Garlic Naan", "Lachha Paratha", 
      "Missi Roti", "Stuffed Kulcha"
    ]
  },
  {
    category: "Dal & Rice",
    items: [
      "Dal Tadka with Jeera Coriander Rice", "Dal Makhani with Greasy Rice", 
      "Dum Biryani with Raita", "Handi Dal Rice"
    ]
  },
  {
    category: "Dessert",
    subgroups: [
      {
        subgroup: "Ice-Creams",
        items: [
          "Rajbhog Ice-Cream", "Blue Diamond Ice-Cream", "Golden Pearl Ice-Cream", 
          "Almond Carnival Ice-Cream", "Pistachio Ice-Cream", "Belgian Chocolate Ice-Cream"
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
          "Raja Rani", "Afghan Cassata", "Two-in-One Cassata"
        ]
      },
      {
        subgroup: "Sandwich Ice-Cream",
        items: [
          "Rajbhog", "Chocolate"
        ]
      },
      {
        subgroup: "Fresh Fruit Ice-Cream with Doughnut",
        items: [
          "Customizable"
        ]
      }
    ]
  },
  {
    category: "Others",
    items: [
      "Mouth Freshener", "Roasted Papad", "Water Bottle"
    ]
  }
];
