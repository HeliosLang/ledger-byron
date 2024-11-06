import {
    decodeList,
    decodeTuple,
    encodeList,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { Tx } from "../tx/index.js"
import { EpochDelegation } from "./EpochDelegation.js"
import { Ssc } from "./Ssc.js"
import { UpdateData } from "./UpdateData.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class BlockBody {
    /**
     *
     * @param {Tx[]} txs
     * @param {Ssc} ssc
     * @param {EpochDelegation[]} delegations
     * @param {UpdateData} updateData
     */
    constructor(txs, ssc, delegations, updateData) {
        this.txs = txs
        this.ssc = ssc
        this.delegations = delegations
        this.updateData = updateData
    }

    /**
     * @param {BytesLike} bytes
     * @returns {BlockBody}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [txs, ssc, delegations, updateData] = decodeTuple(stream, [
            (s) => decodeList(s, Tx),
            Ssc,
            (s) => decodeList(s, EpochDelegation),
            UpdateData
        ])

        return new BlockBody(txs, ssc, delegations, updateData)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeList(this.txs),
            this.ssc.toCbor(),
            encodeList(this.delegations),
            this.updateData.toCbor()
        ])
    }
}
