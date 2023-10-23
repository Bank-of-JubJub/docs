# Bank of JubJub Contracts

## Verifiers

The base contract uses on 5 verifier contracts.

- ProcessDepositVerifier
- ProcessTransferVerifier
- TransferVerifier
- WithdrawVerifier
- LockVerifier

### ProcessDepositVerifier

Verifies that a deposit being added to the specified recipient is correctly added to the recipients' balance (checking correct homomorphic addition via Exponential ElGamal).

### ProcessTransferVerifier

Verifies that a batch of pending transfers are correctly added to the recipients' balance (checking correct homomorphic addition via Exponential ElGamal).

### TransferVerifier

Verifies that the sender has enough balance, and that their balance is properly updated, and the added pending transfer is correct.

### WithdrawVerifier

Verifies that the sender has enough balance and that their updated balance is correct.

### LockVerifier

Verifies that the relay fee is correctly debited from the senders' account.

## Bank Factory

The factory contract stores all of the deployed verifier contracts in storage. Pass an ERC20 token address to the `deploy` function to create a new Bank of JubJub contract for the specified token.

## Bank Base

This contract defines the logic of the Bank.

### Functions

- constructor
- deposit
- transfer
- withdraw
- processPendingDeposit
- processPendingTransfer
- lock
- unlock
