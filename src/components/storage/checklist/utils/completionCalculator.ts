
export const calculateCompletionPercentage = (progress: {[key: string]: boolean | string}) => {
  const checkedCount = Object.entries(progress)
    .filter(([key, value]) => typeof value === 'boolean' && key !== 'activeTab')
    .filter(([_, value]) => value === true)
    .length;
    
  const totalCheckboxes = Object.entries(progress)
    .filter(([key, value]) => typeof value === 'boolean' && key !== 'activeTab')
    .length;
    
  const expectedTotalCheckboxes = 80;
  
  if (totalCheckboxes === 0) return 0;
  
  const denominator = Math.max(totalCheckboxes, expectedTotalCheckboxes);
  
  return Math.round((checkedCount / denominator) * 100);
};
