---
sidebar_position: 1
---

# Bank of JubJub

## What is Bank of JubJub?

Token wrapper for private balances and transfers using zkSNARKs and Homomorphic Encryption, inspired by [Zeestar](https://files.sri.inf.ethz.ch/website/papers/sp22-zeestar.pdf) and [Zether](https://crypto.stanford.edu/~buenz/papers/zether.pdf), implemented in [Noir](https://noir-lang.org/) (and Rust).

## Quick description

This project is an implementation of a token wrapper on Ethereum with private balances, i.e all the balances are publicly stored on the Ethereum blockchain in an encrypted format, but only the owner of the associated private key is able to decrypt their own balance. This is possible thanks to the improved expressiveness allowed by homomorphic encryption on top of zkSNARKs, allowing a party **A** to compute over encrypted data owned by *another* party **B** i.e **A** can add encrypted balances owned by **B** without needing any knowledge of those balances.

Pros:

- Transfer amounts are encrypted
- Bank of JubJub can be used with any erc20 token
- Fund masking pool, similar to [Privacy Pools](https://www.privacypools.com/), but not restricted to fixed deposit amounts. All users can participate in the same pool with arbitrary deposit amounts because amounts are encrypted.
- Bank accounts are optionally decoupled from eth accounts. Users can register an Ethereum account as a signer for increased security.
- Users can set up a multisig in the system, so multiple ethereum signatures are required to initiate actions. 
- Can be used with something like [stealth addresses](https://vitalik.ca/general/2023/01/20/stealth.html) to make single use addresses easy and more private
- Auditable. Everyone can see the interaction history, tracing back to deposits into the contract. If users receive tainted funds, they can burn them and can generate proofs of burn for that amount.
- Users can submit proofs to a relayer network to post transactions for them, so they don't doxx themselves by using a funded Ethereum account. This requires adding a fee.
- Option to provide a relayer fee, paid from the encrypted amount, that incentivizes any third-party to submit  transactions on behalf of the user--this helps maintain anonymity
- It's relatively expensive, ~500k gas for proof verification. Can be used more cheaply on any EVM L2.
- The Bank protocol can be extended with additional contracts by locking accounts to the contract. The contract that an account is locked to can conditionally use an account's funds. A user can lock their funds in a contract and the contract only unlocks them after some condition is met (ie with a zk proof of something). Some things you could build with this:
  - A sealed bid auction.
  - Private, p2p trustless exchange (something like [zkp2p](https://zkp2p.xyz/), but with amounts hidden)
  - Private token swaps between different wrapped tokens
  - Credit to [Zether](https://crypto.stanford.edu/~buenz/papers/zether.pdf) for this idea

Cons:

- Users have to use a new private key for decryption. The pain can be mitigated by generating a key from an ethereum signature, like zk.money or [umbra](https://app.umbra.cash/faq#how-does-it-work-technical). Users can register ethereum accounts to act a signers or set up a multisig.
- Deposits and transfers are a 2 step process. This allows multiple people to send the same account funds in the same block, but requires a processing step. Senders can incentivize the process of this step so it still feels like a 1 step process to users.
- limit of ~1 trillion tokens per contract (~11 billion if using 2 decimals). This limit can be raised, but requires additional research.

## Further Reading

Review the user flow on the sequence diagram [here](diagrams.md).
