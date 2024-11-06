import {
    decodeTuple,
    encodeTuple,
    decodeInt,
    encodeListOption,
    encodeInt,
    decodeListOption
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { TxFeePolicy } from "./TxFeePolicy.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

/**
 * @typedef {{
 *   scriptVersion?: number
 *   slotDuration?: bigint
 *   maxBlockSize?: bigint
 *   maxHeaderSize?: bigint
 *   maxTxSize?: bigint
 *   maxProposalSize?: bigint
 *   mpcThd?: bigint
 *   heavyDelThd?: bigint
 *   updateVoteThd?: bigint
 *   updateProposalThd?: bigint
 *   updateImplicit?: bigint
 *   softForkRule?: [bigint, bigint, bigint]
 *   txFeePolicy?: TxFeePolicy
 *   unlockStakeEpoch?: number
 * }} UpdateParametersProposalProps
 */

export class UpdateParametersProposal {
    /**
     *
     * @param {UpdateParametersProposalProps} props
     */
    constructor({
        scriptVersion,
        slotDuration,
        maxBlockSize,
        maxHeaderSize,
        maxTxSize,
        maxProposalSize,
        mpcThd,
        heavyDelThd,
        updateVoteThd,
        updateProposalThd,
        updateImplicit,
        softForkRule,
        txFeePolicy,
        unlockStakeEpoch
    }) {
        this.scriptVersion = scriptVersion
        this.slotDuration = slotDuration
        this.maxBlockSize = maxBlockSize
        this.maxHeaderSize = maxHeaderSize
        this.maxTxSize = maxTxSize
        this.maxProposalSize = maxProposalSize
        this.mpcThd = mpcThd
        this.heavyDelThd = heavyDelThd
        this.updateVoteThd = updateVoteThd
        this.updateProposalThd = updateProposalThd
        this.updateImplicit = updateImplicit
        this.softForkRule = softForkRule
        this.txFeePolicy = txFeePolicy
        this.unlockStakeEpoch = unlockStakeEpoch
    }

    /**
     * @param {BytesLike} bytes
     * @returns {UpdateParametersProposal}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [
            scriptVersion,
            slotDuration,
            maxBlockSize,
            maxHeaderSize,
            maxTxSize,
            maxProposalSize,
            mpcThd,
            heavyDelThd,
            updateVoteThd,
            updateProposalThd,
            updateImplicit,
            softForkRule,
            txFeePolicy,
            unlockStakeEpoch
        ] = decodeTuple(stream, [
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) => decodeListOption(s, decodeInt),
            (s) =>
                decodeListOption(s, (s) =>
                    decodeTuple(s, [decodeInt, decodeInt, decodeInt])
                ),
            (s) => decodeListOption(s, txFeePolicy),
            (s) => decodeListOption(s, decodeInt)
        ])

        return new UpdateParametersProposal({
            scriptVersion,
            slotDuration,
            maxBlockSize,
            maxHeaderSize,
            maxTxSize,
            maxProposalSize,
            mpcThd,
            heavyDelThd,
            updateVoteThd,
            updateProposalThd,
            updateImplicit,
            softForkRule,
            txFeePolicy,
            unlockStakeEpoch
        })
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeListOption(
                this.scriptVersion ? encodeInt(this.scriptVersion) : undefined
            ),
            encodeListOption(
                this.slotDuration ? encodeInt(this.slotDuration) : undefined
            ),
            encodeListOption(
                this.maxBlockSize ? encodeInt(this.maxBlockSize) : undefined
            ),
            encodeListOption(
                this.maxHeaderSize ? encodeInt(this.maxHeaderSize) : undefined
            ),
            encodeListOption(
                this.maxTxSize ? encodeInt(this.maxTxSize) : undefined
            ),
            encodeListOption(
                this.maxProposalSize
                    ? encodeInt(this.maxProposalSize)
                    : undefined
            ),
            encodeListOption(this.mpcThd ? encodeInt(this.mpcThd) : undefined),
            encodeListOption(
                this.heavyDelThd ? encodeInt(this.heavyDelThd) : undefined
            ),
            encodeListOption(
                this.updateVoteThd ? encodeInt(this.updateVoteThd) : undefined
            ),
            encodeListOption(
                this.updateProposalThd
                    ? encodeInt(this.updateProposalThd)
                    : undefined
            ),
            encodeListOption(
                this.updateImplicit ? encodeInt(this.updateImplicit) : undefined
            ),
            encodeListOption(
                this.softForkRule
                    ? encodeTuple([
                          encodeInt(this.softForkRule[0]),
                          encodeInt(this.softForkRule[1]),
                          encodeInt(this.softForkRule[2])
                      ])
                    : undefined
            ),
            encodeListOption(
                this.txFeePolicy ? this.txFeePolicy.toCbor() : undefined
            ),
            encodeListOption(
                this.unlockStakeEpoch
                    ? encodeInt(this.unlockStakeEpoch)
                    : undefined
            )
        ])
    }
}
