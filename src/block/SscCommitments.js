import { decodeList, decodeTag, encodeList, encodeTag } from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { SscCommitment } from "./SscCommitment.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class SscCommitments {
    /**
     * @param {SscCommitment[]} commitments
     */
    constructor(commitments) {
        this.commitments = commitments
    }

    /**
     * @param {BytesLike} bytes
     * @returns {SscCommitments}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const tag = decodeTag(stream)

        if (tag != 258n) {
            throw new Error(
                `expected tag 258 for Byron Ssc Commitments, got ${tag}`
            )
        }

        return new SscCommitments(decodeList(stream, SscCommitment))
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTag(258).concat(encodeList(this.commitments))
    }
}
