const fakeData = [
  {
    name: "Burger",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Pizza",
    image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=886&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Biryani",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=888&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Momos",
    image: "https://plus.unsplash.com/premium_photo-1671547329182-deaf1c94263e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Pasta",
    image: "https://media.istockphoto.com/id/2157178537/photo/italian-pasta-on-plate-on-grey-wooden-background.jpg?s=612x612&w=is&k=20&c=lcSJyUL4bdUSPLTO2AmgCKtQanNx1sA-xLY5vLg0z3A="
  },
  {
    name: "Fried Rice",
    image: "https://images.unsplash.com/photo-1723691802798-fa6efc67b2c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Noodles",
    image: "https://images.unsplash.com/photo-1723691802798-fa6efc67b2c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Sandwich",
    image: "https://images.unsplash.com/photo-1750029485051-ba27b1cf667f?q=80&w=808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Rolls",
    image: "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Paneer Tikka",
    image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Dosa",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Idli",
    image: "https://media.istockphoto.com/id/1303091964/photo/delicious-idly-south-indian-foods-background.jpg?s=612x612&w=is&k=20&c=iOke1rHU7brG47Vv2wG669VIxUSueNjZQrJxwgUpEgE="
  },
  {
    name: "Chowmein",
    image: "https://images.unsplash.com/photo-1585503913867-f3382c5d1122?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Ice Cream",
    image: "https://media.istockphoto.com/id/1075752282/photo/vanilla-ice-cream-in-a-waffle-cone-bowl-on-a-pink-background.jpg?s=612x612&w=is&k=20&c=RVxrCEMwL081JB1NZyMd_XwiFdWTK6w9kFRsgSoRWFg="
  },
  {
    name: "Cake",
    image: "https://plus.unsplash.com/premium_photo-1717016931757-efbc303fa79f?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Pastry",
    image: "https://images.unsplash.com/photo-1612366747681-e4ca6992b1e9?q=80&w=804&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Coffee",
    image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Tea",
    image: "https://media.istockphoto.com/id/1455342393/photo/cup-of-cappuccino-with-latte-art.jpg?s=612x612&w=is&k=20&c=oUVdtHia6BYgANIIKdK0w85tQRyyt9gF5b37Mc6vJL0="
  },
  {
    name: "Milkshake",
    image: "https://media.istockphoto.com/id/1279983168/photo/strawberry-making-a-splash-on-strawberry-juice-in-a-glass-on-wood-with-strawberries-around.jpg?s=612x612&w=is&k=20&c=Xg6JeC2quMXZpCVS_KI6BWMdUAnolU2AIcP7vNDyNkc="
  },
  {
    name: "Lassi",
    image: "https://plus.unsplash.com/premium_photo-1681826703384-59bc4cb96d8c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

module.exports = fakeData;