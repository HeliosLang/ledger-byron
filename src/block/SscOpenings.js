import {
    decodeBytes,
    decodeMap,
    encodeBytes,
    encodeMap
} from "@helios-lang/cbor"
import { makeByteStream } from "@helios-lang/codec-utils"

/**
 * @import { BytesLike } from "@helios-lang/codec-utils"
 */

export class SscOpenings {
    /**
     * @param {number[][]} stakeHolderIds
     * @param {number[][]} secrets
     */
    constructor(stakeHolderIds, secrets) {
        if (stakeHolderIds.length != secrets.length) {
            throw new Error("expected equal length arguments")
        }

        this.stakeHolderIds = stakeHolderIds
        this.secrets = secrets
    }

    /**
     * @param {BytesLike} bytes
     * @returns {SscOpenings}
     */
    static fromCbor(bytes) {
        const stream = makeByteStream({ bytes })

        const m = decodeMap(stream, decodeBytes, decodeBytes)

        const ids = m.map(([id]) => id)
        const secrets = m.map(([_id, secret]) => secret)

        return new SscOpenings(ids, secrets)
    }

    /**
     * @returns {number[]}
     */
    toCbor() {
        return encodeMap(
            this.stakeHolderIds.map((id, i) => [
                encodeBytes(id),
                encodeBytes(this.secrets[i])
            ])
        )
    }
}
