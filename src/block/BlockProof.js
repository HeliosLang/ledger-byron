import {
    decodeBytes,
    decodeTuple,
    encodeBytes,
    encodeTuple
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { SscProof } from "./SscProof.js"
import { TxProof } from "./TxProof.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class BlockProof {
    /**
     * @param {TxProof} txProof
     * @param {SscProof} sscProof
     * @param {number[]} dlgProof
     * @param {number[]} updProof
     */
    constructor(txProof, sscProof, dlgProof, updProof) {
        this.txProof = txProof
        this.sscProof = sscProof
        this.dlgProof = dlgProof
        this.updProof = updProof
    }

    /**
     * @param {BytesLike} bytes
     * @returns {BlockProof}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const [txProof, sscProof, dlgProof, updProof] = decodeTuple(stream, [
            TxProof,
            SscProof,
            decodeBytes,
            decodeBytes
        ])

        return new BlockProof(txProof, sscProof, dlgProof, updProof)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTuple([
            this.txProof.toCbor(),
            this.sscProof.toCbor(),
            encodeBytes(this.dlgProof),
            encodeBytes(this.updProof)
        ])
    }
}
