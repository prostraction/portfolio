let parseYear = (month) => {
    let year = (month/12|0)
    switch (year) {
        case 0:
            return ""
        case 1:
            return year + " год"
        case 2:
        case 3: 
        case 4: 
            return year + " года"
        default:
            return year + " лет"
    }
}
let parseMonth = (month) => {
    let monthDived = month - 12*(month/12|0)
    switch (monthDived) {
        case 0:
            return ""
        case 1: 
            return " " + monthDived + " месяц"
        case 2:
        case 3:
        case 4:
            return " " + monthDived + " месяца"
        default:
            return " " + monthDived + " месяцев"
    }
}
let jobs = []
let jobsCount = 2
jobs.push({begin: new Date(2021, 10, 1, 0, 0, 0, 0), end: new Date(2022, 5, 1, 0, 0, 0, 0)})
jobs.push({begin: new Date(2022, 8, 1, 0, 0, 0, 0), end: new Date()})
let intervalMonth = 0
for (let i = 0; i < jobsCount; i++) {
    let intervalYear = jobs[i].end.getFullYear() - jobs[i].begin.getFullYear()
    intervalMonth += (12*intervalYear) + jobs[i].end.getMonth() - jobs[i].begin.getMonth() + 1
}
document.write(parseYear(intervalMonth) + parseMonth(intervalMonth))