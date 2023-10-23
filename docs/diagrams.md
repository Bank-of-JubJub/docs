# User flow

## Deposit

Deposits are a 2 step process. Breaking deposits into two steps allows an account to receive multiple deposits simultaneously. If deposits were a single step, multiple people would not be able to deposit funds to the same Bank account at the same time. This is because two people cannot update the same encrypted balance at the same time--one will always fail.

<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
  <img src="/img/deposit-sequence.svg" alt="sequence" />
</div>

### User deposit

First, Alice must approve the Bank contract to draw funds from her corresponding ERC20 token contract balance. Then she calls the deposit function on the Bank contract and specifies the Bank account to deposit to. The Bank contract will pull the specified amount from the ERC20 contract and add a pending deposit to the Bank account and update the total supply in the Bank.

A depositor can specify a processing fee to incentivize the processing the second step of the deposit transaction. This makes it appear as though the transaction is a 1 step action. The processing fee can be omitted and the depositor or the recipient can complete the second step themselves.

### Process deposit

The process deposit function can be called by anyone. Anyone can create the proof of correctly updating Alice's encrypted balance--this is just homomorphic addition, all someone needs is the recipient's public key and the amounts to add.

The processor of this transaction will receive the fees specified in the deposit transaction.

## Transfer

<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
  <img src="/img/transfer-sequence.svg" alt="sequence" />
</div>

### User Transfer

TODO

### Process Transfer

TODO

## Withdraw

TODO

## Lock

TODO