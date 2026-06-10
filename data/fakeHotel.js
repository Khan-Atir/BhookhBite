const hotelData = [

  {
    name: "Spice Hub",
    location: "Delhi",
    image: "http://images.unsplash.com/photo-1474899420076-a61e74989430?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,

    dishes: [
      {
        name: "Burger",
        price: 149,
        image: "https://plus.unsplash.com/premium_photo-1668025335051-98c22e32cbba?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Pizza",
        price: 299,
        image: "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Biryani",
        price: 249,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  },

  {
    name: "Food Castle",
    location: "Mumbai",
    image: "http://images.unsplash.com/photo-1474899420076-a61e74989430?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.2,

    dishes: [
      {
        name: "Momos",
        price: 129,
        image: "https://plus.unsplash.com/premium_photo-1673769108290-502f4663f233?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Burger",
        price: 169,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Pasta",
        price: 219,
        image: "https://plus.unsplash.com/premium_photo-1664472693779-c129e03c1a19?q=80&w=777&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  },

  {
    name: "Biryani House",
    location: "Hyderabad",
    image: "http://images.unsplash.com/photo-1474899420076-a61e74989430?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,

    dishes: [
      {
        name: "Biryani",
        price: 299,
        image: "https://images.unsplash.com/photo-1736680056325-ba2ade6250a3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Fried Rice",
        price: 199,
        image: "https://plus.unsplash.com/premium_photo-1694141252774-c937d97641da?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Rolls",
        price: 149,
        image: "https://images.unsplash.com/photo-1614846128869-5fc0a61d763b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  },

  {
    name: "Cheese Junction",
    location: "Bangalore",
    image: "http://images.unsplash.com/photo-1474899420076-a61e74989430?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.4,

    dishes: [
      {
        name: "Pizza",
        price: 349,
        image: "https://images.unsplash.com/photo-1669490883041-2d0ac48bc4c8?q=80&w=857&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Sandwich",
        price: 179,
        image: "https://images.unsplash.com/photo-1619096534329-564c333a95b3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Coffee",
        price: 99,
        image: "https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  },

  {
    name: "Momo Mania",
    location: "Darjeeling",
    image: "http://images.unsplash.com/photo-1474899420076-a61e74989430?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,

    dishes: [
      {
        name: "Momos",
        price: 139,
        image: "https://plus.unsplash.com/premium_photo-1671547329182-deaf1c94263e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Noodles",
        price: 189,
        image: "https://images.unsplash.com/photo-1671048116404-454fefede763?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        name: "Tea",
        price: 79,
        image: "https://images.unsplash.com/photo-1537286164997-b6a9bbac8b55?q=80&w=973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ]
  }

];

module.exports = hotelData;