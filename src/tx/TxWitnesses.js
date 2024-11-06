import { decodeList, encodeList } from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { TxWitness } from "./TxWitness.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class TxWitnesses {
    /**
     * @param {TxWitness[]} witnesses
     */
    constructor(witnesses) {
        this.witnesses = witnesses
    }

    /**
     * @param {BytesLike} bytes
     * @returns {TxWitnesses}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        return new TxWitnesses(decodeList(stream, TxWitness))
    }

    toCbor() {
        return encodeList(this.witnesses)
    }
}
