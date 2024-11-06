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

export class SscShare {
    /**
     * @param {number[]} addressId
     * @param {number[][]} decrypted
     */
    constructor(addressId, decrypted) {
        this.addressId = addressId
        this.decrypted = decrypted
    }

    /**
     * @param {BytesLike} bytes
     * @returns {SscShare}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [addressId, decrypted] = decodeTuple(stream, [
            decodeBytes,
            (stream) => decodeList(stream, decodeBytes)
        ])

        return new SscShare(addressId, decrypted)
    }
    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeBytes(this.addressId),
            encodeList(this.decrypted.map((d) => encodeBytes(d)))
        ])
    }
}
