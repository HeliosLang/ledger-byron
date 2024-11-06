import {
    decodeBytes,
    decodeInt,
    decodeTuple,
    encodeBytes,
    encodeInt,
    encodeList,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { BlockSignature } from "./BlockSignature.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class BlockConsensus {
    /**
     * @param {bigint} slotId
     * @param {number[]} pubKey
     * @param {bigint} difficulty
     * @param {BlockSignature} signature
     */
    constructor(slotId, pubKey, difficulty, signature) {
        this.slotId = slotId
        this.pubKey = pubKey
        this.difficulty = difficulty
        this.signature = signature
    }

    /**
     * @param {BytesLike} bytes
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [slotId, pubKey, [difficulty], signature] = decodeTuple(stream, [
            decodeInt,
            decodeBytes,
            (stream) => decodeTuple(stream, [decodeInt]),
            BlockSignature
        ])

        return new BlockConsensus(slotId, pubKey, difficulty, signature)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeInt(this.slotId),
            encodeBytes(this.pubKey),
            encodeList([encodeInt(this.difficulty)]),
            this.signature.toCbor()
        ])
    }
}
