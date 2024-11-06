import {
    decodeInt,
    decodeTuple,
    encodeInt,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { decodeByronAddress } from "./ByronAddress.js"

/**
 * @import { BytesLike, IntLike } from "@helios-lang/codec-utils"
 * @import { ByronAddress } from "src/index.js"
 */

export class TxOutput {
    /**
     * @param {ByronAddress} address
     * @param {IntLike} lovelace
     */
    constructor(address, lovelace) {
        this.address = address
        this.lovelace = lovelace
    }

    /**
     * @param {BytesLike} bytes
     * @returns {TxOutput}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })
        const [address, lovelace] = decodeTuple(stream, [
            decodeByronAddress,
            decodeInt
        ])

        return new TxOutput(address, lovelace)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([this.address, encodeInt(this.lovelace)])
    }
}
