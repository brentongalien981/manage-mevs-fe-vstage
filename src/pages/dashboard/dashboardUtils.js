import MyDateUtils from "../../utils/MyDateUtils";

export function calculateTotalAmountForOrdersData(ordersData) {
  return ordersData.reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);
}


export function calculateRoRGrowthRatePercentage(currentRangeStat, previousRangeStat) {
  if (previousRangeStat === 0) { return 0; };
  const growthRate = ((currentRangeStat - previousRangeStat) / previousRangeStat) * 100;
  return growthRate;
}


export function getNumOfProcessingOrders(ordersData) {
  return ordersData.filter((order) => order.statusName === "ORDER_PROCESSING").length;
}


// Format number to add commas as thousand separators.
export function formatNumberWithCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function extractDashboardStats(ordersDataForCurrentDateRange, ordersDataForPreviousDateRange) {
  const totalSalesForCurrentDateRange = calculateTotalAmountForOrdersData(
    ordersDataForCurrentDateRange
  );
  const totalSalesForPreviousDateRange = calculateTotalAmountForOrdersData(
    ordersDataForPreviousDateRange
  );

  const numOfProcessingOrderForCurrentRange = getNumOfProcessingOrders(
    ordersDataForCurrentDateRange
  );
  const numOfProcessingOrderForPreviousRange = getNumOfProcessingOrders(
    ordersDataForPreviousDateRange
  );

  const stats = [
    {
      name: "totalSales",
      label: "Total Sales",
      currency: "$",
      unit: "",
      currentRangeValue: (Math.round(totalSalesForCurrentDateRange * 100) / 100),
      previousRangeValue: (Math.round(totalSalesForPreviousDateRange * 100) / 100),
      growthRatePercentage: calculateRoRGrowthRatePercentage(
        totalSalesForCurrentDateRange,
        totalSalesForPreviousDateRange
      ),
    },
    {
      name: "totalOrders",
      label: "Total Orders",
      currency: "",
      unit: "units",
      currentRangeValue: ordersDataForCurrentDateRange.length,
      previousRangeValue: ordersDataForPreviousDateRange.length,
      growthRatePercentage: calculateRoRGrowthRatePercentage(
        ordersDataForCurrentDateRange.length,
        ordersDataForPreviousDateRange.length
      ),
    },
    {
      name: "processingOrders",
      label: "Processing Orders",
      currency: "",
      unit: "units",
      currentRangeValue: numOfProcessingOrderForCurrentRange,
      previousRangeValue: numOfProcessingOrderForPreviousRange,
      growthRatePercentage: 0 // Force to 0 to not show growth rate for this stat.
    },
  ];

  return stats;
}


/**
 * Extract the previous range date strings based on current date strings
 * For example, if the current range is from 2021-01-01 to 2021-12-31,
 * the previous range will be from 2020-01-01 to 2020-12-31.
 * Also, if the current range is from 2020-01-01 to 2023-11-20 (which is almost 4 years),
 * the previous range will be from 2016-01-01 to 2019-11-20.
 * @param {string} rangeStartDateStr 
 * @param {string} rangeEndDateStr 
 * @returns {{previousRangeStartDateStr: string, previousRangeEndDateStr: string}}
 */
export function extractPreviousRangeDateStrings(rangeStartDateStr, rangeEndDateStr) {

  const numDaysBetweenRange = MyDateUtils.getNumDayBetweenDates(
    rangeStartDateStr,
    rangeEndDateStr
  );
  const numYearsBetweenRange = Math.ceil(
    numDaysBetweenRange / MyDateUtils.getNumDaysInPeriod("Yearly")
  );
  const numDaysToGoBack =
    -1 * numYearsBetweenRange * MyDateUtils.getNumDaysInPeriod("Yearly");

  const previousRangeStartDateStr = MyDateUtils.getDateStringWithOffset(
    new Date(rangeStartDateStr),
    numDaysToGoBack
  );
  const previousRangeEndDateStr = MyDateUtils.getDateStringWithOffset(
    new Date(rangeEndDateStr),
    numDaysToGoBack
  );

  return {
    previousRangeStartDateStr,
    previousRangeEndDateStr
  };
}


export function prepareTopSalesDataByCountry(ordersData) {

  // Sales data for a country will have the following structure:
  // { country: "USA", totalAmount: 1000.0, totalOrders: 10 }
  const salesDataByCountries = [];

  ordersData.forEach((order) => {

    let existingSalesDataForCountry = null;

    // Check if sales data for the country already exists.
    for (const salesDataForCountry of salesDataByCountries) {
      if (salesDataForCountry.country === order.country) {
        existingSalesDataForCountry = salesDataForCountry;
        break;
      }
    }

    // If sales data for the country already exists, update the total amount and total orders.
    if (existingSalesDataForCountry) {
      existingSalesDataForCountry.totalAmount += order.totalAmount;
      existingSalesDataForCountry.totalOrders += 1;
    } else {
      // If sales data for the country does not exist, create a new entry.
      salesDataByCountries.push({
        country: order.country,
        totalAmount: order.totalAmount,
        totalOrders: 1
      });
    }

  });

  // Sort the sales data by total amount in descending order.
  salesDataByCountries.sort((a, b) => b.totalAmount - a.totalAmount);

  return salesDataByCountries;

}