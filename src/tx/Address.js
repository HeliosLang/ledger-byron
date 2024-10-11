import {
    decodeBytes,
    decodeInt,
    decodeTag,
    decodeTuple,
    encodeBytes,
    encodeInt,
    encodeTag,
    encodeTuple
} from "@helios-lang/cbor"
import { ByteStream } from "@helios-lang/codec-utils"

/**
 * @typedef {import("@helios-lang/codec-utils").BytesLike} BytesLike
 * @typedef {import("@helios-lang/codec-utils").IntLike} IntLike
 */

export class Address {
    /**
     * @param {number[]} bytes
     * @param {IntLike} a - what is this?
     */
    constructor(bytes, a) {
        this.bytes = bytes
        this.a = a
    }

    /**
     * @param {BytesLike} bytes
     * @returns {Address}
     */
    static fromCbor(bytes) {
        const stream = ByteStream.from(bytes)

        const [bs, a] = decodeTuple(stream, [
            (s) => {
                if (decodeTag(s) != 24n) {
                    throw new Error("unexpected TxOutput tag")
                }

                return decodeBytes(s)
            },
            decodeInt
        ])

        return new Address(bs, a)
    }

    toCbor() {
        return encodeTuple([
            encodeTag(24).concat(encodeBytes(this.bytes)),
            encodeInt(this.a)
        ])
    }
}
