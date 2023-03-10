let fs = require('fs');
require('dotenv').config();

let Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_GOERLI_ENDPOINT));

////////////////////////////
// Global Constants
////////////////////////////
let accountsList = [];

let rlpTxnsList = [];
let rlpTxnsSenderList = [];
let rlpTxnDataList = [];
let rlpTxnDataLengthList = [];

let upperTransactionLimit = web3.utils.toWei('1000', 'ether');
let lowerTransactionLimit = web3.utils.toWei('1', 'ether');
let upperGasSpendLimit = lowerTransactionLimit;
let lowerGasSpendLimit = 1000;

//////////////////////////////
// Utility Functions
//////////////////////////////
function generateRandomString(myLength) {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );
  
    const randomString = randomArray.join("");
    return randomString;
};

function generateRandomInteger(lowerValue, upperValue) {
    let randomInteger = Math.floor(Math.random() * (upperValue - lowerValue)) + lowerValue;
    return randomInteger;
}

function createAccount(randomString) {
    if(randomString.length == 0) {
        randomString = generateRandomString(50);
    }

    let newAccount = web3.eth.accounts.create(randomString);
    accountsList.push(newAccount);
    
    return newAccount;
}

function viewAccountsList() {
    const numAccounts = accountsList.length;
    console.log("Num Accounts", numAccounts);

    for(let i = 0; i < numAccounts; i++) {
        console.log(accountsList[i]);
    }
}

function writeTransactionsToFile() {
    fs.writeFile(
        './outputs/transactions-example-file.json', 
        JSON.stringify(rlpTxnsList), 
        function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("RLP Encoded Transactions list file was created");
        }
    ); 

    fs.writeFile(
        './outputs/transactions-senders-example-file.json',
        JSON.stringify(rlpTxnsSenderList),
        function (err) {
            if(err) {
                return console.log(err);
            } 
            console.log("RLP Encoded transactions' senders file was created");
        }
    );

    fs.writeFile(
        './outputs/transactions-data-example-file.json',
        JSON.stringify(rlpTxnDataList),
        function (err) {
            if(err) {
                return console.log(err);
            } 
            console.log("RLP Encoded transactions' data file was created");
        }
    );

    fs.writeFile(
        './outputs/transactions-dataLength-example-file.json',
        JSON.stringify(rlpTxnDataLengthList),
        function (err) {
            if(err) {
                return console.log(err);
            } 
            console.log("RLP Encoded transactions' data length?? file was created");
        }
    );
}

//////////////////////////////////////
// Main Function
//////////////////////////////////////

async function generateRLPEncodedTransactions() {
    let numTransactions = process.argv.slice(2);
    if(numTransactions.length != 0 &&
        Number.isInteger(parseInt(numTransactions[0])) &&
        parseInt(numTransactions[0]) > 0
    ) {
        numTransactions = parseInt(numTransactions[0]);
    } else {
        numTransactions = 5; //default to 5 transactions
    }

    // Let's create a few accounts
    let numAccounts = 2 * numTransactions;
    for(let i = 0; i < numAccounts; i++) {
        createAccount("");
    }

    // Viewing the created accounts. Can be commented out later.
    // viewAccountsList();

    // Sign transactions so that RLP encoded transactions can be returned
    let txnValue = generateRandomInteger(lowerTransactionLimit, upperTransactionLimit);
    let gasValue = generateRandomInteger(lowerGasSpendLimit, upperGasSpendLimit);
    let randomStringLength = generateRandomInteger(0, 500);
    let hexedData = web3.utils.toHex(generateRandomString(randomStringLength));

    for(let i = 0; i < numTransactions; i++) {
        let rlpEncodedTxn = await web3.eth.accounts.signTransaction({
            to: accountsList[i].address,
            value: txnValue.toString(),
            gas: gasValue,
            data: hexedData
        }, accountsList[(numAccounts - 1) - i].privateKey);

        rlpTxnDataList.push(hexedData);
        rlpTxnDataLengthList.push(hexedData.length);

        txnValue = generateRandomInteger(lowerTransactionLimit, upperTransactionLimit);
        gasValue = generateRandomInteger(lowerGasSpendLimit, upperGasSpendLimit);
        randomStringLength = generateRandomInteger(0, 500);
        hexedData = web3.utils.toHex(generateRandomString(randomStringLength));
        
        // Pushing required data to different arrays
        rlpTxnsList.push(rlpEncodedTxn.rawTransaction);
        rlpTxnsSenderList.push(accountsList[(numAccounts - 1) - i].address);
    }

    writeTransactionsToFile();
}


// Calling the main function. Called when you navigate to this directory and run node index.js {some +ve integer}
generateRLPEncodedTransactions();