import {
    decodeList,
    decodeListOption,
    decodeTuple,
    encodeList,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { UpdateProposal } from "./UpdateProposal.js"
import { UpdateVote } from "./UpdateVote.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class UpdateData {
    /**
     * @param {UpdateProposal | undefined} proposal
     * @param {UpdateVote[]} votes
     */
    constructor(proposal, votes) {
        this.proposal = proposal
        this.votes = votes
    }

    /**
     * @param {BytesLike} bytes
     * @returns {UpdateData}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [proposal, votes] = decodeTuple(stream, [
            (stream) => decodeListOption(stream, UpdateProposal),
            (stream) => decodeList(stream, UpdateVote)
        ])

        return new UpdateData(proposal, votes)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeList(this.proposal ? [this.proposal] : []),
            encodeList(this.votes)
        ])
    }
}
