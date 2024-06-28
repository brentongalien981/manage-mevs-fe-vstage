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


function getNewCurrentPeriodData(periodStartDateStr, rangeEndDateStr, periodFrequency) {

  let periodStartDateTime = new Date(periodStartDateStr + "T00:00:00");
  let periodEndDateTime = MyDateUtils.getPeriodEndDate(periodStartDateStr, periodFrequency);

  // If the rangeEndDate ends earlier than the periodEndDateTime, set the periodEndDateTime to the rangeEndDateTime.
  let rangeEndDateTime = new Date(rangeEndDateStr + "T23:59:59");
  if (periodEndDateTime > rangeEndDateTime) {
    periodEndDateTime = rangeEndDateTime;
  }

  return {
    startDate: periodStartDateTime,
    endDate: periodEndDateTime,
    totalAmount: 0.0,
    totalOrders: 0
  }
}


// TODO: Modify the frequencies: Monthly and Yearly to be more accurate.
export function prepareSortedOrdersDataByPeriodFrequency(sortedOrdersData, rangeStartDateStr, rangeEndDateStr, periodFrequency) {

  // Initialize the date range data.  
  let rangeEndDateTime = new Date(rangeEndDateStr + "T23:59:59");

  // Filter out orders outside the range.
  sortedOrdersData = filterOutOrdersOutsideRange(sortedOrdersData, rangeStartDateStr, rangeEndDateStr);

  // 
  const allPeriodsData = []
  let indexCurrentOrder = 0;
  let periodStartDateStr = rangeStartDateStr;

  // Loop through by periods like: Daily, Weekly, Monthly, Quarterly, or Yearly.
  while (true) {

    let newCurrentPeriodData = getNewCurrentPeriodData(periodStartDateStr, rangeEndDateStr, periodFrequency);

    for (; indexCurrentOrder < sortedOrdersData.length;) {

      const order = sortedOrdersData[indexCurrentOrder];
      const orderDateTime = new Date(order.createdAt);

      // If current order is within the current period,
      if (MyDateUtils.isDateWithinPeriod(orderDateTime, newCurrentPeriodData.startDate, newCurrentPeriodData.endDate)) {
        // then increment the totalAmount and totalOrders of the currentPeriodData.
        newCurrentPeriodData.totalAmount += order.totalAmount;
        newCurrentPeriodData.totalOrders++;
        indexCurrentOrder++;
      } else {
        // Otherwise, break out of the loop and move to the next period.
        break;
      }
    }

    // The moment the for loop breaks or ends, that means we have
    // finished processing all orders within the current period.
    // So, finalize the currentPeriodData and push it to the allPeriodsData array.
    allPeriodsData.push({ ...newCurrentPeriodData });

    // If the periodEndDateTime is greater than or equal to the rangeEndDateTime,
    // then we have processed all orders within the range.
    if (newCurrentPeriodData.endDate >= rangeEndDateTime) {
      break;
    }

    // Set the next periodDateStr.
    periodStartDateStr = MyDateUtils.getDateStringWithOffset(new Date(newCurrentPeriodData.startDate), MyDateUtils.getNumDaysInPeriod(periodFrequency));

  }

  return allPeriodsData;
}

function filterOutOrdersOutsideRange(sortedOrdersData, rangeStartDateStr, rangeEndDateStr) {
  return sortedOrdersData.filter(order => {
    const orderDateTime = new Date(order.createdAt);
    const rangeStartDate = new Date(rangeStartDateStr + "T00:00:00");
    const rangeEndDate = new Date(rangeEndDateStr + "T23:59:59");
    return MyDateUtils.isDateWithinPeriod(orderDateTime, rangeStartDate, rangeEndDate);
  });
}