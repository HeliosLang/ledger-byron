import {
    decodeBool,
    decodeBytes,
    decodeTuple,
    encodeBool,
    encodeBytes,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class UpdateVote {
    /**
     * @param {number[]} voter
     * @param {number[]} proposalId
     * @param {boolean} vote
     * @param {number[]} signature
     */
    constructor(voter, proposalId, vote, signature) {
        this.voter = voter
        this.proposalId = proposalId
        this.vote = vote
        this.signature = signature
    }

    /**
     * @param {BytesLike} bytes
     * @returns {UpdateVote}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [voter, proposalId, vote, signature] = decodeTuple(stream, [
            decodeBytes,
            decodeBytes,
            decodeBool,
            decodeBytes
        ])

        return new UpdateVote(voter, proposalId, vote, signature)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeBytes(this.voter),
            encodeBytes(this.proposalId),
            encodeBool(this.vote),
            encodeBytes(this.signature)
        ])
    }
}
