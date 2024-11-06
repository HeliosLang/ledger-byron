import {
    decodeInt,
    decodeTuple,
    encodeInt,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream, toInt } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike, IntLike } from "@helios-lang/codec-utils"
 */

export class EpochBoundaryConsensus {
    /**
     * @readonly
     * @type {number}
     */
    epochId

    /**
     * @readonly
     * @type {bigint}
     */
    difficulty

    /**
     * @param {IntLike} epochId
     * @param {IntLike} difficulty
     */
    constructor(epochId, difficulty) {
        this.epochId = toInt(epochId)
        this.difficulty = BigInt(difficulty)
    }

    /**
     * @param {BytesLike} bytes
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [epochId, [difficulty]] = decodeTuple(stream, [
            decodeInt,
            (stream) => decodeTuple(stream, [decodeInt])
        ])

        return new EpochBoundaryConsensus(epochId, difficulty)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeInt(this.epochId),
            encodeTuple([encodeInt(this.difficulty)])
        ])
    }
}
