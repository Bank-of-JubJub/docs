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

Alice can either send a transfer proof directly to the Bank contract, or optionally send it to a relayer. Alice might want to send the proof to relayer, and have them send the proof to the Bank contract, so that Alice doens't have to use one of her Ethereum accounts to send a transaction, as this could leak information about her identity (that Ethereum account needs to be funded to pay transaction fees). If Alice uses a relayer, her transfer proof must account for the `relayerFee` that will be sent to the relayer.

The transfer proof is sent to the Bank contract and the transfer is added to the recipient's pending transfers.

### Process Transfer

The process transfer function can be called by anyone. Anyone can create the proof of correctly updating Alice's balance, this is just encrypted homomorphic addition, just like with the process deposit step.

The processor of this transaction will receive the fees specified in the transfer transaction.

## Withdraw

<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
  <img src="/img/withdraw-sequence.svg" alt="sequence" />
</div>

Withdrawals are a 1 step transaction. Alice can optionally use a relayer, just like with the transfer function.

The withdraw function will update the users balance in the contract, send the specified amount of the ERC20 token to the provided Ethereum account and send the relay fee to the relayer if appropriate.

## Lock

<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
  <img src="/img/lock-sequence.svg" alt="sequence" />
</div>

Locking an account to an extension contract gives control over to the extension contract until the extension calls the `unlock` function on the Bank contract. Users must ensure that they only lock to extensions that properly implement unlocking functionality, otherwise their funds in the Bank could be locked forever.

Lock proofs can be optionally sent to a relayer. The lock proof specifies an address of an extension contract to lock to. The relay fee is debited from Alice's account if appropriate.

## Example Extension (Auction)

<div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
  <img src="/img/auction-sequence.svg" alt="sequence" />
</div>

This outlines the flow of interacting with an extension contract that Alice has already locked her account to. She can optionally use a relayer, provided the Auction contract has implemented relay functionality. When Alice calls `bid(amt)`, the auction contract will hold her transfer proof until the auction is over. Alice cannot transfer or withdraw funds from the Bank until the Auction contract unlocks it. Alice can use an account specifically for the Auction so not all of her funds are locked during the auction.

Once the bidding period is over, Alice can choose to reveal her bid. If another bid is higher, she may choose not to reveal. After a reveal period, the Auction contract will send the item to the specified recipient and send the transfer proof from the `bid(amt)` step to the Bank contract to debit Alice's balance. It will also unlock Alice's account so she can use it normally.

Other auction participants may need to call the Auction contract to unlock their accounts (depends on how it's actually implemented).
