import moment from "moment/moment";


export const validateFullName = (name) => {
  if (!name) return "Fullname required";
  if (name.length < 3) return "Must be at least 3 characters";
  if (name.length > 30) return "Cannot exceed 30 characters";
  if (/^\s|\s$/.test(name)) return "No extra spaces allowed";
  if (/\s{2,}/.test(name)) return "Multiple spaces not allowed";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Only alphabets & spaces allowed";
  return ""; 
};

     
export const validateEmail = (email) => {
  if (!email) return "Email required";

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Enter a valid email";

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password required";

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!regex.test(password)) {
    return "Password must be at least 6 characters";
  }

  return ""; 
};

 

 export const getInitials = (name) => {
    if(!name) return "";

    const words = name.split("");
    let initials = "";
    for (let i =0; i <Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
 };


 export const addThousandSeperator = (num) => {
    if (num == null || isNaN(num)) return "";
    
    const [integerPart, fractionPart] = num.toString().split(".");
    
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return fractionPart 
      ? `${formattedInteger}.${fractionPart}` 
      : formattedInteger;
  };
  
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => {
    const date = new Date(item.date); // assuming you have `date` in each item
    const monthDay = `${date.getMonth() + 1}/${date.getDate()}`; // e.g., "8/26"

    return {
      month: monthDay,
      category: item?.category,
      amount: item?.amount,
    };
  });
};



export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => {
    const month = item.date
      ? new Date(item.date).toLocaleString("default", { month: "short" })
      : item.source;

    return {
      month,
      amount: item?.amount,
      category: item?.source,
    };
  });

  return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    category: item?.category,
    amount: item?.amount
  }));

  return chartData;
};

