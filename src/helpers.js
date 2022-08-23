const FLHelpers = {
  toTwoDigits: (no) => {
    return no.toString().padStart(2, "0");
  },

  isValidNumber: (num) => {
    if (!num || isNaN(num)) {
      return false;
    }

    return true;
  },
};

export default FLHelpers;
