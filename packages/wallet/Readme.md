# @marlowe.io/wallet

This package provides functionality to work with a CIP30 wallet.

It has the following modules:

- api: provides an abstract interface to work with a wallet.
- browser: provides a browser implementation of the api using the [CIP30 specification](https://cips.cardano.org/cips/cip30/).
- nodejs: provides a server implementation of the api using [Lucid](https://github.com/spacebudz/lucid) (NOTE: the underlying library might be replaced in the future)
