export const updatedPoint = (
    updatedEventType,
    updatedCity,
    updatedDate,
    updatedOffers,
    updatedPictures,
    updatedDescription,
    updatedPrice,
    updatedDuration,
    updatedIsFavourite,
    updatedId) => {
  const newEvent = {
    eventType: updatedEventType,
    city: updatedCity,
    date: updatedDate,
    offers: updatedOffers,
    pictures: updatedPictures,
    description: updatedDescription,
    price: updatedPrice,
    duration: updatedDuration,
    isFavourite: updatedIsFavourite,
    id: updatedId
  };

  return newEvent;
};
