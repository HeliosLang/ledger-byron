import { decodeList, decodeTag, encodeList, encodeTag } from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"
import { SscCertificate } from "./SscCertificate.js"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class SscCertificates {
    /**
     * @readonly
     * @type {SscCertificate[]}
     */
    certificates

    /**
     * @param {SscCertificate[]} certificates
     */
    constructor(certificates) {
        this.certificates = certificates
    }

    /**
     * @param {BytesLike} bytes
     * @returns {SscCertificates}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const tag = decodeTag(stream)

        if (tag != 258n) {
            throw new Error(`expected tag 258 for SscCertificates, got ${tag}`)
        }

        const certificates = decodeList(stream, SscCertificate)

        return new SscCertificates(certificates)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeTag(258).concat(encodeList(this.certificates))
    }
}
