import {
    decodeBytes,
    decodeInt,
    decodeTuple,
    encodeBytes,
    encodeInt,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike, IntLike } from "@helios-lang/codec-utils"
 */

export class SscCertificate {
    /**
     *
     * @param {number[]} vssPubKey - Verifiable secret sharing Public Key
     * @param {number[]} pubKey
     * @param {IntLike} epoch
     * @param {number[]} signature
     */
    constructor(vssPubKey, pubKey, epoch, signature) {
        this.vssPubKey = vssPubKey
        this.pubKey = pubKey
        this.epoch = epoch
        this.signature = signature
    }

    /**
     * @param {BytesLike} bytes
     * @returns {SscCertificate}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [vssPubKey, pubKey, epoch, signature] = decodeTuple(stream, [
            decodeBytes,
            decodeBytes,
            decodeInt,
            decodeBytes
        ])

        return new SscCertificate(vssPubKey, pubKey, epoch, signature)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeBytes(this.vssPubKey),
            encodeBytes(this.pubKey),
            encodeInt(this.epoch),
            encodeBytes(this.signature)
        ])
    }
}
