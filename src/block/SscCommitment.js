import {
    decodeBytes,
    decodeTuple,
    encodeBytes,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { VssEncrypted } from "./VssEncrypted.js"
import { VssProof } from "./VssProof.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class SscCommitment {
    /**
     * @param {number[]} pubKey
     * @param {VssEncrypted} vssEncrypted
     * @param {VssProof} vssProof
     * @param {number[]} signature
     */
    constructor(pubKey, vssEncrypted, vssProof, signature) {
        this.pubKey = pubKey
        this.vssEncrypted = vssEncrypted
        this.vssProof = vssProof
        this.signature = signature
    }

    /**
     *
     * @param {BytesLike} bytes
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [pubKey, [vssEncrypted, vssProof], signature] = decodeTuple(
            stream,
            [
                decodeBytes,
                (stream) => decodeTuple(stream, [VssEncrypted, VssProof]),
                decodeBytes
            ]
        )

        return new SscCommitment(pubKey, vssEncrypted, vssProof, signature)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeBytes(this.pubKey),
            encodeTuple([this.vssEncrypted.toCbor(), this.vssProof.toCbor()]),
            encodeBytes(this.signature)
        ])
    }
}
