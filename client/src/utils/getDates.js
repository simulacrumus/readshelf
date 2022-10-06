const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getDate = (date) => {
    return new Date(date).getDate().toString()
}

export const getMonthName = (date) => {
    return monthNames[new Date(date).getMonth()].toString()
}

export const getYear = (date) => {
    return new Date(date).getFullYear().toString()
}

export const getMonthAndYear = (date) => {
    return getMonthName(date).concat(', ').concat(getYear(date))
}

export const getFullDate = (date) => {
    return  getMonthName(date)
            .concat(' ')
            .concat(getDate(date))
            .concat(', ')
            .concat(getYear(date))
}