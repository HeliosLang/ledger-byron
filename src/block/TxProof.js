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

/**
 * Represents a transaction proof in the Cardano Byron blockchain.
 */
export class TxProof {
    /**
     * Creates an instance of TxProof.
     * @param {IntLike} index - The transaction index.
     * @param {number[]} merkleRoot - The Merkle root hash.
     * @param {number[]} witnessHash - The hash of the witness.
     */
    constructor(index, merkleRoot, witnessHash) {
        this.index = toInt(index)
        this.merkleRoot = merkleRoot
        this.witnessHash = witnessHash
    }

    /**
     * Decodes a TxProof from a CBOR byte stream.
     * @param {BytesLike} bytes - The CBOR byte stream.
     * @returns {TxProof} The decoded TxProof object.
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [index, merkleRoot, witnessHash] = decodeTuple(stream, [
            decodeInt,
            decodeBytes,
            decodeBytes
        ])

        return new TxProof(index, merkleRoot, witnessHash)
    }

    /**
     * Encodes this TxProof to a CBOR byte stream.
     * @returns {number[]} The CBOR-encoded byte stream.
     */
    toCbor() {
        return encodeTuple([
            encodeInt(this.index),
            encodeBytes(this.merkleRoot),
            encodeBytes(this.witnessHash)
        ])
    }
}
