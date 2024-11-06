export { Block } from "./block/index.js"
export {
    Tx,
    TxInput,
    TxOutput,
    decodeByronAddress,
    makeByronAddress
} from "./tx/index.js"

/**
 * @typedef {object} ByronAddress
 * Byron-era address
 *
 * @prop {"Address"} kind
 * @prop {"Byron"} era
 * @prop {number[]} bytes
 * @prop {bigint} checksum
 * @prop {() => string} toBase58
 * @prop {() => number[]} toCbor
 *
 * @prop {() => string} toString
 * Alias for toBase58()
 */
