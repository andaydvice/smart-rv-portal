
/**
 * Updates print-specific attributes for all checkboxes in the DOM
 * @param progress The progress object containing checkbox states
 */
export const updateCheckboxPrintAttributes = (progress: {[key: string]: boolean | string}) => {
  setTimeout(() => {
    const checkboxes = document.querySelectorAll('[role="checkbox"]');
    checkboxes.forEach(checkbox => {
      const id = checkbox.getAttribute('id');
      if (id && progress[id] !== undefined) {
        const isChecked = !!progress[id];
        checkbox.setAttribute('data-print-checked', isChecked ? 'true' : 'false');
        checkbox.setAttribute('aria-checked', isChecked ? 'true' : 'false');
        checkbox.setAttribute('data-state', isChecked ? 'checked' : 'unchecked');
      }
    });
  }, 100);
};
