
function createEmployeeRecord(array){
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
}

function createEmployeeRecords(array){
  const employeeRecords = []
  for(const nestedArray of array){
    employeeRecords.push(createEmployeeRecord(nestedArray))
  }
  return employeeRecords
}

function createTimeInEvent(recordObj, dateTime){
  const newDates = dateTime.split(' ')
  const dateHour = parseInt(newDates[1],10)
  const timeInEvent = {
    type: 'TimeIn',
    hour: dateHour,
    date: newDates[0]
  }
  recordObj.timeInEvents.push(timeInEvent)
  return recordObj
}

function createTimeOutEvent(recordObj,dateTime){
  const newDates = dateTime.split(' ')
  const dateHour = parseInt(newDates[1],10)
  const timeOutEvent = {
    type: 'TimeOut',
    hour: dateHour,
    date: newDates[0]
  }
  recordObj.timeOutEvents.push(timeOutEvent)
  return recordObj
}



// function hoursWorkedOnDate(recordObj,date){
//   if(recordObj.timeInEvents[0].date === date){
//     const hoursWorked = (recordObj.timeOutEvents[0].hour - recordObj.timeInEvents[0].hour)
//     return hoursWorked / 100
//   }
// }

function hoursWorkedOnDate(recordObj, date){
  const timeIn = recordObj.timeInEvents.find(event => event.date === date)
  const timeOut = recordObj.timeOutEvents.find(event => event.date === date)
  const hoursWorked = timeOut.hour - timeIn.hour

  return hoursWorked / 100
}

function wagesEarnedOnDate(recordObj,date){
  const hours = hoursWorkedOnDate(recordObj,date)
  const rate = recordObj.payPerHour
  return rate * hours
}

function allWagesFor(recordObj){
  const eligableDates = recordObj.timeInEvents.map(e => {
    return e.date
  })
  let allMoney = 0 
  for(const date of eligableDates){
    allMoney += wagesEarnedOnDate(recordObj, date)
  }
return allMoney
}

function calculatePayroll(recordArray){
  let grandTotalOwed = 0
  for(const recordObj of recordArray){
    grandTotalOwed += allWagesFor(recordObj)
  }
  return grandTotalOwed
}