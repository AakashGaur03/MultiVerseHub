const getSidebarItems = () => {
  if (location.pathname.includes("/news")) {
    return [
      { title: "World", path: "/" },
      { title: "Business", path: "/business" },
      { title: "Sports", path: "/sports" },
      { title: "Entertainment", path: "/entertainment" },
      { title: "Education", path: "/education" },
      { title: "Technology", path: "/technology" },
    ];
  } else if (location.pathname.includes("/cricket")) {
    return [
      { title: "All", path: "/" },
      { title: "International", path: "/International" },
      { title: "League", path: "/League" },
      { title: "Domestic", path: "/Domestic" },
      { title: "Women", path: "/Women" },
      { title: "Rankings", path: "/Rankings" },
    ];
  } else if (location.pathname.includes("/entertainment")) {
    return [
      { title: "Movies", path: "/" },
      { title: "TV", path: "/tv" },
    ];
  } else if (location.pathname.includes("/favorites")) {
    return [
      { title: "All", path: "/" },
      { title: "Entertainment", path: "/entertainment" },
      { title: "Game", path: "/game" },
      { title: "News", path: "/news" },
      { title: "Cricket", path: "/cricket" },
      { title: "Word Of The Day", path: "/wotd" },
    ];
  }
  //  else if (location.pathname.includes("/games")) {
  //   return [
  //     { title: "Car", path: "/" },
  //     { title: "Bike", path: "/Bike" },
  //     { title: "Brain", path: "/Brain" },
  //     { title: "Truck", path: "/Truck" },
  //   ];
  // }
  else {
    return [];
  }
};

export { getSidebarItems };
