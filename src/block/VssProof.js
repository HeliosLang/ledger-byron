import {
    decodeBytes,
    decodeList,
    decodeTuple,
    encodeBytes,
    encodeList,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class VssProof {
    /**
     * @param {number[]} a  - what is this?
     * @param {number[]} b  - what is this?
     * @param {number[]} c  - what is this?
     * @param {number[][]} d  - what is this?
     */
    constructor(a, b, c, d) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
    }

    /**
     * @param {BytesLike} bytes
     * @returns {VssProof}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [a, b, c, d] = decodeTuple(stream, [
            decodeBytes,
            decodeBytes,
            decodeBytes,
            (stream) => decodeList(stream, decodeBytes)
        ])

        return new VssProof(a, b, c, d)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeBytes(this.a),
            encodeBytes(this.b),
            encodeBytes(this.c),
            encodeList(this.d.map((d) => encodeBytes(d)))
        ])
    }
}
