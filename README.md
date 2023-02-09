# RLP Encoded Transaction Generator

This tool is a wrapper on web3.js used to generate sample (mock) RLP encoded transactions. Will be helpful in testing functions which take RLP encoded transactions
as inputs.

The number of tranasactions you want must be passed as a command line argument.

A file consisting of the transactions will be created called `transactions-example-file.json`.

The field `rawTransaction` is the RLP encoded transaction.

## Understanding RLP Encodings

Here is a brilliant write-up on RLP encodings that you can read to understand RLP encoding (not decoding) in depth.

[Medium Article](https://medium.com/@markodayansa/a-comprehensive-guide-to-rlp-encoding-in-ethereum-6bd75c126de0)

## Example

<img width="1728" alt="Screenshot 2023-02-07 at 11 59 53 AM" src="https://user-images.githubusercontent.com/32522659/217166725-b4ec0a3f-2e5b-493d-92de-6ddda080213e.png">

<br />
<br />

<img width="1728" alt="Screenshot 2023-02-07 at 12 00 04 PM" src="https://user-images.githubusercontent.com/32522659/217166803-5fc0a29b-c298-41ad-9515-5bc04f2543c6.png">

## Decoder

A Handy tool to decode these RLP encoded transactions can be found [here](https://toolkit.abdk.consulting/ethereum#rlp)
