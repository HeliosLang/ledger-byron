import {
    decodeBytes,
    decodeMap,
    decodeTuple,
    encodeBytes,
    encodeMap,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class VssEncrypted {
    /**
     * @param {number[][]} pubKeys
     * @param {number[][]} encrypted
     */
    constructor(pubKeys, encrypted) {
        if (pubKeys.length != encrypted.length) {
            throw new Error("expected equal length arguments")
        }
        this.pubKeys = pubKeys
        this.encrypted = encrypted
    }

    /**
     * @param {BytesLike} bytes
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const m = decodeMap(stream, decodeBytes, (stream) =>
            decodeTuple(stream, [decodeBytes])
        )

        const pubKeys = m.map(([pk]) => pk)
        const encrypted = m.map(([_pk, enc]) => enc[0])

        return new VssEncrypted(pubKeys, encrypted)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeMap(
            this.pubKeys.map((pk, i) => [
                encodeBytes(pk),
                encodeTuple([encodeBytes(this.encrypted[i])])
            ])
        )
    }
}
