const organizedDataToDate = (data, toDateOrderA, toDateOrderB) => {
    return data.sort((a, b) => {
        let aOrder = new Date(a[toDateOrderA][toDateOrderB]).getTime();
        let bOrder = new Date(b[toDateOrderA][toDateOrderB]).getTime();

        return ((aOrder > bOrder) ? -1 : ((aOrder < bOrder) ? 1 : 0))
    })
}

module.exports = {
    organizedDataToDate
}