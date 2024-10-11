import {
    decodeBytes,
    decodeInt,
    decodeList,
    decodeTuple,
    encodeBytes,
    encodeInt,
    encodeList,
    encodeTuple
} from "@helios-lang/cbor"
import { ByteStream, toInt } from "@helios-lang/codec-utils"
import { EpochBoundaryConsensus } from "./EpochBoundaryConsensus.js"

/**
 * @typedef {import("@helios-lang/codec-utils").BytesLike} BytesLike
 * @typedef {import("@helios-lang/codec-utils").IntLike} IntLike
 */

/**
 * @typedef {{
 *   protocolMagic: IntLike
 *   prevBlock: number[]
 *   bodyProof: number[]
 *   consensusData: EpochBoundaryConsensus
 * }} EpochBoundaryHeaderProps
 */

export class EpochBoundaryHeader {
    /**
     * @readonly
     * @type {number}
     */
    protocolMagic

    /**
     * @readonly
     * @type {number[]}
     */
    prevBlock

    /**
     * @readonly
     * @type {number[]}
     */
    bodyProof

    /**
     * @readonly
     * @type {EpochBoundaryConsensus}
     */
    consensusData

    /**
     * @param {EpochBoundaryHeaderProps} props
     */
    constructor({ protocolMagic, prevBlock, bodyProof, consensusData }) {
        this.protocolMagic = toInt(protocolMagic)
        this.prevBlock = prevBlock
        this.bodyProof = bodyProof
        this.consensusData = consensusData
    }

    /**
     * @param {BytesLike} bytes
     * @returns {EpochBoundaryHeader}
     */
    static fromCbor(bytes) {
        const stream = ByteStream.from(bytes)

        const [protocolMagic, prevBlock, bodyProof, consensusData, _extraData] =
            decodeTuple(stream, [
                decodeInt,
                decodeBytes,
                decodeBytes,
                EpochBoundaryConsensus,
                (stream) => decodeList(stream, decodeInt)
            ])

        if (_extraData.length != 0) {
            throw new Error(
                "unexpected extraData (according to spec this field isn't in  byron era"
            )
        }

        return new EpochBoundaryHeader({
            protocolMagic,
            prevBlock,
            bodyProof,
            consensusData
        })
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            encodeInt(this.protocolMagic),
            encodeBytes(this.prevBlock),
            encodeBytes(this.bodyProof),
            this.consensusData.toCbor(),
            encodeList([])
        ])
    }
}
