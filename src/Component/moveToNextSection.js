const obj = {
  "5": [2, 1, 3, 8, 9, 10, 11],
  "6": [4, 5],
  "7": [13],
};

export const goNext = (catId, subCatId) => {
  let newCatId = catId;
  let newSubCatId = subCatId;

  if (obj.hasOwnProperty(catId)) {
    const subCategories = obj[catId];
    const index = subCategories.indexOf(subCatId);

    if (index !== -1 && index < subCategories.length - 1) {
      newSubCatId = subCategories[index + 1];
    } else {
      const catIds = Object.keys(obj);
      const catIndex = catIds.indexOf(catId);

      if (catIndex !== -1 && catIndex < catIds.length - 1) {
        newCatId = catIds[catIndex + 1];
        newSubCatId = obj[newCatId][0]; 
      }
    }
  }

  return [newCatId, newSubCatId];
};

export const goBack = (catId, subCatId) => {
let newCatId = catId;
let newSubCatId = subCatId;

if (obj.hasOwnProperty(catId)) {
  const subCategories = obj[catId];
  const index = subCategories.indexOf(subCatId);

  if (index !== -1 && index > 0) {
    newSubCatId = subCategories[index - 1];
  } else {
    const catIds = Object.keys(obj);
    const catIndex = catIds.indexOf(catId);

    if (catIndex !== -1 && catIndex > 0) {
      newCatId = catIds[catIndex - 1];
      newSubCatId = obj[newCatId][obj[newCatId].length - 1];
    }
  }
}

return [newCatId, newSubCatId];
};
