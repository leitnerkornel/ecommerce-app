export const addUniqueIds = (arrayOfObjects) => {
  return arrayOfObjects.map((obj, index) => {
    return { ...obj, id: index }
  })
}