import { formatCurrency } from "../../../Scripts/Utils/money.js";

// automated test is basically using code to test code

// a group of related tests is called a test suite
console.log(`test suite: formatCurrency`)


console.log(`converts cents into dollars`);

if(formatCurrency(2095) === '20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log(`works with 0`)

if (formatCurrency (0) === '0.00'){
  console.log(`passed`);
}else {
  console.log(`failed`)
}


console.log(`rounds up to the nearest cent`)
if(formatCurrency(2000.5) === '20.01' ){
  console.log(`passed`);
}
else{
  console.log(`failed`)
}

if (formatCurrency(2000.4) === `20.00`){
  console.log(`passed`);
} else{
  console.log(`failed`)
}

