export const handleLikeOperation = async ({
  category,
  itemData,
  favSectionDataAll,
  setLikedItems,
  dispatch,
  addFavSection,
  removeFavSection,
}) => {
  console.log(itemData, "itemDataitemData");
  console.log(favSectionDataAll, "favSectionDataAllfavSectionDataAll");
  const itemId = itemData.id; // Change this according to how your data is structured
  // Check if the item is already liked based on the category
  const isLiked = favSectionDataAll[category]?.some((favItem) => {
    console.log(favItem, "favItemfavItem");
    console.log(category, "categorycategory");
    console.log(itemId, "itemIditemId");
    return favItem[`${category}Id`] == itemId;
  });
  console.log(isLiked, "isLikedisLiked");

  try {
    if (isLiked) {
      // Find the item to be removed based on category and itemId
      const favItem = favSectionDataAll[category].find((favItem) => favItem[`${category}Id`] == itemId);
      console.log(favItem, "favItemfavItemfavItem");
      if (favItem) {
        const payload = { category, itemId: favItem._id };
        console.log(payload, "payloadpayloadpayload");
        await dispatch(removeFavSection(payload));

        // Update the liked items state
        setLikedItems((prevLikedItems) => {
          const updatedLikedItems = { ...prevLikedItems };
          delete updatedLikedItems[`${category}-${itemId}`];
          return updatedLikedItems;
        });
      }
    } else {
      // Prepare the payload based on the category and item data
      const payload = {
        category,
        data: {
          [`${category}Id`]: itemData.id, // Dynamic key for each category
          ...itemData, // Spread other necessary properties like title, thumbnail, etc.
        },
      };
      await dispatch(addFavSection(payload));

      // Update the liked items state
      setLikedItems((prevLikedItems) => ({
        ...prevLikedItems,
        [`${category}-${itemId}`]: true,
      }));
    }
  } catch (error) {
    console.error(`Error handling like click for ${category}:`, error);
  }
};
