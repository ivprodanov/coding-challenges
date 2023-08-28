import fs from "fs";
import inquirer from "inquirer";

const mainMenu = async () => {
  const options = [
    { name: '1. Split array into chunks', value: 'opt1' },
    { name: '2. Find missing Elements in array', value: 'opt2' },
    { name: '3. Sort JSON object by values', value: 'opt3' },
    { name: 'Exit', value: 'exit' },
  ];

  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Please select a challenge:',
      choices: options,
    },
  ]);

  switch (choice) {
    case 'opt1':
      const { input } = await inquirer.prompt([
        {
          type: 'input',
          name: 'input',
          message: 'Enter an array:',
        },
      ]);
      splitArray(input)
      break;
    case 'opt2':
      const { filePath } = await inquirer.prompt([
        {
          type: 'input',
          name: 'filePath',
          message: 'Enter the path to the JSON file:',
        },
      ]);

      try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(jsonData);
        console.log(findMissing(parsedData))
      } catch (error) {
        console.error('Error reading or parsing the JSON file:', error.message);
      }
      break;
    case 'opt3':
      const { filePath2 } = await inquirer.prompt([
        {
          type: 'input',
          name: 'filePath2',
          message: 'Enter the path to the JSON file:',
        },
      ]);

      try {
        const jsonData = fs.readFileSync(filePath2, 'utf8');
        const parsedData = JSON.parse(jsonData);
        sortArray(parsedData)
      } catch (error) {
        console.error('Error reading or parsing the JSON file:', error.message);
      }
      break;
    case 'exit':
      console.log('Exiting the app.');
      break;
  }
};

mainMenu();

// First Challenge

const splitArray = (arr) => {
  let array = JSON.parse(arr)
  console.log(typeof array)
  let multiDimArray = [];
  if (array.length > 0) {
    for (let i = 0; i <= array.length; i += 3) {
      let arrayRow = array.slice(i, i + 3);
      multiDimArray.push(arrayRow);
    }
  } else {
    return array;
  }

  console.log(multiDimArray);
};


//   Second challenge

function findMissing(arr) {
  // let arrays = JSON.parse(arr)
  let arrays = arr
  const valueCounts = {};

  arrays.flat().forEach((value) => {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  });

  return Object.keys(valueCounts).filter(
    (value) => valueCounts[value] < arrays.length
  );
}

// Third challenge

const sortArray = (arr) => {
  let sortedArr = arr.sort(function (a, b) {
    return (
      a.customer_number.localeCompare(b.customer_number) ||
      b.invoice.number - a.invoice.number
    );
  });
  console.log(sortedArr);
};
