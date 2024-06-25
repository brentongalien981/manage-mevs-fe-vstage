import { faker } from "@faker-js/faker";
import My from "../../utils/My";
import { getRandomOrderStatus } from "../orders/ordersData";
import MyDateUtils from "../../utils/MyDateUtils";

export function generateDashboardOrdersData({ numItems, rangeStartDateStr, rangeEndDateStr }) {
  let data = [];
  rangeStartDateStr = rangeStartDateStr + "T00:00:00";
  rangeEndDateStr = rangeEndDateStr + "T23:59:59";

  for (let i = 0; i < numItems; i++) {

    data.push({
      totalAmount: My.generateRandomMoneyAmount(900, 150000),
      country: faker.location.country(),
      orderStatus: getRandomOrderStatus(),
      createdAt: MyDateUtils.generateRandomDateInRange(rangeStartDateStr, rangeEndDateStr)
    });
  }

  data = sortOrdersDataByCreatedAt(data);

  return data;
}

function sortOrdersDataByCreatedAt(ordersData) {
  return ordersData.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
}


// TODO: Modify the frequencies Monthly and Yearly to be more accurate.
export function prepareSortedOrdersDataByPeriodFrequency(sortedOrdersData, rangeStartDateStr, rangeEndDateStr, periodFrequency) {

  // Initialize the period start date.
  let periodStartDateStr = rangeStartDateStr;
  let periodStartDateTime = new Date(periodStartDateStr + "T00:00:00");

  // Initialize the period end date.
  let periodEndDateStr = "";
  let periodEndDateTime = getPeriodEndDate(periodStartDateStr, periodFrequency);

  // If the rangeEndDate ends earlier than the periodEndDateTime, set the periodEndDateTime to the rangeEndDateTime.
  let rangeEndDateTime = new Date(rangeEndDateStr + "T23:59:59");
  if (periodEndDateTime > rangeEndDateTime) {
    periodEndDateTime = rangeEndDateTime;
  }

  // Initialize the periodsData array.    
  let currentPeriodData = {
    startDateStr: MyDateUtils.getDateStringWithOffset(periodStartDateTime, 0),
    endDateStr: MyDateUtils.getDateStringWithOffset(periodEndDateTime, 0),
    totalAmount: 0.0,
    totalOrders: 0
  }

  sortedOrdersData = filterOutOrdersOutsideRange(sortedOrdersData, rangeStartDateStr, rangeEndDateStr);
  const allPeriodsData = []
  let indexCurrentOrder = 0;

  // Loop through by periods.
  while (true) {

    for (; indexCurrentOrder < sortedOrdersData.length;) {

      const order = sortedOrdersData[indexCurrentOrder];
      const orderDateTime = new Date(order.createdAt);

      // If current order is within the current period,
      if (isOrderDateWithinPeriod(orderDateTime, periodStartDateTime, periodEndDateTime)) {
        // then increment the totalAmount and totalOrders of the currentPeriodData.
        currentPeriodData.totalAmount += order.totalAmount;
        currentPeriodData.totalOrders++;
        indexCurrentOrder++;
      } else {
        // Otherwise, break out of the loop and move to the next period.
        break;
      }
    }

    // The moment the for loop breaks or ends, that means we have
    // finished processing all orders within the current period.
    // So, finalize the currentPeriodData and push it to the allPeriodsData array.
    allPeriodsData.push({ ...currentPeriodData });

    // If the periodEndDateTime is greater than or equal to the rangeEndDateTime,
    // then we have processed all orders within the range.
    if (periodEndDateTime >= rangeEndDateTime) {
      break;
    }


    // Set the next currentPeriodData.
    periodStartDateTime = MyDateUtils.getNewDate(periodStartDateTime, getNumDaysInPeriod(periodFrequency));
    periodEndDateTime = MyDateUtils.getNewDate(periodEndDateTime, getNumDaysInPeriod(periodFrequency));

    currentPeriodData = {
      startDateStr: MyDateUtils.getDateStringWithOffset(periodStartDateTime, 0),
      endDateStr: MyDateUtils.getDateStringWithOffset(periodEndDateTime, 0),
      totalAmount: 0.0,
      totalOrders: 0
    }

  }

  return allPeriodsData;
}

function filterOutOrdersOutsideRange(sortedOrdersData, rangeStartDateStr, rangeEndDateStr) {
  return sortedOrdersData.filter(order => {
    const orderDateTime = new Date(order.createdAt);
    const rangeStartDate = new Date(rangeStartDateStr + "T00:00:00");
    const rangeEndDate = new Date(rangeEndDateStr + "T23:59:59");
    return isOrderDateWithinPeriod(orderDateTime, rangeStartDate, rangeEndDate);
  });

}


function isOrderDateWithinPeriod(orderDate, periodStartDate, periodEndDate) {
  if (orderDate >= periodStartDate && orderDate <= periodEndDate) {
    return true;
  }
  return false;
}


export function getNumDaysInPeriod(periodFrequency) {
  let numDaysInPeriod = 0;

  switch (periodFrequency) {
    case "Daily":
      numDaysInPeriod = 1;
      break;
    case "Weekly":
      numDaysInPeriod = 7;
      break;
    case "Monthly":
      numDaysInPeriod = 30;
      break;
    case "Quarterly":
      numDaysInPeriod = 90;
      break;
    case "Yearly":
      numDaysInPeriod = 365;
      break;
    default:
      break;
  }

  return numDaysInPeriod;
}


function getPeriodEndDate(periodStartDateStr, periodFrequency) {

  const periodStartDate = new Date(periodStartDateStr + "T00:00:00");
  let periodEndDateStr = MyDateUtils.getDateStringWithOffset(periodStartDate, getNumDaysInPeriod(periodFrequency) - 1);

  return new Date(periodEndDateStr + "T23:59:59");
}