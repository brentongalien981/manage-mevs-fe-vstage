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
      currentRangeValue: totalSalesForCurrentDateRange,
      previousRangeValue: totalSalesForPreviousDateRange,
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
      growthRatePercentage: calculateRoRGrowthRatePercentage(
        numOfProcessingOrderForCurrentRange,
        numOfProcessingOrderForPreviousRange
      ),
    },
  ];

  return stats;
}