export const paginate = (items, currentPage, pageSize) => {
    const lastIncludedItem = currentPage * pageSize
    return items.slice(lastIncludedItem - pageSize, lastIncludedItem)
}
 
