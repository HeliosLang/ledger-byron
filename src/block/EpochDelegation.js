import {
    decodeBytes,
    decodeInt,
    decodeTuple,
    encodeBytes,
    encodeInt,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream, toInt } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike, IntLike } from "@helios-lang/codec-utils"
 */

export class EpochDelegation {
    /**
     * @param {IntLike} epoch
     * @param {number[]} issuer
     * @param {number[]} delegate
     * @param {number[]} certificate
     */
    constructor(epoch, issuer, delegate, certificate) {
        this.epoch = toInt(epoch)
        this.issuer = issuer
        this.delegate = delegate
        this.certificate = certificate
    }

    /**
     * @param {BytesLike} bytes
     * @returns {EpochDelegation}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [epoch, issuer, delegate, certificate] = decodeTuple(stream, [
            decodeInt,
            decodeBytes,
            decodeBytes,
            decodeBytes
        ])

        return new EpochDelegation(epoch, issuer, delegate, certificate)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeInt(this.epoch),
            encodeBytes(this.issuer),
            encodeBytes(this.delegate),
            encodeBytes(this.certificate)
        ])
    }
}
